import crypto from 'crypto'
import type { DuitkuConfig } from './paymentSettings'

export type { DuitkuConfig }

/**
 * Duitku Standard API
 * Sandbox base : https://sandbox.duitku.com/webapi
 * Production base: https://passport.duitku.com/webapi
 *
 * Endpoints:
 *   GET channels : POST /api/merchant/paymentmethod/getpaymentmethod
 *   Create tx    : POST /api/merchant/v2/inquiry
 *   Check status : POST /api/merchant/transactionStatus
 */
export function getDuitkuBase(mode: DuitkuConfig['mode']): string {
  return mode === 'sandbox'
    ? 'https://sandbox.duitku.com/webapi'
    : 'https://passport.duitku.com/webapi'
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://umrava.com'
export const AMOUNT = 49000

// ─── Payment method → group ───────────────────────────────────────────────────

export const METHOD_GROUPS: Record<string, string> = {
  BC: 'Virtual Account', M2: 'Virtual Account', BR: 'Virtual Account',
  B1: 'Virtual Account', S1: 'Virtual Account', BT: 'Virtual Account',
  CG: 'Virtual Account', A2: 'Virtual Account', BB: 'Virtual Account',
  AG: 'Virtual Account', NC: 'Virtual Account', RB: 'Virtual Account',
  QR: 'QRIS', QRIS: 'QRIS',
  PG: 'E-Wallet', OV: 'E-Wallet', DA: 'E-Wallet', SP: 'E-Wallet',
  SHP: 'E-Wallet', LQ: 'E-Wallet', JG: 'E-Wallet', OL: 'E-Wallet',
  A1: 'Gerai', I1: 'Gerai', FT: 'Gerai',
  VC: 'Kartu Kredit', DK: 'Kartu Kredit',
}

// ─── Merchant ref ─────────────────────────────────────────────────────────────

export function buildMerchantRef(userId: string): string {
  return `UV-${userId.replace(/-/g, '').substring(0, 8).toUpperCase()}-${Date.now()}`
}

export function extractUserIdPrefix(merchantOrderId: string): string | null {
  const parts = merchantOrderId.split('-')
  return parts.length >= 2 ? parts[1].toLowerCase() : null
}

// ─── Signatures ───────────────────────────────────────────────────────────────

// getPaymentMethod: SHA256(merchantCode + paymentAmount + datetime + merchantKey)
function channelSig(cfg: DuitkuConfig): { datetime: string; signature: string } {
  const now = new Date(Date.now() + 7 * 3600 * 1000) // WIB (UTC+7)
  const datetime = now.toISOString().replace('T', ' ').substring(0, 19)
  const signature = crypto.createHash('sha256').update(`${cfg.merchantCode}${AMOUNT}${datetime}${cfg.apiKey}`).digest('hex')
  return { datetime, signature }
}

// createTransaction (v2/inquiry): MD5(merchantCode + merchantOrderId + amount + apiKey)
function invoiceSig(cfg: DuitkuConfig, merchantOrderId: string, amount: number): string {
  return crypto.createHash('md5').update(`${cfg.merchantCode}${merchantOrderId}${amount}${cfg.apiKey}`).digest('hex')
}

// transactionStatus: MD5(merchantCode + merchantOrderId + apiKey)
function statusSig(cfg: DuitkuConfig, merchantOrderId: string): string {
  return crypto.createHash('md5').update(`${cfg.merchantCode}${merchantOrderId}${cfg.apiKey}`).digest('hex')
}

// Callback webhook: MD5(merchantCode + amount + merchantOrderId + apiKey)
export function verifyCallbackSignature(
  cfg: DuitkuConfig,
  merchantCode: string,
  amount: string,
  merchantOrderId: string,
  receivedSig: string,
): boolean {
  if (!cfg.apiKey) return false
  const expected = crypto.createHash('md5').update(`${merchantCode}${amount}${merchantOrderId}${cfg.apiKey}`).digest('hex')
  return expected === receivedSig
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PaymentChannel {
  code: string
  name: string
  group: string
  icon_url: string
  active: boolean
  totalFee: number
  fee_merchant: { flat: number; percent: number }
  fee_customer: { flat: number; percent: number }
}

export interface PaymentTransaction {
  merchantOrderId: string
  reference: string
  payment_method_code: string
  total_amount: number
  fee: number
  statusCode: string
  paymentUrl: string
  checkout_url: string
  vaNumber?: string
  pay_code?: string
  qrString?: string
  qr_url?: string
  expired_time: number
  instructions: Array<{ title: string; steps: string[] }>
}

// ─── API: Get Payment Channels ────────────────────────────────────────────────

export async function getPaymentChannels(cfg: DuitkuConfig): Promise<PaymentChannel[]> {
  const { datetime, signature } = channelSig(cfg)
  const base = getDuitkuBase(cfg.mode)
  const url = `${base}/api/merchant/paymentmethod/getpaymentmethod`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    // Duitku: param names lowercase — merchantcode, amount (bukan merchantCode/paymentAmount)
    body: JSON.stringify({ merchantcode: cfg.merchantCode, amount: AMOUNT, datetime, signature }),
    cache: 'no-store',
  })

  const text = await res.text()
  let json: Record<string, unknown> = {}
  try { json = JSON.parse(text) } catch { /* bukan JSON */ }

  if (!res.ok) {
    const msg = (json.statusMessage as string) || (json.Message as string) || text.substring(0, 300)
    throw new Error(`Duitku ${res.status} [${url}]: ${msg}`)
  }

  if (!json.paymentFee) {
    throw new Error(`Duitku: ${(json.statusMessage as string) || 'paymentFee kosong — cek Merchant Code / API Key'}`)
  }

  return (json.paymentFee as Array<{
    paymentMethod: string; paymentName: string; paymentImage: string; totalFee: string
  }>).map(ch => ({
    code: ch.paymentMethod,
    name: ch.paymentName,
    group: METHOD_GROUPS[ch.paymentMethod] ?? 'Lainnya',
    icon_url: ch.paymentImage,
    active: true,
    totalFee: 0,
    fee_merchant: { flat: 0, percent: 0 },
    fee_customer: { flat: 0, percent: 0 },
  }))
}

// ─── API: Create Transaction ──────────────────────────────────────────────────

export interface CreateTxInput {
  method: string
  merchantOrderId: string
  customerName: string
  customerEmail: string
  customerPhone: string
}

function buildInstructions(method: string, vaNumber?: string): Array<{ title: string; steps: string[] }> {
  const code = method.toUpperCase()
  if (['QR', 'QRIS'].includes(code)) {
    return [{ title: 'Bayar via QRIS', steps: ['Scan QR Code menggunakan GoPay, OVO, DANA, ShopeePay, atau dompet digital lainnya.', 'Konfirmasi pembayaran sebesar yang tertera.', 'Simpan bukti pembayaran.'] }]
  }
  if (['A1', 'I1', 'FT'].includes(code)) {
    return [{ title: 'Bayar di Minimarket', steps: [`Kunjungi kasir Alfamart/Indomaret terdekat.`, `Tunjukkan kode: ${vaNumber ?? '-'} ke kasir.`, 'Bayar sesuai total. Simpan struk.'] }]
  }
  if (['PG', 'OV', 'DA', 'SP', 'SHP', 'LQ', 'JG', 'OL'].includes(code)) {
    return [{ title: 'Bayar via E-Wallet', steps: ['Buka aplikasi e-wallet Anda.', 'Pilih "Bayar" atau "Transfer".', 'Masukkan nominal sesuai tagihan.', 'Konfirmasi pembayaran.'] }]
  }
  return [{
    title: 'Transfer Virtual Account',
    steps: [
      'Buka aplikasi mobile banking atau internet banking Anda.',
      'Pilih menu "Transfer" → "Virtual Account".',
      `Masukkan nomor VA: ${vaNumber ?? '-'}.`,
      `Masukkan nominal Rp${AMOUNT.toLocaleString('id-ID')}.`,
      'Konfirmasi dan selesaikan pembayaran.',
      'Simpan bukti transfer.',
    ],
  }]
}

export async function createTransaction(input: CreateTxInput, cfg: DuitkuConfig): Promise<PaymentTransaction> {
  const signature = invoiceSig(cfg, input.merchantOrderId, AMOUNT)
  const base = getDuitkuBase(cfg.mode)
  const expiryPeriod = 1440 // 24 jam

  const body = {
    merchantCode: cfg.merchantCode,
    paymentAmount: AMOUNT,
    paymentMethod: input.method,
    merchantOrderId: input.merchantOrderId,
    productDetails: 'Umrava Premium – Akses Seumur Hidup',
    additionalParam: '',
    merchantUserInfo: '',
    customerVaName: input.customerName.substring(0, 20),
    email: input.customerEmail,
    phoneNumber: input.customerPhone || '08000000000',
    itemDetails: [{ name: 'Umrava Premium', price: AMOUNT, quantity: 1 }],
    customerDetail: {
      firstName: input.customerName.split(' ')[0],
      lastName: input.customerName.split(' ').slice(1).join(' ') || '',
      email: input.customerEmail,
      phoneNumber: input.customerPhone || '08000000000',
    },
    callbackUrl: `${SITE_URL}/api/webhook/duitku`,
    returnUrl: `${SITE_URL}/dashboard/upgrade`,
    signature,
    expiryPeriod,
  }

  const res = await fetch(`${base}/api/merchant/v2/inquiry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const rawText = await res.text()
  let json: Record<string, unknown> = {}
  try { json = JSON.parse(rawText) } catch { /* bukan JSON */ }

  if (!res.ok || json.statusCode !== '00') {
    const msg = (json.statusMessage as string) || (json.Message as string) || rawText.substring(0, 300)
    throw new Error(`Duitku ${res.status}: ${msg}`)
  }

  const vaNumber  = typeof json.vaNumber  === 'string' ? json.vaNumber  : undefined
  // Duitku Standard API returns qrCode (not qrString)
  const qrString  = typeof json.qrCode    === 'string' ? json.qrCode    :
                    typeof json.qrString  === 'string' ? json.qrString  : undefined
  const reference  = typeof json.reference  === 'string' ? json.reference  : ''
  const paymentUrl = typeof json.paymentUrl === 'string' ? json.paymentUrl : ''
  const statusCode = typeof json.statusCode === 'string' ? json.statusCode : '00'

  const expiredTime = Math.floor(Date.now() / 1000) + expiryPeriod * 60
  const isQris = ['QR', 'QRIS'].includes(input.method.toUpperCase())
  const qrUrl = isQris && qrString
    ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrString)}`
    : undefined

  return {
    merchantOrderId: input.merchantOrderId,
    reference,
    payment_method_code: input.method,
    total_amount: AMOUNT,
    fee: 0,
    statusCode,
    paymentUrl,
    checkout_url: paymentUrl,
    vaNumber,
    pay_code: vaNumber,
    qrString,
    qr_url: qrUrl,
    expired_time: expiredTime,
    instructions: buildInstructions(input.method, vaNumber),
  }
}

// ─── API: Transaction Status ──────────────────────────────────────────────────

export async function getTransactionStatus(merchantOrderId: string, cfg: DuitkuConfig): Promise<{
  statusCode: string; statusMessage: string; amount: string
}> {
  const signature = statusSig(cfg, merchantOrderId)
  const base = getDuitkuBase(cfg.mode)

  const res = await fetch(`${base}/api/merchant/transactionStatus`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ merchantCode: cfg.merchantCode, merchantOrderId, signature }),
    cache: 'no-store',
  })

  const text = await res.text()
  let json: Record<string, unknown> = {}
  try { json = JSON.parse(text) } catch { /* bukan JSON */ }

  return {
    statusCode:    typeof json.statusCode    === 'string' ? json.statusCode    : '99',
    statusMessage: typeof json.statusMessage === 'string' ? json.statusMessage : 'Unknown',
    amount:        typeof json.amount        === 'string' ? json.amount        : '0',
  }
}

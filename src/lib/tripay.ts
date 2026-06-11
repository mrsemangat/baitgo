import crypto from 'crypto'

const isProd = process.env.TRIPAY_MODE === 'production'
export const TRIPAY_BASE = isProd
  ? 'https://tripay.co.id/api'
  : 'https://tripay.co.id/api-sandbox'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://umrava.com'
export const AMOUNT = 49000

// ─── Signature ────────────────────────────────────────────────────────────────

export function createSignature(method: string, merchantRef: string, amount: number): string {
  const code = process.env.TRIPAY_MERCHANT_CODE!
  const key = process.env.TRIPAY_PRIVATE_KEY!
  return crypto.createHash('md5').update(code + method + merchantRef + amount + key).digest('hex')
}

export function verifyCallbackSignature(rawBody: string, signature: string): boolean {
  const key = process.env.TRIPAY_PRIVATE_KEY!
  if (!key) return false
  const hmac = crypto.createHmac('sha256', key).update(rawBody).digest('hex')
  try {
    return crypto.timingSafeEqual(Buffer.from(hmac, 'hex'), Buffer.from(signature, 'hex'))
  } catch {
    return false
  }
}

// ─── Merchant ref encoding ────────────────────────────────────────────────────
// Format: BG-{userId[:8]}-{timestamp}
// Allows recovering userId from ref in webhook

export function buildMerchantRef(userId: string): string {
  return `BG-${userId.replace(/-/g, '').substring(0, 8).toUpperCase()}-${Date.now()}`
}

export function extractUserIdPrefix(merchantRef: string): string | null {
  const parts = merchantRef.split('-')
  return parts.length >= 2 ? parts[1].toLowerCase() : null
}

// ─── API Calls ────────────────────────────────────────────────────────────────

export interface TripayChannel {
  group: string
  code: string
  name: string
  type: 'redirect' | 'direct'
  active: boolean
  icon_url: string
  fee_merchant: { flat: number; percent: number }
  fee_customer: { flat: number; percent: number }
  minimum_fee: number
  maximum_fee: number
}

export async function getPaymentChannels(): Promise<TripayChannel[]> {
  const res = await fetch(`${TRIPAY_BASE}/payment/channel`, {
    headers: { Authorization: `Bearer ${process.env.TRIPAY_API_KEY}` },
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error('Gagal mengambil daftar metode pembayaran')
  const json = await res.json()
  if (!json.success) throw new Error(json.message || 'Tripay error')
  return (json.data as TripayChannel[]).filter(c => c.active)
}

export interface CreateTxInput {
  method: string
  merchantRef: string
  customerName: string
  customerEmail: string
  customerPhone: string
}

export interface TripayTransaction {
  reference: string
  merchant_ref: string
  payment_method: string
  payment_method_code: string
  total_amount: number
  fee_merchant: number
  fee_customer: number
  total_fee: number
  status: string
  expired_time: number
  checkout_url: string
  pay_url: string | null
  pay_code: string | null
  qr_string: string | null
  qr_url: string | null
  instructions: { title: string; steps: string[] }[]
}

export async function createTransaction(input: CreateTxInput): Promise<TripayTransaction> {
  const signature = createSignature(input.method, input.merchantRef, AMOUNT)
  const expiredTime = Math.floor(Date.now() / 1000) + 24 * 3600

  const body = {
    method: input.method,
    merchant_ref: input.merchantRef,
    amount: AMOUNT,
    customer_name: input.customerName,
    customer_email: input.customerEmail,
    customer_phone: input.customerPhone || '08000000000',
    order_items: [{
      sku: 'UMRAVA-PREMIUM',
      name: 'Umrava Premium – Akses Seumur Hidup',
      price: AMOUNT,
      quantity: 1,
    }],
    callback_url: `${SITE_URL}/api/webhook/tripay`,
    return_url: `${SITE_URL}/dashboard/upgrade`,
    expired_time: expiredTime,
    signature,
  }

  const res = await fetch(`${TRIPAY_BASE}/transaction/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.TRIPAY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const json = await res.json()
  if (!json.success) throw new Error(json.message || 'Gagal membuat transaksi')
  return json.data as TripayTransaction
}

export async function getTransactionDetail(reference: string): Promise<TripayTransaction> {
  const res = await fetch(`${TRIPAY_BASE}/transaction/detail?reference=${reference}`, {
    headers: { Authorization: `Bearer ${process.env.TRIPAY_API_KEY}` },
    cache: 'no-store',
  })
  const json = await res.json()
  if (!json.success) throw new Error(json.message || 'Gagal cek transaksi')
  return json.data as TripayTransaction
}

// ─── Fee calculator ───────────────────────────────────────────────────────────

export function calcFee(channel: TripayChannel): number {
  const flat = (channel.fee_merchant?.flat ?? 0) + (channel.fee_customer?.flat ?? 0)
  const pct = ((channel.fee_merchant?.percent ?? 0) + (channel.fee_customer?.percent ?? 0)) / 100
  return Math.ceil(flat + AMOUNT * pct)
}

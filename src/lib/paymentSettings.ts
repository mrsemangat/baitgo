import { db } from './db'
import { siteSettings } from './db/schema'
import { inArray } from 'drizzle-orm'

export interface DuitkuConfig {
  merchantCode: string
  apiKey: string
  mode: 'sandbox' | 'production'
}

export interface BankAccount {
  id: string
  bankName: string
  accountNumber: string
  accountName: string
}

export interface PaymentMethodSettings {
  gatewayEnabled: boolean
  bankTransferEnabled: boolean
  bankAccounts: BankAccount[]
}

// ── Duitku config cache (30s TTL) ───────────────────────────────────────────
let duitkuCache: { config: DuitkuConfig; ts: number } | null = null

export async function getDuitkuConfig(): Promise<DuitkuConfig> {
  if (duitkuCache && Date.now() - duitkuCache.ts < 30_000) return duitkuCache.config

  try {
    const rows = await db.select().from(siteSettings)
      .where(inArray(siteSettings.key, ['duitku_merchant_code', 'duitku_api_key', 'duitku_mode']))

    const kv: Record<string, string> = {}
    for (const row of rows) kv[row.key] = row.value

    const config: DuitkuConfig = {
      merchantCode: kv.duitku_merchant_code || process.env.DUITKU_MERCHANT_CODE || '',
      apiKey:       kv.duitku_api_key       || process.env.DUITKU_API_KEY       || '',
      mode: (kv.duitku_mode as DuitkuConfig['mode']) ||
            (process.env.DUITKU_MODE === 'sandbox' ? 'sandbox' : 'production'),
    }
    duitkuCache = { config, ts: Date.now() }
    return config
  } catch {
    return {
      merchantCode: process.env.DUITKU_MERCHANT_CODE || '',
      apiKey:       process.env.DUITKU_API_KEY       || '',
      mode:         process.env.DUITKU_MODE === 'sandbox' ? 'sandbox' : 'production',
    }
  }
}

export function clearDuitkuConfigCache() {
  duitkuCache = null
}

// ── Payment method settings cache (30s TTL) ──────────────────────────────────
let methodsCache: { settings: PaymentMethodSettings; ts: number } | null = null

export async function getPaymentMethodSettings(): Promise<PaymentMethodSettings> {
  if (methodsCache && Date.now() - methodsCache.ts < 30_000) return methodsCache.settings

  try {
    const rows = await db.select().from(siteSettings)
      .where(inArray(siteSettings.key, ['payment_gateway_enabled', 'bank_transfer_enabled', 'bank_transfer_accounts']))

    const kv: Record<string, string> = {}
    for (const row of rows) kv[row.key] = row.value

    let bankAccounts: BankAccount[] = []
    try {
      if (kv.bank_transfer_accounts) bankAccounts = JSON.parse(kv.bank_transfer_accounts)
    } catch { /* ignore */ }

    const settings: PaymentMethodSettings = {
      gatewayEnabled:      kv.payment_gateway_enabled !== 'false',
      bankTransferEnabled: kv.bank_transfer_enabled === 'true',
      bankAccounts,
    }

    methodsCache = { settings, ts: Date.now() }
    return settings
  } catch {
    return { gatewayEnabled: true, bankTransferEnabled: false, bankAccounts: [] }
  }
}

export function clearPaymentMethodSettingsCache() {
  methodsCache = null
}

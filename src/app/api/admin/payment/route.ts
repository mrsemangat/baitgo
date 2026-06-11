import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { siteSettings } from '@/lib/db/schema'
import { inArray } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { clearDuitkuConfigCache, clearPaymentMethodSettingsCache } from '@/lib/paymentSettings'
import { getPaymentChannels } from '@/lib/duitku'
import type { DuitkuConfig } from '@/lib/duitku'

export const dynamic = 'force-dynamic'

async function isAdmin(): Promise<boolean> {
  const session = await auth()
  return session?.user?.isAdmin === true
}

const ALL_KEYS = [
  'duitku_merchant_code', 'duitku_api_key', 'duitku_mode',
  'payment_gateway_enabled', 'bank_transfer_enabled', 'bank_transfer_accounts',
]

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const rows = await db.select().from(siteSettings)
    .where(inArray(siteSettings.key, ALL_KEYS))

  const kv: Record<string, string> = {}
  for (const row of rows) kv[row.key] = row.value

  let bankAccounts = []
  try { if (kv.bank_transfer_accounts) bankAccounts = JSON.parse(kv.bank_transfer_accounts) } catch { /* ignore */ }

  return NextResponse.json({
    merchantCode:        kv.duitku_merchant_code ?? process.env.DUITKU_MERCHANT_CODE ?? '',
    apiKey:              kv.duitku_api_key       ?? process.env.DUITKU_API_KEY       ?? '',
    mode:                kv.duitku_mode          ?? process.env.DUITKU_MODE          ?? 'sandbox',
    gatewayEnabled:      kv.payment_gateway_enabled !== 'false',
    bankTransferEnabled: kv.bank_transfer_enabled === 'true',
    bankAccounts,
  })
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()
  const updates: { key: string; value: string }[] = []

  if (body.merchantCode        !== undefined) updates.push({ key: 'duitku_merchant_code',   value: body.merchantCode })
  if (body.apiKey              !== undefined) updates.push({ key: 'duitku_api_key',          value: body.apiKey })
  if (body.mode                !== undefined) updates.push({ key: 'duitku_mode',             value: body.mode })
  if (body.gatewayEnabled      !== undefined) updates.push({ key: 'payment_gateway_enabled', value: String(body.gatewayEnabled) })
  if (body.bankTransferEnabled !== undefined) updates.push({ key: 'bank_transfer_enabled',   value: String(body.bankTransferEnabled) })
  if (body.bankAccounts        !== undefined) updates.push({ key: 'bank_transfer_accounts',  value: JSON.stringify(body.bankAccounts) })

  for (const row of updates) {
    await db.insert(siteSettings).values({ key: row.key, value: row.value, updatedAt: new Date() })
      .onConflictDoUpdate({ target: siteSettings.key, set: { value: row.value, updatedAt: new Date() } })
  }

  clearDuitkuConfigCache()
  clearPaymentMethodSettingsCache()
  return NextResponse.json({ ok: true })
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const cfg: DuitkuConfig = await req.json()
  try {
    const channels = await getPaymentChannels(cfg)
    return NextResponse.json({ ok: true, channelCount: channels.length, channels })
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { webhookLogs, users } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

interface ScalevPayload {
  invoice_id?: string
  order_id?: string
  invoice_number?: string
  status?: string
  payment_status?: string
  buyer_email?: string
  buyer_name?: string
  customer_email?: string
  customer_name?: string
  email?: string
  name?: string
  product_name?: string
  product_id?: string
  amount?: number
  total?: number
  total_amount?: number
  paid_at?: string
  created_at?: string
  customer?: { email?: string; name?: string }
  order?: { id?: string; status?: string; amount?: number }
}

function verifySignature(payload: string, signature: string, secret: string): boolean {
  if (!secret || !signature) return true
  const hmac = crypto.createHmac('sha256', secret).update(payload).digest('hex')
  const cleanSig = signature.replace('sha256=', '').replace('SHA256=', '')
  try {
    return crypto.timingSafeEqual(Buffer.from(hmac, 'hex'), Buffer.from(cleanSig, 'hex'))
  } catch {
    return false
  }
}

function extractFields(payload: ScalevPayload) {
  const email =
    payload.buyer_email ??
    payload.customer_email ??
    payload.email ??
    payload.customer?.email ??
    ''
  const name =
    payload.buyer_name ??
    payload.customer_name ??
    payload.name ??
    payload.customer?.name ??
    ''
  const orderId =
    payload.invoice_id ??
    payload.order_id ??
    payload.invoice_number ??
    payload.order?.id ??
    ''
  const status =
    payload.status ??
    payload.payment_status ??
    payload.order?.status ??
    ''
  const amount =
    payload.amount ??
    payload.total ??
    payload.total_amount ??
    payload.order?.amount ??
    0
  return { email: email.toLowerCase().trim(), name, orderId, status, amount }
}

function isPaidStatus(status: string): boolean {
  const paid = ['paid', 'success', 'completed', 'settlement', 'capture', 'lunas', 'berhasil']
  return paid.includes(status.toLowerCase())
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  let payload: ScalevPayload

  try {
    payload = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const secret = process.env.SCALEV_WEBHOOK_SECRET ?? ''
  const signature =
    req.headers.get('x-scalev-signature') ??
    req.headers.get('x-webhook-signature') ??
    req.headers.get('x-signature') ??
    ''

  if (secret && !verifySignature(rawBody, signature, secret)) {
    console.error('[Webhook] Invalid signature')
    await db.insert(webhookLogs).values({ event: 'signature_invalid', payload: payload as Record<string, unknown>, error: 'Invalid signature' })
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const { email, name, orderId, status, amount } = extractFields(payload)

  const logEntry = {
    source: 'scalev',
    event: isPaidStatus(status) ? 'order.paid' : `order.${status}`,
    orderId: orderId,
    buyerEmail: email,
    buyerName: name,
    amount,
    status,
    payload: payload as Record<string, unknown>,
    userUpgraded: false,
    error: null as string | null,
    userId: null as string | null,
  }

  if (!isPaidStatus(status)) {
    await db.insert(webhookLogs).values(logEntry)
    return NextResponse.json({ received: true, message: `Status ${status} tidak memerlukan aksi` })
  }

  if (!email) {
    logEntry.error = 'Email pembeli tidak ditemukan di payload'
    await db.insert(webhookLogs).values(logEntry)
    return NextResponse.json({ error: logEntry.error }, { status: 422 })
  }

  // Idempotency
  if (orderId) {
    const existingLog = await db.select({ id: webhookLogs.id })
      .from(webhookLogs)
      .where(and(eq(webhookLogs.orderId, orderId), eq(webhookLogs.userUpgraded, true)))
      .limit(1)

    if (existingLog.length > 0) {
      return NextResponse.json({ received: true, message: 'Order sudah pernah diproses', already_processed: true })
    }
  }

  // Cari user berdasarkan email
  const [profile] = await db.select({ id: users.id, email: users.email, plan: users.plan, fullName: users.fullName })
    .from(users).where(eq(users.email, email)).limit(1)

  if (!profile) {
    logEntry.error = `User tidak ditemukan: ${email}`
    await db.insert(webhookLogs).values(logEntry)
    return NextResponse.json({ received: true, warning: logEntry.error, hint: 'User akan diupgrade saat daftar dengan email yang sama' })
  }

  if (profile.plan === 'premium') {
    logEntry.userId = profile.id
    logEntry.userUpgraded = false
    logEntry.error = 'User sudah premium'
    await db.insert(webhookLogs).values(logEntry)
    return NextResponse.json({ received: true, message: 'User sudah premium' })
  }

  // Upgrade ke premium
  await db.update(users).set({
    plan: 'premium',
    premiumActivatedAt: new Date(),
    fullName: profile.fullName ?? name ?? undefined,
  }).where(eq(users.id, profile.id))

  logEntry.userUpgraded = true
  logEntry.userId = profile.id
  await db.insert(webhookLogs).values(logEntry)

  console.log(`[Webhook] ${email} upgraded to premium — order ${orderId}`)

  return NextResponse.json({ received: true, upgraded: true, email, order_id: orderId, message: `${email} berhasil diupgrade ke premium` })
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/webhook/scalev',
    accepts: 'POST',
    description: 'Umrava ScaleV webhook — auto upgrade user ke premium saat order paid',
  })
}

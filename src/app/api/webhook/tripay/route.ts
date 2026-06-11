import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { webhookLogs, users } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { verifyCallbackSignature, extractUserIdPrefix } from '@/lib/tripay'
import { sendEmail } from '@/lib/mailketing'
import { buildPremiumEmail } from '@/lib/emailTemplates'

export const dynamic = 'force-dynamic'

interface TripayCallbackPayload {
  reference: string
  merchant_ref: string
  payment_method: string
  payment_method_code: string
  total_amount: number
  fee_merchant: number
  fee_customer: number
  total_fee: number
  amount_received: number
  is_closed_payment: number
  status: 'UNPAID' | 'PAID' | 'FAILED' | 'REFUND' | 'EXPIRED'
  paid_at: number | null
  note: string | null
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text()

  const signature = req.headers.get('X-Callback-Signature') ?? ''
  if (!verifyCallbackSignature(rawBody, signature)) {
    console.error('[Tripay] Invalid callback signature')
    return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 401 })
  }

  let payload: TripayCallbackPayload
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid JSON' }, { status: 400 })
  }

  const { reference, merchant_ref, status, total_amount } = payload

  // Idempotency
  const existingLog = await db.select({ id: webhookLogs.id })
    .from(webhookLogs)
    .where(and(eq(webhookLogs.orderId, reference), eq(webhookLogs.userUpgraded, true)))
    .limit(1)

  if (existingLog.length > 0) {
    return NextResponse.json({ success: true, message: 'Already processed' })
  }

  const logBase = {
    source: 'tripay',
    event: `payment.${status.toLowerCase()}`,
    orderId: reference,
    amount: total_amount,
    status,
    payload: payload as unknown as Record<string, unknown>,
    userUpgraded: false,
    error: null as string | null,
    userId: null as string | null,
    buyerEmail: null as string | null,
    buyerName: null as string | null,
  }

  if (status !== 'PAID') {
    await db.insert(webhookLogs).values(logBase)
    return NextResponse.json({ success: true, message: `Status ${status} tidak memerlukan aksi` })
  }

  // Cari user dari log pending
  let userId: string | null = null
  let userEmail: string | null = null
  let userName: string | null = null

  const [pendingLog] = await db.select({
    userId: webhookLogs.userId,
    buyerEmail: webhookLogs.buyerEmail,
    buyerName: webhookLogs.buyerName,
  }).from(webhookLogs)
    .where(eq(webhookLogs.source, 'tripay'))
    .limit(1)

  if (pendingLog?.userId) {
    userId = pendingLog.userId
    userEmail = pendingLog.buyerEmail
    userName = pendingLog.buyerName
  } else {
    const prefix = extractUserIdPrefix(merchant_ref)
    if (prefix) {
      const allUsers = await db.select({ id: users.id, email: users.email, fullName: users.fullName })
        .from(users).limit(100)
      const match = allUsers.find(p => p.id.replace(/-/g, '').startsWith(prefix.replace(/-/g, '')))
      if (match) {
        userId = match.id
        userEmail = match.email
        userName = match.fullName
      }
    }
  }

  logBase.buyerEmail = userEmail
  logBase.buyerName = userName

  if (!userId) {
    logBase.error = `User tidak ditemukan untuk merchant_ref: ${merchant_ref}`
    await db.insert(webhookLogs).values(logBase)
    return NextResponse.json({ success: true, warning: logBase.error })
  }

  const [profile] = await db.select({ plan: users.plan, fullName: users.fullName, email: users.email })
    .from(users).where(eq(users.id, userId)).limit(1)

  if (profile?.plan === 'premium') {
    logBase.userId = userId
    await db.insert(webhookLogs).values({ ...logBase, error: 'Sudah premium' })
    return NextResponse.json({ success: true, message: 'User sudah premium' })
  }

  await db.update(users).set({ plan: 'premium', premiumActivatedAt: new Date() })
    .where(eq(users.id, userId))

  logBase.userUpgraded = true
  logBase.userId = userId
  await db.insert(webhookLogs).values(logBase)

  const emailName = profile?.fullName || userName || 'Sahabat'
  const emailAddr = profile?.email || userEmail || ''
  if (emailAddr) {
    const emailPayload = buildPremiumEmail({ nama_user: emailName, email: emailAddr })
    sendEmail(emailPayload).catch(() => {})
  }

  console.log(`[Tripay] ${userEmail} upgraded to Premium — ref: ${reference}`)

  return NextResponse.json({ success: true, message: `${userEmail} berhasil diupgrade ke Premium` })
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/webhook/tripay',
    description: 'Umrava Tripay webhook handler',
  })
}

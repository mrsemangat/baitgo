import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { users, webhookLogs } from '@/lib/db/schema'
import { eq, and, isNotNull, ne } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { getTransactionStatus } from '@/lib/duitku'
import { getDuitkuConfig } from '@/lib/paymentSettings'
import { sendEmail } from '@/lib/mailketing'
import { buildPremiumEmail } from '@/lib/emailTemplates'

export const dynamic = 'force-dynamic'

export async function POST() {
  const session = await auth()
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const cfg = await getDuitkuConfig()

  // Ambil semua transaksi yang dibuat (dari Duitku) yang punya userId
  const created = await db
    .select({
      orderId: webhookLogs.orderId,
      userId: webhookLogs.userId,
      buyerEmail: webhookLogs.buyerEmail,
      buyerName: webhookLogs.buyerName,
    })
    .from(webhookLogs)
    .where(
      and(
        eq(webhookLogs.source, 'duitku'),
        eq(webhookLogs.event, 'transaction.created'),
        isNotNull(webhookLogs.userId),
      )
    )

  const results: Array<{
    orderId: string; userId: string; status: string; action: string; email?: string
  }> = []

  for (const row of created) {
    if (!row.orderId || !row.userId) continue

    // Cek apakah sudah pernah diupgrade
    const upgraded = await db
      .select({ id: webhookLogs.id })
      .from(webhookLogs)
      .where(and(eq(webhookLogs.orderId, row.orderId), eq(webhookLogs.userUpgraded, true)))
      .limit(1)

    if (upgraded.length > 0) {
      results.push({ orderId: row.orderId, userId: row.userId, status: 'ALREADY_UPGRADED', action: 'skip' })
      continue
    }

    // Cek user masih free
    const [profile] = await db
      .select({ plan: users.plan, fullName: users.fullName, email: users.email })
      .from(users)
      .where(eq(users.id, row.userId))
      .limit(1)

    if (!profile) {
      results.push({ orderId: row.orderId, userId: row.userId, status: 'USER_NOT_FOUND', action: 'skip' })
      continue
    }

    if (profile.plan === 'premium') {
      results.push({ orderId: row.orderId, userId: row.userId, status: 'ALREADY_PREMIUM', action: 'skip', email: profile.email })
      continue
    }

    // Query Duitku untuk status transaksi
    let statusCode = '99'
    try {
      const duitkuResult = await getTransactionStatus(row.orderId, cfg)
      statusCode = duitkuResult.statusCode
    } catch {
      results.push({ orderId: row.orderId, userId: row.userId, status: 'DUITKU_ERROR', action: 'skip', email: profile.email })
      continue
    }

    if (statusCode !== '00') {
      results.push({ orderId: row.orderId, userId: row.userId, status: `DUITKU_${statusCode}`, action: 'skip', email: profile.email })
      continue
    }

    // Lunas & belum premium — upgrade
    await db.update(users)
      .set({ plan: 'premium', premiumActivatedAt: new Date() })
      .where(eq(users.id, row.userId))

    await db.insert(webhookLogs).values({
      source: 'duitku',
      event: 'payment.paid.reconcile',
      orderId: row.orderId,
      amount: 49000,
      status: 'PAID',
      userId: row.userId,
      buyerEmail: profile.email || row.buyerEmail,
      buyerName: profile.fullName || row.buyerName,
      userUpgraded: true,
      payload: { statusCode, source: 'admin_reconcile' },
      error: null,
    })

    const emailAddr = profile.email || row.buyerEmail || ''
    if (emailAddr) {
      sendEmail(buildPremiumEmail({
        nama_user: profile.fullName || row.buyerName || 'Sahabat',
        email: emailAddr,
      })).catch(() => {})
    }

    console.log(`[Reconcile] Upgraded: ${profile.email} (orderId: ${row.orderId})`)
    results.push({ orderId: row.orderId, userId: row.userId, status: 'UPGRADED', action: 'upgraded', email: profile.email })
  }

  const upgraded = results.filter(r => r.action === 'upgraded')
  return NextResponse.json({
    ok: true,
    checked: results.length,
    upgraded: upgraded.length,
    details: results,
  })
}

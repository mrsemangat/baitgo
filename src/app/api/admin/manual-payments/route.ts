import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { manualPayments, users, webhookLogs } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/mailketing'
import { buildPremiumEmail } from '@/lib/emailTemplates'

export const dynamic = 'force-dynamic'

async function isAdmin(): Promise<boolean> {
  const session = await auth()
  return session?.user?.isAdmin === true
}

export async function GET(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const url = new URL(req.url)
  const statusFilter = url.searchParams.get('status')

  let query = db.select().from(manualPayments).$dynamic()

  if (statusFilter && statusFilter !== 'all') {
    query = query.where(eq(manualPayments.status, statusFilter)) as typeof query
  }

  const data = await query.orderBy(desc(manualPayments.createdAt))

  return NextResponse.json({ payments: data ?? [] })
}

export async function PATCH(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body: { id: string; action: 'approve' | 'reject'; adminNote?: string } = await req.json()
  const { id, action, adminNote } = body

  if (!id || !action) return NextResponse.json({ error: 'id dan action wajib diisi' }, { status: 400 })

  const [payment] = await db.select().from(manualPayments).where(eq(manualPayments.id, id)).limit(1)

  if (!payment) return NextResponse.json({ error: 'Transfer tidak ditemukan' }, { status: 404 })
  if (payment.status !== 'pending') return NextResponse.json({ error: 'Transfer sudah diproses sebelumnya' }, { status: 400 })

  const newStatus = action === 'approve' ? 'approved' : 'rejected'

  await db.update(manualPayments).set({
    status: newStatus,
    adminNote: adminNote ?? null,
    updatedAt: new Date(),
  }).where(eq(manualPayments.id, id))

  if (action === 'approve') {
    // Upgrade user plan ke premium
    await db.update(users).set({ plan: 'premium', updatedAt: new Date() })
      .where(eq(users.id, payment.userId))

    // Log ke webhook_logs
    await db.insert(webhookLogs).values({
      source: 'manual_transfer',
      event: 'payment.approved',
      orderId: payment.merchantOrderId,
      buyerEmail: payment.userEmail,
      buyerName: payment.userName,
      amount: payment.amount,
      status: 'PAID',
      userId: payment.userId,
      userUpgraded: true,
      payload: { adminNote, transferId: id },
    })

    // Kirim email konfirmasi premium
    if (payment.userEmail && payment.userName) {
      try {
        const emailPayload = buildPremiumEmail({ nama_user: payment.userName, email: payment.userEmail })
        await sendEmail(emailPayload)
      } catch { /* ignore */ }
    }
  }

  return NextResponse.json({ ok: true, status: newStatus })
}

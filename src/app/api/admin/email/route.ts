import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { sendEmail, getMailingLists } from '@/lib/mailketing'

export const dynamic = 'force-dynamic'

function injectVars(template: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce(
    (acc, [k, v]) => acc.replaceAll(`{{${k}}}`, v),
    template
  )
}

function defaultVars(to: string, toName: string): Record<string, string> {
  return {
    nama_user: toName || 'Sahabat',
    email: to,
    tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    link_dashboard: 'https://umrava.com/dashboard',
    link_premium: 'https://umrava.com/dashboard/zikir',
    tahun: new Date().getFullYear().toString(),
  }
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!session.user.isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()
  const { action } = body

  if (action === 'test_connection') {
    const lists = await getMailingLists()
    if (lists.length >= 0) {
      return NextResponse.json({
        success: true,
        message: `Terhubung ke Mailketing. ${lists.length} mailing list ditemukan.`,
        lists,
      })
    }
    return NextResponse.json({ success: false, message: 'Tidak dapat terhubung ke Mailketing. Periksa MAILKETING_API_KEY.' })
  }

  if (action === 'send_test') {
    const { to, toName, senderName, senderEmail, subject, htmlBody } = body
    if (!to) return NextResponse.json({ error: 'Email tujuan diperlukan.' }, { status: 400 })

    const vars = { ...defaultVars(to, toName), ...(body.extraVars || {}) }
    const result = await sendEmail({
      to,
      toName: toName || to,
      subject: injectVars(subject || '[Umrava] Test Email', vars),
      html: injectVars(htmlBody || '<p>Test email dari Umrava.</p>', vars),
      senderName: senderName || 'Umrava',
      senderEmail: senderEmail || 'info@umrava.com',
    })

    if (!result.ok) {
      return NextResponse.json({ success: false, message: `Gagal kirim: ${result.error}` })
    }
    return NextResponse.json({ success: true, message: `Email test berhasil dikirim ke ${to}` })
  }

  if (action === 'send_notification') {
    const { to, toName, subject, htmlBody, extraVars } = body
    if (!to) return NextResponse.json({ error: 'Parameter tidak lengkap.' }, { status: 400 })

    const vars = { ...defaultVars(to, toName), ...(extraVars || {}) }
    const result = await sendEmail({
      to,
      toName: toName || to,
      subject: injectVars(subject || '[Umrava] Notifikasi', vars),
      html: injectVars(htmlBody || '<p>Notifikasi dari Umrava.</p>', vars),
    })

    return NextResponse.json({ success: result.ok, error: result.error })
  }

  return NextResponse.json({ error: 'Action tidak dikenal.' }, { status: 400 })
}

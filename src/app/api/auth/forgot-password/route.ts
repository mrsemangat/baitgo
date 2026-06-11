import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { SignJWT } from 'jose'
import { sendEmail } from '@/lib/mailketing'
import { buildPasswordResetEmail } from '@/lib/emailTemplates'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://umrava.com'
const SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET ?? 'fallback-secret')

export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({}))
  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email diperlukan' }, { status: 400 })
  }

  const result = await db.select({ id: users.id, fullName: users.fullName })
    .from(users).where(eq(users.email, email.toLowerCase())).limit(1)

  // Selalu balas ok untuk keamanan
  if (!result[0]) return NextResponse.json({ ok: true })

  const user = result[0]
  const token = await new SignJWT({ userId: user.id, email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(SECRET)

  const resetUrl = `${SITE_URL}/auth/reset-password?token=${token}`
  const nama = user.fullName?.split(' ')[0] || email.split('@')[0]

  const emailPayload = buildPasswordResetEmail({ nama_user: nama, email, reset_url: resetUrl })
  await sendEmail(emailPayload).catch(() => {})

  return NextResponse.json({ ok: true })
}

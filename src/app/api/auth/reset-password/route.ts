import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'

export const dynamic = 'force-dynamic'

const SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET ?? 'fallback-secret')

export async function POST(req: Request) {
  const { token, password } = await req.json().catch(() => ({}))

  if (!token || !password || password.length < 6) {
    return NextResponse.json({ error: 'Data tidak valid' }, { status: 400 })
  }

  let payload: { userId: string; email: string }
  try {
    const result = await jwtVerify(token, SECRET)
    payload = result.payload as { userId: string; email: string }
  } catch {
    return NextResponse.json({ error: 'Link tidak valid atau kadaluarsa' }, { status: 400 })
  }

  const hashed = await bcrypt.hash(password, 10)
  await db.update(users).set({ password: hashed, updatedAt: new Date() })
    .where(eq(users.id, payload.userId))

  return NextResponse.json({ ok: true })
}

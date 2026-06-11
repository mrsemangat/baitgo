import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const result = await db.select({
    fullName: users.fullName,
    city: users.city,
    departureDate: users.departureDate,
    email: users.email,
    plan: users.plan,
  }).from(users).where(eq(users.id, session.user.id)).limit(1)

  return NextResponse.json({ profile: result[0] ?? null })
}

export async function PUT(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => ({}))
  const { fullName, city, departureDate } = body

  await db.update(users).set({
    fullName: fullName ?? undefined,
    city: city ?? undefined,
    departureDate: departureDate || null,
    updatedAt: new Date(),
  }).where(eq(users.id, session.user.id))

  return NextResponse.json({ ok: true })
}

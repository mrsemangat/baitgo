import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq, ilike, or, sql } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

const DEFAULT_PASSWORD = 'Umrava26'

async function isAdmin() {
  const session = await auth()
  return session?.user?.isAdmin === true
}

export async function GET(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = parseInt(searchParams.get('limit') ?? '20')
  const search = searchParams.get('search') ?? ''
  const plan = searchParams.get('plan') ?? ''
  const offset = (page - 1) * limit

  let query = db.select().from(users).$dynamic()

  if (search && plan) {
    query = query.where(
      sql`(${ilike(users.fullName, `%${search}%`)} or ${ilike(users.email, `%${search}%`)}) and ${eq(users.plan, plan)}`
    ) as typeof query
  } else if (search) {
    query = query.where(
      or(ilike(users.fullName, `%${search}%`), ilike(users.email, `%${search}%`))
    ) as typeof query
  } else if (plan) {
    query = query.where(eq(users.plan, plan)) as typeof query
  }

  const allUsers = await query.orderBy(sql`${users.createdAt} desc`).limit(limit).offset(offset)

  // Total count
  const [{ total }] = await db.select({ total: sql<number>`count(*)` }).from(users)

  return NextResponse.json({ users: allUsers, total: Number(total), page, limit })
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()
  const { userId, plan, is_admin, action } = body

  if (action === 'reset_password') {
    const hashed = await bcrypt.hash(DEFAULT_PASSWORD, 10)
    await db.update(users).set({ password: hashed, updatedAt: new Date() }).where(eq(users.id, userId))
    return NextResponse.json({ ok: true, message: `Password direset ke "${DEFAULT_PASSWORD}"` })
  }

  const updates: Partial<typeof users.$inferInsert> = {}
  if (plan !== undefined) {
    updates.plan = plan
    if (plan === 'premium') updates.premiumActivatedAt = new Date()
  }
  if (is_admin !== undefined) updates.isAdmin = is_admin
  if (Object.keys(updates).length > 0) {
    updates.updatedAt = new Date()
    await db.update(users).set(updates).where(eq(users.id, userId))
  }

  return NextResponse.json({ ok: true })
}

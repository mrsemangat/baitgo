import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { users, doaFavorites } from '@/lib/db/schema'
import { eq, count, sql } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()
  if (!session?.user?.isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const [totalUsersRow] = await db.select({ count: count() }).from(users)
  const [premiumRow] = await db.select({ count: count() }).from(users).where(eq(users.plan, 'premium'))
  const [freeRow] = await db.select({ count: count() }).from(users).where(eq(users.plan, 'free'))

  const stats = {
    total_users: totalUsersRow.count,
    premium_users: premiumRow.count,
    free_users: freeRow.count,
  }

  const recentUsers = await db.select({
    id: users.id,
    fullName: users.fullName,
    email: users.email,
    plan: users.plan,
    city: users.city,
    createdAt: users.createdAt,
    departureDate: users.departureDate,
    isAdmin: users.isAdmin,
  }).from(users).orderBy(sql`${users.createdAt} desc`).limit(10)

  const doaFavRows = await db.select({ doaId: doaFavorites.doaId }).from(doaFavorites)
  const doaCount: Record<string, number> = {}
  for (const row of doaFavRows) {
    doaCount[row.doaId] = (doaCount[row.doaId] || 0) + 1
  }
  const topDoa = Object.entries(doaCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([id, cnt]) => ({ id, count: cnt }))

  const revenue = premiumRow.count * 49000

  return NextResponse.json({ stats, recentUsers, topDoa, revenue })
}

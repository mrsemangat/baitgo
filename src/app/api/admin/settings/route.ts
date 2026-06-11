import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { siteSettings } from '@/lib/db/schema'
import { eq, inArray } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

async function isAdmin(): Promise<boolean> {
  const session = await auth()
  return session?.user?.isAdmin === true
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  // Seed defaults
  await db.insert(siteSettings).values([
    { key: 'meta_pixel_id', value: '' },
    { key: 'gtm_id', value: '' },
    { key: 'site_name', value: 'Umrava' },
  ]).onConflictDoNothing()

  const rows = await db.select().from(siteSettings)
  const settings: Record<string, string> = {}
  for (const row of rows) settings[row.key] = row.value

  return NextResponse.json({ settings })
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const updates: Record<string, string> = await req.json().catch(() => ({}))

  for (const [key, value] of Object.entries(updates)) {
    await db.insert(siteSettings).values({ key, value, updatedAt: new Date() })
      .onConflictDoUpdate({ target: siteSettings.key, set: { value, updatedAt: new Date() } })
  }

  return NextResponse.json({ ok: true })
}

// Public HEAD for layout (read only site tracking IDs)
export async function HEAD() {
  const rows = await db.select().from(siteSettings)
    .where(inArray(siteSettings.key, ['meta_pixel_id', 'gtm_id']))
  const settings: Record<string, string> = {}
  for (const row of rows) settings[row.key] = row.value
  return NextResponse.json({ settings })
}

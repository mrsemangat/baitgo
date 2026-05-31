import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase
    .from('profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { data: stats } = await supabase.from('admin_user_stats').select('*').single()
  const { data: recentUsers } = await supabase
    .from('profiles')
    .select('id, full_name, email, plan, city, created_at, departure_date, is_admin')
    .order('created_at', { ascending: false })
    .limit(10)

  const { data: checklistStats } = await supabase
    .from('checklist_progress')
    .select('item_id, checked')
    .eq('checked', true)

  const { data: doaFavStats } = await supabase
    .from('doa_favorites')
    .select('doa_id')

  const doaCount: Record<string, number> = {}
  doaFavStats?.forEach(f => { doaCount[f.doa_id] = (doaCount[f.doa_id] || 0) + 1 })
  const topDoa = Object.entries(doaCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([id, count]) => ({ id, count }))

  const revenue = (stats?.premium_users ?? 0) * 49000

  return NextResponse.json({ stats, recentUsers, topDoa, revenue })
}

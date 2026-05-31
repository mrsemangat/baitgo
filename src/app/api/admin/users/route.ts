import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized', supabase: null }
  const { data: p } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single()
  if (!p?.is_admin) return { error: 'Forbidden', supabase: null }
  return { error: null, supabase }
}

export async function GET(req: NextRequest) {
  const { error, supabase } = await requireAdmin()
  if (error || !supabase) return NextResponse.json({ error }, { status: error === 'Unauthorized' ? 401 : 403 })

  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = parseInt(searchParams.get('limit') ?? '20')
  const search = searchParams.get('search') ?? ''
  const plan = searchParams.get('plan') ?? ''
  const from = (page - 1) * limit

  let query = supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, from + limit - 1)

  if (search) query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`)
  if (plan) query = query.eq('plan', plan)

  const { data: users, count } = await query
  return NextResponse.json({ users, total: count, page, limit })
}

export async function PATCH(req: NextRequest) {
  const { error, supabase } = await requireAdmin()
  if (error || !supabase) return NextResponse.json({ error }, { status: 403 })

  const { userId, plan, is_admin } = await req.json()
  const update: Record<string, unknown> = {}
  if (plan !== undefined) {
    update.plan = plan
    if (plan === 'premium') update.premium_activated_at = new Date().toISOString()
  }
  if (is_admin !== undefined) update.is_admin = is_admin

  const { data, error: updateError } = await supabase
    .from('profiles').update(update).eq('id', userId).select().single()

  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 })
  return NextResponse.json({ user: data })
}

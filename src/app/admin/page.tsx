import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { users, doaFavorites, ibadahProgress } from '@/lib/db/schema'
import { eq, count, sql } from 'drizzle-orm'
import { formatRupiah } from '@/lib/utils'
import Link from 'next/link'
import { Users, Crown, DollarSign, UserPlus, BookOpen, Heart } from 'lucide-react'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const session = await auth()
  if (!session?.user?.isAdmin) redirect('/dashboard')

  const [totalRow] = await db.select({ count: count() }).from(users)
  const [premiumRow] = await db.select({ count: count() }).from(users).where(eq(users.plan, 'premium'))
  const [freeRow] = await db.select({ count: count() }).from(users).where(eq(users.plan, 'free'))

  const recentUsers = await db.select({
    id: users.id,
    fullName: users.fullName,
    email: users.email,
    plan: users.plan,
    city: users.city,
    createdAt: users.createdAt,
    isAdmin: users.isAdmin,
  }).from(users).orderBy(sql`${users.createdAt} desc`).limit(8)

  const doaFavRows = await db.select({ doaId: doaFavorites.doaId }).from(doaFavorites)
  const doaCount: Record<string, number> = {}
  doaFavRows.forEach(f => { doaCount[f.doaId] = (doaCount[f.doaId] ?? 0) + 1 })
  const topDoa = Object.entries(doaCount).sort(([,a],[,b]) => b - a).slice(0, 5)

  const ibadahRows = await db.select({ tahapId: ibadahProgress.tahapId }).from(ibadahProgress)
    .where(eq(ibadahProgress.completed, true))
  const tahapCount: Record<string, number> = {}
  ibadahRows.forEach(i => { tahapCount[i.tahapId] = (tahapCount[i.tahapId] ?? 0) + 1 })

  const TAHAP_LABEL: Record<string, string> = {
    miqat: 'Miqat & Ihram', tawaf: 'Tawaf', 'sholat-ibrahim': 'Sholat Ibrahim',
    'multazam-zamzam': 'Multazam & Zamzam', sai: "Sa'i", tahallul: 'Tahallul',
  }

  const totalUsers = totalRow.count
  const premiumUsers = premiumRow.count
  const revenue = premiumUsers * 49000
  const conversionRate = totalUsers ? ((premiumUsers / totalUsers) * 100).toFixed(1) : '0'

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Dashboard Admin</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#F5E6C8] text-[#8B6914] px-4 py-2 rounded-xl text-sm font-bold">
          🕋 Umrava Admin
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: 'Total User', value: totalUsers, icon: Users,
            color: 'bg-blue-50 text-blue-600', border: 'border-blue-100',
            sub: 'Semua user terdaftar'
          },
          {
            label: 'User Premium', value: premiumUsers, icon: Crown,
            color: 'bg-[#F5E6C8] text-[#C9A84C]', border: 'border-[rgba(201,168,76,0.2)]',
            sub: `Konversi ${conversionRate}%`
          },
          {
            label: 'Total Revenue', value: formatRupiah(revenue), icon: DollarSign,
            color: 'bg-green-50 text-green-600', border: 'border-green-100',
            sub: `${premiumUsers} × Rp49.000`
          },
          {
            label: 'User Free', value: freeRow.count, icon: UserPlus,
            color: 'bg-purple-50 text-purple-600', border: 'border-purple-100',
            sub: 'Belum upgrade'
          },
        ].map((card, i) => (
          <div key={i} className={`bg-white rounded-2xl p-5 border ${card.border} shadow-sm`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center`}>
                <card.icon size={18} />
              </div>
            </div>
            <div className="text-2xl font-black text-gray-900 mb-1">{card.value}</div>
            <div className="text-sm font-semibold text-gray-500">{card.label}</div>
            <div className="text-xs text-gray-400 mt-1">{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Conversion Banner */}
      <div className="bg-gradient-to-r from-[#0D4A28] to-[#1B6B3A] rounded-2xl p-5 mb-8 text-white flex items-center justify-between">
        <div>
          <div className="font-bold text-lg mb-1">Tingkat Konversi Free → Premium</div>
          <div className="text-[rgba(255,255,255,0.7)] text-sm">
            {premiumUsers} dari {totalUsers} user sudah upgrade
          </div>
        </div>
        <div className="text-right">
          <div className="text-5xl font-black text-[#C9A84C]">{conversionRate}%</div>
          <div className="text-xs text-[rgba(255,255,255,0.6)] mt-1">Target: 20%</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Users */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h2 className="font-bold text-gray-900">User Terbaru</h2>
            <Link href="/admin/users" className="text-xs text-[#1B6B3A] font-semibold hover:underline">
              Lihat semua →
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentUsers.map(user => (
              <div key={user.id} className="flex items-center gap-3 px-5 py-3">
                <div className="w-9 h-9 rounded-full bg-[#E8F5ED] flex items-center justify-center font-bold text-[#1B6B3A] text-sm flex-shrink-0">
                  {(user.fullName ?? user.email ?? 'U')[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 truncate">
                    {user.fullName ?? user.email}
                    {user.isAdmin && <span className="ml-1 text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">ADMIN</span>}
                  </div>
                  <div className="text-xs text-gray-400 truncate">{user.city ?? 'Kota belum diset'}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    user.plan === 'premium'
                      ? 'bg-[#F5E6C8] text-[#8B6914]'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {user.plan === 'premium' ? '✨ Premium' : 'Free'}
                  </span>
                  <span className="text-xs text-gray-400">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : '—'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Usage */}
        <div className="space-y-4">
          {/* Top Doa Favorit */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Heart size={16} className="text-red-400" /> Top Doa Difavoritkan
            </h2>
            {topDoa.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">Belum ada data favorit</p>
            ) : (
              <div className="space-y-2.5">
                {topDoa.map(([id, cnt], i) => (
                  <div key={id} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-100 text-xs font-bold text-gray-500 flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-700 capitalize">
                        {id.replace(/-/g, ' ')}
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full bg-[#C9A84C] rounded-full"
                          style={{ width: `${Math.min(100, (cnt / (topDoa[0]?.[1] ?? 1)) * 100)}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-bold text-gray-500 flex-shrink-0">{cnt}×</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tahap Ibadah Progress */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen size={16} className="text-[#1B6B3A]" /> Tahap Ibadah Paling Diselesaikan
            </h2>
            {Object.keys(tahapCount).length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">Belum ada data ibadah</p>
            ) : (
              <div className="space-y-2">
                {Object.entries(tahapCount).sort(([,a],[,b]) => b - a).map(([tahap, cnt]) => (
                  <div key={tahap} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{TAHAP_LABEL[tahap] ?? tahap}</span>
                    <span className="font-bold text-[#1B6B3A]">{cnt} user</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { href: '/admin/users', icon: '👥', label: 'Kelola User', color: 'hover:border-blue-300' },
          { href: '/admin/users?plan=free', icon: '⬆️', label: 'Upgrade User', color: 'hover:border-[#C9A84C]' },
          { href: '/admin/content', icon: '📝', label: 'Edit Konten', color: 'hover:border-green-300' },
          { href: '/admin/analytics', icon: '📈', label: 'Lihat Analytics', color: 'hover:border-purple-300' },
        ].map((action, i) => (
          <Link key={i} href={action.href}
            className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:shadow-md transition-all ${action.color} cursor-pointer group`}>
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{action.icon}</div>
            <div className="text-sm font-semibold text-gray-700">{action.label}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

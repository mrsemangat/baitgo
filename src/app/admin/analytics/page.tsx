import { db } from '@/lib/db'
import { users, doaFavorites, ibadahProgress, checklistProgress } from '@/lib/db/schema'
import { eq, count, sql } from 'drizzle-orm'
import { formatRupiah } from '@/lib/utils'
import { DATA_DOA } from '@/data/doa'
import { TAHAP_IBADAH } from '@/data/panduan'

export const dynamic = 'force-dynamic'

export default async function AdminAnalyticsPage() {
  const [totalRow] = await db.select({ count: count() }).from(users)
  const [premiumRow] = await db.select({ count: count() }).from(users).where(eq(users.plan, 'premium'))

  const doaFavRows = await db.select({ doaId: doaFavorites.doaId }).from(doaFavorites)
  const ibadahRows = await db.select({
    tahapId: ibadahProgress.tahapId,
    completed: ibadahProgress.completed,
    counterValue: ibadahProgress.counterValue,
  }).from(ibadahProgress)
  const checklistRows = await db.select({
    itemId: checklistProgress.itemId,
    checked: checklistProgress.checked,
    userId: checklistProgress.userId,
  }).from(checklistProgress)
  const allProfiles = await db.select({
    plan: users.plan,
    city: users.city,
    createdAt: users.createdAt,
  }).from(users).orderBy(sql`${users.createdAt} asc`)

  // Doa stats
  const doaCount: Record<string, number> = {}
  doaFavRows.forEach(f => { doaCount[f.doaId] = (doaCount[f.doaId] ?? 0) + 1 })
  const topDoa = Object.entries(doaCount)
    .sort(([,a],[,b]) => b - a).slice(0, 8)
    .map(([id, cnt]) => ({
      id,
      count: cnt,
      judul: DATA_DOA.find(d => d.id === id)?.judul ?? id,
      pct: 0,
    }))
  const maxDoa = topDoa[0]?.count ?? 1
  topDoa.forEach(d => { d.pct = Math.round((d.count / maxDoa) * 100) })

  // Ibadah tahap stats
  const tahapStats = TAHAP_IBADAH.map(t => {
    const records = ibadahRows.filter(i => i.tahapId === t.id)
    return {
      id: t.id,
      judul: t.judul,
      icon: t.icon,
      started: records.length,
      completed: records.filter(r => r.completed).length,
      avgCounter: records.length
        ? Math.round(records.reduce((s, r) => s + (r.counterValue ?? 0), 0) / records.length)
        : 0,
    }
  })

  // City stats
  const cityCount: Record<string, number> = {}
  allProfiles.forEach(p => {
    if (p.city) cityCount[p.city] = (cityCount[p.city] ?? 0) + 1
  })
  const topCities = Object.entries(cityCount).sort(([,a],[,b]) => b - a).slice(0, 6)

  // Plan by month (last 6 months)
  const monthlyData: Record<string, { free: number; premium: number }> = {}
  allProfiles.forEach(p => {
    if (!p.createdAt) return
    const month = new Date(p.createdAt).toLocaleDateString('id-ID', { month: 'short', year: '2-digit' })
    if (!monthlyData[month]) monthlyData[month] = { free: 0, premium: 0 }
    if (p.plan === 'premium') monthlyData[month].premium++
    else monthlyData[month].free++
  })
  const months = Object.entries(monthlyData).slice(-6)
  const maxMonth = Math.max(...months.map(([, d]) => d.free + d.premium), 1)

  const totalUsers = totalRow.count
  const premiumUsers = premiumRow.count
  const revenue = premiumUsers * 49000
  const conversionRate = totalUsers ? ((premiumUsers / totalUsers) * 100).toFixed(1) : '0'

  const checklistUsers = new Set(checklistRows.map(c => c.userId)).size
  const checklistChecked = checklistRows.filter(c => c.checked).length
  const totalPossible = checklistUsers * 32
  const checklistRate = totalPossible > 0 ? Math.round((checklistChecked / totalPossible) * 100) : 0

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900">Analytics</h1>
        <p className="text-gray-500 text-sm">Data penggunaan fitur dan pertumbuhan Umrava</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Revenue', val: formatRupiah(revenue), icon: '💰', sub: `${premiumUsers} user premium`, color: 'from-[#0D4A28] to-[#1B6B3A]' },
          { label: 'Konversi', val: `${conversionRate}%`, icon: '📈', sub: 'Free → Premium', color: 'from-[#8B6914] to-[#C9A84C]' },
          { label: 'Doa Difavoritkan', val: doaFavRows.length, icon: '❤️', sub: `${topDoa.length} doa unik`, color: 'from-red-500 to-red-400' },
          { label: 'Checklist Rate', val: `${checklistRate}%`, icon: '✅', sub: `${checklistUsers} user aktif`, color: 'from-blue-600 to-blue-400' },
        ].map((kpi, i) => (
          <div key={i} className={`bg-gradient-to-br ${kpi.color} text-white rounded-2xl p-5 shadow-sm`}>
            <div className="text-2xl mb-2">{kpi.icon}</div>
            <div className="text-2xl font-black">{kpi.val}</div>
            <div className="text-sm font-semibold opacity-90">{kpi.label}</div>
            <div className="text-xs opacity-70 mt-0.5">{kpi.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Pertumbuhan User per Bulan */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-bold text-gray-900 mb-4">📅 Pertumbuhan User per Bulan</h2>
          {months.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">Belum ada data</div>
          ) : (
            <div className="space-y-3">
              {months.map(([month, data]) => {
                const total = data.free + data.premium
                return (
                  <div key={month}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium text-gray-600">{month}</span>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-gray-400">{data.free} free</span>
                        <span className="text-[#C9A84C] font-bold">{data.premium} premium</span>
                        <span className="font-bold text-gray-700">{total} total</span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-gray-300 rounded-l-full" style={{ width: `${Math.round((data.free / maxMonth) * 100)}%` }} />
                      <div className="h-full bg-[#C9A84C]" style={{ width: `${Math.round((data.premium / maxMonth) * 100)}%` }} />
                    </div>
                  </div>
                )
              })}
              <div className="flex items-center gap-4 pt-2 text-xs text-gray-400">
                <div className="flex items-center gap-1"><div className="w-3 h-2 rounded bg-gray-300" /> Free</div>
                <div className="flex items-center gap-1"><div className="w-3 h-2 rounded bg-[#C9A84C]" /> Premium</div>
              </div>
            </div>
          )}
        </div>

        {/* Top Doa Favorit */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-bold text-gray-900 mb-4">🤲 Top Doa Difavoritkan</h2>
          {topDoa.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">Belum ada data favorit</div>
          ) : (
            <div className="space-y-3">
              {topDoa.map((d, i) => (
                <div key={d.id}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-gray-100 text-xs font-bold text-gray-500 flex items-center justify-center flex-shrink-0">{i+1}</span>
                      <span className="text-gray-700 truncate max-w-36">{d.judul}</span>
                    </div>
                    <span className="font-bold text-[#C9A84C] flex-shrink-0">{d.count}×</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#C9A84C] rounded-full transition-all" style={{ width: `${d.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Tahap Ibadah Progress */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-bold text-gray-900 mb-4">🕌 Progres Tahap Ibadah</h2>
          <div className="space-y-3">
            {tahapStats.map(t => (
              <div key={t.id} className="flex items-center gap-3">
                <div className="text-xl w-8 flex-shrink-0 text-center">{t.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-700 truncate">{t.judul.split('(')[0].trim()}</div>
                  <div className="text-xs text-gray-400">
                    {t.started} mulai · {t.completed} selesai
                    {t.avgCounter > 0 && ` · avg ${t.avgCounter}×`}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-black text-[#1B6B3A]">
                    {t.started > 0 ? Math.round((t.completed / t.started) * 100) : 0}%
                  </div>
                  <div className="text-xs text-gray-400">selesai</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Kota */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-bold text-gray-900 mb-4">🗺️ Sebaran Kota User</h2>
          {topCities.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">Belum ada data kota</div>
          ) : (
            <div className="space-y-3">
              {topCities.map(([city, cnt], i) => {
                const pct = Math.round((cnt / topCities[0][1]) * 100)
                return (
                  <div key={city}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-xs w-4">{i+1}</span>
                        <span className="font-medium text-gray-700">{city}</span>
                      </div>
                      <span className="font-bold text-gray-600">{cnt} user</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#1B6B3A] rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-bold text-gray-900 mb-4">📊 Ringkasan Statistik</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total User', val: totalUsers },
            { label: 'User Premium', val: premiumUsers },
            { label: 'User Free', val: totalUsers - premiumUsers },
            { label: 'Total Favorit Doa', val: doaFavRows.length },
            { label: 'User Aktif Checklist', val: checklistUsers },
            { label: 'Checklist Selesai', val: checklistChecked },
            { label: 'Tahap Ibadah Selesai', val: ibadahRows.filter(i => i.completed).length },
            { label: 'Est. Revenue', val: formatRupiah(revenue) },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-lg font-black text-gray-900">{item.val}</div>
              <div className="text-xs text-gray-500 mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

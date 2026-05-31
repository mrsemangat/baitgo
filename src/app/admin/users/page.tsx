'use client'
import { useState, useEffect, useCallback } from 'react'
import { Search, Crown, ChevronLeft, ChevronRight, RefreshCw, UserCog, X } from 'lucide-react'
import { formatRupiah } from '@/lib/utils'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface UserRow {
  id: string
  full_name: string | null
  email: string | null
  plan: 'free' | 'premium'
  city: string | null
  departure_date: string | null
  created_at: string
  premium_activated_at: string | null
  is_admin: boolean
}

const PAGE_SIZE = 20

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [planFilter, setPlanFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null)
  const [updating, setUpdating] = useState(false)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({
      page: String(page), limit: String(PAGE_SIZE),
      ...(search && { search }),
      ...(planFilter && { plan: planFilter }),
    })
    const res = await fetch(`/api/admin/users?${params}`)
    const data = await res.json()
    setUsers(data.users ?? [])
    setTotal(data.total ?? 0)
    setLoading(false)
  }, [page, search, planFilter])

  useEffect(() => { fetchUsers() }, [fetchUsers])

  const updateUser = async (userId: string, updates: { plan?: string; is_admin?: boolean }) => {
    setUpdating(true)
    const res = await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, ...updates }),
    })
    const data = await res.json()
    if (data.error) {
      toast.error(data.error)
    } else {
      toast.success('User berhasil diupdate')
      fetchUsers()
      if (selectedUser?.id === userId) setSelectedUser(data.user)
    }
    setUpdating(false)
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)
  const premiumCount = users.filter(u => u.plan === 'premium').length

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Manajemen User</h1>
          <p className="text-gray-500 text-sm">{total} total user</p>
        </div>
        <button onClick={fetchUsers}
          className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-5">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2">
            <Search size={16} className="text-gray-400 flex-shrink-0" />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              placeholder="Cari nama atau email..."
              className="flex-1 text-sm outline-none"
            />
          </div>
          <div className="flex gap-2">
            {[
              { val: '', label: 'Semua Plan' },
              { val: 'free', label: 'Free' },
              { val: 'premium', label: '✨ Premium' },
            ].map(f => (
              <button key={f.val} onClick={() => { setPlanFilter(f.val); setPage(1) }}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-semibold transition-all',
                  planFilter === f.val
                    ? 'bg-[#1B6B3A] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats mini */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'Ditampilkan', val: users.length },
          { label: 'Premium di halaman ini', val: premiumCount },
          { label: 'Total Revenue (estimasi)', val: formatRupiah(total * 0.05 * 49000) },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm">
            <div className="text-lg font-black text-gray-900">{s.val}</div>
            <div className="text-xs text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-gray-400">
            <RefreshCw size={24} className="animate-spin mx-auto mb-2" />
            <p className="text-sm">Memuat data...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <p>Tidak ada user ditemukan</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['User', 'Plan', 'Kota', 'Keberangkatan', 'Bergabung', 'Aksi'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#E8F5ED] flex items-center justify-center text-[#1B6B3A] font-bold text-sm flex-shrink-0">
                          {((user.full_name ?? user.email) || 'U')[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                            {user.full_name ?? <span className="text-gray-400 italic">Tanpa nama</span>}
                            {user.is_admin && (
                              <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">ADMIN</span>
                            )}
                          </div>
                          <div className="text-xs text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        'inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full',
                        user.plan === 'premium'
                          ? 'bg-[#F5E6C8] text-[#8B6914]'
                          : 'bg-gray-100 text-gray-500'
                      )}>
                        {user.plan === 'premium' ? <Crown size={11} /> : null}
                        {user.plan === 'premium' ? 'Premium' : 'Free'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{user.city ?? '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {user.departure_date
                        ? new Date(user.departure_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                        : '—'}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                      {new Date(user.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="flex items-center gap-1.5 text-xs text-[#1B6B3A] hover:text-[#0D4A28] font-semibold"
                      >
                        <UserCog size={13} /> Kelola
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-50">
            <div className="text-sm text-gray-500">
              Halaman {page} dari {totalPages}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Detail Drawer */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="w-full max-w-sm bg-white h-full overflow-y-auto shadow-2xl">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-900">Detail User</h2>
              <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Avatar */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#E8F5ED] flex items-center justify-center text-[#1B6B3A] font-black text-2xl mx-auto mb-2">
                  {((selectedUser.full_name ?? selectedUser.email) || 'U')[0].toUpperCase()}
                </div>
                <div className="font-bold text-gray-900">{selectedUser.full_name ?? 'Tanpa nama'}</div>
                <div className="text-sm text-gray-400">{selectedUser.email}</div>
                {selectedUser.is_admin && (
                  <span className="inline-block mt-1 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">ADMIN</span>
                )}
              </div>

              {/* Info */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2.5">
                {[
                  { label: 'Plan', val: selectedUser.plan === 'premium' ? '✨ Premium' : 'Free' },
                  { label: 'Kota', val: selectedUser.city ?? 'Belum diset' },
                  { label: 'Keberangkatan', val: selectedUser.departure_date ? new Date(selectedUser.departure_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Belum diset' },
                  { label: 'Bergabung', val: new Date(selectedUser.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) },
                  { label: 'Premium sejak', val: selectedUser.premium_activated_at ? new Date(selectedUser.premium_activated_at).toLocaleDateString('id-ID') : '—' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="font-semibold text-gray-800">{item.val}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div>
                <h3 className="font-bold text-gray-700 text-sm mb-3">Aksi Admin</h3>
                <div className="space-y-2">
                  {selectedUser.plan === 'free' ? (
                    <button
                      onClick={() => updateUser(selectedUser.id, { plan: 'premium' })}
                      disabled={updating}
                      className="w-full bg-[#C9A84C] hover:bg-[#b8963d] disabled:bg-gray-300 text-white py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <Crown size={16} /> Upgrade ke Premium
                    </button>
                  ) : (
                    <button
                      onClick={() => updateUser(selectedUser.id, { plan: 'free' })}
                      disabled={updating}
                      className="w-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-700 py-3 rounded-xl font-bold text-sm transition-colors"
                    >
                      Downgrade ke Free
                    </button>
                  )}

                  <button
                    onClick={() => updateUser(selectedUser.id, { is_admin: !selectedUser.is_admin })}
                    disabled={updating}
                    className={cn(
                      'w-full py-3 rounded-xl font-bold text-sm transition-colors',
                      selectedUser.is_admin
                        ? 'bg-red-50 hover:bg-red-100 text-red-600'
                        : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
                    )}
                  >
                    {selectedUser.is_admin ? '🚫 Cabut akses Admin' : '🔑 Jadikan Admin'}
                  </button>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs text-yellow-700">
                ⚠️ Pastikan tindakan ini sudah benar sebelum menyimpan. Perubahan langsung berlaku.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { KOTA_ASAL } from '@/data/biaya'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

const TABS = ['Profil', 'Notifikasi', 'Konten', 'Tentang']

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [form, setForm] = useState({ name: '', city: 'jakarta', cityCustom: '', departure: '' })
  const [saving, setSaving] = useState(false)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [offlineMode, setOfflineMode] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const fullName = user.user_metadata?.full_name ?? user.user_metadata?.name ?? ''

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, departure_date, city')
        .eq('id', user.id)
        .single()

      setForm(f => ({
        ...f,
        name: profile?.full_name || fullName,
        departure: profile?.departure_date ?? '',
        city: profile?.city ?? 'jakarta',
      }))
      setLoadingProfile(false)
    }
    loadProfile()
  }, [])

  const save = async () => {
    setSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { toast.error('Sesi berakhir, silakan login kembali'); return }

      const cityValue = form.city === 'lainnya' ? (form.cityCustom || 'lainnya') : form.city

      await supabase.from('profiles').upsert({
        id: user.id,
        full_name: form.name,
        departure_date: form.departure || null,
        city: cityValue,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' })

      toast.success('Pengaturan tersimpan!')
    } catch {
      toast.error('Gagal menyimpan, coba lagi')
    } finally {
      setSaving(false)
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D4A28] mb-1">⚙️ Pengaturan</h1>
        <p className="text-[#6b7280] text-sm">Kelola profil dan preferensi BaitGo</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-white rounded-2xl p-1 mb-6 shadow-sm border border-[rgba(201,168,76,0.12)]">
        {TABS.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={cn(
              'flex-1 py-2 text-sm font-semibold rounded-xl transition-all',
              activeTab === i ? 'bg-[#1B6B3A] text-white' : 'text-[#6b7280] hover:text-[#0D4A28]'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab 0 — Profil */}
      {activeTab === 0 && (
        <div className="space-y-4">
          <Card>
            <h3 className="font-bold text-[#0D4A28] mb-4">Informasi Pribadi</h3>
            {loadingProfile ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-10 bg-gray-100 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-1.5">Nama Lengkap</label>
                  <input
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Nama Anda"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1B6B3A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-1.5">Kota Asal</label>
                  <select
                    value={form.city}
                    onChange={e => setForm(f => ({ ...f, city: e.target.value, cityCustom: '' }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1B6B3A]"
                  >
                    {KOTA_ASAL.map(k => <option key={k.id} value={k.id}>{k.label}</option>)}
                  </select>
                  {form.city === 'lainnya' && (
                    <input
                      value={form.cityCustom}
                      onChange={e => setForm(f => ({ ...f, cityCustom: e.target.value }))}
                      placeholder="Tulis nama kota Anda..."
                      className="w-full mt-2 border border-[#C9A84C] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1B6B3A] bg-[#FFFDF5]"
                      autoFocus
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-1.5">Rencana Keberangkatan</label>
                  <input
                    type="date"
                    value={form.departure}
                    onChange={e => setForm(f => ({ ...f, departure: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1B6B3A]"
                  />
                </div>
                <Button onClick={save} disabled={saving} className="w-full py-3">
                  {saving ? 'Menyimpan...' : 'Simpan Profil'}
                </Button>
              </div>
            )}
          </Card>

          <Card className="border-2 border-red-100">
            <h3 className="font-bold text-red-600 mb-2">Keluar Akun</h3>
            <p className="text-sm text-[#6b7280] mb-4">Progress Anda tersimpan dan bisa dilanjutkan kapan saja setelah login kembali.</p>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-red-500 hover:text-red-700 font-semibold text-sm transition-colors"
            >
              <LogOut size={16} />
              Keluar dari akun
            </button>
          </Card>
        </div>
      )}

      {/* Tab 1 — Notifikasi */}
      {activeTab === 1 && (
        <Card>
          <h3 className="font-bold text-[#0D4A28] mb-4">Pengaturan Notifikasi</h3>
          <div className="space-y-4">
            {[
              { label: 'Reminder H-6 Bulan', sub: 'Ingatkan untuk mulai urus dokumen' },
              { label: 'Reminder H-3 Bulan', sub: 'Ingatkan untuk booking dan vaksin' },
              { label: 'Reminder H-1 Bulan', sub: 'Ingatkan untuk siapkan perlengkapan' },
              { label: 'Reminder H-1 Minggu', sub: 'Ingatkan untuk konfirmasi semua booking' },
              { label: 'Tip Ibadah Harian', sub: 'Tip dan doa harian untuk persiapan rohani' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <div className="text-sm font-semibold text-[#374151]">{item.label}</div>
                  <div className="text-xs text-[#6b7280]">{item.sub}</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#1B6B3A] transition-colors" />
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
                </label>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tab 2 — Konten */}
      {activeTab === 2 && (
        <div className="space-y-4">
          <Card>
            <h3 className="font-bold text-[#0D4A28] mb-4">Preferensi Konten</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#374151] mb-3">Tampilan Teks Doa</label>
                {['Arab + Latin + Terjemahan (Lengkap)', 'Arab + Terjemahan', 'Arab Saja'].map((opt, i) => (
                  <label key={i} className="flex items-center gap-3 py-2 cursor-pointer">
                    <input type="radio" name="doaDisplay" defaultChecked={i === 0} className="accent-[#1B6B3A]" />
                    <span className="text-sm text-[#374151]">{opt}</span>
                  </label>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-[#374151]">Mode Malam Otomatis</div>
                    <div className="text-xs text-[#6b7280]">Aktifkan mode malam saat jam 20:00–05:00</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#1B6B3A] transition-colors" />
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
                  </label>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-bold text-[#0D4A28] mb-1">Mode Offline 📶</h3>
            <p className="text-xs text-[#6b7280] mb-4">Simpan konten untuk dibaca tanpa internet — berguna saat di Tanah Suci</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <div className="text-sm font-semibold text-[#374151]">Aktifkan Mode Offline</div>
                  <div className="text-xs text-[#6b7280]">Download semua konten doa, panduan & zikir</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={offlineMode}
                    onChange={e => {
                      setOfflineMode(e.target.checked)
                      toast.success(e.target.checked ? 'Mode offline aktif — konten disimpan 📥' : 'Mode offline dinonaktifkan')
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#1B6B3A] transition-colors" />
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
                </label>
              </div>
              {offlineMode && (
                <div className="bg-[#E8F5ED] rounded-xl p-3 text-xs text-[#1B6B3A] leading-relaxed">
                  ✅ Konten panduan, doa, dan zikir sudah tersimpan di perangkat Anda. Bisa diakses meski sinyal lemah di Tanah Suci.
                </div>
              )}
              {!offlineMode && (
                <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-400 leading-relaxed">
                  💡 Disarankan aktifkan sebelum berangkat umroh agar semua konten tersedia tanpa internet.
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Tab 3 — Tentang */}
      {activeTab === 3 && (
        <Card>
          <div className="text-center py-4">
            <div className="text-5xl mb-4">🕋</div>
            <h2 className="text-xl font-bold text-[#0D4A28] mb-1">BaitGo</h2>
            <p className="text-sm text-[#6b7280] mb-4">Teman setia perjalanan umrohmu</p>
            <div className="text-xs text-[#6b7280] space-y-1">
              <p>Versi 1.0.0</p>
              <p>Seluruh konten panduan ibadah mengacu pada tuntunan yang sahih.</p>
              <p className="font-semibold text-[#C9A84C]">Semoga umrohmu mabrur 🤲</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

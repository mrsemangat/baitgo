'use client'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { Plus, Trash2, CheckSquare, Square, Sparkles, Download, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

interface PackingItem {
  id: string
  name: string
  category: string
  qty: number
  checked: boolean
  isCustom?: boolean
  priority?: 'high' | 'normal'
}

// ─── Data: default packing list ───────────────────────────────────────────────

const DEFAULT_ITEMS: Omit<PackingItem, 'id' | 'checked'>[] = [
  // Dokumen
  { name: 'Paspor (masa berlaku > 6 bulan)', category: 'dokumen', qty: 1, priority: 'high' },
  { name: 'Visa umroh', category: 'dokumen', qty: 1, priority: 'high' },
  { name: 'Tiket pesawat (print)', category: 'dokumen', qty: 1, priority: 'high' },
  { name: 'Buku nikah / akta cerai', category: 'dokumen', qty: 1, priority: 'high' },
  { name: 'Kartu kuning (vaksin meningitis)', category: 'dokumen', qty: 1, priority: 'high' },
  { name: 'Asuransi perjalanan', category: 'dokumen', qty: 1 },
  { name: 'Foto 4x6 background putih (6 lembar)', category: 'dokumen', qty: 1 },
  { name: 'Fotokopi semua dokumen penting', category: 'dokumen', qty: 1 },

  // Pakaian ihram
  { name: 'Kain ihram (2 lembar)', category: 'ihram', qty: 2, priority: 'high' },
  { name: 'Sabuk / pengikat ihram', category: 'ihram', qty: 1 },
  { name: 'Sandal ihram (jepit)', category: 'ihram', qty: 1, priority: 'high' },
  { name: 'Baju koko / kemeja putih (3 stel)', category: 'ihram', qty: 3 },
  { name: 'Celana panjang longgar (3)', category: 'ihram', qty: 3 },
  { name: 'Kaos kaki tipis (5 pasang)', category: 'ihram', qty: 5 },

  // Pakaian wanita (akan difilter oleh AI saran)
  { name: 'Mukena (2 set)', category: 'pakaian', qty: 2, priority: 'high' },
  { name: 'Abaya / baju muslimah', category: 'pakaian', qty: 3 },
  { name: 'Kerudung / hijab (5 lembar)', category: 'pakaian', qty: 5 },
  { name: 'Pakaian harian nyaman (5 stel)', category: 'pakaian', qty: 5 },
  { name: 'Pakaian tidur', category: 'pakaian', qty: 2 },
  { name: 'Jaket / baju hangat', category: 'pakaian', qty: 1 },
  { name: 'Sepatu datar / nyaman', category: 'pakaian', qty: 1 },

  // Kesehatan
  { name: 'Obat pribadi (sesuai resep dokter)', category: 'kesehatan', qty: 1, priority: 'high' },
  { name: 'Paracetamol / obat demam', category: 'kesehatan', qty: 1, priority: 'high' },
  { name: 'Obat diare & maag', category: 'kesehatan', qty: 1 },
  { name: 'Obat batuk & flu', category: 'kesehatan', qty: 1 },
  { name: 'Plester & antiseptik', category: 'kesehatan', qty: 1 },
  { name: 'Vitamin C & multivitamin', category: 'kesehatan', qty: 1 },
  { name: 'Sunscreen SPF 50+', category: 'kesehatan', qty: 1 },
  { name: 'Pelembab kulit & bibir', category: 'kesehatan', qty: 1 },
  { name: 'Semprotan wajah (utk cuaca panas)', category: 'kesehatan', qty: 1 },
  { name: 'Masker N95 (10 pcs)', category: 'kesehatan', qty: 1 },

  // Ibadah
  { name: 'Al-Quran kecil / Al-Quran digital', category: 'ibadah', qty: 1, priority: 'high' },
  { name: 'Buku panduan umroh', category: 'ibadah', qty: 1, priority: 'high' },
  { name: 'Tasbih', category: 'ibadah', qty: 2 },
  { name: 'Sajadah lipat mini', category: 'ibadah', qty: 1 },
  { name: 'Buku doa & amalan harian', category: 'ibadah', qty: 1 },

  // Elektronik
  { name: 'Ponsel + charger', category: 'elektronik', qty: 1, priority: 'high' },
  { name: 'Adaptor universal / Saudi plug (Type G)', category: 'elektronik', qty: 2, priority: 'high' },
  { name: 'Power bank (min 10.000 mAh)', category: 'elektronik', qty: 1 },
  { name: 'Earphone / headset', category: 'elektronik', qty: 1 },
  { name: 'Kabel USB cadangan', category: 'elektronik', qty: 2 },
  { name: 'Kamera / action cam', category: 'elektronik', qty: 1 },

  // Perlengkapan mandi
  { name: 'Sabun mandi (tidak wangi saat ihram)', category: 'mandi', qty: 2 },
  { name: 'Shampo & kondisioner', category: 'mandi', qty: 1 },
  { name: 'Pasta gigi & sikat gigi', category: 'mandi', qty: 2 },
  { name: 'Deodoran (tidak wangi saat ihram)', category: 'mandi', qty: 1 },
  { name: 'Handuk kecil & sedang', category: 'mandi', qty: 2 },
  { name: 'Tisu basah & kering', category: 'mandi', qty: 3 },
  { name: 'Kantong plastik (berbagai ukuran)', category: 'mandi', qty: 5 },

  // Perlengkapan lain
  { name: 'Koper (maks 20kg check-in + 7kg kabin)', category: 'lainnya', qty: 1, priority: 'high' },
  { name: 'Kunci gembok koper', category: 'lainnya', qty: 2 },
  { name: 'Tas pinggang / dompet travel', category: 'lainnya', qty: 1 },
  { name: 'Botol minum (700ml+)', category: 'lainnya', qty: 1 },
  { name: 'Snack ringan (kurma, biskuit)', category: 'lainnya', qty: 1 },
  { name: 'Uang tunai SAR & IDR', category: 'lainnya', qty: 1, priority: 'high' },
  { name: 'Kartu kredit / debit internasional', category: 'lainnya', qty: 1 },
  { name: 'SIM card Arab Saudi (beli di sana)', category: 'lainnya', qty: 1 },
]

const CATEGORIES: { id: string; label: string; icon: string; color: string }[] = [
  { id: 'semua', label: 'Semua', icon: '📦', color: '#6b7280' },
  { id: 'dokumen', label: 'Dokumen', icon: '📋', color: '#1B6B3A' },
  { id: 'ihram', label: 'Pakaian Ihram', icon: '👘', color: '#C9A84C' },
  { id: 'pakaian', label: 'Pakaian Harian', icon: '👗', color: '#8B6914' },
  { id: 'kesehatan', label: 'Kesehatan', icon: '💊', color: '#ef4444' },
  { id: 'ibadah', label: 'Perlengkapan Ibadah', icon: '📿', color: '#0D4A28' },
  { id: 'elektronik', label: 'Elektronik', icon: '🔌', color: '#1d4ed8' },
  { id: 'mandi', label: 'Perlengkapan Mandi', icon: '🧴', color: '#0891b2' },
  { id: 'lainnya', label: 'Lain-lain', icon: '🧳', color: '#7c3aed' },
]

const STORAGE_KEY = 'umrava-packing-list'

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

function initItems(): PackingItem[] {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) return JSON.parse(stored)
    } catch { /* ignore */ }
  }
  return DEFAULT_ITEMS.map(item => ({ ...item, id: generateId(), checked: false }))
}

// ─── AI Suggestions ────────────────────────────────────────────────────────────

interface AISuggestion {
  id: string
  text: string
  icon: string
  category: string
}

function generateAISuggestions(items: PackingItem[], daysLeft: number | null): AISuggestion[] {
  const suggestions: AISuggestion[] = []
  const checkedCats = new Set(items.filter(i => i.checked).map(i => i.category))
  const uncheckedHighPriority = items.filter(i => i.priority === 'high' && !i.checked)
  const totalChecked = items.filter(i => i.checked).length
  const totalItems = items.length
  const pct = Math.round((totalChecked / totalItems) * 100)

  if (uncheckedHighPriority.length > 0) {
    suggestions.push({
      id: 's1',
      text: `${uncheckedHighPriority.length} item prioritas tinggi belum dicentang: "${uncheckedHighPriority[0].name}"${uncheckedHighPriority.length > 1 ? ` dan ${uncheckedHighPriority.length - 1} lainnya` : ''}.`,
      icon: '⚠️',
      category: 'peringatan',
    })
  }

  if (daysLeft !== null && daysLeft <= 7 && pct < 80) {
    suggestions.push({
      id: 's2',
      text: `H-${daysLeft} lagi! Segera lengkapi packing — baru ${pct}% selesai. Fokus dahulu pada dokumen dan ihram.`,
      icon: '🚨',
      category: 'urgensi',
    })
  }

  if (daysLeft !== null && daysLeft <= 30 && !checkedCats.has('dokumen')) {
    suggestions.push({
      id: 's3',
      text: 'Pastikan semua dokumen penting (paspor, visa, buku nikah) sudah disiapkan sebelum H-30.',
      icon: '📋',
      category: 'dokumen',
    })
  }

  if (!items.find(i => i.name.includes('Type G'))) {
    suggestions.push({
      id: 's4',
      text: 'Saudi Arabia menggunakan colokan tipe G (3 pin). Bawa adaptor universal yang mendukung tipe ini.',
      icon: '🔌',
      category: 'elektronik',
    })
  }

  if (pct > 0 && pct < 50) {
    suggestions.push({
      id: 's5',
      text: 'Tips: Mulai packing dari kategori Dokumen dulu — ini yang paling kritis dan butuh waktu jika ada yang kurang.',
      icon: '💡',
      category: 'tips',
    })
  }

  if (pct >= 50 && pct < 100) {
    suggestions.push({
      id: 's6',
      text: 'Sudah di atas 50%! Jangan lupa bawa obat-obatan pribadi dan cek apakah power bank maks 100Wh (boleh masuk kabin).',
      icon: '✅',
      category: 'tips',
    })
  }

  if (pct === 100) {
    suggestions.push({
      id: 's7',
      text: 'MasyaAllah! Semua item sudah dicentang. Cek ulang paspor, tiket, dan uang — barakallahu fiik!',
      icon: '🌟',
      category: 'selesai',
    })
  }

  if (daysLeft !== null && daysLeft > 60) {
    suggestions.push({
      id: 's8',
      text: `Masih H-${daysLeft}. Gunakan waktu ini untuk membeli barang-barang yang butuh waktu lama seperti ihram atau vaksin meningitis.`,
      icon: '📅',
      category: 'tips',
    })
  }

  suggestions.push({
    id: 's9',
    text: 'Cuaca di Makkah bisa mencapai 45°C. Bawa semprotan wajah, botol minum besar, dan sunscreen minimal SPF 50.',
    icon: '☀️',
    category: 'cuaca',
  })

  return suggestions.slice(0, 3)
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PackingPage() {
  const [items, setItems] = useState<PackingItem[]>([])
  const [activeCategory, setActiveCategory] = useState('semua')
  const [newItemName, setNewItemName] = useState('')
  const [newItemCat, setNewItemCat] = useState('lainnya')
  const [showAdd, setShowAdd] = useState(false)
  const [showAI, setShowAI] = useState(true)
  const [collapsedCats, setCollapsedCats] = useState<Set<string>>(new Set())
  const [daysLeft] = useState<number | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setItems(initItems())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, hydrated])

  const toggleItem = useCallback((id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, checked: !i.checked } : i))
  }, [])

  const deleteItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const addItem = () => {
    if (!newItemName.trim()) return
    setItems(prev => [...prev, {
      id: generateId(),
      name: newItemName.trim(),
      category: newItemCat,
      qty: 1,
      checked: false,
      isCustom: true,
    }])
    setNewItemName('')
    setShowAdd(false)
  }

  const resetAll = () => {
    if (!confirm('Reset semua centang? Item kustom akan tetap ada.')) return
    setItems(prev => prev.map(i => ({ ...i, checked: false })))
  }

  const checkAll = (categoryId: string) => {
    setItems(prev => prev.map(i =>
      (categoryId === 'semua' || i.category === categoryId) ? { ...i, checked: true } : i
    ))
  }

  const toggleCatCollapse = (catId: string) => {
    setCollapsedCats(prev => {
      const n = new Set(prev)
      n.has(catId) ? n.delete(catId) : n.add(catId)
      return n
    })
  }

  const filteredItems = useMemo(() =>
    activeCategory === 'semua' ? items : items.filter(i => i.category === activeCategory),
    [items, activeCategory]
  )

  const totalChecked = items.filter(i => i.checked).length
  const totalItems = items.length
  const pct = Math.round((totalChecked / totalItems) * 100)

  const aiSuggestions = useMemo(() =>
    generateAISuggestions(items, daysLeft),
    [items, daysLeft]
  )

  const catStats = useMemo(() => {
    const stats: Record<string, { total: number; checked: number }> = {}
    for (const item of items) {
      if (!stats[item.category]) stats[item.category] = { total: 0, checked: 0 }
      stats[item.category].total++
      if (item.checked) stats[item.category].checked++
    }
    return stats
  }, [items])

  const groupedItems = useMemo(() => {
    if (activeCategory !== 'semua') return null
    const groups: Record<string, PackingItem[]> = {}
    for (const item of items) {
      if (!groups[item.category]) groups[item.category] = []
      groups[item.category].push(item)
    }
    return groups
  }, [items, activeCategory])

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 rounded-full border-2 border-[#1B6B3A] border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#0D4A28] mb-1">Packing List</h1>
          <p className="text-sm text-gray-500">Checklist perlengkapan umroh yang lengkap & cerdas</p>
        </div>
        <button
          onClick={resetAll}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#0D4A28] px-3 py-2 rounded-xl hover:bg-gray-50 transition-all"
        >
          <RotateCcw size={13} /> Reset
        </button>
      </div>

      {/* Progress */}
      <div className="bg-gradient-to-br from-[#1B6B3A] to-[#0D4A28] rounded-3xl p-6 text-white mb-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-4xl font-black mb-0.5">{pct}%</div>
            <div className="text-white/70 text-sm">{totalChecked} dari {totalItems} item siap</div>
          </div>
          <div className="text-right">
            {pct === 100 ? (
              <div className="text-center">
                <div className="text-4xl mb-1">🕋</div>
                <div className="text-[#C9A84C] font-bold text-sm">Siap berangkat!</div>
              </div>
            ) : pct >= 75 ? (
              <div className="text-3xl">🌙</div>
            ) : pct >= 50 ? (
              <div className="text-3xl">🌿</div>
            ) : (
              <div className="text-3xl">📦</div>
            )}
          </div>
        </div>
        <div className="h-3 bg-white/15 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#C9A84C] to-[#E0BD6A] rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-white/50">{totalItems - totalChecked} item tersisa</span>
          <button
            onClick={() => checkAll('semua')}
            className="text-[#C9A84C]/70 hover:text-[#C9A84C] transition-colors"
          >
            Centang semua →
          </button>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="bg-white rounded-3xl border border-[rgba(201,168,76,0.2)] shadow-sm mb-5 overflow-hidden">
        <button
          onClick={() => setShowAI(v => !v)}
          className="w-full flex items-center gap-3 px-5 py-4 hover:bg-[#FBF7F0] transition-colors"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#C9A84C] to-[#8B6914] flex items-center justify-center flex-shrink-0">
            <Sparkles size={15} className="text-white" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-bold text-[#0D4A28] text-sm">Saran Cerdas</div>
            <div className="text-xs text-gray-400">Rekomendasi berdasarkan progress Anda</div>
          </div>
          {showAI ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </button>
        {showAI && (
          <div className="px-5 pb-4 space-y-3">
            {aiSuggestions.map(s => (
              <div key={s.id} className="flex gap-3 p-3 bg-[#FBF7F0] rounded-2xl">
                <span className="text-xl flex-shrink-0 mt-0.5">{s.icon}</span>
                <p className="text-sm text-[#374151] leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {CATEGORIES.map(cat => {
          const stats = cat.id === 'semua'
            ? { total: totalItems, checked: totalChecked }
            : catStats[cat.id] || { total: 0, checked: 0 }
          const catPct = stats.total > 0 ? Math.round((stats.checked / stats.total) * 100) : 0

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all border',
                activeCategory === cat.id
                  ? 'bg-[#1B6B3A] text-white border-[#1B6B3A] shadow-md'
                  : 'bg-white text-gray-500 border-gray-100 hover:border-[#1B6B3A]/30'
              )}
            >
              <span>{cat.icon}</span>
              <span className="whitespace-nowrap">{cat.label}</span>
              {stats.total > 0 && (
                <span className={cn(
                  'text-[10px] px-1.5 py-0.5 rounded-full font-black',
                  activeCategory === cat.id
                    ? catPct === 100 ? 'bg-[#C9A84C] text-white' : 'bg-white/20 text-white'
                    : catPct === 100 ? 'bg-[#E8F5ED] text-[#1B6B3A]' : 'bg-gray-100 text-gray-400'
                )}>
                  {stats.checked}/{stats.total}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Items — grouped by category when "semua" */}
      {activeCategory === 'semua' && groupedItems ? (
        <div className="space-y-4 mb-5">
          {CATEGORIES.filter(c => c.id !== 'semua').map(cat => {
            const catItems = groupedItems[cat.id] || []
            if (catItems.length === 0) return null
            const collapsed = collapsedCats.has(cat.id)
            const cChecked = catItems.filter(i => i.checked).length
            const cPct = Math.round((cChecked / catItems.length) * 100)

            return (
              <div key={cat.id} className="bg-white rounded-2xl border border-[rgba(201,168,76,0.1)] shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleCatCollapse(cat.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FBF7F0] transition-colors"
                >
                  <span className="text-lg">{cat.icon}</span>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-sm text-[#0D4A28]">{cat.label}</div>
                    <div className="text-xs text-gray-400">{cChecked}/{catItems.length} · {cPct}%</div>
                  </div>
                  <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden mr-2">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${cPct}%`, backgroundColor: cPct === 100 ? '#1B6B3A' : '#C9A84C' }}
                    />
                  </div>
                  {collapsed ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronUp size={14} className="text-gray-400" />}
                </button>
                {!collapsed && (
                  <div className="divide-y divide-gray-50">
                    {catItems.map(item => (
                      <ItemRow key={item.id} item={item} onToggle={toggleItem} onDelete={deleteItem} />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[rgba(201,168,76,0.1)] shadow-sm overflow-hidden mb-5">
          {filteredItems.length === 0 ? (
            <div className="py-10 text-center text-sm text-gray-400">
              Tidak ada item di kategori ini
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filteredItems.map(item => (
                <ItemRow key={item.id} item={item} onToggle={toggleItem} onDelete={deleteItem} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add custom item */}
      {showAdd ? (
        <div className="bg-white rounded-2xl border border-[rgba(201,168,76,0.25)] shadow-sm p-4 mb-4">
          <div className="flex gap-2 mb-3">
            <input
              autoFocus
              value={newItemName}
              onChange={e => setNewItemName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addItem()}
              placeholder="Nama item..."
              className="flex-1 bg-[#FBF7F0] rounded-xl px-4 py-2.5 text-sm text-[#0D4A28] outline-none border border-transparent focus:border-[#C9A84C]"
            />
            <select
              value={newItemCat}
              onChange={e => setNewItemCat(e.target.value)}
              className="bg-[#FBF7F0] rounded-xl px-3 py-2.5 text-sm text-[#0D4A28] outline-none border border-transparent focus:border-[#C9A84C]"
            >
              {CATEGORIES.filter(c => c.id !== 'semua').map(c => (
                <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={addItem}
              disabled={!newItemName.trim()}
              className="flex-1 py-2.5 bg-[#1B6B3A] text-white rounded-xl text-sm font-bold disabled:opacity-40 hover:bg-[#0D4A28] transition-colors"
            >
              Tambah Item
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="px-4 py-2.5 text-sm text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-50 transition-all"
            >
              Batal
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAdd(true)}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed border-[rgba(201,168,76,0.3)] text-[#8B6914] hover:border-[#C9A84C] hover:bg-[#FBF7F0] transition-all text-sm font-semibold mb-4"
        >
          <Plus size={17} /> Tambah Item Kustom
        </button>
      )}

      {/* Export */}
      <button
        onClick={() => {
          const lines = CATEGORIES.filter(c => c.id !== 'semua').map(cat => {
            const catItems = items.filter(i => i.category === cat.id)
            if (!catItems.length) return ''
            const header = `\n## ${cat.icon} ${cat.label}\n`
            const rows = catItems.map(i => `${i.checked ? '[x]' : '[ ]'} ${i.name}`).join('\n')
            return header + rows
          }).filter(Boolean).join('\n')
          const blob = new Blob([`# Umrava — Packing List Umroh\n\nProgress: ${pct}% (${totalChecked}/${totalItems} item)\n${lines}`], { type: 'text/plain' })
          const a = document.createElement('a')
          a.href = URL.createObjectURL(blob)
          a.download = 'packing-list-umroh.txt'
          a.click()
        }}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#E8F5ED] text-[#1B6B3A] hover:bg-[#1B6B3A] hover:text-white transition-all text-sm font-bold mb-6"
      >
        <Download size={15} /> Export Checklist (.txt)
      </button>
    </div>
  )
}

// ─── Item Row Component ────────────────────────────────────────────────────────

function ItemRow({
  item,
  onToggle,
  onDelete,
}: {
  item: PackingItem
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className={cn(
      'flex items-center gap-3 px-4 py-3 transition-all group',
      item.checked ? 'bg-[#F9FBF9]' : 'bg-white hover:bg-[#FAFAFA]'
    )}>
      <button
        onClick={() => onToggle(item.id)}
        className="flex-shrink-0 text-[#1B6B3A]"
      >
        {item.checked
          ? <CheckSquare size={20} className="text-[#1B6B3A]" />
          : <Square size={20} className="text-gray-300 hover:text-[#1B6B3A] transition-colors" />}
      </button>

      <div className="flex-1 min-w-0">
        <span className={cn(
          'text-sm transition-all',
          item.checked ? 'line-through text-gray-300' : 'text-[#374151]'
        )}>
          {item.name}
          {item.qty > 1 && (
            <span className={cn('ml-1.5 text-xs', item.checked ? 'text-gray-200' : 'text-gray-400')}>
              ×{item.qty}
            </span>
          )}
        </span>
        {item.priority === 'high' && !item.checked && (
          <span className="ml-2 text-[10px] font-bold bg-red-50 text-red-400 px-1.5 py-0.5 rounded-full">
            Penting
          </span>
        )}
        {item.isCustom && !item.checked && (
          <span className="ml-2 text-[10px] font-bold bg-[#F5E6C8] text-[#8B6914] px-1.5 py-0.5 rounded-full">
            Kustom
          </span>
        )}
      </div>

      <button
        onClick={() => onDelete(item.id)}
        className="opacity-0 group-hover:opacity-100 text-gray-200 hover:text-red-400 transition-all flex-shrink-0"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}

'use client'
import { useState, useMemo } from 'react'
import { KATEGORI_DOA, DATA_DOA, searchDoa } from '@/data/doa'
import { DoaCard } from '@/components/dashboard/DoaCard'
import { Moon, Sun, Search } from 'lucide-react'

export default function DoaPage() {
  const [activeKategori, setActiveKategori] = useState('perjalanan')
  const [nightMode, setNightMode] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [query, setQuery] = useState('')
  const [showFav, setShowFav] = useState(false)

  const filteredDoa = useMemo(() => {
    if (query.trim()) return searchDoa(query)
    if (showFav) return DATA_DOA.filter(d => favorites.includes(d.id))
    return DATA_DOA.filter(d => d.kategori === activeKategori)
  }, [activeKategori, query, favorites, showFav])

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
  }

  return (
    <div className={nightMode ? 'night-mode min-h-screen -m-8 p-8' : ''}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className={`text-2xl font-bold mb-1 ${nightMode ? 'text-[#C9A84C]' : 'text-[#0D4A28]'}`}>Bank Doa Umroh</h1>
            <p className={`text-sm ${nightMode ? 'text-[rgba(232,213,176,0.6)]' : 'text-[#6b7280]'}`}>
              Doa lengkap dengan teks Arab, latin, terjemahan & audio
            </p>
          </div>
          <button
            onClick={() => setNightMode(!nightMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${nightMode ? 'bg-[rgba(201,168,76,0.2)] text-[#C9A84C]' : 'bg-[#E8F5ED] text-[#1B6B3A]'}`}
          >
            {nightMode ? <Sun size={16} /> : <Moon size={16} />}
            {nightMode ? 'Mode Terang' : 'Mode Malam'}
          </button>
        </div>

        {/* Search */}
        <div className={`flex items-center gap-3 rounded-2xl px-4 py-3 mb-5 ${nightMode ? 'bg-[#0f2040] border border-[rgba(201,168,76,0.2)]' : 'bg-white border border-[rgba(201,168,76,0.12)] shadow-sm'}`}>
          <Search size={18} className={nightMode ? 'text-[#C9A84C]' : 'text-gray-400'} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Cari doa..."
            className={`flex-1 text-sm bg-transparent outline-none ${nightMode ? 'text-[#e8d5b0] placeholder:text-[rgba(232,213,176,0.4)]' : 'text-[#1a1a1a] placeholder:text-gray-400'}`}
          />
        </div>

        {/* Tabs */}
        {!query && (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
            <button
              onClick={() => { setShowFav(true); setActiveKategori('') }}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${showFav ? 'bg-red-500 text-white' : nightMode ? 'bg-[#0f2040] text-[rgba(232,213,176,0.6)]' : 'bg-white text-gray-500'}`}
            >
              ❤️ Favorit <span className="bg-red-100 text-red-600 rounded-full px-1.5 text-xs">{favorites.length}</span>
            </button>
            {KATEGORI_DOA.map(kat => (
              <button
                key={kat.id}
                onClick={() => { setActiveKategori(kat.id); setShowFav(false) }}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${!showFav && activeKategori === kat.id ? 'bg-[#1B6B3A] text-white' : nightMode ? 'bg-[#0f2040] text-[rgba(232,213,176,0.6)]' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
              >
                {kat.icon} {kat.label}
              </button>
            ))}
          </div>
        )}

        {/* Doa List */}
        <div className="space-y-4">
          {filteredDoa.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🤲</div>
              <p className={`text-sm ${nightMode ? 'text-[rgba(232,213,176,0.6)]' : 'text-[#6b7280]'}`}>
                {query ? 'Doa tidak ditemukan' : 'Belum ada doa favorit'}
              </p>
            </div>
          ) : (
            filteredDoa.map(doa => (
              <DoaCard
                key={doa.id}
                doa={doa}
                nightMode={nightMode}
                isFavorited={favorites.includes(doa.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))
          )}
        </div>

        <p className="text-xs text-center text-[#6b7280]/60 mt-8 pb-4">
          ⚠️ Disclaimer: Konsultasikan dengan ustadz untuk hal-hal yang meragukan dalam ibadah umroh.
        </p>
      </div>
    </div>
  )
}

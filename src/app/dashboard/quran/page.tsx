'use client'
import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { Search, BookOpen, BookmarkCheck, Trash2, Loader2, SearchX } from 'lucide-react'
import { SURAH_LIST, searchSurah, getSurahByNumber, type SurahMeta } from '@/data/surahList'
import { useQuranBookmarks, type QuranBookmark } from '@/hooks/useQuranBookmarks'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterType = 'cari' | 'favorit' | 'semua' | 'populer' | 'juz30' | 'makkiyah' | 'madaniyah'
type SearchMode = 'terjemah' | 'arab'

interface SearchResult {
  globalNumber: number
  numberInSurah: number
  text: string
  surahNumber: number
  surahArabic: string
  surahLatin: string
}

const FILTERS: { id: FilterType; label: string; icon: string }[] = [
  { id: 'cari', label: 'Cari Ayat', icon: '🔍' },
  { id: 'favorit', label: 'Favorit', icon: '❤️' },
  { id: 'semua', label: 'Semua', icon: '📖' },
  { id: 'populer', label: 'Sering Dibaca', icon: '⭐' },
  { id: 'juz30', label: 'Juz 30', icon: '📚' },
  { id: 'makkiyah', label: 'Makkiyah', icon: '🕋' },
  { id: 'madaniyah', label: 'Madaniyah', icon: '🕌' },
]

// ─── Search API ───────────────────────────────────────────────────────────────

async function searchQuranAPI(
  keyword: string,
  mode: SearchMode,
  surahFilter: number | null
): Promise<SearchResult[]> {
  const edition = mode === 'terjemah' ? 'id.indonesian' : 'quran-uthmani'
  const target = surahFilter ? String(surahFilter) : 'all'
  const res = await fetch(
    `https://api.alquran.cloud/v1/search/${encodeURIComponent(keyword.trim())}/${target}/${edition}`
  )
  if (!res.ok) throw new Error('Gagal melakukan pencarian')
  const json = await res.json()
  if (!json.data || json.data.count === 0) return []
  return json.data.matches.map((m: {
    number: number; numberInSurah: number; text: string
    surah: { number: number; name: string; englishName: string }
  }) => ({
    globalNumber: m.number,
    numberInSurah: m.numberInSurah,
    text: m.text,
    surahNumber: m.surah.number,
    surahArabic: m.surah.name,
    surahLatin: m.surah.englishName,
  }))
}

// ─── Keyword Highlighter ──────────────────────────────────────────────────────

function escapeRegex(s: string) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') }

function HighlightText({ text, keyword }: { text: string; keyword: string }) {
  if (!keyword.trim()) return <>{text}</>
  const parts = text.split(new RegExp(`(${escapeRegex(keyword)})`, 'gi'))
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === keyword.toLowerCase()
          ? <mark key={i} className="bg-[#C9A84C]/35 text-[#7a5b0f] rounded px-0.5 not-italic font-medium">{part}</mark>
          : <span key={i}>{part}</span>
      )}
    </>
  )
}

// ─── Surah Card ───────────────────────────────────────────────────────────────

function SurahCard({ surah }: { surah: SurahMeta }) {
  return (
    <Link
      href={`/dashboard/quran/${surah.number}`}
      className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-sm hover:border-[#C9A84C] hover:shadow-md transition-all group"
    >
      <div className="w-10 h-10 rounded-xl bg-[#1B6B3A] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 group-hover:bg-[#C9A84C] transition-colors">
        {surah.number}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-sm text-[#0D4A28] truncate">{surah.latinName}</span>
          <span className="text-lg text-[#1B6B3A] flex-shrink-0" style={{ fontFamily: "'Amiri', serif", direction: 'rtl' }}>
            {surah.arabicName}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-gray-400">{surah.translation}</span>
          <span className="text-gray-200">·</span>
          <span className="text-xs text-gray-400">{surah.ayahCount} ayat</span>
          <span className="text-gray-200">·</span>
          <span className={cn(
            'text-[10px] font-semibold px-1.5 py-0.5 rounded-full',
            surah.revelationType === 'Makkah' ? 'bg-[#F5E6C8] text-[#8B6914]' : 'bg-[#E8F5ED] text-[#1B6B3A]'
          )}>
            {surah.revelationType}
          </span>
        </div>
      </div>
    </Link>
  )
}

// ─── Search Result Card ───────────────────────────────────────────────────────

function SearchResultCard({ result, keyword, mode }: { result: SearchResult; keyword: string; mode: SearchMode }) {
  const meta = getSurahByNumber(result.surahNumber)
  const isArab = mode === 'arab'
  return (
    <Link
      href={`/dashboard/quran/${result.surahNumber}?ayah=${result.numberInSurah}`}
      className="block bg-white rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-sm hover:border-[#C9A84C] hover:shadow-md transition-all group p-4"
    >
      {/* Surah info */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#1B6B3A] group-hover:bg-[#C9A84C] transition-colors text-white flex items-center justify-center text-[11px] font-bold">
            {result.surahNumber}
          </div>
          <div>
            <p className="text-xs font-semibold text-[#0D4A28]">{meta?.latinName ?? result.surahLatin}</p>
            <p className="text-[10px] text-gray-400">Ayat {result.numberInSurah}</p>
          </div>
        </div>
        <span className="text-[10px] text-[#8B6914] bg-[#F5E6C8] px-2 py-0.5 rounded-full font-medium">
          Buka →
        </span>
      </div>

      {/* Arabic text (always shown) */}
      {!isArab && (
        <p
          className="text-right text-[#1a1a1a] bg-[#FBF7F0] px-3 py-2 rounded-xl mb-2 text-[20px] leading-loose"
          style={{ fontFamily: "'Amiri', serif", direction: 'rtl', lineHeight: 2 }}
        >
          {result.surahArabic}
        </p>
      )}

      {/* Matching text with highlight */}
      <p className={cn(
        'text-sm leading-relaxed',
        isArab
          ? 'text-right bg-[#FBF7F0] px-3 py-2 rounded-xl text-[20px]'
          : 'text-[#374151]'
      )}
        style={isArab ? { fontFamily: "'Amiri', serif", direction: 'rtl', lineHeight: 2, fontSize: '22px' } : undefined}
      >
        {!isArab && <span className="font-semibold text-[#1B6B3A] mr-1">Artinya: </span>}
        <HighlightText text={result.text} keyword={keyword} />
      </p>
    </Link>
  )
}

// ─── Search Panel ─────────────────────────────────────────────────────────────

function SearchPanel() {
  const [keyword, setKeyword] = useState('')
  const [mode, setMode] = useState<SearchMode>('terjemah')
  const [surahFilter, setSurahFilter] = useState<number | null>(null)
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)
  const [lastKeyword, setLastKeyword] = useState('')

  const doSearch = useCallback(async () => {
    if (!keyword.trim()) return
    setLoading(true)
    setError('')
    setSearched(true)
    setLastKeyword(keyword.trim())
    try {
      const res = await searchQuranAPI(keyword, mode, surahFilter)
      setResults(res)
    } catch {
      setError('Gagal melakukan pencarian. Periksa koneksi internet.')
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [keyword, mode, surahFilter])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') doSearch()
  }

  return (
    <div className="space-y-4">
      {/* Keyword input */}
      <div className="flex gap-2">
        <div className="flex-1 flex items-center gap-2 bg-white rounded-2xl px-4 py-3 border border-[rgba(201,168,76,0.15)] shadow-sm">
          <Search size={16} className="text-gray-400 flex-shrink-0" />
          <input
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={mode === 'terjemah' ? 'Cari kata dalam terjemah...' : 'Cari teks Arab...'}
            className="flex-1 text-sm bg-transparent outline-none text-[#1a1a1a] placeholder:text-gray-400"
            dir={mode === 'arab' ? 'rtl' : 'ltr'}
          />
          {keyword && (
            <button onClick={() => { setKeyword(''); setResults([]); setSearched(false) }}
              className="text-gray-400 hover:text-gray-600 text-xs">✕</button>
          )}
        </div>
        <button
          onClick={doSearch}
          disabled={!keyword.trim() || loading}
          className="px-5 py-3 bg-[#1B6B3A] hover:bg-[#0D4A28] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl text-sm font-bold transition-colors flex items-center gap-2"
        >
          {loading ? <Loader2 size={15} className="animate-spin" /> : <Search size={15} />}
          Cari
        </button>
      </div>

      {/* Options row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Mode toggle */}
        <div className="flex rounded-xl overflow-hidden border border-[rgba(201,168,76,0.2)] bg-white">
          <button
            onClick={() => setMode('terjemah')}
            className={cn(
              'px-3 py-1.5 text-xs font-semibold transition-colors',
              mode === 'terjemah' ? 'bg-[#1B6B3A] text-white' : 'text-gray-500 hover:bg-gray-50'
            )}
          >
            🇮🇩 Terjemah
          </button>
          <button
            onClick={() => setMode('arab')}
            className={cn(
              'px-3 py-1.5 text-xs font-semibold transition-colors',
              mode === 'arab' ? 'bg-[#1B6B3A] text-white' : 'text-gray-500 hover:bg-gray-50'
            )}
          >
            🕌 Teks Arab
          </button>
        </div>

        {/* Surah filter */}
        <select
          value={surahFilter ?? ''}
          onChange={e => setSurahFilter(e.target.value ? Number(e.target.value) : null)}
          className="flex-1 min-w-[160px] text-xs rounded-xl border border-[rgba(201,168,76,0.2)] bg-white px-3 py-2 text-gray-600 outline-none focus:border-[#C9A84C] cursor-pointer"
        >
          <option value="">📖 Semua Surah</option>
          {SURAH_LIST.map(s => (
            <option key={s.number} value={s.number}>
              {s.number}. {s.latinName} ({s.ayahCount} ayat)
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      {loading && (
        <div className="flex items-center justify-center py-12 gap-3">
          <Loader2 size={24} className="text-[#1B6B3A] animate-spin" />
          <p className="text-sm text-gray-400">Mencari di seluruh Al-Quran...</p>
        </div>
      )}

      {error && !loading && (
        <div className="text-center py-10">
          <SearchX size={36} className="text-red-300 mx-auto mb-2" />
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      {!loading && !error && searched && results.length === 0 && (
        <div className="text-center py-12">
          <SearchX size={36} className="text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-500 font-medium mb-1">Tidak ada hasil untuk "{lastKeyword}"</p>
          <p className="text-xs text-gray-400">
            Coba kata lain atau ganti ke {mode === 'terjemah' ? 'Teks Arab' : 'Terjemah Indonesia'}
          </p>
        </div>
      )}

      {!loading && !error && results.length > 0 && (
        <>
          <div className="flex items-center justify-between px-1">
            <p className="text-xs text-gray-400">
              <span className="font-semibold text-[#1B6B3A]">{results.length}</span> ayat ditemukan
              {surahFilter && ` dalam ${getSurahByNumber(surahFilter)?.latinName}`}
            </p>
            <p className="text-[10px] text-gray-300">Klik ayat untuk membaca</p>
          </div>
          <div className="space-y-3 pb-6">
            {results.map(r => (
              <SearchResultCard key={`${r.surahNumber}:${r.numberInSurah}`} result={r} keyword={lastKeyword} mode={mode} />
            ))}
          </div>
        </>
      )}

      {!searched && !loading && (
        <div className="text-center py-10 text-gray-400">
          <Search size={36} className="mx-auto mb-3 text-gray-200" />
          <p className="text-sm font-medium mb-1">Cari kata dalam Al-Quran</p>
          <p className="text-xs">Ketik kata kunci lalu tekan tombol Cari</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['sabar', 'rezeki', 'shalat', 'surga', 'taqwa'].map(tip => (
              <button
                key={tip}
                onClick={() => { setKeyword(tip); setMode('terjemah') }}
                className="text-xs px-3 py-1.5 bg-[#E8F5ED] text-[#1B6B3A] rounded-full hover:bg-[#1B6B3A] hover:text-white transition-colors"
              >
                {tip}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Bookmark Card ────────────────────────────────────────────────────────────

function BookmarkCard({ bookmark, onRemove }: { bookmark: QuranBookmark; onRemove: () => void }) {
  const meta = getSurahByNumber(bookmark.surahNumber)
  return (
    <Link
      href={`/dashboard/quran/${bookmark.surahNumber}?ayah=${bookmark.ayahNumber}`}
      className="block bg-white rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-sm hover:border-[#C9A84C] hover:shadow-md transition-all group"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#1B6B3A] text-white flex items-center justify-center text-[11px] font-bold">
              {bookmark.surahNumber}
            </div>
            <div>
              <p className="text-xs font-semibold text-[#0D4A28]">{meta?.latinName ?? bookmark.surahLatin}</p>
              <p className="text-[10px] text-gray-400">Ayat {bookmark.ayahNumber}</p>
            </div>
          </div>
          <button
            onClick={e => { e.preventDefault(); e.stopPropagation(); onRemove() }}
            className="p-1.5 rounded-lg text-red-300 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 size={14} />
          </button>
        </div>
        <p
          className="text-right text-[#1a1a1a] bg-[#FBF7F0] p-3 rounded-xl mb-2 leading-loose line-clamp-2"
          style={{ fontFamily: "'Amiri', serif", fontSize: '22px', direction: 'rtl', lineHeight: 2 }}
        >
          {bookmark.arab}
        </p>
        <p className="text-xs text-[#6b7280] line-clamp-2 leading-relaxed">
          <span className="font-semibold text-[#1B6B3A]">Artinya: </span>
          {bookmark.terjemah}
        </p>
      </div>
    </Link>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function QuranPage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<FilterType>('semua')
  const { bookmarks, remove, clearAll, ready } = useQuranBookmarks()

  const filteredSurah = useMemo(() => {
    let list = query.trim() ? searchSurah(query) : SURAH_LIST
    if (!query.trim()) {
      if (filter === 'populer') list = list.filter(s => s.popular)
      else if (filter === 'juz30') list = list.filter(s => s.juz === 30)
      else if (filter === 'makkiyah') list = list.filter(s => s.revelationType === 'Makkah')
      else if (filter === 'madaniyah') list = list.filter(s => s.revelationType === 'Madinah')
    }
    return list
  }, [query, filter])

  const showSearch = filter === 'cari' && !query.trim()
  const showFavorit = filter === 'favorit' && !query.trim()
  const showSurahList = !showSearch && !showFavorit

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0D4A28] mb-1">Al-Quran</h1>
          <p className="text-sm text-[#6b7280]">114 surah · teks Arab + terjemah Indonesia</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-[#1B6B3A] flex items-center justify-center">
          <BookOpen size={22} className="text-[#C9A84C]" />
        </div>
      </div>

      {/* Search surah by name (hidden in Cari Ayat mode) */}
      {!showSearch && (
        <div className="flex items-center gap-3 rounded-2xl px-4 py-3 mb-4 bg-white border border-[rgba(201,168,76,0.12)] shadow-sm">
          <Search size={18} className="text-gray-400 flex-shrink-0" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Cari nama surah..."
            className="flex-1 text-sm bg-transparent outline-none text-[#1a1a1a] placeholder:text-gray-400"
          />
          {query && <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600 text-xs">✕</button>}
        </div>
      )}

      {/* Filter Tabs */}
      {!query && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap',
                filter === f.id
                  ? f.id === 'favorit' ? 'bg-red-500 text-white' : f.id === 'cari' ? 'bg-[#0D4A28] text-white' : 'bg-[#1B6B3A] text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
              )}
            >
              {f.icon} {f.label}
              {f.id === 'favorit' && ready && bookmarks.length > 0 && (
                <span className={cn(
                  'text-[10px] font-bold px-1.5 py-0.5 rounded-full',
                  filter === 'favorit' ? 'bg-white/20 text-white' : 'bg-red-100 text-red-500'
                )}>
                  {bookmarks.length}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Cari Ayat Panel */}
      {showSearch && <SearchPanel />}

      {/* Favorit View */}
      {showFavorit && (
        !ready || bookmarks.length === 0 ? (
          <div className="text-center py-16">
            <BookmarkCheck size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-400 mb-1">Belum ada ayat yang disimpan</p>
            <p className="text-xs text-gray-300">Tekan ikon bookmark saat membaca untuk menyimpan ayat</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-3 px-1">
              <p className="text-xs text-gray-400">{bookmarks.length} ayat tersimpan</p>
              <button
                onClick={() => { if (confirm('Hapus semua bookmark?')) clearAll() }}
                className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1"
              >
                <Trash2 size={12} /> Hapus semua
              </button>
            </div>
            <div className="space-y-3 pb-8">
              {bookmarks.map(b => (
                <BookmarkCard key={b.id} bookmark={b} onRemove={() => remove(b.id)} />
              ))}
            </div>
          </>
        )
      )}

      {/* Surah List */}
      {showSurahList && (
        <>
          <div className="text-xs text-gray-400 mb-3 px-1">
            {query ? `${filteredSurah.length} surah ditemukan` : `${filteredSurah.length} surah`}
          </div>
          {filteredSurah.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">📖</div>
              <p className="text-sm text-gray-400">Surah tidak ditemukan</p>
            </div>
          ) : (
            <div className="space-y-2 pb-8">
              {filteredSurah.map(surah => (
                <SurahCard key={surah.number} surah={surah} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

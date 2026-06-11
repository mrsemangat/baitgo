'use client'
import { useState, useEffect, useRef, useCallback, Suspense } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowLeft, ZoomIn, ZoomOut, Moon, Sun, Loader2,
  Play, Pause, Bookmark, BookmarkCheck, ChevronLeft, ChevronRight, Search,
} from 'lucide-react'
import { getSurahByNumber } from '@/data/surahList'
import { useQuranBookmarks } from '@/hooks/useQuranBookmarks'
import { cn } from '@/lib/utils'

const MISHARY_CDN = 'https://cdn.islamic.network/quran/audio/128/ar.alafasy'
const PER_PAGE = 10

interface Ayah {
  numberInSurah: number
  globalNumber: number
  arab: string
  terjemah: string
}

interface SurahDetail {
  number: number
  name: string
  numberOfAyahs: number
  revelationType: string
  ayahs: Ayah[]
}

async function fetchSurah(number: number): Promise<SurahDetail> {
  const res = await fetch(
    `https://api.alquran.cloud/v1/surah/${number}/editions/quran-uthmani,id.indonesian`,
    { cache: 'force-cache' }
  )
  if (!res.ok) throw new Error('Gagal memuat data surah')
  const json = await res.json()
  const arabEdition = json.data[0]
  const idEdition = json.data[1]
  return {
    number: arabEdition.number,
    name: arabEdition.name,
    numberOfAyahs: arabEdition.numberOfAyahs,
    revelationType: arabEdition.revelationType,
    ayahs: arabEdition.ayahs.map((a: { number: number; numberInSurah: number; text: string }, i: number) => ({
      globalNumber: a.number,
      numberInSurah: a.numberInSurah,
      arab: a.text,
      terjemah: idEdition.ayahs[i]?.text ?? '',
    })),
  }
}

function MisharyButton({
  globalNumber, isPlaying, nightMode, onPlay, onStop,
}: {
  globalNumber: number
  isPlaying: boolean
  nightMode: boolean
  onPlay: () => void
  onStop: () => void
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [buffering, setBuffering] = useState(false)
  const [audioError, setAudioError] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      setAudioError(false)
      setBuffering(true)
      audio.play().catch(() => { setAudioError(true); setBuffering(false); onStop() })
    } else {
      audio.pause()
      audio.currentTime = 0
      setBuffering(false)
    }
  }, [isPlaying, onStop])

  return (
    <div className="flex items-center gap-2">
      <audio
        ref={audioRef}
        src={`${MISHARY_CDN}/${globalNumber}.mp3`}
        onCanPlay={() => setBuffering(false)}
        onEnded={onStop}
        onError={() => { setAudioError(true); setBuffering(false); onStop() }}
        preload="none"
      />
      <button
        onClick={isPlaying ? onStop : onPlay}
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all',
          isPlaying
            ? nightMode ? 'bg-[#C9A84C] text-[#0D4A28]' : 'bg-[#1B6B3A] text-white'
            : nightMode
              ? 'bg-[rgba(201,168,76,0.15)] text-[#C9A84C] hover:bg-[rgba(201,168,76,0.25)]'
              : 'bg-[#E8F5ED] text-[#1B6B3A] hover:bg-[#1B6B3A] hover:text-white'
        )}
      >
        {buffering ? <Loader2 size={13} className="animate-spin" /> : isPlaying ? <Pause size={13} /> : <Play size={13} />}
        <span>{buffering ? 'Memuat...' : isPlaying ? 'Sedang diputar' : 'Mishary Ar-Rasyid'}</span>
        {isPlaying && !buffering && (
          <span className="flex gap-0.5 items-end h-3.5">
            {[1, 2, 3].map(i => (
              <span key={i} className="w-0.5 rounded-full animate-bounce"
                style={{ height: `${5 + (i % 3) * 3}px`, animationDelay: `${i * 0.15}s`, backgroundColor: 'currentColor' }} />
            ))}
          </span>
        )}
      </button>
      {audioError && <span className="text-xs text-red-400">Gagal memuat audio</span>}
    </div>
  )
}

function AyahCard({
  ayah, surahNumber, surahName, surahLatin,
  fontSize, nightMode,
  isPlaying, isBookmarked,
  onPlay, onStop, onToggleBookmark,
}: {
  ayah: Ayah
  surahNumber: number
  surahName: string
  surahLatin: string
  fontSize: number
  nightMode: boolean
  isPlaying: boolean
  isBookmarked: boolean
  onPlay: () => void
  onStop: () => void
  onToggleBookmark: () => void
}) {
  return (
    <div
      id={`ayah-${ayah.numberInSurah}`}
      className={cn(
        'rounded-2xl border p-5 transition-colors',
        isPlaying
          ? nightMode ? 'bg-[#0a1a30] border-[#C9A84C]' : 'bg-white border-[#C9A84C] shadow-md ring-1 ring-[#C9A84C]/20'
          : nightMode ? 'bg-[#0f2040] border-[rgba(201,168,76,0.2)]' : 'bg-white border-[rgba(201,168,76,0.1)] shadow-sm'
      )}
    >
      {/* Top row: ayah number + bookmark */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={onToggleBookmark}
          className={cn(
            'p-1.5 rounded-lg transition-colors',
            isBookmarked
              ? 'text-[#C9A84C]'
              : nightMode ? 'text-[rgba(232,213,176,0.3)] hover:text-[#C9A84C]' : 'text-gray-300 hover:text-[#C9A84C]'
          )}
          title={isBookmarked ? 'Hapus bookmark' : 'Simpan ayat'}
        >
          {isBookmarked
            ? <BookmarkCheck size={17} fill="currentColor" />
            : <Bookmark size={17} />
          }
        </button>

        <div className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
          isPlaying ? 'bg-[#C9A84C] text-white' : 'bg-[#1B6B3A] text-white'
        )}>
          {ayah.numberInSurah}
        </div>
      </div>

      {/* Teks Arab */}
      <p
        className={cn(
          'text-right leading-loose mb-4 p-4 rounded-xl',
          nightMode ? 'bg-[rgba(201,168,76,0.06)] text-[#e8d5b0]' : 'bg-[#FBF7F0] text-[#1a1a1a]'
        )}
        style={{ fontFamily: "'Amiri', serif", fontSize: `${fontSize}px`, lineHeight: 2.2, direction: 'rtl' }}
      >
        {ayah.arab}
      </p>

      {/* Terjemah */}
      <p className={cn(
        'text-sm leading-relaxed mb-4 p-3 rounded-xl',
        nightMode ? 'bg-[rgba(255,255,255,0.04)] text-[#d0c4a8]' : 'bg-gray-50 text-[#374151]'
      )}>
        <span className={cn('font-semibold mr-1', nightMode ? 'text-[#C9A84C]' : 'text-[#1B6B3A]')}>Artinya: </span>
        {ayah.terjemah}
      </p>

      <MisharyButton
        globalNumber={ayah.globalNumber}
        isPlaying={isPlaying}
        nightMode={nightMode}
        onPlay={onPlay}
        onStop={onStop}
      />
    </div>
  )
}

function PageNav({
  current, total, nightMode,
  onPrev, onNext, onJump,
}: {
  current: number
  total: number
  nightMode: boolean
  onPrev: () => void
  onNext: () => void
  onJump: (page: number) => void
}) {
  const [inputVal, setInputVal] = useState('')
  const [editing, setEditing] = useState(false)

  const handleJumpSubmit = () => {
    const n = parseInt(inputVal)
    if (!isNaN(n) && n >= 1 && n <= total) onJump(n)
    setEditing(false)
    setInputVal('')
  }

  const base = cn(
    'px-4 py-2 rounded-xl text-sm font-semibold transition-all',
    nightMode
      ? 'bg-[rgba(201,168,76,0.15)] text-[#C9A84C] hover:bg-[rgba(201,168,76,0.25)] disabled:opacity-30'
      : 'bg-[#E8F5ED] text-[#1B6B3A] hover:bg-[#1B6B3A] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#E8F5ED] disabled:hover:text-[#1B6B3A]'
  )

  return (
    <div className={cn(
      'flex items-center justify-between gap-3 px-4 py-3 rounded-2xl',
      nightMode ? 'bg-[rgba(201,168,76,0.08)]' : 'bg-[#F5E6C8]'
    )}>
      <button onClick={onPrev} disabled={current === 1} className={cn(base, 'flex items-center gap-1')}>
        <ChevronLeft size={16} /> Prev
      </button>

      {editing ? (
        <div className="flex items-center gap-2">
          <input
            autoFocus
            type="number"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleJumpSubmit(); if (e.key === 'Escape') setEditing(false) }}
            onBlur={handleJumpSubmit}
            placeholder={`1–${total}`}
            className={cn(
              'w-20 text-center text-sm rounded-lg px-2 py-1 outline-none border',
              nightMode ? 'bg-[#0f2040] text-[#C9A84C] border-[#C9A84C]/30' : 'bg-white text-[#0D4A28] border-[#C9A84C]/40'
            )}
          />
        </div>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className={cn('text-sm font-semibold', nightMode ? 'text-[#C9A84C]' : 'text-[#8B6914]')}
          title="Klik untuk loncat halaman"
        >
          Hal {current} / {total}
        </button>
      )}

      <button onClick={onNext} disabled={current === total} className={cn(base, 'flex items-center gap-1')}>
        Next <ChevronRight size={16} />
      </button>
    </div>
  )
}

function JumpToAyah({
  totalAyahs,
  nightMode,
  onJump,
}: {
  totalAyahs: number
  nightMode: boolean
  onJump: (val: string) => void
}) {
  const [val, setVal] = useState('')

  const submit = () => {
    if (!val.trim()) return
    onJump(val)
    setVal('')
  }

  return (
    <div className={cn(
      'flex items-center gap-2 rounded-2xl px-4 py-2.5 mb-4',
      nightMode ? 'bg-[rgba(201,168,76,0.08)]' : 'bg-[#F5E6C8]'
    )}>
      <Search size={15} className={nightMode ? 'text-[#C9A84C] flex-shrink-0' : 'text-[#8B6914] flex-shrink-0'} />
      <input
        type="number"
        value={val}
        min={1}
        max={totalAyahs}
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && submit()}
        placeholder={`Lompat ke ayat (1–${totalAyahs})...`}
        className={cn(
          'flex-1 text-sm bg-transparent outline-none',
          nightMode ? 'text-[#e8d5b0] placeholder:text-[rgba(232,213,176,0.4)]' : 'text-[#7a5b0f] placeholder:text-[#8B6914]/50'
        )}
      />
      <button
        onClick={submit}
        disabled={!val.trim()}
        className={cn(
          'text-xs font-bold px-3 py-1 rounded-lg transition-colors disabled:opacity-40',
          nightMode
            ? 'bg-[rgba(201,168,76,0.2)] text-[#C9A84C] hover:bg-[rgba(201,168,76,0.35)]'
            : 'bg-[#C9A84C] text-white hover:bg-[#b8963d]'
        )}
      >
        Pergi
      </button>
    </div>
  )
}

function SurahContent() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const surahId = Number(params.surahId)
  const targetAyah = searchParams.get('ayah') ? Number(searchParams.get('ayah')) : null

  const [surah, setSurah] = useState<SurahDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [fontSize, setFontSize] = useState(26)
  const [nightMode, setNightMode] = useState(false)
  const [playingGlobal, setPlayingGlobal] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const meta = getSurahByNumber(surahId)
  const { toggle, isBookmarked } = useQuranBookmarks()

  const loadSurah = useCallback(() => {
    setLoading(true)
    setError('')
    setPlayingGlobal(null)
    fetchSurah(surahId)
      .then(data => setSurah(data))
      .catch(() => setError('Gagal memuat surah. Periksa koneksi internet Anda.'))
      .finally(() => setLoading(false))
  }, [surahId])

  useEffect(() => {
    if (!surahId || surahId < 1 || surahId > 114) {
      setError('Nomor surah tidak valid')
      setLoading(false)
      return
    }
    loadSurah()
  }, [surahId, loadSurah])

  // Jump to target ayah (from bookmark link)
  useEffect(() => {
    if (!surah || !targetAyah) return
    const idx = surah.ayahs.findIndex(a => a.numberInSurah === targetAyah)
    if (idx !== -1) {
      const page = Math.ceil((idx + 1) / PER_PAGE)
      setCurrentPage(page)
      setTimeout(() => {
        document.getElementById(`ayah-${targetAyah}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 300)
    }
  }, [surah, targetAyah])

  const totalPages = surah ? Math.ceil(surah.ayahs.length / PER_PAGE) : 1
  const pageAyahs = surah
    ? surah.ayahs.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)
    : []

  const goToPage = (page: number) => {
    setCurrentPage(page)
    setPlayingGlobal(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const showBismillah = surahId !== 9 && surahId !== 1 && currentPage === 1

  const jumpToAyah = useCallback((val: string) => {
    const n = parseInt(val)
    if (!surah || isNaN(n) || n < 1 || n > surah.ayahs.length) return
    const idx = surah.ayahs.findIndex(a => a.numberInSurah === n)
    if (idx === -1) return
    const page = Math.ceil((idx + 1) / PER_PAGE)
    setCurrentPage(page)
    setPlayingGlobal(null)
    setTimeout(() => {
      document.getElementById(`ayah-${n}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 200)
  }, [surah])

  return (
    <div className={nightMode ? 'night-mode min-h-screen -m-8 p-8' : ''}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className={cn(
              'flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-xl transition-colors',
              nightMode ? 'text-[#C9A84C] hover:bg-[rgba(201,168,76,0.1)]' : 'text-[#1B6B3A] hover:bg-[#E8F5ED]'
            )}
          >
            <ArrowLeft size={16} /> Kembali
          </button>

          <div className="flex items-center gap-2">
            <button onClick={() => setFontSize(s => Math.min(38, s + 2))}
              className={cn('p-2 rounded-lg transition-colors', nightMode ? 'text-[#C9A84C] hover:bg-[rgba(201,168,76,0.1)]' : 'text-gray-400 hover:bg-gray-100')}>
              <ZoomIn size={16} />
            </button>
            <button onClick={() => setFontSize(s => Math.max(18, s - 2))}
              className={cn('p-2 rounded-lg transition-colors', nightMode ? 'text-[#C9A84C] hover:bg-[rgba(201,168,76,0.1)]' : 'text-gray-400 hover:bg-gray-100')}>
              <ZoomOut size={16} />
            </button>
            <button
              onClick={() => setNightMode(n => !n)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all',
                nightMode ? 'bg-[rgba(201,168,76,0.2)] text-[#C9A84C]' : 'bg-[#E8F5ED] text-[#1B6B3A]'
              )}
            >
              {nightMode ? <Sun size={14} /> : <Moon size={14} />}
              {nightMode ? 'Terang' : 'Malam'}
            </button>
          </div>
        </div>

        {/* Surah Info Card */}
        <div className={cn(
          'rounded-2xl p-6 mb-6 text-center',
          nightMode ? 'bg-gradient-to-b from-[#0D4A28] to-[#082a18]' : 'bg-gradient-to-b from-[#1B6B3A] to-[#0D4A28]'
        )}>
          <p className="text-white/90 text-4xl mb-2" style={{ fontFamily: "'Amiri', serif" }}>
            {meta?.arabicName ?? surah?.name ?? ''}
          </p>
          <h1 className="text-[#C9A84C] font-bold text-xl mb-1">{meta?.latinName}</h1>
          <p className="text-white/70 text-sm">{meta?.translation}</p>
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className="text-xs text-white/60 bg-white/10 px-3 py-1 rounded-full">
              {meta?.ayahCount ?? surah?.numberOfAyahs} ayat
            </span>
            <span className="text-xs text-white/60 bg-white/10 px-3 py-1 rounded-full">{meta?.revelationType}</span>
            <span className="text-xs text-white/60 bg-white/10 px-3 py-1 rounded-full">Juz {meta?.juz}</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            <span className="text-[10px] text-[#C9A84C]/70 bg-[#C9A84C]/10 px-2 py-0.5 rounded-full">
              🎙️ Murottal: Mishary Rashid Alafasy
            </span>
          </div>
        </div>

        {/* Lompat ke Ayat */}
        {!loading && !error && surah && (
          <JumpToAyah
            totalAyahs={surah.ayahs.length}
            nightMode={nightMode}
            onJump={jumpToAyah}
          />
        )}

        {/* Bismillah */}
        {showBismillah && !loading && !error && (
          <div className={cn(
            'text-center py-5 mb-4 rounded-2xl',
            nightMode ? 'bg-[rgba(201,168,76,0.08)]' : 'bg-[#F5E6C8]'
          )}>
            <p className={cn('text-3xl', nightMode ? 'text-[#e8d5b0]' : 'text-[#1a1a1a]')}
              style={{ fontFamily: "'Amiri', serif", lineHeight: 2 }}>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className={cn('text-xs mt-1', nightMode ? 'text-[rgba(232,213,176,0.5)]' : 'text-[#8B6914]')}>
              Dengan nama Allah Yang Maha Pengasih, Maha Penyayang
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 size={32} className="text-[#1B6B3A] animate-spin" />
            <p className={cn('text-sm', nightMode ? 'text-[rgba(232,213,176,0.6)]' : 'text-gray-400')}>Memuat surah...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">⚠️</div>
            <p className="text-sm text-red-500 mb-4">{error}</p>
            <button onClick={loadSurah}
              className="px-5 py-2 bg-[#1B6B3A] text-white rounded-xl text-sm font-semibold hover:bg-[#0D4A28] transition-colors">
              Coba Lagi
            </button>
          </div>
        )}

        {/* Ayah List */}
        {!loading && !error && surah && (
          <>
            {/* Top pagination (only if > 1 page) */}
            {totalPages > 1 && (
              <div className="mb-4">
                <PageNav
                  current={currentPage}
                  total={totalPages}
                  nightMode={nightMode}
                  onPrev={() => goToPage(currentPage - 1)}
                  onNext={() => goToPage(currentPage + 1)}
                  onJump={goToPage}
                />
              </div>
            )}

            <div className="space-y-4">
              {pageAyahs.map(ayah => (
                <AyahCard
                  key={ayah.numberInSurah}
                  ayah={ayah}
                  surahNumber={surahId}
                  surahName={surah.name}
                  surahLatin={meta?.latinName ?? ''}
                  fontSize={fontSize}
                  nightMode={nightMode}
                  isPlaying={playingGlobal === ayah.globalNumber}
                  isBookmarked={isBookmarked(surahId, ayah.numberInSurah)}
                  onPlay={() => setPlayingGlobal(ayah.globalNumber)}
                  onStop={() => setPlayingGlobal(null)}
                  onToggleBookmark={() =>
                    toggle({
                      surahNumber: surahId,
                      surahName: surah.name,
                      surahLatin: meta?.latinName ?? '',
                      ayahNumber: ayah.numberInSurah,
                      globalNumber: ayah.globalNumber,
                      arab: ayah.arab,
                      terjemah: ayah.terjemah,
                    })
                  }
                />
              ))}
            </div>

            {/* Bottom pagination */}
            {totalPages > 1 && (
              <div className="mt-6">
                <PageNav
                  current={currentPage}
                  total={totalPages}
                  nightMode={nightMode}
                  onPrev={() => goToPage(currentPage - 1)}
                  onNext={() => goToPage(currentPage + 1)}
                  onJump={goToPage}
                />
              </div>
            )}

            <p className={cn('text-xs text-center mt-6 pb-4', nightMode ? 'text-[rgba(232,213,176,0.4)]' : 'text-gray-400/60')}>
              ⚠️ Terjemah menggunakan Kementerian Agama RI. Rujuk mushaf resmi untuk kepastian.
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default function SurahDetailPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-24">
        <Loader2 size={32} className="text-[#1B6B3A] animate-spin" />
      </div>
    }>
      <SurahContent />
    </Suspense>
  )
}

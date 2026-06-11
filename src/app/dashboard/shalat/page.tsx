'use client'
import { useState, useEffect, useCallback } from 'react'
import { MapPin, RefreshCw, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const SHALAT_NAMES: Record<string, string> = {
  Fajr: 'Subuh',
  Dhuhr: 'Dzuhur',
  Asr: 'Ashar',
  Maghrib: 'Maghrib',
  Isha: 'Isya',
}

const SHALAT_ICONS: Record<string, string> = {
  Fajr: '🌙',
  Dhuhr: '☀️',
  Asr: '🌤️',
  Maghrib: '🌅',
  Isha: '✨',
}

const SHALAT_ORDER = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']

type Timings = { Fajr: string; Dhuhr: string; Asr: string; Maghrib: string; Isha: string }
type LocState = 'idle' | 'loading' | 'ok' | 'denied' | 'error'

function parseTime(timeStr: string, baseDate = new Date()): Date {
  const [h, m] = timeStr.split(':').map(Number)
  return new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), h, m, 0)
}

function getNextPrayer(timings: Timings): { name: string; time: Date } {
  const now = new Date()
  for (const name of SHALAT_ORDER) {
    const t = parseTime(timings[name as keyof Timings])
    if (t > now) return { name, time: t }
  }
  const fajrTomorrow = parseTime(timings.Fajr)
  fajrTomorrow.setDate(fajrTomorrow.getDate() + 1)
  return { name: 'Fajr', time: fajrTomorrow }
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return '00:00:00'
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function getCurrentPrayer(timings: Timings): string | null {
  const now = new Date()
  let current: string | null = null
  for (const name of SHALAT_ORDER) {
    const t = parseTime(timings[name as keyof Timings])
    if (t <= now) current = name
  }
  return current
}

export default function ShalatPage() {
  const [locState, setLocState] = useState<LocState>('idle')
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [locName, setLocName] = useState('')
  const [timings, setTimings] = useState<Timings | null>(null)
  const [apiLoading, setApiLoading] = useState(false)
  const [now, setNow] = useState(new Date())
  const [countdown, setCountdown] = useState('--:--:--')
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: Date } | null>(null)
  const [currentPrayer, setCurrentPrayer] = useState<string | null>(null)

  useEffect(() => {
    const id = setInterval(() => {
      const n = new Date()
      setNow(n)
      if (timings) {
        const next = getNextPrayer(timings)
        const curr = getCurrentPrayer(timings)
        setNextPrayer(next)
        setCurrentPrayer(curr)
        setCountdown(formatCountdown(next.time.getTime() - n.getTime()))
      }
    }, 1000)
    return () => clearInterval(id)
  }, [timings])

  const fetchTimings = useCallback(async (lat: number, lng: number) => {
    setApiLoading(true)
    try {
      const ts = Math.floor(Date.now() / 1000)
      const res = await fetch(
        `https://api.aladhan.com/v1/timings/${ts}?latitude=${lat}&longitude=${lng}&method=11`
      )
      const data = await res.json()
      if (data.code === 200) {
        const t = data.data.timings as Timings
        setTimings(t)
        const next = getNextPrayer(t)
        const curr = getCurrentPrayer(t)
        setNextPrayer(next)
        setCurrentPrayer(curr)
        setCountdown(formatCountdown(next.time.getTime() - Date.now()))
      }
    } catch {
      // silently fail, user can retry
    } finally {
      setApiLoading(false)
    }
  }, [])

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) { setLocState('error'); return }
    setLocState('loading')
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude: lat, longitude: lng } = pos.coords
        setCoords({ lat, lng })
        setLocState('ok')
        fetchTimings(lat, lng)
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
          .then(r => r.json())
          .then(d => setLocName(d.address?.city || d.address?.town || d.address?.county || ''))
          .catch(() => {})
      },
      err => setLocState(err.code === 1 ? 'denied' : 'error'),
      { enableHighAccuracy: false, timeout: 10000 }
    )
  }, [fetchTimings])

  useEffect(() => { getLocation() }, [getLocation])

  const h = now.getHours()
  const greeting = h < 5 ? 'Malam' : h < 10 ? 'Pagi' : h < 15 ? 'Siang' : h < 18 ? 'Sore' : 'Malam'

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#0D4A28] mb-1">Jadwal Shalat</h1>
        <p className="text-sm text-gray-500">Waktu shalat berdasarkan lokasi Anda saat ini</p>
      </div>

      {/* Next Prayer Countdown */}
      <div className="bg-gradient-to-br from-[#1B6B3A] to-[#0D4A28] rounded-3xl p-6 text-white mb-5">
        <p className="text-[#C9A84C] text-sm font-semibold mb-3">Selamat {greeting} 🌿</p>
        {nextPrayer ? (
          <>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-5xl font-black tabular-nums tracking-tight">{countdown}</span>
            </div>
            <p className="text-white/70 text-sm mt-2">
              menuju{' '}
              <span className="text-[#C9A84C] font-bold">{SHALAT_NAMES[nextPrayer.name]}</span>
              {timings && (
                <span> · pukul {timings[nextPrayer.name as keyof Timings]}</span>
              )}
            </p>
            {currentPrayer && (
              <div className="mt-3 inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl">
                <span className="text-sm">{SHALAT_ICONS[currentPrayer]}</span>
                <span className="text-white/80 text-xs">Waktu {SHALAT_NAMES[currentPrayer]} sedang berlangsung</span>
              </div>
            )}
          </>
        ) : (
          <p className="text-white/50 text-sm">Mendapatkan jadwal shalat...</p>
        )}
        {locName && (
          <div className="flex items-center gap-1.5 mt-4 text-[#C9A84C]/70 text-xs">
            <MapPin size={11} />
            <span>{locName}</span>
          </div>
        )}
      </div>

      {/* Loading */}
      {(locState === 'loading' || apiLoading) && (
        <div className="flex items-center justify-center gap-3 py-8 text-gray-400">
          <div className="w-6 h-6 rounded-full border-2 border-[#1B6B3A] border-t-transparent animate-spin" />
          <span className="text-sm">Mendapatkan jadwal...</span>
        </div>
      )}

      {/* Error */}
      {(locState === 'denied' || locState === 'error') && (
        <div className="bg-white rounded-2xl border border-red-100 p-6 text-center mb-5">
          <AlertCircle size={32} className="text-red-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500 mb-3">
            {locState === 'denied'
              ? 'Izin lokasi ditolak. Aktifkan di pengaturan browser lalu coba lagi.'
              : 'Gagal mendapatkan lokasi. Periksa koneksi internet.'}
          </p>
          <button
            onClick={getLocation}
            className="flex items-center gap-2 mx-auto px-5 py-2.5 bg-[#1B6B3A] text-white rounded-xl text-sm font-semibold hover:bg-[#0D4A28] transition-colors"
          >
            <RefreshCw size={14} /> Coba Lagi
          </button>
        </div>
      )}

      {/* Prayer Time Cards */}
      {timings && !apiLoading && (
        <div className="space-y-3 mb-5">
          {SHALAT_ORDER.map(name => {
            const timeStr = timings[name as keyof Timings]
            const pTime = parseTime(timeStr)
            const isPast = pTime < now
            const isNext = nextPrayer?.name === name
            const isCurrent = currentPrayer === name

            return (
              <div
                key={name}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-2xl border transition-all',
                  isNext
                    ? 'bg-[#1B6B3A] border-[#1B6B3A] shadow-lg'
                    : isCurrent
                    ? 'bg-[#E8F5ED] border-[#1B6B3A]/20'
                    : isPast
                    ? 'bg-white border-gray-100 opacity-50'
                    : 'bg-white border-[rgba(201,168,76,0.15)] shadow-sm'
                )}
              >
                <div className={cn(
                  'w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0',
                  isNext ? 'bg-white/15' : 'bg-[#FBF7F0]'
                )}>
                  {SHALAT_ICONS[name]}
                </div>

                <div className="flex-1 min-w-0">
                  <div className={cn(
                    'font-bold text-base',
                    isNext ? 'text-white' : isCurrent ? 'text-[#1B6B3A]' : 'text-[#0D4A28]'
                  )}>
                    {SHALAT_NAMES[name]}
                  </div>
                  <div className={cn(
                    'text-xs mt-0.5',
                    isNext ? 'text-white/60' : isCurrent ? 'text-[#1B6B3A]/70' : 'text-gray-400'
                  )}>
                    {isNext ? 'Shalat berikutnya' : isCurrent ? 'Sedang berlangsung' : isPast ? 'Sudah lewat' : 'Belum tiba'}
                  </div>
                </div>

                <div className={cn(
                  'text-2xl font-black tabular-nums flex-shrink-0',
                  isNext ? 'text-[#C9A84C]' : isCurrent ? 'text-[#1B6B3A]' : isPast ? 'text-gray-200' : 'text-[#1B6B3A]'
                )}>
                  {timeStr}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {timings && (
        <button
          onClick={() => coords && fetchTimings(coords.lat, coords.lng)}
          disabled={apiLoading}
          className="flex items-center gap-2 mx-auto px-4 py-2 text-sm text-gray-400 hover:text-[#1B6B3A] transition-colors disabled:opacity-40"
        >
          <RefreshCw size={14} className={apiLoading ? 'animate-spin' : ''} />
          Perbarui jadwal
        </button>
      )}

      <p className="text-xs text-center text-gray-400/60 mt-4 pb-6">
        ⚠️ Jadwal bersifat perkiraan. Konfirmasi dengan masjid setempat atau aplikasi KEMENAG.
      </p>
    </div>
  )
}

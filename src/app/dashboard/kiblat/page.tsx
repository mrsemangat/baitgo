'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { MapPin, Compass, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Constants ────────────────────────────────────────────────────────────────

const KAABA = { lat: 21.3891, lng: 39.8579 }

const HIJRI_MONTHS = [
  '', 'Muharram', 'Safar', "Rabi'ul Awwal", "Rabi'ul Akhir",
  'Jumadil Awwal', 'Jumadil Akhir', 'Rajab', "Sya'ban",
  'Ramadhan', 'Syawal', "Dzulqa'dah", 'Dzulhijjah',
]

const ID_DAYS = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu']

const ID_MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

// ─── Utility functions ────────────────────────────────────────────────────────

function toHijri(year: number, month: number, day: number) {
  let y = year, m = month
  if (m < 3) { y--; m += 12 }
  const A = Math.floor(y / 100)
  const B = 2 - A + Math.floor(A / 4)
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524
  let l = jd - 1948440 + 10632
  const n = Math.floor((l - 1) / 10631)
  l = l - 10631 * n + 354
  const J = Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) +
    Math.floor(l / 5670) * Math.floor((43 * l) / 15238)
  l = l - Math.floor((30 - J) / 15) * Math.floor((17719 * J) / 50) -
    Math.floor(J / 16) * Math.floor((15238 * J) / 43) + 29
  const hMonth = Math.floor((24 * l) / 709)
  const hDay = l - Math.floor((709 * hMonth) / 24)
  const hYear = 30 * n + J - 30
  return { year: hYear, month: hMonth, day: hDay }
}

function qiblaBearing(lat: number, lng: number): number {
  const kLat = KAABA.lat * Math.PI / 180
  const kLng = KAABA.lng * Math.PI / 180
  const uLat = lat * Math.PI / 180
  const uLng = lng * Math.PI / 180
  const dLng = kLng - uLng
  const y = Math.sin(dLng) * Math.cos(kLat)
  const x = Math.cos(uLat) * Math.sin(kLat) - Math.sin(uLat) * Math.cos(kLat) * Math.cos(dLng)
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360
}

function distanceKm(lat: number, lng: number): number {
  const R = 6371
  const kLat = KAABA.lat * Math.PI / 180
  const kLng = KAABA.lng * Math.PI / 180
  const uLat = lat * Math.PI / 180
  const uLng = lng * Math.PI / 180
  const dLat = uLat - kLat, dLng = uLng - kLng
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(kLat) * Math.cos(uLat) * Math.sin(dLng / 2) ** 2
  return Math.round(R * 2 * Math.asin(Math.sqrt(a)))
}

function pad(n: number) { return String(n).padStart(2, '0') }

// ─── Clock Widget ─────────────────────────────────────────────────────────────

function ClockWidget() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const hijri = toHijri(now.getFullYear(), now.getMonth() + 1, now.getDate())
  const dayName = ID_DAYS[now.getDay()]
  const monthName = ID_MONTHS[now.getMonth()]

  return (
    <div className="bg-gradient-to-br from-[#1B6B3A] to-[#0D4A28] rounded-3xl p-6 text-white mb-5">
      {/* Hari */}
      <p className="text-[#C9A84C] text-sm font-semibold mb-1">{dayName}</p>

      {/* Jam besar */}
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-6xl font-black tracking-tight tabular-nums">
          {pad(now.getHours())}:{pad(now.getMinutes())}
        </span>
        <span className="text-2xl font-bold text-white/60 tabular-nums">
          {pad(now.getSeconds())}
        </span>
      </div>

      <div className="border-t border-white/10 pt-4 grid grid-cols-2 gap-4">
        {/* Tanggal Masehi */}
        <div>
          <p className="text-white/50 text-[10px] uppercase tracking-widest mb-1">Masehi</p>
          <p className="text-white font-bold text-lg leading-tight">
            {now.getDate()} {monthName}
          </p>
          <p className="text-white/60 text-sm">{now.getFullYear()} M</p>
        </div>

        {/* Tanggal Hijriah */}
        <div className="text-right">
          <p className="text-[#C9A84C]/70 text-[10px] uppercase tracking-widest mb-1">Hijriah</p>
          <p className="text-[#C9A84C] font-bold text-lg leading-tight">
            {hijri.day} {HIJRI_MONTHS[hijri.month]}
          </p>
          <p className="text-[#C9A84C]/70 text-sm">{hijri.year} H</p>
        </div>
      </div>

      {/* Tanggal Arab */}
      <div className="mt-3 text-center text-[#C9A84C]/60 text-sm" style={{ fontFamily: "'Amiri', serif" }}>
        {hijri.day} {HIJRI_MONTHS[hijri.month]} {hijri.year} هـ
      </div>
    </div>
  )
}

// ─── Compass Rose SVG ─────────────────────────────────────────────────────────

function CompassRose({
  qiblaAngle,
  heading,
  hasLive,
  aligned,
}: {
  qiblaAngle: number
  heading: number
  hasLive: boolean
  aligned: boolean
}) {
  // The compass rose rotates opposite to device heading (keeps world directions fixed)
  const roseRot = hasLive ? -heading : 0
  // Qibla arrow is in world space; relative to rotated rose = qiblaAngle (stays fixed in world)
  const qiblaRot = qiblaAngle

  const cardinals = [
    { label: 'U', angle: 0, color: '#1B6B3A' },
    { label: 'T', angle: 90, color: '#374151' },
    { label: 'S', angle: 180, color: '#374151' },
    { label: 'B', angle: 270, color: '#374151' },
  ]

  return (
    <div className={cn(
      'relative rounded-full transition-all duration-500',
      aligned ? 'ring-4 ring-[#1B6B3A] ring-offset-4 shadow-lg shadow-[#1B6B3A]/20' : ''
    )}>
      <svg viewBox="0 0 240 240" className="w-64 h-64 sm:w-72 sm:h-72 drop-shadow-md">
        {/* Outer glow when aligned */}
        {aligned && (
          <circle cx="120" cy="120" r="115" fill="none" stroke="#1B6B3A" strokeWidth="3" opacity="0.3" />
        )}

        {/* Compass rose — rotates with device */}
        <g style={{ transformOrigin: '120px 120px', transform: `rotate(${roseRot}deg)`, transition: 'transform 0.15s ease-out' }}>
          {/* Background */}
          <circle cx="120" cy="120" r="110" fill="#FBF7F0" />
          <circle cx="120" cy="120" r="110" fill="none" stroke="#C9A84C" strokeWidth="3" />

          {/* Degree tick marks */}
          {Array.from({ length: 72 }, (_, i) => {
            const deg = i * 5
            const rad = deg * Math.PI / 180
            const isCardinal = deg % 90 === 0
            const isMajor = deg % 30 === 0
            const r1 = isCardinal ? 82 : isMajor ? 86 : 90
            const r2 = 107
            return (
              <line
                key={i}
                x1={120 + r1 * Math.sin(rad)} y1={120 - r1 * Math.cos(rad)}
                x2={120 + r2 * Math.sin(rad)} y2={120 - r2 * Math.cos(rad)}
                stroke={isCardinal ? '#1B6B3A' : isMajor ? '#C9A84C' : '#d1c4a0'}
                strokeWidth={isCardinal ? 3 : isMajor ? 1.5 : 0.8}
              />
            )
          })}

          {/* Cardinal labels */}
          {cardinals.map(({ label, angle, color }) => {
            const rad = angle * Math.PI / 180
            const r = 70
            return (
              <text
                key={label}
                x={120 + r * Math.sin(rad)} y={120 - r * Math.cos(rad)}
                textAnchor="middle" dominantBaseline="central"
                fontSize="15" fontWeight="bold" fill={color}
              >
                {label}
              </text>
            )
          })}

          {/* North red triangle */}
          <path d="M120,14 L124.5,28 L115.5,28 Z" fill="#ef4444" />
          <path d="M120,226 L124.5,212 L115.5,212 Z" fill="#9ca3af" />
        </g>

        {/* Qibla arrow — world-fixed, rotates with qiblaAngle */}
        <g style={{ transformOrigin: '120px 120px', transform: `rotate(${qiblaRot}deg)`, transition: hasLive ? 'transform 0.15s ease-out' : 'none' }}>
          {/* Arrow head (gold) */}
          <path d="M120,28 L128,72 L120,82 L112,72 Z" fill="#C9A84C" />
          {/* Arrow tail (muted) */}
          <path d="M120,212 L128,168 L120,158 L112,168 Z" fill="#C9A84C" opacity="0.25" />
          {/* Kaaba label */}
          <text x="120" y="22" textAnchor="middle" fontSize="16">🕋</text>
        </g>

        {/* Center circle */}
        <circle cx="120" cy="120" r="10" fill={aligned ? '#1B6B3A' : '#0D4A28'} />
        <circle cx="120" cy="120" r="5" fill={aligned ? '#C9A84C' : '#C9A84C'} />
      </svg>
    </div>
  )
}

// ─── Kiblat Compass Section ───────────────────────────────────────────────────

type LocState = 'idle' | 'loading' | 'ok' | 'denied' | 'error'
type CompassState = 'idle' | 'requesting' | 'active' | 'unavailable' | 'denied'

export default function KiblatPage() {
  const [locState, setLocState] = useState<LocState>('idle')
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [locName, setLocName] = useState('')
  const [qiblaAngle, setQiblaAngle] = useState(0)
  const [distance, setDistance] = useState(0)

  const [compassState, setCompassState] = useState<CompassState>('idle')
  const [heading, setHeading] = useState(0)
  const [hasLive, setHasLive] = useState(false)

  const headingRef = useRef(0)

  // ── Geolocation ──
  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocState('error')
      return
    }
    setLocState('loading')
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude: lat, longitude: lng } = pos.coords
        setCoords({ lat, lng })
        setQiblaAngle(Math.round(qiblaBearing(lat, lng)))
        setDistance(distanceKm(lat, lng))
        setLocState('ok')
        // Reverse geocode city name via nominatim
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
          .then(r => r.json())
          .then(d => setLocName(d.address?.city || d.address?.town || d.address?.county || ''))
          .catch(() => {})
      },
      err => {
        setLocState(err.code === 1 ? 'denied' : 'error')
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }, [])

  useEffect(() => { getLocation() }, [getLocation])

  // ── Device Orientation / Compass ──
  const startCompass = useCallback(async () => {
    if (typeof window === 'undefined' || !window.DeviceOrientationEvent) {
      setCompassState('unavailable')
      return
    }
    setCompassState('requesting')
    try {
      // iOS 13+ requires explicit permission
      if (typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function') {
        const perm = await (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission()
        if (perm !== 'granted') { setCompassState('denied'); return }
      }
      setCompassState('active')
    } catch {
      setCompassState('denied')
    }
  }, [])

  useEffect(() => {
    if (compassState !== 'active') return

    const handler = (e: DeviceOrientationEvent & { webkitCompassHeading?: number }) => {
      let h: number | null = null
      if (e.webkitCompassHeading != null) {
        h = e.webkitCompassHeading
      } else if (e.alpha != null) {
        h = (360 - e.alpha) % 360
      }
      if (h === null) return
      // Smooth with exponential moving average
      headingRef.current = headingRef.current * 0.7 + h * 0.3
      setHeading(headingRef.current)
      setHasLive(true)
    }

    window.addEventListener('deviceorientation', handler as EventListener, true)
    return () => window.removeEventListener('deviceorientation', handler as EventListener, true)
  }, [compassState])

  // ── Alignment check ──
  const diff = ((qiblaAngle - heading + 360) % 360)
  const aligned = hasLive && (diff < 8 || diff > 352)

  // ── Direction label ──
  function dirLabel(deg: number) {
    const dirs = ['U', 'UL', 'TL', 'T', 'TG', 'SG', 'S', 'SB', 'BB', 'B', 'BL', 'UB', 'U']
    return dirs[Math.round(deg / 30) % 12]
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D4A28] mb-1">Kiblat & Waktu</h1>
        <p className="text-sm text-[#6b7280]">Kompas arah kiblat · jam · penanggalan Hijriah & Masehi</p>
      </div>

      {/* ── Clock ── */}
      <ClockWidget />

      {/* ── Compass Card ── */}
      <div className="bg-white rounded-3xl border border-[rgba(201,168,76,0.15)] shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[rgba(201,168,76,0.1)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass size={18} className="text-[#1B6B3A]" />
            <span className="font-bold text-[#0D4A28]">Arah Kiblat</span>
          </div>
          {locState === 'ok' && (
            <div className="flex items-center gap-1.5 text-xs text-[#6b7280]">
              <MapPin size={12} />
              <span>{locName || `${coords?.lat.toFixed(2)}°, ${coords?.lng.toFixed(2)}°`}</span>
            </div>
          )}
        </div>

        <div className="px-6 py-6">
          {/* Location loading */}
          {locState === 'loading' && (
            <div className="flex flex-col items-center py-10 gap-3">
              <div className="w-10 h-10 rounded-full border-4 border-[#1B6B3A] border-t-transparent animate-spin" />
              <p className="text-sm text-gray-400">Mendeteksi lokasi...</p>
            </div>
          )}

          {/* Location error states */}
          {(locState === 'denied' || locState === 'error') && (
            <div className="text-center py-8">
              <AlertCircle size={36} className="text-red-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500 mb-1">
                {locState === 'denied' ? 'Izin lokasi ditolak' : 'Gagal mendapatkan lokasi'}
              </p>
              <p className="text-xs text-gray-400 mb-4">
                {locState === 'denied'
                  ? 'Aktifkan izin lokasi di pengaturan browser, lalu coba lagi.'
                  : 'Periksa koneksi internet dan coba lagi.'}
              </p>
              <button
                onClick={getLocation}
                className="flex items-center gap-2 mx-auto px-5 py-2.5 bg-[#1B6B3A] text-white rounded-xl text-sm font-semibold hover:bg-[#0D4A28] transition-colors"
              >
                <RefreshCw size={14} /> Coba Lagi
              </button>
            </div>
          )}

          {/* Compass UI */}
          {locState === 'ok' && (
            <div className="flex flex-col items-center gap-6">
              {/* Qibla info chips */}
              <div className="flex items-center gap-3 flex-wrap justify-center">
                <div className="flex items-center gap-2 bg-[#F5E6C8] px-4 py-2 rounded-xl">
                  <span className="text-2xl font-black text-[#8B6914]">{qiblaAngle}°</span>
                  <div>
                    <p className="text-[10px] text-[#8B6914]/70 font-medium">dari Utara</p>
                    <p className="text-xs font-bold text-[#8B6914]">Arah {dirLabel(qiblaAngle)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-[#E8F5ED] px-4 py-2 rounded-xl">
                  <span className="text-xl font-black text-[#1B6B3A]">{distance.toLocaleString('id')}</span>
                  <div>
                    <p className="text-[10px] text-[#1B6B3A]/70 font-medium">km dari</p>
                    <p className="text-xs font-bold text-[#1B6B3A]">Makkah 🕋</p>
                  </div>
                </div>
              </div>

              {/* Compass */}
              <CompassRose
                qiblaAngle={qiblaAngle}
                heading={heading}
                hasLive={hasLive}
                aligned={aligned}
              />

              {/* Aligned indicator */}
              {aligned && (
                <div className="flex items-center gap-2 bg-[#E8F5ED] border border-[#1B6B3A]/20 px-5 py-3 rounded-2xl animate-pulse">
                  <CheckCircle2 size={18} className="text-[#1B6B3A]" />
                  <span className="font-bold text-[#1B6B3A]">Menghadap Kiblat ✓</span>
                </div>
              )}

              {/* Compass permission / status */}
              {!hasLive && compassState !== 'unavailable' && (
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-3">
                    {compassState === 'idle'
                      ? 'Aktifkan kompas untuk navigasi langsung'
                      : compassState === 'requesting'
                      ? 'Meminta izin kompas...'
                      : compassState === 'denied'
                      ? 'Izin kompas ditolak — arah ditampilkan dari Utara'
                      : ''}
                  </p>
                  {(compassState === 'idle' || compassState === 'denied') && (
                    <button
                      onClick={startCompass}
                      className="flex items-center gap-2 mx-auto px-5 py-2.5 bg-[#C9A84C] hover:bg-[#b8963d] text-white rounded-xl text-sm font-semibold transition-colors"
                    >
                      <Compass size={15} /> Aktifkan Kompas
                    </button>
                  )}
                </div>
              )}

              {compassState === 'unavailable' && (
                <p className="text-xs text-gray-400 text-center">
                  ℹ️ Perangkat ini tidak memiliki sensor kompas — arah ditampilkan dari Utara.
                </p>
              )}

              {hasLive && (
                <p className="text-xs text-gray-400 text-center">
                  🧭 Kompas aktif · putar perangkat ke arah anak panah 🕋
                </p>
              )}

              {/* Legend */}
              <div className="w-full grid grid-cols-3 gap-2 text-center border-t border-gray-50 pt-4">
                <div>
                  <div className="w-3 h-3 bg-[#ef4444] rounded-sm mx-auto mb-1" />
                  <p className="text-[10px] text-gray-400">Utara</p>
                </div>
                <div>
                  <div className="text-lg mx-auto mb-0.5">🕋</div>
                  <p className="text-[10px] text-gray-400">Kiblat</p>
                </div>
                <div>
                  <div className="w-3 h-3 bg-[#C9A84C] rounded-sm mx-auto mb-1" />
                  <p className="text-[10px] text-gray-400">Arah panah</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Catatan */}
      <p className="text-xs text-center text-gray-400/60 mt-6 pb-4">
        ⚠️ Kompas digital bisa dipengaruhi medan magnet. Untuk kepastian, konfirmasi dengan ustadz setempat.
      </p>
    </div>
  )
}

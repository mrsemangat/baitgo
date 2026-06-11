'use client'
import { useState, useEffect, useCallback } from 'react'
import { RefreshCw, ArrowLeftRight, TrendingUp, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

const QUICK_SAR = [50, 100, 500, 1000, 5000]
const QUICK_IDR = [100_000, 500_000, 1_000_000, 5_000_000]

const REFERENSI_HARGA = [
  { label: 'Air zam-zam 5L', sar: 15, icon: '💧' },
  { label: 'Kurma Ajwa 1kg', sar: 150, icon: '🌴' },
  { label: 'Sajadah', sar: 50, icon: '🕌' },
  { label: 'Ihram set (2 lembar)', sar: 80, icon: '👘' },
  { label: 'Makan nasi box', sar: 10, icon: '🍱' },
  { label: 'Taksi dalam kota', sar: 30, icon: '🚕' },
  { label: 'SIM card Arab Saudi', sar: 50, icon: '📱' },
  { label: 'Tasbih kayu', sar: 20, icon: '📿' },
  { label: 'Koper oleh-oleh (1 set)', sar: 300, icon: '🧳' },
]

export default function KonversiPage() {
  const [rate, setRate] = useState<number | null>(null)
  const [lastUpdated, setLastUpdated] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [mode, setMode] = useState<'sar-idr' | 'idr-sar'>('sar-idr')
  const [amount, setAmount] = useState('100')
  const [showRef, setShowRef] = useState(true)

  const fetchRate = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('/api/currency')
      if (!res.ok) throw new Error('fetch failed')
      const data = await res.json()
      setRate(data.rate)
      setLastUpdated(data.date + (data.fallback ? ' (estimasi)' : ''))
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchRate() }, [fetchRate])

  const numAmount = parseFloat(amount) || 0
  const result = rate
    ? mode === 'sar-idr' ? numAmount * rate : numAmount / rate
    : 0

  const fmtIDR = (n: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

  const fmtSAR = (n: number) =>
    `﷼ ${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`

  const switchMode = () => {
    setMode(m => {
      if (m === 'sar-idr') { setAmount('1000000'); return 'idr-sar' }
      setAmount('100'); return 'sar-idr'
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#0D4A28] mb-1">Konversi SAR ↔ IDR</h1>
        <p className="text-sm text-gray-500">Kurs Riyal Saudi ↔ Rupiah Indonesia · Realtime</p>
      </div>

      {/* Rate card */}
      <div className="bg-gradient-to-br from-[#C9A84C] to-[#8B6914] rounded-3xl p-6 text-white mb-5">
        {loading ? (
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            <span className="text-white/70 text-sm">Memuat kurs terbaru...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold mb-0.5">Gagal memuat kurs</p>
              <p className="text-white/60 text-xs">Periksa koneksi internet Anda</p>
            </div>
            <button
              onClick={fetchRate}
              className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-xl text-sm font-semibold transition-all"
            >
              <RefreshCw size={13} /> Coba lagi
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={15} className="text-white/60" />
              <span className="text-white/60 text-xs uppercase tracking-wider">Kurs hari ini</span>
            </div>
            <div className="text-4xl font-black mb-3 tabular-nums">
              1 SAR ={' '}
              <span className="text-white">
                {rate ? new Intl.NumberFormat('id-ID').format(Math.round(rate)) : '—'}
              </span>{' '}
              IDR
            </div>
            <div className="flex items-center justify-between border-t border-white/15 pt-3">
              <span className="text-white/50 text-xs">Per {lastUpdated} · Sumber: Frankfurter</span>
              <button onClick={fetchRate} className="text-white/50 hover:text-white transition-colors">
                <RefreshCw size={13} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Calculator */}
      <div className="bg-white rounded-3xl border border-[rgba(201,168,76,0.15)] shadow-sm p-6 mb-5">
        {/* Mode toggle */}
        <div className="flex items-center gap-2 mb-5">
          <div className={cn(
            'flex-1 py-2.5 rounded-xl font-bold text-sm text-center transition-all',
            mode === 'sar-idr' ? 'bg-[#C9A84C] text-white' : 'bg-gray-50 text-gray-400'
          )}>
            SAR → IDR
          </div>
          <button
            onClick={switchMode}
            className="w-9 h-9 rounded-xl bg-[#F5E6C8] hover:bg-[#C9A84C] hover:text-white text-[#8B6914] flex items-center justify-center transition-all"
          >
            <ArrowLeftRight size={16} />
          </button>
          <div className={cn(
            'flex-1 py-2.5 rounded-xl font-bold text-sm text-center transition-all',
            mode === 'idr-sar' ? 'bg-[#1B6B3A] text-white' : 'bg-gray-50 text-gray-400'
          )}>
            IDR → SAR
          </div>
        </div>

        {/* Input */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-gray-400 mb-2 block">
            {mode === 'sar-idr' ? 'Masukkan jumlah SAR (﷼)' : 'Masukkan jumlah IDR (Rp)'}
          </label>
          <div className="flex items-center gap-3 bg-[#FBF7F0] rounded-2xl px-4 py-3.5 border border-[rgba(201,168,76,0.25)] focus-within:border-[#C9A84C] transition-colors">
            <span className="text-lg font-bold text-[#8B6914] flex-shrink-0">
              {mode === 'sar-idr' ? '﷼' : 'Rp'}
            </span>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              min="0"
              className="flex-1 bg-transparent text-2xl font-black text-[#0D4A28] outline-none tabular-nums w-0"
              placeholder="0"
            />
          </div>
        </div>

        {/* Quick amounts */}
        <div className="flex flex-wrap gap-2 mb-5">
          {(mode === 'sar-idr' ? QUICK_SAR : QUICK_IDR).map(v => (
            <button
              key={v}
              onClick={() => setAmount(String(v))}
              className={cn(
                'px-3 py-1.5 text-xs font-bold rounded-xl transition-all',
                String(v) === amount
                  ? 'bg-[#C9A84C] text-white'
                  : 'bg-[#F5E6C8] text-[#8B6914] hover:bg-[#C9A84C] hover:text-white'
              )}
            >
              {mode === 'sar-idr'
                ? `﷼ ${v.toLocaleString('id-ID')}`
                : `Rp ${new Intl.NumberFormat('id-ID').format(v)}`}
            </button>
          ))}
        </div>

        {/* Result */}
        <div className={cn(
          'rounded-2xl p-5 text-center',
          mode === 'sar-idr' ? 'bg-[#E8F5ED]' : 'bg-[#F5E6C8]'
        )}>
          <p className="text-xs text-gray-400 mb-1.5">= Setara dengan</p>
          <div className={cn(
            'text-3xl font-black tabular-nums',
            mode === 'sar-idr' ? 'text-[#1B6B3A]' : 'text-[#8B6914]'
          )}>
            {rate
              ? mode === 'sar-idr'
                ? fmtIDR(result)
                : fmtSAR(result)
              : '—'}
          </div>
          {rate && numAmount > 0 && (
            <p className="text-xs text-gray-400 mt-1">
              {mode === 'sar-idr'
                ? `Kurs: 1 SAR = Rp ${Math.round(rate).toLocaleString('id-ID')}`
                : `Kurs: Rp 1 = ﷼ ${(1 / rate).toFixed(6)}`}
            </p>
          )}
        </div>
      </div>

      {/* Referensi harga */}
      <div className="bg-white rounded-3xl border border-[rgba(201,168,76,0.15)] shadow-sm overflow-hidden">
        <button
          onClick={() => setShowRef(v => !v)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#FBF7F0] transition-colors"
        >
          <span className="font-bold text-[#0D4A28] flex items-center gap-2">
            🕌 Referensi Harga di Saudi Arabia
          </span>
          <Info size={16} className="text-gray-400" />
        </button>

        {showRef && (
          <div className="px-6 pb-4">
            <p className="text-xs text-gray-400 mb-4">Estimasi harga umum. Harga aktual bisa berbeda.</p>
            <div className="space-y-0">
              {REFERENSI_HARGA.map((item, i) => (
                <div
                  key={item.label}
                  className={cn(
                    'flex items-center gap-3 py-3',
                    i < REFERENSI_HARGA.length - 1 ? 'border-b border-gray-50' : ''
                  )}
                >
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <span className="flex-1 text-sm text-[#374151]">{item.label}</span>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold text-[#8B6914]">﷼ {item.sar}</div>
                    {rate && (
                      <div className="text-xs text-gray-400">
                        ≈ {fmtIDR(item.sar * rate)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-center text-gray-400/60 mt-5 pb-6">
        ⚠️ Kurs bersifat indikatif. Nilai tukar aktual bisa berbeda di money changer atau bank.
      </p>
    </div>
  )
}

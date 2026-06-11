'use client'
import { useState } from 'react'
import { Play, Pause, Compass } from 'lucide-react'

const SIDEBAR_ITEMS = [
  { icon: '🏠', label: 'Beranda' },
  { icon: '📖', label: 'Al-Quran' },
  { icon: '🕌', label: 'Panduan Ibadah', active: true },
  { icon: '🤲', label: 'Bank Doa' },
  { icon: '🧭', label: 'Kiblat & Waktu' },
  { icon: '☀️', label: 'Zikir', badge: 'PRO' },
  { icon: '📸', label: 'Spot Foto' },
  { icon: '✅', label: 'Tracker' },
]

export function LandingDashboardPreview() {
  const [tawafCount, setTawafCount] = useState(3)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [activeCard, setActiveCard] = useState<'panduan' | 'quran' | 'kiblat' | 'biaya'>('panduan')

  return (
    <div className="relative">
      {/* Live Preview Badge */}
      <div className="absolute -top-3 -right-3 z-10 bg-[#C9A84C] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
        Live Preview
      </div>

      {/* Browser Frame */}
      <div className="bg-white rounded-2xl shadow-2xl border border-[rgba(201,168,76,0.2)] overflow-hidden">
        {/* Browser Bar */}
        <div className="bg-gray-100 px-4 py-3 flex items-center gap-3 border-b border-gray-200">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-white rounded-lg px-3 py-1.5 text-xs text-gray-400 font-mono">
            umrava.com/dashboard
          </div>
        </div>

        <div className="flex min-h-[420px]">
          {/* Sidebar */}
          <div className="w-44 bg-[#0D4A28] p-4 flex flex-col gap-1 flex-shrink-0">
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="text-xl">🕋</div>
              <span className="font-black text-white text-sm">Umrava</span>
            </div>
            {SIDEBAR_ITEMS.map((item, i) => (
              <div key={i} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-all ${
                item.active ? 'bg-[rgba(201,168,76,0.2)] text-[#C9A84C]' : 'text-[rgba(251,247,240,0.6)]'
              }`}>
                <span>{item.icon}</span>
                <span className="font-medium flex-1">{item.label}</span>
                {item.badge && (
                  <span className="text-[8px] font-bold bg-[#C9A84C]/30 text-[#C9A84C] px-1 py-0.5 rounded-full">{item.badge}</span>
                )}
              </div>
            ))}

            <div className="mt-auto p-2 bg-[rgba(201,168,76,0.12)] rounded-xl">
              <div className="text-xs text-[#C9A84C] font-semibold mb-1">Persiapan: 65% ✅</div>
              <div className="h-1 bg-[rgba(255,255,255,0.1)] rounded-full">
                <div className="h-full bg-[#C9A84C] rounded-full w-[65%]" />
              </div>
              <div className="text-xs text-[rgba(251,247,240,0.6)] mt-2 text-center">H-47 🕌</div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-5 bg-[#FBF7F0] overflow-hidden">
            <div className="text-sm font-bold text-[#0D4A28] mb-1">Bismillah, Ahmad 🤲</div>
            <div className="text-xs text-gray-400 mb-4">Selasa, 3 Juni 2026 · 4 Dzulhijjah 1447 H</div>

            {/* Tab switcher */}
            <div className="flex gap-1.5 mb-4 overflow-x-auto">
              {([
                { key: 'panduan', label: 'Ibadah' },
                { key: 'quran', label: 'Al-Quran' },
                { key: 'kiblat', label: 'Kiblat' },
                { key: 'biaya', label: 'Biaya' },
              ] as const).map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveCard(tab.key)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    activeCard === tab.key
                      ? 'bg-[#1B6B3A] text-white'
                      : 'bg-white text-gray-500 border border-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Panduan Ibadah cards */}
            {activeCard === 'panduan' && (
              <div className="grid grid-cols-2 gap-3">
                {/* Tawaf Counter */}
                <div className="bg-white rounded-xl p-3 border border-[rgba(201,168,76,0.12)] shadow-sm">
                  <div className="text-xs font-semibold text-[#6b7280] mb-2">Putaran Tawaf</div>
                  <div className="text-center">
                    <div className="text-4xl font-black text-[#0D4A28]">{tawafCount}</div>
                    <div className="text-sm text-[#C9A84C] font-bold">/7</div>
                  </div>
                  <button
                    onClick={() => setTawafCount(c => c < 7 ? c + 1 : 0)}
                    className="w-full mt-2 bg-[#C9A84C] hover:bg-[#b8963d] text-white text-xs py-1.5 rounded-lg font-bold transition-colors"
                  >
                    + Putaran
                  </button>
                </div>

                {/* Audio Player */}
                <div className="bg-white rounded-xl p-3 border border-[rgba(201,168,76,0.12)] shadow-sm">
                  <div className="text-xs font-semibold text-[#6b7280] mb-2">Audio Doa</div>
                  <div className="text-xs text-[#0D4A28] font-medium mb-2">Doa Putaran ke-{tawafCount}</div>
                  <button
                    onClick={() => setAudioPlaying(!audioPlaying)}
                    className={`w-full flex items-center justify-center gap-1.5 text-xs py-1.5 rounded-lg font-bold transition-all ${audioPlaying ? 'bg-[#1B6B3A] text-white' : 'bg-[#E8F5ED] text-[#1B6B3A]'}`}
                  >
                    {audioPlaying ? <Pause size={12} /> : <Play size={12} />}
                    {audioPlaying ? 'Sedang putar' : 'Putar audio'}
                  </button>
                  {audioPlaying && (
                    <div className="flex items-end justify-center gap-0.5 h-5 mt-2">
                      {[4, 7, 5, 8, 4, 6, 5].map((h, i) => (
                        <div key={i} className="w-1 bg-[#1B6B3A] rounded-full animate-bounce"
                          style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Spot Foto */}
                <div className="bg-white rounded-xl p-3 border border-[rgba(201,168,76,0.12)] shadow-sm">
                  <div className="text-xs font-semibold text-[#6b7280] mb-1">Spot Foto</div>
                  <div className="text-xl mb-1">🕋</div>
                  <div className="text-xs font-semibold text-[#0D4A28]">Ka'bah Lantai 2</div>
                  <div className="text-xs text-[#C9A84C]">⏰ Terbaik: 05:30-07:00</div>
                </div>

                {/* Checklist */}
                <div className="bg-white rounded-xl p-3 border border-[rgba(201,168,76,0.12)] shadow-sm">
                  <div className="text-xs font-semibold text-[#6b7280] mb-2">Checklist H-47</div>
                  {['Buku paspor', 'Vaksin meningitis', 'Ihram'].map((item, i) => (
                    <div key={i} className={`flex items-center gap-1.5 text-xs mb-1 ${i < 2 ? 'text-[#1B6B3A]' : 'text-gray-400'}`}>
                      <span>{i < 2 ? '✅' : '⬜'}</span>{item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Al-Quran preview */}
            {activeCard === 'quran' && (
              <div className="space-y-3">
                <div className="bg-white rounded-xl p-3 border border-[rgba(201,168,76,0.12)] shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-semibold text-[#6b7280]">Surah Al-Fatihah · Ayat 1</div>
                    <span className="text-[10px] bg-[#E8F5ED] text-[#1B6B3A] px-2 py-0.5 rounded-full">Makkah · 7 ayat</span>
                  </div>
                  <div
                    className="text-right text-[#0D4A28] bg-[#FBF7F0] p-3 rounded-xl mb-2 leading-loose text-xl"
                    style={{ fontFamily: "'Amiri', serif", direction: 'rtl', lineHeight: 2 }}
                  >
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    <span className="font-semibold text-[#1B6B3A]">Artinya: </span>
                    Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-3 border border-[rgba(201,168,76,0.12)] shadow-sm">
                  <div className="text-xs font-semibold text-[#6b7280] mb-2">🎙️ Mishary Rashid Alafasy</div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E8F5ED] text-[#1B6B3A] rounded-full text-xs font-medium">
                      <Play size={11} /> Putar Audio
                    </button>
                    <div className="text-xs text-gray-400">Bookmark · Cari Ayat</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {['📖 114 Surah', '🔍 Cari Ayat', '❤️ Favorit'].map((f, i) => (
                    <div key={i} className="bg-[#E8F5ED] rounded-xl p-2 text-center">
                      <span className="text-xs font-semibold text-[#1B6B3A]">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Kiblat preview */}
            {activeCard === 'kiblat' && (
              <div className="space-y-3">
                {/* Clock */}
                <div className="bg-gradient-to-br from-[#1B6B3A] to-[#0D4A28] rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-black tabular-nums">05:42:17</div>
                      <div className="text-[#C9A84C] text-xs mt-1">4 Dzulhijjah 1447 H</div>
                    </div>
                    <div className="text-right text-xs text-white/60">
                      <div>Selasa</div>
                      <div>3 Juni 2026</div>
                    </div>
                  </div>
                </div>
                {/* Compass */}
                <div className="bg-white rounded-xl p-3 border border-[rgba(201,168,76,0.12)] shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-[#FBF7F0] border-2 border-[#C9A84C] flex items-center justify-center relative">
                      <Compass size={28} className="text-[#1B6B3A]" style={{ transform: 'rotate(42deg)' }} />
                      <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-red-500">U</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0D4A28]">Arah Kiblat: 295° (BB)</div>
                      <div className="text-xs text-gray-400">📍 Jakarta, Indonesia</div>
                      <div className="text-xs text-[#C9A84C] font-semibold mt-1">🕋 7.862 km ke Makkah</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Biaya preview */}
            {activeCard === 'biaya' && (
              <div className="space-y-3">
                <div className="bg-white rounded-xl p-3 border border-[rgba(201,168,76,0.12)] shadow-sm">
                  <div className="text-xs font-semibold text-[#6b7280] mb-2">Estimasi Biaya Umroh Mandiri</div>
                  <div className="text-xs text-[#374151] mb-1">Jakarta → Makkah 12 hari</div>
                  <div className="text-2xl font-black text-[#0D4A28]">Rp 28.500.000</div>
                  <div className="text-xs text-gray-400">/orang</div>
                </div>
                {[
                  { label: 'Tiket PP', val: 'Rp 12.5 Jt' },
                  { label: 'Hotel 12 malam', val: 'Rp 9.2 Jt' },
                  { label: 'Visa + Asuransi', val: 'Rp 3.1 Jt' },
                  { label: 'Transport + Makan', val: 'Rp 3.7 Jt' },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl px-3 py-2 border border-gray-50 flex justify-between items-center">
                    <span className="text-xs text-gray-500">{item.label}</span>
                    <span className="text-xs font-bold text-[#0D4A28]">{item.val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

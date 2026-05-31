'use client'
import { useState } from 'react'
import { Play, Pause } from 'lucide-react'

export function LandingDashboardPreview() {
  const [tawafCount, setTawafCount] = useState(3)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [hoveredSpot, setHoveredSpot] = useState(false)

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
            app.baitgo.com/dashboard
          </div>
        </div>

        <div className="flex min-h-96">
          {/* Sidebar */}
          <div className="w-44 bg-[#0D4A28] p-4 flex flex-col gap-1 flex-shrink-0">
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="text-xl">🕋</div>
              <span className="font-black text-white text-sm">BaitGo</span>
            </div>
            {[
              { icon: '🏠', label: 'Beranda' },
              { icon: '🕌', label: 'Panduan Ibadah', active: true },
              { icon: '🤲', label: 'Bank Doa' },
              { icon: '📋', label: 'Perencanaan' },
              { icon: '📸', label: 'Spot Foto' },
              { icon: '✅', label: 'Tracker' },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-all ${
                item.active ? 'bg-[rgba(201,168,76,0.2)] text-[#C9A84C]' : 'text-[rgba(251,247,240,0.6)]'
              }`}>
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
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
            <div className="text-xs text-gray-400 mb-4">Minggu, 1 Juni 2025</div>

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
              <div
                onMouseEnter={() => setHoveredSpot(true)}
                onMouseLeave={() => setHoveredSpot(false)}
                className="bg-white rounded-xl p-3 border border-[rgba(201,168,76,0.12)] shadow-sm cursor-pointer transition-all hover:border-[#C9A84C]"
              >
                <div className="text-xs font-semibold text-[#6b7280] mb-1">Spot Foto</div>
                <div className="text-xl mb-1">🕋</div>
                <div className="text-xs font-semibold text-[#0D4A28]">Ka'bah Lantai 2</div>
                <div className="text-xs text-[#C9A84C]">⏰ Terbaik: 05:30-07:00</div>
                {hoveredSpot && (
                  <div className="mt-2 text-xs text-white bg-[#1B6B3A] rounded-lg px-2 py-1 text-center">
                    Lihat tips foto →
                  </div>
                )}
              </div>

              {/* Estimasi */}
              <div className="bg-white rounded-xl p-3 border border-[rgba(201,168,76,0.12)] shadow-sm">
                <div className="text-xs font-semibold text-[#6b7280] mb-1">Estimasi Biaya</div>
                <div className="text-xs text-[#374151] mb-1">Jakarta → Makkah 12 hari</div>
                <div className="text-sm font-black text-[#0D4A28]">Rp 28.5 Jt</div>
                <div className="text-xs text-gray-400">/orang</div>
                <div className="mt-1.5 inline-flex items-center gap-1 text-xs bg-[#F5E6C8] text-[#8B6914] px-2 py-0.5 rounded-full font-semibold">
                  ✨ Premium
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'
import { useState } from 'react'
import { DATA_DOA, KATEGORI_DOA } from '@/data/doa'
import { TAHAP_IBADAH } from '@/data/panduan'
import { SPOT_FOTO } from '@/data/spotFoto'
import { CHECKLIST_FASES } from '@/data/checklist'
import { cn } from '@/lib/utils'
import { BookOpen, Music, MapPin, CheckSquare } from 'lucide-react'

const TABS = [
  { id: 'doa', label: 'Bank Doa', icon: BookOpen, count: DATA_DOA.length },
  { id: 'panduan', label: 'Panduan Ibadah', icon: Music, count: TAHAP_IBADAH.length },
  { id: 'spot', label: 'Spot Foto', icon: MapPin, count: SPOT_FOTO.length },
  { id: 'checklist', label: 'Checklist', icon: CheckSquare, count: CHECKLIST_FASES.reduce((a, f) => a + f.items.length, 0) },
]

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState('doa')
  const [doaSearch, setDoaSearch] = useState('')

  const filteredDoa = DATA_DOA.filter(d =>
    !doaSearch || d.judul.toLowerCase().includes(doaSearch.toLowerCase()) || d.kategori.includes(doaSearch.toLowerCase())
  )

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900">Manajemen Konten</h1>
        <p className="text-gray-500 text-sm">Review dan pantau semua konten BaitGo</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all',
              activeTab === tab.id
                ? 'bg-[#1B6B3A] text-white shadow-sm'
                : 'bg-white text-gray-500 border border-gray-200 hover:border-[#1B6B3A]'
            )}>
            <tab.icon size={15} />
            {tab.label}
            <span className={cn(
              'text-xs rounded-full px-2 py-0.5 font-bold',
              activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
            )}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* DOA TAB */}
      {activeTab === 'doa' && (
        <div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
            <input
              value={doaSearch}
              onChange={e => setDoaSearch(e.target.value)}
              placeholder="Cari judul doa atau kategori..."
              className="w-full text-sm outline-none"
            />
          </div>

          <div className="grid gap-3">
            {KATEGORI_DOA.map(kat => {
              const doaInKat = filteredDoa.filter(d => d.kategori === kat.id)
              if (doaInKat.length === 0) return null
              return (
                <div key={kat.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="bg-gray-50 px-5 py-3 flex items-center justify-between border-b border-gray-100">
                    <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
                      <span>{kat.icon}</span> {kat.label}
                    </div>
                    <span className="text-xs bg-[#E8F5ED] text-[#1B6B3A] px-2.5 py-1 rounded-full font-bold">
                      {doaInKat.length} doa
                    </span>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {doaInKat.map(doa => (
                      <div key={doa.id} className="px-5 py-3.5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-gray-900">{doa.judul}</div>
                            <div className="text-xs text-gray-400 mt-0.5 font-mono">{doa.id}</div>
                          </div>
                          <div className="flex gap-1.5 flex-shrink-0">
                            <span className={cn(
                              'text-xs px-2 py-0.5 rounded-full font-semibold',
                              doa.audioUrl ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-500'
                            )}>
                              {doa.audioUrl ? '🎵 Audio' : '⚠️ No audio'}
                            </span>
                            {doa.keutamaan && (
                              <span className="text-xs bg-[#F5E6C8] text-[#8B6914] px-2 py-0.5 rounded-full font-semibold">
                                💡 Keutamaan
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 line-clamp-1 font-arabic" style={{ direction: 'rtl', fontFamily: 'Amiri, serif' }}>
                          {doa.arab}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* PANDUAN TAB */}
      {activeTab === 'panduan' && (
        <div className="space-y-3">
          {TAHAP_IBADAH.map(tahap => (
            <div key={tahap.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{tahap.icon}</span>
                    <span className="font-bold text-gray-900">Tahap {tahap.nomor}: {tahap.judul}</span>
                  </div>
                  <div className="text-sm text-gray-400">{tahap.subtitle}</div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {tahap.counterType && (
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-semibold">
                      🔢 Counter {tahap.counterType}
                    </span>
                  )}
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-semibold">
                    {tahap.konten.length} konten
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tahap.konten.map((k, i) => (
                  <span key={i} className={cn(
                    'text-xs px-2 py-0.5 rounded-full font-medium',
                    k.tipe === 'doa' ? 'bg-[#F5E6C8] text-[#8B6914]' :
                    k.tipe === 'tip' ? 'bg-green-100 text-green-600' :
                    k.tipe === 'warning' ? 'bg-red-100 text-red-500' :
                    k.tipe === 'list' ? 'bg-blue-100 text-blue-600' :
                    k.tipe === 'counter' ? 'bg-purple-100 text-purple-600' :
                    'bg-gray-100 text-gray-500'
                  )}>
                    {k.tipe}{k.judul ? `: ${k.judul.slice(0, 20)}` : ''}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SPOT FOTO TAB */}
      {activeTab === 'spot' && (
        <div className="grid md:grid-cols-2 gap-4">
          {SPOT_FOTO.map(spot => (
            <div key={spot.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0',
                  spot.kota === 'makkah' ? 'bg-[#F5E6C8]' : 'bg-[#E8F5ED]'
                )}>
                  {spot.emoji}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-sm">{spot.nama}</div>
                  <div className="text-xs text-gray-400 capitalize">{spot.kota} · {spot.popularitas}</div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: spot.rating }).map((_, i) => (
                    <span key={i} className="text-[#C9A84C] text-xs">★</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">⏰ {spot.jamTerbaik}</span>
                {spot.waktuFoto.map(w => (
                  <span key={w} className="text-xs bg-blue-50 text-blue-500 px-2 py-0.5 rounded-full capitalize">{w}</span>
                ))}
                {spot.koordinat && (
                  <span className="text-xs bg-green-50 text-green-500 px-2 py-0.5 rounded-full">📍 GPS</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CHECKLIST TAB */}
      {activeTab === 'checklist' && (
        <div className="space-y-4">
          {CHECKLIST_FASES.map(fase => (
            <div key={fase.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-5 py-3 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
                  <span>{fase.icon}</span> {fase.label}
                  <span className="text-gray-400 font-normal text-xs">— {fase.waktu}</span>
                </div>
                <span className="text-xs bg-[#E8F5ED] text-[#1B6B3A] px-2.5 py-1 rounded-full font-bold">
                  {fase.items.length} item
                </span>
              </div>
              <div className="divide-y divide-gray-50">
                {fase.items.map(item => (
                  <div key={item.id} className="px-5 py-3 flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-200 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-700">{item.label}</div>
                      {item.info && (
                        <div className="text-xs text-gray-400 mt-0.5 line-clamp-1">{item.info}</div>
                      )}
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full flex-shrink-0">
                      {item.kategori}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

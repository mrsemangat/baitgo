'use client'
import { useState } from 'react'
import { CHECKLIST_FASES, getAllChecklistItems } from '@/data/checklist'
import { getDaysUntil } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Calendar } from 'lucide-react'
import { Card } from '@/components/ui/Card'

export default function TrackerPage() {
  const [departureDate, setDepartureDate] = useState('')
  const [checked, setChecked] = useState<string[]>([])
  const [expanded, setExpanded] = useState<string[]>(['h6-bulan'])
  const [notes, setNotes] = useState('')
  const [flightInfo, setFlightInfo] = useState({ number: '', time: '', terminal: '' })

  const total = getAllChecklistItems().length
  const progress = Math.round((checked.length / total) * 100)
  const daysLeft = departureDate ? getDaysUntil(departureDate) : null

  const toggle = (id: string) => setChecked(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  const toggleFase = (id: string) => setExpanded(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D4A28] mb-1">✅ Tracker Persiapan</h1>
        <p className="text-[#6b7280] text-sm">Pantau progres persiapan umrohmu dari H-6 bulan hingga hari H</p>
      </div>

      {/* Progress Circle */}
      <div className="bg-white rounded-3xl p-8 mb-6 shadow-sm border border-[rgba(201,168,76,0.12)] text-center">
        <div className="relative inline-flex items-center justify-center mb-4">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="60" fill="none" stroke="#f3f4f6" strokeWidth="12" />
            <circle
              cx="70" cy="70" r="60" fill="none"
              stroke="#1B6B3A" strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 60}`}
              strokeDashoffset={`${2 * Math.PI * 60 * (1 - progress / 100)}`}
              transform="rotate(-90 70 70)"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>
          <div className="absolute text-center">
            <div className="text-4xl font-black text-[#1B6B3A]">{progress}%</div>
            <div className="text-xs text-[#6b7280]">siap</div>
          </div>
        </div>

        <div className="text-sm text-[#6b7280]">{checked.length} dari {total} checklist selesai</div>

        {daysLeft !== null && (
          <div className="mt-4 inline-flex items-center gap-2 bg-[#E8F5ED] text-[#1B6B3A] px-5 py-2 rounded-full font-bold text-lg">
            🕌 H-{daysLeft} Hari Lagi
          </div>
        )}
      </div>

      {/* Set Departure Date */}
      <Card className="mb-5">
        <label className="block text-sm font-bold text-[#0D4A28] mb-3">
          <Calendar size={16} className="inline mr-2" />
          Tanggal Keberangkatan
        </label>
        <input
          type="date"
          value={departureDate}
          onChange={e => setDepartureDate(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1B6B3A]"
        />
      </Card>

      {/* Timeline Visual */}
      <div className="bg-white rounded-2xl p-5 mb-5 border border-[rgba(201,168,76,0.12)] shadow-sm overflow-x-auto">
        <h3 className="font-bold text-[#0D4A28] mb-4">Timeline Persiapan</h3>
        <div className="flex items-center gap-0 min-w-max">
          {CHECKLIST_FASES.map((fase, i) => {
            const faseChecked = fase.items.filter(item => checked.includes(item.id)).length
            const isDone = faseChecked === fase.items.length
            const isPartial = faseChecked > 0
            return (
              <div key={fase.id} className="flex items-center">
                <button
                  onClick={() => toggleFase(fase.id)}
                  className="flex flex-col items-center gap-1.5 px-2"
                >
                  <div className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center text-xl border-3 transition-all',
                    isDone ? 'bg-[#1B6B3A] text-white' : isPartial ? 'bg-[#C9A84C] text-white' : 'bg-white border-2 border-gray-200 text-gray-400'
                  )}>
                    {fase.icon}
                  </div>
                  <span className="text-xs text-center font-semibold text-[#0D4A28] max-w-14 leading-tight">{fase.label}</span>
                  <span className="text-xs text-[#6b7280]">{faseChecked}/{fase.items.length}</span>
                </button>
                {i < CHECKLIST_FASES.length - 1 && (
                  <div className={cn('h-0.5 w-8 mx-1 rounded-full', isDone ? 'bg-[#1B6B3A]' : 'bg-gray-200')} />
                )}
              </div>
            )
          })}
          <div className="flex flex-col items-center gap-1.5 px-2">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl bg-[#E8F5ED] text-[#1B6B3A]">
              🛫
            </div>
            <span className="text-xs font-semibold text-[#1B6B3A]">Berangkat!</span>
          </div>
        </div>
      </div>

      {/* Checklist Detail */}
      <div className="space-y-3 mb-6">
        {CHECKLIST_FASES.map(fase => {
          const isExp = expanded.includes(fase.id)
          const faseChecked = fase.items.filter(i => checked.includes(i.id)).length
          return (
            <div key={fase.id} className="bg-white rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-sm overflow-hidden">
              <button
                onClick={() => toggleFase(fase.id)}
                className="w-full flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{fase.icon}</span>
                  <div className="text-left">
                    <div className="font-bold text-[#0D4A28] text-sm">{fase.label}</div>
                    <div className="text-xs text-[#6b7280]">{fase.waktu}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-bold text-[#1B6B3A]">{faseChecked}/{fase.items.length}</div>
                    <div className="h-1 w-16 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#1B6B3A] rounded-full" style={{ width: `${(faseChecked/fase.items.length)*100}%` }} />
                    </div>
                  </div>
                  {isExp ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </div>
              </button>

              {isExp && (
                <div className="border-t border-gray-50 divide-y divide-gray-50">
                  {fase.items.map(item => (
                    <div
                      key={item.id}
                      onClick={() => toggle(item.id)}
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      {checked.includes(item.id)
                        ? <CheckCircle2 size={20} className="text-[#1B6B3A] flex-shrink-0" />
                        : <Circle size={20} className="text-gray-300 flex-shrink-0" />
                      }
                      <span className={cn('text-sm', checked.includes(item.id) ? 'line-through text-gray-400' : 'text-[#374151]')}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Catatan & Info Penerbangan */}
      <Card className="mb-6">
        <h3 className="font-bold text-[#0D4A28] mb-4">✈️ Info Penerbangan</h3>
        <div className="grid grid-cols-3 gap-3 mb-5">
          <input placeholder="Nomor tiket" value={flightInfo.number} onChange={e => setFlightInfo(f => ({ ...f, number: e.target.value }))}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1B6B3A]" />
          <input placeholder="Jam keberangkatan" value={flightInfo.time} onChange={e => setFlightInfo(f => ({ ...f, time: e.target.value }))}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1B6B3A]" />
          <input placeholder="Terminal" value={flightInfo.terminal} onChange={e => setFlightInfo(f => ({ ...f, terminal: e.target.value }))}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1B6B3A]" />
        </div>
        <h3 className="font-bold text-[#0D4A28] mb-2">📝 Catatan Perjalanan</h3>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Catat informasi penting: nomor hotel, kontak travel agent, kontak darurat di Indonesia..."
          rows={4}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B6B3A] resize-none"
        />
      </Card>
    </div>
  )
}

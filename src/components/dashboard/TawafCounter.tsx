'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { RotateCcw, CheckCircle2 } from 'lucide-react'

interface CounterProps {
  type: 'tawaf' | 'sai'
  max: number
  initialValue?: number
  onComplete?: () => void
  onUpdate?: (value: number) => void
}

export function TawafCounter({ type, max, initialValue = 0, onComplete, onUpdate }: CounterProps) {
  const [count, setCount] = useState(initialValue)
  const [showCelebration, setShowCelebration] = useState(false)

  const increment = () => {
    if (count >= max) return
    const next = count + 1
    setCount(next)
    onUpdate?.(next)
    if (next === max) {
      setShowCelebration(true)
      onComplete?.()
      setTimeout(() => setShowCelebration(false), 3000)
    }
  }

  const reset = () => {
    setCount(0)
    onUpdate?.(0)
  }

  const isSai = type === 'sai'
  const isComplete = count === max

  // For sa'i: odd ends at Marwa, even at Shafa
  const currentLocation = isSai
    ? count % 2 === 0 ? (count === 0 ? 'Mulai di Shafa' : 'Di Shafa') : 'Di Marwa'
    : null

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-[rgba(201,168,76,0.12)] text-center">
      {/* Label */}
      <div className="text-sm font-semibold text-[#6b7280] mb-1">
        {isSai ? "Penghitung Sa'i" : "Penghitung Tawaf"}
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-6 mt-2">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-300',
              i < count
                ? 'bg-[#1B6B3A] scale-110'
                : i === count
                ? 'bg-[#C9A84C] scale-125 animate-pulse'
                : 'bg-gray-200'
            )}
          />
        ))}
      </div>

      {/* Big counter */}
      <div className="relative mb-2">
        {showCelebration && (
          <div className="absolute -top-8 left-0 right-0 text-2xl animate-bounce">
            🎉 Alhamdulillah!
          </div>
        )}
        <div className={cn(
          'text-8xl font-black leading-none transition-all duration-200',
          isComplete ? 'text-[#1B6B3A]' : 'text-[#0D4A28]'
        )}>
          {count}
        </div>
        <div className="text-2xl text-[#C9A84C] font-bold">/{max}</div>
      </div>

      {/* Location for sa'i */}
      {isSai && currentLocation && (
        <div className={cn(
          'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4',
          count % 2 === 1 ? 'bg-[#E8F5ED] text-[#1B6B3A]' : 'bg-[#F5E6C8] text-[#8B6914]'
        )}>
          {count % 2 === 1 ? '🟢 Di Marwa' : count === 0 ? '🟡 Mulai dari Shafa' : '🟡 Di Shafa'}
        </div>
      )}

      {/* Status */}
      <div className="text-sm text-[#6b7280] mb-6">
        {isComplete ? (
          <span className="text-[#1B6B3A] font-semibold flex items-center justify-center gap-2">
            <CheckCircle2 size={18} />
            {isSai ? "Sa'i selesai! Lanjut ke Tahallul" : 'Tawaf selesai! Masya Allah'}
          </span>
        ) : (
          <span>
            {isSai
              ? `Perjalanan ke-${count + 1} dari ${max} — ${count % 2 === 0 ? 'Shafa → Marwa' : 'Marwa → Shafa'}`
              : `Putaran ke-${count + 1} dari ${max}`
            }
          </span>
        )}
      </div>

      {/* Tap button */}
      <button
        onClick={increment}
        disabled={isComplete}
        className={cn(
          'w-full py-5 rounded-2xl text-white font-bold text-xl transition-all duration-150 active:scale-95 shadow-lg',
          isComplete
            ? 'bg-[#1B6B3A] cursor-not-allowed'
            : 'bg-[#C9A84C] hover:bg-[#b8963d] active:shadow-inner'
        )}
      >
        {isComplete ? (
          <span className="flex items-center justify-center gap-2">
            <CheckCircle2 size={22} /> Selesai ✨
          </span>
        ) : (
          <span>
            {isSai ? '+ Tambah Perjalanan' : '+ Tambah Putaran'}
          </span>
        )}
      </button>

      {/* Reset */}
      {count > 0 && (
        <button
          onClick={reset}
          className="mt-3 flex items-center gap-2 mx-auto text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          <RotateCcw size={14} />
          Ulangi dari awal
        </button>
      )}
    </div>
  )
}

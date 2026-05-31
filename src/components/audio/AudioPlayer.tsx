'use client'
import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AudioPlayerProps {
  src?: string
  doaJudul?: string
  compact?: boolean
  className?: string
}

export function AudioPlayer({ src, doaJudul, compact = false, className }: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [speed, setSpeed] = useState(1)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Demo mode — no actual src yet, show UI only
  const isDemo = !src

  useEffect(() => {
    if (!audioRef.current || isDemo) return
    audioRef.current.playbackRate = speed
  }, [speed, isDemo])

  const togglePlay = () => {
    if (isDemo) {
      setPlaying(!playing)
      if (!playing) {
        let prog = 0
        const interval = setInterval(() => {
          prog += 1
          setProgress(prog)
          if (prog >= 100) { clearInterval(interval); setPlaying(false); setProgress(0) }
        }, 150)
      }
      return
    }
    if (!audioRef.current) return
    if (playing) { audioRef.current.pause() } else { audioRef.current.play() }
    setPlaying(!playing)
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    const pct = (audioRef.current.currentTime / audioRef.current.duration) * 100
    setProgress(isNaN(pct) ? 0 : pct)
  }

  const handleEnded = () => { setPlaying(false); setProgress(0) }

  const cycleSpeed = () => setSpeed(s => s === 1 ? 0.75 : s === 0.75 ? 0.5 : 1)

  if (compact) {
    return (
      <button
        onClick={togglePlay}
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all',
          playing
            ? 'bg-[#1B6B3A] text-white'
            : 'bg-[#E8F5ED] text-[#1B6B3A] hover:bg-[#1B6B3A] hover:text-white',
          className
        )}
      >
        {playing ? <Pause size={14} /> : <Play size={14} />}
        <span>{playing ? 'Putar...' : 'Putar Audio'}</span>
        {playing && (
          <span className="flex gap-0.5">
            {[1,2,3].map(i => (
              <span key={i} className="w-0.5 bg-white rounded-full animate-bounce"
                style={{ height: `${8 + i * 3}px`, animationDelay: `${i * 0.1}s` }} />
            ))}
          </span>
        )}
      </button>
    )
  }

  return (
    <div className={cn('bg-[#F5E6C8] rounded-2xl p-4', className)}>
      {!src && <audio ref={audioRef} src={src} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} />}

      {doaJudul && (
        <p className="text-xs text-[#8B6914] font-medium mb-3">🎵 {doaJudul}</p>
      )}

      {/* Progress bar */}
      <div className="h-1.5 bg-[#E8D5A0] rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-[#C9A84C] rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Rewind */}
          <button onClick={() => { if (audioRef.current) audioRef.current.currentTime -= 10 }}
            className="text-[#8B6914] hover:text-[#C9A84C] transition-colors">
            <RotateCcw size={18} />
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-[#C9A84C] hover:bg-[#b8963d] text-white flex items-center justify-center transition-all active:scale-95 shadow-md"
          >
            {playing ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
          </button>

          {/* Mute */}
          <button onClick={() => setMuted(!muted)}
            className="text-[#8B6914] hover:text-[#C9A84C] transition-colors">
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

        {/* Speed */}
        <button
          onClick={cycleSpeed}
          className="text-xs font-bold text-[#8B6914] bg-[#E8D5A0] px-2 py-1 rounded-lg hover:bg-[#C9A84C] hover:text-white transition-colors"
        >
          {speed === 1 ? 'Normal' : speed === 0.75 ? 'Lambat' : 'Sangat Lambat'}
        </button>
      </div>

      {isDemo && (
        <p className="text-xs text-[#8B6914]/60 mt-2 text-center">
          Audio doa akan tersedia setelah konten ditambahkan
        </p>
      )}
    </div>
  )
}

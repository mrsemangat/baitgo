'use client'
import { useRouter } from 'next/navigation'
import { X, Crown, CheckCircle2, Shield, Zap } from 'lucide-react'

interface UpgradeModalProps {
  onClose: () => void
}

const PREMIUM_FEATURES = [
  { icon: '☀️', label: 'Zikir Pagi & Petang Al-Banna + counter' },
  { icon: '📖', label: 'Al-Quran 114 surah + audio Mishary Ar-Rasyid' },
  { icon: '🤲', label: 'Bank doa lengkap dengan audio Arab' },
  { icon: '🧭', label: 'Kompas kiblat real-time + kalender Hijriah' },
  { icon: '📋', label: 'Tracker persiapan & perencanaan biaya detail' },
  { icon: '♾️', label: 'Semua update fitur tanpa biaya tambahan' },
]

export function UpgradeModal({ onClose }: UpgradeModalProps) {
  const router = useRouter()

  const handleUpgrade = () => {
    onClose()
    router.push('/dashboard/upgrade')
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Header */}
        <div className="bg-gradient-to-br from-[#0D4A28] to-[#1B6B3A] p-6 rounded-t-3xl text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white">
            <X size={20} />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#C9A84C] flex items-center justify-center">
              <Crown size={20} className="text-white" />
            </div>
            <div>
              <div className="font-black text-xl">Upgrade Premium</div>
              <div className="text-[#C9A84C] text-sm font-semibold">Bayar sekali, pakai seumur hidup</div>
            </div>
          </div>
          <div className="text-4xl font-black mt-3">Rp 49.000</div>
          <div className="text-white/60 text-xs mt-1">Lebih murah dari satu makan di Makkah ☕</div>
        </div>

        <div className="p-6">
          <h3 className="font-bold text-gray-900 mb-4">Yang kamu dapatkan:</h3>
          <div className="space-y-2.5 mb-5">
            {PREMIUM_FEATURES.map((f, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <CheckCircle2 size={15} className="text-[#1B6B3A] flex-shrink-0" />
                <span className="text-sm text-gray-700">{f.icon} {f.label}</span>
              </div>
            ))}
          </div>

          <div className="bg-[#F5E6C8] rounded-2xl p-4 mb-5 text-sm text-[#8B6914]">
            <strong>💡 Tidak ada biaya langganan.</strong> Bayar sekali Rp 49.000, nikmati semua fitur premium selamanya.
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 mb-5 text-xs text-gray-400">
            <div className="flex items-center gap-1"><Shield size={12} className="text-green-500" /> Pembayaran Aman</div>
            <div className="flex items-center gap-1"><Zap size={12} className="text-yellow-500" /> Aktivasi Instan</div>
            <div className="flex items-center gap-1">🔒 SSL Terenkripsi</div>
          </div>

          <button
            onClick={handleUpgrade}
            className="w-full bg-[#C9A84C] hover:bg-[#b8963d] text-white py-4 rounded-2xl font-black text-base transition-all shadow-md active:scale-[0.98]"
          >
            Pilih Metode Pembayaran →
          </button>

          <p className="text-center text-xs text-gray-400 mt-3">
            Pembayaran aman · VA, QRIS, Minimarket, E-Wallet, Transfer Manual
          </p>
        </div>
      </div>
    </div>
  )
}

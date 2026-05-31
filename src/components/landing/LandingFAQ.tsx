'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQS = [
  {
    q: 'Apakah konten doa bisa diakses offline?',
    a: 'Ya! Pengguna Free bisa download panduan ibadah dan doa untuk akses offline. Pengguna Premium bisa download seluruh konten termasuk spot foto dan panduan praktis. Download tersedia di menu Pengaturan > Download Offline.'
  },
  {
    q: 'Apakah audio doa bisa diputar saat layar HP mati?',
    a: 'Ya, ini adalah salah satu fitur utama BaitGo. Audio doa menggunakan background audio sehingga tetap berjalan meski layar mati atau saat Anda berpindah aplikasi. Cocok saat sedang tawaf atau sa\'i.'
  },
  {
    q: 'Apakah panduan ibadahnya sesuai dengan mazhab Syafi\'i?',
    a: 'Ya, konten panduan ibadah di BaitGo mengacu pada panduan umroh yang umum digunakan jamaah Indonesia yang mayoritas mengikuti mazhab Syafi\'i. Kami selalu menambahkan disclaimer agar Anda konsultasikan hal yang meragukan dengan ustadz.'
  },
  {
    q: 'Mengapa bayar sekali, bukan langganan?',
    a: 'Karena umroh bukan kebutuhan bulanan! Kami percaya tidak adil membebankan biaya langganan untuk sesuatu yang mungkin hanya Anda gunakan sekali atau beberapa kali seumur hidup. Bayar sekali, gunakan selamanya — termasuk update konten.'
  },
  {
    q: 'Apakah app ini bisa dipakai untuk haji juga?',
    a: 'BaitGo saat ini fokus pada panduan umroh. Banyak elemen ibadah umroh (tawaf, sa\'i, miqat, doa) juga ada dalam ibadah haji, sehingga tetap relevan. Panduan haji lengkap sedang dalam pengembangan untuk update mendatang.'
  },
  {
    q: 'Apakah konten akan diupdate?',
    a: 'Ya! Pengguna Premium mendapatkan update konten seumur hidup tanpa biaya tambahan. Kami secara rutin menambahkan spot foto baru, tips terbaru, dan penyempurnaan konten panduan.'
  },
  {
    q: 'Bisakah satu akun dipakai untuk seluruh keluarga?',
    a: 'Satu akun BaitGo bisa digunakan di maksimal 2 perangkat secara bersamaan. Untuk keluarga besar, disarankan memiliki akun terpisah agar progress checklist dan tracker masing-masing tidak bercampur.'
  },
]

export function LandingFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {FAQS.map((faq, i) => (
        <div key={i} className="bg-white rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-sm overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left"
          >
            <span className="font-semibold text-[#0D4A28] text-sm pr-4">{faq.q}</span>
            {open === i
              ? <ChevronUp size={18} className="text-[#C9A84C] flex-shrink-0" />
              : <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
            }
          </button>
          {open === i && (
            <div className="px-5 pb-5 border-t border-gray-50">
              <p className="text-sm text-[#6b7280] leading-relaxed pt-4">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

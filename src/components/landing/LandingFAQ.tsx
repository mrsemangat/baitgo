'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQS = [
  {
    q: 'Fitur apa saja yang tersedia gratis?',
    a: 'Fitur gratis Umrava sangat lengkap: Al-Quran 114 surah dengan terjemah Indonesia + audio Mishary, Kompas Kiblat real-time, Jam & Penanggalan Hijriah/Masehi, Bank Doa umroh, Panduan ibadah step-by-step, Spot foto pilihan, Checklist persiapan dasar, dan Tracker keberangkatan. Fitur Premium (Zikir Pagi & Petang Al-Banna + semua fitur lengkap) tersedia dengan upgrade sekali bayar Rp49.000.'
  },
  {
    q: 'Bagaimana cara membayar upgrade Premium?',
    a: 'Setelah login, klik tombol "Upgrade Premium" lalu pilih metode pembayaran yang tersedia: Virtual Account (BRI, BNI, BSI, Mandiri, Permata, CIMB), QRIS (scan dari GoPay/OVO/DANA/ShopeePay), Minimarket (Alfamart/Indomaret), atau E-Wallet. Setelah pembayaran terkonfirmasi, akun Premium Anda aktif secara otomatis — tidak perlu konfirmasi manual.'
  },
  {
    q: 'Apakah Al-Quran bisa digunakan tanpa internet?',
    a: 'Teks Arab dan terjemah Al-Quran memerlukan koneksi internet untuk pertama kali memuat surah (diambil dari API). Audio murottal Mishary Rashid Alafasy juga di-stream saat diputar. Untuk penggunaan offline penuh, kami sarankan membuka surah saat terhubung internet, lalu browser akan meng-cache kontennya.'
  },
  {
    q: 'Seakurat apa kompas kiblat di Umrava?',
    a: 'Kompas kiblat menggunakan GPS perangkat untuk menghitung arah Makkah secara presisi berdasarkan koordinat lokasi Anda. Akurasi bergantung pada sensor kompas di HP Anda dan kondisi lingkungan (jauh dari benda logam besar). Kompas digital perlu dikalibrasi — gerakkan HP membentuk angka 8 jika arah terasa tidak akurat. Untuk shalat, tetap konfirmasi dengan cara konvensional jika ada keraguan.'
  },
  {
    q: 'Apakah audio doa bisa diputar saat layar HP mati?',
    a: 'Ya, ini adalah salah satu fitur utama Umrava. Audio doa menggunakan audio web browser yang tetap berjalan meski layar mati atau saat Anda berpindah aplikasi. Cocok saat sedang tawaf atau sa\'i agar tangan bebas.'
  },
  {
    q: 'Apakah panduan ibadahnya sesuai dengan mazhab Syafi\'i?',
    a: 'Ya, konten panduan ibadah di Umrava mengacu pada panduan umroh yang umum digunakan jamaah Indonesia yang mayoritas mengikuti mazhab Syafi\'i. Kami selalu menambahkan disclaimer agar Anda konsultasikan hal yang meragukan dengan ustadz atau pembimbing umroh.'
  },
  {
    q: 'Mengapa bayar sekali, bukan berlangganan?',
    a: 'Karena umroh bukan kebutuhan bulanan! Kami percaya tidak adil membebankan biaya langganan untuk sesuatu yang mungkin hanya Anda gunakan sekali atau beberapa kali seumur hidup. Bayar Rp49.000 sekali, gunakan selamanya — termasuk semua update fitur di masa mendatang.'
  },
  {
    q: 'Apakah app ini bisa dipakai untuk haji juga?',
    a: 'Umrava saat ini fokus pada panduan umroh. Banyak elemen ibadah umroh (tawaf, sa\'i, miqat, doa) juga ada dalam ibadah haji, sehingga tetap relevan. Al-Quran, Kompas Kiblat, dan Zikir dapat digunakan kapan saja termasuk saat haji.'
  },
  {
    q: 'Bagaimana jika pembayaran berhasil tapi akun belum Premium?',
    a: 'Untuk pembayaran via gateway (VA/QRIS), aktivasi berjalan otomatis dalam hitungan detik. Untuk transfer manual, aktivasi dilakukan oleh admin setelah konfirmasi (1–24 jam). Jika dalam 10 menit akun belum berubah setelah bayar via gateway, coba refresh halaman atau logout dan login kembali. Jika masih bermasalah, hubungi kami di info@umrava.com.'
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

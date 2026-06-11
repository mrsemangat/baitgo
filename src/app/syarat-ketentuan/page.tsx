import Link from 'next/link'
import { LandingNav } from '@/components/landing/LandingNav'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan — Umrava',
  description: 'Syarat dan Ketentuan penggunaan layanan Umrava, platform panduan umroh digital Indonesia.',
}

export default function SyaratKetentuanPage() {
  return (
    <div className="min-h-screen bg-[#FBF7F0]">
      <LandingNav />

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#1B6B3A] to-[#0D4A28] pt-28 pb-12 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-4xl mb-4">📋</div>
          <h1 className="text-3xl font-black text-white mb-3">Syarat & Ketentuan</h1>
          <p className="text-[#C9A84C] text-sm">Terakhir diperbarui: 3 Juni 2026</p>
          <p className="text-white/70 text-sm mt-2">
            Harap baca syarat dan ketentuan ini dengan seksama sebelum menggunakan layanan Umrava.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-[rgba(201,168,76,0.12)] p-8 md:p-12 space-y-10">

          {/* 1 */}
          <section>
            <h2 className="text-xl font-black text-[#0D4A28] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#E8F5ED] text-[#1B6B3A] flex items-center justify-center text-sm font-black">1</span>
              Penerimaan Ketentuan
            </h2>
            <div className="text-[#374151] text-sm leading-relaxed space-y-3">
              <p>
                Dengan mendaftar, mengakses, atau menggunakan layanan Umrava melalui situs web <strong>umrava.com</strong>, Anda menyatakan telah membaca, memahami, dan menyetujui Syarat & Ketentuan ini beserta <Link href="/kebijakan-privasi" className="text-[#1B6B3A] underline">Kebijakan Privasi</Link> dan <Link href="/kebijakan-refund" className="text-[#1B6B3A] underline">Kebijakan Refund</Link> kami.
              </p>
              <p>
                Apabila Anda tidak menyetujui ketentuan ini, harap hentikan penggunaan layanan kami. Kami berhak mengubah Syarat & Ketentuan ini sewaktu-waktu dengan pemberitahuan melalui email atau platform.
              </p>
            </div>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-black text-[#0D4A28] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#E8F5ED] text-[#1B6B3A] flex items-center justify-center text-sm font-black">2</span>
              Tentang Umrava
            </h2>
            <div className="text-[#374151] text-sm leading-relaxed space-y-3">
              <p>
                Umrava adalah platform digital panduan umroh Indonesia yang menyediakan konten edukatif berupa panduan ibadah, bank doa, zikir, Al-Quran, perencanaan biaya, spot foto, kompas kiblat, dan fitur-fitur penunjang perjalanan umroh lainnya.
              </p>
              <p>
                Umrava bukan merupakan agen perjalanan umroh, biro penyelenggara perjalanan ibadah umroh (PPIU), atau penyedia layanan transportasi dan akomodasi. Layanan kami bersifat informatif dan edukatif.
              </p>
              <div className="bg-[#F5E6C8] rounded-xl p-4">
                <p className="font-semibold text-[#8B6914] text-xs mb-2">Informasi Layanan</p>
                <ul className="text-xs text-[#8B6914] space-y-1">
                  <li>• Nama Layanan: Umrava</li>
                  <li>• Website: umrava.com</li>
                  <li>• Email: info@umrava.com</li>
                  <li>• Telepon / WA: 081313585848</li>
                  <li>• Alamat: Perumahan Pilar Biru Blok Pilar Utara, Bandung</li>
                  <li>• Pengelola: Jajang Taufik Hidayat</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-black text-[#0D4A28] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#E8F5ED] text-[#1B6B3A] flex items-center justify-center text-sm font-black">3</span>
              Akun Pengguna
            </h2>
            <div className="text-[#374151] text-sm leading-relaxed space-y-3">
              <p>Untuk mengakses layanan Umrava, Anda diharuskan membuat akun dengan ketentuan berikut:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-2"><span className="text-[#1B6B3A] font-bold">•</span> Anda harus berusia minimal 17 tahun atau mendapatkan persetujuan orang tua/wali.</li>
                <li className="flex gap-2"><span className="text-[#1B6B3A] font-bold">•</span> Informasi yang Anda berikan saat pendaftaran harus akurat, lengkap, dan terkini.</li>
                <li className="flex gap-2"><span className="text-[#1B6B3A] font-bold">•</span> Anda bertanggung jawab menjaga kerahasiaan kata sandi akun Anda.</li>
                <li className="flex gap-2"><span className="text-[#1B6B3A] font-bold">•</span> Anda bertanggung jawab atas semua aktivitas yang terjadi dalam akun Anda.</li>
                <li className="flex gap-2"><span className="text-[#1B6B3A] font-bold">•</span> Segera hubungi kami jika Anda mencurigai adanya penggunaan akun tidak sah.</li>
                <li className="flex gap-2"><span className="text-[#1B6B3A] font-bold">•</span> Satu akun hanya boleh digunakan oleh satu orang pengguna.</li>
              </ul>
            </div>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-black text-[#0D4A28] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#E8F5ED] text-[#1B6B3A] flex items-center justify-center text-sm font-black">4</span>
              Paket & Pembayaran
            </h2>
            <div className="text-[#374151] text-sm leading-relaxed space-y-3">
              <p>Umrava menyediakan dua tingkat akses layanan:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-gray-100 rounded-xl p-4">
                  <p className="font-bold text-[#374151] mb-2">Akses Gratis</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Panduan ibadah dasar</li>
                    <li>• Bank doa umroh</li>
                    <li>• Al-Quran & terjemah</li>
                    <li>• Kompas kiblat & waktu</li>
                    <li>• Perencanaan & tracker</li>
                  </ul>
                </div>
                <div className="border border-[#C9A84C] rounded-xl p-4 bg-[#FFFBF0]">
                  <p className="font-bold text-[#8B6914] mb-1">Akses Premium</p>
                  <p className="text-xs text-[#C9A84C] font-bold mb-2">Rp49.000 — sekali bayar</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Semua fitur gratis</li>
                    <li>• Zikir Pagi & Petang Al-Banna</li>
                    <li>• Akses seumur hidup</li>
                    <li>• Update fitur tanpa biaya tambahan</li>
                  </ul>
                </div>
              </div>
              <p>
                Pembayaran dilakukan melalui gateway pembayaran yang terintegrasi. Setelah pembayaran dikonfirmasi, akses Premium akan aktif secara otomatis pada akun Anda.
              </p>
              <p>
                Harga dapat berubah sewaktu-waktu. Perubahan harga tidak berlaku retroaktif bagi pengguna yang telah melakukan pembayaran Premium.
              </p>
            </div>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-black text-[#0D4A28] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#E8F5ED] text-[#1B6B3A] flex items-center justify-center text-sm font-black">5</span>
              Hak Kekayaan Intelektual
            </h2>
            <div className="text-[#374151] text-sm leading-relaxed space-y-3">
              <p>
                Seluruh konten di platform Umrava — termasuk teks, desain, logo, ikon, gambar, kode perangkat lunak, dan konten panduan — merupakan milik Umrava atau pemberi lisensinya dan dilindungi oleh undang-undang hak cipta Indonesia.
              </p>
              <p>
                Konten Al-Quran dan terjemahan bahasa Indonesia mengacu pada sumber terpercaya dan Kementerian Agama Republik Indonesia. Konten audio murottal bersumber dari sumber-sumber yang tersedia untuk umum.
              </p>
              <p>
                Anda diberikan lisensi terbatas, non-eksklusif, tidak dapat dialihkan untuk mengakses dan menggunakan layanan Umrava untuk keperluan pribadi dan non-komersial. Anda <strong>dilarang</strong>:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-2"><span className="text-red-400">•</span> Menyalin, mendistribusikan, atau menjual konten Umrava tanpa izin tertulis.</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Memodifikasi atau membuat karya turunan dari konten kami.</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Melakukan reverse engineering terhadap kode sumber platform.</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Menggunakan konten untuk tujuan komersial tanpa izin.</li>
              </ul>
            </div>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-black text-[#0D4A28] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#E8F5ED] text-[#1B6B3A] flex items-center justify-center text-sm font-black">6</span>
              Larangan Penggunaan
            </h2>
            <div className="text-[#374151] text-sm leading-relaxed space-y-3">
              <p>Anda dilarang menggunakan layanan Umrava untuk:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-2"><span className="text-red-400">•</span> Aktivitas ilegal atau melanggar peraturan perundang-undangan yang berlaku di Indonesia.</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Menyebarkan informasi yang menyesatkan, hoaks, atau konten yang menyinggung nilai-nilai agama.</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Percobaan akses tidak sah ke sistem atau data pengguna lain.</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Memanipulasi atau mengganggu ketersediaan layanan (DDoS, scraping massal).</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Berbagi akun Premium dengan pengguna lain.</li>
              </ul>
              <p>Pelanggaran terhadap ketentuan ini dapat mengakibatkan penonaktifan akun tanpa pengembalian dana.</p>
            </div>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-black text-[#0D4A28] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#E8F5ED] text-[#1B6B3A] flex items-center justify-center text-sm font-black">7</span>
              Penafian & Batasan Tanggung Jawab
            </h2>
            <div className="text-[#374151] text-sm leading-relaxed space-y-3">
              <p>
                Konten panduan ibadah di Umrava disusun berdasarkan referensi yang terpercaya dan dikonsultasikan dengan para ahli agama. Namun, Umrava <strong>tidak bertanggung jawab</strong> atas:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-2"><span className="text-[#8B6914]">•</span> Perbedaan penafsiran ibadah antar mazhab atau ulama.</li>
                <li className="flex gap-2"><span className="text-[#8B6914]">•</span> Keakuratan data kompas kiblat yang dipengaruhi kondisi perangkat dan lokasi.</li>
                <li className="flex gap-2"><span className="text-[#8B6914]">•</span> Gangguan layanan akibat pemeliharaan, kondisi jaringan, atau force majeure.</li>
                <li className="flex gap-2"><span className="text-[#8B6914]">•</span> Kerugian tidak langsung yang timbul dari penggunaan informasi di platform ini.</li>
              </ul>
              <p>Untuk kepastian terkait ketentuan ibadah, pengguna disarankan berkonsultasi dengan ustadz atau pembimbing umroh yang kompeten.</p>
            </div>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-black text-[#0D4A28] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#E8F5ED] text-[#1B6B3A] flex items-center justify-center text-sm font-black">8</span>
              Penghentian Layanan
            </h2>
            <div className="text-[#374151] text-sm leading-relaxed space-y-3">
              <p>
                Kami berhak menangguhkan atau menghentikan akses Anda ke layanan Umrava atas kebijaksanaan kami jika Anda melanggar Syarat & Ketentuan ini.
              </p>
              <p>
                Anda dapat menghentikan penggunaan layanan kapan saja dengan menghubungi kami. Penghentian akun tidak secara otomatis menghasilkan pengembalian dana. Silakan merujuk pada <Link href="/kebijakan-refund" className="text-[#1B6B3A] underline">Kebijakan Refund</Link> kami.
              </p>
            </div>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-xl font-black text-[#0D4A28] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#E8F5ED] text-[#1B6B3A] flex items-center justify-center text-sm font-black">9</span>
              Hukum yang Berlaku
            </h2>
            <div className="text-[#374151] text-sm leading-relaxed space-y-3">
              <p>
                Syarat & Ketentuan ini diatur oleh dan ditafsirkan berdasarkan hukum yang berlaku di Republik Indonesia. Setiap sengketa yang timbul diselesaikan melalui musyawarah. Apabila tidak tercapai kesepakatan, sengketa diselesaikan melalui pengadilan yang berwenang di Indonesia.
              </p>
            </div>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-xl font-black text-[#0D4A28] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#E8F5ED] text-[#1B6B3A] flex items-center justify-center text-sm font-black">10</span>
              Hubungi Kami
            </h2>
            <div className="text-[#374151] text-sm leading-relaxed">
              <p className="mb-3">Jika Anda memiliki pertanyaan terkait Syarat & Ketentuan ini, silakan hubungi kami:</p>
              <div className="bg-[#E8F5ED] rounded-xl p-4 space-y-1.5 text-sm">
                <p>📧 Email: <a href="mailto:info@umrava.com" className="text-[#1B6B3A] font-medium">info@umrava.com</a></p>
                <p>📱 Telepon / WA: <a href="https://wa.me/6281313585848" className="text-[#1B6B3A] font-medium">081313585848</a></p>
                <p>📍 Alamat: Perumahan Pilar Biru Blok Pilar Utara, Bandung</p>
                <p>🌐 Website: <a href="https://umrava.com" className="text-[#1B6B3A] font-medium">umrava.com</a></p>
                <p>⏰ Respons dalam 1×24 jam kerja</p>
              </div>
            </div>
          </section>

        </div>

        {/* Footer links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-[#6b7280]">
          <Link href="/kebijakan-privasi" className="hover:text-[#1B6B3A] transition-colors">Kebijakan Privasi</Link>
          <span className="text-gray-200">·</span>
          <Link href="/kebijakan-refund" className="hover:text-[#1B6B3A] transition-colors">Kebijakan Refund</Link>
          <span className="text-gray-200">·</span>
          <Link href="/" className="hover:text-[#1B6B3A] transition-colors">Kembali ke Beranda</Link>
        </div>
      </div>
    </div>
  )
}

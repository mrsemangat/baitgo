import Link from 'next/link'
import { LandingNav } from '@/components/landing/LandingNav'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kebijakan Refund — Umrava',
  description: 'Kebijakan pengembalian dana Umrava untuk pembelian akses Premium.',
}

export default function KebijakanRefundPage() {
  return (
    <div className="min-h-screen bg-[#FBF7F0]">
      <LandingNav />

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#1B6B3A] to-[#0D4A28] pt-28 pb-12 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-4xl mb-4">💳</div>
          <h1 className="text-3xl font-black text-white mb-3">Kebijakan Refund</h1>
          <p className="text-[#C9A84C] text-sm">Terakhir diperbarui: 3 Juni 2026</p>
          <p className="text-white/70 text-sm mt-2">
            Ketentuan pengembalian dana untuk pembelian akses Premium Umrava.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-[rgba(201,168,76,0.12)] p-8 md:p-12 space-y-10">

          {/* Summary card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#E8F5ED] rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">3️⃣</div>
              <p className="font-black text-[#1B6B3A] text-lg">3 Hari</p>
              <p className="text-xs text-[#1B6B3A]/70">Masa pengajuan refund</p>
            </div>
            <div className="bg-[#F5E6C8] rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">💰</div>
              <p className="font-black text-[#8B6914] text-lg">100%</p>
              <p className="text-xs text-[#8B6914]/70">Dana dikembalikan</p>
            </div>
            <div className="bg-[#E8F5ED] rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">⚡</div>
              <p className="font-black text-[#1B6B3A] text-lg">3–7 Hari</p>
              <p className="text-xs text-[#1B6B3A]/70">Proses pengembalian</p>
            </div>
          </div>

          {/* 1 */}
          <section>
            <h2 className="text-xl font-black text-[#0D4A28] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#E8F5ED] text-[#1B6B3A] flex items-center justify-center text-sm font-black">1</span>
              Ketentuan Umum
            </h2>
            <div className="text-[#374151] text-sm leading-relaxed space-y-3">
              <p>
                Umrava menyediakan akses Premium dengan harga <strong>Rp49.000 (sekali bayar)</strong>. Sebelum melakukan pembelian, kami menyarankan pengguna untuk:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-2"><span className="text-[#1B6B3A]">•</span> Mencoba seluruh fitur gratis terlebih dahulu sebelum memutuskan upgrade ke Premium</li>
                <li className="flex gap-2"><span className="text-[#1B6B3A]">•</span> Membaca deskripsi fitur Premium secara lengkap di halaman utama</li>
                <li className="flex gap-2"><span className="text-[#1B6B3A]">•</span> Menghubungi kami jika ada pertanyaan sebelum melakukan pembayaran</li>
              </ul>
              <p>
                Umrava adalah produk digital berbasis langganan seumur hidup. Setelah akses Premium diaktifkan, pengguna telah menerima dan dapat menggunakan seluruh layanan Premium.
              </p>
            </div>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-black text-[#0D4A28] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#E8F5ED] text-[#1B6B3A] flex items-center justify-center text-sm font-black">2</span>
              Kondisi yang Memenuhi Syarat Refund
            </h2>
            <div className="text-[#374151] text-sm leading-relaxed space-y-4">
              <p>Permohonan pengembalian dana <strong>akan diproses</strong> apabila memenuhi salah satu kondisi berikut:</p>

              <div className="space-y-3">
                <div className="flex gap-3 p-4 bg-[#E8F5ED] rounded-xl">
                  <span className="text-xl flex-shrink-0">✅</span>
                  <div>
                    <p className="font-semibold text-[#0D4A28] text-sm mb-1">Pembayaran Ganda (Double Payment)</p>
                    <p className="text-xs text-[#374151]/80">Anda melakukan pembayaran lebih dari satu kali untuk akun yang sama, sehingga terjadi duplikasi tagihan.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 bg-[#E8F5ED] rounded-xl">
                  <span className="text-xl flex-shrink-0">✅</span>
                  <div>
                    <p className="font-semibold text-[#0D4A28] text-sm mb-1">Akses Premium Tidak Aktif</p>
                    <p className="text-xs text-[#374151]/80">Pembayaran berhasil dikonfirmasi namun status akun tidak berubah menjadi Premium dalam 24 jam, dan tim kami tidak dapat menyelesaikan masalah teknis tersebut.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 bg-[#E8F5ED] rounded-xl">
                  <span className="text-xl flex-shrink-0">✅</span>
                  <div>
                    <p className="font-semibold text-[#0D4A28] text-sm mb-1">Gangguan Layanan Berkepanjangan</p>
                    <p className="text-xs text-[#374151]/80">Layanan mengalami gangguan total (tidak dapat diakses) selama lebih dari 72 jam berturut-turut sejak pembayaran, dan di luar kondisi force majeure.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 bg-[#E8F5ED] rounded-xl">
                  <span className="text-xl flex-shrink-0">✅</span>
                  <div>
                    <p className="font-semibold text-[#0D4A28] text-sm mb-1">Pengajuan dalam 3 Hari Kerja</p>
                    <p className="text-xs text-[#374151]/80">Permohonan diajukan maksimal 3 hari kerja setelah tanggal pembayaran, disertai bukti transaksi yang valid, dan akun belum banyak digunakan untuk mengakses konten Premium.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-black text-[#0D4A28] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#E8F5ED] text-[#1B6B3A] flex items-center justify-center text-sm font-black">3</span>
              Kondisi yang Tidak Memenuhi Syarat Refund
            </h2>
            <div className="text-[#374151] text-sm leading-relaxed space-y-3">
              <p>Permohonan pengembalian dana <strong>tidak akan diproses</strong> dalam kondisi berikut:</p>
              <div className="space-y-3">
                <div className="flex gap-3 p-4 bg-red-50 rounded-xl">
                  <span className="text-xl flex-shrink-0">❌</span>
                  <div>
                    <p className="font-semibold text-[#0D4A28] text-sm mb-1">Sudah Menggunakan Fitur Premium</p>
                    <p className="text-xs text-[#374151]/80">Akun telah mengakses dan menggunakan konten Zikir Pagi & Petang atau fitur Premium lainnya secara signifikan.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 bg-red-50 rounded-xl">
                  <span className="text-xl flex-shrink-0">❌</span>
                  <div>
                    <p className="font-semibold text-[#0D4A28] text-sm mb-1">Lewat Batas Waktu</p>
                    <p className="text-xs text-[#374151]/80">Pengajuan dilakukan lebih dari 3 hari kerja setelah tanggal pembayaran.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 bg-red-50 rounded-xl">
                  <span className="text-xl flex-shrink-0">❌</span>
                  <div>
                    <p className="font-semibold text-[#0D4A28] text-sm mb-1">Alasan Perubahan Pikiran</p>
                    <p className="text-xs text-[#374151]/80">Pengguna berubah pikiran setelah membeli tanpa alasan teknis yang valid.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 bg-red-50 rounded-xl">
                  <span className="text-xl flex-shrink-0">❌</span>
                  <div>
                    <p className="font-semibold text-[#0D4A28] text-sm mb-1">Pelanggaran Syarat & Ketentuan</p>
                    <p className="text-xs text-[#374151]/80">Akun ditangguhkan karena melanggar <Link href="/syarat-ketentuan" className="text-[#1B6B3A] underline">Syarat & Ketentuan</Link>.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 bg-red-50 rounded-xl">
                  <span className="text-xl flex-shrink-0">❌</span>
                  <div>
                    <p className="font-semibold text-[#0D4A28] text-sm mb-1">Force Majeure</p>
                    <p className="text-xs text-[#374151]/80">Gangguan layanan akibat bencana alam, kebijakan pemerintah, gangguan infrastruktur internet, atau kondisi di luar kendali Umrava.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-black text-[#0D4A28] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#E8F5ED] text-[#1B6B3A] flex items-center justify-center text-sm font-black">4</span>
              Cara Mengajukan Permohonan Refund
            </h2>
            <div className="text-[#374151] text-sm leading-relaxed space-y-4">
              <p>Ikuti langkah berikut untuk mengajukan permohonan pengembalian dana:</p>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-[#1B6B3A] text-white flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">1</span>
                  <div>
                    <p className="font-semibold text-[#0D4A28] mb-1">Kirim Email Permohonan</p>
                    <p className="text-xs text-gray-500 mb-2">Kirim email ke <a href="mailto:info@umrava.com" className="text-[#1B6B3A] underline font-medium">info@umrava.com</a> dengan subjek: <strong>[REFUND] - [Nama Anda]</strong></p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-[#1B6B3A] text-white flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">2</span>
                  <div>
                    <p className="font-semibold text-[#0D4A28] mb-1">Sertakan Informasi Berikut</p>
                    <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-600 space-y-1">
                      <p>• Nama lengkap sesuai akun Umrava</p>
                      <p>• Email akun Umrava</p>
                      <p>• Tanggal & nominal pembayaran</p>
                      <p>• ID transaksi atau bukti pembayaran (screenshot)</p>
                      <p>• Alasan permohonan refund secara jelas</p>
                      <p>• Nomor rekening / e-wallet untuk pengembalian dana</p>
                    </div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-[#1B6B3A] text-white flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">3</span>
                  <div>
                    <p className="font-semibold text-[#0D4A28] mb-1">Konfirmasi & Verifikasi</p>
                    <p className="text-xs text-gray-500">Tim kami akan memverifikasi permohonan dan merespons dalam 1×24 jam kerja.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-[#1B6B3A] text-white flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">4</span>
                  <div>
                    <p className="font-semibold text-[#0D4A28] mb-1">Proses Pengembalian Dana</p>
                    <p className="text-xs text-gray-500">Jika disetujui, dana akan dikembalikan ke metode pembayaran asal atau rekening yang Anda tentukan dalam 3–7 hari kerja.</p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-black text-[#0D4A28] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#E8F5ED] text-[#1B6B3A] flex items-center justify-center text-sm font-black">5</span>
              Waktu & Metode Pengembalian
            </h2>
            <div className="text-[#374151] text-sm leading-relaxed space-y-3">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#E8F5ED] text-[#0D4A28]">
                      <th className="text-left p-3 rounded-tl-xl">Metode Pembayaran Asal</th>
                      <th className="text-left p-3">Metode Pengembalian</th>
                      <th className="text-left p-3 rounded-tr-xl">Estimasi Waktu</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b border-gray-50">
                      <td className="p-3">Transfer Bank</td>
                      <td className="p-3">Transfer ke rekening Anda</td>
                      <td className="p-3">3–7 hari kerja</td>
                    </tr>
                    <tr className="border-b border-gray-50">
                      <td className="p-3">QRIS / E-Wallet</td>
                      <td className="p-3">Transfer ke e-wallet / rekening</td>
                      <td className="p-3">3–5 hari kerja</td>
                    </tr>
                    <tr className="border-b border-gray-50">
                      <td className="p-3">Kartu Kredit/Debit</td>
                      <td className="p-3">Kredit ke kartu asal</td>
                      <td className="p-3">5–14 hari kerja</td>
                    </tr>
                    <tr>
                      <td className="p-3">Minimarket (Alfamart/Indomaret)</td>
                      <td className="p-3">Transfer ke rekening Anda</td>
                      <td className="p-3">5–7 hari kerja</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400">
                * Waktu pengembalian dapat bervariasi tergantung kebijakan bank atau penyedia layanan pembayaran masing-masing.
              </p>
              <p className="bg-[#F5E6C8] text-[#8B6914] rounded-xl p-3 text-xs">
                💡 <strong>Catatan biaya:</strong> Umrava menanggung biaya admin refund. Anda menerima pengembalian dana penuh sebesar Rp49.000 tanpa potongan.
              </p>
            </div>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-black text-[#0D4A28] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#E8F5ED] text-[#1B6B3A] flex items-center justify-center text-sm font-black">6</span>
              Penyelesaian Sengketa
            </h2>
            <div className="text-[#374151] text-sm leading-relaxed space-y-3">
              <p>
                Jika terjadi perselisihan terkait refund, kami berkomitmen menyelesaikannya secara musyawarah. Tahapan penyelesaian:
              </p>
              <ol className="space-y-2 pl-4">
                <li className="flex gap-2"><span className="text-[#1B6B3A] font-bold">1.</span> Hubungi tim Umrava via email untuk mediasi langsung</li>
                <li className="flex gap-2"><span className="text-[#1B6B3A] font-bold">2.</span> Eskalasi ke Badan Perlindungan Konsumen Nasional (BPKN) jika tidak tercapai kesepakatan dalam 14 hari</li>
                <li className="flex gap-2"><span className="text-[#1B6B3A] font-bold">3.</span> Penyelesaian melalui jalur hukum sesuai peraturan perlindungan konsumen Indonesia (UU No. 8 Tahun 1999)</li>
              </ol>
            </div>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-black text-[#0D4A28] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#E8F5ED] text-[#1B6B3A] flex items-center justify-center text-sm font-black">7</span>
              Hubungi Kami
            </h2>
            <div className="text-[#374151] text-sm leading-relaxed">
              <p className="mb-3">Untuk permohonan refund atau pertanyaan terkait pembayaran:</p>
              <div className="bg-[#E8F5ED] rounded-xl p-4 space-y-1.5 text-sm">
                <p>📧 Email: <a href="mailto:info@umrava.com" className="text-[#1B6B3A] font-medium">info@umrava.com</a></p>
                <p className="text-xs text-gray-500">Subjek: <strong>[REFUND] - [Nama Anda]</strong></p>
                <p>📱 Telepon / WA: <a href="https://wa.me/6281313585848" className="text-[#1B6B3A] font-medium">081313585848</a></p>
                <p>📍 Alamat: Perumahan Pilar Biru Blok Pilar Utara, Bandung</p>
                <p>🌐 Website: <a href="https://umrava.com" className="text-[#1B6B3A] font-medium">umrava.com</a></p>
                <p>⏰ Respons dalam 1×24 jam kerja (Senin–Sabtu)</p>
              </div>
            </div>
          </section>

        </div>

        {/* Footer links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-[#6b7280]">
          <Link href="/syarat-ketentuan" className="hover:text-[#1B6B3A] transition-colors">Syarat & Ketentuan</Link>
          <span className="text-gray-200">·</span>
          <Link href="/kebijakan-privasi" className="hover:text-[#1B6B3A] transition-colors">Kebijakan Privasi</Link>
          <span className="text-gray-200">·</span>
          <Link href="/" className="hover:text-[#1B6B3A] transition-colors">Kembali ke Beranda</Link>
        </div>
      </div>
    </div>
  )
}

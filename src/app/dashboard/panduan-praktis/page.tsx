'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronUp } from 'lucide-react'

const KATEGORI = [
  { id: 'transportasi', icon: '🚌', label: 'Transportasi' },
  { id: 'fasilitas', icon: '🏥', label: 'Fasilitas & Darurat' },
  { id: 'cuaca', icon: '🌡️', label: 'Cuaca & Kesehatan' },
  { id: 'belanja', icon: '🛍️', label: 'Belanja & Kuliner' },
  { id: 'teknologi', icon: '📱', label: 'Tips Teknologi' },
]

const KONTEN: Record<string, { judul: string; isi: string }[]> = {
  transportasi: [
    {
      judul: '🚌 Bus Sholawat (Makkah)',
      isi: 'Bus Sholawat beroperasi 24 jam menghubungkan hotel-hotel di Makkah dengan Masjidil Haram. Ada 3 jalur utama (merah, hijau, biru) yang bisa dipilih sesuai lokasi hotel.\n\n✅ Tips: Tap kartu di mesin pintu masuk — jangan bayar tunai. Kartu bisa dibeli di loket terminal bus.\n\n✅ Jalur paling padat adalah saat waktu sholat (Subuh, Maghrib, Isya). Persiapkan diri 30-45 menit lebih awal.',
    },
    {
      judul: '🚕 Taksi & Ride-Hailing di Makkah',
      isi: 'Uber dan Careem tersedia di Makkah dan Madinah. Sangat direkomendasikan vs taksi biasa karena harga transparan.\n\n✅ Untuk taksi biasa: selalu tanya harga sebelum naik dan sepakati di awal. Jangan masuk dulu sebelum harga jelas.\n\n✅ Jarak dari hotel ke Masjidil Haram (jika tidak menggunakan bus): sekitar SAR 10-20 tergantung jarak.',
    },
    {
      judul: '🚄 Kereta Haramain (Makkah-Madinah)',
      isi: 'Kereta cepat Haramain menghubungkan Makkah, Jeddah (King Abdulaziz Airport), dan Madinah dalam waktu sekitar 2.5 jam.\n\n✅ Cara beli tiket: website haramain.info atau aplikasi Haramain. Beli jauh-jauh hari karena cepat penuh.\n\n✅ Bawa kartu identitas dan QR code tiket. Datang 30 menit sebelum keberangkatan.\n\n✅ Harga: sekitar SAR 180-300 per orang sekali jalan, tergantung kelas.',
    },
  ],
  fasilitas: [
    {
      judul: '🏥 Klinik Darurat di Makkah',
      isi: 'Klinik tersedia di dalam dan sekitar Masjidil Haram:\n\n• Klinik Masjidil Haram: di dalam masjid, gratis untuk jamaah yang sakit\n• RSUD Al-Noor: rumah sakit utama di Makkah\n• Klinik-klinik 24 jam di kawasan Ajyad dan Misfalah\n\n✅ Untuk kedaruratan: hubungi nomor 911 (darurat Arab Saudi)',
    },
    {
      judul: '📞 Nomor Penting',
      isi: '🇸🇦 Darurat Arab Saudi: 911\n🇮🇩 KJRI Jeddah: +966-12-671-1271\n🇮🇩 KBRI Riyadh: +966-11-488-2800\n📱 Layanan SMS KJRI: +966-56-072-0773\n\n✅ Simpan nomor-nomor ini di HP SEBELUM berangkat. Screenshot dan simpan di foto agar bisa diakses offline.',
    },
    {
      judul: '🆘 Kalau Tersesat',
      isi: 'Titik kumpul jika terpisah dari rombongan:\n• Di Makkah: dekat pintu Baab As-Safa (pintu utama menghadap Shafa)\n• Di Madinah: dekat pintu Baab As-Salam (pintu utama sisi selatan)\n\n✅ Selalu ingat nama hotel dan nomor kamar\n✅ Simpan nama hotel dalam bahasa Arab di HP\n✅ Foto peta area sekitar hotel untuk referensi offline',
    },
    {
      judul: '📄 Kehilangan Paspor',
      isi: '1. Lapor ke KJRI Jeddah (nomor di atas) sesegera mungkin\n2. Buat laporan kehilangan di kantor polisi terdekat (Surat Al-Bulagh)\n3. KJRI akan bantu penerbitan Surat Perjalanan Laksana Paspor (SPLP)\n4. Hubungi travel agent atau keluarga di Indonesia untuk backup fotokopi paspor\n\n✅ Selalu simpan fotokopi paspor di email dan cloud storage sebelum berangkat!',
    },
  ],
  cuaca: [
    {
      judul: '🌡️ Suhu per Musim di Makkah',
      isi: 'Makkah sangat panas hampir sepanjang tahun:\n\n☀️ Musim Panas (Mei-Sep): 40-48°C\n🌤️ Musim Semi/Gugur (Mar-Apr, Oct-Nov): 28-38°C\n❄️ Musim Dingin (Des-Feb): 17-28°C (relatif paling nyaman)\n\n✅ Terbaik untuk umroh dari sisi cuaca: November-Februari\n✅ Madinah sedikit lebih sejuk dari Makkah',
    },
    {
      judul: '💧 Cegah Dehidrasi & Heat Stroke',
      isi: '✅ Minum minimal 250ml air 30 menit sebelum tawaf/sa\'i\n✅ Bawa botol minum dan refill dari dispenser Zamzam\n✅ Hindari kafein dan minuman manis berlebihan\n✅ Mandi atau basahi handuk untuk turunkan suhu tubuh\n\n⚠️ Tanda Heat Stroke: pusing berat, tidak berkeringat, kulit merah dan panas, pingsan. Segera cari tempat teduh dan minta bantuan!',
    },
    {
      judul: '💊 Obat Wajib Dibawa',
      isi: '• Paracetamol / Ibuprofen (demam, nyeri)\n• Antasida / obat maag\n• Oralit / Pedialyte (diare, dehidrasi)\n• Loperamid (diare akut)\n• Antihistamin (alergi, gatal)\n• Betadine + plester (luka kecil)\n• Minyak angin / balsem\n• Vitamin C 1000mg\n• Obat pribadi rutin Anda\n\n✅ Simpan obat di tas kabin, bukan koper bagasi',
    },
  ],
  belanja: [
    {
      judul: '🛍️ Tips Belanja di Pasar Zamzam Tower',
      isi: 'Pasar Zamzam Tower (dalam komplek Abraj Al Bait) adalah pusat belanja oleh-oleh terlengkap:\n\n✅ Waktu terbaik: malam setelah Isya, ketika jamaah sudah banyak yang selesai ibadah\n✅ Jangan beli di hari pertama — survey harga dulu\n✅ Harga biasanya bisa ditawar 20-30%, terutama untuk pembelian jumlah banyak\n✅ Toko-toko di dalam lebih mahal dari kios-kios di luar',
    },
    {
      judul: '🎁 Daftar Oleh-oleh Wajib + Estimasi Harga',
      isi: '• Kurma (premium): SAR 20-200/kg tergantung jenis\n• Air Zamzam: bawa botol kosong dan isi sendiri (gratis!)\n• Sajadah/Tasbih: SAR 5-50\n• Minyak Zaitun: SAR 15-50/botol\n• Kacang Arab: SAR 10-20/kg\n• Parfum Arab/oud: SAR 30-200+\n• Baju koko/abaya: SAR 20-100\n• Coklat Arab: SAR 5-20/kotak\n\n💡 1 SAR ≈ Rp 4.300 (cek kurs terkini sebelum berangkat)',
    },
    {
      judul: '🍽️ Rekomendasi Kuliner Dekat Masjidil Haram',
      isi: 'Dekat Masjidil Haram:\n• Al Baik: ayam goreng khas Saudi, wajib dicoba! Antri wajar.\n• Shawarma di kaki lima sekitar Zamzam Tower: SAR 3-8, kenyang\n• Kabsah (nasi Arab): tersedia di banyak resto halal\n\nDekat Masjid Nabawi:\n• Ikea Restaurant Madinah: murah dan lezat\n• Mandi Al Hamra: nasi mandi autentik\n\n✅ Tips hemat: beli makanan dari mini market (bin Dawood, Lulu, Carrefour) untuk sarapan dan camilan',
    },
  ],
  teknologi: [
    {
      judul: '📶 Kartu SIM Lokal Arab Saudi',
      isi: 'Rekomendasi operator:\n🥇 STC (Saudi Telecom): sinyal terbaik di Masjidil Haram dan Masjid Nabawi\n🥈 Mobily: alternatif baik, sedikit lebih murah\n🥉 Zain: pilihan ketiga\n\n✅ Beli di bandara Jeddah/Madinah sesaat setelah mendarat, atau di toko telekomunikasi di kota\n✅ Paket data 5GB: sekitar SAR 15-25 untuk 30 hari\n✅ Bawa foto paspor untuk registrasi SIM',
    },
    {
      judul: '📥 Download Peta Offline',
      isi: 'WAJIB dilakukan sebelum berangkat:\n\n1. Buka Google Maps\n2. Tap foto profil > Offline Maps\n3. Pilih area Makkah Al-Mukarramah\n4. Pilih area Madinah Al-Munawwarah\n5. Download (masing-masing ~100-200MB)\n\n✅ Peta offline memungkinkan navigasi tanpa internet — sangat berguna saat sinyal lemah di dalam masjid atau area padat',
    },
    {
      judul: '📱 Download Konten Umrava Offline',
      isi: 'Semua konten panduan dan doa Umrava bisa diakses offline setelah didownload:\n\n1. Buka Pengaturan > Download Offline\n2. Tap "Download Semua Konten"\n3. Tunggu proses download selesai (perlu koneksi WiFi)\n\n✅ Setelah terdownload, semua panduan, doa, dan audio bisa diakses tanpa internet\n✅ Fitur ini tersedia untuk pengguna Premium dan Free',
    },
  ],
}

export default function PanduanPraktisPage() {
  const [activeKat, setActiveKat] = useState('transportasi')
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const items = KONTEN[activeKat] ?? []

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D4A28] mb-1">🗺️ Panduan Praktis di Tanah Suci</h1>
        <p className="text-[#6b7280] text-sm">Info transportasi, fasilitas, kesehatan, kuliner, dan tips teknologi</p>
      </div>

      {/* Kategori */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {KATEGORI.map(k => (
          <button
            key={k.id}
            onClick={() => setActiveKat(k.id)}
            className={cn(
              'flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap',
              activeKat === k.id ? 'bg-[#1B6B3A] text-white shadow-sm' : 'bg-white text-[#6b7280] border border-gray-200 hover:border-[#1B6B3A]'
            )}
          >
            {k.icon} {k.label}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="space-y-3">
        {items.map((item, i) => {
          const key = `${activeKat}-${i}`
          const isExp = expandedItem === key
          return (
            <div key={key} className="bg-white rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedItem(isExp ? null : key)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-bold text-[#0D4A28] text-sm">{item.judul}</span>
                {isExp ? <ChevronUp size={18} className="text-gray-400 flex-shrink-0 ml-2" /> : <ChevronDown size={18} className="text-gray-400 flex-shrink-0 ml-2" />}
              </button>
              {isExp && (
                <div className="px-5 pb-5 border-t border-gray-50">
                  <p className="text-sm text-[#374151] leading-relaxed whitespace-pre-line pt-4">{item.isi}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

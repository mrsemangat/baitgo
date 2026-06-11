export interface ChecklistItem {
  id: string
  fase: string
  kategori: string
  label: string
  info?: string
  premium?: boolean
}

export interface ChecklistFase {
  id: string
  label: string
  icon: string
  waktu: string
  items: ChecklistItem[]
}

export const CHECKLIST_FASES: ChecklistFase[] = [
  {
    id: 'h6-bulan',
    label: 'H-6 Bulan',
    icon: '📅',
    waktu: '6 Bulan Sebelum Berangkat',
    items: [
      { id: 'paspor', fase: 'h6-bulan', kategori: 'dokumen', label: 'Paspor valid minimal 6 bulan dari tanggal kembali', info: 'Cek masa berlaku paspor Anda. Jika kurang dari 6 bulan, segera perpanjang di kantor imigrasi terdekat.' },
      { id: 'foto-paspor', fase: 'h6-bulan', kategori: 'dokumen', label: 'Foto paspor background putih (50 lembar, ukuran 4x6)', info: 'Dibutuhkan untuk berbagai keperluan dokumen. Simpan di folder khusus.' },
      { id: 'akta-nikah', fase: 'h6-bulan', kategori: 'dokumen', label: 'Akte nikah / buku nikah (untuk suami istri)', info: 'Dokumen wajib untuk pembuatan visa bersama suami/istri.' },
      { id: 'kk', fase: 'h6-bulan', kategori: 'dokumen', label: 'Kartu Keluarga terbaru', info: 'Pastikan data sudah sesuai dan KK masih berlaku.' },
      { id: 'ktp', fase: 'h6-bulan', kategori: 'dokumen', label: 'KTP yang masih berlaku', info: 'Pastikan KTP belum expired.' },
      { id: 'tabungan', fase: 'h6-bulan', kategori: 'keuangan', label: 'Mulai menabung sesuai estimasi biaya', info: 'Gunakan kalkulator biaya di tab Estimasi untuk mengetahui target tabungan per bulan.' },
    ]
  },
  {
    id: 'h3-bulan',
    label: 'H-3 Bulan',
    icon: '📋',
    waktu: '3 Bulan Sebelum Berangkat',
    items: [
      { id: 'daftar-travel', fase: 'h3-bulan', kategori: 'persiapan', label: 'Daftar ke travel agent atau urus visa mandiri', info: 'Pilih travel agent yang terdaftar di Kemenag. Untuk umroh mandiri, urus visa melalui agen visa resmi atau platform Saudi eVisa.' },
      { id: 'tiket-pesawat', fase: 'h3-bulan', kategori: 'persiapan', label: 'Booking tiket pesawat PP', info: 'Pesan jauh-jauh hari untuk harga lebih terjangkau. Perhatikan batas bagasi dan biaya tambahan.' },
      { id: 'hotel-makkah', fase: 'h3-bulan', kategori: 'persiapan', label: 'Booking hotel Makkah', info: 'Pilih hotel dekat Masjidil Haram (dalam jarak 500m sangat dianjurkan untuk lansia). Cek kebijakan pembatalan.' },
      { id: 'hotel-madinah', fase: 'h3-bulan', kategori: 'persiapan', label: 'Booking hotel Madinah', info: 'Cari hotel di sekitar Masjid Nabawi. Area Baab As-Salam dan Baab Al-Malik Fahd sangat strategis.' },
      { id: 'vaksin', fase: 'h3-bulan', kategori: 'kesehatan', label: 'Vaksin meningitis (wajib, min. 2 minggu sebelum)', info: 'Vaksin meningitis adalah syarat mutlak visa umroh. Dapatkan di klinik vaksin atau rumah sakit. Minta sertifikat ICV (International Certificate of Vaccination).' },
      { id: 'nusuk', fase: 'h3-bulan', kategori: 'digital', label: 'Download aplikasi Nusuk (wajib dari Arab Saudi)', info: 'Aplikasi resmi pemerintah Arab Saudi. Wajib untuk booking Raudhah dan berbagai layanan di Tanah Suci. Daftar dengan paspor Anda.' },
      { id: 'asuransi', fase: 'h3-bulan', kategori: 'keuangan', label: 'Pertimbangkan asuransi perjalanan/jiwa', info: 'Asuransi perjalanan melindungi dari risiko pembatalan, kehilangan bagasi, dan biaya medis darurat.' },
    ]
  },
  {
    id: 'h1-bulan',
    label: 'H-1 Bulan',
    icon: '🧳',
    waktu: '1 Bulan Sebelum Berangkat',
    items: [
      { id: 'baju-ihram', fase: 'h1-bulan', kategori: 'perlengkapan', label: 'Pakaian ihram (2 set untuk pria)', info: 'Pilih kain ihram berkualitas baik. 2 set agar ada cadangan. Untuk wanita: siapkan mukena + pakaian yang sesuai.' },
      { id: 'sandal', fase: 'h1-bulan', kategori: 'perlengkapan', label: 'Sandal yang nyaman untuk berjalan jauh', info: 'Anda akan berjalan sangat jauh setiap hari. Pilih sandal dengan bantalan baik. Hindari sandal baru yang belum dipakai.' },
      { id: 'koper', fase: 'h1-bulan', kategori: 'perlengkapan', label: 'Koper ukuran sesuai maskapai', info: 'Cek batas bagasi maskapai Anda. Biasanya 23-30kg untuk bagasi tercatat dan 7-10kg kabin.' },
      { id: 'tas-dokumen', fase: 'h1-bulan', kategori: 'perlengkapan', label: 'Tas kecil/beltbag untuk dokumen', info: 'Simpan paspor, visa, tiket, dan uang di tas yang bisa dipakai di depan perut saat bepergian.' },
      { id: 'obat-pribadi', fase: 'h1-bulan', kategori: 'kesehatan', label: 'Obat-obatan pribadi + P3K', info: 'Bawa: obat maag, diare, demam, flu, plester, minyak angin, vitamin C dosis tinggi, dan obat rutin jika ada.' },
      { id: 'masker', fase: 'h1-bulan', kategori: 'kesehatan', label: 'Masker (20+ buah untuk cuaca panas)', info: 'Udara di Makkah bisa sangat kering dan panas. Masker membantu melindungi dari debu.' },
      { id: 'botol-minum', fase: 'h1-bulan', kategori: 'perlengkapan', label: 'Botol minum yang bisa direfill (500ml+)', info: 'Untuk refill air Zamzam. Pilih botol dengan tutup rapat dan bahan food grade.' },
      { id: 'power-bank', fase: 'h1-bulan', kategori: 'digital', label: 'Power bank (20.000 mAh atau lebih)', info: 'HP Anda akan bekerja keras sebagai panduan, navigasi, dan komunikasi. Power bank besar sangat dibutuhkan.' },
      { id: 'adaptor', fase: 'h1-bulan', kategori: 'digital', label: 'Adaptor colokan (Arab Saudi pakai Type G)', info: 'Standar colokan Arab Saudi adalah Type G (3 pin kotak). Bawa adaptor universal.' },
    ]
  },
  {
    id: 'h1-minggu',
    label: 'H-1 Minggu',
    icon: '⚡',
    waktu: '1 Minggu Sebelum Berangkat',
    items: [
      { id: 'cek-jadwal-pesawat', fase: 'h1-minggu', kategori: 'digital', label: 'Cek dan konfirmasi jadwal penerbangan', info: 'Hubungi maskapai atau cek aplikasi untuk memastikan tidak ada perubahan jadwal.' },
      { id: 'download-offline', fase: 'h1-minggu', kategori: 'digital', label: 'Download konten Umrava untuk mode offline', info: 'Buka menu Pengaturan > Download Offline. Download semua panduan dan doa agar bisa diakses tanpa internet.' },
      { id: 'maps-offline', fase: 'h1-minggu', kategori: 'digital', label: 'Download peta offline Makkah & Madinah di Google Maps', info: 'Buka Google Maps > profil > Offline Maps > pilih area Makkah dan Madinah.' },
      { id: 'konfirmasi-hotel', fase: 'h1-minggu', kategori: 'persiapan', label: 'Konfirmasi booking hotel', info: 'Hubungi hotel langsung atau melalui platform booking untuk memastikan reservasi terkonfirmasi.' },
      { id: 'beritahu-keluarga', fase: 'h1-minggu', kategori: 'persiapan', label: 'Beritahu keluarga jadwal keberangkatan lengkap', info: 'Berikan jadwal penerbangan, nama hotel, dan kontak darurat kepada keluarga di rumah.' },
      { id: 'sim-lokal', fase: 'h1-minggu', kategori: 'digital', label: 'Siapkan kartu SIM lokal Arab Saudi atau aktifkan roaming', info: 'Rekomendasi: STC atau Mobily untuk sinyal terbaik di Makkah dan Madinah. Beli setelah tiba di Jeddah/Madinah.' },
    ]
  },
  {
    id: 'h1-hari',
    label: 'H-1 Hari',
    icon: '🌙',
    waktu: '1 Hari Sebelum Berangkat',
    items: [
      { id: 'dokumen-tas-tangan', fase: 'h1-hari', kategori: 'dokumen', label: 'Siapkan semua dokumen di tas tangan (kabin)', info: 'Paspor, visa, tiket, bukti hotel, vaksin, asuransi — semua di tas yang selalu bersama Anda.' },
      { id: 'timbang-koper', fase: 'h1-hari', kategori: 'persiapan', label: 'Timbang koper (max sesuai batas maskapai)', info: 'Kelebihan bagasi sangat mahal. Timbang di rumah dan sesuaikan.' },
      { id: 'charge-semua', fase: 'h1-hari', kategori: 'digital', label: 'Charge HP, power bank, dan perangkat digital', info: 'Pastikan semua dalam kondisi penuh sebelum berangkat.' },
      { id: 'mandi-sunnah', fase: 'h1-hari', kategori: 'ibadah', label: 'Mandi sunnah sebelum berangkat', info: 'Disunnahkan mandi sebelum perjalanan ibadah.' },
      { id: 'sholat-safar', fase: 'h1-hari', kategori: 'ibadah', label: 'Sholat sunnah safar 2 rakaat', info: 'Sholat sunnah safar dilakukan sebelum berangkat, memohon keselamatan dan kemudahan perjalanan.' },
      { id: 'pamit-keluarga', fase: 'h1-hari', kategori: 'persiapan', label: 'Pamit kepada keluarga dan minta doa restu', info: 'Mohon maaf dan doa dari orang tua, suami/istri, dan keluarga.' },
    ]
  }
]

export function getAllChecklistItems(): ChecklistItem[] {
  return CHECKLIST_FASES.flatMap(f => f.items)
}

export function getTotalItems(): number {
  return getAllChecklistItems().length
}

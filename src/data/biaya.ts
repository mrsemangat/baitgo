export interface BiayaConfig {
  kotaAsal: string
  bulanPergi: number
  durasi: number
  jumlahOrang: number
  hotelBintang: 3 | 4 | 5
  budgetOleholeh: number
}

export interface BiayaBreakdown {
  tiketPesawat: number
  visa: number
  vaksin: number
  hotelMakkah: number
  hotelMadinah: number
  busTransport: number
  konsumsi: number
  oleholeh: number
  total: number
  perBulanNabung: (bulanTersisa: number) => number
}

export const KOTA_ASAL = [
  { id: 'jakarta', label: 'Jakarta / Tangerang', multiplier: 1.0 },
  { id: 'surabaya', label: 'Surabaya', multiplier: 1.05 },
  { id: 'bandung', label: 'Bandung', multiplier: 1.05 },
  { id: 'medan', label: 'Medan', multiplier: 1.1 },
  { id: 'makassar', label: 'Makassar', multiplier: 1.15 },
  { id: 'semarang', label: 'Semarang', multiplier: 1.05 },
  { id: 'yogyakarta', label: 'Yogyakarta', multiplier: 1.05 },
  { id: 'balikpapan', label: 'Balikpapan', multiplier: 1.2 },
  { id: 'palembang', label: 'Palembang', multiplier: 1.08 },
  { id: 'pekanbaru', label: 'Pekanbaru', multiplier: 1.1 },
  { id: 'manado', label: 'Manado', multiplier: 1.25 },
  { id: 'lainnya', label: 'Kota lainnya', multiplier: 1.1 },
]

// Harga tiket pesawat base PP dari Jakarta (dalam juta IDR)
const HARGA_TIKET_BASE: Record<number, number> = {
  1: 9_500_000,   // Januari
  2: 9_000_000,   // Februari
  3: 9_500_000,   // Maret
  4: 11_000_000,  // April (menjelang/sesudah Ramadan)
  5: 14_000_000,  // Mei (peak season pasca Ramadan)
  6: 10_500_000,  // Juni
  7: 11_000_000,  // Juli (peak summer)
  8: 11_000_000,  // Agustus
  9: 9_500_000,   // September
  10: 9_000_000,  // Oktober
  11: 9_500_000,  // November
  12: 10_500_000, // Desember (peak)
}

// Hotel Makkah per malam berdasarkan bintang (dalam IDR)
const HOTEL_MAKKAH_PER_MALAM: Record<3|4|5, number> = {
  3: 850_000,
  4: 1_500_000,
  5: 2_800_000,
}

// Hotel Madinah per malam berdasarkan bintang (dalam IDR)
const HOTEL_MADINAH_PER_MALAM: Record<3|4|5, number> = {
  3: 700_000,
  4: 1_200_000,
  5: 2_200_000,
}

// Durasi hotel split (malam Makkah : malam Madinah)
const DURASI_SPLIT: Record<number, { makkah: number; madinah: number }> = {
  9:  { makkah: 6, madinah: 3 },
  12: { makkah: 7, madinah: 5 },
  14: { makkah: 9, madinah: 5 },
}

export function hitungBiaya(config: BiayaConfig): BiayaBreakdown {
  const kota = KOTA_ASAL.find(k => k.id === config.kotaAsal) ?? KOTA_ASAL[0]
  const multiplier = kota.multiplier

  const tiketBase = HARGA_TIKET_BASE[config.bulanPergi] ?? 10_000_000
  const tiketPesawat = Math.round(tiketBase * multiplier) * config.jumlahOrang

  const visa = 1_800_000 * config.jumlahOrang
  const vaksin = 400_000 * config.jumlahOrang

  const split = DURASI_SPLIT[config.durasi] ?? { makkah: 7, madinah: 5 }
  const hotelMakkah = HOTEL_MAKKAH_PER_MALAM[config.hotelBintang] * split.makkah * config.jumlahOrang
  const hotelMadinah = HOTEL_MADINAH_PER_MALAM[config.hotelBintang] * split.madinah * config.jumlahOrang

  const busTransport = 500_000 * config.jumlahOrang
  const konsumsi = 200_000 * config.durasi * config.jumlahOrang
  const oleholeh = config.budgetOleholeh * config.jumlahOrang

  const total = tiketPesawat + visa + vaksin + hotelMakkah + hotelMadinah + busTransport + konsumsi + oleholeh

  return {
    tiketPesawat,
    visa,
    vaksin,
    hotelMakkah,
    hotelMadinah,
    busTransport,
    konsumsi,
    oleholeh,
    total,
    perBulanNabung: (bulanTersisa: number) =>
      bulanTersisa > 0 ? Math.ceil(total / bulanTersisa) : total,
  }
}

export const ITINERARY_TEMPLATES = [
  {
    id: '9-hari',
    judul: '9 Hari — Makkah Focus',
    durasi: 9,
    icon: '🕌',
    deskripsi: 'Program singkat untuk yang fokus ibadah di Makkah',
    hari: [
      { hari: 1, pagi: 'Berangkat dari Indonesia', siang: 'Transit / penerbangan', malam: 'Tiba di Jeddah, transfer ke Makkah', catatan: 'Kenakan ihram di pesawat saat melewati miqat' },
      { hari: 2, pagi: 'Umroh pertama (Tawaf + Sa\'i + Tahallul)', siang: 'Istirahat dan recovery', malam: 'Tawaf sunnah', catatan: 'Umroh pertama biasanya dilakukan malam hari untuk menghindari panas' },
      { hari: 3, pagi: 'Sholat Subuh di Masjidil Haram + Tawaf', siang: 'Ziarah Jabal Nur (Gua Hira)', malam: 'Tawaf sunnah + Multazam', catatan: 'Bawa air minum cukup untuk Jabal Nur' },
      { hari: 4, pagi: 'Sholat Subuh + Tawaf pagi', siang: 'Istirahat + Persiapan', malam: 'Ziarah Jabal Tsur', catatan: 'Hari pemulihan, jangan terlalu lelah' },
      { hari: 5, pagi: 'Tawaf + Sholat di Masjidil Haram', siang: 'Belanja oleh-oleh (Pasar Zamzam)', malam: 'Tawaf Wada (perpisahan) awal', catatan: 'Mulai kumpulkan oleh-oleh' },
      { hari: 6, pagi: 'Sholat Subuh + Tawaf', siang: 'Ziarah Masjid Aisha + Umroh sunnah kedua', malam: 'Tawaf sunnah + Doa di Multazam', catatan: 'Umroh sunnah perlu ihram ulang dari miqat' },
      { hari: 7, pagi: 'Sholat Subuh + Tawaf terakhir', siang: 'Berkemas', malam: 'Tawaf Wada', catatan: 'Tawaf Wada adalah tawaf perpisahan, wajib sebelum meninggalkan Makkah' },
      { hari: 8, pagi: 'Transfer ke Jeddah / Bandara', siang: 'Check-in bandara', malam: 'Penerbangan pulang', catatan: 'Jaga waktu, lalu lintas ke bandara bisa padat' },
      { hari: 9, pagi: 'Tiba di Indonesia', siang: '', malam: '', catatan: 'Alhamdulillah, umroh selesai!' },
    ]
  },
  {
    id: '12-hari',
    judul: '12 Hari — Makkah + Madinah Balanced',
    durasi: 12,
    icon: '🕌🕌',
    deskripsi: 'Program ideal dengan waktu seimbang di Makkah dan Madinah',
    hari: [
      { hari: 1, pagi: 'Berangkat dari Indonesia', siang: 'Penerbangan', malam: 'Tiba di Madinah', catatan: 'Jalur Madinah dulu, ihram nanti di Bir Ali' },
      { hari: 2, pagi: 'Sholat Subuh di Masjid Nabawi', siang: 'Ziarah Raudhah (booking via Nusuk)', malam: 'Sholawat di Masjid Nabawi', catatan: 'Booking Raudhah segera setelah tiba' },
      { hari: 3, pagi: 'Sholat Subuh + Ziarah Makam Nabi', siang: 'Ziarah Masjid Quba', malam: 'Masjid Nabawi + Toko Kurma', catatan: 'Sholat di Masjid Quba = pahala umroh' },
      { hari: 4, pagi: 'Ziarah Jabal Uhud + Syuhada', siang: 'Istirahat', malam: 'Masjid Nabawi', catatan: 'Ziarah Uhud dianjurkan pagi hari sebelum panas' },
      { hari: 5, pagi: 'Sholat Subuh + Ziarah Masjid Nabawi', siang: 'Belanja kurma + oleh-oleh Madinah', malam: 'Masjid Nabawi terakhir', catatan: 'Hari terakhir di Madinah' },
      { hari: 6, pagi: 'Transfer ke Makkah via Bir Ali (pakai ihram)', siang: 'Tiba di Makkah + Istirahat', malam: 'Umroh pertama (Tawaf + Sa\'i + Tahallul)', catatan: 'Kenakan ihram di Bir Ali sebelum masuk Makkah' },
      { hari: 7, pagi: 'Sholat Subuh di Masjidil Haram + Tawaf', siang: 'Ziarah Jabal Nur', malam: 'Tawaf sunnah + Doa di Multazam', catatan: '' },
      { hari: 8, pagi: 'Tawaf pagi + Minum Zamzam', siang: 'Istirahat + Kajian', malam: 'Tawaf sunnah + Ziarah Hijr Ismail', catatan: '' },
      { hari: 9, pagi: 'Ziarah Masjid Aisha + Umroh sunnah', siang: 'Belanja Pasar Zamzam', malam: 'Tawaf sunnah', catatan: '' },
      { hari: 10, pagi: 'Sholat Subuh + Tawaf', siang: 'Ziarah Clock Tower + Foto', malam: 'Tawaf sunnah + Doa terakhir', catatan: '' },
      { hari: 11, pagi: 'Tawaf Wada\' + Doa perpisahan', siang: 'Transfer ke Jeddah', malam: 'Check-in bandara + Penerbangan', catatan: 'Tawaf Wada wajib sebelum meninggalkan Makkah' },
      { hari: 12, pagi: 'Tiba di Indonesia', siang: '', malam: '', catatan: 'Alhamdulillah, semoga umroh mabrur!' },
    ]
  },
]

export const NAMA_BULAN = [
  '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]

export interface SpotFoto {
  id: string
  kota: 'makkah' | 'madinah'
  nama: string
  rating: number
  waktuTerbaik: string
  jamTerbaik: string
  lokasi: string
  koordinat?: { lat: number; lng: number }
  deskripsi: string
  tipsAngle: string
  tipsKamera: string
  peringatan?: string
  emoji: string
  tags: string[]
  popularitas: 'sangat populer' | 'populer' | 'tersembunyi'
  waktuFoto: ('pagi' | 'siang' | 'malam')[]
}

export const SPOT_FOTO: SpotFoto[] = [
  // ============ MAKKAH ============
  {
    id: 'kabah-lantai2',
    kota: 'makkah',
    nama: "Ka'bah dari Lantai 2 Masjidil Haram",
    rating: 5,
    waktuTerbaik: 'Setelah Subuh',
    jamTerbaik: '05:30 - 07:00',
    lokasi: "Lantai 2 Masjidil Haram, area tengah menghadap Ka'bah",
    koordinat: { lat: 21.4225, lng: 39.8262 },
    deskripsi: "Spot paling ikonik dan dicari. Dari lantai 2, Anda bisa melihat Ka'bah secara keseluruhan dengan perspektif aerial yang menakjubkan, jamaah yang tawaf, dan payung-payung di halaman.",
    tipsAngle: "Berdiri di koridor tengah, Ka'bah tepat di tengah frame. Gunakan mode wide. Hindari zoom berlebihan agar terlihat grandeur-nya. Ambil dari sudut sedikit diagonal untuk depth.",
    tipsKamera: "Aktifkan HDR, kecerahan +0.5 EV, white balance auto. Gunakan timer 3 detik atau fitur voice control agar tidak goyang. Pagi hari tidak perlu flash.",
    peringatan: "Hormati jamaah yang sedang ibadah. Jangan menghalangi jalur tawaf. Foto secara cepat, jangan berlama-lama menghalangi pandangan orang lain.",
    emoji: '🕋',
    tags: ['Masjidil Haram', 'Makkah', 'Kabah', 'Ikonik'],
    popularitas: 'sangat populer',
    waktuFoto: ['pagi', 'malam']
  },
  {
    id: 'payung-kabah-malam',
    kota: 'makkah',
    nama: "Payung Ka'bah dari dalam Masjid (Malam Hari)",
    rating: 5,
    waktuTerbaik: 'Setelah Isya',
    jamTerbaik: '20:30 - 22:00',
    lokasi: "Halaman Masjidil Haram, area payung yang terbuka",
    deskripsi: "Di malam hari, payung-payung raksasa Masjidil Haram menyala dengan indah dan membingkai Ka'bah dengan cahaya keemasan yang magis. Pemandangan yang membuat banyak orang menangis haru.",
    tipsAngle: "Posisikan di bawah payung dan arahkan kamera ke atas, tangkap payung dan Ka'bah dalam satu frame. Atau ambil dari samping untuk silhouette payung berlatar Ka'bah bermandikan cahaya.",
    tipsKamera: "Mode malam/night mode, ISO auto, exposure 2-4 detik (gunakan tripod mini atau sandarkan HP). Matikan flash untuk menjaga suasana magis.",
    emoji: '🌙',
    tags: ['Masjidil Haram', 'Malam', 'Payung', 'Cahaya'],
    popularitas: 'sangat populer',
    waktuFoto: ['malam']
  },
  {
    id: 'eskalator-masjidil-haram',
    kota: 'makkah',
    nama: 'Eskalator Viral Masjidil Haram',
    rating: 4,
    waktuTerbaik: 'Pagi atau Malam',
    jamTerbaik: '07:00 - 08:00 atau 21:00 - 22:00',
    lokasi: "Berbagai pintu Masjidil Haram yang memiliki eskalator menuju lantai 2",
    deskripsi: "Eskalator panjang di Masjidil Haram menghasilkan foto perspektif yang sangat dramatis. Garis-garis konvergen menciptakan komposisi yang kuat.",
    tipsAngle: "Berdiri di bawah eskalator, arahkan kamera ke atas. Gunakan mode portrait. Ambil saat tidak ada orang agar lebih bersih, atau manfaatkan alur jamaah sebagai elemen foto.",
    tipsKamera: "Wide angle, kecerahan -0.5 EV untuk kontras lebih kuat. HDR off untuk warna lebih dramatis.",
    emoji: '📸',
    tags: ['Masjidil Haram', 'Arsitektur', 'Viral'],
    popularitas: 'populer',
    waktuFoto: ['pagi', 'malam']
  },
  {
    id: 'clock-tower',
    kota: 'makkah',
    nama: 'Abraj Al Bait (Clock Tower) dari Halaman Masjid',
    rating: 4,
    waktuTerbaik: 'Golden Hour Sore',
    jamTerbaik: '17:30 - 18:30',
    lokasi: "Halaman luar Masjidil Haram, sisi menghadap Clock Tower",
    deskripsi: "Menara jam Abraj Al Bait yang megah bisa diabadikan dengan latar halaman masjid. Kombinasi arsitektur modern dan tradisional Islam menciptakan foto yang mengesankan.",
    tipsAngle: "Ambil dari jarak cukup jauh agar seluruh menara masuk frame. Sertakan payung atau kubah masjid di foreground untuk depth. Sudut 45° lebih menarik dari frontal.",
    tipsKamera: "Golden hour: white balance Cloudy untuk warna lebih hangat. HDR on. Exposure +0.3 EV.",
    peringatan: "Hindari mendirikan tripod di area yang mengganggu arus jamaah.",
    emoji: '🏙️',
    tags: ['Clock Tower', 'Makkah', 'Arsitektur', 'Sore'],
    popularitas: 'populer',
    waktuFoto: ['siang', 'malam']
  },
  {
    id: 'gua-hira',
    kota: 'makkah',
    nama: "Gua Hira - Jabal Nur",
    rating: 4,
    waktuTerbaik: 'Pagi Hari',
    jamTerbaik: '06:00 - 08:00',
    lokasi: "Jabal Nur, sekitar 6 km dari Masjidil Haram. Naik 1.200 anak tangga.",
    deskripsi: "Tempat turunnya wahyu pertama Al-Quran kepada Nabi Muhammad ﷺ. Foto dari puncak Jabal Nur menawarkan pemandangan Makkah yang luar biasa dari ketinggian.",
    tipsAngle: "Foto panorama kota Makkah dari puncak adalah yang paling memukau. Untuk foto di mulut gua, minta bantuan jamaah lain. Gunakan mode panorama untuk cityscape.",
    tipsKamera: "Panorama untuk pemandangan kota. Kecerahan +1 EV. Hindari midday karena terlalu terang dan panas ekstrem.",
    peringatan: "Tanjakan sangat curam. Persiapkan fisik dan air minum cukup. Lansia dan yang bermasalah dengan lutut sebaiknya tidak memaksakan diri.",
    emoji: '⛰️',
    tags: ['Jabal Nur', 'Sejarah', 'Panorama', 'Spiritual'],
    popularitas: 'populer',
    waktuFoto: ['pagi']
  },
  {
    id: 'jabal-kudai',
    kota: 'makkah',
    nama: 'Jabal Kudai — Panorama Kota Makkah',
    rating: 4,
    waktuTerbaik: 'Golden Hour Sore / Malam',
    jamTerbaik: '17:00 - 19:00',
    lokasi: "Jabal Kudai, selatan Makkah. Dapat diakses dengan taksi.",
    deskripsi: "Spot panorama terbaik untuk melihat kota Makkah dan Clock Tower dari kejauhan. Banyak fotografer profesional merekomendasikan spot ini untuk foto cityscape Makkah.",
    tipsAngle: "Gunakan mode panorama untuk foto landscape. Cari posisi di mana Clock Tower dan masjid terlihat dalam satu frame.",
    tipsKamera: "Golden hour, mode landscape, tripod sangat membantu di sini untuk foto malam kota.",
    emoji: '🌆',
    tags: ['Panorama', 'Makkah', 'Cityscape', 'Sunset'],
    popularitas: 'tersembunyi',
    waktuFoto: ['siang', 'malam']
  },
  {
    id: 'masjid-aisha',
    kota: 'makkah',
    nama: "Masjid Aisha (Masjid Tan'im) — Miqat",
    rating: 3,
    waktuTerbaik: 'Pagi atau Sore',
    jamTerbaik: '07:00 - 09:00 atau 16:00 - 18:00',
    lokasi: "Tan'im, sekitar 7 km dari Masjidil Haram",
    deskripsi: "Masjid berwarna putih yang indah, terkenal sebagai tempat berihram bagi yang ingin melakukan umroh sunnah. Arsitekturnya yang bersih dan elegan sangat fotogenik.",
    tipsAngle: "Foto fasad depan masjid dari sudut diagonal. Kolom-kolom masjid menciptakan pola berulang yang indah.",
    tipsKamera: "Hindari midday karena atap putih akan overexpose. Sore hari cahaya lebih lembut.",
    emoji: '🕌',
    tags: ['Masjid', 'Arsitektur', 'Miqat', 'Aisha'],
    popularitas: 'populer',
    waktuFoto: ['pagi', 'siang']
  },
  {
    id: 'pasar-zamzam',
    kota: 'makkah',
    nama: 'Pasar Zamzam Tower',
    rating: 3,
    waktuTerbaik: 'Malam',
    jamTerbaik: '20:00 - 23:00',
    lokasi: "Zamzam Tower / Abraj Al Bait Complex, bersebelahan dengan Masjidil Haram",
    deskripsi: "Pasar oleh-oleh berlantai banyak yang ramai dan berwarna-warni. Di malam hari, suasananya sangat hidup dengan pedagang dan jamaah dari seluruh dunia.",
    tipsAngle: "Foto street photography jamaah berbagai bangsa. Warna-warni produk di kios menciptakan foto yang vivid.",
    tipsKamera: "Mode malam, ISO 800-1600, hindari flash agar suasana pasar lebih alami.",
    emoji: '🛍️',
    tags: ['Pasar', 'Oleh-oleh', 'Malam', 'Kuliner'],
    popularitas: 'populer',
    waktuFoto: ['malam']
  },

  // ============ MADINAH ============
  {
    id: 'kubah-hijau-nabawi',
    kota: 'madinah',
    nama: 'Kubah Hijau Masjid Nabawi — Golden Hour',
    rating: 5,
    waktuTerbaik: 'Golden Hour Pagi',
    jamTerbaik: '06:00 - 07:30',
    lokasi: "Halaman luar Masjid Nabawi, sisi timur menghadap kubah hijau",
    deskripsi: "Kubah hijau yang menaungi makam Rasulullah ﷺ adalah salah satu ikon Islam paling dikenal. Saat golden hour, cahaya keemasan menyinarinya dan menciptakan foto yang tidak terlupakan.",
    tipsAngle: "Posisi terbaik adalah dari sisi timur-tenggara masjid. Kubah hijau di tengah, dengan menara-menara di kanan kiri. Gunakan mode portrait untuk isolasi kubah atau wide untuk konteks.",
    tipsKamera: "Golden hour: white balance Cloudy (3200-4000K). HDR on. Kecerahan +0.3 EV. Gunakan gridlines untuk komposisi.",
    emoji: '💚',
    tags: ['Masjid Nabawi', 'Madinah', 'Kubah Hijau', 'Ikonik'],
    popularitas: 'sangat populer',
    waktuFoto: ['pagi']
  },
  {
    id: 'payung-nabawi-malam',
    kota: 'madinah',
    nama: 'Payung Raksasa Masjid Nabawi (Malam)',
    rating: 5,
    waktuTerbaik: 'Setelah Maghrib',
    jamTerbaik: '19:00 - 21:00',
    lokasi: "Halaman Masjid Nabawi, area payung yang menyala malam hari",
    deskripsi: "Payung-payung raksasa Masjid Nabawi yang menyala di malam hari menciptakan panorama yang magis. Banyak yang menyebutnya sebagai salah satu pemandangan paling indah di dunia.",
    tipsAngle: "Ambil dari bawah payung menghadap ke atas — perspektif ini sangat dramatis. Atau ambil dari kejauhan untuk melihat seluruh lautan payung menyala.",
    tipsKamera: "Night mode, exposure panjang 3-5 detik, ISO 400-800. Sandarkan HP atau gunakan tripod mini. Matikan flash.",
    emoji: '☂️',
    tags: ['Masjid Nabawi', 'Malam', 'Payung', 'Cahaya'],
    popularitas: 'sangat populer',
    waktuFoto: ['malam']
  },
  {
    id: 'pintu-nabawi',
    kota: 'madinah',
    nama: 'Pintu Gerbang Utama Masjid Nabawi',
    rating: 4,
    waktuTerbaik: 'Pagi atau Malam',
    jamTerbaik: '06:00 - 07:30 atau 20:00 - 21:30',
    lokasi: "Pintu Baab As-Salam atau Baab Al-Baqie, sisi selatan Masjid Nabawi",
    deskripsi: "Gerbang utama Masjid Nabawi dengan arsitektur Islamic yang megah. Arus jamaah yang masuk dan keluar menambah dinamika foto.",
    tipsAngle: "Foto frontal gerbang dengan garis simetris yang kuat. Atau ambil saat arus jamaah sedang banyak untuk human interest.",
    tipsKamera: "Pagi: cahaya natural yang indah. Malam: lampu masjid menciptakan dramatic lighting.",
    emoji: '🚪',
    tags: ['Masjid Nabawi', 'Arsitektur', 'Gerbang'],
    popularitas: 'populer',
    waktuFoto: ['pagi', 'malam']
  },
  {
    id: 'koridor-pilar-nabawi',
    kota: 'madinah',
    nama: 'Koridor Pilar Putih Masjid Nabawi',
    rating: 4,
    waktuTerbaik: 'Subuh atau Pagi',
    jamTerbaik: '05:00 - 07:00',
    lokasi: "Di dalam Masjid Nabawi, koridor pilar-pilar putih yang panjang",
    deskripsi: "Deretan pilar putih yang panjang di dalam Masjid Nabawi menciptakan perspektif leading lines yang sangat kuat. Di waktu sepi, foto di sini sangat sinematik.",
    tipsAngle: "Berdiri di tengah koridor, arahkan kamera lurus ke depan. Pilar-pilar akan konvergen ke satu titik di ujung. Bisa juga ambil sudut diagonal.",
    tipsKamera: "Gunakan wide angle. Pagi hari lebih sepi sehingga tidak ada gangguan. Cahaya natural dari jendela menciptakan efek dramatis.",
    peringatan: "Dilarang foto di area sholat saat sedang ramai. Hormati jamaah yang beribadah.",
    emoji: '🏛️',
    tags: ['Masjid Nabawi', 'Arsitektur', 'Interior'],
    popularitas: 'tersembunyi',
    waktuFoto: ['pagi']
  },
  {
    id: 'masjid-quba',
    kota: 'madinah',
    nama: 'Masjid Quba — Fasad Depan',
    rating: 4,
    waktuTerbaik: 'Pagi',
    jamTerbaik: '07:30 - 09:30',
    lokasi: "Masjid Quba, sekitar 5 km dari Masjid Nabawi",
    deskripsi: "Masjid pertama dalam sejarah Islam dengan arsitektur putih bersih yang elegan. Halaman depannya luas dan memungkinkan foto dengan perspektif yang baik.",
    tipsAngle: "Foto frontal dari kejauhan untuk capture seluruh fasad. Atau ambil diagonal untuk depth. Pohon kurma di sekitarnya menambah keindahan.",
    tipsKamera: "Pagi hari cahaya dari belakang fotografer (dari timur) menyinari fasad masjid dengan sempurna. HDR on.",
    emoji: '🕌',
    tags: ['Masjid Quba', 'Sejarah', 'Arsitektur'],
    popularitas: 'populer',
    waktuFoto: ['pagi']
  },
  {
    id: 'jabal-uhud',
    kota: 'madinah',
    nama: 'Jabal Uhud — Panorama & Monumen',
    rating: 4,
    waktuTerbaik: 'Pagi',
    jamTerbaik: '07:00 - 09:00',
    lokasi: "Jabal Uhud, sekitar 5 km utara Madinah",
    deskripsi: "Bukit Uhud yang berwarna kecoklatan dengan makam para syuhada. Tempat ini sarat dengan sejarah dan emosi spiritual. Foto panorama bukit dan kota Madinah sangat berkesan.",
    tipsAngle: "Foto panorama bukit dari area parkir. Sertakan langit dan awan sebagai elemen. Untuk foto di area makam syuhada, lakukan dengan penuh penghormatan.",
    tipsKamera: "Pagi hari sebelum matahari terlalu tinggi. Gunakan polarizing filter (jika ada) untuk langit lebih biru.",
    peringatan: "Area makam syuhada adalah tempat suci. Foto dengan penuh hormat, jangan bergaya-gaya atau tertawa di area makam.",
    emoji: '⛰️',
    tags: ['Jabal Uhud', 'Sejarah', 'Syuhada', 'Panorama'],
    popularitas: 'populer',
    waktuFoto: ['pagi']
  },
  {
    id: 'kebun-kurma',
    kota: 'madinah',
    nama: 'Kebun Kurma Saat Musim Panen',
    rating: 3,
    waktuTerbaik: 'Pagi atau Sore',
    jamTerbaik: '07:00 - 09:00 atau 15:00 - 17:00',
    lokasi: "Area perkebunan kurma sekitar Madinah, beberapa dapat dikunjungi wisatawan",
    deskripsi: "Deretan pohon kurma yang tinggi dengan buah-buah segar menciptakan foto yang khas Arabian. Lebih baik dikunjungi saat musim panen (Juni-September).",
    tipsAngle: "Foto dari bawah ke atas untuk kesan tinggi pohon kurma. Atau ambil foto tangan memegang kurma dengan pohon sebagai background.",
    tipsKamera: "Sore hari cahaya lebih hangat dan softer. Bokeh mode untuk foto close-up kurma.",
    emoji: '🌴',
    tags: ['Kebun Kurma', 'Alam', 'Madinah'],
    popularitas: 'tersembunyi',
    waktuFoto: ['pagi', 'siang']
  },
]

export function getSpotByKota(kota: 'makkah' | 'madinah' | 'semua'): SpotFoto[] {
  if (kota === 'semua') return SPOT_FOTO
  return SPOT_FOTO.filter(s => s.kota === kota)
}

export function getSpotByWaktu(waktu: 'pagi' | 'siang' | 'malam'): SpotFoto[] {
  return SPOT_FOTO.filter(s => s.waktuFoto.includes(waktu))
}

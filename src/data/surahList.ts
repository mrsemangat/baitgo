export interface SurahMeta {
  number: number
  arabicName: string
  latinName: string
  translation: string
  ayahCount: number
  revelationType: 'Makkah' | 'Madinah'
  juz: number
  popular?: boolean
}

export const SURAH_LIST: SurahMeta[] = [
  { number: 1, arabicName: 'الفاتحة', latinName: 'Al-Fatihah', translation: 'Pembukaan', ayahCount: 7, revelationType: 'Makkah', juz: 1, popular: true },
  { number: 2, arabicName: 'البقرة', latinName: 'Al-Baqarah', translation: 'Sapi Betina', ayahCount: 286, revelationType: 'Madinah', juz: 1 },
  { number: 3, arabicName: 'آل عمران', latinName: 'Ali Imran', translation: 'Keluarga Imran', ayahCount: 200, revelationType: 'Madinah', juz: 3 },
  { number: 4, arabicName: 'النساء', latinName: 'An-Nisa', translation: 'Wanita', ayahCount: 176, revelationType: 'Madinah', juz: 4 },
  { number: 5, arabicName: 'المائدة', latinName: 'Al-Maidah', translation: 'Hidangan', ayahCount: 120, revelationType: 'Madinah', juz: 6 },
  { number: 6, arabicName: 'الأنعام', latinName: 'Al-Anam', translation: 'Binatang Ternak', ayahCount: 165, revelationType: 'Makkah', juz: 7 },
  { number: 7, arabicName: 'الأعراف', latinName: "Al-A'raf", translation: 'Tempat Tertinggi', ayahCount: 206, revelationType: 'Makkah', juz: 8 },
  { number: 8, arabicName: 'الأنفال', latinName: 'Al-Anfal', translation: 'Rampasan Perang', ayahCount: 75, revelationType: 'Madinah', juz: 9 },
  { number: 9, arabicName: 'التوبة', latinName: 'At-Taubah', translation: 'Pengampunan', ayahCount: 129, revelationType: 'Madinah', juz: 10 },
  { number: 10, arabicName: 'يونس', latinName: 'Yunus', translation: 'Nabi Yunus', ayahCount: 109, revelationType: 'Makkah', juz: 11 },
  { number: 11, arabicName: 'هود', latinName: 'Hud', translation: 'Nabi Hud', ayahCount: 123, revelationType: 'Makkah', juz: 11 },
  { number: 12, arabicName: 'يوسف', latinName: 'Yusuf', translation: 'Nabi Yusuf', ayahCount: 111, revelationType: 'Makkah', juz: 12 },
  { number: 13, arabicName: 'الرعد', latinName: "Ar-Ra'd", translation: 'Guruh', ayahCount: 43, revelationType: 'Madinah', juz: 13 },
  { number: 14, arabicName: 'إبراهيم', latinName: 'Ibrahim', translation: 'Nabi Ibrahim', ayahCount: 52, revelationType: 'Makkah', juz: 13 },
  { number: 15, arabicName: 'الحجر', latinName: 'Al-Hijr', translation: 'Bukit Hijr', ayahCount: 99, revelationType: 'Makkah', juz: 14 },
  { number: 16, arabicName: 'النحل', latinName: 'An-Nahl', translation: 'Lebah', ayahCount: 128, revelationType: 'Makkah', juz: 14 },
  { number: 17, arabicName: 'الإسراء', latinName: "Al-Isra'", translation: 'Perjalanan Malam', ayahCount: 111, revelationType: 'Makkah', juz: 15 },
  { number: 18, arabicName: 'الكهف', latinName: 'Al-Kahf', translation: 'Gua', ayahCount: 110, revelationType: 'Makkah', juz: 15, popular: true },
  { number: 19, arabicName: 'مريم', latinName: 'Maryam', translation: 'Maryam', ayahCount: 98, revelationType: 'Makkah', juz: 16 },
  { number: 20, arabicName: 'طه', latinName: 'Taha', translation: 'Taha', ayahCount: 135, revelationType: 'Makkah', juz: 16 },
  { number: 21, arabicName: 'الأنبياء', latinName: "Al-Anbiya'", translation: 'Nabi-Nabi', ayahCount: 112, revelationType: 'Makkah', juz: 17 },
  { number: 22, arabicName: 'الحج', latinName: 'Al-Hajj', translation: 'Haji', ayahCount: 78, revelationType: 'Madinah', juz: 17, popular: true },
  { number: 23, arabicName: 'المؤمنون', latinName: "Al-Mu'minun", translation: 'Orang-Orang Beriman', ayahCount: 118, revelationType: 'Makkah', juz: 18 },
  { number: 24, arabicName: 'النور', latinName: 'An-Nur', translation: 'Cahaya', ayahCount: 64, revelationType: 'Madinah', juz: 18 },
  { number: 25, arabicName: 'الفرقان', latinName: 'Al-Furqan', translation: 'Pembeda', ayahCount: 77, revelationType: 'Makkah', juz: 18 },
  { number: 26, arabicName: 'الشعراء', latinName: "Asy-Syu'ara", translation: 'Para Penyair', ayahCount: 227, revelationType: 'Makkah', juz: 19 },
  { number: 27, arabicName: 'النمل', latinName: 'An-Naml', translation: 'Semut', ayahCount: 93, revelationType: 'Makkah', juz: 19 },
  { number: 28, arabicName: 'القصص', latinName: 'Al-Qasas', translation: 'Cerita-Cerita', ayahCount: 88, revelationType: 'Makkah', juz: 20 },
  { number: 29, arabicName: 'العنكبوت', latinName: 'Al-Ankabut', translation: 'Laba-Laba', ayahCount: 69, revelationType: 'Makkah', juz: 20 },
  { number: 30, arabicName: 'الروم', latinName: 'Ar-Rum', translation: 'Bangsa Romawi', ayahCount: 60, revelationType: 'Makkah', juz: 21 },
  { number: 31, arabicName: 'لقمان', latinName: 'Luqman', translation: 'Luqman', ayahCount: 34, revelationType: 'Makkah', juz: 21 },
  { number: 32, arabicName: 'السجدة', latinName: 'As-Sajdah', translation: 'Sujud', ayahCount: 30, revelationType: 'Makkah', juz: 21 },
  { number: 33, arabicName: 'الأحزاب', latinName: 'Al-Ahzab', translation: 'Golongan-Golongan', ayahCount: 73, revelationType: 'Madinah', juz: 21 },
  { number: 34, arabicName: 'سبأ', latinName: "Saba'", translation: 'Kaum Saba', ayahCount: 54, revelationType: 'Makkah', juz: 22 },
  { number: 35, arabicName: 'فاطر', latinName: 'Fatir', translation: 'Pencipta', ayahCount: 45, revelationType: 'Makkah', juz: 22 },
  { number: 36, arabicName: 'يس', latinName: 'Yasin', translation: 'Yasin', ayahCount: 83, revelationType: 'Makkah', juz: 22, popular: true },
  { number: 37, arabicName: 'الصافات', latinName: 'As-Saffat', translation: 'Barisan-Barisan', ayahCount: 182, revelationType: 'Makkah', juz: 23 },
  { number: 38, arabicName: 'ص', latinName: 'Sad', translation: 'Sad', ayahCount: 88, revelationType: 'Makkah', juz: 23 },
  { number: 39, arabicName: 'الزمر', latinName: 'Az-Zumar', translation: 'Rombongan-Rombongan', ayahCount: 75, revelationType: 'Makkah', juz: 23 },
  { number: 40, arabicName: 'غافر', latinName: 'Ghafir', translation: 'Yang Maha Pengampun', ayahCount: 85, revelationType: 'Makkah', juz: 24 },
  { number: 41, arabicName: 'فصلت', latinName: 'Fussilat', translation: 'Dijelaskan', ayahCount: 54, revelationType: 'Makkah', juz: 24 },
  { number: 42, arabicName: 'الشورى', latinName: 'Asy-Syura', translation: 'Musyawarah', ayahCount: 53, revelationType: 'Makkah', juz: 25 },
  { number: 43, arabicName: 'الزخرف', latinName: 'Az-Zukhruf', translation: 'Perhiasan', ayahCount: 89, revelationType: 'Makkah', juz: 25 },
  { number: 44, arabicName: 'الدخان', latinName: 'Ad-Dukhan', translation: 'Kabut', ayahCount: 59, revelationType: 'Makkah', juz: 25 },
  { number: 45, arabicName: 'الجاثية', latinName: 'Al-Jasiyah', translation: 'Berlutut', ayahCount: 37, revelationType: 'Makkah', juz: 25 },
  { number: 46, arabicName: 'الأحقاف', latinName: 'Al-Ahqaf', translation: 'Bukit-Bukit Pasir', ayahCount: 35, revelationType: 'Makkah', juz: 26 },
  { number: 47, arabicName: 'محمد', latinName: 'Muhammad', translation: 'Nabi Muhammad', ayahCount: 38, revelationType: 'Madinah', juz: 26 },
  { number: 48, arabicName: 'الفتح', latinName: 'Al-Fath', translation: 'Kemenangan', ayahCount: 29, revelationType: 'Madinah', juz: 26 },
  { number: 49, arabicName: 'الحجرات', latinName: 'Al-Hujurat', translation: 'Kamar-Kamar', ayahCount: 18, revelationType: 'Madinah', juz: 26 },
  { number: 50, arabicName: 'ق', latinName: 'Qaf', translation: 'Qaf', ayahCount: 45, revelationType: 'Makkah', juz: 26 },
  { number: 51, arabicName: 'الذاريات', latinName: 'Az-Zariyat', translation: 'Angin yang Menerbangkan', ayahCount: 60, revelationType: 'Makkah', juz: 26 },
  { number: 52, arabicName: 'الطور', latinName: 'At-Tur', translation: 'Gunung Tur', ayahCount: 49, revelationType: 'Makkah', juz: 27 },
  { number: 53, arabicName: 'النجم', latinName: 'An-Najm', translation: 'Bintang', ayahCount: 62, revelationType: 'Makkah', juz: 27 },
  { number: 54, arabicName: 'القمر', latinName: 'Al-Qamar', translation: 'Bulan', ayahCount: 55, revelationType: 'Makkah', juz: 27 },
  { number: 55, arabicName: 'الرحمن', latinName: 'Ar-Rahman', translation: 'Yang Maha Pemurah', ayahCount: 78, revelationType: 'Madinah', juz: 27, popular: true },
  { number: 56, arabicName: 'الواقعة', latinName: 'Al-Waqiah', translation: 'Hari Kiamat', ayahCount: 96, revelationType: 'Makkah', juz: 27, popular: true },
  { number: 57, arabicName: 'الحديد', latinName: 'Al-Hadid', translation: 'Besi', ayahCount: 29, revelationType: 'Madinah', juz: 27 },
  { number: 58, arabicName: 'المجادلة', latinName: 'Al-Mujadilah', translation: 'Gugatan', ayahCount: 22, revelationType: 'Madinah', juz: 28 },
  { number: 59, arabicName: 'الحشر', latinName: 'Al-Hasyr', translation: 'Pengusiran', ayahCount: 24, revelationType: 'Madinah', juz: 28 },
  { number: 60, arabicName: 'الممتحنة', latinName: 'Al-Mumtahanah', translation: 'Wanita yang Diuji', ayahCount: 13, revelationType: 'Madinah', juz: 28 },
  { number: 61, arabicName: 'الصف', latinName: 'As-Saff', translation: 'Barisan', ayahCount: 14, revelationType: 'Madinah', juz: 28 },
  { number: 62, arabicName: 'الجمعة', latinName: "Al-Jumu'ah", translation: 'Hari Jumat', ayahCount: 11, revelationType: 'Madinah', juz: 28 },
  { number: 63, arabicName: 'المنافقون', latinName: 'Al-Munafiqun', translation: 'Orang-Orang Munafik', ayahCount: 11, revelationType: 'Madinah', juz: 28 },
  { number: 64, arabicName: 'التغابن', latinName: 'At-Tagabun', translation: 'Hari Ditampakkan Kesalahan', ayahCount: 18, revelationType: 'Madinah', juz: 28 },
  { number: 65, arabicName: 'الطلاق', latinName: 'At-Talaq', translation: 'Talak', ayahCount: 12, revelationType: 'Madinah', juz: 28 },
  { number: 66, arabicName: 'التحريم', latinName: 'At-Tahrim', translation: 'Mengharamkan', ayahCount: 12, revelationType: 'Madinah', juz: 28 },
  { number: 67, arabicName: 'الملك', latinName: 'Al-Mulk', translation: 'Kerajaan', ayahCount: 30, revelationType: 'Makkah', juz: 29, popular: true },
  { number: 68, arabicName: 'القلم', latinName: 'Al-Qalam', translation: 'Pena', ayahCount: 52, revelationType: 'Makkah', juz: 29 },
  { number: 69, arabicName: 'الحاقة', latinName: "Al-Haqqah", translation: 'Hari Kiamat', ayahCount: 52, revelationType: 'Makkah', juz: 29 },
  { number: 70, arabicName: 'المعارج', latinName: "Al-Ma'arij", translation: 'Tempat Naik', ayahCount: 44, revelationType: 'Makkah', juz: 29 },
  { number: 71, arabicName: 'نوح', latinName: 'Nuh', translation: 'Nabi Nuh', ayahCount: 28, revelationType: 'Makkah', juz: 29 },
  { number: 72, arabicName: 'الجن', latinName: 'Al-Jinn', translation: 'Jin', ayahCount: 28, revelationType: 'Makkah', juz: 29 },
  { number: 73, arabicName: 'المزمل', latinName: 'Al-Muzzammil', translation: 'Orang yang Berselimut', ayahCount: 20, revelationType: 'Makkah', juz: 29 },
  { number: 74, arabicName: 'المدثر', latinName: 'Al-Muddassir', translation: 'Orang yang Berkemul', ayahCount: 56, revelationType: 'Makkah', juz: 29 },
  { number: 75, arabicName: 'القيامة', latinName: 'Al-Qiyamah', translation: 'Hari Kiamat', ayahCount: 40, revelationType: 'Makkah', juz: 29 },
  { number: 76, arabicName: 'الإنسان', latinName: 'Al-Insan', translation: 'Manusia', ayahCount: 31, revelationType: 'Madinah', juz: 29 },
  { number: 77, arabicName: 'المرسلات', latinName: 'Al-Mursalat', translation: 'Malaikat yang Diutus', ayahCount: 50, revelationType: 'Makkah', juz: 29 },
  { number: 78, arabicName: 'النبأ', latinName: "An-Naba'", translation: 'Berita Besar', ayahCount: 40, revelationType: 'Makkah', juz: 30 },
  { number: 79, arabicName: 'النازعات', latinName: "An-Nazi'at", translation: 'Malaikat yang Mencabut', ayahCount: 46, revelationType: 'Makkah', juz: 30 },
  { number: 80, arabicName: 'عبس', latinName: 'Abasa', translation: 'Dia Bermuka Masam', ayahCount: 42, revelationType: 'Makkah', juz: 30 },
  { number: 81, arabicName: 'التكوير', latinName: 'At-Takwir', translation: 'Penggulungan', ayahCount: 29, revelationType: 'Makkah', juz: 30 },
  { number: 82, arabicName: 'الانفطار', latinName: 'Al-Infitar', translation: 'Terbelah', ayahCount: 19, revelationType: 'Makkah', juz: 30 },
  { number: 83, arabicName: 'المطففين', latinName: 'Al-Mutaffifin', translation: 'Orang-Orang yang Curang', ayahCount: 36, revelationType: 'Makkah', juz: 30 },
  { number: 84, arabicName: 'الانشقاق', latinName: 'Al-Insyiqaq', translation: 'Terbelah', ayahCount: 25, revelationType: 'Makkah', juz: 30 },
  { number: 85, arabicName: 'البروج', latinName: 'Al-Buruj', translation: 'Gugusan Bintang', ayahCount: 22, revelationType: 'Makkah', juz: 30 },
  { number: 86, arabicName: 'الطارق', latinName: 'At-Tariq', translation: 'Yang Datang di Malam Hari', ayahCount: 17, revelationType: 'Makkah', juz: 30 },
  { number: 87, arabicName: "الأعلى", latinName: "Al-A'la", translation: 'Yang Paling Tinggi', ayahCount: 19, revelationType: 'Makkah', juz: 30 },
  { number: 88, arabicName: 'الغاشية', latinName: 'Al-Gasiyah', translation: 'Hari Pembalasan', ayahCount: 26, revelationType: 'Makkah', juz: 30 },
  { number: 89, arabicName: 'الفجر', latinName: 'Al-Fajr', translation: 'Fajar', ayahCount: 30, revelationType: 'Makkah', juz: 30 },
  { number: 90, arabicName: 'البلد', latinName: 'Al-Balad', translation: 'Negeri', ayahCount: 20, revelationType: 'Makkah', juz: 30 },
  { number: 91, arabicName: 'الشمس', latinName: 'Asy-Syams', translation: 'Matahari', ayahCount: 15, revelationType: 'Makkah', juz: 30 },
  { number: 92, arabicName: 'الليل', latinName: 'Al-Lail', translation: 'Malam', ayahCount: 21, revelationType: 'Makkah', juz: 30 },
  { number: 93, arabicName: 'الضحى', latinName: 'Ad-Duha', translation: 'Waktu Dhuha', ayahCount: 11, revelationType: 'Makkah', juz: 30 },
  { number: 94, arabicName: 'الشرح', latinName: 'Al-Insyirah', translation: 'Melapangkan', ayahCount: 8, revelationType: 'Makkah', juz: 30 },
  { number: 95, arabicName: 'التين', latinName: 'At-Tin', translation: 'Buah Tin', ayahCount: 8, revelationType: 'Makkah', juz: 30 },
  { number: 96, arabicName: 'العلق', latinName: 'Al-Alaq', translation: 'Segumpal Darah', ayahCount: 19, revelationType: 'Makkah', juz: 30 },
  { number: 97, arabicName: 'القدر', latinName: 'Al-Qadr', translation: 'Kemuliaan', ayahCount: 5, revelationType: 'Makkah', juz: 30 },
  { number: 98, arabicName: 'البينة', latinName: 'Al-Bayyinah', translation: 'Bukti Nyata', ayahCount: 8, revelationType: 'Madinah', juz: 30 },
  { number: 99, arabicName: 'الزلزلة', latinName: 'Az-Zalzalah', translation: 'Kegoncangan', ayahCount: 8, revelationType: 'Madinah', juz: 30 },
  { number: 100, arabicName: 'العاديات', latinName: 'Al-Adiyat', translation: 'Kuda Perang', ayahCount: 11, revelationType: 'Makkah', juz: 30 },
  { number: 101, arabicName: 'القارعة', latinName: "Al-Qari'ah", translation: 'Hari Kiamat', ayahCount: 11, revelationType: 'Makkah', juz: 30 },
  { number: 102, arabicName: 'التكاثر', latinName: 'At-Takasur', translation: 'Bermegah-Megahan', ayahCount: 8, revelationType: 'Makkah', juz: 30 },
  { number: 103, arabicName: 'العصر', latinName: 'Al-Asr', translation: 'Masa', ayahCount: 3, revelationType: 'Makkah', juz: 30 },
  { number: 104, arabicName: 'الهمزة', latinName: 'Al-Humazah', translation: 'Pengumpat', ayahCount: 9, revelationType: 'Makkah', juz: 30 },
  { number: 105, arabicName: 'الفيل', latinName: 'Al-Fil', translation: 'Gajah', ayahCount: 5, revelationType: 'Makkah', juz: 30 },
  { number: 106, arabicName: 'قريش', latinName: 'Quraisy', translation: 'Suku Quraisy', ayahCount: 4, revelationType: 'Makkah', juz: 30 },
  { number: 107, arabicName: 'الماعون', latinName: "Al-Ma'un", translation: 'Barang Berguna', ayahCount: 7, revelationType: 'Makkah', juz: 30 },
  { number: 108, arabicName: 'الكوثر', latinName: 'Al-Kausar', translation: 'Nikmat yang Berlimpah', ayahCount: 3, revelationType: 'Makkah', juz: 30 },
  { number: 109, arabicName: 'الكافرون', latinName: 'Al-Kafirun', translation: 'Orang-Orang Kafir', ayahCount: 6, revelationType: 'Makkah', juz: 30 },
  { number: 110, arabicName: 'النصر', latinName: 'An-Nasr', translation: 'Pertolongan', ayahCount: 3, revelationType: 'Madinah', juz: 30 },
  { number: 111, arabicName: 'المسد', latinName: 'Al-Lahab', translation: 'Gejolak Api', ayahCount: 5, revelationType: 'Makkah', juz: 30 },
  { number: 112, arabicName: 'الإخلاص', latinName: 'Al-Ikhlas', translation: 'Kemurnian Iman', ayahCount: 4, revelationType: 'Makkah', juz: 30, popular: true },
  { number: 113, arabicName: 'الفلق', latinName: 'Al-Falaq', translation: 'Waktu Subuh', ayahCount: 5, revelationType: 'Makkah', juz: 30, popular: true },
  { number: 114, arabicName: 'الناس', latinName: 'An-Nas', translation: 'Manusia', ayahCount: 6, revelationType: 'Makkah', juz: 30, popular: true },
]

export function getSurahByNumber(number: number): SurahMeta | undefined {
  return SURAH_LIST.find(s => s.number === number)
}

export function searchSurah(query: string): SurahMeta[] {
  const q = query.toLowerCase().trim()
  if (!q) return SURAH_LIST
  return SURAH_LIST.filter(
    s =>
      s.latinName.toLowerCase().includes(q) ||
      s.translation.toLowerCase().includes(q) ||
      s.arabicName.includes(query) ||
      String(s.number).includes(q)
  )
}

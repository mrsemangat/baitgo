export interface TahapIbadah {
  id: string
  nomor: number
  judul: string
  subtitle: string
  icon: string
  deskripsi: string
  konten: PanduanKonten[]
  counterType?: 'tawaf' | 'sai' | null
  counterMax?: number
}

export interface PanduanKonten {
  tipe: 'text' | 'list' | 'tip' | 'warning' | 'doa' | 'counter'
  judul?: string
  isi?: string
  items?: string[]
  doaId?: string
}

export const TAHAP_IBADAH: TahapIbadah[] = [
  {
    id: 'miqat',
    nomor: 1,
    judul: 'Miqat & Niat Ihram',
    subtitle: 'Bersiap memasuki kondisi suci',
    icon: '🕌',
    deskripsi: 'Miqat adalah batas tempat di mana jamaah umroh wajib memulai ihram. Melewati miqat tanpa ihram adalah pelanggaran yang mengharuskan membayar dam.',
    konten: [
      {
        tipe: 'text',
        judul: 'Apa itu Miqat?',
        isi: 'Miqat adalah batas tempat (miqat makani) yang ditetapkan syariat sebagai titik di mana seorang jamaah wajib mengenakan ihram sebelum memasuki kawasan tanah suci. Melewati miqat dalam keadaan tidak berihram hukumnya haram dan wajib membayar fidyah.'
      },
      {
        tipe: 'list',
        judul: 'Lokasi Miqat Berdasarkan Asal',
        items: [
          'Bir Ali (Dzul Hulaifah) — untuk yang berangkat dari/melewati Madinah',
          'Yalamlam — untuk yang datang dari arah Yaman dan negara Asia Tenggara via udara',
          'Qarnul Manazil — untuk yang datang dari arah Najd/Riyadh',
          'Juhfah — untuk yang datang dari arah Syam (Syiria, Mesir)',
          'Dzatu Irqin — untuk yang datang dari arah Iraq',
        ]
      },
      {
        tipe: 'text',
        judul: 'Tata Cara Mandi Sunnah Sebelum Ihram',
        isi: 'Disunnahkan mandi sebelum berihram seperti mandi junub, dengan niat bersuci untuk ihram. Dilakukan di hotel sebelum berangkat ke miqat.'
      },
      {
        tipe: 'list',
        judul: 'Cara Memakai Pakaian Ihram (Pria)',
        items: [
          'Mandi terlebih dahulu di hotel',
          'Gunakan dua lembar kain ihram putih yang bersih',
          'Kain pertama (izar) dipakai melilit pinggang ke bawah',
          'Kain kedua (rida) disampirkan di bahu kiri, dibiarkan terbuka di bahu kanan (idhtiba untuk tawaf)',
          'Untuk wanita: pakaian biasa yang menutup aurat, wajah dan telapak tangan terbuka'
        ]
      },
      {
        tipe: 'doa',
        judul: 'Niat Ihram Umroh',
        doaId: 'labbaikallah'
      },
      {
        tipe: 'list',
        judul: 'Larangan Selama Ihram',
        items: [
          '🚫 Memotong kuku atau rambut',
          '🚫 Memakai wewangian (parfum)',
          '🚫 Berburu binatang darat',
          '🚫 Melakukan hubungan suami istri',
          '🚫 Bertengkar atau berbuat maksiat',
          '🚫 Pria: memakai pakaian berjahit, menutup kepala',
          '🚫 Wanita: memakai cadar atau sarung tangan',
        ]
      },
      {
        tipe: 'tip',
        isi: 'Kenakan pakaian ihram di hotel agar lebih nyaman. Lakukan niat ihram saat pesawat melewati batas miqat atau saat di miqat Bir Ali jika lewat Madinah. Pramugari biasanya mengumumkan saat melewati miqat.'
      }
    ]
  },
  {
    id: 'tawaf',
    nomor: 2,
    judul: 'Tawaf (7 Putaran)',
    subtitle: 'Mengelilingi Ka\'bah sebagai wujud tauhid',
    icon: '🔄',
    deskripsi: 'Tawaf adalah mengelilingi Ka\'bah sebanyak 7 putaran berlawanan arah jarum jam, dimulai dari Hajar Aswad. Ini adalah rukun umroh yang wajib dilakukan.',
    counterType: 'tawaf',
    counterMax: 7,
    konten: [
      {
        tipe: 'text',
        judul: 'Makna Tawaf',
        isi: 'Tawaf melambangkan totalitas penghambaan kepada Allah. Sama seperti bumi berputar mengelilingi matahari, kita berputar mengelilingi Ka\'bah sebagai pusat spiritualitas Islam, menunjukkan bahwa seluruh hidup kita berputar mengelilingi ibadah kepada Allah.'
      },
      {
        tipe: 'list',
        judul: 'Cara Memulai Tawaf',
        items: [
          'Pastikan dalam keadaan suci (berwudhu)',
          'Posisikan diri sejajar dengan Hajar Aswad (batu hitam di sudut Ka\'bah)',
          'Hadapkan wajah ke Hajar Aswad',
          'Ucapkan "Bismillahi Allahu Akbar" sambil berisyarat ke Hajar Aswad',
          'Mulai berjalan berlawanan arah jarum jam (Ka\'bah selalu di sebelah kiri)',
          'Untuk pria: posisi rida (kain ihram) di bahu kanan terbuka saat tawaf (idhtiba\')'
        ]
      },
      {
        tipe: 'counter',
        judul: 'Penghitung Putaran Tawaf'
      },
      {
        tipe: 'tip',
        isi: 'Waktu tawaf paling tenang adalah setelah Subuh (05:30-07:00) atau setelah Isya (22:00 ke atas). Jangan memaksakan diri mencium Hajar Aswad jika berdesakan — cukup berisyarat dari jauh.'
      },
      {
        tipe: 'tip',
        isi: 'Untuk yang menggunakan kursi roda: tawaf di lantai 2 atau 3, lebih lapang dan sama sahnya. Saat berdesakan, prioritas keselamatan lebih utama.'
      },
      {
        tipe: 'warning',
        isi: 'Jangan berlari atau tergesa-gesa saat tawaf, terutama saat masjid ramai. Keselamatan diri dan sesama jamaah adalah prioritas utama.'
      }
    ]
  },
  {
    id: 'sholat-ibrahim',
    nomor: 3,
    judul: 'Sholat di Makam Ibrahim',
    subtitle: '2 rakaat setelah menyelesaikan tawaf',
    icon: '🤲',
    deskripsi: 'Setelah selesai tawaf, disunnahkan untuk sholat 2 rakaat di belakang Makam Ibrahim. Makam Ibrahim adalah batu tempat Nabi Ibrahim berdiri saat membangun Ka\'bah.',
    konten: [
      {
        tipe: 'text',
        judul: 'Makam Ibrahim',
        isi: 'Makam Ibrahim (Maqam Ibrahim) adalah batu yang digunakan Nabi Ibrahim AS ketika membangun Ka\'bah bersama putranya Ismail AS. Bekas telapak kaki beliau masih terlihat di batu ini hingga kini. Allah memerintahkan agar kita menjadikannya tempat shalat (QS. Al-Baqarah: 125).'
      },
      {
        tipe: 'list',
        judul: 'Tata Cara Sholat 2 Rakaat',
        items: [
          'Setelah putaran ke-7 tawaf, menuju Makam Ibrahim',
          'Baca: "وَاتَّخِذُوا مِنْ مَقَامِ إِبْرَاهِيمَ مُصَلًّى" (Wattakhidzuu min maqaami ibraahiima mushallaa)',
          'Sholat 2 rakaat dengan niat sunnah tawaf',
          'Rakaat 1: baca Al-Fatihah + Al-Kafirun',
          'Rakaat 2: baca Al-Fatihah + Al-Ikhlas',
          'Berdoa setelah sholat'
        ]
      },
      {
        tipe: 'tip',
        isi: 'Jika area Makam Ibrahim sangat penuh, sholat bisa dilakukan di tempat mana saja di dalam Masjidil Haram yang menghadap kiblat. Yang penting niat dan arah yang benar.'
      }
    ]
  },
  {
    id: 'multazam-zamzam',
    nomor: 4,
    judul: 'Doa di Multazam & Minum Zamzam',
    subtitle: 'Tempat paling mustajab untuk berdoa',
    icon: '💧',
    deskripsi: 'Multazam adalah area dinding Ka\'bah antara Hajar Aswad dan pintu Ka\'bah, sepanjang sekitar 2 meter. Ini adalah salah satu tempat yang paling mustajab untuk berdoa.',
    konten: [
      {
        tipe: 'text',
        judul: 'Keutamaan Multazam',
        isi: 'Multazam termasuk tempat yang sangat dianjurkan untuk berdoa. Dinamakan Multazam karena para jamaah "menggenggam" (التزام) dinding Ka\'bah di sini. Banyak ulama mengatakan bahwa doa di Multazam sangat jarang tertolak.'
      },
      {
        tipe: 'list',
        judul: 'Cara Berdoa di Multazam',
        items: [
          'Datangi area dinding Ka\'bah antara Hajar Aswad dan pintu Ka\'bah',
          'Tempelkan dada, pipi, dan telapak tangan ke dinding Ka\'bah jika memungkinkan',
          'Jika terlalu ramai, cukup berdoa dari kejauhan menghadap Multazam',
          'Curahkan semua hajat dan doa dengan penuh khusyuk',
          'Boleh menangis — ini adalah momen yang sangat berharga'
        ]
      },
      {
        tipe: 'doa',
        judul: 'Doa di Multazam',
        doaId: 'multazam'
      },
      {
        tipe: 'doa',
        judul: 'Doa Minum Air Zamzam',
        doaId: 'zamzam'
      },
      {
        tipe: 'list',
        judul: 'Adab Minum Air Zamzam',
        items: [
          'Menghadap kiblat',
          'Membaca Bismillah sebelum minum',
          'Minum dengan berdiri (sunnah untuk air Zamzam)',
          'Minum 3 tegukan',
          'Berdoa sesuai hajat sebelum atau saat minum',
          'Boleh menuangkan ke kepala atau membasuh wajah'
        ]
      },
      {
        tipe: 'tip',
        isi: 'Bawa botol minum kosong yang bisa direfill. Dispenser air Zamzam tersedia di banyak sudut Masjidil Haram. Air Zamzam juga tersedia di Masjid Nabawi.'
      }
    ]
  },
  {
    id: 'sai',
    nomor: 5,
    judul: "Sa'i (7 Perjalanan)",
    subtitle: 'Antara Shafa dan Marwa mengikuti jejak Siti Hajar',
    icon: '🏃',
    deskripsi: "Sa'i adalah berjalan 7 kali antara bukit Shafa dan Marwa, mengikuti jejak Siti Hajar AS yang berlari mencari air untuk putranya Nabi Ismail AS.",
    counterType: 'sai',
    counterMax: 7,
    konten: [
      {
        tipe: 'text',
        judul: "Kisah Siti Hajar & Makna Sa'i",
        isi: "Sa'i mengabadikan perjuangan luar biasa Siti Hajar AS. Ketika Nabi Ibrahim AS meninggalkan Hajar dan bayi Ismail di lembah tandus Makkah atas perintah Allah, Hajar berlari antara dua bukit itu tujuh kali mencari pertolongan. Allah kemudian memunculkan mata air Zamzam — tanda bahwa Allah tidak pernah meninggalkan hamba-Nya yang bertawakal."
      },
      {
        tipe: 'list',
        judul: 'Cara Melaksanakan Sa\'i',
        items: [
          'Mulai dari Bukit Shafa (arah selatan Masjidil Haram)',
          'Baca doa di Shafa sambil menghadap Ka\'bah',
          'Berjalan menuju Marwa (Shafa→Marwa = perjalanan ke-1)',
          'Untuk pria: berlari-lari kecil antara 2 tanda lampu hijau (sunnah)',
          'Sampai di Marwa, baca doa sambil menghadap Ka\'bah',
          'Kembali ke Shafa (Marwa→Shafa = perjalanan ke-2)',
          'Ulangi hingga 7 perjalanan (selesai di Marwa)',
        ]
      },
      {
        tipe: 'counter',
        judul: "Penghitung Perjalanan Sa'i"
      },
      {
        tipe: 'tip',
        isi: 'Perjalanan ganjil (1,3,5,7) berakhir di Marwa. Perjalanan genap (2,4,6) berakhir di Shafa. Perjalanan ke-7 selesai di Marwa.'
      },
      {
        tipe: 'tip',
        isi: 'Untuk lansia dan yang menggunakan kursi roda, tersedia jalur khusus di lantai 2 yang lebih lapang. Sa\'i tidak perlu berlari, cukup berjalan biasa — berlari kecil antara tanda hijau hanya sunnah untuk pria yang mampu.'
      },
      {
        tipe: 'warning',
        isi: 'Sa\'i harus dilakukan setelah tawaf yang sah. Sa\'i tidak boleh dilakukan dalam keadaan haid/nifas — tunggu hingga suci.'
      }
    ]
  },
  {
    id: 'tahallul',
    nomor: 6,
    judul: 'Tahallul',
    subtitle: 'Mengakhiri ihram dengan mencukur rambut',
    icon: '✂️',
    deskripsi: 'Tahallul adalah mengakhiri kondisi ihram dengan mencukur atau memotong rambut. Ini adalah rukun terakhir umroh, setelah tahallul semua larangan ihram menjadi halal kembali.',
    konten: [
      {
        tipe: 'text',
        judul: 'Makna Tahallul',
        isi: 'Tahallul secara bahasa berarti "menjadi halal". Ini adalah tanda selesainya ibadah umroh. Dengan tahallul, seorang jamaah kembali dari kondisi ihram ke kondisi normal. Ini juga simbol kesederhanaan dan kerendahan hati di hadapan Allah.'
      },
      {
        tipe: 'list',
        judul: 'Cara Tahallul',
        items: [
          'Laki-laki: mencukur seluruh rambut (halaq) lebih afdhal, boleh juga memendekkan minimal 3 helai dari seluruh bagian kepala',
          'Perempuan: memotong rambut minimal 3 helai (tidak boleh mencukur gundul)',
          'Dilakukan setelah sa\'i di tempat yang tersedia di sekitar Mas\'a atau di hotel',
          'Baca doa tahallul saat mencukur/memotong rambut'
        ]
      },
      {
        tipe: 'doa',
        judul: 'Doa Tahallul',
        doaId: 'istighfar'
      },
      {
        tipe: 'list',
        judul: 'Yang Boleh Dilakukan Setelah Tahallul',
        items: [
          '✅ Memakai pakaian biasa',
          '✅ Memakai parfum/wewangian',
          '✅ Berhubungan suami istri',
          '✅ Memakai cincin dan perhiasan',
          '✅ Memotong kuku',
          '✅ Semua yang sebelumnya dilarang saat ihram'
        ]
      },
      {
        tipe: 'tip',
        isi: 'Alhamdulillah, umroh Anda telah selesai! Setelah tahallul, manfaatkan waktu di Makkah untuk memperbanyak sholat, tawaf sunnah, ziarah ke tempat bersejarah, dan berdoa.'
      }
    ]
  }
]

export const ZIARAH_MADINAH = [
  {
    id: 'masjid-nabawi',
    nama: 'Masjid Nabawi',
    deskripsi: 'Masjid yang didirikan Rasulullah ﷺ sendiri. Sholat di sini senilai 1.000 kali sholat di masjid lain.',
    tips: 'Kunjungi Raudhah (antara rumah dan mimbar Nabi) — daftarkan diri di aplikasi Nusuk.',
    adab: ['Berwudhu sebelum masuk', 'Masuk dengan kaki kanan dan baca doa', 'Jaga ketenangan dan kekhusyukan']
  },
  {
    id: 'raudhah',
    nama: 'Raudhah',
    deskripsi: 'Area antara rumah Nabi dan mimbarnya. Rasulullah ﷺ bersabda ini adalah taman dari taman-taman surga.',
    tips: 'Wajib daftar lewat aplikasi Nusuk. Datang lebih awal, antri bisa panjang. Manfaatkan waktu singkat di Raudhah untuk doa yang sudah dipersiapkan.',
    adab: ['Bershalawat saat masuk', 'Sholat 2 rakaat', 'Berdoa dengan khusyuk', 'Jangan berdesakan']
  },
  {
    id: 'makam-nabi',
    nama: 'Makam Rasulullah ﷺ',
    deskripsi: 'Makam Nabi Muhammad ﷺ, Abu Bakar, dan Umar bin Khattab berada di dalam Masjid Nabawi.',
    tips: 'Ucapkan salam kepada Nabi ﷺ dengan sopan dan khusyuk. Hindari berdesak-desakan atau menyentuh pagar.',
    adab: ['Berdiri tegak dengan hormat', 'Ucapkan salam', 'Berdoa untuk diri sendiri dan keluarga', 'Tidak berlebihan']
  },
  {
    id: 'masjid-quba',
    nama: 'Masjid Quba',
    deskripsi: 'Masjid pertama yang dibangun dalam Islam. Sholat 2 rakaat di sini pahalanya seperti umroh. (HR. Tirmidzi)',
    tips: 'Berjarak sekitar 5 km dari Masjid Nabawi. Bisa naik taksi atau bus ziarah. Datang pagi agar lebih tenang.',
    adab: ['Sholat 2 rakaat', 'Perbanyak dzikir', 'Kunjungi pada hari Sabtu (seperti yang dilakukan Nabi)']
  },
  {
    id: 'jabal-uhud',
    nama: 'Jabal Uhud',
    deskripsi: 'Bukit tempat perang Uhud terjadi. Di sini terdapat makam Sayyidina Hamzah dan 70 syuhada Uhud.',
    tips: 'Berjarak sekitar 5 km dari Masjid Nabawi. Ziarah ke makam syuhada, doakan mereka. Nabi ﷺ sangat mencintai Jabal Uhud.',
    adab: ['Memberi salam kepada para syuhada', 'Mendoakan mereka', 'Merenung tentang pengorbanan mereka']
  },
]

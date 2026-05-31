export interface Doa {
  id: string
  kategori: string
  subkategori?: string
  judul: string
  arab: string
  latin: string
  terjemahan: string
  keutamaan?: string
  audioUrl?: string
}

export const KATEGORI_DOA = [
  { id: 'perjalanan', label: 'Doa Perjalanan', icon: '✈️' },
  { id: 'masjidil-haram', label: 'Doa di Masjidil Haram', icon: '🕌' },
  { id: 'sai', label: "Doa Sa'i", icon: '🏃' },
  { id: 'masjid-nabawi', label: 'Doa di Masjid Nabawi', icon: '🕌' },
  { id: 'dzikir', label: 'Dzikir & Wirid Harian', icon: '🤲' },
]

export const DATA_DOA: Doa[] = [
  // ========================
  // DOA PERJALANAN
  // ========================
  {
    id: 'keluar-rumah',
    kategori: 'perjalanan',
    judul: 'Doa Keluar Rumah',
    arab: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    latin: "Bismillahi tawakkaltu 'alallahi laa hawla walaa quwwata illaa billaah",
    terjemahan: 'Dengan nama Allah, aku bertawakal kepada Allah. Tidak ada daya dan kekuatan kecuali dengan Allah.',
    keutamaan: 'Barangsiapa membaca doa ini saat keluar rumah, ia terjaga dari gangguan. (HR. Abu Dawud)',
  },
  {
    id: 'naik-kendaraan',
    kategori: 'perjalanan',
    judul: 'Doa Naik Kendaraan',
    arab: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنْقَلِبُونَ',
    latin: "Subhaanal-ladzii sakhkhara lanaa haadzaa wa maa kunnaa lahuu muqriniin, wa innaa ilaa rabbinaa lamunqalibuun",
    terjemahan: 'Maha Suci Allah yang telah menundukkan kendaraan ini untuk kami, padahal kami sebelumnya tidak mampu menguasainya, dan sesungguhnya kami akan kembali kepada Tuhan kami.',
    keutamaan: 'Doa yang diajarkan Nabi ﷺ saat menaiki kendaraan. (HR. Muslim)',
  },
  {
    id: 'naik-pesawat',
    kategori: 'perjalanan',
    judul: 'Doa Naik Pesawat',
    arab: 'اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ وَالْخَلِيفَةُ فِي الْأَهْلِ',
    latin: "Allaahumma hawwin 'alainaa safaranaa haadza wathwi 'annaa bu'dahu. Allaahumma antal-shaakhibu fis-safari wal-khaliifatu fil-ahl",
    terjemahan: 'Ya Allah, mudahkanlah perjalanan ini atas kami dan dekatkanlah jaraknya. Ya Allah, Engkaulah teman perjalanan dan yang menjaga keluarga (yang ditinggal).',
    keutamaan: 'Doa perjalanan yang diajarkan Rasulullah ﷺ. (HR. Muslim)',
  },
  {
    id: 'masuk-makkah',
    kategori: 'perjalanan',
    judul: 'Doa Masuk Kota Makkah',
    arab: 'اللَّهُمَّ هَذَا حَرَمُكَ وَأَمْنُكَ فَحَرِّمْنِي عَلَى النَّارِ وَأَمِنِّي مِنْ عَذَابِكَ يَوْمَ تَبْعَثُ عِبَادَكَ، وَاجْعَلْنِي مِنْ أَوْلِيَائِكَ وَأَهْلِ طَاعَتِكَ',
    latin: "Allaahumma haadzaa haramuka wa amnuka faharrimnii 'alan-naari wa aminnii min 'adzaabika yawma tab'atsu 'ibaadaka, waj'alnii min awliyaa'ika wa ahli thaa'atik",
    terjemahan: 'Ya Allah, ini adalah tanah suci-Mu dan keamanan-Mu. Jauhkanlah aku dari neraka, selamatkan aku dari azab-Mu pada hari Engkau membangkitkan hamba-hamba-Mu, dan jadikanlah aku bagian dari para wali dan ahli ketaatan-Mu.',
  },
  {
    id: 'masuk-madinah',
    kategori: 'perjalanan',
    judul: 'Doa Masuk Kota Madinah',
    arab: 'اللَّهُمَّ هَذَا حَرَمُ رَسُولِكَ فَاجْعَلْهُ لِي وِقَايَةً مِنَ النَّارِ وَأَمَانًا مِنَ الْعَذَابِ وَسُوءِ الْحِسَابِ',
    latin: "Allaahumma haadzaa haramu rasuulika faj'alhu lii wiqaayatan minan-naari wa amaanan minal-'adzaabi wa suu-il-hisaab",
    terjemahan: 'Ya Allah, ini adalah tanah suci Rasul-Mu. Jadikanlah ia perlindungan bagiku dari neraka, dan keamanan dari azab serta buruknya hisab.',
  },

  // ========================
  // DOA MASJIDIL HARAM
  // ========================
  {
    id: 'lihat-kabah',
    kategori: 'masjidil-haram',
    judul: 'Doa Pertama Kali Melihat Ka\'bah',
    arab: 'اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً، وَزِدْ مَنْ شَرَّفَهُ وَكَرَّمَهُ مِمَّنْ حَجَّهُ أَوِ اعْتَمَرَهُ تَشْرِيفًا وَتَكْرِيمًا وَتَعْظِيمًا وَبِرًّا',
    latin: "Allaahumma zid hadzal-bayta tasyriifan wa ta'zhiiman wa takriiman wa mahaabatan, wa zid man syarrafahuu wa karramahu mimman hajjahu awi'-tamarahu tasyriifan wa takriiman wa ta'zhiiman wa birraa",
    terjemahan: 'Ya Allah, tambahkanlah kemuliaan, keagungan, kehormatan, dan kewibawaaan pada Ka\'bah ini. Tambahkanlah pula kemuliaan, kehormatan, keagungan, dan kebaikan bagi orang-orang yang memuliakan dan menghormatinya di antara orang yang berhaji atau umroh.',
    keutamaan: 'Doa yang sangat dianjurkan saat pertama kali melihat Ka\'bah. Sampaikan semua hajat dan permohonan di saat yang mulia ini.',
  },
  {
    id: 'masuk-masjidil-haram',
    kategori: 'masjidil-haram',
    judul: 'Doa Masuk Masjidil Haram',
    arab: 'أَعُوذُ بِاللَّهِ الْعَظِيمِ وَبِوَجْهِهِ الْكَرِيمِ وَسُلْطَانِهِ الْقَدِيمِ مِنَ الشَّيْطَانِ الرَّجِيمِ، بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    latin: "A'uudzu billaahil-'azhiim wa biwajhihil-kariim wa sulthaanihil-qadiim minasy-syaythaanir-rajiim. Bismillaahi wash-shalaatu was-salaamu 'alaa rasuulillaah. Allaahumma iftah lii abwaaba rahmatik",
    terjemahan: 'Aku berlindung kepada Allah Yang Maha Agung, dengan kemuliaan wajah-Nya dan kekuasaan-Nya yang abadi, dari setan yang terkutuk. Dengan nama Allah, semoga shalawat dan salam terlimpah kepada Rasulullah. Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.',
  },
  {
    id: 'tawaf-putaran-1',
    kategori: 'masjidil-haram',
    subkategori: 'tawaf',
    judul: 'Doa Tawaf Putaran ke-1',
    arab: 'بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ، اللَّهُمَّ إِيمَانًا بِكَ وَتَصْدِيقًا بِكِتَابِكَ وَوَفَاءً بِعَهْدِكَ وَاتِّبَاعًا لِسُنَّةِ نَبِيِّكَ مُحَمَّدٍ ﷺ',
    latin: "Bismillaahi wallaahu akbar. Allaahumma iimaanan bika wa tashdiiqan bikitaabika wa wafaa-an bi'ahdika wattibaa'an lisunnati nabiyyika muhammadin ﷺ",
    terjemahan: 'Dengan nama Allah, Allah Maha Besar. Ya Allah, dengan penuh keimanan kepada-Mu, membenarkan kitab-Mu, menepati janji-Mu, dan mengikuti sunnah Nabi-Mu Muhammad ﷺ.',
  },
  {
    id: 'tawaf-putaran-2',
    kategori: 'masjidil-haram',
    subkategori: 'tawaf',
    judul: 'Doa Tawaf Putaran ke-2',
    arab: 'اللَّهُمَّ إِنَّ هَذَا الْبَيْتَ بَيْتُكَ وَالْحَرَمَ حَرَمُكَ وَالْأَمْنَ أَمْنُكَ وَالْعَبْدَ عَبْدُكَ وَأَنَا عَبْدُكَ وَابْنُ عَبْدِكَ',
    latin: "Allaahumma innal-bayta baytuka wal-harama haramuka wal-amna amnuka wal-'abda 'abduka wa anaa 'abduka wabnu 'abdik",
    terjemahan: 'Ya Allah, sesungguhnya Ka\'bah ini adalah rumah-Mu, tanah haram ini adalah tanah haram-Mu, keamanan ini adalah keamanan-Mu, dan hamba ini adalah hamba-Mu. Aku adalah hamba-Mu dan putera hamba-Mu.',
  },
  {
    id: 'tawaf-putaran-3',
    kategori: 'masjidil-haram',
    subkategori: 'tawaf',
    judul: 'Doa Tawaf Putaran ke-3',
    arab: 'اللَّهُمَّ أَعُوذُ بِكَ مِنَ الشَّكِّ وَالشِّرْكِ وَالنِّفَاقِ وَالشِّقَاقِ وَسُوءِ الْأَخْلَاقِ وَسُوءِ الْمَنْظَرِ وَالْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ وَالْوَلَدِ',
    latin: "Allaahumma a'uudzu bika minasy-syakki wasy-syirki wan-nifaaqi wasy-syiqaaqi wa suu-il-akhlaaqi wa suu-il-manzhari wal-munqalabi fil-maali wal-ahli wal-walad",
    terjemahan: 'Ya Allah, aku berlindung kepada-Mu dari keraguan, syirik, kemunafikan, perpecahan, akhlak yang buruk, penampilan yang buruk, dan dari kemunduran dalam harta, keluarga, dan anak.',
  },
  {
    id: 'tawaf-putaran-4',
    kategori: 'masjidil-haram',
    subkategori: 'tawaf',
    judul: 'Doa Tawaf Putaran ke-4',
    arab: 'اللَّهُمَّ اجْعَلْهُ حَجًّا مَبْرُورًا وَسَعْيًا مَشْكُورًا وَذَنْبًا مَغْفُورًا وَعَمَلًا صَالِحًا مَقْبُولًا وَتِجَارَةً لَنْ تَبُورَ يَا عَزِيزُ يَا غَفُورُ',
    latin: "Allaahummaj'alhu hajjan mabruuran wa sa'yan masykuuran wa dzamban maghfuuran wa 'amalan shaalihan maqbuulan wa tijaaratan lan tabuura yaa 'aziizu yaa ghafuur",
    terjemahan: 'Ya Allah, jadikanlah ini umroh yang mabrur, sa\'i yang diterima, dosa yang diampuni, amal shalih yang diterima, dan perdagangan yang tidak akan rugi. Wahai Dzat Yang Maha Perkasa, Maha Pengampun.',
  },
  {
    id: 'tawaf-putaran-5',
    kategori: 'masjidil-haram',
    subkategori: 'tawaf',
    judul: 'Doa Tawaf Putaran ke-5',
    arab: 'اللَّهُمَّ أَظِلَّنِي فِي ظِلِّ عَرْشِكَ يَوْمَ لَا ظِلَّ إِلَّا ظِلُّكَ وَأَسْقِنِي مِنْ حَوْضِ نَبِيِّكَ مُحَمَّدٍ ﷺ كَأْسًا هَنِيئًا لَا أَظْمَأُ بَعْدَهَا أَبَدًا',
    latin: "Allaahumma azhillanii fii zhilli 'arsyika yawma laa zhilla illaa zhilluka wa asqinii min hawdhi nabiyyika muhammadin ﷺ ka-asan haniii-an laa azhmaa-u ba'dahaa abadaa",
    terjemahan: 'Ya Allah, naungilah aku di bawah naungan Arsy-Mu pada hari tidak ada naungan selain naungan-Mu. Berilah aku minum dari telaga Nabi-Mu Muhammad ﷺ dengan minuman yang menyenangkan, sehingga aku tidak akan merasa haus selamanya.',
  },
  {
    id: 'tawaf-putaran-6',
    kategori: 'masjidil-haram',
    subkategori: 'tawaf',
    judul: 'Doa Tawaf Putaran ke-6',
    arab: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ وَالْمُعَافَاةَ الدَّائِمَةَ فِي الدِّينِ وَالدُّنْيَا وَالْآخِرَةِ',
    latin: "Allaahumma innii as-alukal-'afwa wal-'aafiyata wal-mu'aafaatad-daa-imata fid-diini wad-dunyaa wal-aakhirah",
    terjemahan: 'Ya Allah, sesungguhnya aku memohon kepada-Mu ampunan, keselamatan, dan keselamatan yang abadi dalam urusan agama, dunia, dan akhirat.',
  },
  {
    id: 'tawaf-putaran-7',
    kategori: 'masjidil-haram',
    subkategori: 'tawaf',
    judul: 'Doa Tawaf Putaran ke-7',
    arab: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    latin: "Rabbanaa aatinaa fid-dunyaa hasanatan wa fil-aakhirati hasanatan wa qinaa 'adzaaban-naar",
    terjemahan: 'Wahai Tuhan kami, berikanlah kami kebaikan di dunia dan kebaikan di akhirat, serta peliharalah kami dari siksa api neraka.',
    keutamaan: 'Doa yang paling sering dibaca Rasulullah ﷺ, terutama di antara dua Rukun (Yamani dan Hajar Aswad).',
  },
  {
    id: 'istilam-hajar-aswad',
    kategori: 'masjidil-haram',
    judul: 'Doa Istilam Hajar Aswad',
    arab: 'بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ',
    latin: 'Bismillaahi wallaahu akbar',
    terjemahan: 'Dengan nama Allah, Allah Maha Besar.',
    keutamaan: 'Diucapkan setiap kali melewati Hajar Aswad (mencium atau berisyarat ke arahnya).',
  },
  {
    id: 'multazam',
    kategori: 'masjidil-haram',
    judul: 'Doa di Multazam',
    arab: 'اللَّهُمَّ لَكَ الْحَمْدُ حَمْدًا يُوَافِي نِعَمَكَ وَيُكَافِئُ مَزِيدَكَ، أَحْمَدُكَ بِجَمِيعِ مَحَامِدِكَ مَا عَلِمْتُ مِنْهَا وَمَا لَمْ أَعْلَمْ',
    latin: "Allaahumma lakal-hamdu hamdan yuwaafii ni'amaka wa yukaafi-u maziidaka, ahmaduka bijamii'i mahaamidika maa 'alimtu minhaa wa maa lam a'lam",
    terjemahan: 'Ya Allah, segala puji bagi-Mu, pujian yang setara dengan nikmat-nikmat-Mu dan memadai penambahan-Mu. Aku memuji-Mu dengan segala pujian yang aku ketahui maupun yang belum aku ketahui.',
    keutamaan: 'Multazam adalah tempat yang sangat mustajab untuk berdoa, di antara Hajar Aswad dan pintu Ka\'bah. Curahkan semua doa di sini.',
  },
  {
    id: 'zamzam',
    kategori: 'masjidil-haram',
    judul: 'Doa Minum Air Zamzam',
    arab: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا وَاسِعًا وَشِفَاءً مِنْ كُلِّ دَاءٍ',
    latin: "Allaahumma innii as-aluka 'ilman naafi'an wa rizqan waasi'an wa syifaa-an min kulli daa-in",
    terjemahan: 'Ya Allah, sesungguhnya aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang luas, dan kesembuhan dari segala penyakit.',
    keutamaan: 'Rasulullah ﷺ bersabda: "Air Zamzam berguna sesuai dengan niat peminumnya." (HR. Ibnu Majah)',
  },
  {
    id: 'hijr-ismail',
    kategori: 'masjidil-haram',
    judul: 'Doa di Hijr Ismail',
    arab: 'رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ',
    latin: "Rabbanaaghfir lii wa liwaali dayya wa lilmu-miniina yawma yaquumul-hisaab",
    terjemahan: 'Wahai Tuhan kami, ampunilah aku, kedua orang tuaku, dan orang-orang mukmin pada hari tegaknya hisab.',
    keutamaan: 'Hijr Ismail termasuk bagian dari Ka\'bah. Shalat di dalamnya sama seperti shalat di dalam Ka\'bah.',
  },

  // ========================
  // DOA SA'I
  // ========================
  {
    id: 'shafa',
    kategori: 'sai',
    judul: "Doa di Bukit Shafa",
    arab: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ، أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ. اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    latin: "Innas-shafaa wal-marwata min sya'aa-irillaah, abda-u bimaa bada-allaahu bih. Allaahu akbar, Allaahu akbar, Allaahu akbar, Laa ilaaha illallaahu wahdahu laa syariika lah, lahul-mulku walahul-hamdu yuhyii wa yumiitu wa huwa 'alaa kulli syai-in qadiir",
    terjemahan: 'Sesungguhnya Shafa dan Marwah adalah sebagian dari syiar Allah. Aku memulai dengan apa yang Allah mulai. Allah Maha Besar (3x). Tiada tuhan selain Allah semata, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan segala puji. Dia yang menghidupkan dan mematikan. Dia Maha Kuasa atas segala sesuatu.',
    keutamaan: 'Doa yang dibaca Rasulullah ﷺ saat berdiri di Shafa dan Marwah.',
  },
  {
    id: 'marwa',
    kategori: 'sai',
    judul: 'Doa di Bukit Marwa',
    arab: 'اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ، وَلِلَّهِ الْحَمْدُ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ أَنْجَزَ وَعْدَهُ وَنَصَرَ عَبْدَهُ وَهَزَمَ الْأَحْزَابَ وَحْدَهُ',
    latin: "Allaahu akbar, Allaahu akbar, Allaahu akbar, wa lillaahil-hamdu, Laa ilaaha illallaahu wahdahu anjaza wa'dahu wa nashara 'abdahu wa hazamal-ahzaaba wahdah",
    terjemahan: 'Allah Maha Besar (3x). Segala puji bagi Allah. Tiada tuhan selain Allah semata. Dia menepati janji-Nya, menolong hamba-Nya, dan mengalahkan golongan-golongan (musuh) seorang diri.',
  },
  {
    id: 'sai-berjalan',
    kategori: 'sai',
    judul: "Doa Berjalan antara Shafa-Marwa",
    arab: 'رَبِّ اغْفِرْ وَارْحَمْ وَاعْفُ وَتَكَرَّمْ وَتَجَاوَزْ عَمَّا تَعْلَمُ، إِنَّكَ تَعْلَمُ مَا لَا نَعْلَمُ، إِنَّكَ أَنْتَ الْأَعَزُّ الْأَكْرَمُ',
    latin: "Rabbighfir warham wa'fu wa takarram wa tajaawaz 'ammaa ta'lam, innaka ta'lamu maa laa na'lam, innaka antal-a'azzul-akram",
    terjemahan: 'Ya Tuhanku, ampunilah, sayangilah, maafkanlah, muliakanlah, dan lewatilah apa yang Engkau ketahui (tentang kesalahanku). Sesungguhnya Engkau mengetahui apa yang tidak kami ketahui. Sesungguhnya Engkau Maha Perkasa lagi Maha Mulia.',
  },

  // ========================
  // DOA MASJID NABAWI
  // ========================
  {
    id: 'masuk-masjid-nabawi',
    kategori: 'masjid-nabawi',
    judul: 'Doa Masuk Masjid Nabawi',
    arab: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَسَلِّمْ، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    latin: "Allaahumma shalli 'alaa muhammadin wa sallim. Allaahumma iftah lii abwaaba rahmatik",
    terjemahan: 'Ya Allah, curahkanlah shalawat dan salam kepada Muhammad. Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.',
  },
  {
    id: 'ziarah-makam-nabi',
    kategori: 'masjid-nabawi',
    judul: 'Doa Ziarah Makam Nabi ﷺ',
    arab: 'السَّلَامُ عَلَيْكَ يَا رَسُولَ اللَّهِ، السَّلَامُ عَلَيْكَ يَا نَبِيَّ اللَّهِ، السَّلَامُ عَلَيْكَ يَا حَبِيبَ اللَّهِ، أَشْهَدُ أَنَّكَ قَدْ بَلَّغْتَ الرِّسَالَةَ وَأَدَّيْتَ الْأَمَانَةَ وَنَصَحْتَ الْأُمَّةَ',
    latin: "As-salaamu 'alayka yaa rasuulallaah, as-salaamu 'alayka yaa nabiyallaah, as-salaamu 'alayka yaa habiiballaah, asyhadu annaka qad ballaghtar-risaalata wa addaytal-amaanata wa nashahtal-ummah",
    terjemahan: 'Semoga keselamatan terlimpah kepadamu, wahai Rasulullah. Semoga keselamatan terlimpah kepadamu, wahai Nabi Allah. Semoga keselamatan terlimpah kepadamu, wahai kekasih Allah. Aku bersaksi bahwa engkau telah menyampaikan risalah, menunaikan amanah, dan menasihati umat.',
    keutamaan: 'Barangsiapa yang bershalawat atasku sekali, Allah akan bershalawat atasnya sepuluh kali. (HR. Muslim)',
  },
  {
    id: 'raudhah',
    kategori: 'masjid-nabawi',
    judul: "Doa di Raudhah (Taman Surga)",
    arab: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ أَنْ تُصَلِّيَ عَلَى مُحَمَّدٍ وَأَنْ تَغْفِرَ لِي ذُنُوبِي وَأَنْ تَرْزُقَنِي التَّوْبَةَ النَّصُوحَ وَأَنْ تَقْبَلَ مِنِّي وَتُيَسِّرَ أُمُورِي',
    latin: "Allaahumma innii as-aluka an tushallia 'alaa muhammadin wa an taghfira lii dzunuubii wa an tarzuqaniit-tawbatan-nashuuha wa an taqbala minnii wa tuyassira umuurii",
    terjemahan: 'Ya Allah, aku mohon kepada-Mu agar Engkau bershalawat kepada Muhammad, mengampuni dosa-dosaku, menganugerahiku taubat yang sungguh-sungguh, menerima amalku, dan memudahkan urusanku.',
    keutamaan: 'Antara rumahku dan mimbarku adalah taman dari taman-taman surga. (HR. Bukhari & Muslim)',
  },

  // ========================
  // DZIKIR HARIAN
  // ========================
  {
    id: 'istighfar',
    kategori: 'dzikir',
    judul: 'Istighfar',
    arab: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
    latin: "Astaghfirullahal-'azhiimalladzii laa ilaaha illaa huwal-hayyul-qayyuumu wa atuubu ilaih",
    terjemahan: 'Aku memohon ampun kepada Allah Yang Maha Agung, yang tiada tuhan selain Dia, yang Maha Hidup lagi Maha Berdiri Sendiri, dan aku bertaubat kepada-Nya.',
    keutamaan: 'Perbanyak istighfar di Tanah Suci, karena inilah salah satu amalan terbaik dalam umroh.',
  },
  {
    id: 'sholawat',
    kategori: 'dzikir',
    judul: 'Sholawat Ibrahimiyah',
    arab: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    latin: "Allaahumma shalli 'alaa muhammadin wa 'alaa aali muhammadin kamaa shallayta 'alaa ibraahiima wa 'alaa aali ibraahiima innaka hamiidun majiid",
    terjemahan: 'Ya Allah, berilah shalawat kepada Muhammad dan keluarga Muhammad sebagaimana Engkau memberi shalawat kepada Ibrahim dan keluarga Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.',
    keutamaan: 'Perbanyak shalawat saat berada di dekat makam Nabi ﷺ di Madinah.',
  },
  {
    id: 'tasbih-tahmid-tahlil-takbir',
    kategori: 'dzikir',
    judul: 'Tasbih, Tahmid, Tahlil, Takbir',
    arab: 'سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ',
    latin: 'Subhanallaah, walhamdulillaah, walaa ilaaha illallaah, wallaahu akbar',
    terjemahan: 'Maha Suci Allah, segala puji bagi Allah, tiada tuhan selain Allah, Allah Maha Besar.',
    keutamaan: 'Kalimat yang paling dicintai Allah. Baca sebanyak-banyaknya selama di Tanah Suci.',
  },
  {
    id: 'labbaikallah',
    kategori: 'dzikir',
    judul: 'Talbiyah (Bacaan Ihram)',
    arab: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ',
    latin: "Labbaikallahumma labbayk, labbaika laa syariika laka labbayk, innal-hamda wan-ni'mata laka wal-mulk, laa syariika lak",
    terjemahan: 'Aku datang memenuhi pangilan-Mu ya Allah, aku datang memenuhi panggilan-Mu. Aku datang memenuhi panggilan-Mu, tiada sekutu bagi-Mu, aku datang memenuhi panggilan-Mu. Sesungguhnya segala puji, nikmat dan kerajaan adalah milik-Mu. Tiada sekutu bagi-Mu.',
    keutamaan: 'Bacaan wajib saat berihram. Perbanyak membaca talbiyah hingga memulai tawaf.',
  },
]

export function getDoaByKategori(kategori: string): Doa[] {
  return DATA_DOA.filter(d => d.kategori === kategori)
}

export function getDoaById(id: string): Doa | undefined {
  return DATA_DOA.find(d => d.id === id)
}

export function searchDoa(query: string): Doa[] {
  const q = query.toLowerCase()
  return DATA_DOA.filter(d =>
    d.judul.toLowerCase().includes(q) ||
    d.latin.toLowerCase().includes(q) ||
    d.terjemahan.toLowerCase().includes(q)
  )
}

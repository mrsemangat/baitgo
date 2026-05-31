import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { LandingNav } from '@/components/landing/LandingNav'
import { LandingFAQ } from '@/components/landing/LandingFAQ'
import { LandingDashboardPreview } from '@/components/landing/LandingDashboardPreview'
import { Star, CheckCircle2, Play } from 'lucide-react'

const TESTIMONIALS = [
  { featured: true, quote: 'Saya umroh pertama kali tanpa travel agent di usia 55 tahun. Banyak yang bilang terlalu berani, tapi dengan BaitGo saya benar-benar siap. Panduan doanya yang paling membantu — saya bisa dengarkan audio sambil tawaf tanpa harus baca layar. Tawaf 7 putaran lancar tanpa missed satu doa pun. Alhamdulillah.', name: 'Pak Hendra', detail: '55 tahun · Umroh Mandiri dari Bandung', rating: 5 },
  { quote: 'Spot foto-nya yang bikin beda! Foto Ka\'bah saya dari lantai 2 setelah subuh hasilnya luar biasa — banyak yang tanya fotografer mana yang motret. Padahal pakai HP biasa, hanya ikuti tipsnya.', name: 'Bu Fitri', detail: '38 tahun · Jakarta', rating: 5 },
  { quote: 'Kalkulator biayanya sangat membantu. Kami berdua bisa siapkan budget yang tepat — tidak kurang, tidak lebih. Tidak ada kaget-kagetan saat di sana.', name: 'Pak & Bu Ridwan', detail: 'Surabaya', rating: 5 },
  { quote: 'Doa-doanya lengkap banget, ada audio-nya juga. Orang tua saya yang tidak terlalu bisa baca Arab sangat terbantu.', name: 'Mbak Aulia', detail: '29 tahun · Menemani orang tua umroh', rating: 5 },
]

const FITUR = [
  { badge: 'Panduan Terlengkap', icon: '🕌', judul: 'Panduan ibadah step-by-step dengan audio doa', deskripsi: 'Dari niat ihram sampai tahallul — semua ada panduannya. Counter tawaf dan sa\'i otomatis, doa lengkap tiap tahap dengan audio yang bisa diputar sambil ibadah, bahkan saat layar mati.', benefits: ['Counter tawaf & sa\'i', 'Audio doa bisa background', 'Teks Arab besar & jelas', 'Mode offline'], emoji: '🤲' },
  { badge: 'Fitur Eksklusif', icon: '📸', judul: 'Abadikan momen terbaik di tempat yang tepat', deskripsi: 'Panduan 15+ spot foto terbaik di Makkah dan Madinah — lengkap dengan waktu terbaik, tips angle, dan cara setting kamera HP. Momen sekali seumur hidup, harus diabadikan dengan sempurna.', benefits: ['15+ spot foto Makkah & Madinah', 'Waktu terbaik per spot', 'Tips angle & kamera HP', 'Navigasi GPS'], emoji: '📷' },
  { badge: 'Umroh Mandiri', icon: '💰', judul: 'Ketahui berapa biaya umroh mandirimu sebelum berangkat', deskripsi: 'Kalkulator biaya umroh mandiri yang komprehensif — tiket, visa, hotel, makan, transportasi, sampai oleh-oleh. Itinerary builder yang bisa dikustomisasi dan diexport PDF.', benefits: ['Kalkulator biaya detail', 'Itinerary builder', 'Export PDF', 'Tips hemat per kategori'], emoji: '🧮' },
  { badge: 'Persiapan Matang', icon: '✅', judul: 'Checklist persiapan yang tidak akan membiarkanmu lupa apapun', deskripsi: 'Dari H-6 bulan sampai H-1 hari — semua yang perlu disiapkan ada di sini. Reminder otomatis per fase, countdown hari keberangkatan, dan catatan perjalanan pribadi.', benefits: ['Checklist per fase', 'Countdown keberangkatan', 'Reminder otomatis', 'Catatan pribadi'], emoji: '📋' },
]

const KOTA = ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Makassar', 'Semarang', 'Yogyakarta', 'Palembang']

export default function LandingPage() {
  return (
    <div className="bg-[#FBF7F0] min-h-screen">
      <LandingNav />

      {/* HERO */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 islamic-pattern" />
        <div className="absolute top-20 left-10 text-5xl opacity-20 animate-float-slow">✦</div>
        <div className="absolute top-40 right-16 text-3xl opacity-15 animate-float-slow" style={{ animationDelay: '2s' }}>✦</div>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#F5E6C8] text-[#8B6914] rounded-full px-5 py-2 text-sm font-semibold mb-8 border border-[rgba(201,168,76,0.3)]">
            🕌 Panduan umroh terlengkap untuk jamaah Indonesia
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#0D4A28] leading-tight mb-6 max-w-4xl mx-auto">
            Setiap langkah di Tanah Suci adalah momen yang{' '}
            <span className="text-[#C9A84C]">tak akan terulang.</span>{' '}
            Pastikan kamu siap.
          </h1>
          <p className="text-lg text-[#6b7280] max-w-2xl mx-auto mb-10 leading-relaxed">
            BaitGo menemanimu dari persiapan sampai kepulangan — panduan ibadah lengkap dengan doa dan audio, spot foto terbaik, dan perencanaan biaya mandiri.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Link href="/auth/register" className="bg-[#1B6B3A] hover:bg-[#0D4A28] text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1 shadow-lg shadow-[#1B6B3A]/25">
              Mulai Persiapan Umrohmu — Gratis 🕌
            </Link>
            <a href="#fitur" className="flex items-center gap-2 text-[#1B6B3A] font-semibold hover:text-[#0D4A28] transition-colors">
              <span className="w-8 h-8 rounded-full bg-[#E8F5ED] flex items-center justify-center">
                <Play size={14} className="ml-0.5" />
              </span>
              Lihat fitur lengkap
            </a>
          </div>
          <p className="text-sm text-[#6b7280]">Gratis untuk fitur utama · Sekali bayar untuk premium</p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="flex -space-x-2">
              {['👴', '👩', '👨', '👵', '🧕'].map((emoji, i) => (
                <div key={i} className="w-9 h-9 rounded-full bg-[#E8F5ED] border-2 border-[#FBF7F0] flex items-center justify-center text-sm">{emoji}</div>
              ))}
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-[#0D4A28]">Dipercaya 15.000+ calon jamaah Indonesia</div>
              <div className="flex items-center gap-1 text-xs text-[#6b7280]">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-[#C9A84C] fill-[#C9A84C]" />)}
                <span>4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-[#0D4A28] mb-2">Lihat BaitGo beraksi</h2>
            <p className="text-[#6b7280]">Semua yang kamu butuhkan untuk umroh yang khusyuk</p>
          </div>
          <LandingDashboardPreview />
        </div>
      </section>

      {/* Logo Bar */}
      <div className="py-8 bg-white border-y border-[rgba(201,168,76,0.12)]">
        <p className="text-center text-sm text-[#6b7280] mb-4">Dipercaya jamaah dari berbagai kota Indonesia</p>
        <div className="overflow-hidden">
          <div className="flex gap-8 animate-marquee whitespace-nowrap">
            {[...KOTA, ...KOTA].map((kota, i) => (
              <span key={i} className="text-[#1B6B3A] font-bold text-sm px-4 py-2 bg-[#E8F5ED] rounded-full">🕌 {kota}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Problem */}
      <section className="py-20 px-6 bg-[#F5E6C8]/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-[#0D4A28] text-center mb-3">Umroh adalah perjalanan sekali seumur hidup.</h2>
          <p className="text-center text-[#6b7280] mb-12">Jangan sampai ada yang terlewat.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '📖', judul: 'Panduan ibadah tersebar di mana-mana', deskripsi: 'Buku manasik, video YouTube, artikel yang bertentangan. Di Tanah Suci, panik karena tidak yakin doa mana yang benar untuk putaran ke-3 tawaf.' },
              { icon: '💰', judul: 'Biaya umroh mandiri itu membingungkan', deskripsi: 'Tiket, visa, hotel, transportasi, makan, oleh-oleh — berapa total yang harus disiapkan? Sering kaget saat sampai karena tidak ada perencanaan yang matang.' },
              { icon: '📸', judul: 'Momen indah terlewat karena tidak tahu spot terbaiknya', deskripsi: 'Ribuan foto Ka\'bah yang blur atau kurang menarik, sementara momen itu mungkin tidak akan terulang.' },
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-[rgba(201,168,76,0.12)]">
                <div className="text-3xl mb-4">{p.icon}</div>
                <h3 className="font-bold text-[#0D4A28] mb-2">{p.judul}</h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">{p.deskripsi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ayat */}
      <section className="py-16 px-6 bg-[#0D4A28] text-center text-white">
        <div className="text-4xl mb-4" style={{ fontFamily: "'Amiri', serif", direction: 'rtl', lineHeight: 2 }}>
          وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ
        </div>
        <p className="text-[#C9A84C] text-lg font-medium mb-2">&quot;Dan sempurnakanlah ibadah haji dan umrah karena Allah&quot;</p>
        <p className="text-[rgba(251,247,240,0.6)] text-sm mb-6">(QS. Al-Baqarah: 196)</p>
        <p className="text-[#F5E6C8] font-medium">BaitGo hadir untuk membantu kamu menyempurnakan setiap momennya.</p>
      </section>

      {/* Fitur */}
      <section id="fitur" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-[#0D4A28] mb-2">Teman setia dari persiapan sampai kepulangan</h2>
          </div>
          <div className="space-y-16">
            {FITUR.map((f, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
                <div className="flex-1">
                  <Badge variant="green" className="mb-4">{f.badge}</Badge>
                  <h3 className="text-2xl font-black text-[#0D4A28] mb-4 leading-tight">{f.judul}</h3>
                  <p className="text-[#6b7280] leading-relaxed mb-6">{f.deskripsi}</p>
                  <div className="space-y-2">
                    {f.benefits.map((b, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-[#374151]">
                        <CheckCircle2 size={16} className="text-[#1B6B3A] flex-shrink-0" />{b}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="w-72 h-72 bg-gradient-to-br from-[#E8F5ED] to-[#F5E6C8] rounded-3xl flex items-center justify-center shadow-lg border border-[rgba(201,168,76,0.2)]">
                    <span className="text-8xl">{f.emoji}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-[#F5E6C8]/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#0D4A28] mb-2">Kata mereka yang sudah terbantu BaitGo</h2>
            <p className="text-[#6b7280]">15.000+ calon jamaah sudah lebih siap dengan BaitGo</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="md:col-span-1 bg-[#0D4A28] text-white rounded-2xl p-6">
              <div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-[#C9A84C] fill-[#C9A84C]" />)}</div>
              <p className="text-sm leading-relaxed text-[rgba(251,247,240,0.9)] mb-5">&quot;{TESTIMONIALS[0].quote}&quot;</p>
              <div className="font-bold text-[#C9A84C]">{TESTIMONIALS[0].name}</div>
              <div className="text-xs text-[rgba(251,247,240,0.6)]">{TESTIMONIALS[0].detail}</div>
            </div>
            <div className="md:col-span-2 grid gap-4">
              {TESTIMONIALS.slice(1).map((t, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-[rgba(201,168,76,0.12)] shadow-sm">
                  <div className="flex gap-1 mb-3">{[...Array(5)].map((_, j) => <Star key={j} size={12} className="text-[#C9A84C] fill-[#C9A84C]" />)}</div>
                  <p className="text-sm text-[#374151] leading-relaxed mb-3">&quot;{t.quote}&quot;</p>
                  <div className="font-bold text-[#0D4A28] text-sm">{t.name}</div>
                  <div className="text-xs text-[#6b7280]">{t.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="harga" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#0D4A28] mb-2">Investasi kecil untuk perjalanan tak ternilai</h2>
            <p className="text-[#6b7280]">Bayar sekali, pakai seumur hidup</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <div className="text-sm font-bold text-[#6b7280] mb-1">Gratis Selamanya</div>
              <div className="text-4xl font-black text-[#0D4A28] mb-6">Rp 0</div>
              <div className="space-y-3 mb-8">
                {['Panduan ibadah umroh lengkap', 'Bank doa + audio', 'Panduan praktis Tanah Suci', '5 spot foto pilihan', 'Checklist dokumen dasar'].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#374151]"><CheckCircle2 size={16} className="text-[#1B6B3A]" />{f}</div>
                ))}
              </div>
              <Link href="/auth/register" className="block w-full text-center border-2 border-[#1B6B3A] text-[#1B6B3A] py-3 rounded-2xl font-bold hover:bg-[#1B6B3A] hover:text-white transition-all">Mulai Gratis</Link>
            </div>
            <div className="bg-[#0D4A28] rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#C9A84C] text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl">TERLARIS</div>
              <div className="text-sm font-bold text-[#C9A84C] mb-1">Premium — Sekali Bayar</div>
              <div className="text-4xl font-black mb-1">Rp 49.000</div>
              <p className="text-[rgba(251,247,240,0.6)] text-xs mb-6">Lebih murah dari satu makan di Makkah ☕</p>
              <div className="space-y-3 mb-8">
                {['Semua fitur Free', 'Kalkulator biaya detail', 'Itinerary builder + export PDF', 'Semua 15+ spot foto + tips detail', 'Tracker persiapan lengkap', 'Mode offline penuh', 'Update konten seumur hidup'].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[rgba(251,247,240,0.9)]"><CheckCircle2 size={16} className="text-[#C9A84C] flex-shrink-0" />{f}</div>
                ))}
              </div>
              <button className="w-full bg-[#C9A84C] hover:bg-[#b8963d] text-white py-3 rounded-2xl font-bold transition-all">Upgrade Premium ✨</button>
            </div>
          </div>
          <p className="text-center text-sm text-[#6b7280] mt-6">💡 Tidak ada biaya langganan. Bayar sekali, pakai seumur hidup.</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 px-6 bg-[#F5E6C8]/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-[#0D4A28] text-center mb-10">Pertanyaan Umum</h2>
          <LandingFAQ />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0D4A28 0%, #1B6B3A 100%)' }}>
        <div className="absolute inset-0 arabesque-pattern opacity-20" />
        <div className="relative max-w-2xl mx-auto text-center text-white">
          <div className="text-5xl mb-6">🕋</div>
          <h2 className="text-4xl font-black mb-3">Semoga umrohmu mabrur.</h2>
          <p className="text-[rgba(251,247,240,0.8)] text-lg mb-8">Mulai persiapan hari ini — gratis.</p>
          <Link href="/auth/register" className="inline-block bg-[#C9A84C] hover:bg-[#b8963d] text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1 shadow-xl">
            Mulai Persiapan Umrohmu 🕌
          </Link>
          <p className="text-[rgba(251,247,240,0.5)] text-sm mt-4">Gratis untuk fitur utama · Premium Rp49.000 sekali bayar</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D4A28] text-white pt-16 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">🕋</div>
                <div><div className="font-black text-xl">BaitGo</div><div className="text-[#C9A84C] text-xs">Panduan Umroh</div></div>
              </div>
              <p className="text-sm text-[rgba(251,247,240,0.6)] leading-relaxed">Teman setia perjalanan umrohmu 🤲<br />Dari persiapan sampai pulang.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#C9A84C] mb-4 text-sm">Fitur</h4>
              <ul className="space-y-2 text-sm text-[rgba(251,247,240,0.6)]">
                {['Panduan Ibadah', 'Bank Doa', 'Spot Foto', 'Perencanaan', 'Tracker'].map(f => (
                  <li key={f}><Link href="/auth/register" className="hover:text-white transition-colors">{f}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#C9A84C] mb-4 text-sm">Tentang</h4>
              <ul className="space-y-2 text-sm text-[rgba(251,247,240,0.6)]">
                {['Tentang BaitGo', 'Blog Umroh', 'Harga'].map(f => <li key={f}><Link href="#" className="hover:text-white transition-colors">{f}</Link></li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#C9A84C] mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-[rgba(251,247,240,0.6)]">
                {['Syarat & Ketentuan', 'Kebijakan Privasi', 'Hubungi Kami'].map(f => <li key={f}><Link href="#" className="hover:text-white transition-colors">{f}</Link></li>)}
              </ul>
            </div>
          </div>
          <div className="border-t border-[rgba(255,255,255,0.1)] pt-6 text-center text-xs text-[rgba(251,247,240,0.4)]">
            © 2024 BaitGo. Semua konten panduan ibadah mengacu pada tuntunan yang sahih. Konsultasikan dengan ustadz untuk hal yang meragukan.
          </div>
        </div>
      </footer>
    </div>
  )
}

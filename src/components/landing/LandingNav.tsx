'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-[#FBF7F0]/95 backdrop-blur-md shadow-sm border-b border-[rgba(201,168,76,0.15)]' : 'bg-transparent'
    )}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#1B6B3A] flex items-center justify-center text-lg">🕋</div>
          <span className="font-black text-xl text-[#0D4A28]">BaitGo</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#374151]">
          <a href="#fitur" className="hover:text-[#1B6B3A] transition-colors">Fitur</a>
          <a href="#harga" className="hover:text-[#1B6B3A] transition-colors">Harga</a>
          <a href="#faq" className="hover:text-[#1B6B3A] transition-colors">FAQ</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth/login" className="text-sm font-semibold text-[#374151] hover:text-[#1B6B3A] transition-colors px-4 py-2">
            Masuk
          </Link>
          <Link href="/auth/register" className="bg-[#1B6B3A] hover:bg-[#0D4A28] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors">
            Coba Gratis
          </Link>
        </div>

        {/* Mobile */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-[#0D4A28]">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#FBF7F0] border-t border-[rgba(201,168,76,0.15)] px-6 py-4 space-y-3">
          {['#fitur', '#harga', '#faq'].map((href, i) => (
            <a key={i} href={href} onClick={() => setMobileOpen(false)}
              className="block text-sm font-semibold text-[#374151] py-2">
              {['Fitur', 'Harga', 'FAQ'][i]}
            </a>
          ))}
          <Link href="/auth/login" className="block text-sm font-semibold text-[#374151] py-2">Masuk</Link>
          <Link href="/auth/register" className="block bg-[#1B6B3A] text-white text-center py-3 rounded-xl font-bold text-sm">
            Coba Gratis
          </Link>
        </div>
      )}
    </nav>
  )
}

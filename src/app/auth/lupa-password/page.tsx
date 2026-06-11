'use client'
import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react'

export default function LupaPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      // Selalu tampilkan success — jangan expose apakah email terdaftar
      setSent(true)
    } catch {
      toast.error('Terjadi kesalahan, coba lagi')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF7F0] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🕋</div>
          <h1 className="text-2xl font-black text-[#0D4A28]">Umrava</h1>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-[rgba(201,168,76,0.12)]">
          {!sent ? (
            <>
              <Link href="/auth/login" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-6 w-fit">
                <ArrowLeft size={15} /> Kembali ke login
              </Link>
              <h2 className="text-xl font-bold text-[#0D4A28] mb-1">Lupa Password?</h2>
              <p className="text-sm text-gray-500 mb-6">
                Masukkan email akun Anda. Kami akan kirim link reset password via email.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-1.5">Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email" value={email} onChange={e => setEmail(e.target.value)} required
                      placeholder="email@contoh.com"
                      className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#1B6B3A] transition-colors"
                    />
                  </div>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-[#1B6B3A] hover:bg-[#0D4A28] disabled:bg-gray-300 text-white py-3.5 rounded-xl font-bold text-sm transition-colors">
                  {loading ? 'Mengirim...' : 'Kirim Link Reset Password'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <CheckCircle2 size={48} className="text-[#1B6B3A] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#0D4A28] mb-2">Email terkirim!</h3>
              <p className="text-sm text-gray-500 mb-2">Link reset password sudah dikirim ke:</p>
              <p className="font-semibold text-[#1B6B3A] mb-4 break-all">{email}</p>
              <p className="text-xs text-gray-400 mb-6">Cek inbox atau folder spam. Link berlaku 1 jam.</p>
              <Link href="/auth/login"
                className="inline-flex items-center gap-2 text-sm text-[#1B6B3A] font-semibold hover:underline">
                <ArrowLeft size={15} /> Kembali ke login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

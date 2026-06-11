'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { Eye, EyeOff, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

type State = 'loading' | 'ready' | 'done' | 'invalid'

function ResetPasswordForm() {
  const [state, setState] = useState<State>('loading')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [saving, setSaving] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      setState('ready')
    } else {
      setState('invalid')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 6) { toast.error('Password minimal 6 karakter'); return }
    if (password !== confirm) { toast.error('Password tidak cocok'); return }

    setSaving(true)
    const token = searchParams.get('token')
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    })
    const data = await res.json()
    if (!res.ok) {
      toast.error(data.error || 'Gagal reset password')
      setSaving(false)
      return
    }
    setState('done')
    toast.success('Password berhasil diubah!')
    setTimeout(() => router.push('/auth/login'), 2000)
  }

  if (state === 'loading') return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF7F0]">
      <Loader2 className="animate-spin text-[#1B6B3A]" size={32} />
    </div>
  )

  if (state === 'invalid') return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF7F0] p-6">
      <div className="bg-white rounded-3xl p-8 shadow-sm max-w-md w-full text-center">
        <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
        <h2 className="text-xl font-bold text-[#0D4A28] mb-2">Link tidak valid</h2>
        <p className="text-sm text-[#6b7280] mb-6">Link reset password tidak valid atau sudah kadaluarsa.</p>
        <button onClick={() => router.push('/auth/lupa-password')}
          className="bg-[#1B6B3A] text-white px-6 py-2.5 rounded-xl font-semibold text-sm">
          Minta link baru
        </button>
      </div>
    </div>
  )

  if (state === 'done') return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF7F0] p-6">
      <div className="bg-white rounded-3xl p-8 shadow-sm max-w-md w-full text-center">
        <CheckCircle2 className="mx-auto mb-4 text-[#1B6B3A]" size={48} />
        <h2 className="text-xl font-bold text-[#0D4A28] mb-2">Password berhasil diubah!</h2>
        <p className="text-sm text-[#6b7280]">Mengalihkan ke halaman login...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF7F0] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🕋</div>
          <h1 className="text-2xl font-black text-[#0D4A28]">Umrava</h1>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-[rgba(201,168,76,0.12)]">
          <h2 className="text-xl font-bold text-[#0D4A28] mb-1">Buat Password Baru</h2>
          <p className="text-sm text-gray-500 mb-6">Masukkan password baru untuk akun Anda.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#374151] mb-1.5">Password Baru</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="Minimal 6 karakter"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-[#1B6B3A] transition-colors"
                />
                <button type="button" onClick={() => setShowPass(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#374151] mb-1.5">Konfirmasi Password</label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                placeholder="Ulangi password baru"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B6B3A] transition-colors"
              />
            </div>
            <button type="submit" disabled={saving}
              className="w-full bg-[#1B6B3A] hover:bg-[#0D4A28] disabled:bg-gray-300 text-white py-3.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2">
              {saving ? <><Loader2 size={16} className="animate-spin" /> Menyimpan...</> : 'Simpan Password Baru'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" size={32} /></div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}

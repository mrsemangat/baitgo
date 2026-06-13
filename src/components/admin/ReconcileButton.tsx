'use client'
import { useState } from 'react'
import { RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react'

export function ReconcileButton() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ upgraded: number; checked: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const run = async () => {
    if (loading) return
    setLoading(true)
    setResult(null)
    setError(null)
    try {
      const res = await fetch('/api/admin/reconcile', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal')
      setResult({ upgraded: data.upgraded, checked: data.checked })
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-bold text-gray-900 text-sm mb-1">Reconcile Pembayaran</h3>
          <p className="text-xs text-gray-500">
            Cek semua transaksi Duitku dan upgrade user yang sudah bayar tapi belum premium.
          </p>
          {result && (
            <div className="flex items-center gap-1.5 mt-2 text-xs text-green-700 font-semibold">
              <CheckCircle2 size={13} />
              {result.upgraded > 0
                ? `${result.upgraded} user berhasil di-upgrade dari ${result.checked} transaksi`
                : `Tidak ada yang perlu di-upgrade (${result.checked} transaksi dicek)`
              }
            </div>
          )}
          {error && (
            <div className="flex items-center gap-1.5 mt-2 text-xs text-red-600 font-semibold">
              <AlertCircle size={13} /> {error}
            </div>
          )}
        </div>
        <button
          onClick={run}
          disabled={loading}
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-xl text-xs font-bold transition-colors"
        >
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Mengecek...' : 'Jalankan'}
        </button>
      </div>
    </div>
  )
}

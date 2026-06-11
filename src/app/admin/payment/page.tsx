'use client'
import { useState, useEffect, useCallback } from 'react'
import {
  Save, Eye, EyeOff, CheckCircle2, AlertCircle, Copy, Check,
  RefreshCw, Plus, Trash2, ToggleLeft, ToggleRight, CreditCard,
  Banknote, Clock, CheckCheck, XCircle, ChevronDown,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

// ── Types ──────────────────────────────────────────────────────────────────────

interface BankAccount {
  id: string
  bankName: string
  accountNumber: string
  accountName: string
}

interface PaymentSettings {
  merchantCode: string
  apiKey: string
  mode: 'sandbox' | 'production'
  gatewayEnabled: boolean
  bankTransferEnabled: boolean
  bankAccounts: BankAccount[]
}

interface ManualPayment {
  id: string
  merchant_order_id: string
  user_name: string
  user_email: string
  amount: number
  bank_name: string | null
  status: 'pending' | 'approved' | 'rejected'
  admin_note: string | null
  created_at: string
}

const WEBHOOK_URL = 'https://umrava.com/api/webhook/duitku'

function formatRp(n: number) {
  return `Rp${n.toLocaleString('id-ID')}`
}

function formatDate(d: string) {
  return new Date(d).toLocaleString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

// ── Toggle Switch ──────────────────────────────────────────────────────────────

function Toggle({ enabled, onChange, label, description }: {
  enabled: boolean; onChange: (v: boolean) => void; label: string; description: string
}) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className="w-full flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 transition-all text-left"
    >
      <div>
        <p className="font-semibold text-gray-800 text-sm">{label}</p>
        <p className="text-xs text-gray-400 mt-0.5">{description}</p>
      </div>
      {enabled
        ? <ToggleRight size={28} className="text-[#1B6B3A] flex-shrink-0" />
        : <ToggleLeft size={28} className="text-gray-300 flex-shrink-0" />
      }
    </button>
  )
}

// ── Bank Account Form ──────────────────────────────────────────────────────────

function BankAccountForm({ onAdd }: { onAdd: (acc: BankAccount) => void }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ bankName: '', accountNumber: '', accountName: '' })

  const handle = () => {
    if (!form.bankName || !form.accountNumber || !form.accountName) {
      toast.error('Semua field rekening wajib diisi')
      return
    }
    onAdd({ ...form, id: Date.now().toString() })
    setForm({ bankName: '', accountNumber: '', accountName: '' })
    setOpen(false)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-gray-200 text-sm text-gray-400 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
      >
        <Plus size={15} /> Tambah Rekening Bank
      </button>
    )
  }

  return (
    <div className="bg-[#FFFBF0] border border-[#C9A84C]/30 rounded-2xl p-4 space-y-3">
      <p className="text-xs font-bold text-[#8B6914]">Rekening Baru</p>
      {[
        { key: 'bankName', label: 'Nama Bank', placeholder: 'BCA / BNI / Mandiri / BSI' },
        { key: 'accountNumber', label: 'Nomor Rekening', placeholder: '1234567890' },
        { key: 'accountName', label: 'Nama Pemilik Rekening', placeholder: 'PT Umrava Digital' },
      ].map(f => (
        <div key={f.key}>
          <label className="block text-xs font-semibold text-gray-500 mb-1">{f.label}</label>
          <input
            type="text"
            value={form[f.key as keyof typeof form]}
            onChange={e => setForm(s => ({ ...s, [f.key]: e.target.value }))}
            placeholder={f.placeholder}
            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#C9A84C]"
          />
        </div>
      ))}
      <div className="flex gap-2">
        <button onClick={() => setOpen(false)} className="flex-1 py-2 text-sm text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50">Batal</button>
        <button onClick={handle} className="flex-1 py-2 text-sm font-bold text-white bg-[#1B6B3A] rounded-xl hover:bg-[#0D4A28]">Simpan</button>
      </div>
    </div>
  )
}

// ── Manual Payment Row ─────────────────────────────────────────────────────────

function PaymentRow({
  payment, onApprove, onReject,
}: {
  payment: ManualPayment
  onApprove: (id: string, note: string) => void
  onReject: (id: string, note: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [note, setNote] = useState('')
  const [processing, setProcessing] = useState(false)

  const handle = async (action: 'approve' | 'reject') => {
    setProcessing(true)
    try {
      if (action === 'approve') await onApprove(payment.id, note)
      else await onReject(payment.id, note)
    } finally {
      setProcessing(false)
    }
  }

  const statusBadge = {
    pending:  { bg: 'bg-yellow-100 text-yellow-700', icon: <Clock size={11} />, label: 'Menunggu' },
    approved: { bg: 'bg-green-100 text-green-700',  icon: <CheckCheck size={11} />, label: 'Disetujui' },
    rejected: { bg: 'bg-red-100 text-red-700',      icon: <XCircle size={11} />, label: 'Ditolak' },
  }[payment.status]

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={() => payment.status === 'pending' && setExpanded(v => !v)}
        className="w-full flex items-center gap-3 p-4 text-left"
      >
        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
          <Banknote size={18} className="text-gray-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-sm font-bold text-gray-800 truncate">{payment.user_name}</p>
            <span className={cn('flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold', statusBadge.bg)}>
              {statusBadge.icon} {statusBadge.label}
            </span>
          </div>
          <p className="text-xs text-gray-400 truncate">{payment.user_email}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs font-bold text-[#1B6B3A]">{formatRp(payment.amount)}</span>
            {payment.bank_name && <span className="text-xs text-gray-400">via {payment.bank_name}</span>}
            <span className="text-xs text-gray-300">{formatDate(payment.created_at)}</span>
          </div>
        </div>
        {payment.status === 'pending' && (
          <ChevronDown size={16} className={cn('text-gray-400 transition-transform flex-shrink-0', expanded && 'rotate-180')} />
        )}
      </button>

      {payment.status === 'pending' && expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-gray-50 pt-3">
          <div className="bg-gray-50 rounded-xl p-3 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-400">Order ID</span>
              <span className="font-mono text-gray-600">{payment.merchant_order_id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Bank Transfer</span>
              <span className="text-gray-600">{payment.bank_name || '—'}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Catatan Admin (opsional)</label>
            <input
              type="text"
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Contoh: Sudah dikonfirmasi / Dana tidak masuk"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#C9A84C]"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handle('reject')}
              disabled={processing}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-50 disabled:opacity-50 transition-colors"
            >
              <XCircle size={14} /> Tolak
            </button>
            <button
              onClick={() => handle('approve')}
              disabled={processing}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#1B6B3A] hover:bg-[#0D4A28] disabled:opacity-50 transition-colors"
            >
              <CheckCheck size={14} /> Setujui & Aktifkan Premium
            </button>
          </div>
        </div>
      )}

      {payment.status !== 'pending' && payment.admin_note && (
        <div className="px-4 pb-3 text-xs text-gray-400 italic border-t border-gray-50 pt-2">
          Catatan: {payment.admin_note}
        </div>
      )}
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────────

type Tab = 'methods' | 'duitku' | 'transfers'

export default function AdminPaymentPage() {
  const [tab, setTab] = useState<Tab>('methods')
  const [settings, setSettings] = useState<PaymentSettings>({
    merchantCode: '', apiKey: '', mode: 'sandbox',
    gatewayEnabled: true, bankTransferEnabled: false, bankAccounts: [],
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ ok: boolean; channelCount?: number; error?: string } | null>(null)
  const [showKey, setShowKey] = useState(false)
  const [copied, setCopied] = useState(false)

  // Manual payments state
  const [payments, setPayments] = useState<ManualPayment[]>([])
  const [paymentsLoading, setPaymentsLoading] = useState(false)
  const [transferFilter, setTransferFilter] = useState<'pending' | 'all'>('pending')

  useEffect(() => {
    fetch('/api/admin/payment')
      .then(r => r.json())
      .then(d => setSettings({
        merchantCode: d.merchantCode ?? '',
        apiKey: d.apiKey ?? '',
        mode: d.mode ?? 'sandbox',
        gatewayEnabled: d.gatewayEnabled ?? true,
        bankTransferEnabled: d.bankTransferEnabled ?? false,
        bankAccounts: d.bankAccounts ?? [],
      }))
      .catch(() => toast.error('Gagal memuat pengaturan'))
      .finally(() => setLoading(false))
  }, [])

  const loadPayments = useCallback(async () => {
    setPaymentsLoading(true)
    try {
      const res = await fetch(`/api/admin/manual-payments?status=${transferFilter}`)
      const d = await res.json()
      setPayments(d.payments ?? [])
    } catch { toast.error('Gagal memuat daftar transfer') }
    finally { setPaymentsLoading(false) }
  }, [transferFilter])

  useEffect(() => {
    if (tab === 'transfers') loadPayments()
  }, [tab, loadPayments])

  const handleSave = async (partial?: Partial<PaymentSettings>) => {
    setSaving(true)
    setTestResult(null)
    try {
      const payload = partial ?? settings
      const res = await fetch('/api/admin/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Gagal')
      toast.success('Pengaturan tersimpan!')
    } catch {
      toast.error('Gagal menyimpan pengaturan')
    } finally {
      setSaving(false)
    }
  }

  const handleToggle = async (key: 'gatewayEnabled' | 'bankTransferEnabled', value: boolean) => {
    setSettings(s => ({ ...s, [key]: value }))
    await handleSave({ [key]: value })
  }

  const handleTest = async () => {
    if (!settings.merchantCode || !settings.apiKey) {
      toast.error('Isi Merchant Code dan API Key dulu')
      return
    }
    setTesting(true)
    setTestResult(null)
    try {
      const res = await fetch('/api/admin/payment', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ merchantCode: settings.merchantCode, apiKey: settings.apiKey, mode: settings.mode }),
      })
      const d = await res.json()
      setTestResult(d)
      if (d.ok) toast.success(`Koneksi berhasil! ${d.channelCount} metode pembayaran tersedia`)
      else toast.error(`Koneksi gagal: ${d.error}`)
    } catch (e) {
      setTestResult({ ok: false, error: (e as Error).message })
      toast.error('Koneksi gagal')
    } finally {
      setTesting(false)
    }
  }

  const addBankAccount = (acc: BankAccount) => {
    const updated = [...settings.bankAccounts, acc]
    setSettings(s => ({ ...s, bankAccounts: updated }))
  }

  const removeBankAccount = (id: string) => {
    const updated = settings.bankAccounts.filter(a => a.id !== id)
    setSettings(s => ({ ...s, bankAccounts: updated }))
  }

  const saveBankAccounts = () => {
    handleSave({ bankAccounts: settings.bankAccounts })
  }

  const handleApprove = async (id: string, note: string) => {
    const res = await fetch('/api/admin/manual-payments', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action: 'approve', adminNote: note }),
    })
    const d = await res.json()
    if (d.ok) { toast.success('Transfer disetujui — akun premium aktif!'); loadPayments() }
    else toast.error(d.error || 'Gagal menyetujui')
  }

  const handleReject = async (id: string, note: string) => {
    const res = await fetch('/api/admin/manual-payments', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action: 'reject', adminNote: note }),
    })
    const d = await res.json()
    if (d.ok) { toast.success('Transfer ditolak'); loadPayments() }
    else toast.error(d.error || 'Gagal menolak')
  }

  const pendingCount = payments.filter(p => p.status === 'pending').length

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 rounded-full border-2 border-[#1B6B3A] border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900 mb-1">Pengaturan Pembayaran</h1>
        <p className="text-sm text-gray-500">Kelola metode pembayaran, konfigurasi Duitku, dan konfirmasi transfer manual</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-6">
        {([
          { key: 'methods', label: 'Metode Bayar', icon: <ToggleRight size={15} /> },
          { key: 'duitku',  label: 'Konfigurasi Duitku', icon: <CreditCard size={15} /> },
          { key: 'transfers', label: `Transfer Masuk${pendingCount > 0 ? ` (${pendingCount})` : ''}`, icon: <Banknote size={15} /> },
        ] as const).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all',
              tab === t.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ── Tab: Metode Bayar ── */}
      {tab === 'methods' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Aktifkan / Nonaktifkan Metode</h3>
            <div className="space-y-3">
              <Toggle
                enabled={settings.gatewayEnabled}
                onChange={v => handleToggle('gatewayEnabled', v)}
                label="Payment Gateway (Duitku)"
                description="VA Bank, QRIS, GoPay, OVO, ShopeePay, minimarket, dll"
              />
              <Toggle
                enabled={settings.bankTransferEnabled}
                onChange={v => handleToggle('bankTransferEnabled', v)}
                label="Transfer Manual"
                description="User transfer ke rekening Anda, dikonfirmasi manual oleh admin"
              />
            </div>

            {!settings.gatewayEnabled && !settings.bankTransferEnabled && (
              <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-xl text-xs text-orange-700">
                ⚠️ <strong>Semua metode dinonaktifkan</strong> — pengguna tidak bisa melakukan pembayaran.
              </div>
            )}
          </div>

          {/* Bank Accounts */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-1">Rekening Tujuan Transfer</h3>
            <p className="text-xs text-gray-400 mb-4">Ditampilkan ke pengguna saat memilih Transfer Manual</p>

            {settings.bankAccounts.length === 0 && (
              <div className="text-center py-6 text-sm text-gray-400">
                Belum ada rekening. Tambahkan minimal satu rekening jika Transfer Manual diaktifkan.
              </div>
            )}

            <div className="space-y-2 mb-3">
              {settings.bankAccounts.map(acc => (
                <div key={acc.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-[#1B6B3A] flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                    {acc.bankName.slice(0, 3).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800">{acc.bankName}</p>
                    <p className="text-xs font-mono text-gray-600">{acc.accountNumber}</p>
                    <p className="text-xs text-gray-400">{acc.accountName}</p>
                  </div>
                  <button
                    onClick={() => removeBankAccount(acc.id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <BankAccountForm onAdd={addBankAccount} />

            {settings.bankAccounts.length > 0 && (
              <button
                onClick={saveBankAccounts}
                disabled={saving}
                className="w-full mt-3 py-2.5 bg-[#1B6B3A] hover:bg-[#0D4A28] text-white rounded-xl font-bold text-sm transition-colors disabled:opacity-50"
              >
                {saving ? 'Menyimpan...' : 'Simpan Rekening'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Tab: Konfigurasi Duitku ── */}
      {tab === 'duitku' && (
        <div className="space-y-5">
          {/* Mode toggle */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Mode Transaksi</h3>
            <div className="grid grid-cols-2 gap-3">
              {(['sandbox', 'production'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setSettings(s => ({ ...s, mode: m }))}
                  className={cn(
                    'flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all',
                    settings.mode === m
                      ? m === 'production' ? 'border-[#1B6B3A] bg-[#E8F5ED]' : 'border-[#C9A84C] bg-[#FFFBF0]'
                      : 'border-gray-100 hover:border-gray-300'
                  )}
                >
                  <span className="text-2xl">{m === 'sandbox' ? '🧪' : '🚀'}</span>
                  <div className="text-center">
                    <p className="font-bold text-sm capitalize">{m}</p>
                    <p className="text-xs text-gray-400">{m === 'sandbox' ? 'Uji coba' : 'Live'}</p>
                  </div>
                  {settings.mode === m && <CheckCircle2 size={16} className={m === 'production' ? 'text-[#1B6B3A]' : 'text-[#C9A84C]'} />}
                </button>
              ))}
            </div>
            {settings.mode === 'production' && (
              <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-xl text-xs text-orange-700">
                ⚠️ <strong>Mode Production aktif</strong> — transaksi akan diproses secara nyata.
              </div>
            )}
          </div>

          {/* Credentials */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-5">Kredensial Duitku</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Merchant Code</label>
                <input
                  type="text"
                  value={settings.merchantCode}
                  onChange={e => setSettings(s => ({ ...s, merchantCode: e.target.value.trim() }))}
                  placeholder="D22978"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C9A84C] font-mono transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">API Key</label>
                <div className="relative">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={settings.apiKey}
                    onChange={e => setSettings(s => ({ ...s, apiKey: e.target.value.trim() }))}
                    placeholder="••••••••••••••••••••••••••••••••"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm outline-none focus:border-[#C9A84C] font-mono transition-colors"
                  />
                  <button
                    onClick={() => setShowKey(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Webhook */}
          <div className="bg-[#0D4A28] rounded-2xl p-5 text-white">
            <h3 className="font-bold mb-2">🔗 Callback URL Duitku</h3>
            <div className="flex items-center gap-3 bg-black/20 rounded-xl px-4 py-3">
              <code className="flex-1 text-sm text-[#C9A84C] font-mono break-all">{WEBHOOK_URL}</code>
              <button
                onClick={() => { navigator.clipboard.writeText(WEBHOOK_URL); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                className="flex-shrink-0 flex items-center gap-1.5 bg-[#C9A84C] hover:bg-[#b8963d] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
              >
                {copied ? <><Check size={12} /> Disalin</> : <><Copy size={12} /> Salin</>}
              </button>
            </div>
          </div>

          {/* Test result */}
          {testResult && (
            <div className={cn('rounded-2xl p-4 text-sm', testResult.ok ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700')}>
              {testResult.ok
                ? <><CheckCircle2 size={16} className="inline mr-2" />Koneksi berhasil! <strong>{testResult.channelCount}</strong> metode pembayaran aktif.</>
                : <><AlertCircle size={16} className="inline mr-2" />Gagal: {testResult.error}</>
              }
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleTest}
              disabled={testing || !settings.merchantCode || !settings.apiKey}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <RefreshCw size={15} className={testing ? 'animate-spin' : ''} />
              {testing ? 'Menguji...' : 'Test Koneksi'}
            </button>
            <button
              onClick={() => handleSave()}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-base transition-all bg-gray-900 hover:bg-gray-800 text-white disabled:opacity-50"
            >
              <Save size={16} />
              {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
            </button>
          </div>
        </div>
      )}

      {/* ── Tab: Transfer Masuk ── */}
      {tab === 'transfers' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
              {(['pending', 'all'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setTransferFilter(f)}
                  className={cn(
                    'px-4 py-1.5 rounded-lg text-xs font-bold transition-all',
                    transferFilter === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                  )}
                >
                  {f === 'pending' ? 'Menunggu' : 'Semua'}
                </button>
              ))}
            </div>
            <button onClick={loadPayments} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <RefreshCw size={14} className={cn('text-gray-400', paymentsLoading && 'animate-spin')} />
            </button>
          </div>

          {paymentsLoading ? (
            <div className="flex justify-center py-10">
              <div className="w-6 h-6 rounded-full border-2 border-[#1B6B3A] border-t-transparent animate-spin" />
            </div>
          ) : payments.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Banknote size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">{transferFilter === 'pending' ? 'Tidak ada transfer yang menunggu konfirmasi' : 'Belum ada transfer masuk'}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {payments.map(p => (
                <PaymentRow key={p.id} payment={p} onApprove={handleApprove} onReject={handleReject} />
              ))}
            </div>
          )}

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-xs text-blue-600 space-y-1">
            <p className="font-bold">ℹ️ Alur Transfer Manual:</p>
            <ol className="list-decimal list-inside space-y-0.5 text-blue-500">
              <li>Pengguna memilih Transfer Manual di halaman upgrade</li>
              <li>Pengguna transfer ke rekening yang sudah dikonfigurasi</li>
              <li>Admin verifikasi dan klik <strong>Setujui</strong> — akun langsung premium</li>
              <li>Email konfirmasi premium dikirim otomatis ke pengguna</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}

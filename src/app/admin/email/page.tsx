'use client'
import { useState, useEffect, useCallback } from 'react'
import {
  Mail, Key, Send, Eye, EyeOff, CheckCircle2,
  AlertCircle, Loader2, RefreshCw, Copy, ChevronDown, ChevronUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

// ─── Types ────────────────────────────────────────────────────────────────────

type TemplateKey = 'selamat_datang' | 'premium_aktif' | 'reset_password' | 'transaksi_duitku' | 'transfer_manual' | 'broadcast'

interface EmailConfig {
  apiKey: string
  senderName: string
  senderEmail: string
}

interface EmailTemplate {
  label: string
  icon: string
  subject: string
  htmlBody: string
  active: boolean
}

// ─── Default HTML Templates ───────────────────────────────────────────────────

const TPL_HEADER = `
<table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1B6B3A,#0D4A28);padding:40px 32px;text-align:center;">
  <tr><td>
    <div style="font-size:48px;margin-bottom:8px;">🕋</div>
    <h1 style="color:#C9A84C;margin:0 0 4px;font-size:26px;font-family:Arial,sans-serif;">Umrava</h1>
    <p style="color:rgba(255,255,255,0.75);margin:0;font-size:13px;font-family:Arial,sans-serif;">Teman Setia Perjalanan Umrohmu</p>
  </td></tr>
</table>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F5E6C8;padding:16px 32px;text-align:center;">
  <tr><td>
    <p style="font-size:20px;color:#0D4A28;margin:0;line-height:1.8;">السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ</p>
    <p style="font-size:12px;color:#8B6914;margin:4px 0 0;font-style:italic;font-family:Arial,sans-serif;">Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
  </td></tr>
</table>`.trim()

const TPL_FOOTER = `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F5E6C8;padding:20px 32px;text-align:center;border-top:1px solid #E8D5A0;">
  <tr><td>
    <p style="color:#8B6914;font-size:13px;margin:0;font-family:Arial,sans-serif;">
      وَالسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ
    </p>
    <p style="color:#8B6914;font-size:12px;margin:6px 0 0;font-style:italic;font-family:Arial,sans-serif;">Barakallah fiikum 🤲</p>
  </td></tr>
</table>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0D4A28;padding:20px 32px;text-align:center;">
  <tr><td>
    <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0;font-family:Arial,sans-serif;">
      © {{tahun}} Umrava &nbsp;·&nbsp;
      <a href="https://umrava.com" style="color:#C9A84C;text-decoration:none;">umrava.com</a>
      &nbsp;·&nbsp;
      <a href="mailto:info@umrava.com" style="color:#C9A84C;text-decoration:none;">info@umrava.com</a>
    </p>
    <p style="color:rgba(255,255,255,0.3);font-size:11px;margin:4px 0 0;font-family:Arial,sans-serif;">
      Anda menerima email ini karena terdaftar di Umrava.
    </p>
  </td></tr>
</table>`.trim()

function makeHtml(body: string): string {
  return `<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5efe0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5efe0;">
<tr><td align="center" style="padding:30px 16px;">
<table width="600" cellpadding="0" cellspacing="0" style="background:white;border-radius:16px;overflow:hidden;max-width:600px;width:100%;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
<tr><td>
${TPL_HEADER}
${body}
${TPL_FOOTER}
</td></tr>
</table>
</td></tr>
</table>
</body></html>`
}

const DEFAULT_TEMPLATES: Record<TemplateKey, EmailTemplate> = {
  selamat_datang: {
    label: 'Selamat Datang',
    icon: '🎉',
    subject: 'Ahlan Wasahlan, {{nama_user}}! Akun Umrava Anda Siap 🕋',
    active: true,
    htmlBody: makeHtml(`
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px;">
<tr><td>
  <p style="font-size:16px;color:#0D4A28;font-weight:bold;margin:0 0 16px;">Alhamdulillah, {{nama_user}}! 🤲</p>
  <p style="font-size:14px;color:#374151;line-height:1.8;margin:0 0 12px;">
    Akun Umrava Anda telah berhasil dibuat. Selamat bergabung bersama ribuan calon jamaah yang sedang mempersiapkan perjalanan umroh mereka dengan lebih baik.
  </p>
  <p style="font-size:14px;color:#374151;line-height:1.8;margin:0 0 24px;">
    Semoga Allah memudahkan langkah Anda menuju Baitullah. Aamiin. 🕋
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F9F7;border-radius:12px;padding:20px;margin-bottom:24px;">
  <tr><td>
    <p style="font-size:13px;color:#1B6B3A;font-weight:bold;margin:0 0 12px;">✨ Yang bisa Anda nikmati sekarang:</p>
    <p style="font-size:13px;color:#374151;margin:4px 0;line-height:1.7;">📖 Al-Quran lengkap 114 surah + terjemah Indonesia</p>
    <p style="font-size:13px;color:#374151;margin:4px 0;line-height:1.7;">🤲 Bank Doa umroh dengan audio Mishary</p>
    <p style="font-size:13px;color:#374151;margin:4px 0;line-height:1.7;">🕌 Panduan ibadah step-by-step</p>
    <p style="font-size:13px;color:#374151;margin:4px 0;line-height:1.7;">🧭 Kompas kiblat & penanggalan Hijriah</p>
    <p style="font-size:13px;color:#374151;margin:4px 0;line-height:1.7;">✅ Tracker persiapan & perencanaan biaya</p>
  </td></tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" style="text-align:center;margin-bottom:24px;">
  <tr><td>
    <a href="{{link_dashboard}}" style="display:inline-block;background:#1B6B3A;color:white;padding:14px 36px;border-radius:12px;text-decoration:none;font-weight:bold;font-size:15px;font-family:Arial,sans-serif;">
      Mulai Eksplorasi Umrava →
    </a>
  </td></tr>
  </table>

  <p style="font-size:13px;color:#9ca3af;line-height:1.7;margin:0;">
    Jika ada pertanyaan, balas email ini atau hubungi kami di
    <a href="mailto:info@umrava.com" style="color:#1B6B3A;">info@umrava.com</a>
  </p>
</td></tr>
</table>`),
  },

  premium_aktif: {
    label: 'Premium Aktif',
    icon: '💳',
    subject: 'Alhamdulillah! Akses Premium Umrava Anda Telah Aktif 👑',
    active: true,
    htmlBody: makeHtml(`
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px;">
<tr><td>
  <div style="text-align:center;margin-bottom:24px;">
    <div style="display:inline-block;background:#F5E6C8;border-radius:50%;width:72px;height:72px;line-height:72px;font-size:36px;text-align:center;">👑</div>
  </div>

  <p style="font-size:16px;color:#0D4A28;font-weight:bold;margin:0 0 12px;text-align:center;">
    Alhamdulillah, {{nama_user}}!
  </p>
  <p style="font-size:14px;color:#374151;line-height:1.8;margin:0 0 12px;text-align:center;">
    Pembayaran Anda telah dikonfirmasi dan akses <strong style="color:#C9A84C;">Premium Umrava</strong> telah aktif.
    Jazakumullah khairan atas kepercayaan Anda. 🤲
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1B6B3A,#0D4A28);border-radius:12px;padding:20px;margin:20px 0;">
  <tr><td>
    <p style="font-size:12px;color:#C9A84C;font-weight:bold;margin:0 0 8px;text-transform:uppercase;letter-spacing:1px;">Detail Pembayaran</p>
    <p style="font-size:14px;color:white;margin:4px 0;">📅 Tanggal: {{tanggal}}</p>
    <p style="font-size:14px;color:white;margin:4px 0;">💰 Nominal: Rp49.000</p>
    <p style="font-size:14px;color:white;margin:4px 0;">🏆 Paket: Premium Seumur Hidup</p>
    <p style="font-size:14px;color:#C9A84C;margin:4px 0;font-weight:bold;">✅ Status: AKTIF</p>
  </td></tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F9F7;border-radius:12px;padding:20px;margin-bottom:24px;">
  <tr><td>
    <p style="font-size:13px;color:#1B6B3A;font-weight:bold;margin:0 0 12px;">🔓 Fitur Premium yang kini terbuka:</p>
    <p style="font-size:13px;color:#374151;margin:4px 0;line-height:1.7;">☀️ Zikir Pagi & Petang Al-Banna (15 zikir + counter)</p>
    <p style="font-size:13px;color:#374151;margin:4px 0;line-height:1.7;">🎵 Audio murottal Mishary per ayat</p>
    <p style="font-size:13px;color:#374151;margin:4px 0;line-height:1.7;">♾️ Semua update fitur tanpa biaya tambahan</p>
  </td></tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" style="text-align:center;margin-bottom:24px;">
  <tr><td>
    <a href="{{link_premium}}" style="display:inline-block;background:#C9A84C;color:white;padding:14px 36px;border-radius:12px;text-decoration:none;font-weight:bold;font-size:15px;font-family:Arial,sans-serif;">
      Akses Fitur Premium Sekarang →
    </a>
  </td></tr>
  </table>

  <p style="font-size:13px;color:#9ca3af;line-height:1.7;margin:0;text-align:center;">
    Semoga Umrava menjadi teman setia perjalanan umroh Anda. 🕋
  </p>
</td></tr>
</table>`),
  },

  reset_password: {
    label: 'Reset Password',
    icon: '🔑',
    subject: 'Reset Password Akun Umrava Anda 🔑',
    active: true,
    htmlBody: makeHtml(`
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px;">
<tr><td>
  <div style="text-align:center;margin-bottom:20px;">
    <div style="display:inline-block;background:#FEF3C7;border-radius:50%;width:64px;height:64px;line-height:64px;font-size:32px;text-align:center;">🔑</div>
  </div>
  <p style="font-size:16px;color:#0D4A28;font-weight:bold;margin:0 0 12px;font-family:Arial,sans-serif;">{{nama_user}}, ada permintaan reset password</p>
  <p style="font-size:14px;color:#374151;line-height:1.8;margin:0 0 16px;font-family:Arial,sans-serif;">
    Kami menerima permintaan untuk mereset password akun Umrava Anda. Klik tombol di bawah untuk membuat password baru.
  </p>
  <p style="font-size:13px;color:#6B7280;line-height:1.7;margin:0 0 24px;font-family:Arial,sans-serif;">
    ⏰ Link ini hanya berlaku selama <strong>1 jam</strong>. Jika Anda tidak meminta reset password, abaikan email ini — akun Anda tetap aman.
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" style="text-align:center;margin-bottom:24px;">
  <tr><td>
    <a href="{{reset_url}}" style="display:inline-block;background:#1B6B3A;color:white;padding:14px 36px;border-radius:12px;text-decoration:none;font-weight:bold;font-size:15px;font-family:Arial,sans-serif;">
      Reset Password Sekarang →
    </a>
  </td></tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F9F7;border-radius:12px;padding:16px;margin-bottom:16px;">
  <tr><td>
    <p style="font-size:12px;color:#6B7280;margin:0 0 6px;font-family:Arial,sans-serif;">Atau salin link berikut ke browser Anda:</p>
    <p style="font-size:11px;color:#1B6B3A;word-break:break-all;margin:0;font-family:monospace;">{{reset_url}}</p>
  </td></tr>
  </table>

  <p style="font-size:13px;color:#9ca3af;text-align:center;line-height:1.7;font-family:Arial,sans-serif;">
    Semoga Allah senantiasa menjaga dan melindungi Anda. 🤲<br>Barakallah fiikum.
  </p>
</td></tr>
</table>`),
  },

  transaksi_duitku: {
    label: 'Transaksi Duitku',
    icon: '🧾',
    subject: '[Umrava] Pesanan {{order_id}} — Selesaikan Pembayaran Anda',
    active: true,
    htmlBody: makeHtml(`
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px;">
<tr><td>
  <div style="text-align:center;margin-bottom:20px;">
    <div style="display:inline-block;background:#E8F5EE;border-radius:50%;width:64px;height:64px;line-height:64px;font-size:32px;text-align:center;">🧾</div>
  </div>
  <p style="font-size:16px;color:#0D4A28;font-weight:bold;margin:0 0 8px;text-align:center;font-family:Arial,sans-serif;">Pesanan Anda Berhasil Dibuat</p>
  <p style="font-size:14px;color:#374151;line-height:1.8;margin:0 0 20px;text-align:center;font-family:Arial,sans-serif;">
    Halo <strong>{{nama_user}}</strong>, segera selesaikan pembayaran sebelum batas waktu agar akses Premium langsung aktif.
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1B6B3A,#0D4A28);border-radius:12px;padding:20px;margin:0 0 20px;">
  <tr><td>
    <p style="font-size:11px;color:#C9A84C;font-weight:bold;margin:0 0 10px;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">Detail Transaksi</p>
    <p style="font-size:13px;color:white;margin:4px 0;font-family:Arial,sans-serif;">📋 No. Order: <strong>{{order_id}}</strong></p>
    <p style="font-size:13px;color:white;margin:4px 0;font-family:Arial,sans-serif;">💳 Metode: {{metode}}</p>
    <p style="font-size:13px;color:white;margin:4px 0;font-family:Arial,sans-serif;">💰 Total: <strong>Rp49.000</strong></p>
    <p style="font-size:13px;color:white;margin:4px 0;font-family:Arial,sans-serif;">🏧 No. VA / Kode: <strong style="color:#C9A84C;">{{va_number}}</strong></p>
    <p style="font-size:13px;color:#FFD700;margin:8px 0 0;font-family:Arial,sans-serif;">⏰ Batas Bayar: <strong>{{batas_waktu}}</strong></p>
  </td></tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" style="text-align:center;margin-bottom:20px;">
  <tr><td>
    <a href="{{payment_url}}" style="display:inline-block;background:#C9A84C;color:white;padding:14px 36px;border-radius:12px;text-decoration:none;font-weight:bold;font-size:15px;font-family:Arial,sans-serif;">
      Bayar Sekarang →
    </a>
  </td></tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFFBF0;border:1px solid #F5E6C8;border-radius:12px;padding:16px;margin-bottom:16px;">
  <tr><td>
    <p style="font-size:13px;color:#8B6914;margin:0;line-height:1.7;font-family:Arial,sans-serif;">
      ℹ️ Akses Premium akan <strong>otomatis aktif</strong> segera setelah pembayaran terverifikasi. Hubungi kami via WhatsApp <a href="https://wa.me/6281313585848" style="color:#1B6B3A;font-weight:bold;">081313585848</a> jika ada kendala.
    </p>
  </td></tr>
  </table>

  <p style="font-size:13px;color:#9ca3af;text-align:center;line-height:1.7;font-family:Arial,sans-serif;">
    Semoga dimudahkan perjalanan umrohnya. 🕋
  </p>
</td></tr>
</table>`),
  },

  transfer_manual: {
    label: 'Transfer Manual',
    icon: '🏦',
    subject: '[Umrava] Instruksi Transfer Manual — Order {{order_id}}',
    active: true,
    htmlBody: makeHtml(`
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px;">
<tr><td>
  <div style="text-align:center;margin-bottom:20px;">
    <div style="display:inline-block;background:#E8F5EE;border-radius:50%;width:64px;height:64px;line-height:64px;font-size:32px;text-align:center;">🏦</div>
  </div>
  <p style="font-size:16px;color:#0D4A28;font-weight:bold;margin:0 0 8px;text-align:center;font-family:Arial,sans-serif;">Instruksi Transfer Manual</p>
  <p style="font-size:14px;color:#374151;line-height:1.8;margin:0 0 20px;text-align:center;font-family:Arial,sans-serif;">
    Halo <strong>{{nama_user}}</strong>, silakan transfer ke rekening berikut dan konfirmasi ke admin kami.
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1B6B3A,#0D4A28);border-radius:12px;padding:20px;margin:0 0 20px;">
  <tr><td>
    <p style="font-size:11px;color:#C9A84C;font-weight:bold;margin:0 0 10px;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">Rekening Tujuan</p>
    <p style="font-size:15px;color:white;margin:4px 0;font-weight:bold;font-family:Arial,sans-serif;">🏦 {{bank_name}}</p>
    <p style="font-size:20px;color:#C9A84C;margin:6px 0;font-weight:bold;letter-spacing:2px;font-family:monospace;">{{account_number}}</p>
    <p style="font-size:13px;color:rgba(255,255,255,0.85);margin:4px 0;font-family:Arial,sans-serif;">a.n. {{account_name}}</p>
    <p style="font-size:14px;color:white;margin:12px 0 4px;font-weight:bold;font-family:Arial,sans-serif;">💰 Nominal: <span style="color:#C9A84C;">Rp49.000</span></p>
    <p style="font-size:12px;color:rgba(255,255,255,0.7);margin:4px 0;font-family:Arial,sans-serif;">⚠️ Transfer tepat sesuai nominal agar mudah diverifikasi</p>
  </td></tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F9F7;border-radius:12px;padding:16px;margin-bottom:20px;">
  <tr><td>
    <p style="font-size:13px;color:#1B6B3A;font-weight:bold;margin:0 0 8px;font-family:Arial,sans-serif;">📋 Detail Pesanan</p>
    <p style="font-size:13px;color:#374151;margin:4px 0;font-family:Arial,sans-serif;">No. Order: <strong>{{order_id}}</strong></p>
    <p style="font-size:13px;color:#374151;margin:4px 0;font-family:Arial,sans-serif;">Paket: Premium Seumur Hidup</p>
    <p style="font-size:13px;color:#374151;margin:4px 0;font-family:Arial,sans-serif;">Tanggal: {{tanggal}}</p>
  </td></tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" style="text-align:center;margin-bottom:20px;">
  <tr><td>
    <a href="https://wa.me/6281313585848" style="display:inline-block;background:#25D366;color:white;padding:14px 36px;border-radius:12px;text-decoration:none;font-weight:bold;font-size:15px;font-family:Arial,sans-serif;">
      Konfirmasi via WhatsApp →
    </a>
  </td></tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFFBF0;border:1px solid #F5E6C8;border-radius:12px;padding:16px;margin-bottom:16px;">
  <tr><td>
    <p style="font-size:13px;color:#8B6914;margin:0;line-height:1.7;font-family:Arial,sans-serif;">
      ℹ️ Setelah transfer, konfirmasi ke WhatsApp kami dengan menyertakan <strong>bukti transfer</strong> dan <strong>No. Order {{order_id}}</strong>. Akses Premium diaktifkan dalam 1×24 jam hari kerja.
    </p>
  </td></tr>
  </table>

  <p style="font-size:13px;color:#9ca3af;text-align:center;line-height:1.7;font-family:Arial,sans-serif;">
    Semoga dimudahkan perjalanan umrohnya. 🕋
  </p>
</td></tr>
</table>`),
  },

  broadcast: {
    label: 'Broadcast',
    icon: '📢',
    subject: '📢 [Umrava] {{judul_broadcast}}',
    active: true,
    htmlBody: makeHtml(`
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px;">
<tr><td>
  <p style="font-size:16px;color:#0D4A28;font-weight:bold;margin:0 0 16px;">Bismillahirrahmanirrahim,</p>
  <p style="font-size:14px;color:#374151;line-height:1.8;margin:0 0 16px;">
    Sahabat Umrava yang dirahmati Allah,
  </p>
  <p style="font-size:14px;color:#374151;line-height:1.8;margin:0 0 16px;">
    {{isi_broadcast}}
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" style="text-align:center;margin:24px 0;">
  <tr><td>
    <a href="{{link_dashboard}}" style="display:inline-block;background:#1B6B3A;color:white;padding:14px 36px;border-radius:12px;text-decoration:none;font-weight:bold;font-size:15px;font-family:Arial,sans-serif;">
      Buka Umrava →
    </a>
  </td></tr>
  </table>

  <p style="font-size:13px;color:#9ca3af;line-height:1.7;margin:0;">
    Tim Umrava<br>
    <a href="mailto:info@umrava.com" style="color:#1B6B3A;">info@umrava.com</a>
  </p>
</td></tr>
</table>`),
  },
}

const TEMPLATE_VARS: Record<TemplateKey, { key: string; desc: string }[]> = {
  selamat_datang: [
    { key: 'nama_user', desc: 'Nama lengkap user' },
    { key: 'email', desc: 'Email user' },
    { key: 'tanggal', desc: 'Tanggal hari ini' },
    { key: 'link_dashboard', desc: 'Link ke dashboard' },
    { key: 'tahun', desc: 'Tahun sekarang' },
  ],
  premium_aktif: [
    { key: 'nama_user', desc: 'Nama lengkap user' },
    { key: 'email', desc: 'Email user' },
    { key: 'tanggal', desc: 'Tanggal transaksi' },
    { key: 'link_premium', desc: 'Link ke fitur premium' },
    { key: 'tahun', desc: 'Tahun sekarang' },
  ],
  reset_password: [
    { key: 'nama_user', desc: 'Nama user' },
    { key: 'email', desc: 'Email user' },
    { key: 'reset_url', desc: 'Link reset password (otomatis dari sistem)' },
    { key: 'tahun', desc: 'Tahun sekarang' },
  ],
  transaksi_duitku: [
    { key: 'nama_user', desc: 'Nama lengkap user' },
    { key: 'order_id', desc: 'No. order (UV-XXXXXXXX-...)' },
    { key: 'metode', desc: 'Metode bayar (Virtual Account, QRIS, dll)' },
    { key: 'va_number', desc: 'Nomor VA / kode bayar (jika ada)' },
    { key: 'payment_url', desc: 'Link halaman pembayaran Duitku' },
    { key: 'batas_waktu', desc: 'Batas waktu bayar (24 jam)' },
  ],
  transfer_manual: [
    { key: 'nama_user', desc: 'Nama lengkap user' },
    { key: 'order_id', desc: 'No. order (MT-XXXXXXXX-...)' },
    { key: 'bank_name', desc: 'Nama bank tujuan transfer' },
    { key: 'account_number', desc: 'Nomor rekening tujuan' },
    { key: 'account_name', desc: 'Nama pemilik rekening (a.n.)' },
    { key: 'tanggal', desc: 'Tanggal pesanan dibuat' },
  ],
  broadcast: [
    { key: 'judul_broadcast', desc: 'Judul broadcast' },
    { key: 'isi_broadcast', desc: 'Isi pesan broadcast' },
    { key: 'link_dashboard', desc: 'Link ke dashboard' },
    { key: 'tahun', desc: 'Tahun sekarang' },
  ],
}

const STORAGE_KEY = 'umrava_email_settings'

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminEmailPage() {
  const [activeTab, setActiveTab] = useState<'konfigurasi' | 'template'>('konfigurasi')
  const [activeTemplate, setActiveTemplate] = useState<TemplateKey>('selamat_datang')

  const [config, setConfig] = useState<EmailConfig>({
    apiKey: '',
    senderName: 'Umrava',
    senderEmail: 'info@umrava.com',
  })
  const [showKey, setShowKey] = useState(false)
  const [templates, setTemplates] = useState<Record<TemplateKey, EmailTemplate>>(DEFAULT_TEMPLATES)

  const [testEmail, setTestEmail] = useState('')
  const [testing, setTesting] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [connStatus, setConnStatus] = useState<'idle' | 'ok' | 'fail'>('idle')
  const [showPreview, setShowPreview] = useState(false)
  const [showVars, setShowVars] = useState(false)

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const { config: c, templates: t } = JSON.parse(saved)
        if (c) setConfig(c)
        if (t) setTemplates(prev => ({ ...prev, ...t }))
      }
    } catch {}
  }, [])

  const saveToStorage = useCallback((newConfig: EmailConfig, newTemplates: Record<TemplateKey, EmailTemplate>) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ config: newConfig, templates: newTemplates }))
  }, [])

  const handleSaveConfig = () => {
    saveToStorage(config, templates)
    toast.success('Konfigurasi berhasil disimpan')
  }

  const handleSaveTemplate = () => {
    saveToStorage(config, templates)
    toast.success(`Template "${templates[activeTemplate].label}" berhasil disimpan`)
  }

  const handleResetTemplate = () => {
    if (!confirm('Reset template ke default?')) return
    setTemplates(prev => ({ ...prev, [activeTemplate]: DEFAULT_TEMPLATES[activeTemplate] }))
    toast.info('Template direset ke default')
  }

  const updateTemplate = (key: keyof EmailTemplate, value: string | boolean) => {
    setTemplates(prev => ({
      ...prev,
      [activeTemplate]: { ...prev[activeTemplate], [key]: value },
    }))
  }

  const handleTestConnection = async () => {
    setConnecting(true)
    setConnStatus('idle')
    try {
      const res = await fetch('/api/admin/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'test_connection', apiKey: config.apiKey || undefined }),
      })
      const data = await res.json()
      if (data.success) {
        setConnStatus('ok')
        toast.success('Berhasil terhubung ke Mailketing!')
      } else {
        setConnStatus('fail')
        toast.error(data.message || 'Koneksi gagal')
      }
    } catch {
      setConnStatus('fail')
      toast.error('Gagal menghubungi server')
    } finally {
      setConnecting(false)
    }
  }

  const handleSendTest = async () => {
    if (!testEmail.trim()) { toast.error('Masukkan email tujuan test'); return }
    setTesting(true)
    try {
      const res = await fetch('/api/admin/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_test',
          apiKey: config.apiKey || undefined,
          senderName: config.senderName,
          senderEmail: config.senderEmail,
          to: testEmail,
          toName: 'Tester Umrava',
          subject: templates[activeTemplate].subject,
          htmlBody: templates[activeTemplate].htmlBody,
        }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message || data.error || 'Gagal kirim email')
      }
    } catch {
      toast.error('Gagal menghubungi server')
    } finally {
      setTesting(false)
    }
  }

  const tpl = templates[activeTemplate]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center">
          <Mail size={22} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900">Pengaturan Email</h1>
          <p className="text-sm text-gray-500">Kelola koneksi Mailketing & template notifikasi</p>
        </div>
        <div className="ml-auto">
          <div className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold',
            connStatus === 'ok' ? 'bg-green-50 text-green-700' :
              connStatus === 'fail' ? 'bg-red-50 text-red-600' :
                'bg-gray-100 text-gray-500'
          )}>
            {connStatus === 'ok' ? <CheckCircle2 size={13} /> :
              connStatus === 'fail' ? <AlertCircle size={13} /> :
                <Mail size={13} />}
            {connStatus === 'ok' ? 'Terhubung' : connStatus === 'fail' ? 'Tidak terhubung' : 'Mailketing'}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        {(['konfigurasi', 'template'] as const).map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={cn(
              'px-5 py-2 rounded-lg text-sm font-semibold transition-all',
              activeTab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {t === 'konfigurasi' ? '⚙️ Konfigurasi API' : '✉️ Template Email'}
          </button>
        ))}
      </div>

      {/* ── Tab: Konfigurasi ── */}
      {activeTab === 'konfigurasi' && (
        <div className="space-y-6">
          {/* API Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
              <Key size={16} className="text-blue-500" /> Mailketing API Key
            </h2>
            <p className="text-xs text-gray-400 mb-4">
              Dapatkan API key dari dashboard Mailketing → Settings → API Keys.
              Untuk keamanan maksimal, simpan sebagai env var <code className="bg-gray-100 px-1 rounded">MAILKETING_API_KEY</code> di Vercel.
            </p>

            <div className="space-y-4">
              {/* API Key */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">API Key</label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      type={showKey ? 'text' : 'password'}
                      value={config.apiKey}
                      onChange={e => setConfig(p => ({ ...p, apiKey: e.target.value }))}
                      placeholder="mk_live_xxxxxxxxxxxxxxxxxxxx"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 pr-10 font-mono"
                    />
                    <button
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showKey ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  <button
                    onClick={handleTestConnection}
                    disabled={connecting}
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-colors"
                  >
                    {connecting ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                    Test Koneksi
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 mt-1.5">
                  Kosongkan jika sudah set di Vercel env vars. API key di form hanya untuk test lokal.
                </p>
              </div>

              {/* Sender info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nama Pengirim</label>
                  <input
                    value={config.senderName}
                    onChange={e => setConfig(p => ({ ...p, senderName: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Pengirim</label>
                  <input
                    value={config.senderEmail}
                    onChange={e => setConfig(p => ({ ...p, senderEmail: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 font-mono"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveConfig}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                <CheckCircle2 size={15} /> Simpan Konfigurasi
              </button>
            </div>
          </div>

          {/* Env var guide */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <p className="font-semibold text-amber-800 text-sm mb-3 flex items-center gap-2">
              <AlertCircle size={16} /> Cara Setup Env Variable di Vercel
            </p>
            <ol className="text-xs text-amber-700 space-y-2">
              <li className="flex gap-2"><span className="font-bold">1.</span> Buka Vercel Dashboard → Project Umrava → Settings → Environment Variables</li>
              <li className="flex gap-2"><span className="font-bold">2.</span> Tambah variable baru:</li>
            </ol>
            <div className="mt-3 bg-amber-100 rounded-xl p-3 font-mono text-xs text-amber-900 flex items-center justify-between">
              <div>
                <div>MAILKETING_API_KEY = mk_live_xxxxxxxxxx</div>
              </div>
              <button
                onClick={() => { navigator.clipboard.writeText('MAILKETING_API_KEY'); toast.success('Disalin!') }}
                className="p-1 hover:text-amber-600"
              >
                <Copy size={13} />
              </button>
            </div>
            <ol className="text-xs text-amber-700 space-y-2 mt-2" start={3}>
              <li className="flex gap-2"><span className="font-bold">3.</span> Set untuk Environment: <strong>Production</strong> dan <strong>Development</strong></li>
              <li className="flex gap-2"><span className="font-bold">4.</span> Redeploy project agar env var aktif</li>
            </ol>
          </div>

          {/* Trigger guide */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-3">📨 Kapan Email Otomatis Dikirim?</h3>
            <div className="space-y-3">
              {[
                { event: 'User Mendaftar', template: 'Selamat Datang', trigger: 'Auto saat registrasi berhasil' },
                { event: 'Buat Transaksi Duitku', template: 'Transaksi Duitku', trigger: 'Auto saat user memilih metode & buat transaksi' },
                { event: 'Transfer Manual', template: 'Transfer Manual', trigger: 'Auto saat user submit order transfer bank' },
                { event: 'Pembayaran Berhasil', template: 'Premium Aktif', trigger: 'Auto saat webhook Duitku / admin approve transfer' },
                { event: 'Lupa Password', template: 'Reset Password', trigger: 'Auto saat user klik "Lupa Password"' },
                { event: 'Broadcast Manual', template: 'Broadcast', trigger: 'Dikirim manual dari halaman ini' },
              ].map(row => (
                <div key={row.event} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-sm">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{row.event}</p>
                    <p className="text-xs text-gray-400">{row.trigger}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">{row.template}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Template ── */}
      {activeTab === 'template' && (
        <div className="space-y-6">
          {/* Template selector */}
          <div className="flex gap-3 flex-wrap">
            {(Object.keys(templates) as TemplateKey[]).map(key => (
              <button
                key={key}
                onClick={() => { setActiveTemplate(key); setShowPreview(false) }}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all',
                  activeTemplate === key
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
                )}
              >
                {templates[key].icon} {templates[key].label}
                {key === 'reset_password' && (
                  <span className="text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded font-bold">AUTO</span>
                )}
                {key !== 'reset_password' && (templates[key].active
                  ? <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  : <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                )}
              </button>
            ))}
          </div>

          {/* Template editor */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{tpl.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900">Template: {tpl.label}</h3>
                  <p className="text-xs text-gray-400">Edit subject & isi email</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Active toggle */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-xs text-gray-500">Aktif</span>
                  <div
                    onClick={() => updateTemplate('active', !tpl.active)}
                    className={cn(
                      'w-10 h-5 rounded-full transition-colors relative cursor-pointer',
                      tpl.active ? 'bg-green-500' : 'bg-gray-200'
                    )}
                  >
                    <div className={cn(
                      'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all',
                      tpl.active ? 'left-5' : 'left-0.5'
                    )} />
                  </div>
                </label>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Subject Email</label>
                <input
                  value={tpl.subject}
                  onChange={e => updateTemplate('subject', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                  placeholder="Masukkan subject email..."
                />
              </div>

              {/* Variables reference */}
              <div>
                <button
                  onClick={() => setShowVars(!showVars)}
                  className="flex items-center gap-2 text-xs text-blue-600 font-semibold mb-2 hover:underline"
                >
                  {showVars ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  Variabel template tersedia
                </button>
                {showVars && (
                  <div className="bg-blue-50 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {TEMPLATE_VARS[activeTemplate].map(v => (
                      <button
                        key={v.key}
                        onClick={() => {
                          navigator.clipboard.writeText(`{{${v.key}}}`)
                          toast.success(`{{${v.key}}} disalin`)
                        }}
                        className="text-left"
                      >
                        <code className="text-blue-700 text-xs font-mono bg-white border border-blue-100 px-2 py-1 rounded-lg block hover:bg-blue-100 transition-colors">
                          {`{{${v.key}}}`}
                        </code>
                        <span className="text-[10px] text-blue-500 mt-0.5 block">{v.desc}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* HTML Body */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-gray-600">HTML Body Email</label>
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center gap-1.5 text-xs text-purple-600 font-semibold hover:underline"
                  >
                    <Eye size={13} /> {showPreview ? 'Sembunyikan' : 'Pratinjau'}
                  </button>
                </div>

                {!showPreview ? (
                  <textarea
                    value={tpl.htmlBody}
                    onChange={e => updateTemplate('htmlBody', e.target.value)}
                    rows={16}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-xs font-mono outline-none focus:border-blue-400 resize-y text-gray-700"
                    placeholder="Masukkan HTML email..."
                    spellCheck={false}
                  />
                ) : (
                  <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                    <div className="bg-gray-100 px-4 py-2 text-xs text-gray-500 flex items-center gap-2">
                      <Eye size={12} /> Pratinjau email (variabel tidak disubstitusi)
                    </div>
                    <iframe
                      srcDoc={tpl.htmlBody}
                      className="w-full"
                      style={{ height: '500px', border: 'none' }}
                      sandbox="allow-same-origin"
                      title="Email Preview"
                    />
                  </div>
                )}
              </div>

              {/* Test send */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-600 mb-3">🧪 Kirim Email Test</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={testEmail}
                    onChange={e => setTestEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendTest()}
                    placeholder="kirim-ke@email.com"
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 bg-white"
                  />
                  <button
                    onClick={handleSendTest}
                    disabled={testing || !testEmail.trim()}
                    className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-colors"
                  >
                    {testing ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                    Kirim Test
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 mt-2">
                  Variabel akan diisi dengan data dummy saat test. Pastikan API key sudah diset.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-2 border-t border-gray-50">
                <button
                  onClick={handleSaveTemplate}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  <CheckCircle2 size={15} /> Simpan Template
                </button>
                <button
                  onClick={handleResetTemplate}
                  className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl text-sm font-medium transition-colors"
                >
                  <RefreshCw size={14} /> Reset Default
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

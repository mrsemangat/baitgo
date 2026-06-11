// Server-side accessible default email templates
// Used by API routes — tidak bergantung localStorage

export interface EmailPayload {
  to: string
  toName: string
  subject: string
  html: string
  senderName?: string
  senderEmail?: string
}

const HEADER = `
<table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1B6B3A,#0D4A28);">
<tr><td style="padding:40px 32px;text-align:center;">
  <div style="font-size:48px;margin-bottom:8px;">🕋</div>
  <h1 style="color:#C9A84C;margin:0 0 4px;font-size:24px;font-family:Arial,sans-serif;">Umrava</h1>
  <p style="color:rgba(255,255,255,0.75);margin:0;font-size:13px;font-family:Arial,sans-serif;">Teman Setia Perjalanan Umrohmu</p>
</td></tr>
</table>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F5E6C8;">
<tr><td style="padding:16px 32px;text-align:center;">
  <p style="font-size:20px;color:#0D4A28;margin:0;line-height:1.8;font-family:'Traditional Arabic',serif;">السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ</p>
  <p style="font-size:12px;color:#8B6914;margin:4px 0 0;font-style:italic;font-family:Arial,sans-serif;">Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
</td></tr>
</table>`

const FOOTER = `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F5E6C8;border-top:1px solid #E8D5A0;">
<tr><td style="padding:16px 32px;text-align:center;">
  <p style="color:#8B6914;font-size:13px;margin:0;font-family:Arial,sans-serif;">وَالسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ</p>
  <p style="color:#8B6914;font-size:12px;margin:6px 0 0;font-style:italic;font-family:Arial,sans-serif;">Barakallah fiikum 🤲</p>
</td></tr>
</table>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0D4A28;">
<tr><td style="padding:20px 32px;text-align:center;">
  <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0;font-family:Arial,sans-serif;">
    © 2026 Umrava &nbsp;·&nbsp;
    <a href="https://umrava.com" style="color:#C9A84C;text-decoration:none;">umrava.com</a>
    &nbsp;·&nbsp;
    <a href="mailto:info@umrava.com" style="color:#C9A84C;text-decoration:none;">info@umrava.com</a>
  </p>
  <p style="color:rgba(255,255,255,0.3);font-size:11px;margin:4px 0 0;font-family:Arial,sans-serif;">
    Anda menerima email ini karena terdaftar di Umrava.
  </p>
</td></tr>
</table>`

function wrap(body: string): string {
  return `<!DOCTYPE html><html lang="id">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5efe0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5efe0;">
<tr><td align="center" style="padding:30px 16px;">
<table width="600" cellpadding="0" cellspacing="0" style="background:white;border-radius:16px;overflow:hidden;max-width:600px;width:100%;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
<tr><td>
${HEADER}
${body}
${FOOTER}
</td></tr>
</table>
</td></tr>
</table>
</body></html>`
}

function inject(template: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce((t, [k, v]) => t.replaceAll(`{{${k}}}`, v), template)
}

// ─── Template: Selamat Datang ─────────────────────────────────────────────────

const WELCOME_BODY = `
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px;">
<tr><td>
  <p style="font-size:16px;color:#0D4A28;font-weight:bold;margin:0 0 16px;font-family:Arial,sans-serif;">Alhamdulillah, {{nama_user}}! 🤲</p>
  <p style="font-size:14px;color:#374151;line-height:1.8;margin:0 0 12px;font-family:Arial,sans-serif;">
    Akun Umrava Anda telah berhasil dibuat. Selamat bergabung bersama ribuan calon jamaah yang mempersiapkan perjalanan umroh lebih baik.
  </p>
  <p style="font-size:14px;color:#374151;line-height:1.8;margin:0 0 24px;font-family:Arial,sans-serif;">
    Semoga Allah memudahkan langkah Anda menuju Baitullah. Aamiin. 🕋
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F9F7;border-radius:12px;padding:20px;margin-bottom:24px;">
  <tr><td>
    <p style="font-size:13px;color:#1B6B3A;font-weight:bold;margin:0 0 12px;font-family:Arial,sans-serif;">✨ Yang bisa Anda nikmati sekarang:</p>
    <p style="font-size:13px;color:#374151;margin:4px 0;font-family:Arial,sans-serif;">📖 Al-Quran lengkap 114 surah + terjemah & audio Mishary</p>
    <p style="font-size:13px;color:#374151;margin:4px 0;font-family:Arial,sans-serif;">🤲 Bank Doa umroh lengkap dengan audio Arab</p>
    <p style="font-size:13px;color:#374151;margin:4px 0;font-family:Arial,sans-serif;">🧭 Kompas kiblat real-time + kalender Hijriah</p>
    <p style="font-size:13px;color:#374151;margin:4px 0;font-family:Arial,sans-serif;">🕌 Panduan ibadah step-by-step dari ihram hingga tahallul</p>
    <p style="font-size:13px;color:#374151;margin:4px 0;font-family:Arial,sans-serif;">✅ Tracker persiapan & checklist keberangkatan</p>
  </td></tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" style="text-align:center;margin-bottom:24px;">
  <tr><td>
    <a href="https://umrava.com/dashboard" style="display:inline-block;background:#1B6B3A;color:white;padding:14px 36px;border-radius:12px;text-decoration:none;font-weight:bold;font-size:15px;font-family:Arial,sans-serif;">
      Mulai Eksplorasi Umrava →
    </a>
  </td></tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFFBF0;border:1px solid #F5E6C8;border-radius:12px;padding:16px;margin-bottom:16px;">
  <tr><td>
    <p style="font-size:13px;color:#8B6914;margin:0;font-family:Arial,sans-serif;">
      👑 <strong>Upgrade ke Premium</strong> untuk akses Zikir Pagi & Petang, semua fitur lengkap, dan update seumur hidup — hanya <strong>Rp49.000 sekali bayar</strong>.
    </p>
    <p style="margin:8px 0 0;text-align:center;font-family:Arial,sans-serif;">
      <a href="https://umrava.com/dashboard/upgrade" style="font-size:13px;color:#C9A84C;font-weight:bold;text-decoration:none;">Upgrade Sekarang →</a>
    </p>
  </td></tr>
  </table>

  <p style="font-size:13px;color:#9ca3af;line-height:1.7;margin:0;font-family:Arial,sans-serif;">
    Ada pertanyaan? Balas email ini atau hubungi kami di
    <a href="mailto:info@umrava.com" style="color:#1B6B3A;">info@umrava.com</a>
  </p>
</td></tr>
</table>`

// ─── Template: Premium Aktif ──────────────────────────────────────────────────

const PREMIUM_BODY = `
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px;">
<tr><td>
  <div style="text-align:center;margin-bottom:20px;">
    <div style="display:inline-block;background:#F5E6C8;border-radius:50%;width:64px;height:64px;line-height:64px;font-size:32px;text-align:center;">👑</div>
  </div>
  <p style="font-size:16px;color:#0D4A28;font-weight:bold;margin:0 0 12px;text-align:center;font-family:Arial,sans-serif;">Alhamdulillah, {{nama_user}}!</p>
  <p style="font-size:14px;color:#374151;line-height:1.8;margin:0 0 16px;text-align:center;font-family:Arial,sans-serif;">
    Pembayaran Anda telah dikonfirmasi dan akses <strong style="color:#C9A84C;">Premium Umrava</strong> telah aktif. Jazakumullah khairan. 🤲
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1B6B3A,#0D4A28);border-radius:12px;padding:20px;margin:16px 0;">
  <tr><td>
    <p style="font-size:11px;color:#C9A84C;font-weight:bold;margin:0 0 8px;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">Detail Pembayaran</p>
    <p style="font-size:13px;color:white;margin:4px 0;font-family:Arial,sans-serif;">📅 Tanggal: {{tanggal}}</p>
    <p style="font-size:13px;color:white;margin:4px 0;font-family:Arial,sans-serif;">💰 Nominal: Rp49.000</p>
    <p style="font-size:13px;color:white;margin:4px 0;font-family:Arial,sans-serif;">🏆 Paket: Premium Seumur Hidup</p>
    <p style="font-size:13px;color:#C9A84C;margin:4px 0;font-weight:bold;font-family:Arial,sans-serif;">✅ Status: AKTIF</p>
  </td></tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F9F7;border-radius:12px;padding:16px;margin-bottom:24px;">
  <tr><td>
    <p style="font-size:13px;color:#1B6B3A;font-weight:bold;margin:0 0 10px;font-family:Arial,sans-serif;">🔓 Fitur Premium yang kini terbuka:</p>
    <p style="font-size:13px;color:#374151;margin:4px 0;font-family:Arial,sans-serif;">☀️ Zikir Pagi & Petang Al-Banna (15 zikir + counter)</p>
    <p style="font-size:13px;color:#374151;margin:4px 0;font-family:Arial,sans-serif;">🎵 Audio murottal Mishary per ayat Al-Quran</p>
    <p style="font-size:13px;color:#374151;margin:4px 0;font-family:Arial,sans-serif;">♾️ Semua update fitur tanpa biaya tambahan</p>
  </td></tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" style="text-align:center;margin-bottom:16px;">
  <tr><td>
    <a href="https://umrava.com/dashboard/zikir" style="display:inline-block;background:#C9A84C;color:white;padding:14px 36px;border-radius:12px;text-decoration:none;font-weight:bold;font-size:15px;font-family:Arial,sans-serif;">
      Akses Fitur Premium Sekarang →
    </a>
  </td></tr>
  </table>

  <p style="font-size:13px;color:#9ca3af;text-align:center;font-family:Arial,sans-serif;">
    Semoga Umrava menjadi teman setia perjalanan umroh Anda. 🕋
  </p>
</td></tr>
</table>`

// ─── Template: Reset Password ─────────────────────────────────────────────────

const RESET_PASSWORD_BODY = `
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
    Semoga Allah senantiasa menjaga dan melindungi Anda. 🤲<br>
    Barakallah fiikum.
  </p>
</td></tr>
</table>`

// ─── Template: Email Transaksi (Duitku) ──────────────────────────────────────

const TRANSACTION_BODY = `
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
    <p style="font-size:13px;color:white;margin:4px 0;font-family:Arial,sans-serif;">🏆 Paket: Premium Seumur Hidup</p>
    {{va_row}}
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
      ℹ️ Akses Premium akan <strong>otomatis aktif</strong> segera setelah pembayaran terverifikasi. Jika ada kendala, hubungi kami via WhatsApp <a href="https://wa.me/6281313585848" style="color:#1B6B3A;font-weight:bold;">081313585848</a>.
    </p>
  </td></tr>
  </table>

  <p style="font-size:13px;color:#9ca3af;text-align:center;line-height:1.7;font-family:Arial,sans-serif;">
    Semoga dimudahkan perjalanan umrohnya. 🕋
  </p>
</td></tr>
</table>`

// ─── Template: Email Transfer Manual ─────────────────────────────────────────

const BANK_TRANSFER_BODY = `
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
    <p style="font-size:14px;color:white;margin:12px 0 4px;font-weight:bold;font-family:Arial,sans-serif;">💰 Nominal Transfer: <span style="color:#C9A84C;">Rp49.000</span></p>
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
    <a href="https://wa.me/6281313585848?text=Assalamu%27alaikum%2C%20saya%20sudah%20transfer%20untuk%20order%20{{order_id}}%20atas%20nama%20{{nama_user}}" style="display:inline-block;background:#25D366;color:white;padding:14px 36px;border-radius:12px;text-decoration:none;font-weight:bold;font-size:15px;font-family:Arial,sans-serif;">
      Konfirmasi via WhatsApp →
    </a>
  </td></tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFFBF0;border:1px solid #F5E6C8;border-radius:12px;padding:16px;margin-bottom:16px;">
  <tr><td>
    <p style="font-size:13px;color:#8B6914;margin:0;line-height:1.7;font-family:Arial,sans-serif;">
      ℹ️ Setelah transfer, konfirmasi ke WhatsApp kami dengan menyertakan <strong>bukti transfer</strong> dan <strong>No. Order {{order_id}}</strong>. Akses Premium akan diaktifkan dalam 1×24 jam hari kerja.
    </p>
  </td></tr>
  </table>

  <p style="font-size:13px;color:#9ca3af;text-align:center;line-height:1.7;font-family:Arial,sans-serif;">
    Semoga dimudahkan perjalanan umrohnya. 🕋
  </p>
</td></tr>
</table>`

// ─── Public API ───────────────────────────────────────────────────────────────

export function buildWelcomeEmail(vars: { nama_user: string; email: string }): EmailPayload {
  const body = inject(wrap(WELCOME_BODY), {
    nama_user: vars.nama_user,
    email: vars.email,
    tahun: new Date().getFullYear().toString(),
  })
  return {
    to: vars.email,
    toName: vars.nama_user,
    subject: `Ahlan Wasahlan, ${vars.nama_user}! Akun Umrava Anda Siap 🕋`,
    html: body,
  }
}

export function buildPasswordResetEmail(vars: { nama_user: string; email: string; reset_url: string }): EmailPayload {
  const body = inject(wrap(RESET_PASSWORD_BODY), {
    nama_user: vars.nama_user || 'Sahabat',
    reset_url: vars.reset_url,
    tahun: new Date().getFullYear().toString(),
  })
  return {
    to: vars.email,
    toName: vars.nama_user || 'Sahabat',
    subject: `Reset Password Akun Umrava Anda 🔑`,
    html: body,
  }
}

export function buildPremiumEmail(vars: { nama_user: string; email: string }): EmailPayload {
  const body = inject(wrap(PREMIUM_BODY), {
    nama_user: vars.nama_user,
    email: vars.email,
    tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    tahun: new Date().getFullYear().toString(),
  })
  return {
    to: vars.email,
    toName: vars.nama_user,
    subject: `Alhamdulillah! Akses Premium Umrava Anda Telah Aktif 👑`,
    html: body,
  }
}

export function buildTransactionEmail(vars: {
  nama_user: string
  email: string
  order_id: string
  metode: string
  va_number?: string
  payment_url: string
  expired_time: number
}): EmailPayload {
  const batasWaktu = new Date(vars.expired_time * 1000).toLocaleString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta',
  }) + ' WIB'

  const vaRow = vars.va_number
    ? `<p style="font-size:13px;color:white;margin:6px 0;font-family:Arial,sans-serif;">🏧 No. VA / Kode: <strong style="color:#C9A84C;letter-spacing:1px;">${vars.va_number}</strong></p>`
    : ''

  const body = inject(wrap(TRANSACTION_BODY), {
    nama_user: vars.nama_user,
    order_id: vars.order_id,
    metode: vars.metode,
    va_row: vaRow,
    payment_url: vars.payment_url,
    batas_waktu: batasWaktu,
  })
  return {
    to: vars.email,
    toName: vars.nama_user,
    subject: `[Umrava] Pesanan ${vars.order_id} — Selesaikan Pembayaran Anda`,
    html: body,
  }
}

export function buildBankTransferEmail(vars: {
  nama_user: string
  email: string
  order_id: string
  bank_name: string
  account_number: string
  account_name: string
}): EmailPayload {
  const tanggal = new Date().toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
  const body = inject(wrap(BANK_TRANSFER_BODY), {
    nama_user: vars.nama_user,
    order_id: vars.order_id,
    bank_name: vars.bank_name,
    account_number: vars.account_number,
    account_name: vars.account_name,
    tanggal,
  })
  return {
    to: vars.email,
    toName: vars.nama_user,
    subject: `[Umrava] Instruksi Transfer Manual — Order ${vars.order_id}`,
    html: body,
  }
}

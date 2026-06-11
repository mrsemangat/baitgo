import type { EmailPayload } from './emailTemplates'

const API_BASE = 'https://api.mailketing.co.id/api/v1'

function getApiKey(): string | null {
  return process.env.MAILKETING_API_KEY ?? null
}

// ─── Send Email ───────────────────────────────────────────────────────────────
// Endpoint : POST /api/v1/send
// Content-Type: application/x-www-form-urlencoded
// Params   : api_token, from_name, from_email, recipient, subject, content

export async function sendEmail(payload: EmailPayload): Promise<{ ok: boolean; error?: string }> {
  const apiKey = getApiKey()
  if (!apiKey) {
    console.warn('[Email] MAILKETING_API_KEY belum diset — email tidak terkirim')
    return { ok: false, error: 'API key tidak ditemukan' }
  }

  const params = new URLSearchParams({
    api_token:  apiKey,
    from_name:  payload.senderName  ?? 'Umrava',
    from_email: payload.senderEmail ?? 'info@umrava.com',
    recipient:  payload.to,
    subject:    payload.subject,
    content:    payload.html,           // Mailketing pakai 'content', bukan 'html'
  })

  try {
    const res = await fetch(`${API_BASE}/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      signal: AbortSignal.timeout(12000),
    })

    const text = await res.text()
    let json: Record<string, unknown> = {}
    try { json = JSON.parse(text) } catch { /* bukan JSON */ }

    console.log(`[Email] Mailketing → ${res.status}: ${text.slice(0, 300)}`)

    if (json.status === 'success') {
      console.log(`[Email] ✅ Terkirim ke ${payload.to}`)
      return { ok: true }
    }

    const errMsg = typeof json.response === 'string' ? json.response : text.slice(0, 200)
    console.error(`[Email] ❌ ${errMsg}`)
    return { ok: false, error: errMsg }
  } catch (err) {
    console.error('[Email] ❌ Network error:', String(err))
    return { ok: false, error: String(err) }
  }
}

// ─── Get Mailing Lists ────────────────────────────────────────────────────────
// Endpoint : POST /api/v1/viewlist
// Params   : api_token

export interface MailingList {
  listId: number
  listName: string
}

export async function getMailingLists(): Promise<MailingList[]> {
  const apiKey = getApiKey()
  if (!apiKey) return []

  try {
    const res = await fetch(`${API_BASE}/viewlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ api_token: apiKey }).toString(),
      signal: AbortSignal.timeout(8000),
    })
    const json = await res.json()
    if (json.status === 'success' && Array.isArray(json.lists)) {
      return (json.lists as Array<{ list_id: number; list_name: string }>).map(l => ({
        listId: l.list_id,
        listName: l.list_name,
      }))
    }
    return []
  } catch {
    return []
  }
}

// ─── Add Subscriber to List ───────────────────────────────────────────────────
// Endpoint : POST /api/v1/addsubtolist
// Params   : api_token, list_id, email, first_name?, last_name?, city?, phone?, mobile?

export async function addSubscriberToList(params: {
  listId: string | number
  email: string
  firstName?: string
  lastName?: string
  city?: string
  mobile?: string
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = getApiKey()
  if (!apiKey) return { ok: false, error: 'API key tidak ditemukan' }

  const body = new URLSearchParams({
    api_token: apiKey,
    list_id:   String(params.listId),
    email:     params.email,
  })
  if (params.firstName) body.set('first_name', params.firstName)
  if (params.lastName)  body.set('last_name',  params.lastName)
  if (params.city)      body.set('city',        params.city)
  if (params.mobile)    body.set('mobile',      params.mobile)

  try {
    const res = await fetch(`${API_BASE}/addsubtolist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      signal: AbortSignal.timeout(8000),
    })
    const text = await res.text()
    let json: Record<string, unknown> = {}
    try { json = JSON.parse(text) } catch { /* bukan JSON */ }

    if (json.status === 'success') return { ok: true }
    return { ok: false, error: typeof json.response === 'string' ? json.response : text.slice(0, 200) }
  } catch (err) {
    return { ok: false, error: String(err) }
  }
}

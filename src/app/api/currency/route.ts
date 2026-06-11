import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Fallback rate in case API is down (update periodically)
const FALLBACK_RATE_IDR_PER_SAR = 4250

export async function GET() {
  try {
    const res = await fetch('https://api.frankfurter.app/latest?from=SAR&to=IDR', {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) throw new Error(`upstream ${res.status}`)
    const data = await res.json()
    const rate: number = data.rates?.IDR
    if (!rate) throw new Error('no rate in response')
    return NextResponse.json({ rate, date: data.date, fallback: false })
  } catch {
    return NextResponse.json({
      rate: FALLBACK_RATE_IDR_PER_SAR,
      date: new Date().toISOString().slice(0, 10),
      fallback: true,
    })
  }
}

import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { getPaymentChannels } from '@/lib/duitku'
import { getDuitkuConfig } from '@/lib/paymentSettings'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const cfg = await getDuitkuConfig()
    const channels = await getPaymentChannels(cfg)
    return NextResponse.json({ success: true, channels })
  } catch (e) {
    return NextResponse.json({ success: false, error: (e as Error).message }, { status: 500 })
  }
}

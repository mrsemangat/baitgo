import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { getTransactionStatus } from '@/lib/duitku'
import { getDuitkuConfig } from '@/lib/paymentSettings'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const orderId = searchParams.get('orderId')
  if (!orderId) return NextResponse.json({ error: 'orderId diperlukan' }, { status: 400 })

  try {
    const cfg = await getDuitkuConfig()
    const result = await getTransactionStatus(orderId, cfg)
    const statusMap: Record<string, string> = { '00': 'PAID', '01': 'PENDING', '02': 'FAILED' }
    return NextResponse.json({
      success: true,
      statusCode: result.statusCode,
      status: statusMap[result.statusCode] ?? 'UNKNOWN',
      statusMessage: result.statusMessage,
    })
  } catch (e) {
    return NextResponse.json({ success: false, error: (e as Error).message }, { status: 500 })
  }
}

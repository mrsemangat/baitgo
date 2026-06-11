import { NextResponse } from 'next/server'
import { getPaymentMethodSettings } from '@/lib/paymentSettings'

export const dynamic = 'force-dynamic'

export async function GET() {
  const settings = await getPaymentMethodSettings()
  return NextResponse.json(settings)
}

-- Migration 003: Manual payments table for bank transfer orders
CREATE TABLE IF NOT EXISTS manual_payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  merchant_order_id TEXT UNIQUE NOT NULL,
  user_name TEXT,
  user_email TEXT,
  amount INTEGER NOT NULL DEFAULT 49000,
  bank_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE manual_payments ENABLE ROW LEVEL SECURITY;

-- Only service role can access (admin operations via service key)
CREATE POLICY "Service role full access" ON manual_payments
  USING (true)
  WITH CHECK (true);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS manual_payments_user_id_idx ON manual_payments(user_id);
CREATE INDEX IF NOT EXISTS manual_payments_status_idx ON manual_payments(status);
CREATE INDEX IF NOT EXISTS manual_payments_order_id_idx ON manual_payments(merchant_order_id);

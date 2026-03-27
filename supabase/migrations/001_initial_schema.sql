-- ─── MCKI Solutions — Supabase Schema ──────────────────────────────────────
-- Run via: supabase db push  OR  paste into Supabase SQL Editor
-- Region: eu-west-2 (London) for UK GDPR compliance

-- ── Enable UUID extension ────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Waitlist ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.waitlist (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email              TEXT NOT NULL UNIQUE,
  phone              TEXT,
  trading_experience TEXT NOT NULL CHECK (
    trading_experience IN ('beginner', 'intermediate', 'advanced', 'professional')
  ),
  referral_code      TEXT NOT NULL UNIQUE,
  referred_by        TEXT REFERENCES public.waitlist(referral_code) ON DELETE SET NULL,
  referral_count     INTEGER NOT NULL DEFAULT 0,
  queue_position     INTEGER NOT NULL,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for leaderboard queries
CREATE INDEX idx_waitlist_referrals ON public.waitlist (referral_count DESC, queue_position ASC);
CREATE INDEX idx_waitlist_referral_code ON public.waitlist (referral_code);

-- RPC: Increment referral count and update queue positions
CREATE OR REPLACE FUNCTION public.increment_referral_count(p_referral_code TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.waitlist
  SET    referral_count = referral_count + 1
  WHERE  referral_code = p_referral_code;

  -- Recalculate queue positions ordered by referral_count DESC, then created_at ASC
  WITH ranked AS (
    SELECT id,
           ROW_NUMBER() OVER (
             ORDER BY referral_count DESC, created_at ASC
           ) AS new_position
    FROM   public.waitlist
  )
  UPDATE public.waitlist w
  SET    queue_position = r.new_position
  FROM   ranked r
  WHERE  w.id = r.id;
END;
$$;

-- ── Leads ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.leads (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email        TEXT NOT NULL,
  portal       TEXT NOT NULL CHECK (
    portal IN ('local-ed', 'international-ed', 'trading-lab', 'family-support')
  ),
  signal_score INTEGER NOT NULL DEFAULT 0 CHECK (signal_score BETWEEN 0 AND 100),
  data         JSONB NOT NULL DEFAULT '{}',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_leads_portal ON public.leads (portal);
CREATE INDEX idx_leads_score ON public.leads (signal_score DESC);
CREATE INDEX idx_leads_email ON public.leads (email);

-- ── Bookings ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.bookings (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference      TEXT NOT NULL UNIQUE,
  name           TEXT NOT NULL,
  email          TEXT NOT NULL,
  phone          TEXT NOT NULL,
  service        TEXT NOT NULL DEFAULT 'general' CHECK (
    service IN ('care-planning', 'family-mediation', 'benefits-navigation', 'respite-support', 'general')
  ),
  preferred_date DATE,
  message        TEXT,
  status         TEXT NOT NULL DEFAULT 'pending' CHECK (
    status IN ('pending', 'confirmed', 'completed', 'cancelled')
  ),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bookings_status ON public.bookings (status);
CREATE INDEX idx_bookings_email ON public.bookings (email);

-- ── Row Level Security ────────────────────────────────────────────────────────
-- Enable RLS on all tables (service role bypasses, anon key restricted)

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow public anon to read waitlist leaderboard (non-PII columns only)
CREATE POLICY "public_read_waitlist_leaderboard"
  ON public.waitlist
  FOR SELECT
  TO anon
  USING (true);  -- Columns with PII (email, phone) should be excluded via view

-- Restrict insert/update to service role only
CREATE POLICY "service_role_insert_waitlist"
  ON public.waitlist
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "service_role_update_waitlist"
  ON public.waitlist
  FOR UPDATE
  TO service_role
  USING (true);

-- Leads: service role only
CREATE POLICY "service_role_all_leads"
  ON public.leads
  FOR ALL
  TO service_role
  USING (true);

-- Bookings: service role only
CREATE POLICY "service_role_all_bookings"
  ON public.bookings
  FOR ALL
  TO service_role
  USING (true);

-- ── Leaderboard view (no PII) ────────────────────────────────────────────────
CREATE OR REPLACE VIEW public.waitlist_leaderboard AS
SELECT
  referral_code,
  referral_count,
  queue_position
FROM public.waitlist
ORDER BY referral_count DESC, queue_position ASC
LIMIT 50;

GRANT SELECT ON public.waitlist_leaderboard TO anon;

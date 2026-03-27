import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Lazy — only valid at runtime when env vars are present
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Server-side client (service role) — only for API routes / server actions
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type WaitlistEntry = {
  id: string;
  email: string;
  phone: string | null;
  trading_experience: "beginner" | "intermediate" | "advanced" | "professional";
  referral_code: string;
  referred_by: string | null;
  referral_count: number;
  queue_position: number;
  created_at: string;
};

export type LeadRecord = {
  id: string;
  email: string;
  portal: "local-ed" | "international-ed" | "trading-lab" | "family-support";
  signal_score: number;
  data: Record<string, unknown>;
  created_at: string;
};

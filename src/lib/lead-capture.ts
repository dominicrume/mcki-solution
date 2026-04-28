import { generateReferralCode } from "./utils";

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return (
    url.length > 0 &&
    !url.includes("placeholder") &&
    key.length > 0 &&
    !key.includes("placeholder")
  );
}

export function makeReference(prefix = "MCKI"): string {
  return `${prefix}-${generateReferralCode(6)}`;
}

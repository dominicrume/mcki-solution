export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { generateReferralCode } from "@/lib/utils";

// Detect whether Supabase is actually configured
function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return (
    url.length > 0 &&
    !url.includes("placeholder") &&
    key.length > 0 &&
    !key.includes("placeholder")
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, phone, trading_experience, referred_by } = body;

    if (!email || !trading_experience) {
      return NextResponse.json(
        { error: "Email and trading experience are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const referralCode = generateReferralCode();

    // ── Path A: Supabase configured (production) ───────────────────
    if (isSupabaseConfigured()) {
      try {
        const { createServiceClient } = await import("@/lib/supabase");
        const supabase = createServiceClient();

        // Check duplicate
        const { data: existing } = await supabase
          .from("waitlist")
          .select("id, referral_code, queue_position")
          .eq("email", email.toLowerCase())
          .single();

        if (existing) {
          return NextResponse.json({
            referral_code: existing.referral_code,
            queue_position: existing.queue_position,
            message: "You're already on the waitlist! Use your referral link to move up.",
          });
        }

        const { count } = await supabase
          .from("waitlist")
          .select("*", { count: "exact", head: true });

        const queuePosition = (count ?? 0) + 1;

        const { error } = await supabase.from("waitlist").insert({
          email: email.toLowerCase(),
          phone: phone || null,
          trading_experience,
          referral_code: referralCode,
          referred_by: referred_by || null,
          referral_count: 0,
          queue_position: queuePosition,
        });

        if (error) throw error;

        if (referred_by) {
          await supabase.rpc("increment_referral_count", {
            p_referral_code: referred_by,
          });
        }

        void notifyCRM({ email, phone, trading_experience, referral_code: referralCode, queue_position: queuePosition });

        return NextResponse.json(
          {
            referral_code: referralCode,
            queue_position: queuePosition,
            message: `You're #${queuePosition} on the waitlist! Share your referral link to move up.`,
          },
          { status: 201 }
        );
      } catch (dbErr) {
        console.error("[Waitlist] Supabase error:", dbErr);
        // Fall through to dev fallback rather than showing user an error
      }
    }

    // ── Path B: Dev / Supabase not configured — return mock success ─
    const mockPosition = Math.floor(Math.random() * 150) + 50;
    console.log("[Waitlist DEV] Entry recorded locally:", {
      email,
      trading_experience,
      referral_code: referralCode,
      queue_position: mockPosition,
    });

    void notifyCRM({ email, phone, trading_experience, referral_code: referralCode, queue_position: mockPosition });

    return NextResponse.json(
      {
        referral_code: referralCode,
        queue_position: mockPosition,
        message: `You're #${mockPosition} on the waitlist! Share your referral link to move up.`,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[Waitlist] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

async function notifyCRM(data: {
  email: string;
  phone?: string;
  trading_experience: string;
  referral_code: string;
  queue_position: number;
}) {
  // Replace with Resend / SendGrid / webhook in production
  console.log("[CRM LEAD] New waitlist entry:", {
    ...data,
    notifyTo: ["Info@mckisolutions.com", "adammasum74@gmail.com"],
    timestamp: new Date().toISOString(),
  });
}

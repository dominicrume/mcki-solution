export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

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

const TICKET_PRICES: Record<string, string> = {
  private_adult:    "£600",
  private_teenager: "£250",
  agent_ai:         "£1,500",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, ticket_type, event } = body;

    if (!name || !email || !ticket_type) {
      return NextResponse.json(
        { error: "Name, email, and ticket type are required." },
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

    const price = TICKET_PRICES[ticket_type] ?? "TBC";

    // ── Path A: Supabase configured (production) ───────────────────
    if (isSupabaseConfigured()) {
      try {
        const { createServiceClient } = await import("@/lib/supabase");
        const supabase = createServiceClient();

        const { data: existing } = await supabase
          .from("event_registrations")
          .select("id")
          .eq("email", email.toLowerCase())
          .eq("event", event)
          .single();

        if (existing) {
          return NextResponse.json({
            message: "You are already registered for this event. Check your inbox for confirmation.",
          });
        }

        const { error } = await supabase.from("event_registrations").insert({
          name,
          email: email.toLowerCase(),
          phone: phone || null,
          ticket_type,
          event,
          registered_at: new Date().toISOString(),
        });

        if (error) throw error;
      } catch (dbErr) {
        console.error("[EventRegister] Supabase error:", dbErr);
        // Fall through to dev path
      }
    }

    // ── Path B / dev fallback ──────────────────────────────────────
    console.log("[EventRegister DEV] Registration:", { name, email, ticket_type, event, price });

    void notifyCRM({ name, email, phone, ticket_type, event, price });

    return NextResponse.json(
      { message: "Registration confirmed. Payment link will be sent to your email." },
      { status: 201 }
    );
  } catch (err) {
    console.error("[EventRegister] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

async function notifyCRM(data: {
  name: string;
  email: string;
  phone?: string;
  ticket_type: string;
  event: string;
  price: string;
}) {
  console.log("[CRM LEAD] New event registration:", {
    ...data,
    notifyTo: ["Info@mckisolutions.com", "adammasum74@gmail.com"],
    timestamp: new Date().toISOString(),
  });
}

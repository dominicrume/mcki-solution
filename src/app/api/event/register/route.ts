export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/lead-capture";
import { sendEventConfirmation, sendEventCRM } from "@/lib/email";

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
            message: "You are already registered for this event. Check your inbox for your confirmation email.",
          });
        }

        await supabase.from("event_registrations").insert({
          name,
          email: email.toLowerCase(),
          phone: phone || null,
          ticket_type,
          event,
          registered_at: new Date().toISOString(),
        });
      } catch (dbErr) {
        console.warn("[EventRegister] Supabase skipped:", dbErr);
      }
    }

    void sendEventConfirmation({ name, email, ticketType: ticket_type, event });
    void sendEventCRM({ name, email, phone, ticketType: ticket_type, event });

    return NextResponse.json(
      { message: `Registration confirmed, ${name}! A confirmation has been sent to ${email}. We'll follow up with your payment link within 24 hours.` },
      { status: 201 }
    );
  } catch (err) {
    console.error("[EventRegister] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

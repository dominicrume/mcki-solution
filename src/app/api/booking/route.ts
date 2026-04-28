export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { isSupabaseConfigured, makeReference } from "@/lib/lead-capture";
import { sendBookingConfirmation, sendBookingCRM } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, service, preferred_date, message } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required." },
        { status: 400 }
      );
    }

    const reference = makeReference();

    if (isSupabaseConfigured()) {
      try {
        const { createServiceClient } = await import("@/lib/supabase");
        const supabase = createServiceClient();
        await supabase.from("bookings").insert({
          reference,
          name,
          email: email.toLowerCase(),
          phone,
          service: service ?? "general",
          preferred_date: preferred_date || null,
          message: message || null,
          status: "pending",
        });
      } catch (dbErr) {
        console.warn("[Booking] Supabase insert skipped:", dbErr);
      }
    }

    void sendBookingConfirmation({
      name,
      email,
      reference,
      service: service ?? "General Consultation",
      preferredDate: preferred_date,
    });
    void sendBookingCRM({
      name,
      email,
      phone,
      reference,
      service: service ?? "General Consultation",
      preferredDate: preferred_date,
      message,
    });

    return NextResponse.json(
      {
        reference,
        message: `Thank you, ${name}! We'll confirm your consultation within 2 working hours. A confirmation has been sent to ${email}.`,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[Booking] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

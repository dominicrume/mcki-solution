export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { generateReferralCode } from "@/lib/utils";

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

    const reference = `MCKI-${generateReferralCode(6)}`;
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

    // Notify team (fire-and-forget)
    void notifyTeam({ reference, name, email, phone, service, preferred_date });

    return NextResponse.json(
      {
        reference,
        message:
          "Thank you! We'll confirm your consultation within 2 working hours.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

async function notifyTeam(data: {
  reference: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date?: string;
}) {
  console.log("[CRM BOOKING] New consultation request:", {
    ...data,
    notifyTo: ["Info@mckisolutions.com", "adammasum74@gmail.com"],
    timestamp: new Date().toISOString(),
  });
}

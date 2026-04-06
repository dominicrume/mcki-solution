/**
 * MCKI Solutions — Central Email Service
 * Provider: Resend (https://resend.com)
 * All transactional and CRM emails go through this module.
 *
 * Required env vars:
 *   RESEND_API_KEY      — from resend.com dashboard
 *   RESEND_FROM_EMAIL   — verified sender, e.g. "noreply@mckisolutions.com"
 */

import { BRAND } from "./constants";

const CRM_RECIPIENTS = [BRAND.email, BRAND.crmEmail];

// ── Core sender ────────────────────────────────────────────────────────────

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.includes("placeholder")) {
    console.warn("[Email] RESEND_API_KEY not configured — email skipped:", subject);
    return;
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "noreply@mckisolutions.com";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: `MCKI Solutions <${fromEmail}>`,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[Email] Resend error:", err);
  } else {
    console.log("[Email] Sent:", subject, "→", Array.isArray(to) ? to.join(", ") : to);
  }
}

// ── Shared layout wrapper ──────────────────────────────────────────────────

function layout(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 0;">
    <tr><td align="center">
      <table width="100%" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);">
        <!-- Header -->
        <tr>
          <td style="background:#1F4E79;padding:28px 32px;">
            <h1 style="margin:0;color:#FFD700;font-size:20px;font-weight:700;letter-spacing:-0.3px;">MCKI Solutions</h1>
            <p style="margin:4px 0 0;color:rgba(255,255,255,.7);font-size:13px;">${BRAND.tagline}</p>
          </td>
        </tr>
        <!-- Body -->
        <tr><td style="padding:32px;">${body}</td></tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 32px;">
            <p style="margin:0;font-size:12px;color:#6b7280;line-height:1.6;">
              <strong style="color:#1F4E79;">MCKI Solutions</strong> · West Midlands, United Kingdom<br/>
              📞 <a href="tel:${BRAND.phone}" style="color:#1F4E79;text-decoration:none;">${BRAND.phone}</a> &nbsp;|&nbsp;
              ✉️ <a href="mailto:${BRAND.email}" style="color:#1F4E79;text-decoration:none;">${BRAND.email}</a> &nbsp;|&nbsp;
              🌐 <a href="${BRAND.url}" style="color:#1F4E79;text-decoration:none;">mckisolutions.com</a>
            </p>
            <p style="margin:8px 0 0;font-size:11px;color:#9ca3af;">
              You received this email because you interacted with MCKI Solutions.
              This is not financial or legal advice.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function heading(text: string): string {
  return `<h2 style="margin:0 0 16px;color:#1F4E79;font-size:18px;font-weight:700;">${text}</h2>`;
}

function para(text: string): string {
  return `<p style="margin:0 0 14px;color:#374151;font-size:14px;line-height:1.7;">${text}</p>`;
}

function highlight(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 12px;font-size:13px;font-weight:600;color:#1F4E79;white-space:nowrap;border-bottom:1px solid #f3f4f6;">${label}</td>
    <td style="padding:8px 12px;font-size:13px;color:#374151;border-bottom:1px solid #f3f4f6;">${value}</td>
  </tr>`;
}

function table(rows: string): string {
  return `<table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:8px;margin:16px 0;">${rows}</table>`;
}

function cta(label: string, href: string): string {
  return `<div style="margin:24px 0 8px;">
    <a href="${href}" style="display:inline-block;padding:12px 24px;background:#1F4E79;color:#FFD700;border-radius:8px;text-decoration:none;font-size:14px;font-weight:700;">${label} →</a>
  </div>`;
}

function divider(): string {
  return `<hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;"/>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. WAITLIST
// ═══════════════════════════════════════════════════════════════════════════

export async function sendWaitlistConfirmation(data: {
  email: string;
  referralCode: string;
  queuePosition: number;
}): Promise<void> {
  const referralUrl = `${BRAND.url}/trading-lab?ref=${data.referralCode}`;
  const body = `
    ${heading("You're on the Wealth Lab waitlist!")}
    ${para(`Thank you for joining — you are currently <strong style="color:#1F4E79;">#${data.queuePosition}</strong> in the queue.`)}
    ${para("The MCKI Wealth Lab is an AI-powered Crypto and FX trading intelligence platform launching exclusively to early adopters. The higher your position, the better your access tier.")}
    ${divider()}
    ${heading("Move up the queue — share your link")}
    ${para("Every person who joins using your unique referral link moves you one place forward.")}
    <div style="background:#f0f7ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin:16px 0;word-break:break-all;">
      <p style="margin:0;font-size:12px;font-weight:600;color:#1F4E79;text-transform:uppercase;letter-spacing:.5px;">Your Referral Link</p>
      <p style="margin:6px 0 0;font-size:13px;color:#374151;">${referralUrl}</p>
    </div>
    ${table(`
      ${highlight("Queue Position", `#${data.queuePosition}`)}
      ${highlight("Referral Code", data.referralCode)}
      ${highlight("Top 100 reward", "Founding Member — Free Early Access")}
      ${highlight("Top 500 reward", "Early Bird — Priority Access")}
    `)}
    ${cta("View my position", `${BRAND.url}/trading-lab`)}
    ${divider()}
    ${para(`Questions? Call us on <a href="tel:${BRAND.phone}" style="color:#1F4E79;">${BRAND.phone}</a> or reply to this email.`)}
  `;
  await sendEmail({
    to: data.email,
    subject: `You're #${data.queuePosition} on the MCKI Wealth Lab waitlist 🎯`,
    html: layout("Wealth Lab Waitlist Confirmation", body),
  });
}

export async function sendWaitlistCRM(data: {
  email: string;
  phone?: string;
  tradingExperience: string;
  referralCode: string;
  queuePosition: number;
}): Promise<void> {
  const body = `
    ${heading("New Wealth Lab Waitlist Sign-up")}
    ${table(`
      ${highlight("Email", data.email)}
      ${highlight("Phone", data.phone ?? "Not provided")}
      ${highlight("Experience", data.tradingExperience)}
      ${highlight("Referral Code", data.referralCode)}
      ${highlight("Queue Position", `#${data.queuePosition}`)}
      ${highlight("Signed up", new Date().toLocaleString("en-GB", { timeZone: "Europe/London" }))}
    `)}
    ${cta("View Supabase Dashboard", "https://supabase.com/dashboard")}
  `;
  await sendEmail({
    to: CRM_RECIPIENTS,
    subject: `[Wealth Lab] New waitlist sign-up — #${data.queuePosition} · ${data.email}`,
    html: layout("New Waitlist Lead", body),
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. BOOKING (Family Support / Consultation)
// ═══════════════════════════════════════════════════════════════════════════

export async function sendBookingConfirmation(data: {
  name: string;
  email: string;
  reference: string;
  service: string;
  preferredDate?: string;
}): Promise<void> {
  const body = `
    ${heading(`Thank you, ${data.name}!`)}
    ${para("We've received your consultation request and a member of our team will confirm your appointment within <strong>2 working hours</strong>.")}
    ${table(`
      ${highlight("Reference", data.reference)}
      ${highlight("Service", data.service)}
      ${highlight("Preferred Date", data.preferredDate ?? "Flexible — we'll arrange together")}
      ${highlight("Next step", "Our team will call you to confirm")}
    `)}
    ${divider()}
    ${para(`If you need to speak to us sooner, call <a href="tel:${BRAND.phone}" style="color:#1F4E79;font-weight:600;">${BRAND.phone}</a> — we're here to help.`)}
    ${cta("Learn more about our services", `${BRAND.url}/family-support`)}
    ${divider()}
    ${para("Please keep your reference number safe — quote it if you contact us.")}
  `;
  await sendEmail({
    to: data.email,
    subject: `Booking confirmed — Ref: ${data.reference} | MCKI Solutions`,
    html: layout("Consultation Booking Confirmed", body),
  });
}

export async function sendBookingCRM(data: {
  name: string;
  email: string;
  phone: string;
  reference: string;
  service: string;
  preferredDate?: string;
  message?: string;
}): Promise<void> {
  const body = `
    ${heading("New Consultation Booking")}
    ${table(`
      ${highlight("Reference", data.reference)}
      ${highlight("Name", data.name)}
      ${highlight("Email", data.email)}
      ${highlight("Phone", data.phone)}
      ${highlight("Service", data.service)}
      ${highlight("Preferred Date", data.preferredDate ?? "Flexible")}
      ${highlight("Submitted", new Date().toLocaleString("en-GB", { timeZone: "Europe/London" }))}
    `)}
    ${data.message ? `<div style="margin:16px 0;padding:16px;background:#fefce8;border-left:4px solid #FFD700;border-radius:4px;"><p style="margin:0;font-size:13px;color:#374151;"><strong>Message:</strong> ${data.message}</p></div>` : ""}
    ${cta("View all bookings in Supabase", "https://supabase.com/dashboard")}
  `;
  await sendEmail({
    to: CRM_RECIPIENTS,
    subject: `[Booking] ${data.name} — ${data.service} · Ref: ${data.reference}`,
    html: layout("New Consultation Booking", body),
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. EVENT REGISTRATION
// ═══════════════════════════════════════════════════════════════════════════

const TICKET_LABELS: Record<string, { label: string; price: string }> = {
  private_adult:    { label: "Private Adult",    price: "£600" },
  private_teenager: { label: "Private Teenager", price: "£250" },
  agent_ai:         { label: "Agent AI",         price: "£1,500" },
};

export async function sendEventConfirmation(data: {
  name: string;
  email: string;
  ticketType: string;
  event: string;
}): Promise<void> {
  const ticket = TICKET_LABELS[data.ticketType] ?? { label: data.ticketType, price: "TBC" };
  const body = `
    ${heading(`You're registered, ${data.name}!`)}
    ${para(`Your interest has been recorded for <strong>${data.event}</strong>. We'll send your payment link and event details within <strong>24 hours</strong>.`)}
    ${table(`
      ${highlight("Event", data.event)}
      ${highlight("Date", "30 May 2026")}
      ${highlight("Ticket", ticket.label)}
      ${highlight("Investment", ticket.price)}
      ${highlight("Location", "Midlands, United Kingdom (full details to follow)")}
    `)}
    ${divider()}
    ${para("This is a <strong>strictly limited seats</strong> event focused entirely on Agentic AI — autonomous agents, AI-powered workflows, and the future of intelligent business.")}
    ${para(`Questions? Call <a href="tel:${BRAND.phone}" style="color:#1F4E79;font-weight:600;">${BRAND.phone}</a> or email <a href="mailto:${BRAND.email}" style="color:#1F4E79;">${BRAND.email}</a>.`)}
    ${cta("View event details", `${BRAND.url}/trading-lab`)}
  `;
  await sendEmail({
    to: data.email,
    subject: `Event registration confirmed — Agentic AI · 30 May 2026`,
    html: layout("Event Registration Confirmed", body),
  });
}

export async function sendEventCRM(data: {
  name: string;
  email: string;
  phone?: string;
  ticketType: string;
  event: string;
}): Promise<void> {
  const ticket = TICKET_LABELS[data.ticketType] ?? { label: data.ticketType, price: "TBC" };
  const body = `
    ${heading("New Event Registration")}
    ${table(`
      ${highlight("Name", data.name)}
      ${highlight("Email", data.email)}
      ${highlight("Phone", data.phone ?? "Not provided")}
      ${highlight("Event", data.event)}
      ${highlight("Ticket", `${ticket.label} — ${ticket.price}`)}
      ${highlight("Registered", new Date().toLocaleString("en-GB", { timeZone: "Europe/London" }))}
    `)}
    ${para("<strong>Action required:</strong> Send payment link to the attendee within 24 hours.")}
    ${cta("View registrations in Supabase", "https://supabase.com/dashboard")}
  `;
  await sendEmail({
    to: CRM_RECIPIENTS,
    subject: `[Event] ${data.name} · ${ticket.label} (${ticket.price}) — Agentic AI 30 May`,
    html: layout("New Event Registration", body),
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. CAREER NAVIGATOR BLUEPRINT
// ═══════════════════════════════════════════════════════════════════════════

export async function sendBlueprintEmail(
  data: Record<string, string>,
  careers: string,
  painPoints: string,
  roadmap: string,
  tools: string
): Promise<void> {
  const name = data.name ?? "there";

  const section = (title: string, content: string) =>
    `<div style="margin:20px 0;">
      <h3 style="margin:0 0 8px;font-size:15px;color:#1F4E79;border-bottom:2px solid #FFD700;padding-bottom:6px;">${title}</h3>
      <div style="font-size:13px;color:#374151;line-height:1.8;white-space:pre-wrap;">${content}</div>
    </div>`;

  const body = `
    ${heading(`Your Career Blueprint is ready, ${name}!`)}
    ${para(`Based on your profile — <strong>${data.interests ?? ""}</strong> interests, based in <strong>${data.country ?? ""}</strong>, with <strong>${data.education ?? ""}</strong> background — here is your personalised career intelligence report.`)}
    ${divider()}
    ${section("1. Career Paths Matched to You", careers)}
    ${divider()}
    ${section("2. Challenges to Watch Out For", painPoints)}
    ${divider()}
    ${section("3. Your 12-Month Action Roadmap", roadmap)}
    ${divider()}
    ${section("4. AI Tools to Accelerate Your Journey", tools)}
    ${divider()}
    <div style="background:#f0f7ff;border:1px solid #bfdbfe;border-radius:10px;padding:20px;margin:24px 0;">
      <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#1F4E79;">Ready to take the next step?</p>
      <p style="margin:0 0 12px;font-size:13px;color:#374151;">Book a free 30-minute consultation with our education advisors. We'll map out exactly how to turn this blueprint into action.</p>
      ${cta("Book Free Consultation", `${BRAND.url}/family-support`)}
    </div>
    ${para(`Call us directly: <a href="tel:${BRAND.phone}" style="color:#1F4E79;font-weight:600;">${BRAND.phone}</a>`)}
  `;
  await sendEmail({
    to: data.email,
    subject: `Your MCKI Career Blueprint is ready, ${name}!`,
    html: layout("Career Blueprint", body),
  });
}

export async function sendBlueprintCRM(data: Record<string, string>): Promise<void> {
  const rows = Object.entries(data)
    .filter(([k]) => !["career_output_preview"].includes(k))
    .map(([k, v]) => highlight(k, v))
    .join("");
  const body = `
    ${heading("New Career Navigator Lead")}
    ${table(rows)}
    ${cta("View leads in Supabase", "https://supabase.com/dashboard")}
  `;
  await sendEmail({
    to: CRM_RECIPIENTS,
    subject: `[Navigator Lead] ${data.name ?? "Unknown"} · ${data.country ?? ""} · ${data.email}`,
    html: layout("New Career Navigator Lead", body),
  });
}

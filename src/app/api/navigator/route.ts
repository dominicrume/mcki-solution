export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { calcSignalScore } from "@/lib/utils";

type Mode = "local" | "international";

// Matches the Colab 4-agent flow exactly:
// email → name → interests → country → education → generate
const STEPS = [
  "collect_email",
  "collect_name",
  "collect_interests",
  "collect_country",
  "collect_education",
  "generate_blueprint",
] as const;

type Step = typeof STEPS[number];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mode, step, userMessage, collected, history } = body as {
      mode: Mode;
      step: number;
      userMessage: string;
      collected: Record<string, string>;
      history: { role: string; content: string }[];
    };

    const currentStep: Step = STEPS[step] ?? "generate_blueprint";

    // Try FastAPI backend first if configured
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      try {
        const res = await fetch(`${apiUrl}/api/navigator`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode, step, userMessage, collected, history }),
          signal: AbortSignal.timeout(25000),
        });
        if (res.ok) return NextResponse.json(await res.json());
      } catch {
        console.warn("[Navigator] FastAPI unreachable, using local logic.");
      }
    }

    // ── Local 5-step logic ─────────────────────────────────────────
    let reply = "";
    let updatedCollected: Record<string, string> = {};
    let nextStep = step;
    let blueprintReady = false;

    switch (currentStep) {
      // ── Step 0: Email ──────────────────────────────────────────
      case "collect_email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const email = userMessage.trim();
        if (!emailRegex.test(email)) {
          reply =
            "That doesn't look like a valid email. Please enter your email address so I can send your report. (e.g. sarah@gmail.com)";
          // stay on step 0
          break;
        }
        updatedCollected = { email };
        nextStep = 1;
        reply = `Perfect — I'll send your Career Blueprint to **${email}**.\n\nWhat's your first name?`;
        break;
      }

      // ── Step 1: Name ───────────────────────────────────────────
      case "collect_name": {
        const name = userMessage.trim();
        updatedCollected = { name };
        nextStep = 2;
        reply = `Great to meet you, ${name}! 👋\n\nWhat are your main interests? (e.g. AI, business, design, healthcare, finance, tech)`;
        break;
      }

      // ── Step 2: Interests ─────────────────────────────────────
      case "collect_interests": {
        updatedCollected = { interests: userMessage.trim() };
        nextStep = 3;
        reply = `Excellent! Which country are you based in?`;
        break;
      }

      // ── Step 3: Country ───────────────────────────────────────
      case "collect_country": {
        updatedCollected = { country: userMessage.trim() };
        nextStep = 4;
        reply = `Got it. What is your current education level?\n\n(e.g. High School, College, University degree, Postgraduate, Professional experience)`;
        break;
      }

      // ── Step 4: Education → trigger 4-agent pipeline ──────────
      case "collect_education": {
        updatedCollected = { education: userMessage.trim() };
        nextStep = 5;
        blueprintReady = true;

        const allData = { ...collected, ...updatedCollected };
        const name = allData.name || "there";

        reply =
          `Brilliant, ${name}! 🚀 Your inputs are locked in:\n\n` +
          `• **Interests:** ${allData.interests}\n` +
          `• **Country:** ${allData.country}\n` +
          `• **Education:** ${allData.education}\n\n` +
          `I'm now running your Career Navigator — 4 AI agents in sequence:\n` +
          `1️⃣ Career Finder\n` +
          `2️⃣ Pain Point Analyst\n` +
          `3️⃣ 12-Month Roadmap Generator\n` +
          `4️⃣ AI Tools Recommender\n\n` +
          `Your full Career Blueprint is being sent to **${allData.email}** — arriving in under 60 seconds!`;

        // Fire-and-forget: run agents + store lead
        void runAgentsAndStore(mode, allData);
        break;
      }

      default:
        reply =
          `Your Blueprint is complete and on its way! 📬 Any questions? Call us on ${process.env.BRAND_PHONE ?? "+44 7889 417914"}`;
        blueprintReady = true;
    }

    return NextResponse.json({ reply, updatedCollected, nextStep, blueprintReady });
  } catch (err) {
    console.error("[Navigator] Error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

// ── 4-Agent pipeline (mirrors Colab logic) ─────────────────────────────────

async function runAgentsAndStore(mode: Mode, data: Record<string, string>) {
  try {
    const { interests, country, education, email } = data;

    // Agent 1 — Career Finder
    const careers = await callOpenAI(`
Act as a global career strategist.
Suggest 5 high-income career paths for someone with these attributes:
Interests: ${interests}
Country: ${country}
Education: ${education}

For each career explain:
- Why it is growing
- Typical salary range
- Key skills required
    `);

    // Agent 2 — Pain Point Analyst
    const painPoints = await callOpenAI(`
Based on these career options:
${careers}

Identify the biggest challenges people face entering these careers:
- Skill gaps
- Hiring barriers
- Education limitations
    `);

    // Agent 3 — 12-Month Roadmap
    const roadmap = await callOpenAI(`
Based on these career challenges:
${painPoints}

Create a practical 12-month roadmap to enter this career field for someone in ${country}:
- Month 1–3: Fundamentals
- Month 4–6: Skill building
- Month 7–9: Portfolio projects
- Month 10–12: Job readiness
    `);

    // Agent 4 — AI Tools Recommender
    const tools = await callOpenAI(`
Based on this roadmap:
${roadmap}

Recommend the best AI tools to accelerate learning:
- Coding tools
- Research tools
- Productivity tools
- Portfolio builders
    `);

    const name = data.name || "there";

    // Send career blueprint to user
    await sendEmail({
      to: email,
      subject: `Your MCKI Career Blueprint is ready, ${name}!`,
      html: buildBlueprintEmail(name, data, careers, painPoints, roadmap, tools),
    });

    // CRM notification to MCKI team
    await sendEmail({
      to: ["Info@mckisolutions.com", "adammasum74@gmail.com"],
      subject: `New Lead: ${name} (${data.country ?? "Unknown"}) — Career Navigator`,
      html: buildCrmEmail(data),
    });

    console.log("[BLUEPRINT] Emails dispatched for", email);

    // Store lead in Supabase (non-blocking, ignore if DB not configured)
    await storeLeadSafe(mode, data, careers);
  } catch (err) {
    console.error("[Navigator] Agent pipeline error:", err);
  }
}

async function callOpenAI(prompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    // Dev fallback when no key configured
    return `[AI analysis for: ${prompt.slice(0, 60)}...]`;
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.7,
      messages: [
        {
          role: "user",
          content: prompt + "\n\nFormat your response using clear headings and bullet points.",
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI error: ${err}`);
  }

  const json = await res.json();
  return json.choices[0].message.content as string;
}

// ── Email sending via Resend REST API ──────────────────────────────────────

async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[Email] RESEND_API_KEY not set — skipping email.");
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "MCKI Solutions <info@mckisolutions.com>",
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[Email] Resend error:", err);
  }
}

function buildBlueprintEmail(
  name: string,
  data: Record<string, string>,
  careers: string,
  painPoints: string,
  roadmap: string,
  tools: string
): string {
  const section = (title: string, body: string) =>
    `<div style="margin:24px 0;">
      <h2 style="color:#1e3a5f;font-size:16px;margin-bottom:8px;border-bottom:2px solid #f4b942;padding-bottom:6px;">${title}</h2>
      <div style="color:#374151;font-size:14px;line-height:1.7;white-space:pre-wrap;">${body}</div>
    </div>`;

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="font-family:system-ui,sans-serif;max-width:620px;margin:0 auto;padding:24px;background:#f9fafb;">
  <div style="background:#1e3a5f;padding:24px;border-radius:12px 12px 0 0;">
    <h1 style="color:#f4b942;margin:0;font-size:22px;">Your Career Blueprint</h1>
    <p style="color:#ffffff99;margin:6px 0 0;">Prepared personally for ${name} by MCKI Solutions</p>
  </div>
  <div style="background:#ffffff;padding:28px;border-radius:0 0 12px 12px;box-shadow:0 2px 8px rgba(0,0,0,.08);">
    <p style="color:#374151;font-size:15px;">Hi ${name},</p>
    <p style="color:#374151;font-size:14px;line-height:1.7;">
      Based on your profile — <strong>${data.interests ?? ""}</strong> interests, currently in <strong>${data.country ?? ""}</strong>
      with <strong>${data.education ?? ""}</strong> background — here is your personalised career intelligence report.
    </p>
    ${section("1. Career Paths", careers)}
    ${section("2. Challenges to Watch", painPoints)}
    ${section("3. Your 12-Month Roadmap", roadmap)}
    ${section("4. AI Tools to Accelerate You", tools)}
    <div style="margin-top:32px;padding:20px;background:#f0f7ff;border-radius:10px;border-left:4px solid #1e3a5f;">
      <p style="margin:0;font-size:14px;color:#1e3a5f;font-weight:600;">Ready to take the next step?</p>
      <p style="margin:8px 0 0;font-size:13px;color:#374151;">Book a free 30-minute consultation with our education advisors.</p>
      <a href="https://mckisolutions.com/local-ed" style="display:inline-block;margin-top:12px;padding:10px 20px;background:#1e3a5f;color:#f4b942;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;">Book Free Consultation →</a>
    </div>
    <p style="margin-top:28px;font-size:12px;color:#9ca3af;">MCKI Solutions · Midlands, United Kingdom · <a href="https://mckisolutions.com" style="color:#1e3a5f;">mckisolutions.com</a></p>
  </div>
</body>
</html>`;
}

function buildCrmEmail(data: Record<string, string>): string {
  const rows = Object.entries(data)
    .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:600;color:#1e3a5f;white-space:nowrap;">${k}</td><td style="padding:6px 12px;color:#374151;">${v}</td></tr>`)
    .join("");

  return `
<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;max-width:520px;margin:0 auto;padding:24px;">
  <h2 style="color:#1e3a5f;">New Career Navigator Lead</h2>
  <table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:8px;overflow:hidden;">
    ${rows}
  </table>
  <p style="font-size:12px;color:#9ca3af;margin-top:16px;">Submitted via MCKI Career Navigator · ${new Date().toUTCString()}</p>
</body>
</html>`;
}

async function storeLeadSafe(
  mode: Mode,
  data: Record<string, string>,
  careerOutput: string
) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  if (!supabaseUrl || supabaseUrl.includes("placeholder")) return;

  try {
    const { createServiceClient } = await import("@/lib/supabase");
    const supabase = createServiceClient();
    const signalScore = calcSignalScore(data.education?.length > 10 ? 5 : 2);

    await supabase.from("leads").insert({
      email: data.email?.toLowerCase(),
      portal: mode === "local" ? "local-ed" : "international-ed",
      signal_score: signalScore,
      data: { ...data, career_output_preview: careerOutput.slice(0, 500) },
    });
  } catch (err) {
    console.warn("[Navigator] Lead storage skipped:", err);
  }
}

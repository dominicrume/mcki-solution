export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { calcSignalScore } from "@/lib/utils";
import { sendBlueprintEmail, sendBlueprintCRM } from "@/lib/email";

type Mode = "local" | "international";

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
      case "collect_email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const email = userMessage.trim();
        if (!emailRegex.test(email)) {
          reply = "That doesn't look like a valid email. Please enter your email address so I can send your report. (e.g. sarah@gmail.com)";
          break;
        }
        updatedCollected = { email };
        nextStep = 1;
        reply = `Perfect — I'll send your Career Blueprint to **${email}**.\n\nWhat's your first name?`;
        break;
      }

      case "collect_name": {
        const name = userMessage.trim();
        updatedCollected = { name };
        nextStep = 2;
        reply = `Great to meet you, ${name}! 👋\n\nWhat are your main interests? (e.g. AI, business, design, healthcare, finance, tech)`;
        break;
      }

      case "collect_interests": {
        updatedCollected = { interests: userMessage.trim() };
        nextStep = 3;
        reply = `Excellent! Which country are you based in?`;
        break;
      }

      case "collect_country": {
        updatedCollected = { country: userMessage.trim() };
        nextStep = 4;
        reply = `Got it. What is your current education level?\n\n(e.g. High School, College, University degree, Postgraduate, Professional experience)`;
        break;
      }

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

        void runAgentsAndStore(mode, allData);
        break;
      }

      default:
        reply = `Your Blueprint is complete and on its way! 📬 Any questions? Call us on +44 7889 417914 or email Info@mckisolutions.com`;
        blueprintReady = true;
    }

    return NextResponse.json({ reply, updatedCollected, nextStep, blueprintReady });
  } catch (err) {
    console.error("[Navigator] Error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

// ── 4-Agent pipeline ───────────────────────────────────────────────────────

async function runAgentsAndStore(mode: Mode, data: Record<string, string>) {
  try {
    const { interests, country, education } = data;

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

    const painPoints = await callOpenAI(`
Based on these career options:
${careers}

Identify the biggest challenges people face entering these careers:
- Skill gaps
- Hiring barriers
- Education limitations
    `);

    const roadmap = await callOpenAI(`
Based on these career challenges:
${painPoints}

Create a practical 12-month roadmap to enter this career field for someone in ${country}:
- Month 1–3: Fundamentals
- Month 4–6: Skill building
- Month 7–9: Portfolio projects
- Month 10–12: Job readiness
    `);

    const tools = await callOpenAI(`
Based on this roadmap:
${roadmap}

Recommend the best AI tools to accelerate learning:
- Coding tools
- Research tools
- Productivity tools
- Portfolio builders
    `);

    await sendBlueprintEmail(data, careers, painPoints, roadmap, tools);
    await sendBlueprintCRM(data);

    console.log("[BLUEPRINT] Emails dispatched for", data.email);

    await storeLeadSafe(mode, data, careers);
  } catch (err) {
    console.error("[Navigator] Agent pipeline error:", err);
  }
}

async function callOpenAI(prompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
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
      messages: [{ role: "user", content: prompt + "\n\nFormat your response using clear headings and bullet points." }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI error: ${err}`);
  }

  const json = await res.json();
  return json.choices[0].message.content as string;
}

async function storeLeadSafe(mode: Mode, data: Record<string, string>, careerOutput: string) {
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

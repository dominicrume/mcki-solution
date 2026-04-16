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

    // Try OpenAI first — gracefully fall back to rich pre-built content
    let careers = await callOpenAI(`
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

    let painPoints = "";
    let roadmap = "";
    let tools = "";

    if (careers) {
      painPoints = await callOpenAI(`
Based on these career options:
${careers}

Identify the biggest challenges people face entering these careers:
- Skill gaps
- Hiring barriers
- Education limitations
      `);
      roadmap = await callOpenAI(`
Based on these career challenges:
${painPoints}

Create a practical 12-month roadmap to enter this career field for someone in ${country}:
- Month 1–3: Fundamentals
- Month 4–6: Skill building
- Month 7–9: Portfolio projects
- Month 10–12: Job readiness
      `);
      tools = await callOpenAI(`
Based on this roadmap:
${roadmap}

Recommend the best AI tools to accelerate learning:
- Coding tools
- Research tools
- Productivity tools
- Portfolio builders
      `);
    }

    // Use fallback if OpenAI not available or returned empty
    if (!careers || !painPoints || !roadmap || !tools) {
      const fallback = buildFallbackBlueprint(data);
      if (!careers)    careers    = fallback.careers;
      if (!painPoints) painPoints = fallback.painPoints;
      if (!roadmap)    roadmap    = fallback.roadmap;
      if (!tools)      tools      = fallback.tools;
    }

    await sendBlueprintEmail(data, careers, painPoints, roadmap, tools);
    await sendBlueprintCRM(data);

    console.log("[BLUEPRINT] Emails dispatched for", data.email);

    await storeLeadSafe(mode, data, careers);
  } catch (err) {
    console.error("[Navigator] Agent pipeline error:", err);
  }
}

// ── Rich fallback content (no OpenAI key needed) ──────────────────────────
function buildFallbackBlueprint(data: Record<string, string>): {
  careers: string;
  painPoints: string;
  roadmap: string;
  tools: string;
} {
  const interests = data.interests?.toLowerCase() ?? "";
  const country = data.country ?? "UK";
  const education = data.education ?? "University degree";

  const isAI = /ai|machine learning|data|tech|software|coding|programming/.test(interests);
  const isFinance = /finance|trading|investment|crypto|banking|fintech/.test(interests);
  const isHealth = /health|medical|nursing|care|pharmacy/.test(interests);
  const isCreative = /design|creative|marketing|media|content|writing/.test(interests);

  let careers: string;
  let painPoints: string;
  let roadmap: string;
  let tools: string;

  if (isAI) {
    careers = `**1. Agentic AI Engineer** — £65,000–£120,000/yr
Build autonomous AI agents that perform tasks end-to-end. Explosive demand across fintech, healthcare, and enterprise. Skills: Python, LangChain, CrewAI, LLM APIs.

**2. Machine Learning Engineer** — £60,000–£110,000/yr
Design and deploy ML models at scale. Top employers: Google, DeepMind, NHS AI Lab. Skills: PyTorch, TensorFlow, MLOps.

**3. AI Product Manager** — £70,000–£130,000/yr
Bridge business and AI engineering. One of the fastest-growing roles in 2026. Skills: product thinking, prompt engineering, stakeholder communication.

**4. Data Scientist** — £50,000–£90,000/yr
Extract insights from complex datasets to drive business decisions. Skills: Python, SQL, statistics, visualisation.

**5. AI Solutions Architect** — £80,000–£140,000/yr
Design enterprise AI infrastructure. Highly paid consulting and advisory roles available. Skills: cloud platforms (GCP/Azure/AWS), system design, LLM integration.`;

    painPoints = `**Skill gaps:** Most beginners underestimate the math (linear algebra, probability) and Python depth required. Start with fundamentals before diving into frameworks.

**Portfolio gaps:** Employers want to see real projects — not just Kaggle notebooks. Build things that solve actual problems.

**Credential confusion:** Certificates are everywhere. Employers in ${country} value demonstrated skills and GitHub portfolios over certificates alone.

**Networking gap:** The AI job market in ${country} runs heavily on referrals. LinkedIn activity and community involvement (meetups, GitHub contributions) open more doors than cold applications.

**Imposter syndrome:** Extremely common. The field moves fast — even senior engineers feel behind. Consistent learning beats perfection.`;

    roadmap = `**Months 1–3: Foundations**
• Complete Python for AI (freeCodeCamp, fast.ai, or Kaggle Learn)
• Study linear algebra and probability basics (3Blue1Brown on YouTube)
• Build 2 mini-projects: a chatbot and a data visualisation dashboard
• Set up GitHub and document everything publicly
• If based in ${country}: check eligibility for government-funded AI courses via Student Finance England

**Months 4–6: Skill Building**
• Deep-dive into LangChain, CrewAI, and the OpenAI API
• Build an agentic workflow that automates a real task (e.g. email drafting, data pipeline)
• Contribute to one open-source AI project
• Attend local AI meetups or join communities (Hugging Face Discord, AI UK events)
• Start a weekly LinkedIn post documenting your learning — this builds your personal brand

**Months 7–9: Portfolio Projects**
• Build a full-stack AI application (front-end + AI backend + deployment)
• Create a "Career Blueprint Generator" or similar useful tool with an LLM
• Write 2–3 technical articles on Medium or Dev.to
• Reach out to 5 companies doing interesting AI work in ${country}

**Months 10–12: Job Readiness**
• Refine your GitHub, LinkedIn, and CV with AI-specific keywords
• Apply to junior AI engineer, data analyst, and ML engineer roles
• Prepare for technical interviews: LeetCode (medium), system design, ML fundamentals
• Consider MCKI Solutions' 8-week Agentic AI programme for a structured pathway with career support`;

    tools = `**Coding & Development**
• Claude Code / GitHub Copilot — AI pair programmer (write code 5x faster)
• Google Colab — free GPU for ML experiments
• VS Code + Python — your core development environment

**AI Frameworks**
• LangChain & LangGraph — build multi-step AI pipelines
• CrewAI — multi-agent coordination
• Hugging Face — access 200,000+ pre-trained models

**Research & Learning**
• NotebookLM (Google) — summarise papers and research in seconds
• Perplexity AI — AI-powered research engine
• arXiv + Semantic Scholar — stay on top of AI research

**Productivity**
• Notion AI — organise your learning roadmap
• Cursor — AI-native code editor
• N8N / Make.com — build AI automations without full coding

**Portfolio Builders**
• GitHub — host all your projects
• Streamlit — turn Python scripts into demo web apps in minutes
• Hugging Face Spaces — deploy AI demos for free`;
  } else if (isFinance) {
    careers = `**1. Quantitative Analyst (Quant)** — £70,000–£150,000/yr
Build mathematical models for trading strategies and risk management. Skills: Python, statistics, financial modelling.

**2. AI Trading Systems Developer** — £65,000–£130,000/yr
Design automated trading bots using ML signal engines. High demand in hedge funds and fintech.

**3. Financial Data Analyst** — £45,000–£80,000/yr
Interpret market data to support investment decisions. Entry point for many finance careers.

**4. FinTech Product Manager** — £60,000–£110,000/yr
Lead AI-powered financial products. Fast-growing sector across ${country}.

**5. Crypto / DeFi Developer** — £55,000–£120,000/yr
Build decentralised financial applications on blockchain. Solidity, Web3.js, smart contracts.`;

    painPoints = `**Regulatory complexity:** Financial services in ${country} are FCA-regulated. Understanding compliance requirements is essential before entering the sector.

**Math barriers:** Quantitative roles require strong statistics and calculus. Many candidates underestimate this requirement.

**Experience Catch-22:** Entry-level finance roles often want 2+ years of experience. Internships and simulation trading accounts help bridge this gap.

**Credentials:** CFA, FRM, and fintech-specific certifications carry weight. Government-funded postgraduate loans in ${country} can cover study costs.`;

    roadmap = `**Months 1–3:** Python for finance (yFinance, Pandas), Excel modelling, study financial markets basics
**Months 4–6:** Build a trading signal simulator, learn options pricing, study FCA regulation basics
**Months 7–9:** Complete a fintech project (portfolio tracker, crypto dashboard), network on LinkedIn Finance communities
**Months 10–12:** Apply for analyst roles, target fintech startups and challenger banks in ${country}`;

    tools = `**Trading & Analysis:** TradingView, Bloomberg Terminal (student access), Yahoo Finance API
**Coding:** Python (Pandas, NumPy, QuantLib), Jupyter Notebooks
**AI Tools:** Claude for financial document analysis, ChatGPT for scenario modelling
**Learning:** Investopedia, CFA Institute resources, Coursera Financial Engineering`;
  } else if (isHealth) {
    careers = `**1. Digital Health Product Manager** — £55,000–£95,000/yr\n**2. Health Data Analyst** — £40,000–£70,000/yr\n**3. Clinical AI Specialist** — £50,000–£85,000/yr\n**4. Healthcare IT Consultant** — £45,000–£80,000/yr\n**5. Telehealth Platform Developer** — £50,000–£90,000/yr`;
    painPoints = `Regulatory barriers (MHRA, CQC), long qualification timelines, data privacy constraints (GDPR + NHS data), funding cycles tied to NHS budgets.`;
    roadmap = `**M1–3:** Study NHS Digital strategy, complete a health data course\n**M4–6:** Build a health analytics project, explore NHS Digital Academy\n**M7–9:** Network with NHS innovation hubs, apply for NHS Innovation Accelerator\n**M10–12:** Apply for digital health roles or NHS Graduate Scheme`;
    tools = `Python (for NHS data analysis), Tableau (dashboards), NHS Data Dictionary, FHIR APIs, Microsoft Azure Health Data Services`;
  } else if (isCreative) {
    careers = `**1. AI Content Strategist** — £40,000–£75,000/yr\n**2. UX/UI Designer (AI-assisted)** — £45,000–£85,000/yr\n**3. Digital Marketing Manager** — £40,000–£70,000/yr\n**4. Brand & Creative Director** — £55,000–£100,000/yr\n**5. Multimedia Producer** — £35,000–£65,000/yr`;
    painPoints = `Commoditisation pressure from AI tools, portfolio differentiation, freelance income instability, staying ahead of rapid tool changes.`;
    roadmap = `**M1–3:** Master 3 AI creative tools (Midjourney, Claude, Runway), build a public portfolio\n**M4–6:** Launch a creative project or newsletter, grow LinkedIn presence\n**M7–9:** Land freelance clients or internship, document case studies\n**M10–12:** Apply for creative roles or launch independent studio`;
    tools = `Midjourney / DALL-E (visuals), Claude / ChatGPT (copy), Runway (video), Figma (design), Canva AI, Adobe Firefly`;
  } else {
    careers = `**1. Business Analyst** — £40,000–£75,000/yr — growing demand in all sectors in ${country}
**2. Project Manager (Agile/AI)** — £50,000–£85,000/yr — AI tools transforming delivery speed
**3. Operations Manager** — £45,000–£80,000/yr — AI automation creating new efficiency roles
**4. Digital Transformation Consultant** — £60,000–£110,000/yr — high demand across enterprise
**5. Entrepreneur / Startup Founder** — unlimited potential — AI lowering barriers to entry significantly`;
    painPoints = `Skill gaps in data literacy, uncertainty about which AI tools to adopt, and competition from candidates with specialist backgrounds. Education level (${education}) may need topping-up for senior roles.`;
    roadmap = `**M1–3:** Identify your strongest transferable skills, complete a relevant online course (Coursera, LinkedIn Learning)
**M4–6:** Build one project that demonstrates initiative, start posting on LinkedIn weekly
**M7–9:** Network in target sector, informational interviews with 10 professionals
**M10–12:** Apply for roles, negotiate with confidence, consider postgraduate study via Student Finance England`;
    tools = `Claude AI (research & writing), Notion (productivity), LinkedIn Premium (job search), Google Analytics (data literacy), Microsoft Copilot (workplace AI)`;
  }

  return { careers, painPoints, roadmap, tools };
}

async function callOpenAI(prompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    // Return empty string — caller handles fallback via buildFallbackBlueprint
    return "";
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

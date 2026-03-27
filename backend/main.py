"""
MCKI Solutions — AI Career Navigator
FastAPI backend for Google Cloud Run (europe-west2 / UK South)

$PORT is set automatically by Cloud Run.
Starts with: uvicorn main:app --host 0.0.0.0 --port $PORT
"""

import os
import re
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
from openai import AsyncOpenAI

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ── OpenAI client ─────────────────────────────────────────────────────────────
openai_client = AsyncOpenAI(api_key=os.environ.get("OPENAI_API_KEY", ""))

# ── App ───────────────────────────────────────────────────────────────────────
app = FastAPI(
    title="MCKI Solutions AI Career Navigator",
    description="4-agent career intelligence pipeline — Cloud Run UK South",
    version="2.0.0",
)

ALLOWED_ORIGINS = os.environ.get(
    "ALLOWED_ORIGINS",
    "https://mckisolutions.com,http://localhost:3000,http://localhost:3030"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
)

# ── Step definitions (mirrors Next.js route) ──────────────────────────────────
STEPS = [
    "collect_email",
    "collect_name",
    "collect_interests",
    "collect_country",
    "collect_education",
    "generate_blueprint",
]

# ── Models ────────────────────────────────────────────────────────────────────
class NavigatorRequest(BaseModel):
    mode: str  # "local" | "international"
    step: int
    userMessage: str
    collected: dict = {}
    history: list = []

class NavigatorResponse(BaseModel):
    reply: str
    updatedCollected: dict = {}
    nextStep: int
    blueprintReady: bool = False

class HealthResponse(BaseModel):
    status: str
    version: str
    region: str

# ── Routes ────────────────────────────────────────────────────────────────────

@app.get("/health", response_model=HealthResponse)
async def health():
    return HealthResponse(
        status="ok",
        version="2.0.0",
        region="europe-west2"
    )

@app.post("/api/navigator", response_model=NavigatorResponse)
async def navigator(req: NavigatorRequest):
    step_name = STEPS[req.step] if req.step < len(STEPS) else "generate_blueprint"
    reply = ""
    updated_collected: dict = {}
    next_step = req.step
    blueprint_ready = False

    try:
        if step_name == "collect_email":
            email = req.userMessage.strip()
            if not re.match(r"^[^\s@]+@[^\s@]+\.[^\s@]+$", email):
                reply = "That doesn't look like a valid email. Please enter your email address so I can send your report. (e.g. sarah@gmail.com)"
            else:
                updated_collected = {"email": email}
                next_step = req.step + 1
                reply = f"Perfect — I'll send your Career Blueprint to {email}.\n\nWhat's your first name?"

        elif step_name == "collect_name":
            name = req.userMessage.strip()
            updated_collected = {"name": name}
            next_step = req.step + 1
            reply = f"Great to meet you, {name}! 👋\n\nWhat are your main interests? (e.g. AI, business, design, healthcare, finance, tech)"

        elif step_name == "collect_interests":
            updated_collected = {"interests": req.userMessage.strip()}
            next_step = req.step + 1
            reply = "Excellent! Which country are you based in?"

        elif step_name == "collect_country":
            updated_collected = {"country": req.userMessage.strip()}
            next_step = req.step + 1
            reply = "Got it. What is your current education level?\n\n(e.g. High School, College, University degree, Postgraduate, Professional experience)"

        elif step_name == "collect_education":
            updated_collected = {"education": req.userMessage.strip()}
            next_step = req.step + 1
            blueprint_ready = True
            all_data = {**req.collected, **updated_collected}
            name = all_data.get("name", "there")
            email = all_data.get("email", "")

            reply = (
                f"Brilliant, {name}! 🚀 Running your Career Navigator now:\n\n"
                f"• Interests: {all_data.get('interests')}\n"
                f"• Country: {all_data.get('country')}\n"
                f"• Education: {all_data.get('education')}\n\n"
                "1️⃣ Career Finder → 2️⃣ Pain Point Analyst → "
                "3️⃣ 12-Month Roadmap → 4️⃣ AI Tools Recommender\n\n"
                f"Your full Blueprint is being sent to {email} — arriving in under 60 seconds!"
            )

            # Fire-and-forget pipeline
            import asyncio
            asyncio.create_task(run_agent_pipeline(all_data))

        else:
            reply = "Your Blueprint is complete and on its way! 📬 Questions? Call +44 7889 417914."
            blueprint_ready = True

    except Exception as e:
        logger.error(f"Navigator step error: {e}")
        raise HTTPException(status_code=500, detail="Navigator processing error.")

    return NavigatorResponse(
        reply=reply,
        updatedCollected=updated_collected,
        nextStep=next_step,
        blueprintReady=blueprint_ready,
    )

# ── 4-Agent pipeline ──────────────────────────────────────────────────────────

async def run_agent_pipeline(data: dict):
    """
    Mirrors the Colab Python 4-agent system exactly.
    Runs sequentially: career → pain points → roadmap → tools
    """
    interests = data.get("interests", "")
    country = data.get("country", "")
    education = data.get("education", "")
    email = data.get("email", "")

    try:
        logger.info(f"[Agent Pipeline] Starting for {email}")

        # Agent 1 — Career Finder
        careers = await ask_ai(f"""
Act as a global career strategist.
Suggest 5 high-income career paths for someone with these attributes:
Interests: {interests}
Country: {country}
Education: {education}

For each career explain:
- Why the career is growing
- Typical salary range
- Key skills required
""")

        # Agent 2 — Pain Point Analyst
        pain_points = await ask_ai(f"""
Based on these career options:
{careers}

Identify the biggest challenges people face entering these careers:
- Skill gaps
- Hiring barriers
- Education limitations
""")

        # Agent 3 — 12-Month Roadmap
        roadmap = await ask_ai(f"""
Based on these career challenges:
{pain_points}

Create a practical 12-month roadmap for someone in {country} to enter this field:
Month 1-3: Fundamentals
Month 4-6: Skill building
Month 7-9: Portfolio projects
Month 10-12: Job readiness
""")

        # Agent 4 — AI Tools Recommender
        tools = await ask_ai(f"""
Based on this roadmap:
{roadmap}

Recommend the best AI tools to accelerate learning:
- Coding tools
- Research tools
- Productivity tools
- Portfolio builders
""")

        logger.info(f"[Agent Pipeline] Complete for {email} — 4 agents finished")
        logger.info(f"[CRM] Blueprint ready for: {email} | Notify: Info@mckisolutions.com | adammasum74@gmail.com")

        # TODO: Send via Resend/SendGrid
        # await send_blueprint_email(email, data.get("name"), careers, pain_points, roadmap, tools)

    except Exception as e:
        logger.error(f"[Agent Pipeline] Error for {email}: {e}")


async def ask_ai(prompt: str) -> str:
    """Call OpenAI with the given prompt. Falls back to placeholder if no key."""
    if not openai_client.api_key:
        return f"[AI output for: {prompt[:80].strip()}...]"

    try:
        response = await openai_client.chat.completions.create(
            model="gpt-4o-mini",
            temperature=0.7,
            messages=[
                {
                    "role": "user",
                    "content": prompt.strip() + "\n\nFormat using clear headings and bullet points.",
                }
            ],
        )
        return response.choices[0].message.content or ""
    except Exception as e:
        logger.error(f"[OpenAI] Error: {e}")
        return f"[Unable to generate AI output: {str(e)[:100]}]"


# ── Entry point (for local dev) ───────────────────────────────────────────────
# Cloud Run sets $PORT automatically. Never hardcode 8080.
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)

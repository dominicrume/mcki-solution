import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Calendar, MapPin, Clock, Cpu, Users,
  CheckCircle2, Star, Zap, Brain, TrendingUp, Code2,
} from "lucide-react";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Agentic AI Masterclass — June 6, 2026 | MCKI Solutions",
  description:
    "Join us for a hands-on Agentic AI Masterclass on June 6, 2026. Learn how AI agents are transforming business, finance, and careers. Only £31 — limited seats.",
  alternates: { canonical: "https://mckisolutions.com/events" },
  openGraph: {
    title: "Agentic AI Masterclass — June 6, 2026",
    description: "Hands-on Agentic AI training event. Only £31. Limited seats.",
    url: "https://mckisolutions.com/events",
  },
};

/* ── Data ─────────────────────────────────────────────────────────────────── */

const agenda = [
  {
    time: "1:00 PM",
    title: "Welcome & The Agentic AI Landscape",
    desc:  "Why AI agents are fundamentally different from ChatGPT — and why this shift matters for your career and business right now.",
  },
  {
    time: "1:35 PM",
    title: "Agents in Action: Live Demos",
    desc:  "See real Agentic AI workflows in finance, education, and operations. Not slides — live, working systems.",
  },
  {
    time: "2:10 PM",
    title: "Building Your First AI Agent",
    desc:  "Hands-on workshop. You will build and run a simple autonomous agent yourself — no prior coding experience required. Tools: Google Colab, Claude Code, LangChain, CrewAI, N8N.",
  },
  {
    time: "2:35 PM",
    title: "AI for Business — Victor Okafor Session",
    desc:  "Victor Okafor (CEO, Jali Group) shares how AI is transforming operations, finance, and enterprise decision-making. Real-world case studies from the boardroom.",
  },
  {
    time: "3:10 PM",
    title: "From Learner to Builder — Career & Business Paths",
    desc:  "How to position yourself in an AI-first economy. Funded training routes, certifications, and next steps.",
  },
  {
    time: "3:40 PM",
    title: "Q&A with All Speakers + Open Networking",
    desc:  "Direct access to all three speakers. Bring your hardest questions.",
  },
];

const whatYouLearn = [
  "What Agentic AI is — and why it is not just another chatbot",
  "How AI agents are already transforming finance, healthcare, and education",
  "How to build a simple autonomous AI agent from scratch",
  "Which AI skills employers and clients are paying a premium for in 2026",
  "Funded training pathways to deepen your AI expertise (some fully government-funded)",
  "How MCKI's AI & Blockchain specialist programmes can fast-track your career",
];

const speakers = [
  {
    initial: "S",
    name:    "Shofiqul Haque",
    title:   "Founder, MCKI Solutions",
    bio:     "Shofiqul has spent over a decade helping UK residents access education and unlock career opportunities that once felt out of reach. As Founder of MCKI Solutions, he has guided 500+ students into university and government-funded programmes. His focus in 2026 is helping working professionals transition into AI-augmented roles — without needing a computer science background.",
  },
  {
    initial: "R",
    name:    "Rume Dominic",
    title:   "Agentic AI Engineer & Product Strategist",
    bio:     "Rume is a senior agentic AI engineer with hands-on experience building autonomous agent systems for enterprise clients. With a background spanning product management and AI systems design, he brings a rare combination of technical depth and business clarity. He will lead the live build workshop and the career-transition strategy session.",
  },
  {
    initial: "V",
    name:    "Victor Okafor",
    title:   "CEO · Jali Group",
    bio:     "Victor is the CEO of Jali Group, a business leader who has built and scaled operations across multiple sectors. He brings a boardroom perspective on how AI is reshaping enterprise strategy, operations, and competitive advantage — giving attendees a rare, unfiltered view of what AI adoption actually looks like at the executive level.",
  },
];

const faqs = [
  {
    q: "Do I need a technical background to attend?",
    a: "No. The event is designed to be accessible whether you are a complete beginner or an experienced professional. The hands-on workshop is guided step by step.",
  },
  {
    q: "What is included in the £31 ticket?",
    a: "Full-day access to all sessions and workshops, networking lunch, speaker Q&A, and a digital resource pack with tools and learning pathways to take home.",
  },
  {
    q: "Where is the event held?",
    a: "The event is at Revenhurst House, Ravenhurst Street, Digbeth, Birmingham B12 0HD. It is also available via Zoom for remote attendees. Parking and access details will be sent by email once you book.",
  },
  {
    q: "Can I get a refund if I cannot attend?",
    a: "Yes. Full refunds are available up to 7 days before the event. After that, your ticket is transferable to another person.",
  },
  {
    q: "Is there a group discount?",
    a: "Yes — groups of 3 or more get 20% off. Email us at Info@mckisolutions.com with the subject line 'Group Booking — June 6' and we will send you a discount code.",
  },
];

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function EventsPage() {
  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="bg-hero-gradient text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.04] dot-grid" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            {/* Event badge */}
            <div className="inline-flex items-center gap-2 bg-gold-300/20 border border-gold-300/40 text-gold-300 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Zap size={13} />
              Live Event · Midlands · June 6, 2026
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              The Agentic AI
              <span className="block text-gold-300">Masterclass</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-6 max-w-2xl">
              AI is not replacing jobs — it is replacing people who do not understand AI.
              Spend one day learning exactly how autonomous AI agents work, how to build one,
              and how to position yourself ahead of the shift. Practical. Hands-on. No hype.
            </p>

            {/* Quick facts strip */}
            <div className="flex flex-wrap gap-5 mb-10 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <Calendar size={15} className="text-gold-300" /> Saturday, 6 June 2026
              </span>
              <span className="flex items-center gap-2">
                <Clock size={15} className="text-gold-300" /> 1:00 PM — 4:00 PM
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={15} className="text-gold-300" /> Revenhurst House, Digbeth, Birmingham B12 0HD
              </span>
              <span className="flex items-center gap-2">
                <Users size={15} className="text-gold-300" /> Hybrid · Birmingham + Zoom · 50 seats
              </span>
            </div>

            {/* Price + CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/local-ed#book-consultation"
                className="btn-primary text-base"
              >
                Reserve My Seat — £31 <ArrowRight size={18} />
              </Link>
              <span className="text-white/50 text-sm">
                Seats filling fast · Group discounts available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS STRIP ──────────────────────────────────────────────── */}
      <section className="bg-white border-b border-brand-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: "£31",   label: "Early-Bird Ticket" },
              { value: "50",    label: "Seats Available" },
              { value: "3",     label: "Expert Speakers" },
              { value: "3 hrs", label: "Full Immersion" },
            ].map((s) => (
              <div key={s.label} className="stat-box">
                <p className="text-3xl sm:text-4xl font-extrabold text-navy-500">{s.value}</p>
                <p className="text-sm text-brand-muted font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. WHAT YOU WILL LEARN ──────────────────────────────────────── */}
      <section className="section-full section-alt">
        <div className="section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-label">The Programme</p>
              <h2 className="section-heading text-3xl sm:text-4xl mb-4">
                What You Will Walk Away With
              </h2>
              <div className="gold-bar mb-8" />
              <ul className="space-y-4">
                {whatYouLearn.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-navy-500 flex-shrink-0 mt-0.5" />
                    <span className="text-brand-text font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link href="/local-ed#book-consultation" className="btn-navy inline-flex">
                  Book My Place — £31 <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* AI courses card panel */}
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-muted">
                Specialist Programmes Featured at the Event
              </p>
              {[
                { icon: Brain,      title: "AI for Data Analysis",            level: "Specialist Certificate" },
                { icon: TrendingUp, title: "AI for Trading",                  level: "Specialist Certificate" },
                { icon: Code2,      title: "AI for Software Development",     level: "Specialist Certificate" },
                { icon: Cpu,        title: "Blockchain & Web3 Fundamentals",  level: "Specialist Certificate" },
                { icon: Star,       title: "AI & Machine Learning Applications", level: "Specialist Certificate" },
              ].map((c) => (
                <div
                  key={c.title}
                  className="bg-white rounded-2xl border border-brand-border p-5 shadow-card flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center flex-shrink-0">
                    <c.icon size={20} className="text-navy-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-500 text-sm">{c.title}</p>
                    <p className="text-brand-muted text-xs">{c.level}</p>
                  </div>
                </div>
              ))}
              <p className="text-xs text-brand-muted mt-2">
                Government-funded routes may be available.{" "}
                <Link href="/local-ed" className="text-navy-500 font-medium underline underline-offset-2">
                  Check eligibility →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. AGENDA ───────────────────────────────────────────────────── */}
      <section className="section-full bg-white">
        <div className="section">
          <div className="text-center mb-14">
            <p className="section-label mx-auto">Programme</p>
            <h2 className="section-heading text-3xl sm:text-4xl mb-4">Full Day Agenda</h2>
            <div className="gold-bar mx-auto" />
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {agenda.map((item) => (
              <div key={item.time} className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-16 text-right">
                  <span className="text-sm font-bold text-navy-500 font-mono">{item.time}</span>
                </div>
                <div className="w-px bg-brand-border self-stretch" />
                <div className="pb-4 flex-1">
                  <p className="font-semibold text-navy-500 mb-1">{item.title}</p>
                  <p className="text-brand-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. SPEAKERS ─────────────────────────────────────────────────── */}
      <section className="section-full section-alt">
        <div className="section">
          <div className="text-center mb-14">
            <p className="section-label mx-auto">Your Speakers</p>
            <h2 className="section-heading text-3xl sm:text-4xl mb-4">
              Learn From Practitioners, Not Theorists
            </h2>
            <div className="gold-bar mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {speakers.map((sp) => (
              <div
                key={sp.name}
                className="bg-white rounded-3xl border border-brand-border shadow-card p-8"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-full bg-navy-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-gold-300 font-extrabold text-2xl">{sp.initial}</span>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-navy-500 text-lg">{sp.name}</p>
                    <p className="text-brand-muted text-sm">{sp.title}</p>
                  </div>
                </div>
                <p className="text-brand-muted text-sm leading-relaxed">{sp.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FEBRUARY 2026 EVENT SOCIAL PROOF ────────────────────────── */}
      <section className="section-full bg-white">
        <div className="section">
          <div className="text-center mb-12">
            <p className="section-label mx-auto">From Our Last Event</p>
            <h2 className="section-heading text-3xl sm:text-4xl mb-4">
              Birmingham, February 2026 — In the Room
            </h2>
            <div className="gold-bar mx-auto mb-4" />
            <p className="section-subheading mx-auto text-center">
              Our February cohort sold out. Here is what attendees said.
            </p>
          </div>

          {/* Photo placeholders — replace src values with real images */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              { label: "Workshop Session",      file: "/events/feb-2026-workshop.jpg" },
              { label: "Networking",            file: "/events/feb-2026-networking.jpg" },
              { label: "Speaker Presentation",  file: "/events/feb-2026-speaker.jpg" },
            ].map((img) => (
              <div
                key={img.label}
                className="aspect-[4/3] rounded-2xl bg-navy-50 border-2 border-dashed border-brand-border
                           flex flex-col items-center justify-center gap-2 text-brand-muted"
              >
                {/* Replace this div with <Image src={img.file} ... /> once photos are uploaded */}
                <Cpu size={32} className="text-navy-200" />
                <p className="text-xs font-medium">{img.label}</p>
                <p className="text-[10px] text-brand-muted/60">Upload: {img.file}</p>
              </div>
            ))}
          </div>

          {/* Testimonials from Feb event */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "I came in sceptical — I left with a working AI agent running on my laptop and a clear plan for my next career move.",
                name: "Aisha M.",
                role: "Operations Manager, Birmingham",
              },
              {
                quote: "The speakers gave us real systems, not theory. The lunch break networking alone was worth the ticket price.",
                name: "James O.",
                role: "Finance Analyst, Coventry",
              },
              {
                quote: "I had no idea there were government-funded routes into AI. MCKI opened doors I did not know existed.",
                name: "Priya S.",
                role: "Teacher, Wolverhampton",
              },
            ].map((t) => (
              <div key={t.name} className="card-testimonial">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-gold-300 fill-gold-300" />
                  ))}
                </div>
                <p className="text-brand-text leading-relaxed flex-1 text-sm">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-brand-border">
                  <div className="w-8 h-8 rounded-full bg-navy-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-gold-300 font-bold text-xs">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-navy-500 text-xs">{t.name}</p>
                    <p className="text-brand-muted text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. PRICING ──────────────────────────────────────────────────── */}
      <section className="section-full bg-white">
        <div className="section">
          <div className="text-center mb-12">
            <p className="section-label mx-auto">Pricing</p>
            <h2 className="section-heading text-3xl sm:text-4xl mb-4">Choose Your Path</h2>
            <div className="gold-bar mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                label: "1-Day Event",
                price: "£31",
                desc: "Full afternoon access to all sessions, live demos, hands-on workshop, and speaker Q&A. Hybrid — attend in Birmingham or on Zoom.",
                highlight: false,
                cta: "Reserve My Seat",
              },
              {
                label: "8-Week Group Programme",
                price: "£699",
                desc: "Eight weeks of structured Agentic AI training in a cohort group. Includes all tools, projects, and weekly live sessions with instructors.",
                highlight: true,
                cta: "Enrol Now",
              },
              {
                label: "8-Week Personal 1:1",
                price: "£999",
                desc: "Fully personalised 1:1 mentorship programme. Tailored curriculum, direct access to your AI engineer, and bespoke project work.",
                highlight: false,
                cta: "Book 1:1",
              },
            ].map((plan) => (
              <div
                key={plan.label}
                className={`card p-8 flex flex-col gap-4 relative ${
                  plan.highlight ? "border-2 border-gold-300 shadow-lg" : ""
                }`}
              >
                {plan.highlight && (
                  <span className="badge bg-gold-300/20 text-gold-300 border border-gold-300/30 absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    Most Popular
                  </span>
                )}
                <p className="font-heading font-bold text-navy-500 text-lg">{plan.label}</p>
                <p className="text-4xl font-extrabold text-navy-500">{plan.price}</p>
                <p className="text-brand-muted text-sm leading-relaxed flex-1">{plan.desc}</p>
                <Link href="/local-ed#book-consultation" className="btn-navy justify-center">
                  {plan.cta} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ──────────────────────────────────────────────────────── */}
      <section className="section-full section-alt">
        <div className="section">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="section-label mx-auto">FAQ</p>
              <h2 className="section-heading text-3xl mb-3">Common Questions</h2>
              <div className="gold-bar mx-auto" />
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="card p-6">
                  <p className="font-semibold text-navy-500 mb-2">{faq.q}</p>
                  <p className="text-brand-muted text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. FINAL CTA ────────────────────────────────────────────────── */}
      <section className="section-full bg-navy-gradient text-white">
        <div className="section">
          <div className="max-w-2xl mx-auto text-center">
            <p className="section-label text-gold-300 mx-auto">June 6, 2026</p>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4">
              50 Seats. £31. One Afternoon That Changes Your Direction.
            </h2>
            <div className="gold-bar mx-auto mb-6" />
            <p className="text-white/80 text-lg mb-10">
              This is the most practical AI training event happening in the Midlands this year.
              Do not wait until the seats are gone.
            </p>
            <Link href="/local-ed#book-consultation" className="btn-primary text-base">
              Reserve My Place — £31 <ArrowRight size={18} />
            </Link>
            <p className="mt-4 text-white/40 text-xs">
              Group bookings: {BRAND.email} · Subject: &ldquo;Group Booking — June 6&rdquo;
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, GraduationCap, BookOpen,
  Cpu, Star, ChevronRight, Shield, Clock, Users,
  Brain, TrendingUp, Code2, Zap,
} from "lucide-react";
import { BRAND, STATS, UNIVERSITY_PARTNERS } from "@/lib/constants";

// Lazy-load the client form — keeps the critical SSR path JS-free
const HomepageConsultationForm = dynamic(
  () => import("@/components/HomepageConsultationForm").then((m) => m.HomepageConsultationForm),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "MCKI Solutions | UK Postgraduate Education Consultancy & Funding Guidance",
  alternates: { canonical: "https://mckisolutions.com" },
};

/* ── Static data ──────────────────────────────────────────────────────────── */

const services = [
  {
    icon: GraduationCap,
    title: "University Admissions Support",
    body: "We find the right programme for where you want to go, and take care of the application so you can focus on everything else.",
    href: "/local-ed",
    cta: "Explore Admissions",
  },
  {
    icon: BookOpen,
    title: "Student Finance Guidance",
    body: "Many people don't realise they qualify for government funding. We check your eligibility, explain what you can access, and guide your application from first form to final approval.",
    href: "#book-consultation",
    cta: "Check My Eligibility",
  },
  {
    icon: Cpu,
    title: "Personal Career Guidance",
    body: "We look at where you are, where you want to be, and help you figure out which postgraduate route gets you there fastest — with a clear, honest picture of what to expect.",
    href: "#book-consultation",
    cta: "Talk to an Advisor",
  },
];

const whyMcki = [
  "Free initial consultation — no obligation, no sales pitch",
  "Consultants with 10+ years of hands-on UK higher education experience",
  "We give you honest advice, even when that means telling you to wait",
  "End-to-end support — from your first question to your enrolment letter",
  "Trusted by students and working professionals across England",
];

const testimonials = [
  {
    quote: "I had no idea I could get funding for a Master's. MCKI checked my eligibility, explained everything in plain English, and guided me through every form. I wouldn't have done it without them.",
    name: "Sarah O.",
    role: "MSc Management Student, Aston University",
    rating: 5,
  },
  {
    quote: "I kept putting it off because it felt complicated. One conversation with the team and it suddenly felt possible. I start my MBA this September.",
    name: "Marcus T.",
    role: "MBA Candidate, Birmingham City University",
    rating: 5,
  },
  {
    quote: "They were straightforward with me about what courses would actually help my career and which ones wouldn't. That honesty is rare. I got my place in under three weeks.",
    name: "Priya K.",
    role: "MA Education Student, University of Wolverhampton",
    rating: 5,
  },
];

const aiCourses = [
  { icon: Brain,      title: "AI for Data Analysis",               desc: "Turn raw data into business intelligence using modern AI tools — no statistics degree required." },
  { icon: TrendingUp, title: "AI for Trading",                     desc: "Understand and apply algorithmic and AI-driven strategies across crypto and FX markets." },
  { icon: Code2,      title: "AI for Software Development",        desc: "Use AI co-pilots, agents, and automation to write, test, and ship code faster than ever." },
  { icon: Cpu,        title: "Blockchain & Web3 Fundamentals",     desc: "Build on-chain confidence — from smart contracts to decentralised applications." },
  { icon: Star,       title: "AI & Machine Learning Applications", desc: "A practical survey of ML applications across industries — built for non-engineers." },
];

const teamMembers = [
  {
    initial: "S",
    name: "Shofiqul Haque",
    title: "Founder, MCKI Solutions",
    bio: "Shofiqul founded MCKI Solutions after witnessing too many people walk away from genuine opportunities — not because they lacked ability, but because no one took the time to explain their options. With over a decade of hands-on experience in UK higher education, he has personally guided 500+ students into universities and government-funded programmes. His focus in 2026 is expanding MCKI's AI training division to help working professionals future-proof their careers.",
  },
  {
    initial: "R",
    name: "Rume Dominic",
    title: "Agentic AI Engineer & Product Strategist",
    bio: "Rume is a senior agentic AI engineer and product strategist with deep experience building autonomous agent systems for enterprise clients. Combining technical expertise with a product management background, he specialises in translating cutting-edge AI into practical business value. He co-leads MCKI's Agentic AI Masterclass series and heads the AI curriculum design for the specialist programmes.",
  },
];

const faqs = [
  {
    q: "What is MCKI Solutions?",
    a: "We are a postgraduate education consultancy based in the Midlands. We help UK residents get into university, access Student Finance England funding, and work out the best next step for their career — with a free, no-obligation consultation.",
  },
  {
    q: "Do I qualify for Student Finance England postgraduate funding?",
    a: "More people qualify than you'd think. If you are a UK resident looking to study a postgraduate Master's degree, there is a good chance you are eligible. We check for free and walk you through what you can access.",
  },
  {
    q: "Is the initial consultation really free?",
    a: "Yes — genuinely free. We have a conversation, understand your situation, and give you honest advice. There is no pitch, no pressure, and no obligation to do anything after.",
  },
  {
    q: "How long does the university admissions process take?",
    a: "Most students we work with receive conditional offers within 2–4 weeks. We manage the full application so you are never left wondering what happens next.",
  },
  {
    q: "I don't have a degree. Can I still apply for a Master's?",
    a: "Yes. Many UK universities accept relevant work experience in place of an undergraduate degree. We identify which institutions offer this pathway and find the right fit for your background.",
  },
];

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* ── 0. ANNOUNCEMENT BAR ─────────────────────────────────────────── */}
      <div className="bg-[#FFD700] text-navy-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-3 flex-wrap text-center">
          <Zap size={15} className="flex-shrink-0" />
          <span className="text-sm font-bold">
            Agentic AI Masterclass — Saturday 6 June 2026, Birmingham · Only £31
          </span>
          <Link
            href="/events"
            className="text-xs font-extrabold uppercase tracking-wide underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            Reserve Your Seat →
          </Link>
        </div>
      </div>

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="bg-hero-gradient text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.04] dot-grid" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl animate-fade-up">
            <p className="section-label text-gold-300 mb-4">
              UK Postgraduate Education Consultancy
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              You&apos;ve Been Thinking About It.
              <span className="block text-gold-300">
                Let&apos;s Figure It Out Together.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl">
              Postgraduate study can feel out of reach — too expensive, too
              complicated, too uncertain. We cut through all of that. No jargon,
              no pressure, no hidden agenda. Just an honest conversation about
              your options, what funding you can access, and your clearest path
              forward. Completely free.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#book-consultation" className="btn-primary text-base">
                Start Your Free Consultation <ArrowRight size={18} />
              </Link>
              <Link href="#services" className="btn-ghost-white text-base">
                Explore Our Services
              </Link>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap gap-3">
            {["Free Consultation", "No Obligation", "No Jargon", "No Hidden Fees"].map((t) => (
              <span
                key={t}
                className="flex items-center gap-1.5 text-xs font-medium text-white/70 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full"
              >
                <CheckCircle2 size={11} className="text-gold-300" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. STATS BAR ────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-brand-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {STATS.map((s) =>
              s.label === "Agentic AI Event 2026" ? (
                <Link
                  key={s.label}
                  href="/events"
                  className="stat-box rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/40 hover:bg-[#FFD700]/20 transition-colors group"
                >
                  <p className="text-3xl sm:text-4xl font-extrabold text-navy-500 group-hover:text-navy-600">
                    {s.value}
                  </p>
                  <p className="text-sm text-navy-500 font-bold">{s.label}</p>
                </Link>
              ) : (
                <div key={s.label} className="stat-box">
                  <p className="text-3xl sm:text-4xl font-extrabold text-navy-500">
                    {s.value}
                  </p>
                  <p className="text-sm text-brand-muted font-medium">{s.label}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── 3. ABOUT ────────────────────────────────────────────────────── */}
      <section id="about" className="section-alt">
        <div className="section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              <p className="section-label">About Us</p>
              <h2 className="section-heading text-3xl sm:text-4xl mb-4">Who We Are</h2>
              <div className="gold-bar mb-6" />
              <p className="text-brand-muted text-lg leading-relaxed mb-6">
                MCKI Solutions is a specialist education consultancy based in the
                Midlands. We work with UK residents who want to take their career
                somewhere new — and need someone in their corner to help them get
                there. No jargon, no pressure, no hidden fees.
              </p>
              <p className="text-brand-muted leading-relaxed mb-8">
                As a leading{" "}
                <strong className="text-navy-500">postgraduate education consultancy UK</strong>
                , our team has guided over 500 students through every stage of their
                journey — from first enquiry to graduation. Whether you need{" "}
                <strong className="text-navy-500">university admissions support UK</strong>
                {" "}or expert{" "}
                <strong className="text-navy-500">Student Finance England guidance</strong>
                , we are with you every step of the way.
              </p>
              <Link href="#book-consultation" className="btn-navy inline-flex">
                Book Free Consultation <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield,        label: "Fully Accredited",  sub: "UKVI & SFE aligned" },
                { icon: Clock,         label: "Same-Day Answers",  sub: "Know where you stand today" },
                { icon: Users,         label: "500+ Students",     sub: "Guided to success" },
                { icon: GraduationCap, label: "35+ Partners",      sub: "Top UK universities" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-2xl border border-brand-border p-6 shadow-card flex flex-col gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center">
                    <item.icon size={20} className="text-navy-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-500 text-sm">{item.label}</p>
                    <p className="text-brand-muted text-xs mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. SERVICES ─────────────────────────────────────────────────── */}
      <section id="services" className="section-full bg-white">
        <div className="section">
          <div className="text-center mb-14">
            <p className="section-label mx-auto">Our Services</p>
            <h2 className="section-heading text-3xl sm:text-4xl mb-4">
              Everything You Need in One Place
            </h2>
            <div className="gold-bar mx-auto mb-5" />
            <p className="section-subheading mx-auto text-center">
              From your first enquiry to your graduation day — MCKI Solutions
              provides the complete support infrastructure for your postgraduate
              journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((svc) => (
              <div key={svc.title} className="card-service group">
                <div className="w-12 h-12 rounded-2xl bg-navy-50 flex items-center justify-center flex-shrink-0">
                  <svc.icon size={24} className="text-navy-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-navy-500 text-xl mb-3">
                    {svc.title}
                  </h3>
                  <p className="text-brand-muted leading-relaxed text-sm mb-5">
                    {svc.body}
                  </p>
                </div>
                <Link
                  href={svc.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-500 group-hover:gap-3 transition-all"
                >
                  {svc.cta} <ChevronRight size={15} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. WHY MCKI ─────────────────────────────────────────────────── */}
      <section className="section-alt section-full">
        <div className="section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label">Why Choose Us</p>
              <h2 className="section-heading text-3xl sm:text-4xl mb-4">
                Why Thousands Choose MCKI Solutions
              </h2>
              <div className="gold-bar mb-8" />
              <ul className="space-y-4">
                {whyMcki.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-navy-500 flex-shrink-0 mt-0.5" />
                    <span className="text-brand-text font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link href="#book-consultation" className="btn-navy inline-flex">
                  Get Started Free <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-brand-border shadow-card p-10">
              <p className="text-4xl text-gold-300 font-serif leading-none mb-4">&ldquo;</p>
              <p className="text-navy-500 text-lg font-medium leading-relaxed mb-6">
                I started MCKI Solutions because I watched too many people walk
                away from an opportunity that was genuinely within their reach.
                They didn&apos;t need more talent or more money — they needed
                someone to sit with them, explain the options, and say:
                &ldquo;This is possible. Here&apos;s how.&rdquo; That is exactly what we do.
                Every single day.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-navy-500 flex items-center justify-center">
                  <span className="text-gold-300 font-bold text-sm">S</span>
                </div>
                <div>
                  <p className="font-semibold text-navy-500 text-sm">Shofiqul Haque</p>
                  <p className="text-brand-muted text-xs">Founder, MCKI Solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. UNIVERSITY PARTNERS ──────────────────────────────────────── */}
      <section className="bg-white border-y border-brand-border py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-brand-muted mb-8">
            Partnered with 35+ Leading UK Universities
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {UNIVERSITY_PARTNERS.map((uni) => (
              <span key={uni} className="partner-pill">{uni}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. STUDENT FINANCE ──────────────────────────────────────────── */}
      <section className="bg-navy-gradient text-white section-full">
        <div className="section">
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-label text-gold-300 mx-auto">Student Finance England</p>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl leading-tight mb-5">
              Government Funding — Made Simple
            </h2>
            <div className="gold-bar mx-auto mb-6" />
            <p className="text-white/80 text-lg leading-relaxed mb-10">
              Student Finance England supports eligible UK residents studying for
              a postgraduate Master&apos;s degree. A lot of people qualify and don&apos;t
              know it. We check your eligibility for free, explain exactly what
              you could access, and guide your application from start to finish.
            </p>
            <Link href="#book-consultation" className="btn-primary text-base">
              Check My Eligibility — Free <ArrowRight size={18} />
            </Link>
            <p className="mt-4 text-white/50 text-xs">
              Powered by official Student Finance England guidelines
            </p>
          </div>
        </div>
      </section>

      {/* ── 8. TESTIMONIALS ─────────────────────────────────────────────── */}
      <section id="testimonials" className="section-full bg-brand-alt">
        <div className="section">
          <div className="text-center mb-14">
            <p className="section-label mx-auto">Student Stories</p>
            <h2 className="section-heading text-3xl sm:text-4xl mb-4">
              Real Students. Real Results.
            </h2>
            <div className="gold-bar mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="card-testimonial">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }, (_, i) => (
                    <Star key={i} size={16} className="text-gold-300 fill-gold-300" />
                  ))}
                </div>
                <p className="text-brand-text leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-brand-border">
                  <div className="w-9 h-9 rounded-full bg-navy-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-gold-300 font-bold text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-navy-500 text-sm">{t.name}</p>
                    <p className="text-brand-muted text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. AI & BLOCKCHAIN COURSES ──────────────────────────────────── */}
      <section className="section-full bg-white">
        <div className="section">
          <div className="text-center mb-14">
            <p className="section-label mx-auto">AI & Blockchain Programmes</p>
            <h2 className="section-heading text-3xl sm:text-4xl mb-4">
              Specialist AI Courses — Now Available
            </h2>
            <div className="gold-bar mx-auto mb-5" />
            <p className="section-subheading mx-auto text-center">
              Five specialist programmes designed for professionals who want to lead in an
              AI-first economy. Government-funded routes may be available.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {aiCourses.map((course) => (
              <div key={course.title} className="card-service group">
                <div className="w-12 h-12 rounded-2xl bg-navy-50 flex items-center justify-center flex-shrink-0">
                  <course.icon size={24} className="text-navy-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-navy-500 text-lg mb-2">
                    {course.title}
                  </h3>
                  <p className="text-brand-muted leading-relaxed text-sm">{course.desc}</p>
                </div>
                <Link
                  href="#book-consultation"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-500 group-hover:gap-3 transition-all"
                >
                  Check Eligibility <ChevronRight size={15} />
                </Link>
              </div>
            ))}
            <div className="card-service bg-[#FFD700]/10 border-[#FFD700]/40 group">
              <div className="w-12 h-12 rounded-2xl bg-[#FFD700]/30 flex items-center justify-center flex-shrink-0">
                <Zap size={24} className="text-navy-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-bold text-navy-500 text-lg mb-2">
                  Agentic AI Masterclass
                </h3>
                <p className="text-brand-muted leading-relaxed text-sm">
                  Live, hands-on event on June 6, 2026. See all five specialist pathways
                  demonstrated in practice. Only £31.
                </p>
              </div>
              <Link
                href="/events"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-navy-500 group-hover:gap-3 transition-all"
              >
                Book the Event <ChevronRight size={15} />
              </Link>
            </div>
          </div>
          <div className="text-center">
            <Link href="/local-ed" className="btn-navy inline-flex">
              View All Courses <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 10. TEAM ────────────────────────────────────────────────────── */}
      <section className="section-full section-alt">
        <div className="section">
          <div className="text-center mb-14">
            <p className="section-label mx-auto">Our Speakers & Leaders</p>
            <h2 className="section-heading text-3xl sm:text-4xl mb-4">
              The People Behind MCKI Solutions
            </h2>
            <div className="gold-bar mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {teamMembers.map((person) => (
              <div
                key={person.name}
                className="bg-white rounded-3xl border border-brand-border shadow-card p-8"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-full bg-navy-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-gold-300 font-extrabold text-2xl">{person.initial}</span>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-navy-500 text-lg">{person.name}</p>
                    <p className="text-brand-muted text-sm">{person.title}</p>
                  </div>
                </div>
                <p className="text-brand-muted text-sm leading-relaxed mb-5">{person.bio}</p>
                <Link
                  href="/events"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-500 hover:gap-3 transition-all"
                >
                  Speaking at June 6 Event <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. INLINE BOOKING FORM ─────────────────────────────────────── */}
      <section id="book-consultation" className="section-full bg-white">
        <div className="section">
          <div className="text-center mb-12">
            <p className="section-label mx-auto">Free Consultation</p>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-navy-500 mb-4">
              Book Your Free Consultation
            </h2>
            <div className="gold-bar mx-auto mb-5" />
            <p className="section-subheading mx-auto text-center">
              Tell us what you need. We&apos;ll come back to you within 2 working hours
              with an honest view on your options and the best next step.
            </p>
          </div>
          <HomepageConsultationForm />
          <p className="text-center text-xs text-brand-muted mt-6">
            Prefer to call?{" "}
            <a href={`tel:${BRAND.phone}`} className="text-navy-500 font-semibold underline">
              {BRAND.phone}
            </a>
            {" "}· Or join directly via{" "}
            <a
              href="https://meet.google.com/ged-mwoz-grs"
              className="text-navy-500 font-semibold underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Meet
            </a>
          </p>
        </div>
      </section>

      {/* ── 12. FAQ (AEO) ───────────────────────────────────────────────── */}
      <section id="faq" className="section-full bg-brand-alt">
        <div className="section">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="section-label mx-auto">FAQ</p>
              <h2 className="section-heading text-3xl mb-3">Frequently Asked Questions</h2>
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
    </>
  );
}

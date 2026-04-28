import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  GraduationCap, CheckCircle2, ArrowRight,
  BookOpen, Users, Clock, Shield, Cpu, Code2, Heart, Briefcase,
} from "lucide-react";

// Heavy client components — lazy-loaded so they don't block initial page paint
const AINavigator  = dynamic(() => import("@/components/AINavigator").then((m) => m.AINavigator),   { ssr: false });
const CalendlyEmbed = dynamic(() => import("@/components/CalendlyEmbed").then((m) => m.CalendlyEmbed), { ssr: false });

export const metadata: Metadata = {
  title: "UK University Courses & Student Funding — MCKI Solutions",
  description:
    "MCKI Solutions helps UK residents find the right university course and access Student Finance England funding. Free guidance, no jargon, no pressure.",
};

const eligibilityChecks = [
  "You have lived in the UK for 3 or more years",
  "You do not already hold a degree at the same level",
  "Your chosen university is registered in the UK",
  "You are studying a recognised taught programme",
  "You meet the age requirements set by Student Finance England",
];

const entryPaths = [
  {
    icon: BookOpen,
    title: "You Have a Degree",
    desc: "A recognised undergraduate degree (2:2 or above) is the standard route into most postgraduate programmes.",
  },
  {
    icon: Users,
    title: "You Have Work Experience",
    desc: "No degree? Many UK universities will accept solid, relevant work experience instead — usually 3 to 5 years.",
  },
  {
    icon: GraduationCap,
    title: "You Are a Mature Student",
    desc: "If you are 21 or over with life and work experience, many universities have a special pathway just for you.",
  },
];

const courseCategories = [
  {
    label: "Business & Management",
    icon: Briefcase,
    color: "bg-blue-50 text-blue-700",
    dot: "bg-blue-500",
    courses: [
      { title: "BA (Hons) Business and Management",                    level: "Level 6 Top-up" },
      { title: "BA (Hons) Business and Management Progression Route",  level: "Level 6 Top-up" },
      { title: "MSc Global Business",                                  level: "Postgraduate" },
      { title: "BA (Hons) Global Business and Entrepreneurship",       level: "With Foundation Year" },
      { title: "BA (Hons) Global Business (Business Management)",      level: "Level 4 Direct Entry" },
      { title: "BA (Hons) Business Management and Sustainability",     level: "4 Years" },
      { title: "BSc (Hons) Business & Tourism Management",             level: "Undergraduate" },
      { title: "Foundation Degree in Business and Management",         level: "Foundation" },
      { title: "HND in Business",                                      level: "Higher National" },
      { title: "HND Business",                                         level: "Level 5 Direct Entry" },
    ],
  },
  {
    label: "Project & Construction Management",
    icon: Shield,
    color: "bg-amber-50 text-amber-700",
    dot: "bg-amber-500",
    courses: [
      { title: "BSc (Hons) Construction Management",                   level: "With Foundation Year" },
      { title: "BSc (Hons) Construction Management",                   level: "Level 6 Top-up" },
      { title: "BSc (Hons) Project Management",                        level: "With Foundation Year" },
      { title: "MSc Project Management",                               level: "Postgraduate" },
      { title: "HND in Construction Management (Design & Build)",      level: "Higher National" },
    ],
  },
  {
    label: "Healthcare & Psychology",
    icon: Heart,
    color: "bg-rose-50 text-rose-700",
    dot: "bg-rose-500",
    courses: [
      { title: "BSc (Hons) Health, Wellbeing and Social Care",         level: "With Foundation Year" },
      { title: "BSc (Hons) Health, Wellbeing and Social Care",         level: "Level 6 Direct Entry" },
      { title: "BSc (Hons) Health and Social Care",                    level: "4 Years" },
      { title: "HND in Healthcare Practice",                           level: "Level 5 Direct Entry" },
      { title: "BTEC HND in Health and Social Care Practice",          level: "Higher National" },
      { title: "BSc (Hons) Psychology with Counselling",               level: "With Foundation Year" },
      { title: "MSc Counselling and Psychotherapy",                    level: "Postgraduate" },
    ],
  },
  {
    label: "Technology & Computing",
    icon: Code2,
    color: "bg-emerald-50 text-emerald-700",
    dot: "bg-emerald-500",
    courses: [
      { title: "BSc (Hons) Computing",                                 level: "With Foundation Year" },
      { title: "HND in Digital Technologies (Cyber Security)",         level: "Higher National" },
    ],
  },
  {
    label: "AI & Blockchain",
    icon: Cpu,
    color: "bg-violet-50 text-violet-700",
    dot: "bg-violet-500",
    courses: [
      { title: "AI for Data Analysis",                                 level: "Specialist Programme" },
      { title: "AI for Trading (Crypto & FX)",                        level: "Specialist Programme" },
      { title: "AI for Software Development",                          level: "Specialist Programme" },
      { title: "Blockchain & Web3 Fundamentals",                       level: "Specialist Programme" },
      { title: "AI & Machine Learning Applications",                   level: "Specialist Programme" },
    ],
  },
];

const faqs = [
  {
    q: "How much funding can I get?",
    a: "The government sets the loan amount each academic year. It is designed to cover tuition and contribute to living costs. We will check the exact amount available for your specific course and tell you clearly what to expect.",
  },
  {
    q: "Do I need A-levels or a previous degree?",
    a: "No. Many of our partner universities accept relevant work experience in place of formal qualifications. We find the right pathway for your background.",
  },
  {
    q: "When do I start paying the loan back?",
    a: "You only start repaying once you earn above the government threshold. You pay a small percentage of what you earn above that — nothing more. After 30 years, any remaining balance is cleared.",
  },
  {
    q: "Can I study part-time?",
    a: "Yes. Funding is available for part-time programmes too. The amount may vary depending on how intensive your course is.",
  },
  {
    q: "What does MCKI Solutions actually do for me?",
    a: "We check your eligibility, match you to the right course, help with your personal statement, manage your university application, and guide your funding application — from start to finish. You are never left to figure it out alone.",
  },
];

export default function LocalEdPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-hero-gradient text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.04] dot-grid" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <p className="section-label text-gold-300 mb-4">
              UK University Courses &amp; Student Funding
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-5">
              We Help You Get Into University.
              <span className="block text-gold-300">And Pay For It.</span>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
              The government has money set aside to help people like you study.
              Most people never claim it — because nobody told them it existed.
              We check if you qualify, explain it in plain English, and help you
              every step of the way. No cost. No catch.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#navigator" className="btn-primary">
                Check If I Qualify — Free <ArrowRight size={16} />
              </a>
              <a
                href="https://www.gov.uk/masters-loan"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-white"
              >
                Official SFE Guide
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Free to Check", "No Obligation", "Plain English", "End-to-End Support"].map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1.5 text-xs font-medium text-white/70
                             bg-white/10 border border-white/20 px-3 py-1.5 rounded-full"
                >
                  <CheckCircle2 size={11} className="text-gold-300" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COURSES WE OFFER ── */}
      <section className="section-full bg-white">
        <div className="section">
          <div className="text-center mb-12">
            <p className="section-label mx-auto">What You Can Study</p>
            <h2 className="section-heading text-3xl sm:text-4xl mb-4">
              Courses We Offer
            </h2>
            <div className="gold-bar mx-auto mb-5" />
            <p className="section-subheading mx-auto text-center">
              We work with universities across the UK to get you onto the right
              programme — whether you are starting fresh, topping up, or going
              all the way to postgraduate level.
            </p>
          </div>

          <div className="space-y-10">
            {courseCategories.map((cat) => (
              <div key={cat.label}>
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${cat.color}`}>
                    <cat.icon size={17} />
                  </div>
                  <h3 className="font-heading font-bold text-navy-500 text-lg">
                    {cat.label}
                  </h3>
                  <span className="text-xs text-brand-muted bg-brand-alt border border-brand-border
                                   px-2.5 py-1 rounded-full">
                    {cat.courses.length} courses
                  </span>
                </div>

                {/* Course cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {cat.courses.map((course, i) => (
                    <div
                      key={i}
                      className="bg-white border border-brand-border rounded-xl p-4
                                 hover:border-navy-300 hover:shadow-card transition-all flex items-start gap-3"
                    >
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${cat.dot}`} />
                      <div>
                        <p className="text-sm font-semibold text-navy-500 leading-snug">
                          {course.title}
                        </p>
                        <p className="text-xs text-brand-muted mt-0.5">{course.level}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-navy-500 rounded-2xl p-8 flex flex-col sm:flex-row
                          items-center justify-between gap-5 text-white">
            <div>
              <p className="font-heading font-bold text-lg mb-1">
                Not sure which course is right for you?
              </p>
              <p className="text-white/70 text-sm">
                Tell us your background and goals — we will find the best match.
              </p>
            </div>
            <a
              href="#navigator"
              className="btn-primary whitespace-nowrap flex-shrink-0"
            >
              Talk to an Advisor <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── ELIGIBILITY + ENTRY PATHS ── */}
      <section className="section-full section-alt">
        <div className="section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Eligibility */}
            <div>
              <p className="section-label">Do You Qualify?</p>
              <h2 className="section-heading text-2xl sm:text-3xl mb-3">
                The Simple Checklist
              </h2>
              <div className="gold-bar mb-6" />
              <p className="answer-capsule mb-6">
                To get Student Finance England funding, you need to meet a few
                basic conditions. Tick most of these and there is a very good
                chance you qualify. We will confirm for free.
              </p>
              <ul className="space-y-3">
                {eligibilityChecks.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-navy-500 flex-shrink-0 mt-0.5" />
                    <span className="text-brand-text text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Entry paths */}
            <div>
              <p className="section-label">How to Get In</p>
              <h2 className="section-heading text-2xl sm:text-3xl mb-3">
                No Degree? No Problem.
              </h2>
              <div className="gold-bar mb-6" />
              <p className="answer-capsule mb-6">
                There are more ways into university than most people realise.
                Here are the three most common routes we help people take.
              </p>
              <div className="space-y-4">
                {entryPaths.map((path) => (
                  <div key={path.title} className="card p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center flex-shrink-0">
                      <path.icon size={18} className="text-navy-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy-500 text-sm mb-1">{path.title}</p>
                      <p className="text-brand-muted text-sm">{path.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section-full bg-white">
        <div className="section">
          <div className="text-center mb-12">
            <p className="section-label mx-auto">How It Works</p>
            <h2 className="section-heading text-2xl sm:text-3xl mb-3">
              Four Steps. We Handle Most of It.
            </h2>
            <div className="gold-bar mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", icon: Shield,        title: "We Check Your Eligibility",   desc: "We look at your background and tell you honestly whether you qualify — and for how much." },
              { step: "02", icon: BookOpen,      title: "We Find Your Course",         desc: "We match you to the right programme at a university that suits your goals and location." },
              { step: "03", icon: GraduationCap, title: "We Handle Your Application",  desc: "We write your personal statement, manage the paperwork, and submit everything for you." },
              { step: "04", icon: Clock,         title: "We Sort Your Funding",        desc: "We guide your Student Finance application so your money is in place before you start." },
            ].map((item) => (
              <div key={item.step} className="card p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-navy-500 flex items-center justify-center mx-auto mb-4">
                  <span className="text-gold-300 font-heading font-bold text-sm">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-semibold text-navy-500 text-sm mb-2">{item.title}</h3>
                <p className="text-brand-muted text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADVISOR ── */}
      <section id="navigator" className="section-full section-alt">
        <div className="section">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="section-label mx-auto">Free Education Advisor</p>
              <h2 className="section-heading text-2xl sm:text-3xl mb-3">
                Not Sure Where to Start?
              </h2>
              <div className="gold-bar mx-auto" />
              <p className="answer-capsule mx-auto text-center mt-4">
                Tell us a little about yourself — your background, your goals,
                and what you are hoping to study. We will come back with honest,
                personal advice on the best course for you, what funding you
                can access, and exactly what to do next. Free, no strings.
              </p>
            </div>
            <AINavigator mode="local" />
          </div>
        </div>
      </section>

      {/* ── BOOK A CONSULTATION ── */}
      <section id="book-consultation" className="section-full bg-white">
        <div className="section">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="section-label mx-auto">Book a Consultation</p>
              <h2 className="section-heading text-2xl sm:text-3xl mb-3">
                Pick a Time That Works for You
              </h2>
              <div className="gold-bar mx-auto" />
              <p className="answer-capsule mx-auto text-center mt-4">
                Choose a free slot below and book directly into our calendar.
                No waiting. No back-and-forth. Your consultation is confirmed
                instantly.
              </p>
            </div>
            <CalendlyEmbed />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-full bg-white pt-0">
        <div className="section">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-heading text-2xl text-center mb-8">
              Questions People Usually Ask
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="card p-5">
                  <p className="font-semibold text-navy-500 mb-2">{faq.q}</p>
                  <p className="text-brand-muted text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <p className="text-brand-muted text-sm mb-4">
                Have a question that is not here?
              </p>
              <Link href="/local-ed#navigator" className="btn-navy inline-flex">
                Ask Us Directly <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

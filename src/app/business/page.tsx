import type { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase, GraduationCap, Globe, CheckCircle2, Users,
  TrendingUp, Brain, Shield, ArrowRight, Zap,
} from "lucide-react";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Business Solutions | MCKI Solutions",
  description:
    "MCKI Solutions helps organisations upskill their workforce through bespoke training, government-funded programmes, and strategic university partnerships.",
  alternates: { canonical: "https://mckisolutions.com/business" },
};

const services = [
  {
    id: "training",
    icon: Brain,
    title: "Corporate AI & Professional Training",
    desc: "Bespoke training programmes designed around your sector — from Agentic AI fundamentals to advanced data analytics. Delivered on-site, remotely, or in a blended format to fit around your team's schedule.",
    bullets: [
      "Custom curriculum mapped to your business objectives",
      "Agentic AI, data analysis, blockchain, and digital skills",
      "Hybrid delivery — workshop days + self-paced modules",
      "Cohort or 1:1 formats available",
    ],
  },
  {
    id: "upskilling",
    icon: GraduationCap,
    title: "Staff Upskilling & Government Funding",
    desc: "Many employers don't realise that government-backed funding can significantly reduce the cost of upskilling their workforce. We identify the right funding routes and manage the process so you don't have to.",
    bullets: [
      "Free eligibility assessment for your team",
      "Access to Apprenticeship Levy, Skills Bootcamps, and postgraduate funding",
      "Full application management — forms, compliance, reporting",
      "Maximise your return on your workforce development spend",
    ],
  },
  {
    id: "partnerships",
    icon: Globe,
    title: "Organisational & University Partnerships",
    desc: "We broker long-term partnerships between your organisation and leading UK universities and training providers — creating structured pathways that support recruitment, retention, and talent development.",
    bullets: [
      "University partnership brokerage across 35+ institutions",
      "Sponsored study programmes for high-potential staff",
      "Recruitment pipelines from postgraduate talent pools",
      "Strategic CPD frameworks for teams at every level",
    ],
  },
];

const whyMcki = [
  "Trusted by 500+ individuals and multiple UK organisations",
  "35+ university and training provider relationships",
  "Deep expertise in government-funded upskilling routes",
  "Plain-English guidance — no jargon, no unnecessary complexity",
  "Free initial scoping session — no commitment required",
];

const sectors = [
  "Healthcare & Social Care",
  "Financial Services",
  "Technology & AI",
  "Education & Training",
  "Operations & Logistics",
  "Public Sector & Charities",
];

export default function BusinessPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.04] dot-grid" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold-300/20 border border-gold-300/40 text-gold-300 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Briefcase size={13} />
              For Organisations & Employers
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              Business
              <span className="block text-gold-300">Solutions</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl">
              MCKI Solutions helps organisations build smarter, better-skilled teams — through
              bespoke training, government-funded upskilling, and strategic university partnerships.
              We handle the complexity so you can focus on your people.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/#book-consultation" className="btn-primary text-base">
                Book a Free Scoping Call
              </Link>
              <a
                href={`mailto:${BRAND.email}?subject=Business Solutions Enquiry`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30
                           text-white text-base font-medium hover:bg-white/10 transition-colors"
              >
                Email Us <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-white border-b border-brand-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: "35+",  label: "University & Provider Partners" },
              { value: "500+", label: "Professionals Supported" },
              { value: "Free", label: "Initial Scoping Session" },
              { value: "98%",  label: "Client Satisfaction" },
            ].map((s) => (
              <div key={s.label} className="stat-box">
                <p className="text-3xl sm:text-4xl font-extrabold text-navy-500">{s.value}</p>
                <p className="text-sm text-brand-muted font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-full section-alt">
        <div className="section">
          <div className="text-center mb-14">
            <p className="section-label mx-auto">What We Offer</p>
            <h2 className="section-heading text-3xl sm:text-4xl mb-4">Our Business Services</h2>
            <div className="gold-bar mx-auto" />
          </div>
          <div className="space-y-10 max-w-4xl mx-auto">
            {services.map((svc) => (
              <div
                key={svc.id}
                id={svc.id}
                className="bg-white rounded-3xl border border-brand-border shadow-card p-8 lg:p-10"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-navy-50 flex items-center justify-center flex-shrink-0">
                    <svc.icon size={22} className="text-navy-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-navy-500 text-xl mb-2">{svc.title}</h3>
                    <p className="text-brand-muted leading-relaxed mb-5">{svc.desc}</p>
                    <ul className="space-y-2">
                      {svc.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <CheckCircle2 size={16} className="text-navy-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-brand-text">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="section-full bg-white">
        <div className="section">
          <div className="text-center mb-12">
            <p className="section-label mx-auto">Sectors We Serve</p>
            <h2 className="section-heading text-3xl sm:text-4xl mb-4">
              We Work Across Industries
            </h2>
            <div className="gold-bar mx-auto" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {sectors.map((sector) => (
              <div
                key={sector}
                className="bg-navy-50 rounded-2xl px-5 py-4 text-center"
              >
                <p className="font-semibold text-navy-500 text-sm">{sector}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why MCKI */}
      <section className="section-full section-alt">
        <div className="section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
            <div>
              <p className="section-label">Why MCKI</p>
              <h2 className="section-heading text-3xl sm:text-4xl mb-4">
                A Partner That Understands Your Workforce
              </h2>
              <div className="gold-bar mb-8" />
              <ul className="space-y-4">
                {whyMcki.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-navy-500 flex-shrink-0 mt-0.5" />
                    <span className="text-brand-text font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-3xl border border-brand-border shadow-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center">
                  <Zap size={18} className="text-navy-500" />
                </div>
                <p className="font-heading font-bold text-navy-500">Start with a free call</p>
              </div>
              <p className="text-brand-muted text-sm leading-relaxed mb-6">
                Tell us about your team, your goals, and your challenges. We will come back to you with
                a clear picture of what is possible — including any funding you may be missing out on.
              </p>
              <Link href="/#book-consultation" className="btn-navy w-full justify-center inline-flex">
                Book Free Scoping Session
              </Link>
              <p className="text-center text-xs text-brand-muted mt-3">
                No commitment. No sales pressure. Just honest advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-full bg-navy-gradient text-white">
        <div className="section">
          <div className="max-w-2xl mx-auto text-center">
            <p className="section-label text-gold-300 mx-auto">Let us talk</p>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4">
              Ready to Invest in Your Team?
            </h2>
            <div className="gold-bar mx-auto mb-6" />
            <p className="text-white/80 text-lg mb-10">
              Whether you have 5 staff or 500, we will find the right training, funding, and
              partnership model for your organisation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/#book-consultation" className="btn-primary text-base">
                Book a Free Call
              </Link>
              <a
                href={`mailto:${BRAND.email}?subject=Business Solutions Enquiry`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30
                           text-white text-base font-medium hover:bg-white/10 transition-colors"
              >
                Email {BRAND.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

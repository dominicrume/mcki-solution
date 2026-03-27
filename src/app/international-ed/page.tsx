import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Shield, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { AINavigator } from "@/components/AINavigator";

export const metadata: Metadata = {
  title: "International Education — UK Visa & Admissions Gateway",
  description:
    "MCKI Solutions maps international students to Graduate Route-eligible UK programmes. Expert university admissions support and Student visa guidance — free initial consultation.",
};

const visaFacts = [
  "Graduate Route visa: stay 2 years post-study (3 for PhDs)",
  "Work full-time in any role while on the Graduate Route",
  "No job offer required — maximum flexibility post-graduation",
  "Apply from within the UK before your Student visa expires",
  "Clear pathway to Skilled Worker visa and eventual settlement",
];

const steps = [
  { step: "01", title: "Profile Assessment",  time: "5 min",    desc: "Submit your qualifications and goals. Our AI scores your profile against 200+ UK programmes." },
  { step: "02", title: "Course Shortlist",    time: "< 60 sec", desc: "Receive ranked Graduate Route-eligible courses with acceptance probability scores." },
  { step: "03", title: "Application Pack",    time: "Same day", desc: "Personalised personal statement template, referee guidance, and submission timeline." },
  { step: "04", title: "CAS & Visa Support",  time: "3–5 wks",  desc: "We guide you through CAS letter collection and your Student visa application." },
];

const faqs = [
  {
    q: "What is the Graduate Route visa?",
    a: "The UK Graduate Route allows international students who have completed a UK degree to live and work in the UK for 2 years (3 for PhDs) without requiring employer sponsorship.",
  },
  {
    q: "Which courses qualify for the Graduate Route?",
    a: "Any undergraduate, postgraduate, or doctoral degree from a UK higher education provider holding a Student sponsor licence qualifies. MCKI filters only for eligible programmes.",
  },
  {
    q: "Can I apply with a non-UK qualification?",
    a: "Yes. MCKI maps your credentials to UK equivalencies (ENIC/NARIC) and identifies the best-fit programmes at our 35+ partner universities.",
  },
  {
    q: "How fast is the admissions process with MCKI?",
    a: "With our optimised application pack, most students receive conditional offers within 2–4 weeks. Average time to CAS letter is 3–5 weeks post-acceptance.",
  },
];

export default function InternationalEdPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] dot-grid" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <p className="section-label text-gold-300 mb-4">
              Graduate Route Visa · UK Admissions
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-5">
              Your Bridge to a UK Future.
              <span className="block text-gold-300">Expert Visa Strategy.</span>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
              MCKI Solutions matches international students to Graduate
              Route-eligible UK programmes with the highest acceptance rates,
              generates a tailored application pack, and guides you through
              the Student visa and post-study work pathway.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#navigator" className="btn-primary">
                Start My UK Journey <ArrowRight size={16} />
              </a>
              <a
                href="https://www.gov.uk/graduate-visa"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-white"
              >
                Official Visa Guide
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISA FACTS + PROCESS ── */}
      <section className="section-full bg-white">
        <div className="section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            <div>
              <p className="section-label">Graduate Route Visa</p>
              <h2 className="section-heading text-2xl sm:text-3xl mb-3">
                Your Right to Stay &amp; Work
              </h2>
              <div className="gold-bar mb-6" />
              <p className="answer-capsule mb-6">
                The Graduate Route is the UK&apos;s most flexible post-study
                immigration route — no job offer, no sponsor, full work rights.
                MCKI ensures you choose a qualifying programme from day one.
              </p>
              <ul className="space-y-3">
                {visaFacts.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Shield size={17} className="text-navy-500 flex-shrink-0 mt-0.5" />
                    <span className="text-brand-text text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="section-label">Admissions Timeline</p>
              <h2 className="section-heading text-2xl sm:text-3xl mb-3">
                From Profile to Offer — Fast
              </h2>
              <div className="gold-bar mb-6" />
              <div className="space-y-4">
                {steps.map((s) => (
                  <div key={s.step} className="card p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-navy-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-gold-300 font-bold text-xs">{s.step}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="font-semibold text-navy-500 text-sm">{s.title}</p>
                        <span className="flex items-center gap-1 text-xs text-brand-muted">
                          <Clock size={10} /> {s.time}
                        </span>
                      </div>
                      <p className="text-brand-muted text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI NAVIGATOR ── */}
      <section id="navigator" className="section-full section-alt">
        <div className="section">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="section-label mx-auto">AI Education Advisor</p>
              <h2 className="section-heading text-2xl sm:text-3xl mb-3">
                Get Your UK Pathway Blueprint
              </h2>
              <div className="gold-bar mx-auto" />
              <p className="answer-capsule mx-auto text-center mt-4">
                Submit your profile below. Our advisor generates a personalised
                course shortlist with Graduate Route visa eligibility scores
                and a 12-month admissions timeline — delivered instantly.
              </p>
            </div>
            <AINavigator mode="international" />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-full bg-white">
        <div className="section">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-heading text-2xl text-center mb-8">
              Visa &amp; Admissions FAQ
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="card p-5">
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

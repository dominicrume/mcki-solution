import type { Metadata } from "next";
import { Heart, Shield, Users, Clock, CheckCircle2, Phone, Mail } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Family Support Services — MCKI Solutions",
  description:
    "MCKI Solutions provides family support consultations across the Midlands — care planning, family mediation, benefits navigation, and respite support. Book a free confidential consultation today.",
  alternates: { canonical: "https://mckisolutions.com/family-support" },
};

const SERVICES = [
  {
    icon: Heart,
    title: "Care Planning",
    description:
      "Personalised care plans for families navigating complex support needs. We work with you to map the right services and funding.",
  },
  {
    icon: Users,
    title: "Family Mediation",
    description:
      "Independent, confidential mediation to help families reach agreements and reduce conflict around care and housing decisions.",
  },
  {
    icon: Shield,
    title: "Benefits Navigation",
    description:
      "Expert guidance on Carer's Allowance, PIP, Universal Credit, and other entitlements — making sure you claim what you're owed.",
  },
  {
    icon: Clock,
    title: "Respite Support",
    description:
      "Help finding short-term respite care options so family carers can rest, recover, and sustain long-term wellbeing.",
  },
];

const GUARANTEES = [
  "Free initial consultation — no obligation",
  "All advisors are DBS-checked",
  "Strictly confidential — UK GDPR compliant",
  "Confirmed within 2 working hours",
  "Midlands-based, with remote options available",
];

export default function FamilySupportPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-label text-gold-300 mx-auto mb-4">Family Support · Midlands</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
            Practical Support for{" "}
            <span className="text-gold-300">Families Who Need It Most</span>
          </h1>
          <p className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Navigating care, benefits, and family decisions is overwhelming. Our advisors
            cut through the complexity and give you honest, personal guidance — starting
            with a completely free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#book" className="btn-gold">
              Book Free Consultation
            </a>
            <a href={`tel:${BRAND.phone}`} className="btn-ghost border border-white/30 text-white inline-flex items-center gap-2">
              <Phone size={16} /> {BRAND.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 px-4 bg-brand-alt">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label mx-auto mb-3">What We Offer</p>
            <h2 className="font-heading text-3xl font-extrabold text-navy-500">
              Our Family Support Services
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="card p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-navy-500" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-navy-500 text-lg mb-1">{title}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees strip */}
      <section className="py-12 px-4 bg-white border-y border-brand-border">
        <div className="max-w-4xl mx-auto">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {GUARANTEES.map((g) => (
              <li key={g} className="flex items-center gap-3 text-sm text-navy-500 font-medium">
                <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                {g}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Booking form */}
      <section id="book" className="py-20 px-4 bg-brand-alt scroll-mt-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-label mx-auto mb-3">Book a Consultation</p>
            <h2 className="font-heading text-3xl font-extrabold text-navy-500 mb-3">
              Get in Touch Today
            </h2>
            <p className="text-brand-muted">
              Complete the form below and one of our advisors will confirm your
              consultation within 2 working hours.
            </p>
          </div>
          <BookingForm />
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center text-sm text-brand-muted">
            <a href={`tel:${BRAND.phone}`} className="inline-flex items-center gap-2 hover:text-navy-500 transition-colors">
              <Phone size={14} /> {BRAND.phone}
            </a>
            <a href={`mailto:${BRAND.email}`} className="inline-flex items-center gap-2 hover:text-navy-500 transition-colors">
              <Mail size={14} /> {BRAND.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

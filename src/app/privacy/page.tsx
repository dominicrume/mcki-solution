import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — MCKI Solutions",
  description: "How MCKI Solutions collects, uses, and protects your personal data under UK GDPR.",
};

const sections = [
  {
    id: "who-we-are",
    heading: "1. Who We Are",
    body: `MCKI Solutions Ltd ("MCKI", "we", "us", "our") is an education consultancy registered in England & Wales. We operate the website mckisolutions.co.uk and provide postgraduate education, funding, and AI career planning services.

Contact: privacy@mckisolutions.co.uk`,
  },
  {
    id: "data-we-collect",
    heading: "2. Data We Collect",
    body: `We collect the following personal data when you use our services:

• Name and email address (when submitting the AI Navigator or waitlist form)
• Academic background and career interests (entered into the AI Navigator chat)
• IP address and browser data (via Google Analytics and Vercel Analytics)
• Referral codes (for the Wealth Lab waitlist)`,
  },
  {
    id: "how-we-use",
    heading: "3. How We Use Your Data",
    body: `We use your data to:

• Generate and deliver your personalised career blueprint or funding roadmap
• Send you information about our services that you have requested
• Administer the Wealth Lab waitlist and referral programme
• Improve our website and services through analytics
• Comply with legal obligations

Legal basis: Legitimate interests, consent, and contractual necessity (UK GDPR Article 6).`,
  },
  {
    id: "data-sharing",
    heading: "4. Data Sharing",
    body: `We do not sell your personal data. We share data only with:

• OpenAI (to power the AI Navigator — data processed under OpenAI's data processing agreement)
• Supabase (our database provider — data stored in EU-West, Dublin)
• Google (Analytics — anonymised usage data)
• Our partner universities, only when you explicitly request an introduction`,
  },
  {
    id: "data-retention",
    heading: "5. Data Retention",
    body: `We retain your data for up to 24 months from last contact, after which it is securely deleted. You may request deletion at any time by emailing privacy@mckisolutions.co.uk.`,
  },
  {
    id: "your-rights",
    heading: "6. Your Rights",
    body: `Under UK GDPR you have the right to:

• Access the personal data we hold about you
• Rectify inaccurate data
• Erasure ("right to be forgotten")
• Restrict or object to processing
• Data portability
• Lodge a complaint with the ICO (ico.org.uk)

To exercise any right, email privacy@mckisolutions.co.uk.`,
  },
  {
    id: "cookies",
    heading: "7. Cookies",
    body: `We use strictly necessary cookies for site functionality and optional analytics cookies (Google Analytics). You may decline analytics cookies via our cookie banner. We do not use advertising or tracking cookies.`,
  },
  {
    id: "gdpr",
    heading: "8. UK GDPR & International Transfers",
    body: `Our primary data infrastructure is hosted in the UK and EU (Google Cloud europe-west2, Supabase EU-West). Any transfer of data outside the UK/EEA is covered by Standard Contractual Clauses or an adequacy decision.`,
  },
  {
    id: "changes",
    heading: "9. Changes to This Policy",
    body: `We may update this policy from time to time. Material changes will be notified via email or a notice on our website. This policy was last updated in March 2026.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] dot-grid" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="section-label text-gold-300 mb-4">Legal</p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-white/70 text-sm">Last updated: March 2026</p>
          </div>
        </div>
      </section>

      <section className="section-full bg-white">
        <div className="section">
          <div className="max-w-3xl mx-auto">

            {/* Quick nav */}
            <nav className="bg-brand-alt border border-brand-border rounded-2xl p-5 mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-navy-500 mb-3">
                Contents
              </p>
              <ul className="space-y-1.5">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-sm text-brand-muted hover:text-navy-500 transition-colors"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Sections */}
            <div className="space-y-10">
              {sections.map((s) => (
                <div key={s.id} id={s.id}>
                  <h2 className="font-heading font-bold text-navy-500 text-lg mb-3">
                    {s.heading}
                  </h2>
                  <p className="text-brand-muted text-sm leading-relaxed whitespace-pre-line">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-brand-border">
              <p className="text-brand-muted text-sm">
                Questions?{" "}
                <a
                  href="mailto:privacy@mckisolutions.co.uk"
                  className="text-navy-500 font-medium hover:underline"
                >
                  privacy@mckisolutions.co.uk
                </a>
              </p>
              <Link href="/" className="inline-block mt-4 text-sm text-navy-500 hover:underline">
                &larr; Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

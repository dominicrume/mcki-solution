import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — MCKI Solutions",
  description: "Terms and conditions for using MCKI Solutions education consultancy services.",
};

const sections = [
  {
    id: "acceptance",
    heading: "1. Acceptance of Terms",
    body: `By accessing mckisolutions.co.uk or using any MCKI Solutions service, you agree to these Terms of Service. If you do not agree, please do not use our services.`,
  },
  {
    id: "services",
    heading: "2. Our Services",
    body: `MCKI Solutions provides:

• AI-powered education advisory and funding eligibility guidance
• University admissions support and application assistance
• Student Finance England (SFE) application guidance
• UK Graduate Route visa pathway information
• The Wealth Lab AI trading intelligence waitlist

Our AI advisor outputs are for informational and guidance purposes only. They do not constitute legal, financial, or immigration advice.`,
  },
  {
    id: "eligibility",
    heading: "3. User Eligibility",
    body: `You must be 18 or older to use our services. By using MCKI Solutions, you confirm that the information you provide is accurate and complete.`,
  },
  {
    id: "intellectual-property",
    heading: "4. Intellectual Property",
    body: `All content on mckisolutions.co.uk — including text, graphics, logos, and AI-generated outputs — is owned by or licensed to MCKI Solutions Ltd and protected by UK copyright law. You may not reproduce, distribute, or create derivative works without our prior written consent.`,
  },
  {
    id: "disclaimer",
    heading: "5. Disclaimer of Warranties",
    body: `Our services are provided "as is" without warranties of any kind. We do not guarantee admission to any university, approval of any funding application, or visa success. University admissions and government funding decisions are made by third parties outside our control.`,
  },
  {
    id: "limitation",
    heading: "6. Limitation of Liability",
    body: `To the fullest extent permitted by law, MCKI Solutions Ltd shall not be liable for any indirect, incidental, or consequential losses arising from your use of our services. Our total liability shall not exceed the amount you have paid to us in the 12 months preceding the claim.`,
  },
  {
    id: "trading-disclaimer",
    heading: "7. Wealth Lab / Financial Risk Disclaimer",
    body: `The Wealth Lab platform provides AI-generated market intelligence for informational and educational purposes only. It does not constitute financial advice. Trading in Crypto and FX markets involves substantial risk of capital loss. Past performance is not indicative of future results. MCKI Solutions is not regulated by the Financial Conduct Authority (FCA). Always seek independent financial advice before trading.`,
  },
  {
    id: "privacy",
    heading: "8. Privacy",
    body: `Your use of our services is also governed by our Privacy Policy, which is incorporated into these Terms by reference.`,
  },
  {
    id: "governing-law",
    heading: "9. Governing Law",
    body: `These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.`,
  },
  {
    id: "changes",
    heading: "10. Changes to These Terms",
    body: `We reserve the right to update these Terms at any time. Continued use of our services after changes constitutes acceptance of the new Terms. These Terms were last updated in March 2026.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="bg-hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] dot-grid" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="section-label text-gold-300 mb-4">Legal</p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight mb-4">
              Terms of Service
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
                Questions about these terms?{" "}
                <a
                  href="mailto:legal@mckisolutions.co.uk"
                  className="text-navy-500 font-medium hover:underline"
                >
                  legal@mckisolutions.co.uk
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

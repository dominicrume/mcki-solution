import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Globe, MapPin, Facebook, Linkedin, Twitter } from "lucide-react";
import { BRAND } from "@/lib/constants";

const footerLinks = {
  Services: [
    { label: "Education Funding",      href: "/local-ed" },
    { label: "International Education", href: "/international-ed" },
    { label: "Wealth Lab",             href: "/trading-lab" },
    { label: "Career Guidance",        href: "/local-ed#navigator" },
  ],
  Company: [
    { label: "About Us",         href: "/#about" },
    { label: "Testimonials",     href: "/#testimonials" },
    { label: "FAQ",              href: "/#faq" },
    { label: "Free Consultation",href: "/#book-consultation" },
  ],
  Legal: [
    { label: "Privacy Policy",   href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy",    href: "/privacy#cookies" },
    { label: "GDPR",             href: "/privacy#gdpr" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand col — spans 2 on large */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image
                src="/logo.jpg"
                alt="MCKI Solutions"
                width={40}
                height={40}
                className="rounded-lg object-contain"
              />
              <div>
                <p className="font-heading font-extrabold text-white text-lg leading-none">
                  MCKI Solutions
                </p>
                <p className="text-xs text-white/50 mt-0.5">Education Consultancy</p>
              </div>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-6">
              A postgraduate education consultancy based in the Midlands. We help
              UK residents get into university, access government funding, and take
              the next step — with honest, personal guidance.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href={BRAND.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MCKI Solutions on Facebook"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-gold-300 hover:text-navy-500
                           flex items-center justify-center transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href={BRAND.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MCKI Solutions on LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-gold-300 hover:text-navy-500
                           flex items-center justify-center transition-colors"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={BRAND.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MCKI Solutions on Twitter"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-gold-300 hover:text-navy-500
                           flex items-center justify-center transition-colors"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-300 mb-4">
                {heading}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href={`tel:${BRAND.phone}`}
              className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <Phone size={14} className="flex-shrink-0" />
              {BRAND.phone}
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <Mail size={14} className="flex-shrink-0" />
              {BRAND.email}
            </a>
            <a
              href={`https://${BRAND.url}`}
              className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <Globe size={14} className="flex-shrink-0" />
              {BRAND.url}
            </a>
            <div className="flex items-start gap-2 text-sm text-white/60">
              <MapPin size={14} className="flex-shrink-0 mt-0.5" />
              Midlands, United Kingdom
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © {year} MCKI Solutions Ltd. All rights reserved. Registered in England &amp; Wales.
          </p>
          <p className="text-white/30 text-xs">
            Data processed under UK GDPR · Hosted on Google Cloud europe-west2
          </p>
        </div>
      </div>
    </footer>
  );
}

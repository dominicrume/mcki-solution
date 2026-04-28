"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-card border-b border-brand-border"
          : "bg-white border-b border-brand-border"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/logo.jpg"
              alt="MCKI Solutions"
              width={44}
              height={44}
              className="rounded-lg object-contain"
              priority
            />
            <div className="hidden sm:block">
              <span className="font-heading font-extrabold text-navy-500 text-lg leading-none block tracking-tight">
                MCKI Solutions
              </span>
              <span className="text-xs text-brand-muted leading-none">
                Education Consultancy
              </span>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.highlight ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="ml-1 px-4 py-2 rounded-lg text-sm font-bold
                             bg-[#FFD700] text-navy-500 hover:bg-yellow-400
                             transition-colors shadow-sm"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-brand-text
                             hover:text-navy-500 hover:bg-navy-50 transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* ── Desktop CTAs ── */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${BRAND.phone}`}
              className="flex items-center gap-1.5 text-sm font-medium text-brand-muted
                         hover:text-navy-500 transition-colors"
            >
              <Phone size={13} />
              {BRAND.phone}
            </a>
            <Link href="/#book-consultation" className="btn-navy text-sm py-2.5 px-5">
              Free Consultation
            </Link>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-brand-alt transition"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {open && (
        <div className="md:hidden border-t border-brand-border bg-white animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) =>
              link.highlight ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-bold text-center
                             bg-[#FFD700] text-navy-500 transition"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-brand-text
                             hover:bg-brand-alt hover:text-navy-500 transition"
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-3 border-t border-brand-border mt-2 space-y-2">
              <a
                href={`tel:${BRAND.phone}`}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-brand-muted font-medium"
              >
                <Phone size={14} />
                {BRAND.phone}
              </a>
              <Link
                href="/local-ed#book-consultation"
                onClick={() => setOpen(false)}
                className="btn-navy w-full text-sm"
              >
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

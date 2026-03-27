"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Cookie, ShieldCheck } from "lucide-react";

type ConsentState = "accepted" | "declined" | null;

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("mcki-cookie-consent");
    if (!stored) {
      // Delay to avoid layout shift on first paint
      const t = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("mcki-cookie-consent", "accepted");
    // Enable analytics scripts here if needed
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem("mcki-cookie-consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-50
                 bg-white rounded-2xl shadow-2xl border border-brand-border p-5 animate-fade-up"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="bg-sapphire-50 p-2 rounded-lg flex-shrink-0">
          <Cookie size={20} className="text-sapphire-500" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-sapphire-500 mb-1">
            We use cookies
          </h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            We use essential cookies to make our site work. With your consent,
            we also use analytics cookies to improve your experience. Your data
            stays in the UK (Google Cloud UK South) and is processed under UK
            GDPR.
          </p>
        </div>
        <button
          onClick={handleDecline}
          className="text-slate-400 hover:text-slate-600 transition flex-shrink-0 p-0.5"
          aria-label="Close without accepting"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex items-center gap-1.5 mb-4">
        <ShieldCheck size={13} className="text-emerald-500" />
        <p className="text-xs text-slate-500">
          ICO registered ·{" "}
          <Link href="/privacy" className="text-sapphire-500 underline">
            Privacy Policy
          </Link>{" "}
          ·{" "}
          <Link href="/cookies" className="text-sapphire-500 underline">
            Cookie Policy
          </Link>
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleDecline}
          className="flex-1 px-4 py-2 rounded-xl border border-brand-border text-sm
                     font-medium text-slate-600 hover:bg-slate-50 transition"
        >
          Essential Only
        </button>
        <button
          onClick={handleAccept}
          className="flex-1 btn-primary text-sm py-2 justify-center"
        >
          Accept All
        </button>
      </div>
    </div>
  );
}

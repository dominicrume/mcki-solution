"use client";

import { useState } from "react";
import { Calendar, ExternalLink, Phone } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/adammasum74/30min";

export function CalendlyEmbed() {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="w-full rounded-2xl border border-brand-border bg-brand-alt p-10 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-navy-50 flex items-center justify-center mx-auto">
          <Calendar size={28} className="text-navy-500" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-navy-500 text-lg mb-2">Book a Free Consultation</h3>
          <p className="text-brand-muted text-sm mb-6">
            Pick a time directly in our calendar — no waiting, no back-and-forth.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-navy inline-flex items-center gap-2"
            >
              <Calendar size={16} /> Open Booking Calendar <ExternalLink size={14} />
            </a>
            <a href="tel:+447889417914" className="btn-ghost border border-brand-border inline-flex items-center gap-2">
              <Phone size={16} /> Call Us Instead
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-brand-border shadow-card relative">
      {/* Loading skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-brand-alt flex flex-col items-center justify-center gap-4 z-10">
          <div className="w-12 h-12 rounded-full bg-navy-50 flex items-center justify-center animate-pulse">
            <Calendar size={22} className="text-navy-500" />
          </div>
          <p className="text-sm text-brand-muted font-medium animate-pulse">Loading booking calendar…</p>
        </div>
      )}
      <iframe
        src={`${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=1F4E79&hide_event_type_details=0`}
        width="100%"
        height="700"
        frameBorder="0"
        title="Book a Free Consultation — MCKI Solutions"
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className="block min-w-[320px]"
        allow="fullscreen"
      />
    </div>
  );
}

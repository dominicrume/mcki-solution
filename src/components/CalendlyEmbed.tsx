"use client";

import { useEffect } from "react";

const CALENDLY_URL = "https://calendly.com/adammasum74/30min";

export function CalendlyEmbed() {
  useEffect(() => {
    const existing = document.getElementById("calendly-script");
    if (existing) return;

    const script = document.createElement("script");
    script.id = "calendly-script";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />
      <div
        className="calendly-inline-widget w-full rounded-2xl overflow-hidden border border-brand-border shadow-card"
        data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=0a2c6e`}
        style={{ minWidth: "320px", height: "700px" }}
      />
    </>
  );
}

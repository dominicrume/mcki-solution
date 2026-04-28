"use client";

import { useState } from "react";
import { CalendarCheck, Loader2, CheckCircle2 } from "lucide-react";

const SERVICE_OPTIONS = [
  { value: "general",     label: "General Enquiry" },
  { value: "admissions",  label: "University Admissions Support" },
  { value: "finance",     label: "Student Finance Guidance" },
  { value: "career",      label: "Career Guidance" },
  { value: "ai-course",   label: "AI / Blockchain Programme" },
] as const;

type ServiceValue = (typeof SERVICE_OPTIONS)[number]["value"];

export function HomepageConsultationForm() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [phone, setPhone]     = useState("");
  const [service, setService] = useState<ServiceValue>("general");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState("");
  const [error, setError]     = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError("Please accept the data processing consent to proceed.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, service }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setReference(data.reference);
    } catch {
      setError("Network error. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (reference) {
    return (
      <div className="bg-white rounded-2xl border border-brand-border shadow-card p-8 text-center space-y-4 max-w-lg mx-auto">
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
          <CheckCircle2 size={28} className="text-emerald-500" />
        </div>
        <h3 className="font-heading text-xl font-bold text-navy-500">
          Request Received
        </h3>
        <p className="text-brand-muted text-sm">
          We&apos;ll confirm your consultation within 2 working hours.
          A confirmation has been sent to <strong>{email}</strong>.
        </p>
        <div className="bg-navy-50 border border-navy-100 rounded-xl px-4 py-3">
          <p className="text-xs text-brand-muted mb-1">Reference</p>
          <p className="font-mono font-bold text-navy-500 text-sm">{reference}</p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-brand-border shadow-card p-8 space-y-5 max-w-lg mx-auto"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-navy-500 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-500 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="input"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-navy-500 mb-1.5">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+44 7000 000000"
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-500 mb-1.5">
            I need help with
          </label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value as ServiceValue)}
            className="select"
          >
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl border border-brand-border p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-navy-500"
          />
          <span className="text-xs text-brand-muted leading-relaxed">
            I consent to MCKI Solutions processing my personal data to arrange my
            free consultation in accordance with the{" "}
            <a href="/privacy" className="text-navy-500 underline">
              Privacy Policy
            </a>{" "}
            and UK GDPR.
          </span>
        </label>
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            <CalendarCheck size={16} />
            Book My Free Consultation
          </>
        )}
      </button>

      <p className="text-center text-xs text-brand-muted">
        Confirmed within 2 working hours · No obligation · GDPR compliant
      </p>
    </form>
  );
}

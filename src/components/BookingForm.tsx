"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, CalendarCheck } from "lucide-react";

type ServiceType =
  | "care-planning"
  | "family-mediation"
  | "benefits-navigation"
  | "respite-support"
  | "general";

type BookingResult = {
  reference: string;
  message: string;
};

export function BookingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState<ServiceType>("general");
  const [preferredDate, setPreferredDate] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BookingResult | null>(null);
  const [error, setError] = useState("");

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
        body: JSON.stringify({
          name,
          email,
          phone,
          service,
          preferred_date: preferredDate,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setResult({ reference: data.reference, message: data.message });
    } catch {
      setError("Network error. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="card p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
          <CalendarCheck size={30} className="text-emerald-500" />
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-sapphire-500 mb-1">
            Consultation Request Received
          </h3>
          <p className="text-slate-600 text-sm">{result.message}</p>
        </div>
        <div className="bg-sapphire-50 border border-sapphire-100 rounded-xl p-3">
          <p className="text-xs text-slate-500 mb-1">Reference Number</p>
          <p className="font-mono font-bold text-sapphire-500">
            {result.reference}
          </p>
        </div>
        <p className="text-xs text-slate-400">
          We will contact you within 2 working hours to confirm your
          consultation time.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
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
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
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
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Phone Number <span className="text-red-500">*</span>
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
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Preferred Date
          </label>
          <input
            type="date"
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="input"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Service Type <span className="text-red-500">*</span>
        </label>
        <select
          value={service}
          onChange={(e) => setService(e.target.value as ServiceType)}
          className="select"
        >
          <option value="general">General Enquiry</option>
          <option value="care-planning">Care Planning</option>
          <option value="family-mediation">Family Mediation</option>
          <option value="benefits-navigation">Benefits Navigation</option>
          <option value="respite-support">Respite Support</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Brief Description{" "}
          <span className="text-slate-400 text-xs">(optional)</span>
        </label>
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us a little about your situation so we can prepare…"
          className="input resize-none"
        />
      </div>

      {/* GDPR Consent */}
      <div className="bg-slate-50 rounded-xl border border-brand-border p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-sapphire-500"
          />
          <span className="text-xs text-slate-600 leading-relaxed">
            I consent to MCKI Solutions processing my personal data to arrange
            and manage my consultation in accordance with the{" "}
            <a href="/privacy" className="text-sapphire-500 underline">
              Privacy Policy
            </a>{" "}
            and UK GDPR. I understand this is a request, not a confirmed
            booking, until MCKI contacts me to confirm.
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
            Request My Consultation
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-400">
        Confirmed within 2 working hours · All advisors are DBS-checked ·
        Strictly confidential
      </p>
    </form>
  );
}

"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, ArrowRight, Calendar, Banknote, Copy } from "lucide-react";

type Props = {
  eventName: string;
};

export function EventSignupForm({ eventName }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const copyText = async (val: string, field: string) => {
    await navigator.clipboard.writeText(val);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError("Please accept the data processing consent to register.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/event/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, ticket_type: "day_event", event: eventName }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    const BankRow = ({ label, val, field }: { label: string; val: string; field: string }) => (
      <div className="flex items-center justify-between py-2.5 border-b border-brand-border last:border-0">
        <div>
          <p className="text-xs text-brand-muted uppercase tracking-wide">{label}</p>
          <p className="font-bold text-navy-500 font-mono">{val}</p>
        </div>
        <button type="button" onClick={() => copyText(val, field)} className="p-1.5 rounded-lg hover:bg-navy-50 text-navy-500 transition">
          {copied === field ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
        </button>
      </div>
    );

    return (
      <div className="card p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 size={24} className="text-emerald-500" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-navy-500">You&apos;re Registered!</h3>
            <p className="text-brand-muted text-sm">Complete your payment to confirm your seat.</p>
          </div>
        </div>

        <div className="bg-gold-50 border border-gold-200 rounded-xl p-3.5 flex items-center gap-3">
          <Calendar size={16} className="text-gold-500 flex-shrink-0" />
          <p className="text-sm text-navy-500 font-medium">6 June 2026 · 1:00 PM – 4:00 PM · Digbeth, Birmingham</p>
        </div>

        {/* Bank details */}
        <div className="bg-navy-50 border border-navy-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Banknote size={18} className="text-navy-500" />
            <p className="font-bold text-navy-500 text-sm">Pay £31 via Bank Transfer</p>
          </div>
          <BankRow label="Account Name" val="MCKI SOLUTIONS LTD" field="name" />
          <BankRow label="Sort Code" val="30-98-97" field="sort" />
          <BankRow label="Account Number" val="47910663" field="acc" />
          <BankRow label="Bank" val="Lloyds Bank" field="bank" />
          <BankRow label="Reference" val="JUNE6-EVENT" field="ref" />
          <p className="text-xs text-amber-700 bg-amber-50 rounded-lg p-2.5 mt-3">
            📌 Use <strong>JUNE6-EVENT</strong> as your reference. Confirmation email arrives within 2 hours of payment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
      {/* Ticket badge */}
      <div className="bg-gold-50 border border-gold-200 rounded-xl p-3.5 flex items-center justify-between">
        <div>
          <p className="text-xs text-gold-600 font-bold uppercase tracking-wide">1-Day Agentic AI Masterclass</p>
          <p className="text-xs text-brand-muted mt-0.5">6 June 2026 · 1PM–4PM · Birmingham + Zoom</p>
        </div>
        <p className="text-2xl font-extrabold text-navy-500">£31</p>
      </div>

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
          Email Address <span className="text-red-500">*</span>
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

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Phone Number{" "}
          <span className="text-slate-400 text-xs">(optional)</span>
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+44 7000 000000"
          className="input"
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
            I consent to MCKI Solutions processing my personal data for event
            registration and communications in accordance with the{" "}
            <a href="/privacy" className="text-sapphire-500 underline">
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
            Registering…
          </>
        ) : (
          <>
            Register for the Event <ArrowRight size={16} />
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-400">
        Bank transfer details shown after registration. Seat confirmed on payment.
      </p>
    </form>
  );
}

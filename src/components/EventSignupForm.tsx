"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, ArrowRight, Calendar } from "lucide-react";

type TicketType = "private_adult" | "private_teenager" | "agent_ai";

type Props = {
  eventName: string;
};

export function EventSignupForm({ eventName }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ticket, setTicket] = useState<TicketType>("private_adult");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const ticketOptions: { value: TicketType; label: string; price: string }[] = [
    { value: "private_adult",    label: "Private Adult",    price: "£600" },
    { value: "private_teenager", label: "Private Teenager", price: "£250" },
    { value: "agent_ai",         label: "Agent AI",         price: "£1,500" },
  ];

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
        body: JSON.stringify({ name, email, phone, ticket_type: ticket, event: eventName }),
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
    return (
      <div className="card p-6 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
          <CheckCircle2 size={32} className="text-emerald-500" />
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-navy-500 mb-1">
            You&apos;re Registered!
          </h3>
          <p className="text-brand-muted text-sm">
            We&apos;ve received your registration for <strong>{eventName}</strong>.
            Check your inbox for a confirmation email with next steps.
          </p>
        </div>
        <div className="bg-gold-50 border border-gold-200 rounded-xl p-4 flex items-center gap-3">
          <Calendar size={18} className="text-gold-500 flex-shrink-0" />
          <p className="text-sm text-navy-500 font-medium">30 May 2026 — Agentic AI Live Event</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
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

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Ticket Type <span className="text-red-500">*</span>
        </label>
        <select
          value={ticket}
          onChange={(e) => setTicket(e.target.value as TicketType)}
          className="select"
          required
        >
          {ticketOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label} — {opt.price}
            </option>
          ))}
        </select>
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
        A payment link will be sent to your email after registration is confirmed.
      </p>
    </form>
  );
}

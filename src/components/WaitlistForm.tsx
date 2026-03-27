"use client";

import { useState } from "react";
import { CheckCircle2, Copy, Share2, Loader2, ArrowRight } from "lucide-react";

type ExperienceLevel = "beginner" | "intermediate" | "advanced" | "professional";

type WaitlistResult = {
  referralCode: string;
  queuePosition: number;
  message: string;
};

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState<ExperienceLevel>("beginner");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WaitlistResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const referralUrl = result
    ? `https://mckisolutions.com/trading-lab?ref=${result.referralCode}`
    : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError("Please accept the data processing consent to join.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/waitlist/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, trading_experience: experience }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setResult({
        referralCode: data.referral_code,
        queuePosition: data.queue_position,
        message: data.message,
      });
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareLink = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Join MCKI Wealth Lab — AI Trading Intelligence",
        text: "I just joined the waitlist for MCKI's AI trading platform. Use my referral link to skip the queue!",
        url: referralUrl,
      });
    } else {
      copyLink();
    }
  };

  if (result) {
    return (
      <div className="card p-6 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
          <CheckCircle2 size={32} className="text-emerald-500" />
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-sapphire-500 mb-1">
            You're In!
          </h3>
          <p className="text-slate-600 text-sm">{result.message}</p>
        </div>

        <div className="bg-gold-50 border border-gold-200 rounded-xl p-4">
          <p className="text-xs text-gold-500 font-semibold uppercase tracking-wide mb-1">
            Your Queue Position
          </p>
          <p className="text-4xl font-heading font-bold text-sapphire-500">
            #{result.queuePosition}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-sapphire-500 mb-3">
            Share your referral link to move up
          </p>
          <div className="bg-slate-50 rounded-xl border border-brand-border p-3 text-xs text-slate-600 break-all mb-3">
            {referralUrl}
          </div>
          <div className="flex gap-3">
            <button
              onClick={copyLink}
              className="flex-1 btn-ghost border border-brand-border text-sm"
            >
              <Copy size={14} />
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <button onClick={shareLink} className="flex-1 btn-primary text-sm">
              <Share2 size={14} />
              Share & Rise
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-400">
          Each successful referral moves you up the queue. Top 100 get
          12-months free access.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
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
          <span className="text-slate-400 text-xs">(optional — for priority alerts)</span>
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
          Trading Experience Level <span className="text-red-500">*</span>
        </label>
        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value as ExperienceLevel)}
          className="select"
          required
        >
          <option value="beginner">Beginner — Just starting out</option>
          <option value="intermediate">Intermediate — Trading 1–3 years</option>
          <option value="advanced">Advanced — Trading 3–7 years</option>
          <option value="professional">Professional — Full-time trader / fund</option>
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
            I consent to MCKI Solutions processing my personal data for waitlist
            management and marketing communications in accordance with the{" "}
            <a href="/privacy" className="text-sapphire-500 underline">
              Privacy Policy
            </a>{" "}
            and UK GDPR. I can withdraw consent at any time.
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
            Securing Your Spot…
          </>
        ) : (
          <>
            Join the Waitlist <ArrowRight size={16} />
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-400">
        No spam. Unsubscribe anytime. Your data stays in the UK (Google Cloud
        UK South).
      </p>
    </form>
  );
}

"use client";

import { useState, useEffect } from "react";
import { X, Copy, CheckCircle2, Banknote, ArrowRight, Building2 } from "lucide-react";

const BANK = {
  name: "MCKI SOLUTIONS LTD",
  sortCode: "30-98-97",
  accountNumber: "47910663",
  bank: "Lloyds Bank",
  ref: "JUNE6-EVENT",
  amount: "£31",
};

export function ReserveSeatButton({
  label = "Reserve My Seat — £31",
  className = "btn-primary text-base",
}: {
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copy = async (val: string, field: string) => {
    await navigator.clipboard.writeText(val);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // lock body scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const CopyBtn = ({ val, field }: { val: string; field: string }) => (
    <button
      onClick={() => copy(val, field)}
      className="ml-2 p-1.5 rounded-md hover:bg-navy-100 text-navy-500 transition-all flex-shrink-0"
      title="Copy"
    >
      {copiedField === field
        ? <CheckCircle2 size={14} className="text-emerald-500" />
        : <Copy size={14} />}
    </button>
  );

  const Row = ({ label, value, field }: { label: string; value: string; field: string }) => (
    <div className="flex items-center justify-between py-3 border-b border-brand-border last:border-0">
      <div>
        <p className="text-xs text-brand-muted font-medium uppercase tracking-wide">{label}</p>
        <p className="text-navy-500 font-bold text-base mt-0.5 font-mono">{value}</p>
      </div>
      <CopyBtn val={value} field={field} />
    </div>
  );

  return (
    <>
      <button onClick={() => setOpen(true)} className={className}>
        {label} <ArrowRight size={18} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(10,25,50,0.7)", backdropFilter: "blur(6px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          {/* Modal */}
          <div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            style={{ animation: "modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both" }}
          >
            {/* Gold header */}
            <div className="bg-hero-gradient px-7 pt-8 pb-6 text-white">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFD700]/20 border border-[#FFD700]/40 flex items-center justify-center">
                  <Banknote size={24} className="text-[#FFD700]" />
                </div>
                <div>
                  <p className="text-[#FFD700] text-xs font-bold uppercase tracking-widest">Secure Your Seat</p>
                  <p className="text-white font-bold text-lg leading-tight">Bank Transfer — {BANK.amount}</p>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Transfer <strong className="text-[#FFD700]">{BANK.amount}</strong> using the details below to confirm your place at the Agentic AI Masterclass — <strong>6 June 2026</strong>.
              </p>
            </div>

            {/* Bank details */}
            <div className="px-7 py-5 space-y-1">
              <div className="flex items-center gap-2 mb-4">
                <Building2 size={16} className="text-brand-muted" />
                <span className="text-sm font-bold text-navy-500">{BANK.bank}</span>
              </div>

              <Row label="Account Name" value={BANK.name} field="name" />
              <Row label="Sort Code" value={BANK.sortCode} field="sort" />
              <Row label="Account Number" value={BANK.accountNumber} field="acc" />
              <Row label="Reference" value={BANK.ref} field="ref" />
              <Row label="Amount" value={BANK.amount} field="amt" />
            </div>

            {/* Instructions */}
            <div className="mx-7 mb-5 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800 leading-relaxed">
              <p className="font-bold mb-1">📌 Important — use the reference!</p>
              <p>Include <strong>{BANK.ref}</strong> as your payment reference so we can match your booking. Once payment is received, your confirmation email will arrive within 2 hours.</p>
            </div>

            {/* Footer */}
            <div className="px-7 pb-7">
              <p className="text-xs text-brand-muted text-center mb-4">
                Questions? Call <a href="tel:+447889417914" className="text-navy-500 font-semibold">+44 7889 417914</a> or email <a href="mailto:Info@mckisolutions.com" className="text-navy-500 font-semibold">Info@mckisolutions.com</a>
              </p>
              <button
                onClick={() => setOpen(false)}
                className="w-full py-3 rounded-xl border-2 border-navy-500 text-navy-500 font-bold text-sm hover:bg-navy-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.88) translateY(24px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </>
  );
}

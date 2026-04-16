"use client";

import { useState, useEffect } from "react";
import { X, Copy, CheckCircle2, Banknote, ArrowRight, Building2 } from "lucide-react";

const BANK = {
  name:          "MCKI SOLUTIONS LTD",
  sortCode:      "30-98-97",
  accountNumber: "47910663",
  bank:          "Lloyds Bank",
  ref:           "JUNE6-EVENT",
  amount:        "£31",
};

export function ReserveSeatButton({
  label     = "Reserve My Seat — £31",
  className = "btn-primary text-base",
}: {
  label?:     string;
  className?: string;
}) {
  const [open, setOpen]               = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copy = async (val: string, field: string) => {
    await navigator.clipboard.writeText(val);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const CopyBtn = ({ val, field }: { val: string; field: string }) => (
    <button
      type="button"
      onClick={() => copy(val, field)}
      className="ml-2 p-1.5 rounded-md hover:bg-navy-100 text-navy-500 transition-all flex-shrink-0"
      title="Copy"
    >
      {copiedField === field
        ? <CheckCircle2 size={14} className="text-emerald-500" />
        : <Copy size={14} />}
    </button>
  );

  const Row = ({ label: rowLabel, value, field }: { label: string; value: string; field: string }) => (
    <div className="flex items-center justify-between py-3 border-b border-brand-border last:border-0">
      <div>
        <p className="text-xs text-brand-muted font-medium uppercase tracking-wide">{rowLabel}</p>
        <p className="text-navy-500 font-bold text-base mt-0.5 font-mono">{value}</p>
      </div>
      <CopyBtn val={value} field={field} />
    </div>
  );

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label} <ArrowRight size={18} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 modal-backdrop"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-modal-in">

            {/* ── Navy header ── */}
            <div className="bg-hero-gradient px-7 pt-8 pb-6 text-white">
              <button
                type="button"
                title="Close payment details"
                aria-label="Close payment details"
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
              <p className="text-white/75 text-sm leading-relaxed">
                Transfer <strong className="text-[#FFD700]">{BANK.amount}</strong> to confirm your place at the
                Agentic AI Masterclass — <strong>6 June 2026 · 1PM–4PM · Birmingham + Zoom</strong>.
              </p>
            </div>

            {/* ── Bank details ── */}
            <div className="px-7 py-5">
              <div className="flex items-center gap-2 mb-4">
                <Building2 size={16} className="text-brand-muted" />
                <span className="text-sm font-bold text-navy-500">{BANK.bank}</span>
              </div>
              <Row label="Account Name"   value={BANK.name}          field="name" />
              <Row label="Sort Code"      value={BANK.sortCode}      field="sort" />
              <Row label="Account Number" value={BANK.accountNumber} field="acc"  />
              <Row label="Reference"      value={BANK.ref}           field="ref"  />
              <Row label="Amount"         value={BANK.amount}        field="amt"  />
            </div>

            {/* ── Amber notice ── */}
            <div className="mx-7 mb-5 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800 leading-relaxed">
              <p className="font-bold mb-1">📌 Use the exact reference!</p>
              <p>Include <strong>{BANK.ref}</strong> so we can match your payment. Seat confirmation and event details emailed within 2 hours of payment.</p>
            </div>

            {/* ── Footer ── */}
            <div className="px-7 pb-7">
              <p className="text-xs text-brand-muted text-center mb-4">
                Questions?{" "}
                <a href="tel:+447889417914" className="text-navy-500 font-semibold">+44 7889 417914</a>
                {" · "}
                <a href="mailto:Info@mckisolutions.com" className="text-navy-500 font-semibold">Info@mckisolutions.com</a>
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full py-3 rounded-xl border-2 border-navy-500 text-navy-500 font-bold text-sm hover:bg-navy-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

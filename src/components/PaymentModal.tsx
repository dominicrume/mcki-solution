"use client";

import { useRef, useCallback, useEffect } from "react";
import { X, Copy, CheckCircle2, Banknote, Building2 } from "lucide-react";
import { useState } from "react";

const BANK = {
  name:          "MCKI SOLUTIONS LTD",
  sortCode:      "30-98-97",
  accountNumber: "47910663",
  bank:          "Lloyds Bank",
  ref:           "JUNE6-EVENT",
  amount:        "£31",
};

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${value}`}
      className="ml-2 p-1.5 rounded-lg hover:bg-navy-100 text-navy-400 hover:text-navy-600 transition flex-shrink-0"
    >
      {copied
        ? <CheckCircle2 size={14} className="text-emerald-500" />
        : <Copy size={14} />}
    </button>
  );
}

function BankRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <div>
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-navy-600 font-bold text-[15px] mt-0.5 font-mono tracking-wide">{value}</p>
      </div>
      <CopyButton value={value} />
    </div>
  );
}

export function ReserveSeatButton({
  label     = "Reserve My Seat — £31",
  className = "btn-primary text-base",
}: {
  label?:     string;
  className?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal  = useCallback(() => dialogRef.current?.showModal(), []);
  const closeModal = useCallback(() => dialogRef.current?.close(),     []);

  // Close dialog before page is hidden so it doesn't block bfcache restoration
  useEffect(() => {
    const handlePageHide = () => dialogRef.current?.close();
    window.addEventListener("pagehide", handlePageHide);
    return () => window.removeEventListener("pagehide", handlePageHide);
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const rect = dialogRef.current?.getBoundingClientRect();
    if (!rect) return;
    if (
      e.clientX < rect.left  || e.clientX > rect.right ||
      e.clientY < rect.top   || e.clientY > rect.bottom
    ) {
      closeModal();
    }
  };

  return (
    <>
      {/* ── Trigger button ── */}
      <button
        type="button"
        onClick={openModal}
        className={className}
      >
        {label}
      </button>

      {/* ── Native <dialog> modal ── */}
      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        className="payment-dialog"
      >
        <div className="payment-dialog-inner">

          {/* Header */}
          <div className="payment-dialog-header">
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="payment-dialog-close"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="payment-dialog-icon">
                <Banknote size={22} className="text-[#FFD700]" />
              </div>
              <div>
                <p className="text-[#FFD700] text-[10px] font-bold uppercase tracking-[0.15em]">Secure Your Seat</p>
                <p className="text-white font-extrabold text-xl leading-tight">Bank Transfer — {BANK.amount}</p>
              </div>
            </div>
            <p className="text-white/75 text-sm leading-relaxed">
              Transfer <strong className="text-[#FFD700]">{BANK.amount}</strong> using the details below to
              confirm your place at the Agentic AI Masterclass —{" "}
              <strong>6 June 2026 · 1PM–4PM · Birmingham + Zoom</strong>.
            </p>
          </div>

          {/* Bank details */}
          <div className="px-6 pt-5 pb-2">
            <div className="flex items-center gap-2 mb-3">
              <Building2 size={14} className="text-slate-400" />
              <span className="text-xs font-bold text-slate-500">{BANK.bank}</span>
            </div>
            <BankRow label="Account Name"   value={BANK.name}          />
            <BankRow label="Sort Code"      value={BANK.sortCode}      />
            <BankRow label="Account Number" value={BANK.accountNumber} />
            <BankRow label="Reference"      value={BANK.ref}           />
            <BankRow label="Amount"         value={BANK.amount}        />
          </div>

          {/* Notice */}
          <div className="mx-6 mb-4 mt-2 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            <p className="font-bold mb-1">📌 Important — use the reference!</p>
            <p className="leading-relaxed text-xs">
              Include <strong>{BANK.ref}</strong> as your payment reference so we can match your booking.
              Your seat confirmation email arrives within 2 hours of payment.
            </p>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6">
            <p className="text-xs text-slate-400 text-center mb-3">
              Questions?{" "}
              <a href="tel:+447889417914" className="text-navy-500 font-semibold">+44 7889 417914</a>
              {" · "}
              <a href="mailto:Info@mckisolutions.com" className="text-navy-500 font-semibold">Info@mckisolutions.com</a>
            </p>
            <button
              type="button"
              onClick={closeModal}
              className="w-full py-2.5 rounded-xl border-2 border-navy-400 text-navy-500 font-bold text-sm hover:bg-navy-50 transition"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

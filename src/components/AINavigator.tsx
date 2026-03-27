"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Download, CheckCircle2, Mail } from "lucide-react";
import { BRAND } from "@/lib/constants";

type Mode = "local" | "international";

type Message = {
  role: "assistant" | "user";
  content: string;
};

type CollectedData = {
  email: string;
  name: string;
  interests: string;
  country: string;
  education: string;
  nationality?: string;
};

// Step labels shown in the progress indicator
const STEP_LABELS = ["Email", "Name", "Interests", "Country", "Education", "Report"];

const WELCOME: Record<Mode, string> = {
  local:
    "Hi, I'm your MCKI Education Advisor.\n\nAnswer 3 quick questions and I'll build your personalised university and funding roadmap — completely free.\n\nWhat is your email address to receive your report?",
  international:
    "Hi, I'm your MCKI Education Advisor.\n\nAnswer 3 quick questions and I'll build your personalised UK university pathway and visa strategy — completely free.\n\nWhat is your email address to receive your report?",
};

export function AINavigator({ mode }: { mode: Mode }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME[mode] },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [collected, setCollected] = useState<Partial<CollectedData>>({});
  const [blueprintReady, setBlueprintReady] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading || blueprintReady) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/navigator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          step,
          userMessage: input,
          collected,
          history: messages,
        }),
      });

      const data = await res.json();

      if (data.updatedCollected) {
        setCollected((prev) => ({ ...prev, ...data.updatedCollected }));
      }

      if (typeof data.nextStep === "number") {
        setStep(data.nextStep);
      }

      if (data.blueprintReady) {
        setBlueprintReady(true);
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, something went wrong. Please try again or call us on ${BRAND.phone}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const progressStep = Math.min(step, STEP_LABELS.length - 1);

  return (
    <div className="card overflow-hidden flex flex-col h-[600px]">
      {/* ── Header ── */}
      <div className="bg-sapphire-500 px-5 py-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gold-300 flex items-center justify-center flex-shrink-0">
          <Bot size={18} className="text-sapphire-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-heading font-semibold text-sm">
            MCKI AI Career Navigator
          </p>
          <p className="text-sapphire-200 text-xs">
            {mode === "local"
              ? "SFE Funding & Career Intelligence"
              : "UK Visa & Admissions Intelligence"}
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-emerald-300 flex-shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Online
        </span>
      </div>

      {/* ── Progress bar ── */}
      <div className="bg-sapphire-50 px-5 py-2.5 border-b border-sapphire-100">
        <div className="flex items-center gap-1">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex items-center gap-1 flex-1">
              <div
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  i <= progressStep ? "bg-sapphire-500" : "bg-sapphire-200"
                }`}
              />
              {i === STEP_LABELS.length - 1 && (
                <span
                  className={`text-xs font-medium flex-shrink-0 ${
                    blueprintReady ? "text-emerald-600" : "text-sapphire-400"
                  }`}
                >
                  {blueprintReady ? "✓ Done" : label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Messages ── */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-2.5 ${
              msg.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === "assistant" ? "bg-sapphire-500" : "bg-gold-300"
              }`}
            >
              {msg.role === "assistant" ? (
                <Bot size={13} className="text-white" />
              ) : (
                <User size={13} className="text-sapphire-500" />
              )}
            </div>
            <div
              className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                msg.role === "assistant"
                  ? "bg-white border border-brand-border text-slate-700"
                  : "bg-sapphire-500 text-white"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-sapphire-500 flex items-center justify-center">
              <Bot size={13} className="text-white" />
            </div>
            <div className="bg-white border border-brand-border rounded-2xl px-4 py-3 flex gap-1 items-center">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-sapphire-300 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Blueprint ready banner */}
        {blueprintReady && collected.email && (
          <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-emerald-700">
                Your Career Blueprint is on its way!
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <Mail size={12} className="text-emerald-500" />
                <p className="text-xs text-emerald-600">
                  Sending to <strong>{collected.email}</strong> — arrives in under 60 seconds.
                </p>
              </div>
            </div>
            <Download size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
          </div>
        )}

      </div>

      {/* ── Input ── */}
      <div className="p-4 bg-white border-t border-brand-border">
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
            placeholder={
              blueprintReady
                ? "Blueprint sent! Check your inbox."
                : step === 0
                ? "Type your email address…"
                : "Type your answer…"
            }
            className="input resize-none text-sm py-2.5"
            disabled={loading || blueprintReady}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim() || blueprintReady}
            className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-slate-400 text-xs mt-2">
          Press Enter to send · GDPR compliant · Data encrypted at rest
        </p>
      </div>
    </div>
  );
}

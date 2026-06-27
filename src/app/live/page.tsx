"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  PlayCircle,
  Wrench,
  ArrowRight,
  BookOpen,
  MessageSquare,
  GraduationCap,
} from "lucide-react";

export default function LiveEventPage() {
  const [pollVoted, setPollVoted] = useState(false);
  const [pollResults, setPollResults] = useState([
    { id: 1, text: "Data Entry & Admin", votes: 14, selected: false },
    { id: 2, text: "Chasing Clients / Quotes", votes: 8, selected: false },
    { id: 3, text: "Scheduling & Emails", votes: 21, selected: false },
    { id: 4, text: "Reporting & Operations", votes: 5, selected: false },
  ]);

  const handleVote = (id: number) => {
    if (pollVoted) return;
    setPollResults((prev) =>
      prev.map((option) =>
        option.id === id
          ? { ...option, votes: option.votes + 1, selected: true }
          : option
      )
    );
    setPollVoted(true);
  };

  const totalVotes = pollResults.reduce((acc, curr) => acc + curr.votes, 0);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-body pb-20 selection:bg-gold-300 selection:text-navy-900">
      {/* 1. HEADER */}
      <header className="bg-navy-500 text-white pt-12 pb-10 px-6 rounded-b-3xl shadow-card">
        <div className="max-w-md mx-auto">
          <div className="inline-block px-3 py-1 bg-gold-300/20 text-gold-200 text-xs font-semibold tracking-wider rounded-full mb-4 border border-gold-300/30">
            LIVE EVENT HUB
          </div>
          <h1 className="text-4xl font-heading font-bold mb-4 tracking-tight">
            Agentic AI Birmingham
          </h1>
          
          <div className="space-y-2 text-navy-100 text-sm mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gold-300" />
              <span>Friday 27 June</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold-300" />
              <span>1:00–4:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold-300" />
              <span>Ravenhurst Street, Digbeth</span>
            </div>
          </div>

          <div className="bg-navy-600/50 p-4 rounded-2xl border border-navy-400/30">
            <p className="text-sm font-medium text-gold-200 mb-2 uppercase tracking-wide">The Promise</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-navy-900/50 px-3 py-1.5 rounded-lg text-white font-semibold text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gold-300" /> 5x cheaper
              </span>
              <span className="bg-navy-900/50 px-3 py-1.5 rounded-lg text-white font-semibold text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gold-300" /> 7x faster
              </span>
              <span className="bg-navy-900/50 px-3 py-1.5 rounded-lg text-white font-semibold text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gold-300" /> 10x clearer
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 mt-8 space-y-10">
        
        {/* 2. WHAT THIS EVENT IS */}
        <section className="animate-fade-up" style={{ animationDelay: "100ms" }}>
          <h2 className="text-xs font-bold text-brand-muted uppercase tracking-wider mb-3">About Today</h2>
          <p className="text-lg leading-relaxed text-brand-text/90 font-medium bg-white p-5 rounded-2xl shadow-sm border border-brand-border">
            We build AI agents that automate your business workflows — so the work
            runs itself, cheaper and faster.
          </p>
        </section>

        {/* 3. LIVE POLL */}
        <section id="poll" className="animate-fade-up scroll-mt-6" style={{ animationDelay: "200ms" }}>
          <div className="bg-white p-6 rounded-3xl shadow-card border border-brand-border">
            <h2 className="text-xl font-heading font-bold mb-1">Live Poll</h2>
            <p className="text-sm text-brand-muted mb-5">What's your biggest weekly time-waster?</p>
            
            <div className="space-y-3">
              {pollResults.map((option) => {
                const percentage = Math.round((option.votes / (totalVotes || 1)) * 100);
                return (
                  <button
                    key={option.id}
                    onClick={() => handleVote(option.id)}
                    disabled={pollVoted}
                    className={`relative w-full text-left overflow-hidden rounded-xl border p-4 transition-all duration-300 ${
                      pollVoted 
                        ? option.selected 
                          ? "border-navy-400 bg-navy-50" 
                          : "border-brand-border bg-brand-alt/50"
                        : "border-brand-border hover:border-gold-300 hover:shadow-md bg-white"
                    }`}
                  >
                    {pollVoted && (
                      <div 
                        className={`absolute left-0 top-0 bottom-0 ${option.selected ? "bg-navy-100" : "bg-brand-alt"} opacity-50 transition-all duration-1000 ease-out`}
                        style={{ width: `${percentage}%` }}
                      />
                    )}
                    <div className="relative flex justify-between items-center z-10">
                      <span className={`font-medium ${pollVoted && option.selected ? "text-navy-600 font-bold" : "text-brand-text"}`}>
                        {option.text}
                      </span>
                      {pollVoted && (
                        <span className={`text-sm font-bold ${option.selected ? "text-navy-500" : "text-brand-muted"}`}>
                          {percentage}%
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            {pollVoted && (
              <p className="text-center text-xs text-brand-muted mt-4 animate-fade-in">
                Thank you! Live results updating...
              </p>
            )}
          </div>
        </section>

        {/* 4. THE DEMOS */}
        <section className="animate-fade-up" style={{ animationDelay: "300ms" }}>
          <h2 className="text-xs font-bold text-brand-muted uppercase tracking-wider mb-3">Live Demos</h2>
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm flex gap-4 items-start">
              <div className="bg-navy-50 text-navy-400 p-3 rounded-xl shrink-0">
                <PlayCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-brand-text mb-1">Enquiry-to-Reply Agent</h3>
                <p className="text-sm text-brand-muted">Automate workflow, cut admin cost.</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm flex gap-4 items-start">
              <div className="bg-navy-50 text-navy-400 p-3 rounded-xl shrink-0">
                <PlayCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-brand-text mb-1">Quote Follow-Up Agent</h3>
                <p className="text-sm text-brand-muted">Accelerate delivery, recover revenue.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. THE LIVE BUILD */}
        <section className="animate-fade-up" style={{ animationDelay: "400ms" }}>
          <div className="bg-gradient-to-br from-navy-500 to-navy-700 p-6 rounded-3xl text-white shadow-card relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Wrench className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-heading font-bold mb-2 text-gold-200">The Live Build</h2>
              <p className="text-lg font-medium leading-tight mb-4">
                "We build a real agent around one attendee's business, live."
              </p>
              <div className="bg-navy-900/40 p-3 rounded-xl text-sm text-navy-100 border border-navy-400/30">
                <span className="font-bold text-gold-300">Note:</span> Operations Agent or Follow-Up Agent — attendee's choice.
              </div>
            </div>
          </div>
        </section>

        {/* 6. START HERE */}
        <section id="starthere" className="animate-fade-up scroll-mt-6" style={{ animationDelay: "500ms" }}>
          <h2 className="text-xs font-bold text-brand-muted uppercase tracking-wider mb-3">Start Here</h2>
          <div className="space-y-3">
            
            {/* Primary Action */}
            <a 
              href="[CALCOM_OR_BOOKING_LINK]" 
              className="group flex items-center justify-between w-full bg-gold-300 text-navy-900 p-5 rounded-2xl font-bold shadow-cta hover:bg-gold-200 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5" />
                <span>Book a free discovery call</span>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary Actions */}
            <a 
              href="[COURSE_LINK]" 
              className="flex items-center gap-3 w-full bg-white text-brand-text p-4 rounded-xl font-medium border border-brand-border hover:border-navy-200 hover:shadow-sm transition-all active:scale-[0.98]"
            >
              <div className="bg-brand-alt p-2 rounded-lg text-navy-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              See the course
            </a>

            <div className="bg-white p-4 rounded-xl border border-brand-border space-y-3">
              <div className="flex items-center gap-3 font-medium text-brand-text">
                <div className="bg-brand-alt p-2 rounded-lg text-navy-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                Get the books:
              </div>
              <div className="pl-12 space-y-2">
                <a href="[BOOK_LINK_1]" className="block text-sm text-navy-400 font-medium hover:text-navy-500 hover:underline">
                  • Wealth of the Blockchain
                </a>
                <a href="[BOOK_LINK_2]" className="block text-sm text-navy-400 font-medium hover:text-navy-500 hover:underline">
                  • An Evolution into the Metaverse
                </a>
              </div>
            </div>

            <a 
              href="[COMMUNITY_LINK]" 
              className="flex items-center gap-3 w-full bg-white text-brand-text p-4 rounded-xl font-medium border border-brand-border hover:border-navy-200 hover:shadow-sm transition-all active:scale-[0.98]"
            >
              <div className="bg-brand-alt p-2 rounded-lg text-navy-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              Join the community
            </a>

          </div>
        </section>

      </main>
    </div>
  );
}

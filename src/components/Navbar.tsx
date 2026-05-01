"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu, X, Phone, ChevronDown,
  GraduationCap, Globe, Briefcase, Calendar, BookOpen, Clock,
} from "lucide-react";
import { BRAND } from "@/lib/constants";
import { getUpcomingEvents, getPastEvents, type MCKIEvent } from "@/lib/events-data";

/* ── Dropdown data ──────────────────────────────────────────────────────────── */

const LOCAL_STUDENT_ITEMS = [
  {
    icon: GraduationCap,
    title: "University Admissions",
    desc: "End-to-end support finding and applying to the right UK postgraduate programme for your goals.",
    href: "/local-ed#admissions",
  },
  {
    icon: BookOpen,
    title: "Student Finance England",
    desc: "Guidance on government funding for Master's degrees — eligibility checks, application support, and loan management.",
    href: "/local-ed#funding",
  },
  {
    icon: Briefcase,
    title: "Career & Course Matching",
    desc: "A personalised plan that maps your background to the postgraduate route with the clearest career return.",
    href: "/local-ed#career",
  },
];

const INTERNATIONAL_ITEMS = [
  {
    icon: Globe,
    title: "International Admissions",
    desc: "Helping international students navigate UK university applications, visa requirements, and course selection.",
    href: "/international-ed#admissions",
  },
  {
    icon: BookOpen,
    title: "Scholarship & Funding",
    desc: "Identifying scholarships, bursaries, and financial aid available to international postgraduate students.",
    href: "/international-ed#funding",
  },
  {
    icon: Briefcase,
    title: "Pre-Arrival & Settlement",
    desc: "Practical guidance on accommodation, banking, and building your professional network in the UK.",
    href: "/international-ed#settlement",
  },
];

const BUSINESS_ITEMS = [
  {
    icon: Briefcase,
    title: "Corporate Training",
    desc: "Bespoke AI and professional development programmes for your team — delivered on-site or remotely.",
    href: "/business#training",
  },
  {
    icon: GraduationCap,
    title: "Staff Upskilling & Funding",
    desc: "We identify government-backed funding routes to reskill your workforce at reduced or no cost.",
    href: "/business#upskilling",
  },
  {
    icon: Globe,
    title: "Organisational Partnerships",
    desc: "Strategic partnerships with universities and training providers to support your team's long-term growth.",
    href: "/business#partnerships",
  },
];

/* ── Types ──────────────────────────────────────────────────────────────────── */

interface DropdownItem {
  icon: React.ElementType;
  title: string;
  desc: string;
  href: string;
}

/* ── Sub-components ─────────────────────────────────────────────────────────── */

function NavDropdown({
  label,
  items,
  highlight,
}: {
  label: string;
  items: DropdownItem[];
  highlight?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          highlight
            ? "bg-[#FFD700] text-navy-500 font-bold hover:bg-yellow-400 shadow-sm"
            : "text-brand-text hover:text-navy-500 hover:bg-navy-50"
        }`}
      >
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-2xl border border-brand-border shadow-lg z-50 py-2 animate-fade-in">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-start gap-3 px-4 py-3 hover:bg-navy-50 transition-colors rounded-xl mx-1"
            >
              <div className="w-8 h-8 rounded-lg bg-navy-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <item.icon size={15} className="text-navy-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy-500">{item.title}</p>
                <p className="text-xs text-brand-muted leading-relaxed mt-0.5">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function EventsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const nextEvent = upcoming[0];
  const label = nextEvent
    ? `AI Event — ${nextEvent.displayDate.split(" ").slice(0, 2).join(" ")}`
    : "AI Events";

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="ml-1 flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-bold
                   bg-[#FFD700] text-navy-500 hover:bg-yellow-400 transition-colors shadow-sm"
      >
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1 w-80 bg-white rounded-2xl border border-brand-border shadow-lg z-50 py-3 animate-fade-in">
          {upcoming.length > 0 && (
            <>
              <p className="px-4 pb-1 text-[10px] font-bold uppercase tracking-widest text-brand-muted">
                Upcoming Events
              </p>
              {upcoming.map((ev) => (
                <EventRow key={ev.id} event={ev} onClose={() => setOpen(false)} />
              ))}
            </>
          )}

          {past.length > 0 && (
            <>
              <div className="my-2 border-t border-brand-border" />
              <p className="px-4 pb-1 text-[10px] font-bold uppercase tracking-widest text-brand-muted">
                Past Events
              </p>
              {past.map((ev) => (
                <EventRow key={ev.id} event={ev} onClose={() => setOpen(false)} />
              ))}
            </>
          )}

          <div className="border-t border-brand-border mt-2 px-4 pt-3">
            <Link
              href="/events"
              onClick={() => setOpen(false)}
              className="text-xs font-semibold text-navy-500 hover:underline"
            >
              View all events & register →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function EventRow({ event, onClose }: { event: MCKIEvent; onClose: () => void }) {
  const statusColour =
    event.status === "upcoming"
      ? "bg-green-100 text-green-700"
      : event.status === "sold-out"
      ? "bg-red-100 text-red-700"
      : "bg-gray-100 text-gray-500";

  return (
    <Link
      href={event.href}
      onClick={onClose}
      className="flex items-start gap-3 px-4 py-3 hover:bg-navy-50 transition-colors rounded-xl mx-1"
    >
      <div className="w-8 h-8 rounded-lg bg-gold-300/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Calendar size={14} className="text-navy-500" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold text-navy-500">{event.title}</p>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${statusColour}`}>
            {event.status === "upcoming" ? "Upcoming" : event.status === "sold-out" ? "Sold Out" : "Past"}
          </span>
        </div>
        <p className="text-xs text-brand-muted mt-0.5 flex items-center gap-1">
          <Clock size={10} /> {event.displayDate} · {event.time}
        </p>
        <p className="text-xs text-brand-muted leading-relaxed mt-0.5 truncate">{event.description}</p>
      </div>
    </Link>
  );
}

/* ── Main Navbar ────────────────────────────────────────────────────────────── */

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function toggleMobile(section: string) {
    setMobileExpanded((prev) => (prev === section ? null : section));
  }

  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-card border-b border-brand-border"
          : "bg-white border-b border-brand-border"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/logo.jpg"
              alt="MCKI Solutions"
              width={44}
              height={44}
              className="rounded-lg object-contain"
              priority
            />
            <div className="hidden sm:block">
              <span className="font-heading font-extrabold text-navy-500 text-lg leading-none block tracking-tight">
                MCKI Solutions
              </span>
              <span className="text-xs text-brand-muted leading-none">
                Education Consultancy
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavDropdown label="Local Student Solution" items={LOCAL_STUDENT_ITEMS} />
            <NavDropdown label="International Student Solution" items={INTERNATIONAL_ITEMS} />
            <NavDropdown label="Business Solutions" items={BUSINESS_ITEMS} />
            <Link
              href="/blog"
              className="px-4 py-2 rounded-lg text-sm font-medium text-brand-text
                         hover:text-navy-500 hover:bg-navy-50 transition-colors"
            >
              Blog
            </Link>
            <EventsDropdown />
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${BRAND.phone}`}
              className="flex items-center gap-1.5 text-sm font-medium text-brand-muted
                         hover:text-navy-500 transition-colors"
            >
              <Phone size={13} />
              {BRAND.phone}
            </a>
            <Link href="/#book-consultation" className="btn-navy text-sm py-2.5 px-5">
              Free Consultation
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-brand-alt transition"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-brand-border bg-white animate-fade-in">
          <div className="px-4 py-4 space-y-1">

            {/* Local Student Solution */}
            <MobileSection
              label="Local Student Solution"
              expanded={mobileExpanded === "local"}
              onToggle={() => toggleMobile("local")}
              items={LOCAL_STUDENT_ITEMS}
              onClose={() => setOpen(false)}
            />

            {/* International Student Solution */}
            <MobileSection
              label="International Student Solution"
              expanded={mobileExpanded === "international"}
              onToggle={() => toggleMobile("international")}
              items={INTERNATIONAL_ITEMS}
              onClose={() => setOpen(false)}
            />

            {/* Business Solutions */}
            <MobileSection
              label="Business Solutions"
              expanded={mobileExpanded === "business"}
              onToggle={() => toggleMobile("business")}
              items={BUSINESS_ITEMS}
              onClose={() => setOpen(false)}
            />

            {/* Blog */}
            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-medium text-brand-text
                         hover:bg-brand-alt hover:text-navy-500 transition"
            >
              Blog
            </Link>

            {/* Events mobile */}
            <div>
              <button
                type="button"
                onClick={() => toggleMobile("events")}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold
                           bg-[#FFD700] text-navy-500 transition"
              >
                AI Events
                <ChevronDown
                  size={14}
                  className={`transition-transform ${mobileExpanded === "events" ? "rotate-180" : ""}`}
                />
              </button>
              {mobileExpanded === "events" && (
                <div className="mt-1 ml-3 space-y-1 border-l-2 border-gold-300/40 pl-3">
                  {upcoming.length > 0 && (
                    <>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted px-2 pt-1">Upcoming</p>
                      {upcoming.map((ev) => (
                        <MobileEventRow key={ev.id} event={ev} onClose={() => setOpen(false)} />
                      ))}
                    </>
                  )}
                  {past.length > 0 && (
                    <>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted px-2 pt-2">Past Events</p>
                      {past.map((ev) => (
                        <MobileEventRow key={ev.id} event={ev} onClose={() => setOpen(false)} />
                      ))}
                    </>
                  )}
                  <Link
                    href="/events"
                    onClick={() => setOpen(false)}
                    className="block px-2 py-2 text-xs font-semibold text-navy-500"
                  >
                    All events →
                  </Link>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-brand-border mt-2 space-y-2">
              <a
                href={`tel:${BRAND.phone}`}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-brand-muted font-medium"
              >
                <Phone size={14} />
                {BRAND.phone}
              </a>
              <Link
                href="/local-ed#book-consultation"
                onClick={() => setOpen(false)}
                className="btn-navy w-full text-sm"
              >
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function MobileSection({
  label,
  expanded,
  onToggle,
  items,
  onClose,
}: {
  label: string;
  expanded: boolean;
  onToggle: () => void;
  items: DropdownItem[];
  onClose: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium
                   text-brand-text hover:bg-brand-alt hover:text-navy-500 transition"
      >
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded && (
        <div className="mt-1 ml-3 space-y-1 border-l-2 border-navy-50 pl-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-start gap-2 px-2 py-2.5 rounded-lg hover:bg-brand-alt transition"
            >
              <div className="w-6 h-6 rounded-md bg-navy-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <item.icon size={12} className="text-navy-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy-500">{item.title}</p>
                <p className="text-xs text-brand-muted leading-relaxed">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileEventRow({ event, onClose }: { event: MCKIEvent; onClose: () => void }) {
  return (
    <Link
      href={event.href}
      onClick={onClose}
      className="block px-2 py-2 rounded-lg hover:bg-brand-alt transition"
    >
      <p className="text-sm font-semibold text-navy-500">{event.title}</p>
      <p className="text-xs text-brand-muted">{event.displayDate} · {event.price}</p>
    </Link>
  );
}

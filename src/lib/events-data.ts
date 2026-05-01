export type EventStatus = "upcoming" | "past" | "sold-out";

export interface MCKIEvent {
  id: string;
  title: string;
  subtitle: string;
  date: string;          // ISO date string  e.g. "2026-06-06"
  displayDate: string;   // Human-readable
  time: string;
  location: string;
  price: string;
  href: string;
  status: EventStatus;
  description: string;
}

export const EVENTS: MCKIEvent[] = [
  {
    id: "ai-masterclass-feb-2026",
    title: "Agentic AI Masterclass",
    subtitle: "Birmingham — February 2026",
    date: "2026-02-15",
    displayDate: "15 February 2026",
    time: "1:00 PM – 4:00 PM",
    location: "Birmingham",
    price: "£31",
    href: "/events",
    status: "past",
    description: "Our inaugural Agentic AI Masterclass. Sold out. 50 attendees, 3 expert speakers, live AI agent build.",
  },
  {
    id: "ai-masterclass-jun-2026",
    title: "Agentic AI Masterclass",
    subtitle: "Midlands — June 6, 2026",
    date: "2026-06-06",
    displayDate: "6 June 2026",
    time: "1:00 PM – 4:00 PM",
    location: "Revenhurst House, Digbeth, Birmingham B12 0HD + Zoom",
    price: "£31",
    href: "/events",
    status: "upcoming",
    description: "Hands-on AI agents training. Build your first autonomous agent, hear from 3 expert speakers, and map your AI career path.",
  },
];

export function getUpcomingEvents(): MCKIEvent[] {
  const today = new Date().toISOString().split("T")[0];
  return EVENTS.filter((e) => e.date >= today && e.status !== "past").sort(
    (a, b) => a.date.localeCompare(b.date)
  );
}

export function getPastEvents(): MCKIEvent[] {
  const today = new Date().toISOString().split("T")[0];
  return EVENTS.filter((e) => e.date < today || e.status === "past").sort(
    (a, b) => b.date.localeCompare(a.date)
  );
}

export function getNextEvent(): MCKIEvent | undefined {
  return getUpcomingEvents()[0];
}

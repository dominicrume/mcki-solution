export const BRAND = {
  name: "MCKI Solutions",
  url: "https://mckisolutions.com",
  phone: "+44 7889 417914",
  email: "Info@mckisolutions.com",
  crmEmail: "adammasum74@gmail.com",
  tagline: "Serve with passion. Lead with heart. Achieve with purpose.",
  description:
    "MCKI Solutions is a postgraduate education consultancy based in the Midlands. We help UK residents get into university, access government funding, and take the next step in their careers — with honest, personal guidance from people who care.",
  social: {
    facebook: "http://facebook.com/profile.php?id=61586948383844",
    linkedin: "https://www.linkedin.com/in/mcki-solutions-86315b3ab/",
    twitter: "https://twitter.com/mckisolutions",
  },
} as const;

export const NAV_LINKS = [
  { label: "Education Funding",    href: "/local-ed",         highlight: false },
  { label: "International",        href: "/international-ed", highlight: false },
  { label: "Wealth Lab",           href: "/trading-lab",      highlight: false },
  { label: "AI Event — June 6",    href: "/events",           highlight: true  },
] as const;

export const UNIVERSITY_PARTNERS = [
  "University of Birmingham",
  "Aston University",
  "Coventry University",
  "De Montfort University",
  "University of Wolverhampton",
  "Birmingham City University",
  "Keele University",
  "Staffordshire University",
] as const;

export const STATS = [
  { value: "500+",    label: "Students Guided" },
  { value: "35+",     label: "University Partners" },
  { value: "98%",     label: "Satisfaction Rate" },
  { value: "Free",    label: "Initial Consultation" },
  { value: "Jun 6",   label: "Agentic AI Event 2026" },
] as const;

export const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is MCKI Solutions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MCKI Solutions is a postgraduate education consultancy based in the Midlands, UK. We help UK residents get into university, navigate Student Finance England funding, and plan their next career move — with a completely free initial consultation and no obligation.",
      },
    },
    {
      "@type": "Question",
      name: "Do I qualify for Student Finance England postgraduate funding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A lot of people are surprised to find they qualify. If you are a UK resident looking to study a postgraduate Master's degree, there is a good chance Student Finance England can help. We check your eligibility for free and walk you through every step.",
      },
    },
    {
      "@type": "Question",
      name: "Is the initial consultation really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — genuinely free, no strings attached. We sit down with you, understand your situation, and give you honest advice. We only move forward if it makes sense for you.",
      },
    },
    {
      "@type": "Question",
      name: "How long does the university admissions process take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most of our students receive conditional offers within 2–4 weeks. We handle the application from start to finish so you are not left guessing what to do next.",
      },
    },
    {
      "@type": "Question",
      name: "What does MCKI Solutions' career guidance cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We look at where you are now, where you want to be, and which postgraduate programme gives you the most direct route there. You get a personalised recommendation — not a generic list.",
      },
    },
  ],
};

export const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MCKI Solutions",
  url: "https://mckisolutions.com",
  logo: "https://mckisolutions.com/logo.jpg",
  description:
    "MCKI Solutions is a postgraduate education consultancy in the Midlands, UK. We help people get into university, access Student Finance England funding, and move their careers forward — with free, honest, personal guidance.",
  address: {
    "@type": "PostalAddress",
    addressRegion: "West Midlands",
    addressCountry: "GB",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+44-7889-417914",
    contactType: "Customer Service",
    areaServed: "GB",
    availableLanguage: "English",
  },
  sameAs: [
    "http://facebook.com/profile.php?id=61586948383844",
    "https://linkedin.com/company/mcki-solutions",
  ],
};

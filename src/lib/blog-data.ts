export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;        // ISO
  displayDate: string;
  author: string;
  category: string;
  readTime: string;
  featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-is-agentic-ai",
    title: "What Is Agentic AI — And Why It Matters for Your Career in 2026",
    excerpt:
      "Agentic AI isn't just another chatbot. It's a new class of autonomous systems that can plan, act, and adapt. Here's what you need to know — and why it's not as complicated as it sounds.",
    date: "2026-04-10",
    displayDate: "10 April 2026",
    author: "Rume Dominic",
    category: "AI & Technology",
    readTime: "5 min read",
    featured: true,
  },
  {
    slug: "postgraduate-funding-guide-2026",
    title: "The Complete Guide to Student Finance England for Postgraduate Students",
    excerpt:
      "Many UK residents don't realise they qualify for a government-backed postgraduate loan of up to £12,167. This guide explains who qualifies, how to apply, and what to expect.",
    date: "2026-03-22",
    displayDate: "22 March 2026",
    author: "Shofiqul Haque",
    category: "Education Funding",
    readTime: "8 min read",
    featured: true,
  },
  {
    slug: "studying-in-the-uk-as-an-international-student",
    title: "Studying in the UK as an International Student: What Nobody Tells You",
    excerpt:
      "From Tier 4 visas to the reality of finding accommodation on a student budget, here's the unfiltered guide to navigating UK higher education as an international student.",
    date: "2026-03-05",
    displayDate: "5 March 2026",
    author: "Shofiqul Haque",
    category: "International Students",
    readTime: "6 min read",
  },
  {
    slug: "ai-skills-employers-want-2026",
    title: "The 5 AI Skills Employers Are Paying a Premium for in 2026",
    excerpt:
      "Prompt engineering is table stakes. Here are the skills that are actually getting people hired — and the funded training routes to get them.",
    date: "2026-02-28",
    displayDate: "28 February 2026",
    author: "Rume Dominic",
    category: "AI & Technology",
    readTime: "4 min read",
  },
  {
    slug: "choosing-the-right-masters-degree",
    title: "How to Choose the Right Master's Degree When You're Not Sure What You Want",
    excerpt:
      "Picking a postgraduate programme without a clear career goal feels impossible. This framework helps you cut through the noise and make a decision you won't regret.",
    date: "2026-02-10",
    displayDate: "10 February 2026",
    author: "Shofiqul Haque",
    category: "Career Guidance",
    readTime: "7 min read",
  },
  {
    slug: "government-funded-ai-training",
    title: "How to Get Government-Funded AI Training in 2026",
    excerpt:
      "Skills Bootcamps, Apprenticeship Levy, and postgraduate loans — there are more routes to funded AI education than most people realise. Here's the breakdown.",
    date: "2026-01-20",
    displayDate: "20 January 2026",
    author: "Rume Dominic",
    category: "Education Funding",
    readTime: "5 min read",
  },
];

export const CATEGORIES = [
  "All",
  "AI & Technology",
  "Education Funding",
  "International Students",
  "Career Guidance",
];

export function getFeaturedPosts(): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.featured);
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (category === "All") return BLOG_POSTS;
  return BLOG_POSTS.filter((p) => p.category === category);
}

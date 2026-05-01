import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, User, Tag } from "lucide-react";
import { BLOG_POSTS, CATEGORIES, getFeaturedPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog | MCKI Solutions",
  description:
    "Insights on AI, postgraduate education, student funding, and career development from the MCKI Solutions team.",
  alternates: { canonical: "https://mckisolutions.com/blog" },
};

const categoryColours: Record<string, string> = {
  "AI & Technology":      "bg-purple-100 text-purple-700",
  "Education Funding":    "bg-blue-100 text-blue-700",
  "International Students": "bg-emerald-100 text-emerald-700",
  "Career Guidance":      "bg-amber-100 text-amber-700",
};

function CategoryBadge({ category }: { category: string }) {
  const colour = categoryColours[category] ?? "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${colour}`}>
      <Tag size={10} />
      {category}
    </span>
  );
}

function PostCard({ post, featured = false }: { post: (typeof BLOG_POSTS)[0]; featured?: boolean }) {
  return (
    <article
      className={`bg-white rounded-3xl border border-brand-border shadow-card p-7 flex flex-col gap-4 hover:shadow-md transition-shadow ${
        featured ? "lg:col-span-1" : ""
      }`}
    >
      <div className="flex items-center gap-2 flex-wrap">
        <CategoryBadge category={post.category} />
        {post.featured && (
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gold-300/20 text-navy-500 border border-gold-300/30">
            Featured
          </span>
        )}
      </div>

      <div className="flex-1">
        <h2 className={`font-heading font-bold text-navy-500 leading-snug mb-3 ${featured ? "text-xl" : "text-lg"}`}>
          {post.title}
        </h2>
        <p className="text-brand-muted text-sm leading-relaxed">{post.excerpt}</p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-brand-border">
        <div className="flex items-center gap-3 text-xs text-brand-muted">
          <span className="flex items-center gap-1">
            <User size={11} /> {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} /> {post.readTime}
          </span>
          <span>{post.displayDate}</span>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-navy-500 hover:underline"
        >
          Read <ArrowRight size={12} />
        </Link>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const featured = getFeaturedPosts();
  const rest = BLOG_POSTS.filter((p) => !p.featured);

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.04] dot-grid" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-2xl">
            <p className="section-label text-gold-300 mb-3">Insights & Guides</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-4">
              The MCKI Blog
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Practical guides on AI, postgraduate education, government funding, and building
              a career that works for you — from the MCKI Solutions team.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className="px-4 py-1.5 rounded-full border border-brand-border text-sm font-medium
                           text-brand-muted hover:bg-navy-50 hover:text-navy-500 cursor-pointer transition-colors"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured posts */}
      {featured.length > 0 && (
        <section className="section-full section-alt">
          <div className="section">
            <p className="section-label mb-6">Featured</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map((post) => (
                <PostCard key={post.slug} post={post} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All posts */}
      <section className="section-full bg-white">
        <div className="section">
          <p className="section-label mb-6">All Articles</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-full bg-navy-gradient text-white">
        <div className="section">
          <div className="max-w-xl mx-auto text-center">
            <p className="section-label text-gold-300 mx-auto">Stay in the loop</p>
            <h2 className="font-heading font-bold text-3xl mb-4">
              Get our latest guides straight to your inbox
            </h2>
            <div className="gold-bar mx-auto mb-6" />
            <p className="text-white/80 mb-8">
              No spam. Just practical articles on AI, education funding, and career moves — a few times a month.
            </p>
            <Link href="/#book-consultation" className="btn-primary text-base">
              Book a Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

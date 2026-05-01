import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mckisolutions.co.uk";
  const now = new Date();

  return [
    { url: base,                          lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/local-ed`,            lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/international-ed`,    lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/business`,            lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/blog`,                lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/events`,              lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/trading-lab`,         lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy`,             lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/terms`,               lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];
}

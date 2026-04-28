import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { ORG_SCHEMA, FAQ_SCHEMA } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default:  "MCKI Solutions | UK Postgraduate Education Consultancy & Funding Guidance",
    template: "%s | MCKI Solutions",
  },
  description:
    "MCKI Solutions is the UK's leading postgraduate education consultancy. We help you access university admissions, Student Finance England funding, and AI-powered career planning — free consultation available.",
  keywords: [
    "postgraduate education consultancy UK",
    "Student Finance England guidance",
    "university admissions support UK",
    "master's degree funding UK",
    "AI career planning tool",
    "education consultant London",
    "postgraduate funding navigator",
    "MCKI Solutions",
    "postgraduate admissions UK",
    "SFE postgraduate loan",
  ],
  metadataBase: new URL("https://mckisolutions.com"),
  openGraph: {
    title:       "MCKI Solutions | UK Postgraduate Education Consultancy",
    description: "Free consultation. Expert guidance on university admissions, government funding, and AI-powered career planning for UK postgraduate students.",
    url:         "https://mckisolutions.com",
    siteName:    "MCKI Solutions",
    locale:      "en_GB",
    type:        "website",
    images: [{ url: "https://mckisolutions.com/logo.jpg", width: 1200, height: 630, alt: "MCKI Solutions" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "MCKI Solutions | UK Postgraduate Education Consultancy",
    description: "Free consultation. Expert guidance on university admissions, government funding & AI career planning.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://mckisolutions.com" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`scroll-smooth ${inter.variable}`}>
      <head>
        {/* Eliminate render-blocking third-party connections */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
        />
      </head>
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}

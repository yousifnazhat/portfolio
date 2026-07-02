import type { Metadata } from "next";
import { JetBrains_Mono, Space_Mono } from "next/font/google";
import "./globals.css";
import EasterEgg from "../components/EasterEgg";

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const spaceMono = Space_Mono({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const SITE_URL = "https://yousifsportfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yousif Nazhat — Offensive Security Engineer",
    template: "%s — Yousif Nazhat",
  },
  description:
    "Yousif Nazhat — offensive-security engineer who designs. Security tooling, red-team work, and high-reliability hardware.",
  applicationName: "Yousif Nazhat — Portfolio",
  authors: [{ name: "Yousif Nazhat", url: SITE_URL }],
  creator: "Yousif Nazhat",
  keywords: [
    "Yousif Nazhat",
    "offensive security",
    "red team",
    "penetration testing",
    "security engineer",
    "detection engineering",
    "security tooling",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Yousif Nazhat — Offensive Security Engineer",
    description:
      "Offensive-security engineer who designs — red team, security tooling, and a little hardware.",
    url: SITE_URL,
    siteName: "Yousif Nazhat",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yousif Nazhat — Offensive Security Engineer",
    description:
      "Offensive-security engineer who designs — red team, security tooling, and a little hardware.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yousif Nazhat",
  url: SITE_URL,
  jobTitle: "Offensive Security Engineer",
  email: "mailto:yousif.snazhat@gmail.com",
  sameAs: [
    "https://github.com/yousifnazhat",
    "https://www.linkedin.com/in/yousif-nazhat-526027296",
  ],
  alumniOf: { "@type": "CollegeOrUniversity", name: "Rutgers University" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "New Brunswick",
    addressRegion: "NJ",
    addressCountry: "US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrains.variable} ${spaceMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <EasterEgg />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Yousif Nazhat — Offensive Security Engineer",
  description:
    "A working museum of systems built and systems broken. Offensive security, security tooling, and high-reliability hardware by Yousif Nazhat.",
  openGraph: {
    title: "Yousif Nazhat — Offensive Security Engineer",
    description: "Maker of tools, breaker of trust boundaries.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cinzel.variable} ${cormorant.variable} ${plexMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

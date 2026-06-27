import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono, Allura } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const allura = Allura({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Yousif Nazhat — Offensive Security Engineer",
  description:
    "A working museum of systems built and systems broken — red-team tradecraft, security tooling, and high-reliability hardware by Yousif Nazhat.",
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
      <body className={`${cormorant.variable} ${jetbrains.variable} ${allura.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

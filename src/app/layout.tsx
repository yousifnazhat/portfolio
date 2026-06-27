import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono, Allura } from "next/font/google";
import "./globals.css";
import EasterEgg from "../components/EasterEgg";

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
    "Yousif Nazhat — offensive-security engineer who designs. Security tooling, red-team work, and high-reliability hardware.",
  openGraph: {
    title: "Yousif Nazhat — Offensive Security Engineer",
    description: "Offensive-security engineer who designs — red team, security tooling, and a little hardware.",
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
        <EasterEgg />
      </body>
    </html>
  );
}

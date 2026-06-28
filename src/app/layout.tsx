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
      <body className={`${jetbrains.variable} ${spaceMono.variable} antialiased`}>
        {children}
        <EasterEgg />
      </body>
    </html>
  );
}

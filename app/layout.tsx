import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "@/components/SessionProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const baseUrl = process.env.NEXTAUTH_URL || "https://saascompare.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "SaaS Compare Pro - The #1 Software Comparison Platform",
    template: "%s | SaaS Compare Pro"
  },
  description: "Compare and discover the best SaaS tools for your business. Objective reviews, technical comparisons, and pricing analysis to help you build the perfect tech stack.",
  keywords: ["SaaS reviews", "software comparison", "business tools", "SaaS tools", "software reviews"],
  authors: [{ name: "SaaS Compare Pro Team" }],
  creator: "SaaS Compare Pro",
  publisher: "SaaS Compare Pro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    "google-adsense-account": "ca-pub-7245366364935377",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "SaaS Compare Pro",
    title: "SaaS Compare Pro - Find the Best SaaS Tools",
    description: "Objective reviews and side-by-side technical comparisons of thousands of software solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Compare Pro - Find the Best SaaS Tools",
    description: "Compare software solutions with confidence. We analyze thousands of tools so you don't have to.",
    creator: "@saascomparepro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Provider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Provider>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7245366364935377"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

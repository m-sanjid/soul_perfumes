import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import { siteConfig } from "@/lib/site-config";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.brand.name} - ${siteConfig.brand.tagline}`,
    template: `%s | ${siteConfig.brand.name}`,
  },
  description: siteConfig.brand.description,
  keywords: [
    "luxury perfume",
    "fragrance",
    "parfum",
    "soul",
    "premium scents",
    "designer perfume",
    "exclusive fragrances",
  ],
  authors: [{ name: siteConfig.brand.name }],
  creator: siteConfig.brand.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://soulparfum.com",
    title: `${siteConfig.brand.name} - ${siteConfig.brand.tagline}`,
    description: siteConfig.brand.description,
    siteName: siteConfig.brand.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.brand.name} - ${siteConfig.brand.tagline}`,
    description: siteConfig.brand.description,
    creator: "@soulparfum",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

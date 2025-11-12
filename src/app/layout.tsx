import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackgroundFX from "../components/BackgroundFX";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Datisyn | Transform Data Into Actionable Intelligence",
  description: "Enterprise data orchestration platform that turns complex data challenges into competitive advantages. Connect disparate systems, normalize data flows, and orchestrate insights with AI-powered automation.",
  keywords: "data orchestration, enterprise data platform, data integration, AI-powered analytics, real-time data processing, data transformation, business intelligence",
  authors: [{ name: "Datisyn Team" }],
  creator: "Datisyn",
  publisher: "Datisyn",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://datisyn.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Datisyn | Transform Data Into Actionable Intelligence",
    description: "Enterprise data orchestration platform that turns complex data challenges into competitive advantages. Connect disparate systems, normalize data flows, and orchestrate insights with AI-powered automation.",
    url: "https://datisyn.com/",
    siteName: "Datisyn",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Datisyn - Enterprise Data Orchestration Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Datisyn | Transform Data Into Actionable Intelligence",
    description: "Enterprise data orchestration platform that turns complex data challenges into competitive advantages.",
    creator: "@datisyn",
    images: ["/twitter-image.jpg"],
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-[var(--background)] text-[var(--foreground)]`}>
        <BackgroundFX />
        <Navbar />
        <main className="pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

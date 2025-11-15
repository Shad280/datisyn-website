import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
      <head>
        {/* Google Analytics - replace G-XXXXXXXXXX with your Measurement ID */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-XXXXXXXXXX');`}
        </Script>

        {/* JSON-LD Organization structured data for SEO */}
        <Script id="json-ld" type="application/ld+json" strategy="afterInteractive">
          {`{
            "@context": "http://schema.org",
            "@type": "Organization",
            "name": "Datisyn",
            "url": "https://datisyn.com",
            "logo": "https://datisyn.com/logo.png",
            "description": "AI-Powered Data Orchestration Platform",
            "contactPoint": [{
              "@type": "ContactPoint",
              "email": "info@datisyn.com",
              "contactType": "sales"
            }]
          }`}
        </Script>
      </head>
      <body className={`${inter.className} antialiased bg-[var(--background)] text-[var(--foreground)]`}>
        <BackgroundFX />
        <Navbar />
        <main className="pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

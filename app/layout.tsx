import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.tomasregner.cz";
const title = "Tomáš Regner — UX Designer & E-commerce konzultant";
const description =
  "Tomáš Regner, UX designér, UX architekt a e-commerce konzultant s 17+ lety zkušeností. Kontakty a profesní profil.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Tomáš Regner",
  },
  description,
  keywords: [
    "Tomáš Regner",
    "UX designer",
    "UX architekt",
    "e-commerce konzultant",
    "projekt manager",
    "UX design",
    "UX konzultace",
  ],
  authors: [{ name: "Tomáš Regner", url: siteUrl }],
  creator: "Tomáš Regner",
  publisher: "Tomáš Regner",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    firstName: "Tomáš",
    lastName: "Regner",
    locale: "cs_CZ",
    url: siteUrl,
    siteName: "Tomáš Regner",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tomáš Regner",
  jobTitle: ["UX Designer", "UX architekt", "E-commerce konzultant", "Projekt manager"],
  description:
    "UX designér, UX architekt a e-commerce konzultant s 17+ lety zkušeností v UX designu.",
  url: siteUrl,
  image: `${siteUrl}/tomas-regner.png`,
  email: "info@tomasregner.cz",
  telephone: "+420739418088",
  sameAs: ["https://www.linkedin.com/in/tomas-regner/"],
  knowsAbout: ["UX design", "UX architektura", "E-commerce", "Projektové řízení"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

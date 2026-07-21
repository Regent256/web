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
  "Tomáš Regner — UX designér, UX architekt a e-commerce konzultant s 17+ lety zkušeností. Web obsahuje kontakt, LinkedIn profil a přehled profesního zaměření.";

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
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

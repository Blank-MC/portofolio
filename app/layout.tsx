import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rezya Indy Saputra — Web Developer",
  description:
    "Portofolio Rezya Indy Saputra — web developer dan mahasiswa Cybersecurity di Binus University yang membangun pengalaman digital yang cepat, interaktif, dan berkarakter.",
  keywords: [
    "Rezya Indy Saputra",
    "Web Developer",
    "Cybersecurity",
    "Binus University",
    "Portofolio",
    "Next.js",
    "React",
    "Frontend Developer",
  ],
  authors: [{ name: "Rezya Indy Saputra" }],
  openGraph: {
    title: "Rezya Indy Saputra — Web Developer",
    description:
      "Portofolio proyek, sertifikat, dan pengalaman Rezya Indy Saputra — web developer & mahasiswa cybersecurity.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={`${jakarta.variable} ${instrument.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

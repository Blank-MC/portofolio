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
  title: "Rezya Indy Saputra | Full Stack Developer",
  description:
    "Portfolio of Rezya Indy Saputra, a full stack developer and Cybersecurity student at Binus University building web applications from interface to server.",
  keywords: [
    "Rezya Indy Saputra",
    "Full Stack Developer",
    "Backend Developer",
    "Cybersecurity",
    "Binus University",
    "Portfolio",
    "Next.js",
    "React",
    "Laravel",
    "PHP",
  ],
  authors: [{ name: "Rezya Indy Saputra" }],
  openGraph: {
    title: "Rezya Indy Saputra | Full Stack Developer",
    description:
      "Projects, certificates, and experience of Rezya Indy Saputra, full stack developer and cybersecurity student.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} ${instrument.variable}`}>
      <body className="antialiased">
        {children}
        <div
          aria-hidden="true"
          className="noise-overlay pointer-events-none fixed inset-0 z-50 select-none opacity-[0.03]"
        />
      </body>
    </html>
  );
}

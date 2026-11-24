"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import OpenSource from "./components/sections/OpenSource";
import Experience from "./components/sections/Experience";
import Certificates from "./components/sections/Certificates";
import Contact from "./components/sections/Contact";
import { BackToTop, ModeToggle, ScrollProgress } from "./components/ui/Effects";
import {
  ExperienceProvider,
  useExperience,
} from "./components/providers/ExperienceProvider";
import { LocaleProvider } from "./lib/i18n";

function Portfolio() {
  const { mode } = useExperience();

  useEffect(() => {
    if (mode !== "full") return;
    const lenis = new Lenis({
      duration: 0.9,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      anchors: true,
    });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };
    frame = window.requestAnimationFrame(raf);
    (
      window as Window & {
        __lenis?: { scrollTo: (target: number, options?: { duration?: number }) => void };
      }
    ).__lenis = lenis;
    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
      delete (
        window as Window & {
          __lenis?: { scrollTo: (target: number, options?: { duration?: number }) => void };
        }
      ).__lenis;
    };
  }, [mode]);

  return (
    <MotionConfig reducedMotion={mode === "performance" ? "always" : "never"}>
      <div className="relative min-h-screen bg-ink text-ivory">
        <ScrollProgress />
        <Navbar />

        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <OpenSource />
          <Experience />
          <Certificates />
          <Contact />
        </main>

        <Footer />
        <ModeToggle />
        <BackToTop />
      </div>
    </MotionConfig>
  );
}

export default function Home() {
  return (
    <LocaleProvider>
      <ExperienceProvider>
        <Portfolio />
      </ExperienceProvider>
    </LocaleProvider>
  );
}

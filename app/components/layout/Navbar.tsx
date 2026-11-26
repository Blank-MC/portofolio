"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaBars, FaDownload, FaTimes } from "react-icons/fa";
import { contactVisibility, profile } from "../../data/portfolio";
import { useExperience } from "../providers/ExperienceProvider";
import { useLocale } from "../../lib/i18n";
import { L } from "../../lib/locale";

const links = [
  { id: "about", label: L("About", "About") },
  { id: "skills", label: L("Skills", "Skills") },
  { id: "projects", label: L("Projects", "Projects") },
  { id: "opensource", label: L("GitHub", "GitHub") },
  { id: "experience", label: L("Journey", "Journey") },
  { id: "certificates", label: L("Certificates", "Certificates") },
  { id: "contact", label: L("Contact", "Contact") },
];

function LanguageSwitch({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLocale();
  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center rounded-full border border-gold/20 p-0.5"
    >
      {(["id", "en"] as const).map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => setLocale(value)}
          aria-pressed={locale === value}
          className={`relative rounded-full px-2.5 py-1 text-[10px] font-bold uppercase transition-colors ${
            locale === value ? "text-[#0a0e14]" : "text-muted hover:text-ivory"
          }`}
        >
          {locale === value && (
            <motion.span
              layoutId={compact ? "lang-pill-mobile" : "lang-pill"}
              className="absolute inset-0 rounded-full bg-gold"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
          )}
          <span className="relative">{value}</span>
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const { isFull } = useExperience();
  const { t } = useLocale();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    ["home", ...links.map((link) => link.id)].forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${
        scrolled
          ? "border-b border-gold/10 bg-[#070a0f]/85 py-3 backdrop-blur-xl"
          : "border-b border-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#home" className="group flex items-center gap-3" aria-label="Rezya.dev">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/40 bg-gold/5 font-display text-lg text-gold transition group-hover:bg-gold group-hover:text-[#0a0e14]">
            RA
          </span>
          <span className="text-sm font-bold tracking-tight text-ivory sm:text-base">
            rezya<span className="text-teal">.</span>dev
          </span>
        </a>

        <div className="hidden items-center gap-1 xl:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors ${
                active === link.id ? "text-gold-soft" : "text-muted hover:text-ivory"
              }`}
            >
              {active === link.id && (
                <motion.span
                  layoutId={isFull ? "nav-active" : undefined}
                  className="absolute inset-0 rounded-full border border-teal/25 bg-teal/5"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{t(link.label)}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageSwitch />
          </div>
          {contactVisibility.showCv && (
            <a
              href={profile.cv}
              download
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-xs font-bold text-gold transition hover:bg-gold hover:text-[#0a0e14] xl:flex"
            >
              <FaDownload /> CV
            </a>
          )}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 text-gold xl:hidden"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden border-t border-gold/10 bg-[#070a0f]/97 xl:hidden"
          >
            <div className="flex flex-col px-6 py-5">
              {links.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="border-b border-gold/5 py-3 text-sm text-ivory/80"
                >
                  <span className="mr-3 font-mono text-[10px] text-gold">
                    0{index + 1}
                  </span>
                  {t(link.label)}
                </motion.a>
              ))}
              <div className="mt-5 flex items-center justify-between gap-3">
                <LanguageSwitch compact />
                {contactVisibility.showCv && (
                  <a
                    href={profile.cv}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-xs font-bold text-[#0a0e14]"
                  >
                    <FaDownload />
                    {t(L("Unduh CV", "Download CV"))}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

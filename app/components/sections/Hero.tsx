"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { FaArrowDown, FaGithub, FaInstagram, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import RotatingText from "../RotatingText/RotatingText";
import { Magnetic, Reveal, StatCounter } from "../ui/Primitives";
import { contactVisibility, profile, stats } from "../../data/portfolio";
import { useExperience } from "../providers/ExperienceProvider";
import { useLocale } from "../../lib/i18n";
import { L } from "../../lib/locale";

const Lanyard = dynamic(() => import("../Lanyard/Lanyard"), {
  ssr: false,
  loading: () => <StaticIdCard />,
});

const copy = {
  badge: L("Open to collaboration", "Open to collaboration"),
  intro: L("Saya adalah", "I'm a"),
  roles: [
    L("Web Developer", "Web Developer"),
    L("Frontend Developer", "Frontend Developer"),
    L("Fullstack Developer", "Fullstack Developer"),
    L("Creative Coder", "Creative Coder"),
  ],
  view: L("Lihat Proyek", "View Projects"),
  cv: L("Unduh CV", "Download CV"),
  scroll: L("Scroll", "Scroll"),
  scrollDown: L("Scroll ke bawah", "Scroll down"),
  find: L("FIND ME", "FIND ME"),
};

function StaticIdCard() {
  return (
    <div className="relative flex h-[420px] w-[260px] items-center justify-center sm:h-[480px] sm:w-[300px]">
      <div className="absolute inset-8 rounded-[2rem] border border-gold/10" />
      <div className="absolute inset-2 rounded-[2rem] border border-dashed border-gold/10" />
      <div className="glass relative flex h-[380px] w-full max-w-[270px] rotate-[-4deg] flex-col justify-between overflow-hidden rounded-3xl p-6 shadow-2xl shadow-black/50">
        <div className="flex items-start justify-between">
          <span className="font-display text-3xl text-gold">RA</span>
          <span className="h-8 w-8 rounded-full border border-gold/40" />
        </div>
        <div>
          <div className="mb-5 h-28 w-28 rounded-full bg-gradient-to-br from-gold/40 via-gold/10 to-transparent p-[1px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0b1018] font-display text-5xl text-gold-soft">
              R
            </div>
          </div>
          <p className="font-display text-3xl leading-none text-ivory">Rezya</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-gold">
            Web Developer
          </p>
        </div>
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <span className="block h-px w-16 bg-gold/50" />
            <span className="block h-px w-10 bg-gold/30" />
            <span className="block h-px w-20 bg-gold/20" />
          </div>
          <span className="font-mono text-[9px] text-muted">2026 / RA-01</span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { isFull, ready } = useExperience();
  const { t } = useLocale();
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 700], [0, -80]);

  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      <div aria-hidden="true" className="fx-only pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute left-[12%] top-[18%] h-[420px] w-[420px] rounded-full bg-gold/10 blur-[130px]" />
        <div className="absolute bottom-[8%] right-[10%] h-[360px] w-[360px] rounded-full bg-teal/10 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div style={isFull ? { y: parallax } : undefined}>
            <Reveal>
              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                <span className="h-px w-10 bg-gold/60" />
                Portfolio / {new Date().getFullYear()}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-teal/25 bg-teal/5 px-3.5 py-1.5 text-[11px] font-medium text-teal">
                <span className="fx-only relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
                </span>
                {t(copy.badge)}
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <h1 className="mt-6 font-display text-[4.5rem] leading-[0.88] text-ivory sm:text-7xl lg:text-[6.5rem]">
                Rezya
                <span className="text-gold">.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-2 text-lg font-medium text-ivory/70 sm:text-xl">
                {t(copy.intro)}{" "}
                <RotatingText
                  texts={copy.roles.map(t)}
                  mainClassName="inline-flex px-3 py-1.5 rounded-xl border border-gold/30 bg-gold/5 text-gold-soft text-lg sm:text-xl font-semibold"
                  rotationInterval={2400}
                  staggerDuration={0.022}
                  staggerFrom="first"
                  transition={{ type: "spring", damping: 26, stiffness: 320 }}
                />
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <p className="mt-7 max-w-xl text-base leading-8 text-muted">
                {t(profile.bio)}
              </p>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <a
                    href="#projects"
                    className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gold-soft to-gold px-7 py-3.5 text-sm font-bold text-[#0a0e14] transition hover:shadow-lg hover:shadow-gold/20"
                  >
                    {t(copy.view)}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </Magnetic>
                {contactVisibility.showCv && (
                  <Magnetic>
                    <a
                      href={profile.cv}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-7 py-3.5 text-sm font-bold text-gold transition hover:bg-gold/10"
                    >
                      {t(copy.cv)}
                    </a>
                  </Magnetic>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.38}>
              <div className="mt-9 flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-[0.25em] text-muted">
                  {t(copy.find)}
                </span>
                <span className="h-px w-10 bg-gold/20" />
                {[
                  { href: profile.github, icon: FaGithub, label: "GitHub" },
                  { href: profile.instagram, icon: FaInstagram, label: "Instagram" },
                  ...(contactVisibility.showWhatsapp
                    ? [{ href: profile.whatsapp, icon: FaWhatsapp, label: "WhatsApp" }]
                    : []),
                  ...(contactVisibility.showEmail
                    ? [{ href: `mailto:${profile.email}`, icon: FaEnvelope, label: "Email" }]
                    : []),
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    title={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/15 text-muted transition hover:border-gold/50 hover:text-gold"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </Reveal>
          </motion.div>

          <div className="relative flex h-[460px] items-center justify-center sm:h-[540px] lg:h-[600px]">
            <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
              <div className="h-[300px] w-[300px] rounded-full border border-gold/10 sm:h-[380px] sm:w-[380px]" />
              <div className="absolute h-[240px] w-[240px] rounded-full border border-dashed border-gold/10 sm:h-[310px] sm:w-[310px]" />
            </div>
            {isFull && ready ? (
              <Lanyard
                frontImage="/card-front.png"
                backImage="/card-back.png"
                strapImage="/band.png"
                imageFit="cover"
                cardColor="#ffffff"
                orientation="portrait"
                finish="glossy"
                cornerRadius={0.3}
                size={0.6}
                anchor="center"
                strapLength={0.5}
                strapColor="#111111"
                strapWidth={0.65}
                metal="silver"
                gravity={1}
                damping={0.5}
                elasticity={0.5}
                breeze={0.5}
                interactive
                intro
              />
            ) : (
              <StaticIdCard />
            )}
          </div>
        </div>

        <Reveal delay={0.45}>
          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-gold/10 pt-8 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label.id}>
                <p className="font-display text-4xl text-gold-soft sm:text-5xl">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted sm:text-xs">
                  {t(stat.label)}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <motion.a
        href="#about"
        aria-label={t(copy.scrollDown)}
        className="fx-only absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-gold/60 md:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[9px] tracking-[0.3em] uppercase">{t(copy.scroll)}</span>
        <FaArrowDown className="text-xs" />
      </motion.a>
    </section>
  );
}

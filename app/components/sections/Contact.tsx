"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  FaCheck,
  FaCopy,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import SectionHeading from "../ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../ui/Primitives";
import { contactVisibility, profile } from "../../data/portfolio";
import { useExperience } from "../providers/ExperienceProvider";
import { useLocale } from "../../lib/i18n";
import { L } from "../../lib/locale";

const copy = {
  eyebrow: L("Hubungi Saya", "Get In Touch"),
  title: L("Yuk bikin sesuatu yang hebat.", "Let's make something great."),
  description: L(
    "Punya ide, proyek, atau sekadar mau ngobrol soal web? Saya dengan senang hati mendengarnya.",
    "Have an idea, a project, or just want to talk about the web? I'd love to hear it."
  ),
  email: L("Email", "Email"),
  copyEmail: L("Salin alamat email", "Copy email address"),
  copied: L("Email berhasil disalin!", "Email copied to clipboard!"),
  whatsapp: L("WhatsApp", "WhatsApp"),
  instagram: L("Instagram", "Instagram"),
  cv: L("Unduh CV lengkap ↗", "Download full CV ↗"),
};

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const { isFull } = useExperience();
  const { t } = useLocale();

  const copyEmail = async () => {
    if (!contactVisibility.showEmail) return;
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const channels = [
    contactVisibility.showEmail
      ? { label: t(copy.email), value: profile.email, href: `mailto:${profile.email}`, icon: FaEnvelope }
      : { label: t(copy.email), value: contactVisibility.placeholder, href: undefined, icon: FaEnvelope },
    contactVisibility.showWhatsapp
      ? { label: t(copy.whatsapp), value: profile.phone, href: profile.whatsapp, icon: FaWhatsapp }
      : { label: t(copy.whatsapp), value: contactVisibility.placeholder, href: undefined, icon: FaWhatsapp },
    { label: t(copy.instagram), value: `@${profile.handle}`, href: profile.instagram, icon: FaInstagram },
    { label: "GitHub", value: "Blank-MC", href: profile.github, icon: FaGithub },
  ];

  return (
    <section id="contact" className="relative overflow-hidden border-t border-border-subtle py-24 sm:py-36">
      {/* Static lattice stays visible in Performance mode. */}
      <div aria-hidden="true" className="arch-grid pointer-events-none absolute inset-0 select-none" />
      <div aria-hidden="true" className="fx-only pointer-events-none absolute inset-0 select-none">
        <div className="absolute left-1/2 top-[16%] h-[300px] w-[min(900px,100%)] -translate-x-1/2">
          <div className="ambient-drift h-full w-full rounded-[50%] bg-gold/[0.08] blur-3xl" />
        </div>
        <div className="absolute left-1/2 top-[22%] h-[280px] w-[min(820px,100%)] -translate-x-1/2">
          <div className="ambient-drift h-full w-full rounded-[50%] bg-teal-deep/[0.08] blur-3xl" />
        </div>
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/5" />
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border-subtle" />
      </div>
      <div aria-hidden="true" className="pointer-events-none select-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.06] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
        <SectionHeading
          index="07"
          eyebrow={t(copy.eyebrow)}
          title={t(copy.title)}
          description={t(copy.description)}
          align="center"
        />

        <Reveal delay={0.12}>
          <div className="mt-12 inline-flex max-w-full items-center gap-3 rounded-full border border-border-subtle bg-surface px-4 py-2.5 sm:px-5">
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:inline">
              {t(copy.email)}
            </span>
            <span className="truncate text-sm text-foreground">
              {contactVisibility.showEmail ? profile.email : contactVisibility.placeholder}
            </span>
            {contactVisibility.showEmail && (
              <button
                type="button"
                onClick={copyEmail}
                aria-label={t(copy.copyEmail)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-obsidian transition hover:bg-gold-hover"
              >
                {copied ? <FaCheck /> : <FaCopy />}
              </button>
            )}
          </div>
          {copied && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-xs text-teal"
            >
              {t(copy.copied)}
            </motion.p>
          )}
        </Reveal>

        <Stagger className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4" step={0.1}>
          {channels.map(({ label, value, href, icon: Icon }) => {
            const content = (
              <>
                <Icon className="text-xl text-teal transition group-hover:scale-110" />
                <span className="text-xs font-semibold text-foreground">{label}</span>
                <span className="max-w-full truncate text-[11px] text-muted">{value}</span>
              </>
            );
            return (
              <StaggerItem key={label}>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group glass flex h-full flex-col items-center gap-3 rounded-2xl px-5 py-6 transition hover:border-teal/50 hover:shadow-teal-glow"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="group glass flex h-full flex-col items-center gap-3 rounded-2xl px-5 py-6">
                    {content}
                  </div>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>

        {contactVisibility.showCv && isFull && (
          <Reveal delay={0.2}>
            <a
              href={profile.cv}
              download
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal/80 underline decoration-teal/30 underline-offset-8 transition hover:text-teal"
            >
              {t(copy.cv)}
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}

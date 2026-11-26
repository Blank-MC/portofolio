"use client";

import { FaBriefcase, FaCode, FaGamepad, FaGraduationCap } from "react-icons/fa";
import SectionHeading from "../ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../ui/Primitives";
import { experience } from "../../data/portfolio";
import { useLocale } from "../../lib/i18n";
import { L } from "../../lib/locale";

const copy = {
  eyebrow: L("Perjalanan", "Journey"),
  title: L("Perjalanan sejauh ini.", "The road so far."),
  description: L(
    "Dari SMK, magang, freelance, sampai kuliah, langkah yang perlahan membentuk cara saya bekerja hari ini.",
    "From vocational school and internship to freelancing and university, small steps that gradually shaped the way I work today."
  ),
};

const icons = {
  education: FaGraduationCap,
  code: FaCode,
  briefcase: FaBriefcase,
  game: FaGamepad,
};

export default function Experience() {
  const { t } = useLocale();
  return (
    <section id="experience" className="relative border-t border-border-subtle py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          index="04"
          eyebrow={t(copy.eyebrow)}
          title={t(copy.title)}
          description={t(copy.description)}
          align="center"
        />

        <Stagger className="relative mt-16 space-y-4" step={0.12}>
          <div aria-hidden="true" className="pointer-events-none select-none absolute bottom-8 left-8 top-8 w-px bg-border-subtle sm:bottom-11 sm:left-11 sm:top-11" />
          {experience.map((item, index) => {
            const Icon = icons[item.icon];
            const isLatest = index === 0;
            return (
              <StaggerItem key={item.title}>
                <Reveal>
                  <div className="group relative flex gap-5 rounded-2xl border border-transparent p-3 transition hover:border-border-subtle hover:bg-gold/[0.02] sm:gap-7 sm:p-5">
                    <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-surface text-gold transition sm:h-12 sm:w-12 ${
                      isLatest
                        ? "border-teal/40 text-teal ring-2 ring-teal/20 shadow-[0_0_18px_rgba(45,212,191,0.16)]"
                        : "border-gold/30 group-hover:bg-gold group-hover:text-obsidian"
                    }`}>
                      <Icon />
                    </div>
                    <div className="flex-1 border-b border-border-subtle pb-5 last:border-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold/70">
                        {t(item.period)}
                      </p>
                      <h3 className="mt-2 font-display text-2xl text-foreground sm:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs font-medium text-gold/80 sm:text-sm">
                        {t(item.subtitle)}
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                        {t(item.description)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

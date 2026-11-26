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
    <section id="experience" className="relative border-t border-gold/10 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          index="04"
          eyebrow={t(copy.eyebrow)}
          title={t(copy.title)}
          description={t(copy.description)}
          align="center"
        />

        <Stagger className="relative mt-16 space-y-4" step={0.12}>
          <div aria-hidden="true" className="absolute bottom-8 left-8 top-8 w-px bg-gradient-to-b from-teal/70 via-gold/25 to-transparent sm:bottom-11 sm:left-11 sm:top-11" />
          {experience.map((item) => {
            const Icon = icons[item.icon];
            return (
              <StaggerItem key={item.title}>
                <Reveal>
                  <div className="group relative flex gap-5 rounded-2xl border border-transparent p-3 transition hover:border-gold/15 hover:bg-gold/[0.02] sm:gap-7 sm:p-5">
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-[#0b1018] text-gold transition group-hover:bg-gold group-hover:text-[#0a0e14] sm:h-12 sm:w-12">
                      <Icon />
                    </div>
                    <div className="flex-1 border-b border-gold/10 pb-5 last:border-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold/70">
                        {t(item.period)}
                      </p>
                      <h3 className="mt-2 font-display text-2xl text-ivory sm:text-3xl">
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

"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import SectionHeading from "../ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../ui/Primitives";
import { skills } from "../../data/portfolio";
import { useExperience } from "../providers/ExperienceProvider";
import { useLocale } from "../../lib/i18n";
import { L } from "../../lib/locale";

const copy = {
  eyebrow: L("Skills & Tools", "Skills & Tools"),
  title: L("The toolkit.", "The toolkit."),
  description: L(
    "Teknologi yang saya pakai untuk mengubah ide menjadi pengalaman yang nyata.",
    "The technologies I use to turn ideas into real experiences."
  ),
  items: L("items", "items"),
  notes: {
    Frontend: L(
      "Fokus pada antarmuka yang cepat, responsif, dan nyaman dipakai.",
      "Focused on fast, responsive, and comfortable interfaces."
    ),
    Backend: L(
      "Membangun logika server, database, dan alur data yang rapi.",
      "Building clean server logic, databases, and data flows."
    ),
    Creative: L(
      "Bereksperimen dengan motion, interaksi, dan sedikit sentuhan 3D.",
      "Experimenting with motion, interaction, and a touch of 3D."
    ),
  },
  note: L(
    "Selalu belajar hal baru · kuliah cybersecurity di Binus & bereksperimen dengan 3D motion",
    "Always learning · studying cybersecurity at Binus & experimenting with 3D motion"
  ),
};

const groups = ["Frontend", "Backend", "Creative"] as const;

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const { isFull } = useExperience();
  const containerRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(4);
  const itemsKey = items.join("|");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const measure = () => {
      const group = container.querySelector<HTMLElement>("[data-marquee-group]");
      if (!group?.children.length) return;
      const oneSet = group.scrollWidth / copies;
      const needed = Math.max(2, Math.ceil(container.clientWidth / Math.max(oneSet, 1)) + 1);
      setCopies((current) => (current === needed ? current : needed));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [itemsKey, copies]);

  const repeated = Array.from({ length: copies }, () => items).flat();

  return (
    <div ref={containerRef} className="flex overflow-hidden">
      <motion.div
        className="flex w-max"
        animate={isFull ? { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] } : undefined}
        transition={{ duration: reverse ? 38 : 34, ease: "linear", repeat: Infinity }}
      >
        {[0, 1].map((group) => (
          <div
            key={group}
            data-marquee-group
            className="flex shrink-0 gap-3 py-2 pr-3"
          >
            {repeated.map((item, index) => (
              <span
                key={`${group}-${index}-${item}`}
                className="whitespace-nowrap rounded-full border border-gold/15 bg-gold/[0.03] px-5 py-2.5 text-sm font-medium text-ivory/75"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  const { isFull } = useExperience();
  const { t } = useLocale();
  const names = skills.map((skill) => skill.name);
  const firstHalf = names.slice(0, 8);
  const secondHalf = names.slice(8);

  return (
    <section id="skills" className="relative overflow-hidden border-t border-gold/10 py-24 sm:py-32">
      <div aria-hidden="true" className="fx-only pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.04] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          index="02"
          eyebrow={t(copy.eyebrow)}
          title={t(copy.title)}
          description={t(copy.description)}
          align="center"
        />

        <div className="mt-14 space-y-3">
          <Marquee items={firstHalf} />
          <Marquee items={secondHalf} reverse />
        </div>

        <Stagger className="mt-16 grid gap-5 lg:grid-cols-3" step={0.12}>
          {groups.map((group) => {
            const items = skills.filter((skill) => skill.group === group);
            return (
              <StaggerItem key={group}>
                <div className="glass flex h-full flex-col rounded-3xl p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-3xl text-gold-soft">{group}</h3>
                    <span className="font-mono text-[10px] text-muted">
                      {String(items.length).padStart(2, "0")} {t(copy.items)}
                    </span>
                  </div>
                  <div className="mt-7 flex flex-1 flex-col justify-evenly gap-4">
                    {items.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-ivory/85">{skill.name}</span>
                          <span className="font-mono text-gold/70">{skill.level}%</span>
                        </div>
                        <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-white/8">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-gold to-gold-soft"
                            initial={isFull ? { width: 0 } : false}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-8 border-t border-gold/10 pt-5 text-[11px] leading-relaxed text-muted">
                    {t(copy.notes[group])}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.1}>
          <p className="mt-10 text-center text-xs tracking-wide text-muted">
            {t(copy.note)}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

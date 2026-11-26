"use client";

import { FaGraduationCap, FaMapMarkerAlt, FaCode } from "react-icons/fa";
import SectionHeading from "../ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../ui/Primitives";
import { profile } from "../../data/portfolio";
import { useExperience } from "../providers/ExperienceProvider";
import { useLocale } from "../../lib/i18n";
import { L } from "../../lib/locale";

const copy = {
  eyebrow: L("Tentang Saya", "About Me"),
  title: L("Dibangun dari rasa penasaran.", "Crafted with curiosity."),
  description: L(
    "Sekilas tentang orang di balik layar ini.",
    "A quick look at the person behind the screen."
  ),
  quoteLead: L(
    "Saya percaya website yang baik bukan cuma terlihat bagus, tapi juga",
    "I believe a good website doesn't just look great, it also"
  ),
  quoteAccent: L("terasa enak dipakai", "feels great to use"),
  currently: L("Currently", "Currently"),
  building: L("Building & learning", "Building & learning"),
  location: L("Lokasi", "Location"),
  focus: L("Fokus", "Focus"),
  focusValue: L("Full Stack & Creative Web", "Full Stack & Creative Web"),
  education: L("Pendidikan", "Education"),
};

export default function About() {
  const { isFull } = useExperience();
  const { t } = useLocale();

  const facts = [
    { icon: FaMapMarkerAlt, label: t(copy.location), value: profile.location },
    { icon: FaCode, label: t(copy.focus), value: t(copy.focusValue) },
    {
      icon: FaGraduationCap,
      label: t(copy.education),
      value: "Binus University · Cybersecurity",
    },
  ];

  return (
    <section id="about" className="relative border-t border-gold/10 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          index="01"
          eyebrow={t(copy.eyebrow)}
          title={t(copy.title)}
          description={t(copy.description)}
        />

        <div className="mt-14 grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="relative mx-auto flex h-[360px] w-full max-w-[380px] items-center justify-center sm:h-[440px]">
              <div aria-hidden="true" className="absolute inset-0">
                <div className="absolute inset-4 rounded-full border border-gold/10" />
                <div className="absolute inset-14 rounded-full border border-dashed border-gold/15" />
                <div className="absolute left-0 top-1/2 h-px w-full bg-gold/10" />
                <div className="absolute left-1/2 top-0 h-full w-px bg-gold/10" />
                {isFull && (
                  <div className="absolute inset-0 animate-[spin_28s_linear_infinite]">
                    <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_16px_4px_rgba(216,184,124,0.45)]" />
                  </div>
                )}
              </div>

              <div className="glass relative flex h-[290px] w-[250px] flex-col items-center justify-center overflow-hidden rounded-[2rem] sm:h-[350px] sm:w-[290px]">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/15 blur-3xl" />
                <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-teal/10 blur-3xl" />
                <span className="font-display text-[8rem] leading-none text-gold/90 sm:text-[9rem]">
                  R
                </span>
                <span className="absolute bottom-8 font-mono text-[10px] tracking-[0.35em] text-muted">
                  REZYA INDY
                </span>
              </div>

              <div className="glass-strong absolute -bottom-2 -right-1 rounded-2xl px-5 py-4 sm:-right-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                  {t(copy.currently)}
                </p>
                <p className="mt-1 text-sm font-semibold text-ivory">
                  {t(copy.building)}
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.08}>
              <p className="font-display text-2xl leading-relaxed text-ivory/90 sm:text-3xl">
                {t(copy.quoteLead)}{" "}
                <span className="text-teal">{t(copy.quoteAccent)}</span>.
              </p>
            </Reveal>
            {profile.about.map((paragraph, index) => (
              <Reveal key={paragraph.id} delay={0.14 + index * 0.07}>
                <p className="mt-5 text-sm leading-8 text-muted sm:text-base">
                  {t(paragraph)}
                </p>
              </Reveal>
            ))}

            <Stagger className="mt-10 grid gap-3 sm:grid-cols-3">
              {facts.map(({ icon: Icon, label, value }, index) => (
                <StaggerItem key={label}>
                  <div className="glass group h-full rounded-2xl p-5 transition hover:border-gold/40">
                    <Icon className={`text-lg ${index === 1 ? "text-teal" : "text-gold"}`} />
                    <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-muted">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-ivory">{value}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}

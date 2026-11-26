"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { animated, to, useSpring } from "@react-spring/web";
import { FaArrowRight } from "react-icons/fa";
import SectionHeading from "../ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../ui/Primitives";
import { ProjectModal } from "../ui/Modals";
import {
  categories,
  projects,
  type Project,
  type ProjectCategory,
} from "../../data/portfolio";
import { useExperience } from "../providers/ExperienceProvider";
import { useLocale } from "../../lib/i18n";
import { L, type Localized } from "../../lib/locale";

const copy = {
  eyebrow: L("Proyek Pilihan", "Selected Work"),
  title: L("Karya saya.", "Things I've built."),
  description: L(
    "Kumpulan proyek yang pernah saya kerjakan, dari aplikasi web hingga game.",
    "A collection of projects I've worked on, from web apps to games."
  ),
  viewCase: L("View case study →", "View case study →"),
  showing: L(
    "proyek ditampilkan · klik kartu untuk melihat detail",
    "projects shown · click a card for details"
  ),
  openProject: L("Lihat detail proyek", "View project details"),
};

const categoryLabels: Record<"All" | ProjectCategory, Localized> = {
  All: L("Semua", "All"),
  "Web App": L("Web App", "Web App"),
  "E-Commerce": L("E-Commerce", "E-Commerce"),
  Game: L("Game", "Game"),
};

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const { isFull } = useExperience();
  const { t } = useLocale();
  const [{ rx, ry }, api] = useSpring(() => ({
    rx: 0,
    ry: 0,
    config: { mass: 1, tension: 230, friction: 24 },
  }));
  const transform = to(
    [rx, ry],
    (x, y) => `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg)`
  );
  const badgeClass = "border border-teal/20 bg-teal/10 text-teal";

  return (
    <motion.div layout className={project.featured ? "md:col-span-2" : ""}>
      <button
        type="button"
        onClick={onOpen}
        onPointerMove={(event) => {
          if (!isFull || event.pointerType !== "mouse") return;
          const rect = event.currentTarget.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width;
          const py = (event.clientY - rect.top) / rect.height;
          event.currentTarget.style.setProperty("--mx", `${px * 100}%`);
          event.currentTarget.style.setProperty("--my", `${py * 100}%`);
          api.start({
            rx: -(py - 0.5) * 7,
            ry: (px - 0.5) * 7,
          });
        }}
        onPointerLeave={() => api.start({ rx: 0, ry: 0 })}
        aria-label={`${t(copy.openProject)}: ${project.title}`}
        className="group block h-full w-full text-left"
      >
        <animated.div
          style={isFull ? { transform } : undefined}
          className="glass relative h-full overflow-hidden rounded-3xl transition duration-500 hover:border-teal/50 hover:shadow-teal-glow"
        >
          {isFull && (
            <span aria-hidden="true" className="spotlight pointer-events-none absolute inset-0 z-20" />
          )}

          <div className="relative aspect-[16/10] overflow-hidden bg-surface">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`${
                project.coverFit === "contain"
                  ? "object-contain bg-obsidian p-3"
                  : "object-cover object-top"
              } transition-transform duration-700 group-hover:scale-[1.04]`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" />
            <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm ${badgeClass}`}>
              {project.category}
            </span>
            <span className="absolute right-4 top-4 rounded-full border border-border-subtle bg-obsidian/60 px-3 py-1 font-mono text-[10px] text-foreground/70 backdrop-blur-sm">
              {t(project.year)}
            </span>
            <span className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-gold text-obsidian opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <FaArrowRight />
            </span>
          </div>

          <div className="relative z-10 p-6 sm:p-7">
            <h3 className="break-words font-display text-2xl leading-tight text-foreground transition group-hover:text-gold sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
              {t(project.summary)}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border-subtle bg-gold/[0.04] px-2.5 py-1 text-[10px] text-gold/80"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-teal/80">
              {t(copy.viewCase)}
            </p>
          </div>
        </animated.div>
      </button>
    </motion.div>
  );
}

export default function Projects() {
  const { isFull } = useExperience();
  const { t } = useLocale();
  const [filter, setFilter] = useState<"All" | ProjectCategory>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter]
  );

  const selected = projects.find((project) => project.id === selectedId) ?? null;
  const step = useCallback(
    (direction: number) => {
      const index = projects.findIndex((project) => project.id === selectedId);
      if (index < 0) return;
      setSelectedId(projects[(index + direction + projects.length) % projects.length].id);
    },
    [selectedId]
  );

  return (
    <section id="projects" className="relative border-t border-border-subtle py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="03"
            eyebrow={t(copy.eyebrow)}
            title={t(copy.title)}
            description={t(copy.description)}
          />
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  className={`relative rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                    filter === category
                      ? "border-transparent text-obsidian"
                      : "border-border-subtle text-muted hover:border-teal/40 hover:text-foreground"
                  }`}
                >
                  {filter === category && (
                    <motion.span
                      layoutId={isFull ? "project-filter" : undefined}
                      className="absolute inset-0 rounded-full bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{t(categoryLabels[category])}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div
          layout
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <StaggerItem
                key={project.id}
                layout
                exit={{ opacity: 0, scale: 0.96, y: -8 }}
              >
                <ProjectCard project={project} onOpen={() => setSelectedId(project.id)} />
              </StaggerItem>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal>
          <p className="mt-10 text-center text-xs text-muted">
            {filtered.length} {t(copy.showing)}
          </p>
        </Reveal>
      </div>

      <ProjectModal
        project={selected}
        onClose={() => setSelectedId(null)}
        onNext={() => step(1)}
        onPrev={() => step(-1)}
      />
    </section>
  );
}

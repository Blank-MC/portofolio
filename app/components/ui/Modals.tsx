"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaDownload,
  FaExternalLinkAlt,
  FaTimes,
} from "react-icons/fa";
import type { Certificate, Project } from "../../data/portfolio";
import { contactVisibility, profile } from "../../data/portfolio";
import { useExperience } from "../providers/ExperienceProvider";
import { useLocale } from "../../lib/i18n";
import { L } from "../../lib/locale";

const copy = {
  close: L("Tutup", "Close"),
  prevImage: L("Gambar sebelumnya", "Previous image"),
  nextImage: L("Gambar berikutnya", "Next image"),
  prevProject: L("Proyek sebelumnya", "Previous project"),
  nextProject: L("Proyek berikutnya", "Next project"),
  galleryHint: L(
    "Gunakan ← → untuk galeri · Esc untuk menutup",
    "Use ← → for the gallery · Esc to close"
  ),
  discuss: L("Diskusikan proyek ini", "Discuss this project"),
  seeImage: L("Lihat", "View"),
  certificate: L("Sertifikat", "Certificate"),
  certHint: L(
    "Gunakan → untuk sertifikat berikutnya · Esc untuk menutup",
    "Use → for the next certificate · Esc to close"
  ),
  nextCert: L("Sertifikat lain", "Next certificate"),
  download: L("Unduh", "Download"),
};

function useModalChrome(
  open: boolean,
  onClose: () => void,
  onKey?: (key: string) => void
) {
  const closeRef = useRef(onClose);
  const keyRef = useRef(onKey);

  useEffect(() => {
    closeRef.current = onClose;
    keyRef.current = onKey;
  }, [onClose, onKey]);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      const dialog = document.querySelector<HTMLElement>("[role='dialog']");
      dialog?.querySelector<HTMLElement>("button")?.focus();
    }, 40);

    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeRef.current();
        return;
      }
      if (event.key === "Tab") {
        const dialog = document.querySelector<HTMLElement>("[role='dialog']");
        if (!dialog) return;
        const focusable = Array.from(
          dialog.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'
          )
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
      keyRef.current?.(event.key);
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open]);
}

/* ─── Project case-study modal ──────────────────────────────────── */
export function ProjectModal({
  project,
  onClose,
  onNext,
  onPrev,
}: {
  project: Project | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  const { isFull } = useExperience();
  const { t } = useLocale();

  useEffect(() => setMounted(true), []);
  useEffect(() => setActive(0), [project?.id]);
  useModalChrome(Boolean(project), onClose);

  useEffect(() => {
    if (!project || !isFull) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setActive((index) => (index + 1) % project.gallery.length);
      }
      if (event.key === "ArrowLeft") {
        setActive((index) => (index - 1 + project.gallery.length) % project.gallery.length);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [project, isFull]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[#030508]/92 px-3 py-5 backdrop-blur-md sm:px-6 sm:py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: isFull ? 0.28 : 0.12 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            className="glass-strong relative my-auto min-w-0 w-full max-w-5xl overflow-hidden rounded-3xl"
            initial={isFull ? { opacity: 0, y: 36, scale: 0.97 } : false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={isFull ? { opacity: 0, y: 24, scale: 0.98 } : { opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t(copy.close)}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 bg-[#0a0e15]/80 text-ivory transition hover:border-gold hover:text-gold"
            >
              <FaTimes />
            </button>

            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden bg-[#080c13] p-3 sm:min-h-[280px] sm:p-6 lg:min-h-[620px]">
                <div
                  className="pointer-events-none absolute inset-0 opacity-60"
                  style={{
                    background: `radial-gradient(circle at 50% 40%, ${project.accent}22, transparent 65%)`,
                  }}
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${project.id}-${active}`}
                    className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black/40"
                    initial={isFull ? { opacity: 0, scale: 1.03 } : false}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={isFull ? { opacity: 0, scale: 0.99 } : { opacity: 0 }}
                    transition={{ duration: isFull ? 0.35 : 0.12 }}
                  >
                    <Image
                      src={project.gallery[active].src}
                      alt={project.gallery[active].alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-contain"
                      unoptimized={project.gallery[active].src.endsWith(".gif")}
                    />
                  </motion.div>
                </AnimatePresence>

                {project.gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label={t(copy.prevImage)}
                      onClick={() =>
                        setActive((i) => (i - 1 + project.gallery.length) % project.gallery.length)
                      }
                      className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gold/20 bg-[#0a0e15]/80 text-gold transition hover:bg-gold hover:text-[#0a0e14] sm:left-7"
                    >
                      <FaArrowLeft />
                    </button>
                    <button
                      type="button"
                      aria-label={t(copy.nextImage)}
                      onClick={() => setActive((i) => (i + 1) % project.gallery.length)}
                      className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gold/20 bg-[#0a0e15]/80 text-gold transition hover:bg-gold hover:text-[#0a0e14] sm:right-7"
                    >
                      <FaArrowRight />
                    </button>
                  </>
                )}
              </div>

              <div className="flex min-w-0 flex-col p-5 pr-12 sm:p-9 sm:pr-14">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold sm:text-[11px] sm:tracking-[0.25em]">
                  <span className="break-words">{project.category}</span>
                  <span className="hidden h-px w-8 bg-gold/40 sm:block" />
                  <span className="text-muted">{project.year}</span>
                </div>
                <h3 className="mt-3 break-words font-display text-[2rem] leading-[1.08] text-ivory sm:text-4xl lg:text-5xl">
                  {project.title}
                </h3>
                <p className="mt-2 break-words text-sm text-gold/80">{t(project.role)}</p>
                <p className="mt-5 break-words text-sm leading-relaxed text-muted sm:text-base">
                  {t(project.summary)}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-gold/15 bg-gold/5 px-3 py-1.5 text-xs text-gold-soft/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 space-y-3 border-t border-gold/10 pt-5 sm:mt-7 sm:space-y-4 sm:pt-6">
                  {project.description.map((paragraph) => (
                    <p key={paragraph.id} className="break-words text-[13px] leading-6 text-muted sm:text-sm sm:leading-7">
                      {t(paragraph)}
                    </p>
                  ))}
                </div>

                <p className="mt-5 break-words text-xs text-muted/70 sm:mt-6">
                  {t(project.gallery[active].caption)}
                </p>
                <p className="mt-2 break-words text-[10px] text-muted/50">
                  {t(copy.galleryHint)}
                </p>

                <div className="mt-auto flex flex-col items-stretch gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={onPrev}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 text-gold transition hover:bg-gold/10"
                      aria-label={t(copy.prevProject)}
                    >
                      <FaArrowLeft />
                    </button>
                    <button
                      type="button"
                      onClick={onNext}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 text-gold transition hover:bg-gold/10"
                      aria-label={t(copy.nextProject)}
                    >
                      <FaArrowRight />
                    </button>
                  </div>
                  {contactVisibility.showEmail && (
                    <a
                      href={`mailto:${profile.email}?subject=${encodeURIComponent(
                        `Diskusi proyek: ${project.title}`
                      )}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-2.5 text-center text-xs font-bold text-[#0a0e14] transition hover:bg-gold-soft sm:w-auto"
                    >
                      {t(copy.discuss)} <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {project.gallery.length > 1 && (
              <div className="flex max-w-full gap-3 overflow-x-auto border-t border-gold/10 p-4 sm:p-5">
                {project.gallery.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`${t(copy.seeImage)} ${t(image.caption)}`}
                    className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border transition ${
                      active === index
                        ? "border-gold opacity-100"
                        : "border-white/10 opacity-50 hover:opacity-90"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover"
                      unoptimized={image.src.endsWith(".gif")}
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ─── Certificate modal ─────────────────────────────────────────── */
export function CertificateModal({
  certificate,
  onClose,
  onNext,
}: {
  certificate: Certificate | null;
  onClose: () => void;
  onNext: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  const { isFull } = useExperience();
  const { t } = useLocale();

  useEffect(() => setMounted(true), []);
  useEffect(() => setActive(0), [certificate?.id]);
  useModalChrome(Boolean(certificate), onClose);

  useEffect(() => {
    if (!certificate || !isFull) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [certificate, isFull, onNext]);

  if (!mounted) return null;

  const images = certificate?.gallery ?? (certificate ? [certificate.file] : []);

  return createPortal(
    <AnimatePresence>
      {certificate && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#030508]/94 px-4 py-8 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: isFull ? 0.28 : 0.12 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t(certificate.title)}
            className="glass-strong w-full max-w-4xl overflow-hidden rounded-3xl"
            initial={isFull ? { opacity: 0, y: 30, scale: 0.97 } : false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-gold/10 p-6 sm:p-8">
              <div>
                <p className="section-label">{t(copy.certificate)} · {certificate.year}</p>
                <h3 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
                  {t(certificate.title)}
                </h3>
                <p className="mt-2 text-sm text-muted">{t(certificate.issuer)}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t(copy.close)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/20 text-ivory transition hover:border-gold hover:text-gold"
              >
                <FaTimes />
              </button>
            </div>

            <div className="bg-[#080c13] p-4 sm:p-7">
              {certificate.type === "pdf" ? (
                <iframe
                  src={certificate.file}
                  title={t(certificate.title)}
                  className="h-[55vh] min-h-[380px] w-full rounded-xl border border-white/10 bg-white"
                />
              ) : (
                <div className="relative mx-auto aspect-[1.414/1] w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-black/30">
                  <Image
                    src={images[active]}
                    alt={t(certificate.title)}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-contain"
                  />
                </div>
              )}

              {certificate.type === "image" && images.length > 1 && (
                <div className="mt-4 flex justify-center gap-3">
                  {images.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActive(index)}
                      aria-label={`${t(copy.seeImage)} ${t(copy.certificate)} ${index + 1}`}
                      className={`h-12 w-16 overflow-hidden rounded-md border transition ${
                        active === index ? "border-gold" : "border-white/10 opacity-50"
                      }`}
                    >
                      <Image src={image} alt="" width={64} height={48} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 border-t border-gold/10 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div className="max-w-xl">
                <p className="text-sm leading-6 text-muted">{t(certificate.description)}</p>
                {certificate.credential && (
                  <p className="mt-2 font-mono text-[11px] tracking-wide text-gold/60">
                    {certificate.credential}
                  </p>
                )}
                <p className="mt-2 text-[10px] text-muted/50">
                  {t(copy.certHint)}
                </p>
              </div>
              <div className="flex shrink-0 gap-3">
                <button
                  type="button"
                  onClick={onNext}
                  className="flex h-11 items-center gap-2 rounded-full border border-gold/20 px-4 text-xs font-semibold text-gold transition hover:bg-gold/10"
                >
                  {t(copy.nextCert)} <FaArrowRight />
                </button>
                <a
                  href={certificate.file}
                  download
                  className="flex h-11 items-center gap-2 rounded-full bg-gold px-5 text-xs font-bold text-[#0a0e14] transition hover:bg-gold-soft"
                >
                  <FaDownload /> {t(copy.download)}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

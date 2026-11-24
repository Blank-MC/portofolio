"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { FaBolt, FaLeaf, FaArrowUp } from "react-icons/fa";
import { useExperience } from "../providers/ExperienceProvider";
import { useLocale } from "../../lib/i18n";
import { L } from "../../lib/locale";

const copy = {
  performance: L("Performa", "Performance"),
  full: L("Full", "Full"),
  effectsOn: L("Efek aktif", "Effects on"),
  resourceSave: L("Hemat resource", "Battery saver"),
  mode: L("Mode tampilan", "Display mode"),
  enableFull: L("Aktifkan semua efek", "Enable all effects"),
  disableFull: L("Matikan efek berat", "Turn off heavy effects"),
  backToTop: L("Kembali ke atas", "Back to top"),
};

/* ─── Mode toggle ───────────────────────────────────────────────── */
export function ModeToggle() {
  const { mode, setMode } = useExperience();
  const { t } = useLocale();
  const options = [
    { value: "performance" as const, label: t(copy.performance), icon: FaLeaf },
    { value: "full" as const, label: t(copy.full), icon: FaBolt },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-2">
      <AnimatePresence>
        <motion.span
          key={mode}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          className="hidden rounded-full border border-gold/15 bg-[#0d131d]/90 px-3 py-1 text-[10px] tracking-widest text-gold/80 uppercase sm:block"
        >
          {mode === "full" ? t(copy.effectsOn) : t(copy.resourceSave)}
        </motion.span>
      </AnimatePresence>

      <div
        role="group"
        aria-label={t(copy.mode)}
        className="glass-strong flex items-center gap-1 rounded-full p-1 shadow-2xl shadow-black/40"
      >
        {options.map(({ value, label, icon: Icon }) => {
          const active = mode === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              aria-pressed={active}
              title={value === "full" ? t(copy.enableFull) : t(copy.disableFull)}
              className={`relative flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors sm:px-4 ${
                active ? "text-[#0a0e14]" : "text-muted hover:text-ivory"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="mode-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-soft to-gold"
                />
              )}
              <Icon className="relative z-10 text-sm" />
              <span className="relative z-10 hidden sm:inline">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Cursor follower ───────────────────────────────────────────── */
export function CustomCursor() {
  const { isFull } = useExperience();
  const [fine, setFine] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.4 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const update = () => setFine(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isFull || !fine) return;
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest("a, button, [data-cursor='hover']")));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [isFull, fine, x, y]);

  if (!isFull || !fine) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[120] -ml-4 -mt-4 h-8 w-8 rounded-full border border-gold/70 mix-blend-screen"
      style={{ x: springX, y: springY }}
      animate={{
        scale: hovering ? 2.1 : 1,
        opacity: hovering ? 0.45 : 0.8,
        borderColor: hovering ? "rgba(216,184,124,0.95)" : "rgba(216,184,124,0.5)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-soft" />
    </motion.div>
  );
}

/* ─── Ambient particle canvas ───────────────────────────────────── */
export function ParticleField() {
  const { isFull } = useExperience();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isFull) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Particle = { x: number; y: number; vx: number; vy: number; r: number; gold: boolean };
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    const pointer = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(72, Math.max(28, Math.floor((width * height) / 26000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.5 + 0.5,
        gold: Math.random() > 0.28,
      }));
    };

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const tick = () => {
      if (!document.hidden) {
        ctx.clearRect(0, 0, width, height);
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < 130) {
            p.x += (dx / distance) * 0.45;
            p.y += (dy / distance) * 0.45;
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.gold
            ? "rgba(216,184,124,0.42)"
            : "rgba(121,214,196,0.32)";
          ctx.fill();
        }
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const distance = Math.hypot(a.x - b.x, a.y - b.y);
            if (distance < 125) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(216,184,124,${(1 - distance / 125) * 0.1})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }
      frame = window.requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [isFull]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fx-only pointer-events-none fixed inset-0 z-0 opacity-70"
    />
  );
}

/* ─── Scroll progress + to-top ──────────────────────────────────── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[110] h-[2px] w-full origin-left bg-gradient-to-r from-gold-soft via-gold to-teal"
      style={{ scaleX }}
    />
  );
}

export function BackToTop() {
  const { isFull } = useExperience();
  const { t } = useLocale();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => setVisible(latest > 600));

  const toTop = () => {
    const lenis = (
      window as Window & {
        __lenis?: { scrollTo: (target: number, options?: { duration?: number }) => void };
      }
    ).__lenis;
    if (isFull && lenis) {
      lenis.scrollTo(0, { duration: 1 });
      return;
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label={t(copy.backToTop)}
          onClick={toTop}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="glass-strong fixed bottom-24 left-5 z-[90] flex h-10 w-10 items-center justify-center rounded-full text-gold transition hover:text-gold-soft sm:bottom-5 sm:left-5"
        >
          <FaArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

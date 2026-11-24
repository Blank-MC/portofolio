"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Target } from "motion/react";
import { animated, useSpring } from "@react-spring/web";
import { useExperience } from "../providers/ExperienceProvider";

/* ─── Scroll reveal ─────────────────────────────────────────────── */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 26,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const { isFull } = useExperience();
  if (!isFull) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className = "",
  step = 0.09,
}: {
  children: React.ReactNode;
  className?: string;
  step?: number;
}) {
  const { isFull } = useExperience();
  if (!isFull) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: step } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  exit,
  layout = false,
}: {
  children: React.ReactNode;
  className?: string;
  exit?: Target;
  layout?: boolean;
}) {
  const { isFull } = useExperience();
  if (!isFull) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      layout={layout}
      exit={exit}
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Magnetic wrapper (react-spring) ───────────────────────────── */
export function Magnetic({
  children,
  className = "",
  strength = 12,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const { isFull } = useExperience();
  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { mass: 1, tension: 260, friction: 22 },
  }));

  if (!isFull) return <div className={className}>{children}</div>;

  return (
    <animated.div
      className={className}
      style={{ x, y }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        api.start({
          x: ((event.clientX - rect.left - rect.width / 2) / rect.width) * strength,
          y: ((event.clientY - rect.top - rect.height / 2) / rect.height) * strength,
        });
      }}
      onPointerLeave={() => api.start({ x: 0, y: 0 })}
    >
      {children}
    </animated.div>
  );
}

/* ─── Hover scramble text ───────────────────────────────────────── */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#$%&*";

export function ScrambleText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const { isFull } = useExperience();
  const [display, setDisplay] = useState(text);
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current) window.clearInterval(timer.current);
  }, []);

  const scramble = () => {
    if (!isFull || timer.current) return;
    let frame = 0;
    const total = Math.ceil(text.length * 1.6);
    timer.current = window.setInterval(() => {
      const revealed = Math.floor((frame / total) * text.length);
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < revealed) return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
      frame += 1;
      if (frame > total) {
        if (timer.current) window.clearInterval(timer.current);
        timer.current = null;
        setDisplay(text);
      }
    }, 32);
  };

  return (
    <span className={className} onPointerEnter={scramble}>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

/* ─── Animated statistic (react-spring) ─────────────────────────── */
export function StatCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const { isFull } = useExperience();
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const spring = useSpring({
    from: { n: 0 },
    to: { n: visible ? value : 0 },
    immediate: !isFull,
    config: { mass: 1, tension: 110, friction: 20 },
  });

  return (
    <span ref={ref}>
      <animated.span>
        {spring.n.to((n) => `${Math.round(n)}${suffix}`)}
      </animated.span>
    </span>
  );
}

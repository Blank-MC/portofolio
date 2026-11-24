"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ExperienceMode = "full" | "performance";

interface ExperienceContextValue {
  mode: ExperienceMode;
  isFull: boolean;
  ready: boolean;
  setMode: (mode: ExperienceMode) => void;
  toggle: () => void;
}

const STORAGE_KEY = "rezya-portfolio-mode";

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ExperienceMode>("full");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const lowPower =
      (navigator.hardwareConcurrency ?? 8) <= 4 || Boolean(connection?.saveData);
    const initial: ExperienceMode =
      stored === "full" || stored === "performance"
        ? stored
        : reduced || lowPower
          ? "performance"
          : "full";
    setMode(initial);
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    if (ready) window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode, ready]);

  const toggle = useCallback(() => {
    setMode((current) => (current === "full" ? "performance" : "full"));
  }, []);

  const value = useMemo(
    () => ({
      mode,
      isFull: mode === "full",
      ready,
      setMode,
      toggle,
    }),
    [mode, ready, toggle]
  );

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error("useExperience must be used inside ExperienceProvider");
  }
  return context;
}

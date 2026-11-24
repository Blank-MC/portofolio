"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Locale, Localized } from "./locale";

const STORAGE_KEY = "rezya-portfolio-locale";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggle: () => void;
  t: (value: Localized) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("id");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial: Locale =
      stored === "id" || stored === "en"
        ? stored
        : window.navigator.language.toLowerCase().startsWith("id")
          ? "id"
          : "en";
    setLocale(initial);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const toggle = useCallback(() => {
    setLocale((current) => (current === "id" ? "en" : "id"));
  }, []);

  const t = useCallback((value: Localized) => value[locale], [locale]);

  const context = useMemo(
    () => ({ locale, setLocale, toggle, t }),
    [locale, toggle, t]
  );

  return (
    <LocaleContext.Provider value={context}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used inside LocaleProvider");
  }
  return context;
}

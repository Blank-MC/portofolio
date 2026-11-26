"use client";

import { useLocale } from "../../lib/i18n";
import { L } from "../../lib/locale";

export default function Footer() {
  const { t } = useLocale();
  return (
    <footer className="arch-divider relative overflow-hidden border-t border-border-subtle py-8">
      <div aria-hidden="true" className="arch-grid pointer-events-none absolute inset-0 select-none" />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 text-center sm:flex-row sm:px-8 sm:text-left lg:px-12">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} Rezya Indy Saputra.{" "}
          {t(L("Dibuat dengan teliti.", "Crafted with care."))}
        </p>
        <p className="font-mono text-[10px] tracking-[0.18em] text-teal/70">
          NEXT.JS · MOTION · THREE.JS
        </p>
      </div>
    </footer>
  );
}

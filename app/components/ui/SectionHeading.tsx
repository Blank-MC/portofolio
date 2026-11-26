"use client";

import { Reveal } from "./Primitives";

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal>
      <div className={align === "center" ? "text-center" : ""}>
        <div
          className={`flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}
        >
          <span className="num font-mono text-xs text-teal">{index}</span>
          <span className="h-px w-10 bg-gradient-to-r from-teal/60 to-gold/40" />
          <span className="text-xs text-muted">{eyebrow}</span>
        </div>
        <h2 className="mt-5 font-display text-4xl leading-tight text-ivory sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        {description && (
          <p
            className={`mt-4 max-w-2xl text-sm leading-7 text-secondary sm:text-base ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}

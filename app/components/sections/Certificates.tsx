"use client";

import { useState } from "react";
import Image from "next/image";
import { FaAward, FaFilePdf, FaArrowRight } from "react-icons/fa";
import SectionHeading from "../ui/SectionHeading";
import { Stagger, StaggerItem } from "../ui/Primitives";
import { CertificateModal } from "../ui/Modals";
import { certificates, type Certificate } from "../../data/portfolio";
import { useLocale } from "../../lib/i18n";
import { L } from "../../lib/locale";

const copy = {
  eyebrow: L("Penghargaan", "Recognition"),
  title: L("Bukti karya.", "Proof of work."),
  description: L(
    "Beberapa pencapaian yang saya dapatkan selama belajar dan membangun.",
    "A few milestones I've earned while learning and building."
  ),
  pdfTitle: L("Project Competition", "Project Competition"),
  pdfRank: L("Juara 3 · 2023", "3rd Place · 2023"),
};

function CertificateCard({
  certificate,
  onOpen,
}: {
  certificate: Certificate;
  onOpen: () => void;
}) {
  const { t } = useLocale();
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Certificate: ${t(certificate.title)}`}
      className="group glass block h-full w-full overflow-hidden rounded-3xl text-left transition-colors hover:border-gold/45"
    >
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-[#080c13] p-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(216,184,124,0.12),transparent_65%)]" />
        {certificate.type === "image" ? (
          <div
            className="relative h-full w-full overflow-hidden rounded-lg border border-white/10 shadow-xl shadow-black/40 transition-transform duration-700 group-hover:scale-[1.03]"
          >
            <Image
              src={certificate.file}
              alt={t(certificate.title)}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain bg-[#05080d] p-2"
            />
          </div>
        ) : (
          <div className="relative flex h-full w-full max-w-[240px] flex-col justify-between rounded-xl border border-gold/25 bg-gradient-to-br from-[#121a26] to-[#0a0e15] p-5 shadow-xl shadow-black/40 transition-transform duration-700 group-hover:-rotate-2 group-hover:scale-[1.03]">
            <div className="flex items-start justify-between">
              <FaAward className="text-2xl text-gold" />
              <FaFilePdf className="text-gold/50" />
            </div>
            <div>
              <div className="mb-3 h-10 w-10 rounded-full border border-gold/40" />
              <p className="font-display text-xl leading-tight text-ivory">
                {t(copy.pdfTitle)}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-gold">
                {t(copy.pdfRank)}
              </p>
            </div>
            <div className="flex gap-1">
              <span className="h-px w-8 bg-gold/40" />
              <span className="h-px w-4 bg-gold/20" />
            </div>
          </div>
        )}
        <span className="absolute right-4 top-4 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-gold text-[#0a0e14] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <FaArrowRight />
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
          <span>{certificate.year}</span>
          <span className="h-px w-6 bg-gold/40" />
          <span className="truncate text-muted">{t(certificate.issuer)}</span>
        </div>
        <h3 className="mt-3 font-display text-2xl leading-snug text-ivory">
          {t(certificate.title)}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">
          {t(certificate.description)}
        </p>
      </div>
    </button>
  );
}

export default function Certificates() {
  const { t } = useLocale();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = certificates.find((item) => item.id === selectedId) ?? null;
  const step = () => {
    const index = certificates.findIndex((item) => item.id === selectedId);
    if (index < 0) return;
    setSelectedId(certificates[(index + 1) % certificates.length].id);
  };

  return (
    <section id="certificates" className="relative border-t border-gold/10 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          index="06"
          eyebrow={t(copy.eyebrow)}
          title={t(copy.title)}
          description={t(copy.description)}
        />

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3" step={0.12}>
          {certificates.map((certificate) => (
            <StaggerItem key={certificate.id}>
              <CertificateCard
                certificate={certificate}
                onOpen={() => setSelectedId(certificate.id)}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <CertificateModal
        certificate={selected}
        onClose={() => setSelectedId(null)}
        onNext={step}
      />
    </section>
  );
}

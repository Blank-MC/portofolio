"use client";

import { useEffect, useState } from "react";
import {
  FaCodeBranch,
  FaExternalLinkAlt,
  FaGithub,
  FaStar,
} from "react-icons/fa";
import SectionHeading from "../ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../ui/Primitives";
import { profile } from "../../data/portfolio";
import { useLocale } from "../../lib/i18n";
import { L } from "../../lib/locale";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
  archived: boolean;
}

const CACHE_KEY = "rezya-github-repos";
const CACHE_TTL = 1000 * 60 * 30;

const copy = {
  eyebrow: L("Open Source", "Open Source"),
  title: L("Code in the open.", "Code in the open."),
  description: L(
    "Repo publik dari akun GitHub saya, diambil langsung lewat GitHub API.",
    "Public repos from my GitHub account, fetched straight from the GitHub API."
  ),
  view: L("Lihat repo", "View repo"),
  updated: L("Diupdate", "Updated"),
  error: L(
    "Repo gagal dimuat. Coba buka profil GitHub saya langsung.",
    "Repos couldn't be loaded. Try opening my GitHub profile directly."
  ),
  profile: L("Buka profil GitHub", "Open GitHub profile"),
  noDescription: L("Belum ada deskripsi untuk repo ini.", "No description for this repo yet."),
};

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  PHP: "#4f5d95",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  Java: "#b07219",
  C: "#555555",
  "C++": "#f34b7d",
  Shell: "#89e051",
};

function relativeDate(iso: string, locale: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const days = Math.round((date.getTime() - Date.now()) / 86_400_000);
  const rtf = new Intl.RelativeTimeFormat(locale === "id" ? "id" : "en", {
    numeric: "auto",
  });
  if (Math.abs(days) < 30) return rtf.format(days, "day");
  if (Math.abs(days) < 365) return rtf.format(Math.round(days / 30), "month");
  return rtf.format(Math.round(days / 365), "year");
}

function RepoSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((index) => (
        <div key={index} className="glass h-[220px] animate-pulse rounded-3xl p-7">
          <div className="h-3 w-20 rounded bg-white/10" />
          <div className="mt-6 h-6 w-2/3 rounded bg-white/10" />
          <div className="mt-4 h-3 w-full rounded bg-white/5" />
          <div className="mt-2 h-3 w-4/5 rounded bg-white/5" />
        </div>
      ))}
    </div>
  );
}

function RepoCard({ repo }: { repo: Repo }) {
  const { t, locale } = useLocale();
  const color = repo.language ? languageColors[repo.language] ?? "#d8b87c" : "#d8b87c";

  return (
    <StaggerItem>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="glass group flex h-full flex-col rounded-3xl p-6 transition hover:border-gold/40 sm:p-7"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/20 bg-gold/5 text-gold transition group-hover:bg-gold group-hover:text-[#0a0e14]">
            <FaGithub />
          </span>
          <FaExternalLinkAlt className="text-xs text-muted transition group-hover:text-gold" />
        </div>

        <h3 className="mt-6 break-all font-display text-2xl leading-tight text-ivory">
          {repo.name}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">
          {repo.description ?? t(copy.noDescription)}
        </p>

        <div className="mt-auto pt-6">
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
            {repo.language && (
              <span className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {repo.language}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <FaStar className="text-gold/70" /> {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1.5">
              <FaCodeBranch className="text-gold/70" /> {repo.forks_count}
            </span>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-gold/10 pt-4">
            <span className="text-[11px] text-muted/60">
              {t(copy.updated)} {relativeDate(repo.updated_at, locale)}
            </span>
            <span className="text-xs font-semibold text-gold opacity-0 transition group-hover:opacity-100">
              {t(copy.view)} ↗
            </span>
          </div>
        </div>
      </a>
    </StaggerItem>
  );
}

export default function OpenSource() {
  const { t } = useLocale();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    try {
      const cached = window.localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as { time: number; data: Repo[] };
        if (Date.now() - parsed.time < CACHE_TTL && Array.isArray(parsed.data)) {
          setRepos(parsed.data);
          setLoading(false);
          return;
        }
      }
    } catch {
      /* ignore malformed cache */
    }

    fetch("https://api.github.com/users/Blank-MC/repos?per_page=100&sort=updated", {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub API: ${response.status}`);
        return response.json() as Promise<Repo[]>;
      })
      .then((data) => {
        const curated = data
          .filter((repo) => !repo.fork && !repo.archived)
          .slice(0, 6);
        if (cancelled) return;
        setRepos(curated);
        try {
          window.localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ time: Date.now(), data: curated })
          );
        } catch {
          /* storage may be full or disabled */
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="opensource" className="relative border-t border-gold/10 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          index="05"
          eyebrow={t(copy.eyebrow)}
          title={t(copy.title)}
          description={t(copy.description)}
        />

        <Reveal delay={0.08}>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-xs font-semibold text-gold transition hover:bg-gold/10"
          >
            <FaGithub /> @{profile.github.split("/").pop()}
          </a>
        </Reveal>

        <div className="mt-12">
          {loading ? (
            <RepoSkeleton />
          ) : error ? (
            <Reveal>
              <div className="glass flex flex-col items-center gap-5 rounded-3xl px-6 py-14 text-center">
                <FaGithub className="text-3xl text-gold/60" />
                <p className="text-sm text-muted">{t(copy.error)}</p>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-bold text-[#0a0e14] transition hover:bg-gold-soft"
                >
                  {t(copy.profile)} <FaExternalLinkAlt />
                </a>
              </div>
            </Reveal>
          ) : repos.length ? (
            <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" step={0.08}>
              {repos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </Stagger>
          ) : (
            <Reveal>
              <div className="glass rounded-3xl px-6 py-14 text-center text-sm text-muted">
                {t(copy.error)}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

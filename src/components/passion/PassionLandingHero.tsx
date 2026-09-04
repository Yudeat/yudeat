"use client";

import { Pinyon_Script } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { PASSION_INTRO, PASSION_PAGE_NAV } from "@/constants/passion-story";

const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

/** Hero backdrop — a Himalayan ridgeline above the clouds. */
const HERO_IMAGE = {
  src: "/field/IMG_6730.jpg",
  alt: "",
} as const;

const HERO_NAV_LABELS = ["Work", "Passion", "Journal", "Contact"] as const;

const HERO_NAV = PASSION_PAGE_NAV.filter((item) =>
  (HERO_NAV_LABELS as readonly string[]).includes(item.label),
);

function MobileMenuButton({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onToggle}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10 md:hidden"
    >
      {open ? (
        <span className="ri-close-line text-lg" aria-hidden />
      ) : (
        <span className="ri-menu-3-line text-lg" aria-hidden />
      )}
    </button>
  );
}

export function PassionLandingHero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const tagline = PASSION_INTRO.subtitle.split(" — ")[0];

  return (
    <section
      className="passion-landing relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#101a2b] text-white"
      aria-label="Mountaineering story introduction"
    >
      {/* Full-bleed photo backdrop with a dark, grayish-blue overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0f1b2e]/50" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,15,26,0.72)_0%,rgba(11,19,33,0.22)_46%,rgba(7,12,21,0.78)_100%)]" />
      </div>

      {/* Header */}
      <header className="relative z-30 flex items-center justify-between gap-4 px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
        <Link
          href="/"
          onClick={closeMenu}
          className={`${pinyonScript.className} shrink-0 text-2xl leading-none text-white sm:text-3xl`}
        >
          Yudeat
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-2 md:flex lg:gap-2.5"
        >
          {HERO_NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full bg-white px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#101a2b] transition-colors duration-200 hover:bg-white/80 sm:px-5 sm:py-2 sm:text-[11px]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="relative md:hidden">
          <MobileMenuButton
            open={menuOpen}
            onToggle={() => setMenuOpen((open) => !open)}
          />
          {menuOpen && (
            <nav
              aria-label="Primary"
              className="absolute right-0 top-full mt-3 flex w-44 flex-col gap-1.5 rounded-2xl border border-white/15 bg-[#0d1726]/95 p-2 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md"
            >
              {HERO_NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-full bg-white px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[#101a2b] transition-colors hover:bg-white/80"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Hero content */}
      <div className="relative z-10 flex flex-1 flex-col">
        {/* Left index rail */}
        <div className="absolute left-[clamp(3.5rem,10vw,8rem)] top-1/2 hidden -translate-y-1/2 flex-col items-start gap-4 lg:flex">
          <span className="font-sans text-sm font-medium tracking-[0.16em] text-white/80">
            02
          </span>
          <span className="block h-px w-44 bg-white/45" aria-hidden="true" />
          <p className="max-w-[9.5rem] font-mono text-[9px] uppercase leading-[2.1] tracking-[0.18em] text-white/65">
            {tagline}
          </p>
        </div>

        {/* Centered copy */}
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 pb-20 pt-12 text-center sm:px-8 sm:pb-24 lg:pb-28">
          <p className="inline-flex items-center gap-2.5 rounded-full bg-[#efe9da] px-4 py-2 text-[#101a2b] shadow-[0_18px_44px_-18px_rgba(0,0,0,0.7)] sm:px-5">
            <span className="ri-signpost-fill text-sm leading-none" aria-hidden />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] sm:text-[11px]">
              {PASSION_INTRO.eyebrow}
            </span>
          </p>

          <h1 className="mt-7 text-[clamp(2.9rem,8.2vw,7rem)] font-bold leading-[0.97] tracking-[-0.045em] text-white drop-shadow-[0_10px_36px_rgba(0,0,0,0.4)] sm:mt-9">
            <span className="block">Rooted in the</span>
            <span className="block">Annapurna</span>
          </h1>

          <a
            href="#chapter-1"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#101a2b] shadow-[0_24px_54px_-22px_rgba(0,0,0,0.7)] transition-colors duration-200 hover:bg-[#e9e1cf] sm:mt-11 sm:px-7 sm:py-3.5 sm:text-xs"
          >
            <span className="ri-signpost-fill text-base leading-none" aria-hidden />
            See the story
          </a>
        </div>
      </div>
    </section>
  );
}

"use client";

import type { RefObject } from "react";
import Link from "next/link";
import { AboutMountainScene } from "@/components/portfolio/AboutMountainScene";
import { Cormorant_Garamond } from "next/font/google";
import { LiveClock } from "@/components/portfolio/LiveClock";
import {
  WHO_WE_ARE_BIO,
  WHO_WE_ARE_CONTACT_CARD,
  WHO_WE_ARE_NAV,
  WHO_WE_ARE_STAT,
} from "@/constants/who-we-are";
import { SITE_BRAND_NAME, SITE_PHONE_TEL } from "@/constants/site";
const aboutSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

type WhoWeAreRevealProps = {
  revealRef: RefObject<HTMLDivElement | null>;
};

export function WhoWeAreReveal({ revealRef }: WhoWeAreRevealProps) {
  return (
    <div
      id="about"
      ref={revealRef}
      className={`${aboutSerif.className} who-we-are-reveal col-start-1 row-start-1 grid min-h-0 grid-rows-[auto_1fr] overflow-x-hidden opacity-0 pointer-events-none will-change-[opacity,transform]`}
      aria-label="About me"
    >
      <div className="about-ambient pointer-events-none" aria-hidden="true">
        <span className="about-watermark font-sans uppercase">{SITE_BRAND_NAME}</span>
        <span className="about-orb about-orb-a" />
        <span className="about-orb about-orb-b" />
        <span className="about-orb about-orb-c" />
      </div>

      <nav
        className="about-nav relative z-30 grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 pb-3 pt-6 font-sans text-[0.8125rem] uppercase tracking-[0.08em] text-brutal-fg sm:px-8 sm:pt-8 lg:px-10"
        aria-label="About section"
      >
        <div className="justify-self-start">
          <Link
            href={WHO_WE_ARE_NAV.indexHref}
            className="transition-opacity hover:opacity-55"
          >
            {WHO_WE_ARE_NAV.indexLabel}
          </Link>
          <span className="text-brutal-fg/35"> , </span>
          <span>{WHO_WE_ARE_NAV.infoLabel}</span>
        </div>

        <LiveClock variant="24h" />

        <Link
          href={WHO_WE_ARE_NAV.journalHref}
          className="justify-self-end transition-opacity hover:opacity-55"
        >
          {WHO_WE_ARE_NAV.journalLabel}
        </Link>
      </nav>

      <div className="about-stage relative z-20 mx-auto flex min-h-0 w-full max-w-[90rem] flex-1 flex-col px-5 pb-10 pt-1 sm:px-8 sm:pb-12 lg:px-10 lg:pb-14">
        <div className="about-layout">
          <header className="about-copy reveal-bento-card">
            <p className="about-eyebrow font-mono text-[10px] uppercase tracking-[0.22em] text-brutal-fg/45">
              (About me)
            </p>
            <h2 className="about-headline mt-5 font-sans text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[0.9] tracking-[-0.045em] text-brutal-fg">
              {WHO_WE_ARE_BIO.headline}
            </h2>
            <p className="about-lead mt-6 max-w-xl text-pretty text-[clamp(1.05rem,2.1vw,1.5rem)] leading-[1.45] tracking-[-0.02em] text-brutal-fg">
              {WHO_WE_ARE_BIO.lead}
            </p>
            <p className="about-trail mt-4 max-w-lg text-pretty text-[clamp(0.95rem,1.8vw,1.2rem)] leading-[1.5] tracking-[-0.015em] text-brutal-fg/68">
              {WHO_WE_ARE_BIO.trail}
            </p>

            <div className="about-cta mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={WHO_WE_ARE_BIO.readMoreHref}
                className="about-cta-primary inline-flex rounded-full bg-[#e85d4c] px-6 py-3 font-sans text-sm font-medium tracking-[-0.02em] text-white shadow-[0_16px_40px_-14px_rgba(232,93,76,0.65)] transition-transform hover:-translate-y-0.5"
              >
                {WHO_WE_ARE_BIO.readMoreLabel}
              </Link>
              <Link
                href={WHO_WE_ARE_BIO.contactHref}
                className="about-cta-secondary inline-flex rounded-full border border-brutal-fg/18 bg-white/80 px-6 py-3 font-sans text-sm font-medium tracking-[-0.02em] text-brutal-fg backdrop-blur-sm transition-colors hover:border-brutal-fg/35"
              >
                {WHO_WE_ARE_BIO.contactLabel}
              </Link>
            </div>
          </header>

          <AboutMountainScene />

          <div className="about-meta reveal-bento-card">
            <div className="about-stat-card rounded-[1rem] border border-brutal-fg/8 bg-white/92 p-4 shadow-[0_18px_44px_-24px_rgba(17,17,17,0.24)] backdrop-blur-sm">
              <p className="font-sans text-2xl font-semibold tracking-[-0.04em] text-[#e85d4c]">
                ↑ {WHO_WE_ARE_STAT.value}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-brutal-fg/50">
                {WHO_WE_ARE_STAT.label}
              </p>
              <p className="mt-2 font-sans text-[0.8125rem] leading-snug tracking-[-0.01em] text-brutal-fg/62">
                {WHO_WE_ARE_STAT.note}
              </p>
            </div>

            <div className="about-contact-card rounded-[0.85rem] border border-brutal-fg/10 bg-white px-4 py-5 shadow-[0_22px_56px_-28px_rgba(17,17,17,0.32)]">
              <p className="font-sans text-[0.875rem] font-medium leading-snug tracking-[-0.02em] text-brutal-fg">
                {WHO_WE_ARE_CONTACT_CARD.name},
                <br />
                <span className="font-normal text-brutal-fg/72">
                  {WHO_WE_ARE_CONTACT_CARD.role}
                </span>
              </p>
              <ul className="mt-4 space-y-1.5 font-sans text-[0.75rem] leading-relaxed tracking-[-0.01em] text-brutal-fg/68">
                <li>
                  <a href={`tel:${SITE_PHONE_TEL}`} className="hover:text-brutal-fg">
                    {WHO_WE_ARE_CONTACT_CARD.phone}
                  </a>
                </li>
                <li className="break-all">
                  <a
                    href={`mailto:${WHO_WE_ARE_CONTACT_CARD.email}`}
                    className="hover:text-brutal-fg"
                  >
                    {WHO_WE_ARE_CONTACT_CARD.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

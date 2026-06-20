"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { HeroTypewriterTitle } from "@/components/portfolio/HeroTypewriterTitle";
import { LiveClock } from "@/components/portfolio/LiveClock";
import { PortfolioHeader } from "@/components/portfolio/PortfolioHeader";
import { WhoWeAreReveal } from "@/components/portfolio/WhoWeAreReveal";
import { HERO_TECH_TAGS } from "@/constants/hero";
import { useHeroScrollReveal } from "@/hooks/use-hero-scroll-reveal";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { gsap } from "@/lib/gsap";

export function PortfolioHero() {
  const reducedMotion = usePrefersReducedMotion();
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const heroBackdropRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const galleryGridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useHeroScrollReveal(
    {
      scrollSection: scrollSectionRef,
      stickyContainer: stickyContainerRef,
      header: headerRef,
      leftColumn: leftColumnRef,
      rightColumn: rightColumnRef,
      footer: footerRef,
      heroBackdrop: heroBackdropRef,
      heroContent: heroContentRef,
      galleryGrid: galleryGridRef,
    },
    reducedMotion,
  );

  useGSAP(
    () => {
      gsap.from(".hero-content", {
        opacity: 0,
        y: 24,
        duration: 1.1,
        ease: "power3.out",
      });
    },
    { scope: scrollSectionRef },
  );

  return (
    <div
      id="hero"
      ref={scrollSectionRef}
      className="hero-scroll-section relative w-full bg-brutal-bg"
    >
      <div
        ref={stickyContainerRef}
        className="hero-pin-shell relative grid h-[100dvh] w-full grid-rows-[auto_1fr] overflow-hidden"
      >
        <div
          ref={headerRef}
          className="relative z-50 shrink-0 pointer-events-auto will-change-[opacity,transform]"
        >
          <PortfolioHeader />
        </div>

        <div className="hero-stage relative grid min-h-0 grid-cols-1 grid-rows-1">
          <WhoWeAreReveal revealRef={galleryGridRef} />

          <section className="hero-content relative z-20 col-start-1 row-start-1 grid min-h-0 grid-rows-[1fr_auto] text-brutal-fg">
            <div
              ref={heroBackdropRef}
              className="pointer-events-none col-start-1 row-start-1 row-span-2 bg-brutal-bg"
              aria-hidden
            />

            <div
              ref={heroContentRef}
              className="relative z-10 col-start-1 row-start-1 flex min-h-0 flex-col will-change-[opacity]"
            >
              <div className="grid min-h-0 flex-1 grid-cols-1 gap-8 px-5 py-6 sm:gap-10 sm:px-8 sm:py-8 lg:grid-cols-12 lg:gap-x-6 lg:px-10 lg:py-8">
                <div
                  ref={leftColumnRef}
                  className="flex min-h-0 flex-col will-change-transform lg:col-span-7"
                >
                  <HeroTypewriterTitle />

                  <div className="mt-4 flex flex-wrap gap-2 md:mt-5">
                    {HERO_TECH_TAGS.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-brutal-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-brutal-fg/65 md:px-4 md:py-1.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="relative mt-5 aspect-[16/7] w-full overflow-hidden border border-brutal-border md:mt-6">
                    <Image
                      src="/hero.png"
                      alt="Yudeat in front of a lake and mountains"
                      data-webgl-image
                      fill
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 800px"
                      className="hero-image object-cover object-[center_68%]"
                    />
                  </div>

                  <div className="mt-4 flex items-start gap-3 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-brutal-fg/70 md:mt-5">
                    <span className="text-base leading-none" aria-hidden>
                      →
                    </span>
                    <p>
                      Based in Kathmandu,
                      <br />
                      passionate in architect &amp; UI
                    </p>
                  </div>
                </div>

                <div
                  ref={rightColumnRef}
                  className="flex min-h-0 flex-col justify-between gap-8 will-change-transform lg:col-span-5 lg:pb-2 lg:pt-20 xl:pt-28"
                >
                  <div className="space-y-4 lg:space-y-5 lg:text-right">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest lg:justify-end">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full bg-emerald-500"
                        aria-hidden
                      />
                      Open for work
                    </div>

                    <p className="font-mono text-[10px] uppercase tracking-widest text-brutal-fg/50">
                      01 / From Nepal with love
                    </p>

                    <p className="max-w-md font-mono text-[10px] uppercase leading-relaxed tracking-widest text-brutal-fg/75 lg:ml-auto">
                      Building fast, clean web apps for real users. Open for
                      freelance / full-time based in Kathmandu Valley, NP.
                    </p>
                  </div>

                  <div className="flex flex-col gap-6 lg:items-end lg:text-right">
                    <h2 className="font-sans text-4xl font-black uppercase leading-[0.88] tracking-tighter md:text-6xl lg:text-7xl xl:text-8xl">
                      Yudeat
                    </h2>

                    <div className="flex flex-col gap-3 font-mono text-[10px] uppercase tracking-widest text-brutal-fg/60 lg:items-end">
                      <span>2024 Portfolio</span>
                      <button
                        type="button"
                        className="inline-flex w-fit items-center gap-2 rounded-full border border-brutal-border px-4 py-2 text-brutal-fg transition-colors hover:border-brutal-fg hover:bg-brutal-fg hover:text-brutal-bg"
                      >
                        Selected work
                        <span aria-hidden>↘</span>
                      </button>
                      <span className="text-brutal-fg/45">
                        <LiveClock />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <footer
              ref={footerRef}
              className="relative z-10 col-start-1 row-start-2 flex shrink-0 items-center justify-between border-t border-brutal-border px-5 py-4 font-mono text-[10px] uppercase tracking-widest text-brutal-fg/55 will-change-transform sm:px-8 sm:py-5 lg:px-10"
            >
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <span>Design &amp; code by Yudeat</span>
                <button
                  type="button"
                  className="flex items-center gap-2 transition-colors hover:text-brutal-fg"
                >
                  Climb
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-brutal-fg"
                    aria-hidden
                  />
                </button>
              </div>
              <a
                href="#contact"
                className="text-brutal-fg/45 transition-colors hover:text-brutal-fg"
              >
                Get in touch ↓
              </a>
            </footer>
          </section>
        </div>
      </div>
    </div>
  );
}

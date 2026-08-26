"use client";

import Image from "next/image";
import Link from "next/link";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  WRITER_FEATURED_WORK,
  WRITER_HERO,
  type WriterWorkItem,
} from "@/constants/writer";
import { useHorizontalDrag } from "@/hooks/use-horizontal-drag";
import { gsap } from "@/lib/gsap";

type WorkCardProps = {
  item: WriterWorkItem;
  variant?: "panel" | "carousel";
};

function WorkCard({ item, variant = "panel" }: WorkCardProps) {
  const isCarousel = variant === "carousel";

  return (
    <article
      className={`writer-work-card group${isCarousel ? " writer-work-card--carousel" : " writer-rule-y"}`}
      data-writer-reveal
    >
      <Link href={item.href} className="writer-work-card-image group block">
        <div className="writer-work-card-media">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes={
              isCarousel
                ? "(max-width: 1023px) 82vw, 33vw"
                : "(max-width: 1023px) 100vw, 33vw"
            }
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        </div>
        <span className="writer-work-card-shade" aria-hidden="true" />
      </Link>
      <div>
        <h2 className="writer-display writer-work-card-title">
          {item.title}
          {item.isOngoing ? (
            <span className="writer-work-badge writer-work-badge--ongoing">
              Ongoing
            </span>
          ) : null}
          {item.isNew && !item.isOngoing ? (
            <span className="writer-work-badge">New</span>
          ) : null}
        </h2>
        <p className="writer-work-card-copy">{item.excerpt}</p>
      </div>
    </article>
  );
}

function chunkWork<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

function SplitTitle({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <h2 className="writer-display writer-work-center-title">
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="writer-line-mask">
          <span data-writer-line>{word}</span>
        </span>
      ))}
    </h2>
  );
}

function WorkHeroBlock() {
  return (
    <>
      <div>
        <SplitTitle text={WRITER_HERO.centerTitle} />
        <p className="writer-work-center-copy" data-writer-reveal>
          {WRITER_HERO.centerSubtitle}
        </p>
      </div>
      <p className="writer-work-tip writer-work-tip--pulse">
        {WRITER_HERO.dragTip}
      </p>
    </>
  );
}

export function WriterWorkStrip() {
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);
  const panels = chunkWork(WRITER_FEATURED_WORK, 2);

  useHorizontalDrag(desktopTrackRef, setProgress);
  useHorizontalDrag(mobileTrackRef, setProgress);

  const scrollTrack = (track: HTMLElement | null, dir: number) => {
    track?.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: "smooth" });
  };

  const handleTrackKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    scrollTrack(event.currentTarget, event.key === "ArrowLeft" ? -1 : 1);
  };

  const nudge = (dir: number) => {
    // offsetParent is null when the track is display:none (hidden at this breakpoint)
    const track =
      desktopTrackRef.current?.offsetParent != null
        ? desktopTrackRef.current
        : mobileTrackRef.current;
    scrollTrack(track, dir);
  };

  useEffect(() => {
    const bar = progressBarRef.current;
    if (!bar) return;
    gsap.to(bar, {
      scaleX: Math.max(progress, 0.02),
      duration: 0.4,
      ease: "power2.out",
    });
  }, [progress]);

  return (
    <section id="work" className="writer-work-section" aria-label="Featured writing and work">
      <div className="writer-work-progress" aria-hidden="true">
        <span ref={progressBarRef} className="writer-work-progress-bar" />
      </div>

      <div className="writer-work-nav">
        <button
          type="button"
          className="writer-work-nav-btn"
          aria-label="Previous works"
          onClick={() => nudge(-1)}
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          className="writer-work-nav-btn"
          aria-label="Next works"
          onClick={() => nudge(1)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="writer-work-mobile-hero lg:hidden" data-writer-hero>
        <WorkHeroBlock />
      </div>

      <div
        ref={desktopTrackRef}
        className="writer-work-strip writer-work-strip--desktop writer-rule-x hidden lg:flex"
        role="region"
        aria-label="Featured writing carousel"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={handleTrackKey}
      >
        {panels.map((pair, panelIndex) => {
          const left = pair[0];
          const right = pair[1];

          return (
            <div key={panelIndex} className="writer-work-panel">
              {left ? <WorkCard item={left} /> : <div className="writer-rule-y" />}

              <div
                className="writer-work-center writer-rule-y"
                data-writer-hero
                // The hero repeats once per panel for visual rhythm; only the
                // first is exposed so AT announces "All writing!" a single time.
                aria-hidden={panelIndex > 0}
                {...(panelIndex > 0 ? { tabIndex: -1 } : {})}
              >
                <WorkHeroBlock />
              </div>

              {right ? (
                <WorkCard item={right} />
              ) : (
                <div className="writer-rule-y" />
              )}
            </div>
          );
        })}
      </div>

      <div
        ref={mobileTrackRef}
        className="writer-work-strip writer-work-strip--mobile writer-rule-x lg:hidden"
        role="region"
        aria-label="Featured writing carousel"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={handleTrackKey}
      >
        {WRITER_FEATURED_WORK.map((item) => (
          <div key={item.id} className="writer-work-mobile-panel">
            <WorkCard item={item} variant="carousel" />
          </div>
        ))}
      </div>
    </section>
  );
}

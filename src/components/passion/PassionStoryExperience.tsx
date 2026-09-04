"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { PassionCollectionSection } from "@/components/passion/PassionCollectionSection";
import { PassionFieldBridge } from "@/components/passion/PassionFieldBridge";
import { PassionImageField } from "@/components/passion/PassionImageField";
import { PassionLandingHero } from "@/components/passion/PassionLandingHero";
import { PassionProfileIntro } from "@/components/passion/PassionProfileIntro";
import { PASSION_COLLECTIONS } from "@/constants/passion-collections";
import { PASSION_CHAPTERS } from "@/constants/passion-story";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { gsap } from "@/lib/gsap";
import { scheduleScrollTriggerRefresh } from "@/lib/scroll-trigger";

function animateDrawPaths(svg: SVGSVGElement, reducedMotion: boolean) {
  const paths = svg.querySelectorAll<SVGGeometryElement>(".story-draw");
  if (!paths.length) return;

  paths.forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: reducedMotion ? 0 : length,
    });
  });

  if (reducedMotion) return;

  gsap.to(paths, {
    strokeDashoffset: 0,
    duration: 1.6,
    ease: "power2.out",
    stagger: 0.08,
    scrollTrigger: {
      trigger: svg,
      start: "top 82%",
      toggleActions: "play none none reverse",
    },
  });
}

export function PassionStoryExperience() {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scheduleScrollTriggerRefresh();
    const onResize = () => scheduleScrollTriggerRefresh();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      const progress = progressRef.current;
      if (!root) return;

      const ctx = gsap.context(() => {
        const chapters = root.querySelectorAll<HTMLElement>("[data-story-chapter]");
        const intro = root.querySelector<HTMLElement>("[data-story-intro]");
        const svgs = root.querySelectorAll<SVGSVGElement>("[data-story-draw]");
        const bridge = root.querySelector<HTMLElement>("[data-passion-bridge]");

        svgs.forEach((svg) => animateDrawPaths(svg, reducedMotion));

        if (intro) {
          const introItems = intro.querySelectorAll("[data-story-reveal]");
          const rule = intro.querySelector(".passion-chapter-rule");

          if (reducedMotion) {
            gsap.set(introItems, { opacity: 1, y: 0 });
            if (rule) gsap.set(rule, { scaleX: 1 });
          } else {
            gsap.from(introItems, {
              y: 40,
              opacity: 0,
              duration: 1.05,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: intro,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            });

            if (rule) {
              gsap.from(rule, {
                scaleX: 0,
                duration: 1.1,
                ease: "power3.inOut",
                scrollTrigger: {
                  trigger: intro,
                  start: "top 78%",
                  toggleActions: "play none none reverse",
                },
              });
            }
          }
        }

        const profile = root.querySelector<HTMLElement>("[data-passion-profile]");
        if (profile) {
          const profileItems = profile.querySelectorAll("[data-story-reveal]");

          if (reducedMotion) {
            gsap.set(profileItems, { opacity: 1, y: 0 });
          } else {
            gsap.from(profileItems, {
              y: 32,
              opacity: 0,
              duration: 0.95,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: profile,
                start: "top 86%",
                toggleActions: "play none none reverse",
              },
            });
          }
        }

        const collections = root.querySelectorAll<HTMLElement>(
          "[data-passion-collection]",
        );

        collections.forEach((collection) => {
          const title = collection.querySelector("[data-story-reveal]");
          const reveals = collection.querySelectorAll(".passion-collection-item");
          const media = collection.querySelectorAll(".passion-collection-media");

          if (reducedMotion) {
            gsap.set([title, ...reveals], { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" });
            return;
          }

          if (title) {
            gsap.from(title, {
              y: 32,
              opacity: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: collection,
                start: "top 84%",
                toggleActions: "play none none reverse",
              },
            });
          }

          gsap.from(reveals, {
            y: 48,
            opacity: 0,
            duration: 0.95,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: collection,
              start: "top 76%",
              toggleActions: "play none none reverse",
            },
          });

          media.forEach((node, index) => {
            gsap.from(node, {
              clipPath: "inset(8% 8% 8% 8%)",
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: node,
                start: "top 86%",
                toggleActions: "play none none reverse",
              },
              delay: index * 0.04,
            });
          });
        });

        chapters.forEach((chapter) => {
          const number = chapter.querySelector("[data-story-number]");
          const reveals = chapter.querySelectorAll("[data-story-reveal]");
          const rule = chapter.querySelector(".passion-chapter-rule");

          if (reducedMotion) {
            gsap.set([number, ...reveals], { opacity: 1, y: 0, scale: 1 });
            if (rule) gsap.set(rule, { scaleX: 1 });
            return;
          }

          if (number) {
            gsap.from(number, {
              scale: 0.9,
              opacity: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: chapter,
                start: "top 84%",
                toggleActions: "play none none reverse",
              },
            });
          }

          gsap.from(reveals, {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: chapter,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          });

          if (rule) {
            gsap.from(rule, {
              scaleX: 0,
              duration: 1,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: chapter,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            });
          }
        });

        if (bridge && !reducedMotion) {
          const bridgeReveals = bridge.querySelectorAll("[data-story-reveal]");
          gsap.from(bridgeReveals, {
            y: 36,
            opacity: 0,
            duration: 0.95,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bridge,
              start: "top 84%",
              toggleActions: "play none none reverse",
            },
          });
        }

        if (progress && !reducedMotion) {
          gsap.to(progress, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.35,
            },
          });
        }
      }, root);

      return () => ctx.revert();
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  return (
    <>
      <div
        ref={rootRef}
        className="passion-story relative min-h-screen bg-[#f7f7f5] text-brutal-fg"
      >
        <div
          className="passion-story-ambient pointer-events-none absolute inset-0"
          aria-hidden="true"
        />

        <div
          ref={progressRef}
          className="passion-progress pointer-events-none fixed left-3 top-0 z-[5] hidden h-full origin-top lg:left-5 lg:block"
          aria-hidden="true"
        />

        <PassionLandingHero />

        <main className="relative z-10">
          <section
            className="passion-story-dark relative overflow-hidden bg-[#112322] text-[#c7d0b8]"
            aria-label="The story — profile and chapters"
          >
            <div
              className="passion-story-dark-ambient pointer-events-none absolute inset-0"
              aria-hidden="true"
            />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
              <PassionProfileIntro />

              <div className="space-y-12 pb-14 sm:space-y-16 sm:pb-20 lg:space-y-0 lg:pb-24">
                {PASSION_CHAPTERS.map((chapter) => {
                  const chapterImage =
                    chapter.figures.find(
                      (figure) =>
                        figure.imageSrc &&
                        figure.imageSrc !== "/field/IMG_6730.jpg",
                    ) ?? chapter.figures.find((figure) => figure.imageSrc);

                  return (
                    <section
                      key={chapter.id}
                      id={chapter.id}
                      data-story-chapter
                      className="passion-chapter grid grid-cols-1 gap-8 py-14 sm:gap-10 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20"
                      aria-labelledby={`${chapter.id}-title`}
                    >
                      <div className="lg:col-span-7">
                        <div className="flex items-center gap-4" aria-hidden="true">
                          <span
                            data-story-number
                            className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-[#c7d0b8]/55 sm:text-[11px]"
                          >
                            Chapter {chapter.number}
                          </span>
                          <span className="passion-chapter-rule h-px flex-1 origin-left bg-[#c7d0b8]/20" />
                        </div>

                        <div className="mt-7 space-y-5 sm:mt-9 sm:space-y-6">
                          {chapter.paragraphs.map((paragraph, index) => (
                            <p
                              key={index}
                              data-story-reveal
                              id={
                                index === 0 ? `${chapter.id}-title` : undefined
                              }
                              className="passion-paragraph font-sans text-[0.9375rem] leading-[1.78] tracking-[-0.015em] text-[#c7d0b8] sm:text-[1.0625rem] sm:leading-[1.8]"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>

                      {chapterImage ? (
                        <div data-story-reveal className="lg:col-span-5">
                          <figure
                            className="passion-figure relative h-full min-h-[17rem] overflow-hidden sm:min-h-[24rem] lg:min-h-0"
                            data-story-figure={chapterImage.id}
                          >
                            <Image
                              src={chapterImage.imageSrc ?? "/hero.png"}
                              alt={chapterImage.imageAlt ?? ""}
                              fill
                              sizes="(max-width: 1024px) 92vw, 42vw"
                              className="object-cover object-center"
                            />
                            <div
                              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d1a19]/70 via-transparent to-transparent"
                              aria-hidden="true"
                            />
                            <figcaption className="absolute bottom-4 left-5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#efe8cf]/85 sm:text-[10px] sm:tracking-[0.2em]">
                              {chapterImage.caption}
                            </figcaption>
                          </figure>
                        </div>
                      ) : null}
                    </section>
                  );
                })}
              </div>
            </div>
          </section>

          <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
            <div className="space-y-4">
              {PASSION_COLLECTIONS.map((collection) => (
                <PassionCollectionSection
                  key={collection.id}
                  collection={collection}
                />
              ))}
            </div>
          </div>

          <PassionFieldBridge />
          <PassionImageField />
        </main>
      </div>
    </>
  );
}

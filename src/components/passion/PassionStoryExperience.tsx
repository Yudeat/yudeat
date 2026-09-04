"use client";

import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { PassionCollectionSection } from "@/components/passion/PassionCollectionSection";
import { PassionFieldBridge } from "@/components/passion/PassionFieldBridge";
import { PassionFigureBlock } from "@/components/passion/PassionFigure";
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
          const figures = chapter.querySelectorAll(".passion-figure");

          if (reducedMotion) {
            gsap.set([number, ...reveals], { opacity: 1, y: 0, scale: 1 });
            if (rule) gsap.set(rule, { scaleX: 1 });
            return;
          }

          if (number) {
            gsap.from(number, {
              scale: 0.82,
              opacity: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: chapter,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            });
          }

          gsap.from(reveals, {
            y: 48,
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
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            });
          }

          figures.forEach((figure, index) => {
            gsap.to(figure, {
              y: index % 2 === 0 ? -20 : 14,
              ease: "none",
              scrollTrigger: {
                trigger: chapter,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            });
          });
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
          <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
            <PassionProfileIntro />

            <div className="space-y-14 py-12 sm:space-y-24 sm:py-20 lg:space-y-28 lg:py-24">
              {PASSION_CHAPTERS.map((chapter) => (
                <section
                  key={chapter.id}
                  id={chapter.id}
                  data-story-chapter
                  className="passion-chapter grid grid-cols-1 gap-5 sm:gap-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10"
                  aria-labelledby={`${chapter.id}-title`}
                >
                  <div
                    data-story-number
                    className="passion-chapter-number-wrap lg:col-span-1"
                    aria-hidden="true"
                  >
                    <span className="passion-chapter-number font-sans text-[clamp(2rem,8vw,4rem)] font-semibold leading-none tracking-[-0.05em] text-brutal-fg">
                      {chapter.number}
                    </span>
                  </div>

                  <div className="grid gap-8 sm:gap-10 lg:col-span-11 lg:grid-cols-11 lg:gap-8">
                    <div className="space-y-4 sm:space-y-6 lg:col-span-5">
                      {chapter.paragraphs.map((paragraph, index) => (
                        <p
                          key={index}
                          data-story-reveal
                          id={index === 0 ? `${chapter.id}-title` : undefined}
                          className="passion-paragraph font-sans text-[0.9375rem] leading-[1.72] tracking-[-0.015em] text-brutal-fg/88 sm:text-[1.0625rem] sm:leading-[1.78]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    <div className="passion-figure-grid grid grid-cols-2 gap-3 sm:gap-6 lg:col-span-6 lg:gap-8">
                      {chapter.figures.map((figure) => (
                        <PassionFigureBlock key={figure.id} figure={figure} />
                      ))}
                    </div>
                  </div>

                  <div
                    className="passion-chapter-rule col-span-full mt-2 origin-left bg-gradient-to-r from-brutal-fg/22 via-brutal-fg/8 to-transparent lg:col-span-12"
                    aria-hidden="true"
                  />
                </section>
              ))}
            </div>

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

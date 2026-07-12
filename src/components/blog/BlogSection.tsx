"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { useBlogReveal } from "@/hooks/use-blog-reveal";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { getAllBlogPosts } from "@/lib/blog";
import { buildBlogBottomPath } from "@/lib/blog-curve-path";

export function BlogSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const posts = getAllBlogPosts().slice(0, 4);

  useBlogReveal({ sectionRef }, reducedMotion);

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="scroll-story-section relative w-full overflow-hidden bg-blog-bg text-white"
      aria-labelledby="blog-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(232,93,76,0.14),transparent)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-10 lg:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <p
            data-blog-header
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45"
          >
            (Blog)
          </p>
          <h2
          
            id="blog-heading"
            data-blog-header
            className="mt-5 font-sans text-[clamp(2rem,5.5vw,3.5rem)] font-semibold uppercase leading-[1.02] tracking-[-0.04em] text-blog-accent"
          >
            Notes from the studio
          </h2>
          <p
            data-blog-header
            className="mx-auto mt-5 max-w-2xl text-pretty font-sans text-[0.9375rem] uppercase leading-relaxed tracking-[0.08em] text-white/65"
          >
            Writing on product, design, and shipping real software for clients
            who care about clarity.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-x-10 sm:gap-y-14">
          {posts.map((post) => (
            <div key={post.id} data-blog-card>
              <BlogPostCard post={post} />
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center sm:mt-16">
          <Link
            data-blog-cta
            href="/blog"
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-mono text-[11px] uppercase tracking-widest text-white transition-colors hover:border-blog-accent/50 hover:bg-blog-accent/10"
          >
            See all articles
            <span
              className="flex size-7 items-center justify-center rounded-full bg-blog-accent text-white"
              aria-hidden="true"
            >
              <ArrowIcon size={12} />
            </span>
          </Link>
        </div>
      </div>

      <div className="relative z-10 h-px w-full bg-white/10" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 z-10 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blog-accent ring-4 ring-blog-bg" />
      </div>

      <svg
        className="relative z-0 -mt-px block w-full text-brutal-bg"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path className="fill-brutal-bg" d={buildBlogBottomPath()} />
      </svg>
    </section>
  );
}

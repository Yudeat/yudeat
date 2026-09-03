import type { Metadata } from "next";
import Link from "next/link";
import { BlogPageShell } from "@/components/blog/BlogPageShell";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { SITE_BRAND_NAME } from "@/constants/site";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: `Blog — ${SITE_BRAND_NAME}`,
  description:
    "Articles on web development, product design, and lessons from shipping client work.",
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <BlogPageShell>
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 sm:pb-24 sm:pt-14 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-white"
          >
            <span className="ri-arrow-left-line text-sm" aria-hidden="true" />
            Back to home
          </Link>

          <h1 className="mt-8 font-sans text-[clamp(2.25rem,6vw,4rem)] font-semibold uppercase leading-[1.02] tracking-[-0.04em] text-blog-accent">
            Inspiration for your next build
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty font-sans text-[0.9375rem] uppercase leading-relaxed tracking-[0.08em] text-white/65">
            My experience to help you ship faster, design clearer, and avoid the
            traps I have seen on real projects.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="mt-14 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-x-10 sm:gap-y-14 lg:gap-x-12">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="mt-14 text-center font-mono text-sm uppercase tracking-widest text-white/50">
            No articles yet — check back soon.
          </p>
        )}
      </div>
    </BlogPageShell>
  );
}

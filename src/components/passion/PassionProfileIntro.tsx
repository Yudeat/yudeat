import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { PASSION_PROFILE } from "@/constants/passion-story";

const passionSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export function PassionProfileIntro() {
  const { name, role, portrait, statement, quote, quoteLink, image } =
    PASSION_PROFILE;

  return (
    <section
      data-passion-profile
      aria-label="Profile introduction"
      className="passion-profile relative py-14 sm:py-20 lg:py-24"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left: identity, statement, quote, link */}
        <div className="flex flex-col lg:col-span-7">
          <div data-story-reveal className="flex items-center gap-4 sm:gap-5">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-[#efe8cf]/30 sm:h-14 sm:w-14">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                sizes="56px"
                className="object-cover object-center"
              />
            </div>
            <div>
              <p className="font-sans text-base font-semibold tracking-[-0.01em] text-[#efe8cf] sm:text-lg">
                {name}
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#c7d0b8]/65 sm:text-[11px]">
                {role}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
            {statement.map((paragraph, index) => (
              <p
                key={index}
                data-story-reveal
                className="passion-paragraph font-sans text-[0.9375rem] leading-[1.78] tracking-[-0.015em] text-[#c7d0b8] sm:text-[1.0625rem] sm:leading-[1.8]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div
            data-story-reveal
            className="mt-10 border-t border-[#c7d0b8]/15 pt-8 sm:mt-14 sm:pt-10 lg:mt-auto lg:pt-12"
          >
            <blockquote
              className={`${passionSerif.className} font-medium text-[clamp(1.625rem,2.6vw,2.5rem)] leading-[1.18] tracking-[-0.02em] text-[#efe8cf]`}
            >
              &ldquo;{quote}&rdquo;
            </blockquote>

            <Link
              href={quoteLink.href}
              className="group mt-7 inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#efe8cf]/90 transition-colors hover:text-[#efe8cf] sm:text-[11px]"
            >
              {quoteLink.label}
              <span
                className="ri-arrow-right-line text-sm leading-none transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* Right: full-height photo with caption */}
        <figure
          data-story-reveal
          className="relative min-h-[17rem] overflow-hidden sm:min-h-[24rem] lg:col-span-5 lg:min-h-0"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 92vw, 42vw"
            className="object-cover object-center"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d1a19]/70 via-transparent to-transparent"
            aria-hidden="true"
          />
          <figcaption className="absolute bottom-4 left-5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#efe8cf]/85 sm:text-[10px] sm:tracking-[0.2em]">
            {image.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
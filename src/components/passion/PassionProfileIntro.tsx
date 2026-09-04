import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import { PASSION_PROFILE } from "@/constants/passion-story";

const passionSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export function PassionProfileIntro() {
  const { title, statement, aside } = PASSION_PROFILE;

  return (
    <section
      data-passion-profile
      className="passion-profile relative border-b border-brutal-fg/[0.07] py-12 sm:py-20 lg:py-28"
      aria-labelledby="passion-profile-heading"
    >
      <h2
        id="passion-profile-heading"
        data-story-reveal
        className="font-mono text-[10px] uppercase tracking-[0.2em] text-brutal-fg/45"
      >
        {title}
      </h2>

      <div className="mt-6 grid grid-cols-1 items-start gap-10 sm:mt-8 lg:mt-10 lg:grid-cols-12 lg:gap-x-8 xl:gap-x-12">
        <p
          data-story-reveal
          className={`${passionSerif.className} passion-profile-statement font-medium text-[clamp(1.625rem,2.6vw,2.375rem)] leading-[1.18] tracking-[-0.02em] text-brutal-fg lg:col-span-7`}
        >
          {statement}
        </p>

        <aside
          data-story-reveal
          aria-label="Field note"
          className="passion-profile-aside lg:col-span-4 lg:col-start-9 lg:mt-20 xl:mt-24"
        >
          <article className="overflow-hidden bg-[#efece4] ring-1 ring-brutal-fg/[0.07]">
            <figure className="relative">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#e7e3d9]">
                <Image
                  src={aside.imageSrc}
                  alt={aside.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 24rem"
                  className="object-cover object-center"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0"
                  aria-hidden="true"
                />
                <figcaption className="absolute bottom-3 right-4 font-mono text-[9px] uppercase tracking-[0.16em] text-white/90 sm:text-[10px] sm:tracking-[0.18em]">
                  {aside.caption}
                </figcaption>
              </div>
            </figure>

            <div className="p-5 sm:p-7">
              <p
                className={`${passionSerif.className} font-medium text-[clamp(1.25rem,1.35vw,1.5rem)] leading-[1.3] tracking-[-0.015em] text-brutal-fg`}
              >
                {aside.question}
              </p>

              <p className="mt-6 flex items-center justify-between gap-4 border-t border-brutal-fg/[0.1] pt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-brutal-fg/45 sm:text-[10px] sm:tracking-[0.18em]">
                <span>{aside.kicker}</span>
                <span className="text-right">{aside.meta}</span>
              </p>
            </div>
          </article>
        </aside>
      </div>
    </section>
  );
}

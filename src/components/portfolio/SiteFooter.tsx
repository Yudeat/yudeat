"use client";

import type { FormEvent } from "react";
import { useRef, useState } from "react";
import { FOOTER_FAQS } from "@/constants/footer-faqs";
import {
  SITE_BRAND_NAME,
  SITE_CONTACT_EMAIL,
  SITE_GITHUB_URL,
  SITE_INSTAGRAM_URL,
  SITE_LINKEDIN_URL,
  SITE_LOCATION,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from "@/constants/site";
import { useContactForm } from "@/hooks/use-contact-form";
import { useFooterReveal } from "@/hooks/use-footer-reveal";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

function FooterCreditBlock({ className = "" }: { className?: string }) {
  const year = new Date().getFullYear();
  return (
    <div
      className={`font-mono text-[0.62rem] font-medium uppercase leading-relaxed tracking-[0.12em] text-brutal-fg/75 ${className}`}
    >
      <p>© 2024–{year}</p>
      <p className="mt-2 text-brutal-fg">{SITE_BRAND_NAME}</p>
      <p className="mt-1 text-brutal-fg/55">Portfolio &amp; studio</p>
    </div>
  );
}

export function SiteFooter() {
  const reducedMotion = usePrefersReducedMotion();
  const footerRef = useRef<HTMLElement>(null);
  const {
    status: contactStatus,
    error: contactError,
    handleSubmit: handleContactSubmit,
  } = useContactForm();
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "sent" | "error"
  >("idle");

  function onNewsletterSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (
      form.elements.namedItem("email") as HTMLInputElement | null
    )?.value?.trim();
    if (!email) {
      setNewsletterStatus("error");
      return;
    }
    window.location.href = `mailto:${SITE_CONTACT_EMAIL}?subject=${encodeURIComponent("Newsletter signup")}&body=${encodeURIComponent(`Please add this email to updates: ${email}`)}`;
    setNewsletterStatus("sent");
    form.reset();
  }

  useFooterReveal({ footerRef }, reducedMotion);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="scroll-story-section relative min-h-[100dvh] overflow-hidden bg-brutal-bg px-5 py-[max(8vh,3rem)] text-brutal-fg sm:px-10 lg:px-16"
    >
      <div className="mx-auto flex min-h-[calc(100dvh-6rem)] w-full max-w-7xl flex-col justify-center">
        <div data-footer-hero>
          <p className="inline-flex items-center gap-2 font-mono text-[0.68rem] font-medium uppercase tracking-widest text-brutal-fg/70">
            <span className="size-1.5 rounded-full bg-brutal-fg" aria-hidden />
            Get in touch
          </p>
          <h2 className="mt-5 max-w-[34rem] text-balance font-sans text-[clamp(2.4rem,7vw,5.8rem)] font-black uppercase leading-[0.95] tracking-tighter text-brutal-fg">
            Got plans? Let&apos;s help you turn them into something real
          </h2>
          <p className="mt-5 font-mono text-sm uppercase tracking-widest text-brutal-fg/60 sm:text-base">
            Tell me what&apos;s on your mind
          </p>
        </div>

        <div
          data-footer-contact
          className="mt-10 border-t border-brutal-border pt-10 sm:mt-14 sm:pt-14"
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(220px,0.72fr)_minmax(0,1.8fr)] lg:gap-20">
            <aside className="h-fit rounded-xl border border-brutal-border bg-brutal-bg p-5 text-sm text-brutal-fg/80 sm:p-6">
              <div
                className="mb-8 flex size-9 items-center justify-center rounded-lg border border-brutal-border bg-brutal-fg text-brutal-bg"
                aria-hidden
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3l1.55 4.8 5.03-1.05-3.48 3.77 3.48 3.77-5.03-1.05L12 18l-1.55-4.76-5.03 1.05 3.48-3.77-3.48-3.77 5.03 1.05L12 3Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <address className="not-italic leading-relaxed">
                <a
                  className="block transition hover:text-brutal-fg"
                  href={`tel:${SITE_PHONE_TEL}`}
                >
                  {SITE_PHONE_DISPLAY}
                </a>
                <a
                  className="mt-2 block font-medium text-brutal-fg transition hover:opacity-70"
                  href={`mailto:${SITE_CONTACT_EMAIL}`}
                >
                  {SITE_CONTACT_EMAIL}
                </a>
                <span className="mt-2 block text-brutal-fg/60">
                  {SITE_LOCATION}
                </span>
              </address>
            </aside>

            <div>
              <h3 className="font-sans text-[clamp(1.35rem,2vw,2rem)] font-black uppercase tracking-tighter text-brutal-fg">
                Send me a message
              </h3>
              <form
                className="mt-6 grid gap-5"
                aria-label="Contact form"
                onSubmit={handleContactSubmit}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2 font-mono text-[0.68rem] font-medium uppercase tracking-widest text-brutal-fg/70">
                    Name
                    <input
                      className="h-12 rounded-lg border border-brutal-border bg-brutal-bg px-4 font-sans text-sm normal-case tracking-normal text-brutal-fg outline-none transition placeholder:text-brutal-fg/40 focus:border-brutal-fg focus:ring-4 focus:ring-brutal-fg/10"
                      type="text"
                      name="name"
                      placeholder="Jane Smith"
                      required
                    />
                  </label>
                  <label className="grid gap-2 font-mono text-[0.68rem] font-medium uppercase tracking-widest text-brutal-fg/70">
                    Email
                    <input
                      className="h-12 rounded-lg border border-brutal-border bg-brutal-bg px-4 font-sans text-sm normal-case tracking-normal text-brutal-fg outline-none transition placeholder:text-brutal-fg/40 focus:border-brutal-fg focus:ring-4 focus:ring-brutal-fg/10"
                      type="email"
                      name="email"
                      placeholder="jane@example.com"
                      required
                    />
                  </label>
                </div>
                <label className="grid gap-2 font-mono text-[0.68rem] font-medium uppercase tracking-widest text-brutal-fg/70">
                  Message
                  <textarea
                    className="min-h-40 resize-y rounded-lg border border-brutal-border bg-brutal-bg px-4 py-3 font-sans text-sm normal-case tracking-normal text-brutal-fg outline-none transition placeholder:text-brutal-fg/40 focus:border-brutal-fg focus:ring-4 focus:ring-brutal-fg/10"
                    name="message"
                    placeholder="Tell us about your new idea"
                    required
                  />
                </label>
                <button
                  type="submit"
                  disabled={contactStatus === "sending"}
                  className="mt-1 h-12 w-full rounded-full border border-brutal-border bg-brutal-fg px-8 font-mono text-sm font-medium uppercase tracking-widest text-brutal-bg transition hover:bg-brutal-bg hover:text-brutal-fg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brutal-fg/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-52"
                >
                  {contactStatus === "sending" ? "Sending…" : "Submit"}
                </button>
                {contactStatus === "sent" ? (
                  <p className="font-mono text-sm text-brutal-fg/70" role="status">
                    Message sent. I&apos;ll get back to you soon.
                  </p>
                ) : null}
                {contactStatus === "error" && contactError ? (
                  <p className="text-sm text-red-800" role="alert">
                    {contactError}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </div>

        <section
          data-footer-faq
          className="mt-16 grid gap-10 border-t border-brutal-border pt-12 sm:mt-20 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:gap-20"
        >
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-brutal-border px-3 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-widest text-brutal-fg/70">
              <span className="size-1.5 rounded-full bg-brutal-fg" aria-hidden />
              FAQ
            </p>
            <h3 className="mt-5 max-w-md text-balance font-sans text-[clamp(2rem,4.6vw,4rem)] font-black uppercase leading-[0.98] tracking-tighter text-brutal-fg">
              Answers to the questions I hear most often.
            </h3>
          </div>

          <div className="grid gap-3">
            {FOOTER_FAQS.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-brutal-border bg-brutal-bg text-brutal-fg"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium outline-none transition hover:bg-brutal-fg/5 focus-visible:ring-4 focus-visible:ring-brutal-fg/10 [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <span
                    className="grid size-5 shrink-0 place-items-center text-brutal-fg/70 transition-transform group-open:rotate-180"
                    aria-hidden
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="m6 9 6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="px-5 pb-5 font-mono text-sm leading-relaxed text-brutal-fg/65">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section
          data-footer-newsletter
          className="mt-20 border-t border-brutal-border pt-14 sm:mt-24 sm:pt-16"
          aria-label="Newsletter signup"
        >
          <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
            <p className="text-balance font-mono text-[0.7rem] font-bold uppercase leading-snug tracking-[0.2em] text-brutal-fg sm:text-xs sm:tracking-[0.22em]">
              Sign up for the latest work, news &amp; insights
            </p>
            <p className="mt-4 max-w-md text-pretty font-mono text-sm uppercase tracking-widest text-brutal-fg/70 sm:text-base">
              New work, notes, and launches straight to your inbox.
            </p>
            <form className="mt-8 w-full max-w-md" onSubmit={onNewsletterSubmit}>
              <label
                className="mb-2 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-brutal-fg"
                htmlFor="footer-newsletter-email"
              >
                Email address
              </label>
              <div className="flex items-center gap-3 border-b-2 border-brutal-border pb-2.5 transition-colors focus-within:border-brutal-fg">
                <input
                  id="footer-newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="min-w-0 flex-1 bg-transparent text-left font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-brutal-fg outline-none placeholder:font-medium placeholder:normal-case placeholder:tracking-normal placeholder:text-brutal-fg/40 sm:text-sm"
                  required
                />
                <button
                  type="submit"
                  className="shrink-0 font-mono text-sm font-bold uppercase tracking-[0.12em] text-brutal-fg transition hover:opacity-55"
                  aria-label="Submit newsletter signup"
                >
                  →
                </button>
              </div>
              {newsletterStatus === "sent" ? (
                <p className="mt-3 font-mono text-xs text-brutal-fg/70" role="status">
                  Thanks — opening your email app to confirm.
                </p>
              ) : null}
              {newsletterStatus === "error" ? (
                <p className="mt-3 font-mono text-xs text-red-800" role="alert">
                  Enter an email address first.
                </p>
              ) : null}
            </form>
          </div>
        </section>

        <section
          className="mt-14 border-t border-brutal-border pt-12 sm:mt-16 sm:pt-14"
          aria-label="Site footer"
        >
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-6 xl:gap-10">
            <nav className="flex flex-1 flex-col gap-3 font-mono text-[0.62rem] font-medium uppercase tracking-[0.14em] text-brutal-fg lg:max-w-xs">
              <a
                className="flex items-center justify-between gap-2 border-b border-transparent pb-1 transition hover:border-brutal-fg/30"
                href={SITE_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram <span aria-hidden>→</span>
              </a>
              <a
                className="flex items-center justify-between gap-2 border-b border-transparent pb-1 transition hover:border-brutal-fg/30"
                href={SITE_LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <span aria-hidden>→</span>
              </a>
              <a
                className="flex items-center justify-between gap-2 border-b border-transparent pb-1 transition hover:border-brutal-fg/30"
                href={SITE_GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Github <span aria-hidden>→</span>
              </a>
            </nav>

            <div className="flex min-w-0 shrink-0 flex-col items-center justify-center gap-5 px-0 py-2 text-center sm:gap-6 lg:px-4 xl:px-8">
              <p
                data-footer-brand
                className="select-none text-center font-sans text-[clamp(2.75rem,12vw,7.5rem)] font-black uppercase leading-[0.82] tracking-tighter text-brutal-fg sm:text-[clamp(3rem,14vw,9rem)] lg:text-[clamp(3.25rem,12vw,10rem)]"
              >
                YUDEAT
              </p>
              <FooterCreditBlock className="text-center" />
            </div>

            <div className="flex-1" aria-hidden />
          </div>
        </section>
      </div>
    </footer>
  );
}

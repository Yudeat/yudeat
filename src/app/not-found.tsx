import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-brutal-bg px-6 text-center text-brutal-fg">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brutal-fg/50">
        404
      </p>
      <h1 className="font-sans text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="max-w-md font-sans text-sm leading-relaxed text-brutal-fg/65">
        The page you&apos;re looking for may have moved or never existed.
      </p>
      <Link
        href="/"
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-brutal-border px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest transition-colors hover:border-brutal-fg"
      >
        Back to home
      </Link>
    </div>
  );
}

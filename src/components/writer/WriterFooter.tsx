import Link from "next/link";
import { WRITER_FOOTER } from "@/constants/writer";

export function WriterFooter() {
  return (
    <footer className="writer-footer">
      <div className="flex flex-wrap items-center gap-3">
        <span>{WRITER_FOOTER.brand} ©</span>
      </div>

      <nav className="flex flex-wrap items-center gap-2" aria-label="Social links">
        {WRITER_FOOTER.social.map((link, index) => (
          <span key={link.label} className="flex items-center gap-2">
            {index > 0 ? (
              <span className="text-[rgb(17_17_17/0.35)]" aria-hidden="true">
                ·
              </span>
            ) : null}
            <Link
              href={link.href}
              className="hover:opacity-60"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {link.label}
            </Link>
          </span>
        ))}
      </nav>
    </footer>
  );
}

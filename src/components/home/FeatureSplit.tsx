import Link from "next/link";
import { CardArt } from "../CardArt";
import type { ArtTheme } from "@/lib/catalog";

export type FeatureSplitProps = {
  eyebrow: string;
  headingLines: string[];
  body: string;
  links: { label: string; href: string }[];
  art: { theme: ArtTheme; title: string }[];
  flip?: boolean;
  tone?: "light" | "dark";
};

export function FeatureSplit({
  eyebrow,
  headingLines,
  body,
  links,
  art,
  flip = false,
  tone = "light",
}: FeatureSplitProps) {
  const dark = tone === "dark";

  return (
    <section className={dark ? "bg-ink text-white" : "bg-white text-ink"}>
      <div className="wrap grid items-center gap-12 py-20 lg:grid-cols-2">
        <div className={flip ? "lg:order-2" : ""}>
          <p className={`eyebrow ${dark ? "text-accent" : ""}`}>{eyebrow}</p>

          <h2
            className={`display mt-4 text-[clamp(2.5rem,6.5vw,4.75rem)] ${
              dark ? "text-[#f5f5f5]" : ""
            }`}
          >
            {headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <p
            className={`mt-5 max-w-lg text-base ${
              dark ? "text-white/65" : "text-ink-muted"
            }`}
          >
            {body}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {links.map((link, i) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={
                  i === 0
                    ? dark
                      ? "btn-accent"
                      : "btn-solid"
                    : dark
                      ? "btn-ghost-light"
                      : "btn-outline"
                }
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>

        <div className={`grid grid-cols-3 gap-3 sm:gap-4 ${flip ? "lg:order-1" : ""}`}>
          {art.map((a, i) => (
            <div
              key={a.title}
              className={`aspect-[3/4] overflow-hidden rounded-lg border ${
                dark ? "border-white/15" : "border-line"
              } shadow-[0_16px_40px_rgba(22,24,29,0.18)] transition-transform duration-500 hover:-translate-y-2`}
              style={{ marginTop: i === 1 ? "1.75rem" : undefined }}
            >
              <CardArt theme={a.theme} title={a.title} className="h-full w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

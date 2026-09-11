import Link from "next/link";
import { CardArt } from "../CardArt";
import type { ArtTheme } from "@/lib/catalog";

const FAN: { theme: ArtTheme; title: string }[] = [
  { theme: "diamond", title: "Vintage Diamond Signature" },
  { theme: "prism", title: "Prism Refractor Chase" },
  { theme: "void", title: "Void Collector Mythic" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* Ambient colour wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 70% at 18% 20%, rgba(245,158,11,0.22), transparent 62%), radial-gradient(55% 65% at 82% 75%, rgba(56,189,248,0.18), transparent 60%)",
        }}
      />

      <div className="wrap relative grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_1fr] lg:py-28">
        <div>
          <p className="eyebrow text-accent">Trusted Marketplace</p>

          <h1 className="display mt-4 text-[clamp(3rem,9vw,6.5rem)] text-[#f5f5f5]">
            Card TCG Exchange
          </h1>

          <p className="mt-6 max-w-xl text-base text-white/65">
            Sealed boxes, sports cards and TCG singles — vintage classics through modern
            rookies. Genuine product, shipped straight.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/collections/all" className="btn-accent">
              SHOP ALL CARDS
            </Link>
            <Link href="/collections/singles-autographs" className="btn-ghost-light">
              BROWSE AUTOGRAPHS
            </Link>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-6">
            {[
              ["4.8\u2605", "1,847 reviews"],
              ["30-Day", "returns window"],
              ["Free", "shipping over $75"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-3xl tracking-wide text-accent">{value}</dt>
                <dd className="mt-1 text-xs text-white/55">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Fanned card stack */}
        <div className="relative mx-auto flex h-[340px] w-full max-w-md items-center justify-center sm:h-[420px]">
          {FAN.map((card, i) => (
            <div
              key={card.title}
              className="absolute aspect-[3/4] w-44 overflow-hidden rounded-xl border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:-translate-y-3 sm:w-56"
              style={{
                transform: `translateX(${(i - 1) * 58}%) rotate(${(i - 1) * 9}deg)`,
                zIndex: i === 1 ? 3 : 2 - Math.abs(i - 1),
              }}
            >
              <CardArt theme={card.theme} title={card.title} className="h-full w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Stars } from "../Stars";

const BREAKDOWN = [
  { stars: 5, percent: 88 },
  { stars: 4, percent: 9 },
  { stars: 3, percent: 2 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 0 },
];

const REVIEWS = [
  {
    quote:
      "The hobby box arrived sealed and shipped the same day I ordered. Packaging was better than I expected for the price.",
    name: "D. Martinez",
    place: "Austin, TX",
  },
  {
    quote:
      "Good spread of sealed Pokémon product and the pricing held up against my local shop. Everything arrived undamaged.",
    name: "J. Thompson",
    place: "Seattle, WA",
  },
  {
    quote:
      "Asked a few questions about certification before buying an autograph and got a straight answer within the hour.",
    name: "R. Williams",
    place: "Chicago, IL",
  },
  {
    quote:
      "Ordered a case and it turned up with the factory seal intact. Tracking updated the same evening.",
    name: "M. Chen",
    place: "San Francisco, CA",
  },
  {
    quote:
      "Picked up vintage singles that matched the condition notes exactly. No surprises, well protected in transit.",
    name: "K. Johnson",
    place: "Denver, CO",
  },
  {
    quote:
      "Been collecting a long time and the descriptions here are honest about wear, which is rarer than it should be.",
    name: "B. Anderson",
    place: "Kansas City, MO",
  },
];

export function Reviews() {
  return (
    <section className="bg-white">
      <div className="wrap py-20">
        <div className="text-center">
          <p className="eyebrow">Customer Reviews</p>
          <h2 className="display mt-3 text-[clamp(2.25rem,5vw,3.75rem)]">
            What Our Collectors Say
          </h2>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[300px_1fr]">
          <div className="rounded-card border border-line bg-surface p-6 text-center lg:text-left">
            <p className="font-display text-6xl leading-none">4.8</p>
            <Stars className="mt-2 justify-center lg:justify-start" />
            <p className="mt-2 text-sm text-ink-muted">Based on 1,847 reviews</p>

            <ul className="mt-5 space-y-2">
              {BREAKDOWN.map((row) => (
                <li key={row.stars} className="flex items-center gap-3">
                  <span className="w-7 shrink-0 text-xs text-ink-muted">{row.stars}★</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                    <span
                      className="block h-full rounded-full bg-accent"
                      style={{ width: `${row.percent}%` }}
                    />
                  </span>
                  <span className="w-9 shrink-0 text-right text-xs text-ink-muted">
                    {row.percent}%
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {REVIEWS.map((r) => (
              <li
                key={r.name}
                className="flex flex-col rounded-card border border-line bg-surface p-5"
              >
                <Stars />
                <blockquote className="mt-3 flex-1 text-sm text-ink-muted">
                  “{r.quote}”
                </blockquote>
                <footer className="mt-4 border-t border-line pt-3">
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-ink-faint">
                    {r.place} · <span className="text-accent-deep">✓ Verified</span>
                  </p>
                </footer>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

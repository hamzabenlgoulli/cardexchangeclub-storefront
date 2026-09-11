"use client";

import { useState } from "react";

const PERKS = ["Early product alerts", "Collector-only deals", "Restock notifications"];

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="bg-ink text-white">
      <div className="wrap py-20 text-center">
        <p className="eyebrow text-accent">Collector&apos;s Newsletter</p>

        <h2 className="display mx-auto mt-3 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] text-[#f5f5f5]">
          Get <em className="not-italic text-accent">Early Access</em> to Premium Releases
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-white/65">
          Be the first to know about new sports card drops, sealed box breaks, Magic and
          Pokémon set releases, and collector discounts. No spam, just cards.
        </p>

        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {PERKS.map((perk) => (
            <li key={perk} className="flex items-center gap-2 text-sm text-white/70">
              <span className="text-accent" aria-hidden>
                ✓
              </span>
              {perk}
            </li>
          ))}
        </ul>

        {sent ? (
          <p className="mx-auto mt-8 max-w-md rounded-[3px] border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
            🎉 You&apos;re in — check your inbox to confirm your subscription.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-[3px] border border-white/25 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-accent"
            />
            <button type="submit" className="btn-accent shrink-0">
              SUBSCRIBE
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-white/40">
          Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  );
}

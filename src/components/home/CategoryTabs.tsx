"use client";

import Link from "next/link";
import { useState } from "react";
import { ProductCard } from "../ProductCard";
import { COLLECTIONS, productsIn } from "@/lib/catalog";

export function CategoryTabs() {
  const [active, setActive] = useState(COLLECTIONS[0]!.handle);
  const collection = COLLECTIONS.find((c) => c.handle === active)!;
  const products = productsIn(collection.category).slice(0, 8);

  return (
    <section className="bg-surface-alt">
      <div className="wrap py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Browse Collections</p>
            <h2 className="display mt-3 text-[clamp(2.25rem,5vw,3.75rem)]">
              Shop by Category
            </h2>
          </div>
          <Link href="/collections/all" className="btn-outline bg-white">
            VIEW ALL PRODUCTS
          </Link>
        </div>

        <div className="no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1">
          {COLLECTIONS.map((c) => (
            <button
              key={c.handle}
              type="button"
              onClick={() => setActive(c.handle)}
              aria-pressed={active === c.handle}
              className={`shrink-0 rounded-[3px] border px-4 py-2.5 font-display text-base tracking-[0.1em] transition-colors ${
                active === c.handle
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-ink hover:bg-surface"
              }`}
            >
              {c.title.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <div className="flex flex-col justify-between rounded-card border border-line bg-ink p-6 text-white">
            <div>
              <h3 className="display text-3xl text-[#f5f5f5]">{collection.title}</h3>
              <p className="mt-3 text-sm text-white/65">{collection.tagline}</p>
              <p className="mt-3 text-sm text-white/50">{collection.description}</p>
            </div>
            <Link
              href={`/collections/${collection.handle}`}
              className="btn-ghost-light mt-6 w-full"
            >
              SHOP ALL
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

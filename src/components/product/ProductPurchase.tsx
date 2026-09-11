"use client";

import { useEffect, useRef, useState } from "react";
import { CardArt } from "../CardArt";
import { Stars } from "../Stars";
import { useCart } from "@/lib/cart";
import { discountPercent, isOnSale, type Product } from "@/lib/catalog";
import { money } from "@/lib/format";

const ASSURANCES = ["100% Authentic", "Secure Packaging", "Fast Shipping"];

export function ProductPurchase({ product }: { product: Product }) {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [angle, setAngle] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const buyRef = useRef<HTMLDivElement>(null);

  const off = discountPercent(product);
  const soldOut = product.stock <= 0;

  // Reveal the sticky bar once the main buy box scrolls out of view.
  useEffect(() => {
    const el = buyRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry!.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="overflow-hidden rounded-card border border-line bg-surface">
            <CardArt
              theme={product.art}
              title={`${product.title} view ${angle + 1}`}
              className="aspect-square w-full"
            />
          </div>

          <div className="mt-3 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setAngle(i)}
                aria-label={`View ${i + 1}`}
                aria-pressed={angle === i}
                className={`overflow-hidden rounded-[3px] border transition-colors ${
                  angle === i ? "border-ink" : "border-line hover:border-ink/40"
                }`}
              >
                <CardArt
                  theme={product.art}
                  title={`${product.title} view ${i + 1}`}
                  className="aspect-square w-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Buy box */}
        <div ref={buyRef}>
          <p className="text-xs uppercase tracking-[0.14em] text-ink-faint">
            {product.brand}
          </p>

          <h1 className="display mt-2 text-[clamp(1.9rem,4vw,2.9rem)]">
            {product.title}
          </h1>

          <div className="mt-3 flex items-center gap-2">
            <Stars />
            <span className="text-xs text-ink-muted">4.8 · 1,847 reviews</span>
          </div>

          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="font-display text-4xl tracking-wide">
              {money(product.price)}
            </span>
            {isOnSale(product) && (
              <>
                <span className="text-lg text-ink-faint line-through">
                  {money(product.compareAt!)}
                </span>
                <span className="rounded-[3px] bg-sale px-2 py-1 font-display text-sm tracking-[0.1em] text-white">
                  SAVE {off}%
                </span>
              </>
            )}
          </div>

          <p className="mt-1 text-xs text-ink-faint">
            Tax included · Shipping calculated at checkout
          </p>

          <p className="mt-5 text-ink-muted">{product.blurb}</p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {ASSURANCES.map((a) => (
              <li
                key={a}
                className="rounded-[3px] border border-line bg-surface px-3 py-1.5 text-xs font-medium"
              >
                ✓ {a}
              </li>
            ))}
          </ul>

          <p className="mt-5 text-sm">
            {soldOut ? (
              <span className="font-medium text-sale">Sold out</span>
            ) : product.stock <= 3 ? (
              <span className="font-medium text-accent-deep">
                Only {product.stock} left in stock
              </span>
            ) : (
              <span className="font-medium text-emerald-700">
                In stock — {product.stock} available
              </span>
            )}
          </p>

          {/* Quantity + actions */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-[3px] border border-line">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="grid h-12 w-12 place-items-center text-lg hover:bg-surface"
              >
                −
              </button>
              <span className="w-12 text-center font-display text-xl">{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() =>
                  setQuantity((q) => Math.min(Math.max(product.stock, 1), q + 1))
                }
                className="grid h-12 w-12 place-items-center text-lg hover:bg-surface"
              >
                +
              </button>
            </div>

            <button
              type="button"
              disabled={soldOut}
              onClick={() => add(product.handle, quantity)}
              className="btn-solid h-12 flex-1 min-w-45 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {soldOut ? "SOLD OUT" : "ADD TO CART"}
            </button>
          </div>

          <button
            type="button"
            disabled={soldOut}
            onClick={() => add(product.handle, quantity)}
            className="btn-accent mt-3 h-12 w-full disabled:cursor-not-allowed disabled:opacity-40"
          >
            BUY IT NOW
          </button>

          <dl className="mt-7 divide-y divide-line border-y border-line text-sm">
            <Row label="SKU" value={product.sku} />
            <Row label="Configuration" value={product.configuration} />
            {product.specs.map((s) => (
              <Row key={s.label} label={s.label} value={s.value} />
            ))}
          </dl>
        </div>
      </div>

      {/* Sticky purchase bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 backdrop-blur transition-transform duration-300 ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="wrap flex items-center gap-4 py-3">
          <CardArt
            theme={product.art}
            title={product.title}
            className="hidden h-11 w-11 shrink-0 rounded-[3px] sm:block"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{product.title}</p>
            <p className="font-display text-lg tracking-wide">{money(product.price)}</p>
          </div>
          <button
            type="button"
            disabled={soldOut}
            onClick={() => add(product.handle, quantity)}
            className="btn-accent shrink-0 disabled:opacity-40"
          >
            {soldOut ? "SOLD OUT" : "ADD TO CART"}
          </button>
        </div>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 py-2.5">
      <dt className="text-ink-faint">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}

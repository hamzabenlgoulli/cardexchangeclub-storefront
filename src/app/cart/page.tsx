"use client";

import Link from "next/link";
import { useState } from "react";
import { CardArt } from "@/components/CardArt";
import { useCart } from "@/lib/cart";
import { FREE_SHIPPING_THRESHOLD, money } from "@/lib/format";

export default function CartPage() {
  const { detailed, subtotal, setQuantity, remove, clear, count } = useCart();
  const [placed, setPlaced] = useState(false);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 9.95;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <div className="wrap flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-display text-6xl text-accent">🎉</p>
        <h1 className="display mt-4 text-[clamp(2.25rem,5vw,3.5rem)]">Order Placed</h1>
        <p className="mt-3 max-w-md text-ink-muted">
          This is a demo storefront, so no payment was taken and nothing will ship. In a
          real build this is where checkout would hand off to a payment provider.
        </p>
        <Link href="/collections/all" className="btn-solid mt-6">
          KEEP SHOPPING
        </Link>
      </div>
    );
  }

  if (detailed.length === 0) {
    return (
      <div className="wrap flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="display text-[clamp(2.25rem,5vw,3.5rem)]">Your cart is empty</h1>
        <p className="mt-3 text-ink-muted">
          Browse sealed boxes, singles and pre-orders to get started.
        </p>
        <Link href="/collections/all" className="btn-solid mt-6">
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="wrap py-12">
      <h1 className="display text-[clamp(2.25rem,5vw,3.5rem)]">
        Your Cart <span className="text-ink-faint">({count})</span>
      </h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <ul className="border-t border-line">
            {detailed.map(({ product, quantity }) => (
              <li key={product.handle} className="flex gap-4 border-b border-line py-5">
                <Link href={`/products/${product.handle}`} className="shrink-0">
                  <CardArt
                    theme={product.art}
                    title={product.title}
                    className="h-24 w-24 rounded-card border border-line sm:h-28 sm:w-28"
                  />
                </Link>

                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-[0.12em] text-ink-faint">
                    {product.brand}
                  </p>
                  <Link
                    href={`/products/${product.handle}`}
                    className="mt-0.5 block font-medium hover:text-accent-deep"
                  >
                    {product.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-ink-faint">{product.sku}</p>

                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    <div className="flex items-center rounded-[3px] border border-line">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQuantity(product.handle, quantity - 1)}
                        className="grid h-9 w-9 place-items-center hover:bg-surface"
                      >
                        −
                      </button>
                      <span className="w-9 text-center text-sm">{quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQuantity(product.handle, quantity + 1)}
                        className="grid h-9 w-9 place-items-center hover:bg-surface"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(product.handle)}
                      className="text-xs text-ink-faint underline underline-offset-2 hover:text-sale"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <p className="shrink-0 font-display text-xl tracking-wide">
                  {money(product.price * quantity)}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex justify-between">
            <Link
              href="/collections/all"
              className="text-sm text-ink-muted underline underline-offset-4 hover:text-ink"
            >
              ← Continue shopping
            </Link>
            <button
              type="button"
              onClick={clear}
              className="text-sm text-ink-faint underline underline-offset-4 hover:text-sale"
            >
              Clear cart
            </button>
          </div>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-card border border-line bg-surface p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-2xl tracking-[0.04em]">Order Summary</h2>

          <dl className="mt-5 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-muted">Subtotal</dt>
              <dd className="font-medium">{money(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-muted">Shipping</dt>
              <dd className="font-medium">
                {shipping === 0 ? (
                  <span className="text-accent-deep">Free</span>
                ) : (
                  money(shipping)
                )}
              </dd>
            </div>
          </dl>

          {subtotal < FREE_SHIPPING_THRESHOLD && (
            <p className="mt-3 rounded-[3px] bg-white px-3 py-2 text-xs text-ink-muted">
              Add {money(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping.
            </p>
          )}

          <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
            <span className="font-display text-xl tracking-[0.04em]">Total</span>
            <span className="font-display text-3xl tracking-wide">{money(total)}</span>
          </div>

          <p className="mt-1 text-xs text-ink-faint">Tax included where applicable.</p>

          <button
            type="button"
            onClick={() => {
              clear();
              setPlaced(true);
            }}
            className="btn-accent mt-5 w-full"
          >
            CHECKOUT
          </button>

          <p className="mt-3 text-center text-xs text-ink-faint">
            Demo checkout — no payment is processed.
          </p>
        </aside>
      </div>
    </div>
  );
}

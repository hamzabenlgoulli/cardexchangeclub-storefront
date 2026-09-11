"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CardArt } from "./CardArt";
import { useCart } from "@/lib/cart";
import { FREE_SHIPPING_THRESHOLD, money } from "@/lib/format";

export function CartDrawer() {
  const { isOpen, close, detailed, subtotal, setQuantity, remove, count } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  if (!isOpen) return null;

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="fixed inset-0 z-50">
      <button aria-label="Close cart" className="absolute inset-0 bg-ink/50" onClick={close} />

      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
          <h2 className="font-display text-2xl tracking-[0.04em]">
            Your Cart {count > 0 && <span className="text-ink-faint">({count})</span>}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-[3px] hover:bg-surface"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {detailed.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <p className="font-display text-3xl tracking-[0.04em]">Your cart is empty</p>
            <p className="text-ink-muted">
              Browse sealed boxes, singles and pre-orders to get started.
            </p>
            <Link href="/collections/all" onClick={close} className="btn-solid mt-2">
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <>
            <div className="shrink-0 border-b border-line bg-surface px-5 py-3">
              {remaining > 0 ? (
                <p className="text-xs text-ink-muted">
                  You&apos;re <strong className="text-ink">{money(remaining)}</strong> away
                  from free shipping
                </p>
              ) : (
                <p className="text-xs font-medium text-accent-deep">
                  🎉 You&apos;ve unlocked free shipping
                </p>
              )}
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <ul className="flex-1 overflow-y-auto px-5">
              {detailed.map(({ product, quantity }) => (
                <li key={product.handle} className="flex gap-3 border-b border-line py-4">
                  <Link
                    href={`/products/${product.handle}`}
                    onClick={close}
                    className="shrink-0"
                  >
                    <CardArt
                      theme={product.art}
                      title={product.title}
                      className="h-20 w-20 rounded-[3px]"
                    />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${product.handle}`}
                      onClick={close}
                      className="line-clamp-2 text-sm font-medium hover:text-accent-deep"
                    >
                      {product.title}
                    </Link>
                    <p className="mt-0.5 text-xs text-ink-faint">{product.sku}</p>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="flex items-center rounded-[3px] border border-line">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => setQuantity(product.handle, quantity - 1)}
                          className="grid h-8 w-8 place-items-center hover:bg-surface"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => setQuantity(product.handle, quantity + 1)}
                          className="grid h-8 w-8 place-items-center hover:bg-surface"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-display text-lg tracking-wide">
                        {money(product.price * quantity)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(product.handle)}
                      className="mt-1.5 text-xs text-ink-faint underline underline-offset-2 hover:text-sale"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="shrink-0 border-t border-line px-5 py-4">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-xl tracking-[0.04em]">Subtotal</span>
                <span className="font-display text-2xl tracking-wide">{money(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-ink-faint">
                Tax included. Shipping calculated at checkout.
              </p>

              <Link href="/cart" onClick={close} className="btn-accent mt-3 w-full">
                CHECKOUT
              </Link>
              <button
                type="button"
                onClick={close}
                className="mt-2 w-full py-2 text-sm text-ink-muted underline underline-offset-4 hover:text-ink"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

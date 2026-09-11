"use client";

import Link from "next/link";
import { CardArt } from "./CardArt";
import { useCart } from "@/lib/cart";
import { discountPercent, isOnSale, type Product } from "@/lib/catalog";
import { money } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const off = discountPercent(product);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-card border border-line bg-surface transition-shadow hover:shadow-[0_10px_30px_rgba(22,24,29,0.10)]">
      <Link
        href={`/products/${product.handle}`}
        className="relative block aspect-square overflow-hidden bg-white"
      >
        <CardArt
          theme={product.art}
          title={product.title}
          className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]"
        />

        <div className="absolute left-2 top-2 flex flex-col items-start gap-1">
          {off !== null && (
            <span className="rounded-[3px] bg-sale px-2 py-1 font-display text-xs tracking-[0.1em] text-white">
              SALE −{off}%
            </span>
          )}
          {product.badge && (
            <span className="rounded-[3px] bg-ink/85 px-2 py-1 font-display text-xs tracking-[0.1em] text-white">
              {product.badge.toUpperCase()}
            </span>
          )}
        </div>

        {product.stock <= 3 && product.stock > 0 && (
          <span className="absolute bottom-2 right-2 rounded-[3px] bg-white/90 px-2 py-1 text-[11px] font-semibold text-accent-deep">
            Only {product.stock} left
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <p className="text-[11px] uppercase tracking-[0.12em] text-ink-faint">
          {product.brand}
        </p>

        <Link
          href={`/products/${product.handle}`}
          className="line-clamp-2 text-sm font-medium leading-snug hover:text-accent-deep"
        >
          {product.title}
        </Link>

        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="font-display text-xl tracking-wide">
            {money(product.price)}
          </span>
          {isOnSale(product) && (
            <span className="text-xs text-ink-faint line-through">
              {money(product.compareAt!)}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => add(product.handle)}
          className="mt-1 w-full rounded-[3px] border border-line bg-white py-2 font-display text-sm tracking-[0.12em] transition-colors hover:bg-ink hover:text-white"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

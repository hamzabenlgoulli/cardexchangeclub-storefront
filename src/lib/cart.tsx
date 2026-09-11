"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { getProduct, type Product } from "./catalog";
import { useScrollLock } from "./useScrollLock";

export type CartLine = { handle: string; quantity: number };

type CartState = {
  lines: CartLine[];
  detailed: { product: Product; quantity: number }[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  add: (handle: string, quantity?: number) => void;
  setQuantity: (handle: string, quantity: number) => void;
  remove: (handle: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const STORAGE_KEY = "cec:cart";
const EMPTY: CartLine[] = [];

function readStorage(): CartLine[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const parsed: unknown = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) ?? "null",
    );
    if (!Array.isArray(parsed)) return EMPTY;
    return parsed.filter(
      (l): l is CartLine =>
        typeof l?.handle === "string" && typeof l?.quantity === "number",
    );
  } catch {
    return EMPTY;
  }
}

let lines: CartLine[] = readStorage();
const listeners = new Set<() => void>();

function writeLines(next: CartLine[]) {
  lines = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable (private mode, quota). Keep the in-memory cart.
  }
  listeners.forEach((notify) => notify());
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    lines = readStorage();
    onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => lines;
const getServerSnapshot = () => EMPTY;

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cartLines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);
  useScrollLock(isOpen);

  const add = useCallback((handle: string, quantity = 1) => {
    const existing = lines.find((l) => l.handle === handle);
    writeLines(
      existing
        ? lines.map((l) =>
            l.handle === handle ? { ...l, quantity: l.quantity + quantity } : l,
          )
        : [...lines, { handle, quantity }],
    );
    setIsOpen(true);
  }, []);

  const setQuantity = useCallback((handle: string, quantity: number) => {
    writeLines(
      quantity <= 0
        ? lines.filter((l) => l.handle !== handle)
        : lines.map((l) => (l.handle === handle ? { ...l, quantity } : l)),
    );
  }, []);

  const remove = useCallback((handle: string) => {
    writeLines(lines.filter((l) => l.handle !== handle));
  }, []);

  const clear = useCallback(() => writeLines([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartState>(() => {
    const detailed = cartLines.flatMap((line) => {
      const product = getProduct(line.handle);
      return product ? [{ product, quantity: line.quantity }] : [];
    });

    return {
      lines: cartLines,
      detailed,
      count: detailed.reduce((n, l) => n + l.quantity, 0),
      subtotal: detailed.reduce((n, l) => n + l.product.price * l.quantity, 0),
      isOpen,
      add,
      setQuantity,
      remove,
      clear,
      open,
      close,
    };
  }, [cartLines, isOpen, add, setQuantity, remove, clear, open, close]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside a CartProvider");
  return ctx;
}

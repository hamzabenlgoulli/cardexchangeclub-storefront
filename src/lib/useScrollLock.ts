"use client";

import { useEffect } from "react";

/**
 * Reference-counted page scroll lock.
 *
 * Several overlays (cart drawer, search, mobile nav) can be open at once, and
 * each one writing to `body.style.overflow` directly means the first to close
 * unlocks scrolling for the rest. Counting locks keeps the page frozen until
 * the last overlay closes, then restores the original value.
 */

let activeLocks = 0;
let restoreOverflow = "";

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    if (activeLocks === 0) {
      restoreOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    activeLocks += 1;

    return () => {
      activeLocks -= 1;
      if (activeLocks === 0) {
        document.body.style.overflow = restoreOverflow;
      }
    };
  }, [active]);
}

"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  { icon: "\ud83d\ude9a", strong: "Free Shipping", rest: "on orders over $75 — across the UK" },
  {
    icon: "\u2705",
    strong: "Authentic Products",
    rest: "— sealed, verified, and backed by our guarantee",
  },
  { icon: "\ud83d\udd04", strong: "30-Day Returns", rest: "— hassle-free on unopened items" },
  { icon: "\ud83d\udcac", strong: "Expert Support", rest: "— Mon–Fri from fellow collectors" },
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % MESSAGES.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-ink text-white">
      <div className="wrap flex h-9 items-center justify-center overflow-hidden">
        <div className="relative h-9 w-full">
          {MESSAGES.map((m, i) => (
            <p
              key={m.strong}
              aria-hidden={i !== index}
              className={`absolute inset-0 flex items-center justify-center gap-2 text-center text-xs transition-all duration-500 ${
                i === index
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              }`}
            >
              <span aria-hidden>{m.icon}</span>
              <span>
                <strong className="font-semibold">{m.strong}</strong>{" "}
                <span className="text-white/70">{m.rest}</span>
              </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

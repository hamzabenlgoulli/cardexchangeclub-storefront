import type { ArtTheme } from "@/lib/catalog";

const THEMES: Record<ArtTheme, { from: string; to: string; ink: string; glow: string }> = {
  gridiron: { from: "#1f3a5f", to: "#0b1521", ink: "#e8edf5", glow: "#f59e0b" },
  hardwood: { from: "#7c3a12", to: "#2a1206", ink: "#ffeedd", glow: "#fbbf24" },
  diamond: { from: "#13463a", to: "#061613", ink: "#e4f7ef", glow: "#34d399" },
  pitch: { from: "#14532d", to: "#052010", ink: "#e7f8ec", glow: "#a3e635" },
  ember: { from: "#7f1d1d", to: "#280707", ink: "#ffe9e4", glow: "#fb923c" },
  tide: { from: "#0e4a6e", to: "#04161f", ink: "#e2f4ff", glow: "#38bdf8" },
  verdant: { from: "#365314", to: "#101b06", ink: "#f2fbe3", glow: "#84cc16" },
  void: { from: "#2e1065", to: "#0c0518", ink: "#efe7ff", glow: "#a78bfa" },
  relic: { from: "#4b3410", to: "#181004", ink: "#fdf3dd", glow: "#eab308" },
  prism: { from: "#0f2f5c", to: "#3b0d52", ink: "#f2ecff", glow: "#f472b6" },
};

function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function initials(title: string): string {
  const words = title
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !/^\d+$/.test(w));
  return (
    words
      .slice(0, 2)
      .map((w) => w[0]!.toUpperCase())
      .join("") || "CC"
  );
}

export function CardArt({
  theme,
  title,
  className = "",
}: {
  theme: ArtTheme;
  title: string;
  className?: string;
}) {
  const t = THEMES[theme];
  const seed = hash(title);
  const id = `art-${theme}-${seed.toString(36)}`;
  const tilt = (seed % 7) - 3;
  const rings = 3 + (seed % 3);

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-label={title}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={t.from} />
          <stop offset="100%" stopColor={t.to} />
        </linearGradient>
        <linearGradient id={`${id}-foil`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={t.glow} stopOpacity="0" />
          <stop offset="45%" stopColor={t.glow} stopOpacity="0.55" />
          <stop offset="100%" stopColor={t.glow} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-halo`} cx="50%" cy="38%" r="55%">
          <stop offset="0%" stopColor={t.glow} stopOpacity="0.45" />
          <stop offset="100%" stopColor={t.glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="400" fill={`url(#${id}-bg)`} />
      <rect width="400" height="400" fill={`url(#${id}-halo)`} />

      {Array.from({ length: rings }).map((_, i) => (
        <circle
          key={i}
          cx="200"
          cy="160"
          r={54 + i * 30}
          fill="none"
          stroke={t.glow}
          strokeOpacity={0.16 - i * 0.03}
          strokeWidth="1.5"
        />
      ))}

      <g transform={`rotate(${tilt} 200 205)`}>
        <rect
          x="128"
          y="82"
          width="144"
          height="200"
          rx="10"
          fill="#ffffff"
          fillOpacity="0.07"
          stroke={t.ink}
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
        <rect
          x="140"
          y="94"
          width="120"
          height="128"
          rx="5"
          fill={t.glow}
          fillOpacity="0.14"
          stroke={t.ink}
          strokeOpacity="0.2"
        />
        <text
          x="200"
          y="178"
          textAnchor="middle"
          fontFamily="Impact, 'Bebas Neue', sans-serif"
          fontSize="58"
          letterSpacing="3"
          fill={t.ink}
          fillOpacity="0.9"
        >
          {initials(title)}
        </text>
        {[240, 253, 266].map((y, i) => (
          <rect
            key={y}
            x="146"
            y={y}
            width={[108, 84, 62][i]}
            height="5"
            rx="2.5"
            fill={t.ink}
            fillOpacity={0.26 - i * 0.06}
          />
        ))}
        <rect
          x="128"
          y="82"
          width="144"
          height="200"
          rx="10"
          fill={`url(#${id}-foil)`}
          style={{ mixBlendMode: "screen" }}
        />
      </g>

      {[
        [20, 20, 1, 1],
        [380, 20, -1, 1],
        [20, 380, 1, -1],
        [380, 380, -1, -1],
      ].map(([x, y, sx, sy], i) => (
        <path
          key={i}
          d={`M ${x} ${y! + sy! * 18} L ${x} ${y} L ${x! + sx! * 18} ${y}`}
          fill="none"
          stroke={t.ink}
          strokeOpacity="0.25"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

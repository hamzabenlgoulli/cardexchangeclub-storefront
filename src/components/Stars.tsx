export function Stars({
  count = 5,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  return (
    <span
      className={`flex items-center gap-0.5 text-accent ${className}`}
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          width="14"
          height="14"
          aria-hidden
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.4"
        >
          <path d="M10 1.6l2.47 5.1 5.53.77-4 3.95.96 5.58L10 14.37 5.04 17l.96-5.58-4-3.95 5.53-.77L10 1.6z" />
        </svg>
      ))}
    </span>
  );
}

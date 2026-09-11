export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-2">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[4px] bg-ink font-display text-lg leading-none text-accent">
        C
      </span>
      <span
        className={`truncate font-display leading-none tracking-[0.04em] ${
          compact ? "text-xl sm:text-2xl" : "text-2xl"
        }`}
      >
        Card TCG <span className="text-accent-deep">Exchange</span>
      </span>
    </span>
  );
}

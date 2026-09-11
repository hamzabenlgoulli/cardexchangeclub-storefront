const ITEMS = [
  {
    title: "Free Shipping",
    body: "On every order over $75, shipped tracked and insured.",
    icon: TruckIcon,
  },
  {
    title: "Authentic Products",
    body: "Sealed product straight from distribution, never resealed.",
    icon: ShieldIcon,
  },
  {
    title: "30-Day Returns",
    body: "Unopened items can go back within thirty days, no hassle.",
    icon: ReturnIcon,
  },
  {
    title: "Expert Support",
    body: "Questions answered Monday to Friday by fellow collectors.",
    icon: ChatIcon,
  },
];

export function TrustRow() {
  return (
    <section className="border-b border-line bg-surface">
      <ul className="wrap grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(({ title, body, icon: Icon }) => (
          <li key={title} className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[3px] bg-white text-accent-deep ring-1 ring-line">
              <Icon />
            </span>
            <div>
              <h3 className="font-display text-lg leading-tight tracking-[0.06em]">
                {title}
              </h3>
              <p className="mt-1 text-xs text-ink-muted">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

const strokeProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function TruckIcon() {
  return (
    <svg {...strokeProps}>
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg {...strokeProps}>
      <path d="M12 3l7 3v5.5c0 4.3-2.9 7.7-7 9.5-4.1-1.8-7-5.2-7-9.5V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function ReturnIcon() {
  return (
    <svg {...strokeProps}>
      <path d="M4 10a8 8 0 1 1 1.6 6" />
      <path d="M4 5v5h5" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg {...strokeProps}>
      <path d="M20 15a3 3 0 0 1-3 3H9l-5 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z" />
      <path d="M8.5 10.5h7M8.5 13.5h4" />
    </svg>
  );
}

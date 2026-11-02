type IconProps = {
  size?: number;
  className?: string;
};

const base = {
  "aria-hidden": true as const,
  focusable: "false" as const,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const ArrowUpRight = ({ size = 16, className }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...base}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export const ArrowDown = ({ size = 16, className }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...base}>
    <path d="M12 4v16" />
    <path d="m6 14 6 6 6-6" />
  </svg>
);

export const Close = ({ size = 15, className }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...base}>
    <path d="M6 6l12 12" />
    <path d="M18 6 6 18" />
  </svg>
);

export const Sun = ({ size = 18, className }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...base}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
  </svg>
);

export const Moon = ({ size = 18, className }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...base}>
    <path d="M20 15.2A8.5 8.5 0 0 1 8.8 4a8.5 8.5 0 1 0 11.2 11.2Z" />
  </svg>
);

export const Menu = ({ size = 20, className }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...base}>
    <path d="M4 8h16" />
    <path d="M4 16h16" />
  </svg>
);

export const LoopMark = ({ size = 16, className }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...base}>
    <path d="M20 12a8 8 0 1 1-2.34-5.66" />
    <path d="M20 4v4h-4" />
  </svg>
);

export const ArchMark = ({ size = 28, className }: IconProps) => (
  <svg
    viewBox="0 0 28 36"
    width={size}
    height={size * (36 / 28)}
    className={className}
    aria-hidden="true"
    focusable="false"
    fill="none"
  >
    <path
      d="M2.5 33.5V15.7C2.5 9 7.7 3.5 14 3.5s11.5 5.5 11.5 12.2v17.8"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path d="M2.5 33.5h23" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="14" cy="10" r="2" fill="var(--accent)" />
  </svg>
);

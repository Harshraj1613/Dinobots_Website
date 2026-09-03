type LogoProps = {
  className?: string;
};

/**
 * Placeholder mark echoing the club logo's three motifs: a gear (mechanical),
 * circuit traces with a glowing node (electronics), and a code caret (software).
 * Swap for the real logo asset when available.
 */
export default function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="21" stroke="var(--color-gunmetal-light)" strokeWidth="1.5" />
      <g stroke="var(--color-accent-steel-bright)" strokeWidth="1.4" opacity="0.9">
        <path d="M24 6v7M24 35v7M6 24h7M35 24h7M11.5 11.5l5 5M31.5 31.5l5 5M11.5 36.5l5-5M31.5 16.5l5-5" />
      </g>
      <circle cx="24" cy="24" r="12" stroke="var(--color-gunmetal-light)" strokeWidth="1.5" />
      <path
        d="M20 18l-5 6 5 6M28 18l5 6-5 6"
        stroke="var(--color-accent-maroon-bright)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="2.4" fill="var(--color-accent-maroon-bright)">
        <animate
          attributeName="opacity"
          values="1;0.4;1"
          dur="2.4s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

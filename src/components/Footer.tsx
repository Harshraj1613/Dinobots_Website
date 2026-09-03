import Link from "next/link";
import Logo from "@/components/Logo";
import { NAV_LINKS } from "@/lib/nav-links";

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg-deep/60">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo className="h-8 w-8" />
              <span className="font-display text-lg font-semibold tracking-wide">
                DINOBOTS
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted">
              Official robotics club of KIET Deemed to be University —
              building bots across Robotics and Electronics domains, from LFR
              to ABU Robocon.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold tracking-wider text-foreground">
              NAVIGATE
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-accent-maroon-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold tracking-wider text-foreground">
              CONNECT
            </h3>
            <ul className="mt-4 space-y-2">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="text-sm text-muted transition-colors hover:text-accent-steel-bright"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Dinobots — KIET Robotics Club.
            All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Mechanical &middot; Electrical &middot; Software/AI &middot;
            Design &amp; Outreach
          </p>
        </div>
      </div>
    </footer>
  );
}

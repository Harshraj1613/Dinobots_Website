import Link from "next/link";
import Logo from "@/components/Logo";

export default function HeroFallback() {
  return (
    <section className="circuit-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <Logo className="h-24 w-24 opacity-90" />
      <span className="mt-6 rounded-full border border-accent-maroon/40 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-accent-maroon-bright">
        KIET Robotics Club
      </span>
      <h1 className="font-display mt-4 text-5xl font-semibold sm:text-7xl">
        <span className="text-glow-maroon">DINOBOTS</span>
      </h1>
      <p className="mt-5 max-w-xl text-balance text-base text-muted sm:text-lg">
        Designing, building, and competing with bots across Robotics and
        Electronics — from LFR and Robo Sumo to ABU Robocon.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/projects"
          className="rounded-md bg-accent-maroon px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:glow-border-maroon"
        >
          View Projects
        </Link>
        <Link
          href="/about"
          className="rounded-md border border-accent-steel/50 px-6 py-3 text-sm font-semibold transition-all duration-200 hover:glow-border-steel"
        >
          About the Club
        </Link>
      </div>
    </section>
  );
}

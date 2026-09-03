import Link from "next/link";

const STAGES = [
  {
    eyebrow: "Mechanical",
    heading: "Built by hand, engineered to win",
    body: "Chassis, drivetrains, and gearing designed and machined in-house for every bot we field — from Line Follower Robots to ABU Robocon heavyweights.",
  },
  {
    eyebrow: "Electronics",
    heading: "Circuits that think fast",
    body: "Embedded systems, sensor arrays, and control boards wired for split-second decisions in Robo Sumo and Robo War arenas.",
  },
  {
    eyebrow: "Software / AI",
    heading: "Code that closes the loop",
    body: "Firmware, computer vision, and autonomy stacks turning mechanical hardware into a bot that senses, decides, and acts.",
  },
];

export default function HeroPanels() {
  return (
    <div className="pointer-events-none mx-auto max-w-6xl">
      <section className="flex h-screen flex-col items-center justify-center px-6 text-center md:items-start md:pr-[45%] md:text-left">
        <span className="mb-4 rounded-full border border-accent-maroon/40 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-accent-maroon-bright">
          KIET Robotics Club
        </span>
        <h1 className="font-display text-5xl font-semibold sm:text-7xl">
          <span className="text-glow-maroon">DINOBOTS</span>
        </h1>
        <p className="mt-5 max-w-xl text-balance text-base text-muted sm:text-lg">
          Designing, building, and competing with bots across Robotics and
          Electronics — from LFR and Robo Sumo to ABU Robocon.
        </p>
        <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
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
        <div className="mt-14 flex flex-col items-center gap-2 text-muted md:items-start">
          <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
          <span className="h-8 w-px animate-pulse bg-gradient-to-b from-accent-steel-bright to-transparent" />
        </div>
      </section>

      {STAGES.slice(1).map((stage) => (
        <section
          key={stage.eyebrow}
          className="flex h-screen flex-col items-center justify-center px-6 text-center md:items-start md:pr-[45%] md:text-left"
        >
          <span className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent-steel-bright">
            {stage.eyebrow}
          </span>
          <h2 className="font-display max-w-lg text-3xl font-semibold sm:text-4xl">
            {stage.heading}
          </h2>
          <p className="mt-4 max-w-md text-sm text-muted sm:text-base">
            {stage.body}
          </p>
        </section>
      ))}
    </div>
  );
}

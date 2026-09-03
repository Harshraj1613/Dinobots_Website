import Link from "next/link";

const ACHIEVEMENTS = [
  { place: "1st", event: "AKTU Zonals" },
  { place: "2nd", event: "Innotech 2025" },
  { place: "3rd · National", event: "ABU Robocon" },
];

const DIVISIONS = [
  "Mechanical",
  "Electrical",
  "Software / AI",
  "Design & Outreach",
];

const PROJECTS = [
  "Anushka 2.0 — Humanoid Robot",
  "ABU Robocon bots",
  "Line Follower Robot (LFR)",
  "Robo War & Robo Sumo bots",
];

export default function HighlightsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">
          Robotics and Electronics, built to compete
        </h2>
        <p className="mt-4 text-muted">
          Dinobots is the official robotics club of KIET, working across
          Robotics and Electronics domains. Members design and build bots for
          competitions including Line Follower Robot (LFR), Robo Sumo, and
          Robo War — gaining hands-on experience in mechanical design,
          embedded systems, and control. Our mission: win ABU Robocon 2027.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-3">
        {ACHIEVEMENTS.map((item) => (
          <div
            key={item.event}
            className="glass-panel rounded-xl p-6 text-center transition-all duration-300 hover:glow-border-maroon"
          >
            <p className="font-display text-2xl font-semibold text-accent-maroon-bright">
              {item.place}
            </p>
            <p className="mt-1 text-sm text-muted">{item.event}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        <div className="glass-panel rounded-xl p-8">
          <h3 className="font-display text-lg font-semibold tracking-wide text-accent-steel-bright">
            TEAM DIVISIONS
          </h3>
          <ul className="mt-4 space-y-2">
            {DIVISIONS.map((division) => (
              <li key={division} className="text-sm text-foreground">
                {division}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel rounded-xl p-8">
          <h3 className="font-display text-lg font-semibold tracking-wide text-accent-steel-bright">
            MAJOR PROJECTS
          </h3>
          <ul className="mt-4 space-y-2">
            {PROJECTS.map((project) => (
              <li key={project} className="text-sm text-foreground">
                {project}
              </li>
            ))}
          </ul>
          <Link
            href="/projects"
            className="mt-5 inline-block text-sm font-medium text-accent-maroon-bright transition-colors hover:text-accent-maroon"
          >
            See all projects &rarr;
          </Link>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
        <p className="text-muted">Want to build with us?</p>
        <Link
          href="/contact"
          className="rounded-md bg-accent-maroon px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:glow-border-maroon"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  );
}

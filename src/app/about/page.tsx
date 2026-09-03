import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Dinobots",
  description:
    "Dinobots' mission, vision, and the domains our members build across.",
};

const DOMAINS = ["Robotics", "Electronics"];

const DIVISIONS = [
  {
    name: "Mechanical",
    description: "Chassis, drivetrains, and gearing for every bot we field.",
  },
  {
    name: "Electrical",
    description: "Embedded systems, sensors, and control boards.",
  },
  {
    name: "Software / AI",
    description: "Firmware, computer vision, and autonomy stacks.",
  },
  {
    name: "Design & Outreach",
    description: "Branding, documentation, and community outreach.",
  },
];

const COMPETITIONS = [
  "Line Follower Robot (LFR)",
  "Robo Sumo",
  "Robo War",
  "ABU Robocon",
  "AKTU Zonals",
  "Innotech",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <div className="circuit-bg pb-10">
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent-steel-bright">
          About Dinobots
        </span>
        <h1 className="font-display mt-3 text-4xl font-semibold sm:text-5xl">
          The official robotics club of KIET
        </h1>
        <p className="mt-6 max-w-2xl text-muted">
          Dinobots is the official robotics club of KIET Deemed to be
          University, Phase 1, Muradnagar, Ghaziabad. We work across Robotics
          and Electronics domains — members design and build bots for
          competitions including Line Follower Robot (LFR), Robo Sumo, and
          Robo War, gaining hands-on experience in mechanical design,
          embedded systems, and control.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        <div className="glass-panel rounded-xl p-8">
          <h2 className="font-display text-xl font-semibold text-accent-maroon-bright">
            Vision
          </h2>
          <p className="mt-3 text-sm text-muted">
            To build a community of student innovators who design, compete,
            and excel on national and international robotics platforms —
            turning ideas into award-winning machines.
          </p>
        </div>
        <div className="glass-panel rounded-xl p-8">
          <h2 className="font-display text-xl font-semibold text-accent-maroon-bright">
            Mission
          </h2>
          <p className="mt-3 text-sm text-muted">
            To win ABU Robocon 2027, while continuously nurturing skill,
            teamwork, and innovation across all robotics domains.
          </p>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="font-display text-xl font-semibold tracking-wide text-accent-steel-bright">
          DOMAINS
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {DOMAINS.map((domain) => (
            <span
              key={domain}
              className="rounded-full border border-accent-steel/40 px-4 py-1.5 text-sm text-foreground"
            >
              {domain}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <h2 className="font-display text-xl font-semibold tracking-wide text-accent-steel-bright">
          TEAM DIVISIONS
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {DIVISIONS.map((division) => (
            <div
              key={division.name}
              className="glass-panel rounded-xl p-6 transition-all duration-300 hover:glow-border-steel"
            >
              <h3 className="font-display text-base font-semibold">
                {division.name}
              </h3>
              <p className="mt-2 text-sm text-muted">{division.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <h2 className="font-display text-xl font-semibold tracking-wide text-accent-steel-bright">
          COMPETITIONS &amp; EVENTS
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {COMPETITIONS.map((competition) => (
            <span
              key={competition}
              className="rounded-full border border-white/10 bg-gunmetal/40 px-4 py-1.5 text-sm text-muted"
            >
              {competition}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { getTeamMembers } from "@/lib/supabase/queries";
import TeamMemberCard from "@/components/team/TeamMemberCard";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = {
  title: "Team | Dinobots",
  description: "Meet the members of Dinobots, the robotics club of KIET.",
};

export default async function TeamPage() {
  const members = await getTeamMembers();

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent-steel-bright">
        Meet the Club
      </span>
      <h1 className="font-display mt-3 text-4xl font-semibold sm:text-5xl">
        Our Team
      </h1>
      <p className="mt-6 max-w-2xl text-muted">
        The students behind every bot — across Mechanical, Electrical,
        Software/AI, and Design &amp; Outreach.
      </p>

      {members.length === 0 ? (
        <EmptyState
          title="No team members yet"
          description="Member profiles will appear here once they're added from the admin dashboard."
        />
      ) : (
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import { getProjects } from "@/lib/supabase/queries";
import ProjectCard from "@/components/projects/ProjectCard";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = {
  title: "Projects | Dinobots",
  description: "Robots and projects built by Dinobots, the robotics club of KIET.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent-steel-bright">
        What We Build
      </span>
      <h1 className="font-display mt-3 text-4xl font-semibold sm:text-5xl">
        Projects
      </h1>
      <p className="mt-6 max-w-2xl text-muted">
        From competition bots to long-term builds — a look at what the club
        has shipped.
      </p>

      {projects.length === 0 ? (
        <EmptyState
          title="No projects listed yet"
          description="Project write-ups will appear here once they're added from the admin dashboard."
        />
      ) : (
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

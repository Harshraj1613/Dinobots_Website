import Image from "next/image";
import Logo from "@/components/Logo";
import type { Project } from "@/lib/supabase/types";

export default function ProjectCard({ project }: { project: Project }) {
  const coverImage = project.image_urls?.[0];

  return (
    <div className="glass-panel overflow-hidden rounded-xl transition-all duration-300 hover:glow-border-maroon">
      <div className="relative flex aspect-video items-center justify-center bg-gunmetal/60">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={project.title}
            fill
            className="object-cover"
          />
        ) : (
          <Logo className="h-12 w-12 opacity-40" />
        )}
      </div>
      <div className="p-6">
        <h3 className="font-display text-lg font-semibold">
          {project.title}
        </h3>
        {project.description && (
          <p className="mt-2 text-sm text-muted">{project.description}</p>
        )}
        {project.tech_stack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-accent-steel/40 px-3 py-1 text-xs text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

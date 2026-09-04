import Image from "next/image";
import type { TeamMember } from "@/lib/supabase/types";

const SOCIAL_LABELS: Record<string, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  github: "GitHub",
  twitter: "Twitter",
  x: "X",
  youtube: "YouTube",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  const socialEntries = Object.entries(member.socials ?? {}).filter(
    ([, url]) => url,
  );

  return (
    <div className="glass-panel rounded-xl p-6 text-center transition-all duration-300 hover:glow-border-steel">
      {member.photo_url ? (
        <Image
          src={member.photo_url}
          alt={member.name}
          width={96}
          height={96}
          className="mx-auto h-24 w-24 rounded-full object-cover"
        />
      ) : (
        <div className="font-display mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gunmetal text-xl font-semibold text-accent-steel-bright">
          {getInitials(member.name)}
        </div>
      )}
      <h3 className="font-display mt-4 text-lg font-semibold">
        {member.name}
      </h3>
      <p className="text-sm text-accent-maroon-bright">{member.role}</p>
      {member.bio && <p className="mt-3 text-sm text-muted">{member.bio}</p>}
      {socialEntries.length > 0 && (
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {socialEntries.map(([key, url]) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted transition-colors hover:text-accent-steel-bright"
            >
              {SOCIAL_LABELS[key.toLowerCase()] ?? key}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

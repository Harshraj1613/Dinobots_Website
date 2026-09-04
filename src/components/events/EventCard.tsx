import Image from "next/image";
import { formatEventDate } from "@/lib/format-date";
import type { Event } from "@/lib/supabase/types";

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="glass-panel overflow-hidden rounded-xl transition-all duration-300 hover:glow-border-steel">
      {event.image_url && (
        <div className="relative aspect-video">
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent-maroon-bright">
          {formatEventDate(event.event_date)}
        </span>
        <h3 className="font-display mt-2 text-lg font-semibold">
          {event.title}
        </h3>
        {event.description && (
          <p className="mt-2 text-sm text-muted">{event.description}</p>
        )}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { getEvents } from "@/lib/supabase/queries";
import EventCard from "@/components/events/EventCard";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = {
  title: "Events | Dinobots",
  description: "Upcoming and past events, workshops, and competitions.",
};

export default async function EventsPage() {
  const events = await getEvents();

  const todayIso = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((event) => event.event_date >= todayIso);
  const past = events
    .filter((event) => event.event_date < todayIso)
    .reverse();

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent-steel-bright">
        Get Involved
      </span>
      <h1 className="font-display mt-3 text-4xl font-semibold sm:text-5xl">
        Events
      </h1>
      <p className="mt-6 max-w-2xl text-muted">
        Workshops, bootcamps, and competitions — upcoming and past.
      </p>

      {events.length === 0 ? (
        <EmptyState
          title="No events listed yet"
          description="Upcoming workshops and competitions will appear here once they're added from the admin dashboard."
        />
      ) : (
        <>
          <div className="mt-14">
            <h2 className="font-display text-xl font-semibold tracking-wide text-accent-steel-bright">
              UPCOMING
            </h2>
            {upcoming.length === 0 ? (
              <p className="mt-4 text-sm text-muted">
                No upcoming events right now — check back soon.
              </p>
            ) : (
              <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {upcoming.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>

          {past.length > 0 && (
            <div className="mt-14">
              <h2 className="font-display text-xl font-semibold tracking-wide text-accent-steel-bright">
                PAST
              </h2>
              <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {past.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

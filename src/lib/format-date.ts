/** Formats a Postgres `date` string ("YYYY-MM-DD") without UTC-shift surprises. */
export function formatEventDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

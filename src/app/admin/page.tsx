import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionInfo } from "@/lib/supabase/session";
import { logout } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Admin Dashboard | Dinobots",
  description: "Manage Dinobots team, project, and event content.",
};

export default async function AdminPage() {
  const session = await getSessionInfo();

  if (session.status === "not-configured") {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">
          Admin Dashboard
        </h1>
        <p className="mt-4 text-muted">
          Supabase isn&apos;t configured yet. See{" "}
          <code className="text-accent-steel-bright">
            supabase/README.md
          </code>{" "}
          to set up the project, then come back here to sign in.
        </p>
      </div>
    );
  }

  if (session.status === "signed-out") {
    redirect("/login");
  }

  if (session.status === "not-admin") {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">
          Access restricted
        </h1>
        <p className="mt-4 text-muted">
          Signed in as {session.email}, but this account isn&apos;t an admin
          yet. Ask an existing admin to add you (see{" "}
          <code className="text-accent-steel-bright">
            supabase/README.md
          </code>
          ).
        </p>
        <form action={logout} className="mt-6">
          <button
            type="submit"
            className="rounded-md border border-accent-steel/50 px-6 py-3 text-sm font-semibold transition-all duration-200 hover:glow-border-steel"
          >
            Sign Out
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-muted">Signed in as {session.email}</p>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-md border border-accent-steel/50 px-4 py-2 text-sm font-semibold transition-all duration-200 hover:glow-border-steel"
          >
            Sign Out
          </button>
        </form>
      </div>
      <div className="glass-panel mt-10 rounded-xl p-8 text-muted">
        Tools to add, edit, and delete team members, projects, and events —
        plus image uploads — are coming in the next step.
      </div>
    </div>
  );
}

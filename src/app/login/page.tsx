import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionInfo } from "@/lib/supabase/session";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login | Dinobots",
  description: "Sign in to manage Dinobots team, project, and event content.",
};

export default async function LoginPage() {
  const session = await getSessionInfo();

  if (session.status === "admin" || session.status === "not-admin") {
    redirect("/admin");
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-24">
      <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent-steel-bright">
        Dinobots
      </span>
      <h1 className="font-display mt-3 text-4xl font-semibold">
        Admin Login
      </h1>
      <p className="mt-3 text-sm text-muted">
        Sign in to manage team, project, and event content.
      </p>

      {session.status === "not-configured" ? (
        <div className="glass-panel mt-8 rounded-xl p-6 text-sm text-muted">
          Supabase isn&apos;t configured yet for this deployment. See{" "}
          <code className="text-accent-steel-bright">
            supabase/README.md
          </code>{" "}
          to set it up.
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type SessionInfo =
  | { status: "not-configured" }
  | { status: "signed-out" }
  | { status: "not-admin"; email: string }
  | { status: "admin"; email: string };

/**
 * Resolves the current visitor's auth + admin status in one place, so
 * /login and /admin agree on what "signed in" and "authorized" mean.
 * Admin status is a separate check from auth: an authenticated user only
 * counts as "admin" if they also have a row in the admins table (RLS
 * enforces the same rule server-side on writes).
 */
export async function getSessionInfo(): Promise<SessionInfo> {
  if (!isSupabaseConfigured()) return { status: "not-configured" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { status: "signed-out" };

  const { data: admin } = await supabase
    .from("admins")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!admin) return { status: "not-admin", email: user.email ?? "" };

  return { status: "admin", email: user.email ?? "" };
}

import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

/**
 * Service-role Supabase client that bypasses row-level security. Server-only
 * — never import this from a Client Component or expose the key to the
 * browser. Use the request-scoped client from server.ts wherever RLS
 * (acting as the signed-in user) is the right model instead.
 */
export function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}

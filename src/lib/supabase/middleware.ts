import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refreshes the Supabase auth session cookie on every request. Required by
 * @supabase/ssr so Server Components always see a valid session — they
 * cannot write cookies themselves. Call from the root middleware.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  // Supabase isn't configured yet (see supabase/README.md) — skip the
  // session refresh instead of throwing on every request.
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  // Refreshes the session if expired. Required for Server Components, which
  // can only read cookies, not write them.
  await supabase.auth.getUser();

  return response;
}

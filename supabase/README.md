# Supabase setup

This project needs a Supabase project for the database, auth, and file
storage. Claude Code can't create the project for you (that requires your
own Supabase account) — follow these steps once, then the app will pick up
the connection from environment variables.

## 1. Create the project

1. Go to [supabase.com](https://supabase.com), sign in, and create a new
   project (free tier is fine).
2. Wait for provisioning to finish.

## 2. Run the schema

1. Open **SQL Editor** in the Supabase dashboard.
2. Paste the contents of `supabase/migrations/0001_init.sql` and run it.
   This creates `team_members`, `projects`, `events`,
   `contact_submissions`, and `admins`, all with row-level security so
   public visitors can only read (and submit contact messages), while
   writes require a row in `admins`. It also creates a public `media`
   storage bucket for uploaded images.

If you have the [Supabase CLI](https://supabase.com/docs/guides/cli)
installed and linked to the project instead, you can run
`supabase db push` from the repo root.

## 3. Get your API keys

In **Project Settings → API**, copy:

- Project URL
- `anon` `public` key
- `service_role` `secret` key (server-side only — never expose to the
  client)

Copy `.env.example` to `.env.local` in the project root and fill these in:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

`.env.local` is gitignored — never commit real keys.

## 4. Create your admin account

1. In the dashboard, go to **Authentication → Users → Add user** and
   create an account with your email/password (this is what you'll use to
   log in at `/login`).
2. Copy that user's UUID from the users table.
3. Back in the **SQL Editor**, run:

   ```sql
   insert into public.admins (id, role) values ('<paste-the-uuid>', 'admin');
   ```

Without this row, the account can log in but every write (add/edit/delete
team member, project, event) will be rejected by row-level security.

## 5. Restart the dev server

Environment variables are only read at startup, so restart `npm run dev`
after editing `.env.local`.

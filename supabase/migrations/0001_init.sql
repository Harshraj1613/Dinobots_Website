-- Dinobots website schema: team members, projects, events, admin roles.
-- Run this once against a fresh Supabase project (SQL Editor, or `supabase db push`).

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- admins: which auth.users are allowed to write content. Bootstrap the first
-- row manually after creating your own account (see README in this folder).
-- ---------------------------------------------------------------------------
create table if not exists public.admins (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

create policy "Admins can read the admin list"
  on public.admins for select
  to authenticated
  using (exists (select 1 from public.admins a where a.id = auth.uid()));

-- ---------------------------------------------------------------------------
-- team_members
-- ---------------------------------------------------------------------------
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text,
  photo_url text,
  socials jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.team_members enable row level security;

create policy "Team members are publicly readable"
  on public.team_members for select
  to anon, authenticated
  using (true);

create policy "Admins can insert team members"
  on public.team_members for insert
  to authenticated
  with check (exists (select 1 from public.admins a where a.id = auth.uid()));

create policy "Admins can update team members"
  on public.team_members for update
  to authenticated
  using (exists (select 1 from public.admins a where a.id = auth.uid()))
  with check (exists (select 1 from public.admins a where a.id = auth.uid()));

create policy "Admins can delete team members"
  on public.team_members for delete
  to authenticated
  using (exists (select 1 from public.admins a where a.id = auth.uid()));

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  tech_stack text[] not null default '{}'::text[],
  image_urls text[] not null default '{}'::text[],
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "Projects are publicly readable"
  on public.projects for select
  to anon, authenticated
  using (true);

create policy "Admins can insert projects"
  on public.projects for insert
  to authenticated
  with check (exists (select 1 from public.admins a where a.id = auth.uid()));

create policy "Admins can update projects"
  on public.projects for update
  to authenticated
  using (exists (select 1 from public.admins a where a.id = auth.uid()))
  with check (exists (select 1 from public.admins a where a.id = auth.uid()));

create policy "Admins can delete projects"
  on public.projects for delete
  to authenticated
  using (exists (select 1 from public.admins a where a.id = auth.uid()));

-- ---------------------------------------------------------------------------
-- events
-- ---------------------------------------------------------------------------
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date date not null,
  image_url text,
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;

create policy "Events are publicly readable"
  on public.events for select
  to anon, authenticated
  using (true);

create policy "Admins can insert events"
  on public.events for insert
  to authenticated
  with check (exists (select 1 from public.admins a where a.id = auth.uid()));

create policy "Admins can update events"
  on public.events for update
  to authenticated
  using (exists (select 1 from public.admins a where a.id = auth.uid()))
  with check (exists (select 1 from public.admins a where a.id = auth.uid()));

create policy "Admins can delete events"
  on public.events for delete
  to authenticated
  using (exists (select 1 from public.admins a where a.id = auth.uid()));

-- ---------------------------------------------------------------------------
-- contact_submissions: stores /contact form entries.
-- ---------------------------------------------------------------------------
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

create policy "Anyone can submit a contact message"
  on public.contact_submissions for insert
  to anon, authenticated
  with check (true);

create policy "Admins can read contact submissions"
  on public.contact_submissions for select
  to authenticated
  using (exists (select 1 from public.admins a where a.id = auth.uid()));

-- ---------------------------------------------------------------------------
-- Storage: a public "media" bucket for team photos / project & event images.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Media files are publicly readable"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

create policy "Admins can upload media"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'media'
    and exists (select 1 from public.admins a where a.id = auth.uid())
  );

create policy "Admins can update media"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'media'
    and exists (select 1 from public.admins a where a.id = auth.uid())
  );

create policy "Admins can delete media"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'media'
    and exists (select 1 from public.admins a where a.id = auth.uid())
  );

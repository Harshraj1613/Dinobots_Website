# Dinobot Robotics Club — Website Project Brief

This file is project context for Claude Code. Keep it in the root of your
project folder as `CLAUDE.md` — Claude Code reads it automatically at the
start of every session.

---

## 1. Project Overview

A modern, futuristic website for **Dinobot**, a college robotics club.
Public-facing site showcasing the club, plus an authenticated admin
dashboard for editing content and uploading media — no separate backend
server to manage.

- **Club name:** Dinobots
- **Tagline:** [FILL IN]
- **College:** KIET Deemed to be University, Phase 1, Muradnagar, Ghaziabad, Uttar Pradesh, India
- **Established:** [FILL IN]
- **Introduction:** Dinobots is the official robotics club of KIET, working across Robotics and Electronics domains. Members design and build bots for competitions including Line Follower Robot (LFR), Robo Sumo, and Robo War, gaining hands-on experience in mechanical design, embedded systems, and control.
- **Vision:** To build a community of student innovators who design, compete, and excel on national and international robotics platforms — turning ideas into award-winning machines.
- **Mission:** To win ABU Robocon 2027, while continuously nurturing skill, teamwork, and innovation across all robotics domains.
- **Domains:** Robotics, Electronics
- **Major Projects:** Bots for e-Yantra, Anushka 2.0 (Humanoid Robot), Bots for ABU Robocon, LFR, Robo War, Robo Sumo bots
- **Major Achievements:** 1st — AKTU Zonals; 2nd — Innotech 2025; 3rd (National) — ABU Robocon
- **Competitions Participated:** LFR, Robo Sumo, Robo War, ABU Robocon, AKTU Zonals, Innotech
- **Events/Workshops:** Intro to Arduino workshop, Robotics Bootcamp, Annual Robo-Fest
- **Team Divisions:** Mechanical, Electrical, Software/AI, Design & Outreach
- **Active Members:** [FILL IN]
- **Faculty Coordinator:** [FILL IN]
- **Club Lead/President:** [FILL IN]
- **Social Media:** Instagram: [FILL IN] | LinkedIn: [FILL IN] | GitHub: [FILL IN] | YouTube: [FILL IN]
- **Contact Email:** [FILL IN]
- **Contact Number (optional/public):** [FILL IN]

## 2. Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **3D:** React Three Fiber (Three.js) — hero section, rotating model/particles
- **Animation:** Framer Motion
- **Backend (all-in-one):** Supabase
  - Postgres database (team members, projects, events)
  - Supabase Auth (admin login)
  - Supabase Storage (image/file uploads)
- **Hosting:** Vercel (frontend) + Supabase (backend), both free tier

## 3. Site Structure

| Route | Purpose | Auth? |
|---|---|---|
| `/` | Home — 3D hero, club intro, highlights | Public |
| `/about` | Mission, history | Public |
| `/team` | Member cards, pulled from DB | Public |
| `/projects` | Robots/projects showcase with images | Public |
| `/events` | Upcoming & past events | Public |
| `/contact` | Contact form | Public |
| `/login` | Admin login | Public form, protected result |
| `/admin` | Dashboard: add/edit/delete team, projects, events; upload images | Protected |

## 4. Design Direction

- **Theme:** Dark, logo-matched — mechanical (gears) meets digital (circuits/code), not generic neon
- **Logo:** Exists — gear (mechanical), circuit traces with glowing red nodes (electronics), code icon `</>` (software). All future visuals should echo this iconography.
- **Color palette:**
  - Background: `#0A0E1A` to `#16213E` (deep navy/near-black)
  - Primary accent: `#B22222` (maroon/red, from logo)
  - Secondary accent: `#2E4B8F` (steel blue, from logo's gear badge)
  - Neutral: gunmetal gray for mechanical elements
- **Style:** Glassmorphism cards, glowing red/blue borders on hover/active states, gear-tooth and circuit-trace textures at low opacity in backgrounds
- **Fonts:** Space Grotesk / Orbitron-style for headlines, Inter for body text

## 4a. 3D Scroll Hero Spec

- Built with React Three Fiber + `@react-three/drei`'s `ScrollControls`, or GSAP ScrollTrigger for finer control
- 3D robot/gear model rotates and reveals parts as user scrolls through hero
- Optionally ties to team divisions (Mechanical, Electrical, Software/AI) — model highlights corresponding part at each scroll stage
- Hero section pins during animation, then releases to continue normal scroll
- Must include `prefers-reduced-motion` fallback and a static-image fallback for low-end/mobile devices
- Model format: `.glb`/`.gltf`, kept low-poly for performance

## 5. Content Checklist (fill in before or during build — placeholders OK to start)

- [ ] Team members: name, role, photo, (optional) socials
- [ ] Projects: name, short description, tech used, image(s)
- [ ] Events: name, date, description, (optional) image
- [ ] Contact info: email, Discord/Instagram/other socials
- [ ] Admin accounts: how many, roles (e.g. president, tech lead)?

## 6. Database Schema (starting point — adjust as needed)

```sql
-- team_members
id, name, role, bio, photo_url, socials (jsonb), created_at

-- projects
id, title, description, tech_stack (text[]), image_urls (text[]), created_at

-- events
id, title, description, event_date, image_url, created_at

-- admins (or use Supabase Auth users table directly + a role check)
id (references auth.users), role
```

## 7. Build Order

1. Scaffold Next.js + Tailwind, set up folder structure and layout/nav
2. Static pages first (Home with 3D hero, About) to nail the visual direction
3. Set up Supabase project, connect env vars, create schema above
4. Public pages pulling live data (Team, Projects, Events)
5. `/login` with Supabase Auth
6. `/admin` protected dashboard: forms to add/edit/delete content, image upload to Supabase Storage
7. Contact form (can just email via a simple API route, or store submissions in Supabase)
8. Polish animations, responsiveness, deploy to Vercel

## 8. Environment Variables Needed

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   # server-side only, never expose to client
```

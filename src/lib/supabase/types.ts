export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photo_url: string | null;
  socials: Record<string, string>;
  created_at: string;
};

export type Project = {
  id: string;
  title: string;
  description: string | null;
  tech_stack: string[];
  image_urls: string[];
  created_at: string;
};

export type Event = {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  image_url: string | null;
  created_at: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export type Admin = {
  id: string;
  role: string;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      team_members: {
        Row: TeamMember;
        Insert: Omit<TeamMember, "id" | "created_at"> &
          Partial<Pick<TeamMember, "id" | "created_at">>;
        Update: Partial<TeamMember>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, "id" | "created_at"> &
          Partial<Pick<Project, "id" | "created_at">>;
        Update: Partial<Project>;
      };
      events: {
        Row: Event;
        Insert: Omit<Event, "id" | "created_at"> &
          Partial<Pick<Event, "id" | "created_at">>;
        Update: Partial<Event>;
      };
      contact_submissions: {
        Row: ContactSubmission;
        Insert: Omit<ContactSubmission, "id" | "created_at"> &
          Partial<Pick<ContactSubmission, "id" | "created_at">>;
        Update: Partial<ContactSubmission>;
      };
      admins: {
        Row: Admin;
        Insert: Omit<Admin, "created_at"> & Partial<Pick<Admin, "created_at">>;
        Update: Partial<Admin>;
      };
    };
  };
};

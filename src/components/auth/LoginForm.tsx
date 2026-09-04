"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login, type LoginState } from "@/app/login/actions";

const initialState: LoginState = { error: null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-accent-maroon px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:glow-border-maroon disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Signing in…" : "Sign In"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <form
      action={formAction}
      className="glass-panel mt-8 flex flex-col gap-4 rounded-xl p-6"
    >
      <div>
        <label
          htmlFor="email"
          className="text-xs font-medium uppercase tracking-wide text-muted"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1.5 w-full rounded-md border border-white/10 bg-bg-deep/60 px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent-steel"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-xs font-medium uppercase tracking-wide text-muted"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1.5 w-full rounded-md border border-white/10 bg-bg-deep/60 px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent-steel"
        />
      </div>
      {state.error && (
        <p className="text-sm text-accent-maroon-bright">{state.error}</p>
      )}
      <SubmitButton />
    </form>
  );
}

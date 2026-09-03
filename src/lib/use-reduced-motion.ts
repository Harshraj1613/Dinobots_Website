"use client";

import { useMediaQuery } from "@/lib/use-media-query";

/** Tracks the user's prefers-reduced-motion setting, live. */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

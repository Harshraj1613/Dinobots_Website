"use client";

import dynamic from "next/dynamic";
import HeroFallback from "@/components/hero/HeroFallback";

const Hero3D = dynamic(() => import("@/components/hero/Hero3D"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export default function HeroClient() {
  return <Hero3D />;
}

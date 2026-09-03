"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, Sparkles } from "@react-three/drei";
import DinobotRig from "@/components/hero/DinobotRig";
import HeroPanels from "@/components/hero/HeroPanels";
import HeroFallback from "@/components/hero/HeroFallback";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useMediaQuery } from "@/lib/use-media-query";
import { isWebGLAvailable } from "@/lib/webgl";

export default function Hero3D() {
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  // Lazy initializer: runs once on mount. Safe outside an effect because this
  // component only ever renders client-side (loaded via dynamic ssr:false).
  const [webglOk] = useState(() => isWebGLAvailable());

  if (reducedMotion || !webglOk) return <HeroFallback />;

  return (
    <div className="h-screen">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.45} />
        <pointLight position={[4, 3, 5]} intensity={1.4} color="#e63946" />
        <pointLight position={[-4, -2, -3]} intensity={1.2} color="#4d7ad1" />
        <Suspense fallback={null}>
          <ScrollControls pages={3} damping={0.25}>
            <DinobotRig
              offsetX={isMobile ? 0.5 : 1.7}
              scale={isMobile ? 0.65 : 1}
            />
            <Sparkles
              count={isMobile ? 30 : 60}
              scale={[6, 4, 3]}
              size={1.6}
              speed={0.25}
              color="#4d7ad1"
              opacity={0.5}
            />
            <Sparkles
              count={isMobile ? 10 : 20}
              scale={[5, 3, 2]}
              size={2}
              speed={0.2}
              color="#e63946"
              opacity={0.6}
            />
            <Scroll html>
              <HeroPanels />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}

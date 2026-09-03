"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

const MAROON = "#e63946";
const STEEL = "#4d7ad1";
const GUNMETAL = "#5a616f";

const TOOTH_COUNT = 14;
const NODE_COUNT = 8;

/** Triangular falloff weight: 1 at `center`, fading linearly to 0 across `width`. */
function stageWeight(offset: number, center: number, width: number) {
  return THREE.MathUtils.clamp(1 - Math.abs(offset - center) / width, 0, 1);
}

type DinobotRigProps = {
  offsetX?: number;
  scale?: number;
};

export default function DinobotRig({ offsetX = 1.7, scale = 1 }: DinobotRigProps) {
  const scroll = useScroll();

  const group = useRef<THREE.Group>(null);
  const mechGroup = useRef<THREE.Group>(null);
  const elecGroup = useRef<THREE.Group>(null);
  const codeGroup = useRef<THREE.Group>(null);

  const mechMats = useRef<THREE.MeshStandardMaterial[]>([]);
  const nodeMats = useRef<THREE.MeshStandardMaterial[]>([]);
  const codeMats = useRef<THREE.MeshStandardMaterial[]>([]);

  const teeth = useMemo(
    () =>
      Array.from({ length: TOOTH_COUNT }, (_, i) => {
        const angle = (i / TOOTH_COUNT) * Math.PI * 2;
        return {
          position: [Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, 0] as [
            number,
            number,
            number,
          ],
          rotation: [0, 0, angle] as [number, number, number],
        };
      }),
    [],
  );

  const traceSegments = useMemo(
    () => [
      [-0.9, 0.6, 0.9, 0.6],
      [0.9, 0.6, 0.9, -0.2],
      [-0.9, -0.1, 0.2, -0.1],
      [0.2, -0.1, 0.2, -0.9],
      [-0.9, -0.6, -0.2, -0.6],
      [-0.2, -0.6, -0.2, 0.15],
    ],
    [],
  );

  const traceGeometry = useMemo(() => {
    const points: number[] = [];
    for (const [x1, y1, x2, y2] of traceSegments) {
      points.push(x1, y1, 0.06, x2, y2, 0.06);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(points, 3),
    );
    return geometry;
  }, [traceSegments]);

  const nodes = useMemo(
    () =>
      Array.from({ length: NODE_COUNT }, (_, i) => {
        const seg = traceSegments[i % traceSegments.length];
        const t = i < traceSegments.length ? 0 : 1;
        const x = t === 0 ? seg[0] : seg[2];
        const y = t === 0 ? seg[1] : seg[3];
        return [x, y, 0.07] as [number, number, number];
      }),
    [traceSegments],
  );

  useFrame((state) => {
    const offset = scroll.offset;
    const t = state.clock.getElapsedTime();

    if (group.current) {
      group.current.rotation.y = t * 0.12 + offset * Math.PI * 0.9;
      group.current.rotation.x = Math.sin(t * 0.2) * 0.05 + offset * 0.1;
    }

    const mechW = stageWeight(offset, 0.12, 0.45);
    const elecW = stageWeight(offset, 0.5, 0.42);
    const codeW = stageWeight(offset, 0.88, 0.45);

    if (mechGroup.current) {
      const scale = 0.92 + mechW * 0.12;
      mechGroup.current.scale.setScalar(scale);
      mechGroup.current.position.z = mechW * 0.12;
    }
    if (elecGroup.current) {
      const scale = 0.92 + elecW * 0.12;
      elecGroup.current.scale.setScalar(scale);
      elecGroup.current.position.z = elecW * 0.12;
    }
    if (codeGroup.current) {
      const scale = 0.92 + codeW * 0.12;
      codeGroup.current.scale.setScalar(scale);
      codeGroup.current.position.z = 0.1 + codeW * 0.12;
    }

    for (const mat of mechMats.current) {
      mat.emissiveIntensity = 0.25 + mechW * 1.1;
    }
    for (const mat of nodeMats.current) {
      mat.emissiveIntensity = 0.6 + elecW * 2.2;
    }
    for (const mat of codeMats.current) {
      mat.emissiveIntensity = 0.25 + codeW * 1.3;
    }
  });

  return (
    <group ref={group} position={[offsetX, 0, 0]} scale={scale}>
      {/* Mechanical: gear ring, teeth, hub */}
      <group ref={mechGroup}>
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[1.15, 0.16, 12, 48]} />
          <meshStandardMaterial
            ref={(m) => {
              if (m) mechMats.current[0] = m;
            }}
            color={GUNMETAL}
            emissive={STEEL}
            emissiveIntensity={0.3}
            roughness={0.45}
            metalness={0.6}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.28, 20]} />
          <meshStandardMaterial
            ref={(m) => {
              if (m) mechMats.current[1] = m;
            }}
            color={GUNMETAL}
            emissive={STEEL}
            emissiveIntensity={0.3}
            roughness={0.4}
            metalness={0.65}
          />
        </mesh>
        {teeth.map((tooth, i) => (
          <mesh key={i} position={tooth.position} rotation={tooth.rotation}>
            <boxGeometry args={[0.24, 0.32, 0.2]} />
            <meshStandardMaterial
              ref={(m) => {
                if (m) mechMats.current[2 + i] = m;
              }}
              color={GUNMETAL}
              emissive={STEEL}
              emissiveIntensity={0.3}
              roughness={0.45}
              metalness={0.6}
            />
          </mesh>
        ))}
      </group>

      {/* Electronics: circuit traces with glowing red nodes */}
      <group ref={elecGroup}>
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[2.1, 1.7]} />
          <meshStandardMaterial
            color="#111726"
            roughness={0.8}
            metalness={0.1}
            transparent
            opacity={0.55}
          />
        </mesh>
        <lineSegments geometry={traceGeometry}>
          <lineBasicMaterial color={STEEL} transparent opacity={0.85} />
        </lineSegments>
        {nodes.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshStandardMaterial
              ref={(m) => {
                if (m) nodeMats.current[i] = m;
              }}
              color={MAROON}
              emissive={MAROON}
              emissiveIntensity={0.6}
              roughness={0.3}
            />
          </mesh>
        ))}
      </group>

      {/* Software: </> code bracket */}
      <group ref={codeGroup} position={[0, 0, 0.1]}>
        {[-1, 1].map((side, groupIdx) => (
          <group key={side} position={[side * 0.55, 0, 0]}>
            {[1, -1].map((dir, i) => (
              <mesh
                key={i}
                position={[side * -0.09, dir * 0.28, 0]}
                rotation={[0, 0, side * dir * 0.6]}
              >
                <boxGeometry args={[0.55, 0.09, 0.09]} />
                <meshStandardMaterial
                  ref={(m) => {
                    if (m) codeMats.current[groupIdx * 2 + i] = m;
                  }}
                  color="#e8ebf5"
                  emissive={MAROON}
                  emissiveIntensity={0.3}
                  roughness={0.35}
                  metalness={0.2}
                />
              </mesh>
            ))}
          </group>
        ))}
      </group>
    </group>
  );
}

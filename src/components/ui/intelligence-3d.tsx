"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Environment,
  Sparkles,
  MeshDistortMaterial,
  PerspectiveCamera,
  useCursor,
} from "@react-three/drei";
import * as THREE from "three";

function BrainNode({ position, color, isMobile }: { position: [number, number, number]; color: string; isMobile: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useCursor(hovered);

  useFrame((state) => {
    if (mesh.current) {
      // Subtle pulsation
      const t = state.clock.getElapsedTime();
      const scale = 1 + Math.sin(t * 2 + position[0]) * 0.1;
      mesh.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <sphereGeometry args={[0.15, isMobile ? 8 : 16, isMobile ? 8 : 16]} />
      <meshStandardMaterial
        color={hovered ? "#ffffff" : color}
        emissive={hovered ? "#ffffff" : color}
        emissiveIntensity={hovered ? 2 : 0.5}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

function ConnectionLines({ points }: { points: [number, number, number][] }) {
  const lineRef = useRef<THREE.LineSegments>(null);
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = [];

    // Connect nearby points
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dist = new THREE.Vector3(...points[i]).distanceTo(new THREE.Vector3(...points[j]));
        if (dist < 2.5) {
          // Threshold for connection
          positions.push(...points[i], ...points[j]);
        }
      }
    }

    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [points]);

  return (
    <lineSegments ref={lineRef}>
      <primitive object={geometry} />
      <lineBasicMaterial color="#ffffff" transparent opacity={0.15} />
    </lineSegments>
  );
}

function FloatingBrainStructure({ isMobile }: { isMobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();

  // Generate random nodes forming a sphere-like shape
  const nodes = useMemo(() => {
    const temp: [number, number, number][] = [];
    const count = isMobile ? 15 : 30;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const r = 2.2;
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);

      temp.push([x, y, z]);
    }
    return temp;
  }, [isMobile]);

  useFrame((state, delta) => {
    if (group.current) {
      // Rotate the entire brain slowly
      group.current.rotation.y += delta * 0.1;

      // Mouse interaction: slight tilt based on mouse position
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;

      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, y * 0.05, 0.1);
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -x * 0.05, 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={group}>
        {nodes.map((pos, i) => (
          <BrainNode
            key={i}
            position={pos as [number, number, number]}
            color={i % 2 === 0 ? "#3b82f6" : "#60a5fa"}
            isMobile={isMobile}
          />
        ))}
        <ConnectionLines points={nodes} />

        {/* Central Core */}
        <mesh>
          <icosahedronGeometry args={[1.5, 0]} />
          {isMobile ? (
             <meshStandardMaterial
               color="#1d4ed8"
               transparent
               opacity={0.3}
               wireframe={false}
             />
          ) : (
            <MeshDistortMaterial
              color="#1d4ed8"
              speed={2}
              distort={0.4}
              radius={1}
              transparent
              opacity={0.1}
            />
          )}
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.2, 0]} />
          <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

export default function Intelligence3D() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative h-full min-h-[500px] w-full overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]" />
      <Canvas 
        dpr={isMobile ? [1, 1] : [1, 1.5]} 
        gl={{ powerPreference: "high-performance", antialias: false }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={50} />
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />

        <FloatingBrainStructure isMobile={isMobile} />

        {!isMobile && (
          <Sparkles count={30} scale={8} size={2} speed={0.4} opacity={0.4} color="#3b82f6" />
        )}
        
        {!isMobile && <Environment preset="city" />}
      </Canvas>

      <div className="pointer-events-none absolute right-6 bottom-6 left-6 flex items-end justify-between">
        <div className="font-mono text-xs tracking-widest text-slate-400 uppercase">
          Interactive Neural Model
        </div>
        <div className="animate-pulse font-mono text-xs tracking-widest text-slate-400 uppercase">
          Live Data
        </div>
      </div>
    </div>
  );
}

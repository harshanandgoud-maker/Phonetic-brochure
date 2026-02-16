"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, MeshTransmissionMaterial, PerformanceMonitor, Stars, Sparkles, Float as FloatDrei } from "@react-three/drei";
import * as THREE from "three";

const SWARM_COUNT_A = 150; // Optimized from 200
const SWARM_COUNT_B = 100; // Optimized from 150
const SWARM_COUNT_C = 40;  // Optimized from 50

// Helper functions restored
function MovingPointLight() {
    const light = useRef<THREE.PointLight>(null);
    useFrame((state) => {
        const t = state.clock.getElapsedTime() * 0.5;
        if (light.current) {
            light.current.position.set(
                Math.sin(t) * 12,
                Math.cos(t * 1.2) * 12,
                Math.sin(t * 0.8) * 12
            );
        }
    });
    return <pointLight ref={light} intensity={4} color="#3b82f6" />;
}

function InstancedSwarm({ count, geometry, color, speedScale = 1, quality }: { 
    count: number, 
    geometry: THREE.BufferGeometry, 
    color: string, 
    speedScale?: number,
    quality: number 
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
        const t = Math.random() * 100;
        const speed = (0.005 + Math.random() / 200) * speedScale;
        const xFactor = -12 + Math.random() * 24;
        const yFactor = -12 + Math.random() * 24;
        const zFactor = -12 + Math.random() * 24;
        const rSpeed = 0.5 + Math.random();
        const scale = 0.05 + Math.random() * 0.08;
        temp.push({ t, speed, xFactor, yFactor, zFactor, rSpeed, scale });
    }
    return temp;
  }, [count, speedScale]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    particles.forEach((particle, i) => {
      particle.t += particle.speed;
      const { t, xFactor, yFactor, zFactor, rSpeed, scale } = particle;
      
      dummy.position.set(
        xFactor + Math.cos(t) * 1.5,
        yFactor + Math.sin(t * 0.8) * 1.5,
        zFactor + Math.cos(t * 0.5) * 1.5
      );
      
      dummy.rotation.set(t * rSpeed, t * rSpeed * 0.5, t * rSpeed * 0.3);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
        <primitive object={geometry} attach="geometry" />
        <meshStandardMaterial 
            color={color} 
            transparent 
            opacity={quality > 0.5 ? 0.4 : 0.1}
            roughness={0.2}
            metalness={0.8}
        />
    </instancedMesh>
  );
}

function HeroShape({ 
  position, 
  color, 
  geometry, 
  scale = 1, 
  rotationSpeed = 0.2,
  quality = 1
}: {
  position: [number, number, number];
  color: string;
  geometry: THREE.BufferGeometry;
  scale?: number;
  rotationSpeed?: number;
  quality?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * rotationSpeed;
      mesh.current.rotation.y += delta * (rotationSpeed * 0.5);
    }
  });

  return (
    <Float floatIntensity={quality > 0.5 ? 3 : 0} rotationIntensity={1} speed={1}>
      <mesh ref={mesh} position={position} scale={scale} geometry={geometry}>
        {quality > 0.5 ? (
          <MeshTransmissionMaterial
            backside={false}
            thickness={0.3} 
            chromaticAberration={0} 
            anisotropy={0} 
            distortion={0.4}
            distortionScale={0.4}
            temporalDistortion={0}
            color={color}
            roughness={0.1}
            resolution={quality > 0.8 ? 256 : 128} // Adaptive resolution
            samples={2}
          />
        ) : (
            <meshStandardMaterial
                color={color}
                transparent
                opacity={0.3}
                roughness={0.2}
                metalness={0.8}
            />
        )}
      </mesh>
    </Float>
  );
}

function Scene({ quality }: { quality: number }) {
  const { viewport } = useThree();
  const scaleFactor = Math.min(viewport.width / 5, 1);
  
  const geometries = useMemo(() => ({
    icosahedron: new THREE.IcosahedronGeometry(1.2, 0),
    torusKnot: new THREE.TorusKnotGeometry(0.6, 0.2, 32, 8),
    octahedron: new THREE.OctahedronGeometry(1, 0),
    dodecahedron: new THREE.DodecahedronGeometry(0.8, 0),
    tetra: new THREE.TetrahedronGeometry(1, 0),
    box: new THREE.BoxGeometry(1, 1, 1)
  }), []);

  const finalSwarmCountA = quality > 0.5 ? SWARM_COUNT_A : Math.floor(SWARM_COUNT_A / 3);
  const finalSwarmCountB = quality > 0.5 ? SWARM_COUNT_B : Math.floor(SWARM_COUNT_B / 3);
  const finalSwarmCountC = quality > 0.5 ? SWARM_COUNT_C : Math.floor(SWARM_COUNT_C / 3);

  return (
    <FloatDrei speed={0.8} rotationIntensity={0.2} floatIntensity={0.2}>
      <group scale={scaleFactor}>
        <Stars radius={50} depth={50} count={quality > 0.5 ? 1500 : 500} factor={4} saturation={0} fade speed={1} />
        {quality > 0.5 && <Sparkles count={300} scale={20} size={1.5} speed={0.3} opacity={0.4} color="#ffffff" />}
        
        <InstancedSwarm count={finalSwarmCountA} geometry={geometries.octahedron} color="#3b82f6" speedScale={0.5} quality={quality} />
        <InstancedSwarm count={finalSwarmCountB} geometry={geometries.tetra} color="#ec4899" speedScale={0.8} quality={quality} />
        <InstancedSwarm count={finalSwarmCountC} geometry={geometries.dodecahedron} color="#10b981" speedScale={1.2} quality={quality} />

        <HeroShape 
            position={[3, 1.5, -2]} 
            color="#3b82f6" 
            geometry={geometries.icosahedron} 
            scale={1.5}
            quality={quality}
        />
        <HeroShape 
            position={[-3, -2, -1]} 
            color="#ec4899" 
            geometry={geometries.torusKnot} 
            scale={1.2}
            rotationSpeed={0.3}
            quality={quality}
        />
        <HeroShape 
            position={[0.5, 3, -4]} 
            color="#8b5cf6" 
            geometry={geometries.box} 
            scale={1.2}
            quality={quality}
        />
        
        <MovingPointLight />
        <MovingPointLight />
      </group>
    </FloatDrei>
  );
}

export default function Abstract3DBackground() {
  const [dpr, setDpr] = useState(0.6); // Start low for instant load
  const [quality, setQuality] = useState(0); // Start low

// ... (rest of the component)

  // Optimize initial quality based on device
  React.useEffect(() => {
    // Only upgrade if not mobile and performance is likely good
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
        setDpr(1);
        setQuality(1);
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0 h-full w-full opacity-80 pointer-events-none bg-black/10">
        <Canvas 
            dpr={dpr}
            camera={{ position: [0, 0, 12], fov: 40 }}
            gl={{ 
                alpha: true, 
                antialias: false,
                powerPreference: "high-performance",
                stencil: false,
                depth: true,
                precision: "lowp", // Force low precision for speed
                failIfMajorPerformanceCaveat: false
            }}
            performance={{ min: 0.5 }}
        >
            <PerformanceMonitor 
                onIncline={() => { 
                    const isMobile = window.innerWidth < 768;
                    if (!isMobile) {
                        setDpr(1.2); 
                        setQuality(1); 
                    }
                }} 
                onDecline={() => { setDpr(0.6); setQuality(0); }} // Drop lower on decline
                flipflops={2}
                onFallback={() => { setDpr(0.5); setQuality(0); }}
            />
            <fog attach="fog" args={["#000000", 15, 35]} />
            <ambientLight intensity={0.4} />
            <spotLight position={[15, 15, 15]} angle={0.2} penumbra={1} intensity={2} color="#ffffff" />
            
            <Scene quality={quality} />
            <Environment preset="night" />
        </Canvas>
    </div>
  );
}

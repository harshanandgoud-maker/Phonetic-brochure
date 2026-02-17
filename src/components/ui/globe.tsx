"use client";

import React, { useRef, useEffect } from "react";
import createGlobe from "cobe";
import { cn } from "@/lib/utils";

export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const width = window.innerWidth;
    const isMobile = width < 768;
    const isSmallMobile = width < 400;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: isMobile ? 1 : 2, // Strict 1x DPR on mobile
      width: isMobile ? 400 : 1000 * 2,
      height: isMobile ? 400 : 1000 * 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.2,
      mapSamples: isMobile ? (isSmallMobile ? 1200 : 2000) : 10000, 
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      markerColor: [0.1, 0.4, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [40.7128, -74.0060], size: isMobile ? 0.05 : 0.1 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className={cn("relative flex w-full max-w-[700px] aspect-square items-center justify-center overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-full aspect-square"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

"use client";

import React, { useRef, useEffect } from "react";
import createGlobe from "cobe";
import { cn } from "@/lib/utils";

export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const isMobile = window.innerWidth < 768;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: isMobile ? 1 : 2,
      width: 1000 * 2,
      height: 1000 * 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.2,
      mapSamples: isMobile ? 4000 : 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      markerColor: [0.1, 0.4, 1],
      glowColor: [1, 1, 1],
      markers: [
        // approximate New York
        { location: [40.7128, -74.0060], size: isMobile ? 0.05 : 0.1 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
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
        className="w-[1000px] h-[1000px] max-w-full aspect-square"
      />
    </div>
  );
}

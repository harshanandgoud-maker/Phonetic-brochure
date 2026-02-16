"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check for touch capability first
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    
    // Disable Lenis on touch devices for native smooth scrolling (prevents jitter/lag)
    if (isTouch) {
        return;
    }

    // Initialize Lenis with smooth settings
    const lenis = new Lenis({
      duration: 1.2, // Slightly snappier
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Use requestAnimationFrame to link Lenis update to the render loop
    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}

"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
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

    // Disable Lenis on touch devices for native smooth scrolling (prevents jitter/lag)
    // We do this by checking the user agent or touch interference, but Lenis handles it well usually.
    // However, for "no lag" guarantee on low-end mobile, native is best.
    // We can't cancel the instance easily if we don't start it, but let's just not start it.
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
        lenis.destroy();
        return;
    }

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

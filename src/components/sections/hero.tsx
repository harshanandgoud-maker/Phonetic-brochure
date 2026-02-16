"use client";

import React, { useRef } from "react";
import createGlobe from "cobe";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Globe Component
function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const isMobile = window.innerWidth < 768;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 1, // Keep 1 for performance
      width: 800 * 1,
      height: 800 * 1,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.2,
      mapSamples: isMobile ? 4000 : 10000, // Reduced samples for mobile
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
    <div className={cn("relative flex w-full h-full max-w-[700px] aspect-square items-center justify-center overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        className="w-[1000px] h-[1000px] max-w-full aspect-square"
      />
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background pt-20">
      {/* Optimized Dotted Background */}
      <div className="absolute inset-0 z-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 ring-1 ring-inset ring-blue-600/20 mx-auto lg:mx-0 w-fit"
            >
              THE FUTURE OF LEARNING
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-extrabold tracking-tighter sm:text-5xl xl:text-7xl/none text-[#0f172a]"
            >
              Master the Art of <span className="text-[#2563eb]">Communication</span> with Cinematic Precision
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 mx-auto lg:mx-0"
            >
              Experience education as a <span className="font-semibold text-gray-900">cinematic masterpiece</span>. We fuse phonemic intelligence with high-end storytelling to redefine your voice and presence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start"
            >
              <Link
                href="#"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#2563eb] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Start Your Journey
              </Link>
              <Link
                href="#"
                className="inline-flex h-12 items-center justify-center rounded-full border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Watch Trailer
              </Link>
            </motion.div>
          </div>

          {/* Right Visual (Globe) */}
          <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="mx-auto flex w-full max-w-[500px] items-center justify-center lg:max-w-none aspect-square"
          >
            <Globe className="" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

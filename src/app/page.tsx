"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/sections/navbar";
import HeroSection from "@/components/sections/hero";
import PhilosophySection from "@/components/sections/philosophy";
import WhoWeAreSection from "@/components/sections/who-we-are";
import AboutSection from "@/components/sections/about";
import MissionStatement from "@/components/sections/mission-statement";
import PhonemicIntelligence from "@/components/sections/phonemic-intelligence";
import CoursesSection from "@/components/sections/courses";
import DetailedCurriculum from "@/components/sections/detailed-curriculum";
import StatsSection from "@/components/sections/stats-dark";
import CurriculumTimeline from "@/components/sections/curriculum-timeline";
import WhyChooseUs from "@/components/sections/why-choose-us";
import Testimonials from "@/components/sections/testimonials";
import Footer from "@/components/sections/footer";
import SplashIntro from "@/components/sections/splash-intro";
import {
  MagneticCursor,
  ScrollProgress,
  FloatingParticles,
  GlowingOrbs,
  GrainOverlay,
  LensFlare,
} from "@/components/ui/cinematic-effects";



export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  
  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    // Dynamic import to avoid SSR issues with Lenis
    import("lenis").then((LenisModule) => {
      const Lenis = LenisModule.default;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easeOutExpo
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    });
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem("hasSeenIntro", "true");
  };

  return (
    <MagneticCursor>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
        <ScrollProgress />

        {/* Splash Intro Overlay */}
        <AnimatePresence>
          {showIntro && (
            <motion.div
              key="intro"
              initial={{ opacity: 1 }}
              exit={{ 
                opacity: 0, 
                transition: { duration: 1, ease: "easeInOut" } 
              }}
              className="fixed inset-0 z-99999"
            >
              <SplashIntro onComplete={handleIntroComplete} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content - Mounted always but revealed smoothly */}
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: showIntro ? 0 : 1,
            // Small scale effect for depth, but no blur for performance
            scale: showIntro ? 0.98 : 1
          }}
          transition={{ 
            duration: 1.5, 
            ease: [0.16, 1, 0.3, 1], // expoOut
            delay: showIntro ? 0 : 0.2 // Slight delay to let splash fade out start
          }}
          className="relative"
        >
          <GrainOverlay />
          <LensFlare />
          
          {/* Delay particle rendering until after intro to save resources */}
          {!showIntro && (
            <>
              <GlowingOrbs count={6} className="fixed inset-0 z-0" />
              <FloatingParticles 
                count={30} 
                className="fixed inset-0 z-0" 
                color="rgba(37, 99, 235, 0.2)" 
              />
            </>
          )}

          <Navbar />
          <main className="relative z-10">
            <HeroSection />
            <PhilosophySection />
            <WhoWeAreSection />
            <AboutSection />
            <MissionStatement />
            <PhonemicIntelligence />
            <CoursesSection />
            <DetailedCurriculum />
            <StatsSection />
            <CurriculumTimeline />
            <WhyChooseUs />
            <Testimonials />
          </main>
          <Footer />
        </motion.div>
      </div>
    </MagneticCursor>
  );
}

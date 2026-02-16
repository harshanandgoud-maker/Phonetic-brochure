"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Navbar from "@/components/sections/navbar";
import HeroSection from "@/components/sections/hero";
import SplashIntro from "@/components/sections/splash-intro";

// Dynamically import below-the-fold sections
const PhilosophySection = dynamic(() => import("@/components/sections/philosophy"), { ssr: false });
const WhoWeAreSection = dynamic(() => import("@/components/sections/who-we-are"));
const AboutSection = dynamic(() => import("@/components/sections/about"));
const MissionStatement = dynamic(() => import("@/components/sections/mission-statement"));
const PhonemicIntelligence = dynamic(() => import("@/components/sections/phonemic-intelligence"));
const CoursesSection = dynamic(() => import("@/components/sections/courses"));
const DetailedCurriculum = dynamic(() => import("@/components/sections/detailed-curriculum"));
const StatsSection = dynamic(() => import("@/components/sections/stats-dark"));
const CurriculumTimeline = dynamic(() => import("@/components/sections/curriculum-timeline"));
const WhyChooseUs = dynamic(() => import("@/components/sections/why-choose-us"));
const Testimonials = dynamic(() => import("@/components/sections/testimonials"));
const Footer = dynamic(() => import("@/components/sections/footer"));
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
  
  // Lenis initialization removed as it is handled globally in layout.tsx via SmoothScrolling component

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
          
          {/* Delay particle rendering until after intro to save resources - DISABLED FOR CLEAN LOOK
          {!showIntro && (
            <>
               <GlowingOrbs count={3} className="fixed inset-0 z-0" />
               <FloatingParticles 
                 count={15} 
                 className="fixed inset-0 z-0" 
                 color="rgba(37, 99, 235, 0.2)" 
               />
            </>
          )} 
          */}

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

"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  heroReveal,
  staggerContainerCinematic,
  wordRevealCinematic,
  float,
  pixelReveal,
} from "@/lib/animations";
import { MagneticButton } from "@/components/ui/cinematic-effects";
import Image from "next/image";

export default function HeroSection() {
  const words = "Master the Art of Communication with Cinematic Precision".split(" ");

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        >
          <source src="/intro-video.mp4" type="video/mp4" />
        </video>
        <div className="from-background to-background absolute inset-0 bg-linear-to-b via-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div variants={staggerContainerCinematic} initial="hidden" animate="visible">
            <motion.div variants={pixelReveal} className="mb-8 flex flex-col items-center">
              <div className="relative mb-4 h-48 w-48 md:h-64 md:w-64">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2897df09-0070-4f38-8117-82d9d8b58194/download-1768478469467.png?width=1024&height=1024&resize=contain"
                  alt="PHONETIC Logo"
                  fill
                  sizes="(max-width: 768px) 192px, 256px"
                  className="object-contain"
                  priority
                />
              </div>
              <span className="border-primary/30 bg-primary/10 text-primary rounded-full border px-4 py-2 text-sm font-medium tracking-widest uppercase">
                Welcome to the Future of Learning
              </span>
            </motion.div>

            <h1 className="mb-8 text-5xl leading-tight font-bold tracking-tight md:text-8xl">
              {words.map((word, i) => (
                <span key={i} className="mr-3 inline-block overflow-hidden md:mr-6">
                  <motion.span variants={wordRevealCinematic} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              variants={heroReveal}
              className="text-muted-foreground mx-auto mb-12 max-w-2xl text-xl leading-relaxed md:text-2xl"
            >
              Experience education like a cinematic masterpiece. We combine phonemic intelligence
              with high-end storytelling to transform how you speak and think.
            </motion.p>

            <motion.div
              variants={staggerContainerCinematic}
              className="flex flex-col items-center justify-center gap-6 sm:flex-row"
            >
              <MagneticButton
                strength={0.3}
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20 w-full rounded-full px-10 py-5 text-lg font-bold shadow-2xl transition-colors sm:w-auto"
              >
                Start Your Journey
              </MagneticButton>
              <MagneticButton
                strength={0.2}
                className="w-full rounded-full border border-white/20 px-10 py-5 text-lg font-bold backdrop-blur-sm transition-colors hover:bg-white/10 sm:w-auto"
              >
                Watch Trailer
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        variants={float}
        animate="animate"
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/20 pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="bg-primary h-1.5 w-1.5 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

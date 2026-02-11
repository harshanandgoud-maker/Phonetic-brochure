"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Brain,
  BookOpen,
  Briefcase,
  Zap,
  Activity,
  Target,
  LucideIcon,
} from "lucide-react";

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  stats: string;
  color: string;
}

const slides: Slide[] = [
  {
    title: "Phonemic Intelligence",
    subtitle: "BRAIN-BASED LEARNING",
    description:
      "Revolutionary sound-based technology that activates the Anterior Cingulate for enhanced cognitive performance and learning retention.",
    icon: Brain,
    stats: "01/06",
    color: "bg-blue-500/10",
  },
  {
    title: "Sound Activation",
    subtitle: "NEURAL TRIGGERS",
    description:
      "Specific phonemic patterns designed to stimulate neural pathways, leading to immediate increases in focus and mental agility.",
    icon: Zap,
    stats: "02/06",
    color: "bg-amber-500/10",
  },
  {
    title: "Neural Plasticity",
    subtitle: "COGNITIVE REWIRING",
    description:
      "PI techniques leverage neuroplasticity to create permanent improvements in how your brain processes and stores information.",
    icon: Activity,
    stats: "03/06",
    color: "bg-emerald-500/10",
  },
  {
    title: "Deep Flow States",
    subtitle: "UNINTERRUPTED FOCUS",
    description:
      "Achieve the 'zone' on demand. PI helps you bypass mental friction and enter states of high productivity effortlessly.",
    icon: Target,
    stats: "04/06",
    color: "bg-purple-500/10",
  },
  {
    title: "Language Mastery",
    subtitle: "LINGUISTIC PRECISION",
    description:
      "Accelerate your ability to learn new languages and technical terminologies by 3x through phonetic pattern recognition.",
    icon: BookOpen,
    stats: "05/06",
    color: "bg-rose-500/10",
  },
  {
    title: "Executive Excellence",
    subtitle: "PROFESSIONAL PEAK",
    description:
      "Apply enhanced cognitive capabilities to complex problem-solving and leadership in the corporate world.",
    icon: Briefcase,
    stats: "06/06",
    color: "bg-indigo-500/10",
  },
];

const PhonemicIntelligence = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const currentSlide = slides[activeSlide];
  const CurrentIcon = currentSlide?.icon;

  if (!currentSlide) return null;

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white py-24 md:py-32">
      {/* Background Decoratives */}
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.015]"></div>

      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-16 lg:flex-row lg:gap-24">
          {/* Left Column: Content */}
          <div className="order-2 w-full flex-1 text-left lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="border-primary/20 text-primary mb-8 inline-flex items-center gap-2 rounded-full border bg-white px-5 py-2 text-xs font-semibold tracking-[0.15em] uppercase shadow-sm"
            >
              What We Do
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display mb-12 text-5xl leading-[0.95] font-extrabold tracking-tight md:text-6xl lg:text-8xl"
            >
              Transforming <br />
              <span className="text-primary">Potential</span> Into <br />
              Performance
            </motion.h2>

            <div className="relative flex min-h-[300px] items-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  className="w-full max-w-xl"
                >
                  <div className="mb-8 flex items-center gap-4">
                    <div className="bg-primary h-0.5 w-12 rounded-full"></div>
                    <div className="flex gap-1">
                      {slides.map((_, i) => (
                        <div
                          key={i}
                          className={`h-0.5 w-1.5 rounded-full transition-all duration-300 ${i === activeSlide ? "bg-primary w-4" : "bg-primary/20"}`}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`group rounded-[2.5rem] border border-black/5 bg-white p-8 shadow-xl shadow-black/5 transition-all duration-500 md:p-10`}
                  >
                    <div
                      className={`h-16 w-16 rounded-2xl ${currentSlide.color} mb-8 flex items-center justify-center`}
                    >
                      <CurrentIcon className="text-primary h-8 w-8" />
                    </div>
                    <div>
                      <span className="text-muted-foreground mb-3 block text-xs font-bold tracking-[0.3em] uppercase">
                        {currentSlide.subtitle}
                      </span>
                      <h3 className="font-display text-foreground mb-6 text-3xl font-extrabold md:text-4xl">
                        {currentSlide.title}
                      </h3>
                      <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                        {currentSlide.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="text-primary/40 text-sm font-bold tracking-widest">
                          {currentSlide.stats}
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={prevSlide}
                            className="hover:bg-secondary flex h-12 w-12 items-center justify-center rounded-full border border-black/5 transition-all duration-300 hover:text-white"
                            aria-label="Previous Slide"
                          >
                            <ArrowLeft className="h-5 w-5" />
                          </button>
                          <button
                            onClick={nextSlide}
                            className="bg-primary shadow-primary/20 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                            aria-label="Next Slide"
                          >
                            <ArrowRight className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Visual Representation */}
          <div className="relative order-1 flex min-h-[400px] flex-1 items-center justify-center lg:order-2">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[300px] w-[300px] animate-[spin_60s_linear_infinite] rounded-full border border-black/3 md:h-[500px] md:w-[500px]"></div>
              <div className="h-[200px] w-[200px] animate-[spin_40s_linear_infinite_reverse] rounded-full border border-dashed border-black/2 md:h-[350px] md:w-[350px]"></div>
            </div>

            <div className="relative z-20">
              <motion.div
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="shadow-primary/20 border-primary/10 group relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-[3rem] border bg-white shadow-2xl md:h-56 md:w-56"
              >
                <div className="from-primary/5 absolute inset-0 bg-linear-to-br to-transparent"></div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 1.5, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10"
                  >
                    <CurrentIcon className="text-primary h-20 w-20 md:h-24 md:w-24" />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Orbital Points */}
              {slides.map((_, i) => {
                const angle = (i * 360) / slides.length;
                const active = i === activeSlide;
                return (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 h-4 w-4"
                    animate={{
                      rotate: angle,
                    }}
                    style={{
                      transformOrigin: "center center",
                    }}
                  >
                    <div
                      className={`h-4 w-4 -translate-x-1/2 -translate-y-[180px] rounded-full transition-all duration-500 md:-translate-y-[250px] ${
                        active
                          ? "bg-primary scale-150 shadow-[0_0_20px_0_rgba(37,99,235,0.5)]"
                          : "bg-black/10"
                      }`}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhonemicIntelligence;

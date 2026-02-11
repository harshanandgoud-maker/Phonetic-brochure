"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  batch: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "The Phonemic Intelligence program completely transformed how I approach learning. I secured a 12 LPA package at TCS within 3 months of completing the course.",
    name: "Rahul Sharma",
    role: "Software Engineer at TCS",
    batch: "Batch 2023",
    initials: "RS",
  },
  {
    id: 2,
    quote:
      "PHONETIC's unique methodology helped me master complex technical concepts with ease. My cognitive performance has significantly improved since the PI activation.",
    name: "Priya Patel",
    role: "Data Scientist at Microsoft",
    batch: "Batch 2023",
    initials: "PP",
  },
  {
    id: 3,
    quote:
      "Not just technical training, the focus on soft skills and psychological frameworks prepared me for real-world industry challenges like no other platform.",
    name: "Anish Gupta",
    role: "Full Stack Developer at Amazon",
    batch: "Batch 2024",
    initials: "AG",
  },
  {
    id: 4,
    quote:
      "The transition from learning to earning was so seamless. The industry partnerships and dedicated placement assistance really work.",
    name: "Sneha Reddy",
    role: "Cloud Architect at Google",
    batch: "Batch 2022",
    initials: "SR",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    filter: "blur(10px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    filter: "blur(10px)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  }),
};

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="success" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.01]"></div>
      <motion.div
        className="bg-primary/3 pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />

      <div className="relative z-10 container mx-auto max-w-5xl px-6">
        <motion.div
          className="mb-16 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2
            className="font-display mb-4 text-4xl leading-[1.1] font-extrabold tracking-tight md:text-5xl lg:text-6xl"
            variants={fadeInUp}
          >
            <span className="text-foreground">Voices of</span>
            <br />
            <motion.span className="text-primary mt-2 inline-block" variants={fadeInUp}>
              Transformation
            </motion.span>
          </motion.h2>
        </motion.div>

        <div className="group relative flex min-h-[400px] flex-col items-center">
          <div className="mb-12 w-full text-center">
            <div className="relative mb-8 inline-block">
              <motion.div
                initial={{ opacity: 0, rotate: 180, scale: 0 }}
                whileInView={{ opacity: 1, rotate: 180, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Quote
                  className="text-primary/10 absolute -top-10 -left-12 h-12 w-12"
                  strokeWidth={1.5}
                />
              </motion.div>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.p
                  key={activeIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="text-foreground/90 mx-auto max-w-3xl px-4 text-xl leading-relaxed font-medium italic md:text-2xl"
                >
                  &quot;{testimonials[activeIndex].quote}&quot;
                </motion.p>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.4, 0.25, 1] as const,
                }}
              >
                <motion.div
                  className="bg-primary/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-primary text-lg font-bold tracking-wider">
                    {testimonials[activeIndex].initials}
                  </span>
                </motion.div>
                <h4 className="font-display text-foreground mb-1 text-lg font-bold">
                  {testimonials[activeIndex].name}
                </h4>
                <p className="text-muted-foreground mb-1 text-sm font-medium">
                  {testimonials[activeIndex].role}
                </p>
                <p className="text-primary text-xs font-semibold tracking-widest uppercase">
                  {testimonials[activeIndex].batch}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            className="mt-8 flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={prevSlide}
              className="text-muted-foreground hover:text-primary hover:border-primary/20 flex h-10 w-10 items-center justify-center rounded-full border border-black/5 shadow-sm transition-all duration-300 hover:bg-white"
              aria-label="Previous testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeIndex === index ? "bg-primary w-8" : "w-1.5 bg-black/10 hover:bg-black/20"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextSlide}
              className="text-muted-foreground hover:text-primary hover:border-primary/20 flex h-10 w-10 items-center justify-center rounded-full border border-black/5 shadow-sm transition-all duration-300 hover:bg-white"
              aria-label="Next testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

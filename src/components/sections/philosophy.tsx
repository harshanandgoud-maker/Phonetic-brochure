"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  cinematicFadeIn,
  staggerContainerSlow,
  letterReveal3D,
  lineReveal,
} from "@/lib/animations";

const PhilosophySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);

  const words = [
    { text: "Unlocking", highlight: false },
    { text: "potential", highlight: false },
    { text: "through", highlight: false },
    { text: "Phonemic", highlight: true },
    { text: "Intelligence", highlight: true },
    { text: "technology", highlight: false },
  ];

  return (
    <section
      ref={sectionRef}
      id="about-philosophy"
      className="perspective-2000 relative flex min-h-screen items-center justify-center overflow-hidden bg-white py-0"
    >
      <div className="pointer-events-none absolute inset-0 z-0 opacity-10">
        <video autoPlay muted loop playsInline className="h-full w-full object-cover">
          <source src="/intro-video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.015]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="border-primary/5 absolute top-1/2 left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
          initial={{ scale: 0, opacity: 0, rotate: -90 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="border-primary/8 absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
          initial={{ scale: 0, opacity: 0, rotate: 90 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="border-primary/10 absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <motion.div
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6"
        style={{ y, scale, rotateX }}
      >
        <motion.div
          className="philosophy-badge border-primary/20 text-primary mb-16 rounded-full border bg-white px-8 py-3 text-[11px] font-bold tracking-[0.3em] uppercase shadow-lg gpu-accelerated"
          variants={cinematicFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          whileHover={{
            scale: 1.1,
          }}
          style={{ willChange: "transform" }}
        >
          Our Core Philosophy
        </motion.div>

        <motion.div
          className="perspective-2000 mb-16 text-center"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="font-display flex flex-wrap justify-center gap-x-[0.25em] gap-y-4 text-5xl leading-none font-black tracking-tight md:text-7xl lg:text-8xl">
            {words.map((word, wordIndex) => (
              <motion.span
                key={wordIndex}
                className={`perspective-1500 preserve-3d inline-block overflow-visible ${word.highlight ? "text-primary" : "text-foreground"}`}
                variants={letterReveal3D}
                whileHover={{
                  scale: 1.15,
                  rotateY: word.highlight ? 10 : -10,
                  rotateX: -5,
                  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                }}
                style={{ willChange: "transform" }}
              >
                {word.text}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        <motion.div
          className="philosophy-divider flex w-full max-w-2xl origin-center items-center gap-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <motion.div
            className="via-primary/40 to-primary/40 h-[2px] flex-1 rounded-full bg-linear-to-r from-transparent"
            variants={lineReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            style={{ originX: 0 }}
          />
          <motion.span
            className="text-muted-foreground text-[11px] font-bold tracking-[0.4em] whitespace-nowrap uppercase"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.1, color: "#2563eb" }}
          >
            The Path to Success
          </motion.span>
          <motion.div
            className="via-primary/40 to-primary/40 h-[2px] flex-1 rounded-full bg-linear-to-l from-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 1 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PhilosophySection;

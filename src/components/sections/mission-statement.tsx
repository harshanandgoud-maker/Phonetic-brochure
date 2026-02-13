"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Rocket, Users, Award, Zap } from "lucide-react";
import { Globe } from "@/components/ui/globe";
import {
  cinematicFadeIn,
  slideFromLeft,
  slideFromRight,
  staggerContainerSlow,
  cardReveal3D,
  wordReveal,
} from "@/lib/animations";

const MissionStatement = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const globeScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.8]);
  const globeOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.3, 0.3, 0]);
  const globeRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const stats = [
    {
      icon: <Rocket className="text-primary h-6 w-6 transition-colors group-hover:text-white" />,
      value: "100+",
      label: "Innovation",
    },
    {
      icon: <Users className="text-primary h-6 w-6 transition-colors group-hover:text-white" />,
      value: "5000+",
      label: "Students",
    },
    {
      icon: <Award className="text-primary h-6 w-6 transition-colors group-hover:text-white" />,
      value: "98%",
      label: "Success Rate",
    },
    {
      icon: <Zap className="text-primary h-6 w-6 transition-colors group-hover:text-white" />,
      value: "200+",
      label: "Hiring Partners",
    },
  ];

  const missionLines = [
    { text: "We believe in", align: "left" },
    { text: "unlocking human", align: "right" },
    { text: "potential through", align: "left" },
    { text: "revolutionary", align: "right", highlight: true },
    { text: "education.", align: "center", highlight: true },
  ];

  return (
    <section
      ref={sectionRef}
      className="perspective-2000 relative flex min-h-[120vh] flex-col justify-center overflow-hidden bg-white py-32"
    >
      <div className="absolute inset-0">
        <div className="from-primary/5 to-primary/5 absolute inset-0 bg-linear-to-b via-transparent" />
        <motion.div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            scale: globeScale,
            opacity: globeOpacity,
            rotate: globeRotate,
          }}
        >
          <Globe />
        </motion.div>
      </div>
      <div className="noise-overlay" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <motion.div
          className="mb-20 text-center"
          variants={cinematicFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.span
            className="border-primary/20 text-primary inline-flex items-center gap-2 rounded-full border bg-white px-8 py-3 text-[11px] font-bold tracking-[0.3em] uppercase shadow-lg"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 25px 50px -12px rgba(37, 99, 235, 0.4)",
            }}
          >
            Our Mission
          </motion.span>
        </motion.div>

        <motion.div
          className="mb-40 space-y-6 md:space-y-8"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {missionLines.map((line, index) => (
            <motion.div
              key={index}
              className={`flex ${
                line.align === "left"
                  ? "justify-center md:justify-start md:pl-16"
                  : line.align === "right"
                    ? "justify-center md:justify-end md:pr-16"
                    : "justify-center"
              }`}
              variants={
                line.align === "left"
                  ? slideFromLeft
                  : line.align === "right"
                    ? slideFromRight
                    : wordReveal
              }
            >
              <motion.h2
                className={`font-display preserve-3d text-5xl leading-[0.95] font-black tracking-tighter md:text-7xl lg:text-8xl ${
                  line.highlight ? "text-primary" : "text-foreground"
                } ${
                  line.align === "left"
                    ? "origin-left"
                    : line.align === "right"
                      ? "origin-right"
                      : "origin-center"
                }`}
                whileHover={{
                  scale: 1.08,
                  rotateY: line.align === "left" ? 8 : line.align === "right" ? -8 : 0,
                  rotateX: -5,
                  textShadow: line.highlight
                    ? "0 40px 80px rgba(37, 99, 235, 0.4)"
                    : "0 40px 80px rgba(0, 0, 0, 0.15)",
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                {line.text}
              </motion.h2>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mx-auto mb-28 max-w-3xl text-center"
          variants={cinematicFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-muted-foreground text-xl leading-relaxed font-medium md:text-2xl">
            Our mission is to bridge the gap between human potential and corporate excellence. By
            leveraging cutting-edge phonemic intelligence and cognitive neuroscience, we empower
            individuals to achieve unprecedented levels of mental clarity, technical mastery, and
            professional success.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-8 px-4 md:grid-cols-4"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="group preserve-3d relative rounded-[2.5rem] border border-black/5 bg-white p-10 text-center gpu-accelerated"
              variants={cardReveal3D}
              whileHover={{
                y: -20,
                scale: 1.08,
                rotateX: -8,
                rotateY: index === 0 ? -8 : index === 3 ? 8 : 0,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              }}
              style={{ willChange: "transform" }}
            >
              <motion.div
                className="bg-primary/10 group-hover:bg-primary mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500"
                whileHover={{ scale: 1.2, rotate: 15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {stat.icon}
              </motion.div>
              <motion.div
                className="font-display text-foreground mb-3 text-4xl font-black md:text-5xl"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.3 + index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-muted-foreground text-[10px] font-bold tracking-[0.25em] uppercase md:text-xs">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="border-primary/5 absolute top-1/2 left-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="border-primary/8 absolute top-1/2 left-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
          initial={{ scale: 0, opacity: 0, rotate: 180 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="border-primary/10 absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </section>
  );
};

export default MissionStatement;

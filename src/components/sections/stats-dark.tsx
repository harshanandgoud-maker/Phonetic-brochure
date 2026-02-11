"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users, Briefcase, Trophy, Handshake, BookOpen, TrendingUp } from "lucide-react";
import { cinematicFadeIn, staggerContainerSlow, cardReveal3D, wordReveal } from "@/lib/animations";

const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const contentY = useTransform(scrollYProgress, [0, 1], [100, -50]);

  const stats = [
    {
      label: "Students Trained",
      value: "5000+",
      description: "Learners transformed through our programs",
      icon: <Users className="h-7 w-7" />,
    },
    {
      label: "Placement Rate",
      value: "98%",
      description: "Successfully placed in top companies",
      icon: <TrendingUp className="h-7 w-7" />,
    },
    {
      label: "Highest Package",
      value: "45 LPA",
      description: "Top salary secured by our students",
      icon: <Trophy className="h-7 w-7" />,
    },
    {
      label: "Hiring Partners",
      value: "200+",
      description: "Companies actively recruiting",
      icon: <Handshake className="h-7 w-7" />,
    },
    {
      label: "Courses Offered",
      value: "15+",
      description: "Industry-aligned programs",
      icon: <BookOpen className="h-7 w-7" />,
    },
    {
      label: "Average Package",
      value: "8.5 LPA",
      description: "Mean salary for placements",
      icon: <Briefcase className="h-7 w-7" />,
    },
  ];

  const titleWords = ["Numbers", "That", "Speak"];

  return (
    <section
      ref={sectionRef}
      id="numbers"
      className="perspective-2000 bg-secondary relative overflow-hidden py-40"
    >
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.03]"></div>

      <motion.div
        className="bg-primary/15 absolute top-0 left-1/4 h-[800px] w-[800px] -translate-y-1/2 rounded-full blur-[150px]"
        style={{ y: backgroundY }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="bg-primary/12 absolute right-1/4 bottom-0 h-[700px] w-[700px] translate-y-1/2 rounded-full blur-[180px]"
        style={{ y: backgroundY }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div className="relative z-10 container mx-auto px-6" style={{ y: contentY }}>
        <motion.div
          className="mx-auto mb-24 max-w-4xl text-center"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="border-primary/40 bg-primary/10 text-primary mb-10 inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-[11px] font-bold tracking-[0.3em] uppercase"
            variants={cinematicFadeIn}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 40px rgba(37, 99, 235, 0.5)",
            }}
          >
            Impact in Motion
          </motion.div>
          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-display mb-8 text-5xl leading-[0.9] font-black tracking-tighter text-white md:text-7xl lg:text-8xl">
              {titleWords.map((word, index) => (
                <motion.span
                  key={index}
                  className={`mr-4 inline-block ${index === 2 ? "text-primary" : ""}`}
                  variants={wordReveal}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "bottom center",
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotateX: -10,
                    textShadow:
                      index === 2
                        ? "0 30px 60px rgba(37, 99, 235, 0.6)"
                        : "0 30px 60px rgba(255, 255, 255, 0.3)",
                    transition: { duration: 0.4 },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
          </motion.div>
          <motion.p
            className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl"
            variants={cinematicFadeIn}
          >
            Measurable outcomes that demonstrate our commitment to transforming careers and lives
            through science-backed education.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="group relative flex flex-col items-center rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-center"
              variants={cardReveal3D}
              whileHover={{
                y: -25,
                scale: 1.06,
                rotateX: -8,
                rotateY: index % 3 === 0 ? -6 : index % 3 === 2 ? 6 : 0,
                borderColor: "rgba(37, 99, 235, 0.5)",
                boxShadow: "0 50px 100px -20px rgba(37, 99, 235, 0.4)",
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div className="from-primary/20 via-primary/5 absolute inset-0 rounded-[2.5rem] bg-linear-to-br to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              <motion.div
                className="bg-primary/20 text-primary group-hover:bg-primary relative z-10 mb-8 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 group-hover:text-white"
                whileHover={{ scale: 1.2, rotate: 15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {stat.icon}
              </motion.div>

              <div className="relative z-10">
                <motion.div
                  className="font-display group-hover:text-primary mb-3 text-5xl font-black tracking-tight text-white transition-colors duration-500 md:text-6xl"
                  initial={{ opacity: 0, scale: 0, rotateY: 90 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.2 + index * 0.1,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="mb-4 text-xs font-bold tracking-[0.25em] text-white uppercase">
                  {stat.label}
                </div>
                <p className="mx-auto max-w-[220px] text-sm leading-relaxed text-slate-500">
                  {stat.description}
                </p>
              </div>

              <motion.div className="absolute top-8 right-8 opacity-0 transition-all duration-500 group-hover:opacity-100">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-24 flex flex-wrap items-center justify-center gap-x-16 gap-y-8 border-t border-white/10 pt-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {["Certified Excellence", "Global Standards", "Industry Leading", "24/7 Support"].map(
            (text, index) => (
              <motion.span
                key={index}
                className="text-xs font-bold tracking-[0.25em] text-white/60 uppercase"
                whileHover={{
                  color: "#fff",
                  scale: 1.1,
                  textShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
                }}
                transition={{ duration: 0.3 }}
              >
                {text}
              </motion.span>
            )
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StatsSection;

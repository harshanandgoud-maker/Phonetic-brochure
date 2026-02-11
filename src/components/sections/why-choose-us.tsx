"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Zap, Handshake, CheckCircle2, Target, LifeBuoy, ArrowUpRight } from "lucide-react";
import { fadeInUp, staggerContainer, smoothReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";

const comparisonData = [
  {
    title: "Phonemic Intelligence",
    description: "Proprietary brain-based technology that no other institute offers",
    icon: Brain,
    color: "bg-blue-500",
    iconColor: "text-blue-500",
  },
  {
    title: "Anterior Cingulate Activation",
    description: "Scientific approach to enhance cognitive performance",
    icon: Zap,
    color: "bg-amber-500",
    iconColor: "text-amber-500",
  },
  {
    title: "Industry Partnerships",
    description: "Direct hiring relationships with 200+ companies",
    icon: Handshake,
    color: "bg-emerald-500",
    iconColor: "text-emerald-500",
  },

  {
    title: "Holistic Development",
    description: "Technical + soft skills + psychology training",
    icon: Target,
    color: "bg-rose-500",
    iconColor: "text-rose-500",
  },
  {
    title: "Lifetime Support",
    description: "Career guidance and upskilling even after placement",
    icon: LifeBuoy,
    color: "bg-cyan-500",
    iconColor: "text-cyan-500",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="section-padding relative overflow-hidden bg-white">
      <div className="noise-overlay" />
      <motion.div
        className="glow-blob top-0 -left-64 opacity-5"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.05 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        className="glow-blob top-1/2 -right-64 bottom-auto rotate-180 opacity-5"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.05 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.2 }}
      />

      <div className="relative z-10 container">
        <motion.div
          className="mb-20 flex flex-col items-center text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="border-primary/20 text-primary mb-8 inline-flex items-center gap-2 rounded-full border bg-white px-6 py-2 text-[10px] font-bold tracking-[0.3em] uppercase shadow-sm sm:text-xs"
            variants={fadeInUp}
          >
            Our Difference
          </motion.div>

          <motion.h2
            className="font-display mb-8 text-4xl leading-[0.95] font-extrabold tracking-tight text-balance md:text-6xl lg:text-7xl"
            variants={fadeInUp}
          >
            Why <span className="text-primary italic">choose</span> PHONETIC over others?
          </motion.h2>

          <motion.p
            className="text-muted max-w-2xl text-lg leading-relaxed font-medium md:text-xl"
            variants={fadeInUp}
          >
            We don&apos;t just train students — we transform them through science-backed
            methodologies.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {comparisonData.map((item, index) => (
            <motion.div
              key={index}
              className="group relative rounded-[2.5rem] border border-black/3 bg-white p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_20px_40px_-12px_rgba(37,99,235,0.12)]"
              variants={smoothReveal}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <motion.div className="from-primary/2 absolute inset-0 rounded-[2.5rem] bg-linear-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="mb-8 flex items-center justify-between">
                  <motion.div
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-2xl",
                      item.color,
                      "bg-opacity-10"
                    )}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <item.icon className={cn("h-7 w-7", item.iconColor)} />
                  </motion.div>
                  <motion.div
                    className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    initial={{ x: -10, y: 10 }}
                    whileHover={{ x: 0, y: 0 }}
                  >
                    <ArrowUpRight className="text-muted-foreground h-5 w-5" />
                  </motion.div>
                </div>

                <h3 className="font-display text-foreground mb-4 text-xl font-bold tracking-tight">
                  {item.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              <motion.div className="via-primary/20 absolute right-12 bottom-0 left-12 h-[2px] scale-x-0 bg-linear-to-r from-transparent to-transparent transition-transform duration-700 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-20 flex justify-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-accent border-primary/10 inline-flex items-center gap-3 rounded-full border px-8 py-4 shadow-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <CheckCircle2 className="text-primary h-5 w-5" />
            <span className="text-primary text-sm font-bold tracking-wide">
              100% Placement Assistance Guaranteed
            </span>
          </motion.div>
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.015] bg-[radial-gradient(#0f172a_0.5px,transparent_0.5px)] bg-size-[40px_40px]"
      />
    </section>
  );
};

export default WhyChooseUs;

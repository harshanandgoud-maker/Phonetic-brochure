"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Search,
  Brain,
  Code,
  UserCircle,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";

const timelineSteps = [
  {
    week: "Week 1-2",
    title: "Assessment",
    description: "Comprehensive skill evaluation and personalized learning path creation",
    icon: Search,
    color: "bg-blue-600",
    side: "left",
  },
  {
    week: "Week 3-4",
    title: "PI Activation",
    description: "Phonemic Intelligence modules to enhance cognitive performance",
    icon: Brain,
    color: "bg-indigo-600",
    side: "right",
  },
  {
    week: "Week 5-16",
    title: "Technical Training",
    description: "Industry-aligned curriculum with hands-on project experience",
    icon: Code,
    color: "bg-violet-600",
    side: "left",
  },
  {
    week: "Week 17-20",
    title: "Soft Skills",
    description: "Communication, leadership, and professional development",
    icon: UserCircle,
    color: "bg-purple-600",
    side: "right",
  },
  {
    week: "Week 21-22",
    title: "Interview Prep",
    description: "Mock interviews, resume building, and company-specific preparation",
    icon: Briefcase,
    color: "bg-fuchsia-600",
    side: "left",
  },
  {
    week: "Week 23+",
    title: "Placement",
    description: "Direct placement assistance with 200+ hiring partners",
    icon: GraduationCap,
    color: "bg-rose-600",
    side: "right",
  },
];

export default function CurriculumTimeline() {
  return (
    <section id="curriculum" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.015]" />
      <div className="absolute top-0 left-1/2 h-full w-full max-w-7xl -translate-x-1/2">
        <motion.div
          className="bg-primary/5 absolute top-1/4 -left-24 h-96 w-96 rounded-full blur-[100px]"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />
        <motion.div
          className="bg-primary/5 absolute -right-24 bottom-1/4 h-96 w-96 rounded-full blur-[100px]"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          className="mx-auto mb-24 max-w-3xl text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="border-primary/20 text-primary mb-8 inline-flex items-center gap-2 rounded-full border bg-white px-5 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase shadow-sm md:text-xs"
            variants={fadeInUp}
          >
            Training Pipeline
          </motion.div>
          <motion.h2
            className="font-display mb-6 text-4xl leading-[1.1] font-extrabold tracking-tight md:text-6xl"
            variants={fadeInUp}
          >
            From Learning to <span className="text-primary">Earning</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground mx-auto max-w-xl text-base font-medium md:text-lg"
            variants={fadeInUp}
          >
            A structured journey designed to transform you into a job-ready professional in just 6
            months.
          </motion.p>
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          <motion.div
            className="absolute left-1/2 hidden h-full w-px -translate-x-1/2 transform bg-slate-200 md:block"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="bg-primary absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 transform rounded-full" />
            <div className="bg-primary absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 transform rounded-full" />
          </motion.div>

          <div className="space-y-12 md:space-y-0">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={index}
                className={`relative flex flex-col items-center justify-center last:mb-0 md:mb-16 md:flex-row ${
                  step.side === "left" ? "md:flex-row-reverse" : ""
                }`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  className="bg-primary absolute left-1/2 z-20 hidden h-3 w-3 -translate-x-1/2 transform rounded-full border-4 border-white shadow-[0_0_0_4px_rgba(37,99,235,0.1)] md:block"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                />

                <div className="w-full px-0 md:w-1/2 md:px-12">
                  <motion.div
                    className={`group relative rounded-3xl border border-black/5 bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-xl ${
                      step.side === "left" ? "md:text-right" : "md:text-left"
                    }`}
                    variants={step.side === "left" ? fadeInRight : fadeInLeft}
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                  >
                    <motion.div
                      className={`absolute -top-5 left-8 h-10 w-10 rounded-xl md:hidden ${step.color} flex items-center justify-center text-white shadow-lg`}
                      initial={{ scale: 0, rotate: -45 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <step.icon size={20} />
                    </motion.div>

                    <div
                      className={`flex flex-col ${step.side === "left" ? "md:items-end" : "md:items-start"}`}
                    >
                      <span className="text-primary mb-2 text-[10px] font-bold tracking-widest uppercase md:text-xs">
                        {step.week}
                      </span>
                      <div
                        className={`mb-4 flex items-center gap-4 ${step.side === "left" ? "md:flex-row-reverse" : ""}`}
                      >
                        <motion.div
                          className={`hidden h-12 w-12 rounded-2xl md:flex ${step.color} items-center justify-center text-white shadow-inner`}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <step.icon size={22} />
                        </motion.div>
                        <h3 className="font-display text-foreground text-xl font-bold md:text-2xl">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground max-w-sm text-sm leading-relaxed md:text-base">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </div>

                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-24 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-primary/5 border-primary/10 inline-flex flex-col items-center gap-4 rounded-full border px-8 py-4 shadow-sm md:flex-row"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-primary h-5 w-5" />
              <span className="text-primary text-sm font-semibold md:text-base">
                100% Placement Assistance Guaranteed
              </span>
            </div>
          </motion.div>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-muted-foreground inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2 text-[10px] font-bold tracking-[0.2em] uppercase">
              Our Difference
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

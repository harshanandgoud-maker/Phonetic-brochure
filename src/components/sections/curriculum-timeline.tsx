"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Search,
  Brain,
  Code,
  UserCircle,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const timelineSteps = [
  {
    month: "Month 1",
    title: "Assessment & Foundation",
    description: "Comprehensive skill evaluation, personalized path creation, and core concept strengthening.",
    icon: Search,
    color: "bg-blue-600",
    side: "left",
  },
  {
    month: "Month 2",
    title: "Cognitive Activation",
    description: "Phonemic Intelligence modules to enhance focus, memory, and learning speed.",
    icon: Brain,
    color: "bg-indigo-600",
    side: "right",
  },
  {
    month: "Month 3-4",
    title: "Technical Mastery",
    description: "Deep dive into selected technology stack with hands-on coding and projects.",
    icon: Code,
    color: "bg-violet-600",
    side: "left",
  },
  {
    month: "Month 5",
    title: "Project Development",
    description: "Building real-world applications to apply learned concepts in a professional environment.",
    icon: Code,
    color: "bg-purple-600",
    side: "right",
  },
  {
    month: "Month 5",
    title: "Professional Grooming",
    description: "Soft skills, communication workshops, and corporate etiquette training.",
    icon: UserCircle,
    color: "bg-indigo-500",
    side: "left",
  },
  {
    month: "Month 6",
    title: "Placement Launchpad",
    description: "Mock interviews, resume crafting, and direct connection with hiring partners.",
    icon: Briefcase, // Using Briefcase for Placement/Job
    color: "bg-slate-900",
    side: "right",
  },
];

export default function CurriculumTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="curriculum" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.015]" />
      
      <div className="relative z-10 container mx-auto px-6" ref={containerRef}>
        <motion.div
          className="mx-auto mb-20 max-w-3xl text-center"
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
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          {/* Central Line Container */}
          <div className="absolute left-4 top-0 bottom-0 w-1 md:left-1/2 md:-translate-x-1/2 bg-slate-100 rounded-full">
            {/* Water Flow Animation Line */}
            <motion.div 
                className="w-full bg-blue-600 rounded-full origin-top"
                style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-16 relative">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={index}
                className={`flex flex-col md:flex-row items-center w-full ${
                  step.side === "left" ? "md:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Empty Half for Spacing */}
                <div className="hidden md:block w-1/2" />

                {/* Center Point - The 'Water' Connection */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-10">
                    <div className="w-4 h-4 rounded-full bg-white border-4 border-blue-600 shadow-md relative z-10"></div>
                </div>

                {/* Content Card */}
                <div className="w-full pl-12 md:pl-0 md:w-1/2 flex justify-center">
                    <div className={`relative group w-full max-w-md ${step.side === "left" ? "md:mr-16" : "md:ml-16"}`}>
                        
                        {/* Connecting Line (Horizontal) */}
                        <div className={`absolute top-1/2 hidden md:block w-16 h-0.5 bg-blue-100
                            ${step.side === "left" 
                                ? "left-full group-hover:bg-blue-200" 
                                : "right-full group-hover:bg-blue-200"
                            } transition-colors duration-500`} 
                        />
                         {/* Mobile Connecting Line */}
                         <div className="absolute top-8 -left-8 w-8 h-0.5 bg-blue-100 md:hidden" />

                        {/* Floating Month Badge */}
                        <div className="absolute -top-5 left-6 z-20">
                            <span className={`${step.side === "left" ? "bg-blue-600" : "bg-slate-900"} text-white text-[10px] font-bold tracking-widest px-4 py-1.5 rounded-full uppercase shadow-lg shadow-blue-500/30`}>
                                {step.month}
                            </span>
                        </div>

                        <div className="bg-white p-8 rounded-4xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 group-hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.1)] transition-all duration-300">
                             <div className="flex items-start gap-4">
                                <div className={`shrink-0 w-12 h-12 rounded-2xl ${step.color} flex items-center justify-center text-white shadow-md`}>
                                    <step.icon size={20} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="font-display text-xl font-bold text-slate-900 mb-2 mt-1">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Zap,
  Activity,
  Target,
  BookOpen,
  Briefcase,
  LucideIcon,
  Layers,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming utils exist, or I can just use template literals if not complex

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  color: string;
  iconBg: string; // Tailored background color for icon
  iconColor: string; // Tailored text color for icon
}

const slides: Slide[] = [
  {
    title: "Deep Flow States",
    subtitle: "UNINTERRUPTED FOCUS",
    description:
      "Achieve the 'zone' on demand. PI helps you bypass mental friction and enter states of high productivity effortlessly.",
    icon: Target,
    color: "border-purple-200", 
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Language Mastery",
    subtitle: "LINGUISTIC PRECISION",
    description:
      "Accelerate your ability to learn new languages and technical terminologies by 3x through phonetic pattern recognition.",
    icon: BookOpen,
    color: "border-pink-200",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    title: "Executive Excellence",
    subtitle: "PROFESSIONAL PEAK",
    description:
      "Apply enhanced cognitive capabilities to complex problem-solving and leadership in the corporate world.",
    icon: Briefcase,
    color: "border-blue-200",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
   {
    title: "Phonemic Intelligence",
    subtitle: "BRAIN-BASED LEARNING",
    description:
      "Revolutionary sound-based technology that activates the Anterior Cingulate for enhanced cognitive performance.",
    icon: Brain,
    color: "border-indigo-200",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
      title: "Sound Activation",
      subtitle: "NEURAL TRIGGERS",
      description:
        "Specific phonemic patterns designed to stimulate neural pathways, leading to immediate increases in focus.",
      icon: Zap,
      color: "border-amber-200",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      title: "Neural Plasticity",
      subtitle: "COGNITIVE REWIRING",
      description:
        "PI techniques leverage neuroplasticity to create permanent improvements in how your brain processes and stores information.",
      icon: Activity,
      color: "border-emerald-200",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
];

const PhonemicIntelligence = () => {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white py-24 md:py-32">
       {/* Background Decoratives - Subtle gradient top left */}
       <div className="absolute top-0 left-0 w-full h-[500px] bg-linear-to-br from-blue-50/50 via-white to-transparent opacity-60 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-bold tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60" />
                    What We Do
                </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#0f172a] mb-6"
            >
              Unlock Your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                Cognitive Power
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl text-lg md:text-xl text-slate-500 leading-relaxed"
            >
              Our methodology blends diverse disciplines to create a holistic approach to brain performance. Swipe to explore the core pillars of our training.
            </motion.p>
        </div>

        {/* Marquee Animation */}
        <div className="w-full relative overflow-hidden -mx-6 md:mx-0">
            {/* Gradient masks for smooth fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-white to-transparent z-20 hidden md:block" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-white to-transparent z-20 hidden md:block" />

            <motion.div 
                className="flex gap-6 md:gap-8 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ 
                    ease: "linear", 
                    duration: 40, 
                    repeat: Infinity,
                }}
                style={{ willChange: "transform" }}
            >
                {/* Double the slides for seamless loop */}
                {[...slides, ...slides].map((slide, index) => (
                    <div
                        key={index}
                        className="group relative flex flex-col p-8 md:p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(37,99,235,0.1)] transition-all duration-300 w-[300px] md:w-[350px] h-[450px] shrink-0"
                    >
                        <div className={`w-14 h-14 rounded-2xl ${slide.iconBg} ${slide.iconColor} flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-300`}>
                            <slide.icon className="w-7 h-7" />
                        </div>

                        <h3 className="text-2xl font-bold text-[#0f172a] mb-4">
                            {slide.title}
                        </h3>

                        <p className="text-slate-500 leading-relaxed mb-auto text-base">
                            {slide.description}
                        </p>

                        <div className="pt-8 border-t border-slate-50 mt-8">
                             <span className="text-[10px] font-bold tracking-[0.2em] text-blue-400 uppercase">
                                {slide.subtitle}
                             </span>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>

      </div>
    </section>
  );
};

export default PhonemicIntelligence;

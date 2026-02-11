"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Brain,
  BookOpen,
  Code,
  UserCircle,
  Coffee,
  Cpu,
  Calculator,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const curriculumData = [
  {
    id: "general-intelligence",
    title: "General Intelligence",
    icon: Brain,
    description:
      "General intelligence is what we do when we take information that we are given, compare it to what we already know, and then come up with a conclusion. Reasoning skills are essential to day-to-day life.",
    topics: [
      "Analogy",
      "Letter Series",
      "Number Series",
      "Coding Decoding",
      "Blood Relations",
      "Directions",
      "Seating Arrangement",
      "Venn Diagrams",
      "Syllogism",
      "Statement & Conclusion",
    ],
    image: "/images/general-intelligence.svg",
  },
  {
    id: "basic-verbal-ability",
    title: "Basic Verbal Ability",
    icon: BookOpen,
    description:
      "These tests usually involve grammar, verbal analogies and following detailed written instructions. They depend on understanding the precise meaning of words, idioms and the structure of the language.",
    topics: [
      "Subject-Verb Agreement",
      "Spotting errors",
      "Synonyms",
      "Antonyms",
      "Sentence improvement",
      "Ordering of sentences",
      "Sentence formation",
      "Sentence correction",
      "Articles",
      "Prepositions",
      "One word substitutes",
      "Idioms & phrases",
      "Reading comprehension",
      "Active voice & Passive voice",
      "Change of Speech",
      "Verbal ability",
    ],
    image: "/images/basic-verbal-ability.svg",
  },
  {
    id: "aptitude",
    title: "Aptitude",
    icon: Calculator,
    description:
      "Acquired or natural ability for learning and proficiency in a specific area or discipline. This is the first step for an aspirant to enter into a corporate society.",
    topics: [
      "Mixture & Allegations",
      "Data interpretations",
      "Compound interest",
      "Ratio & Proportion",
      "Time & Distance",
      "Number system",
      "Simple interest",
      "Percentages",
      "Time & Work",
      "Profit & Loss",
      "Partnership",
      "Averages",
      "Ages",
    ],
    image: "/images/aptitude.svg",
  },
  {
    id: "c-language",
    title: "C - Language",
    icon: Code,
    description:
      "Developed for system programming, UNIX, and as an imperative programming language. It's a compiled language where people write their programs as a series of step-by-step instructions.",
    topics: [
      "Basics of C Programming",
      "Operations on bits",
      "Decision control structure",
      "Loop control structure",
      "Case control structure",
      "Functions",
      "Pointers",
      "Recursion",
      "Data types",
      "Storage classes",
      "C pre-processor",
      "Arrays",
      "Strings",
      "Structures & Unions",
      "Console Input / Output",
      "File Input / Output",
    ],
    image: "/images/c-language.svg",
  },
  {
    id: "psychology",
    title: "Psychology",
    icon: UserCircle,
    description:
      "The science of behaviour and mind, including conscious and unconscious phenomena, feeling and thought. An academic discipline of immense scope and diverse interests.",
    topics: [
      "Leadership",
      "Relations in society & people",
      "Goal setting",
      "Stress & strain",
      "Time management",
      "Team management",
      "Story of success",
      "Loss of failure",
      "Attitude & behaviour",
      "Emotions & illusions",
      "Values of life",
      "What to give & keep",
      "Stability & Constancy",
      "Destiny & destination",
      "Work & worth",
    ],
    image: "/images/psychology.svg",
  },
  {
    id: "core-java",
    title: "Core Java",
    icon: Cpu,
    description:
      "General-purpose computer-programming language that is concurrent, class-based, object-oriented, and designed to have as few implementation dependencies as possible (WORA).",
    topics: [
      "OOPs Introduction",
      "Java Technology Introduction",
      "Basic Java",
      "Java Packages & Eclipse IDE",
      "Relationships in Java",
      "Interface Programming in Java",
      "Miscellaneous Topics",
      "Exception Handling",
      "Annotation and reflection API",
      "JUnit testing framework",
      "Collection API",
      "IO Classes and Streams",
      "Multithreading",
      "JDBC Programming",
    ],
    image: "/images/core-java.svg",
  },
  {
    id: "softskills",
    title: "Softskills",
    icon: Coffee,
    description:
      "Essential skills for corporate success including communication, teamwork, and professional etiquette. These skills complement technical skills for holistic professional development.",
    topics: [
      "Communication Skills",
      "Body Language",
      "Group Discussion",
      "Interview Skills",
      "Presentation Skills",
      "Email Etiquette",
      "Professional Dressing",
      "Public Speaking",
      "Confidence Building",
      "Problem Solving",
    ],
    image: "/images/softskills.svg",
  },
];

const DetailedCurriculum = () => {
  const [activeTab, setActiveTab] = useState(curriculumData[0].id);

  const activeContent = curriculumData.find((item) => item.id === activeTab) || curriculumData[0];

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 md:py-32">
      {/* Decorative background elements */}
      <div className="bg-primary/5 absolute top-0 right-0 -mt-32 -mr-32 h-1/3 w-1/3 blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 -mb-32 -ml-32 h-1/3 w-1/3 bg-blue-500/5 blur-[120px]"></div>

      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-primary/20 text-primary mb-6 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-xs font-bold tracking-widest uppercase"
          >
            <Sparkles className="h-4 w-4" />
            Seven Golden Steps
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display mb-6 text-4xl font-extrabold tracking-tight md:text-6xl"
          >
            Phonetic <span className="text-primary italic">Topics</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mx-auto max-w-2xl text-lg"
          >
            A comprehensive curriculum designed to transform students into corporate professionals
            through a structured seven-step journey.
          </motion.p>
        </div>

        <div className="flex min-h-[600px] flex-col gap-8 lg:flex-row">
          {/* Tabs Sidebar */}
          <div className="flex w-full flex-col gap-3 lg:w-1/3">
            {curriculumData.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "group relative flex items-center gap-4 overflow-hidden rounded-2xl p-5 text-left transition-all duration-300",
                  activeTab === item.id
                    ? "bg-primary shadow-primary/20 scale-[1.02] text-white shadow-xl"
                    : "hover:border-primary/30 border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                    activeTab === item.id ? "bg-white/20" : "group-hover:bg-primary/10 bg-slate-100"
                  )}
                >
                  <item.icon
                    className={cn("h-6 w-6", activeTab === item.id ? "text-white" : "text-primary")}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold tracking-tight">{item.title}</h3>
                  <p
                    className={cn(
                      "mt-1 text-xs",
                      activeTab === item.id ? "text-white/70" : "text-slate-400"
                    )}
                  >
                    {item.topics.length} Key Modules
                  </p>
                </div>
                {activeTab === item.id && (
                  <motion.div layoutId="active-indicator" className="absolute right-4">
                    <ChevronRight className="h-5 w-5 text-white/50" />
                  </motion.div>
                )}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="w-full lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex h-full flex-col rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm md:p-12"
              >
                <div className="mb-12 flex flex-col items-start gap-12 md:flex-row">
                  <div className="flex-1">
                    <h2 className="font-display mb-6 flex items-center gap-3 text-3xl font-extrabold md:text-4xl">
                      {activeContent.title}
                    </h2>
                    <p className="text-muted-foreground border-primary/20 mb-8 border-l-4 pl-6 text-lg leading-relaxed italic">
                      {activeContent.description}
                    </p>
                  </div>
                  <div className="group relative flex aspect-square w-full items-center justify-center md:w-1/3">
                    {activeContent.image && (
                      <Image
                        src={activeContent.image}
                        alt={activeContent.title}
                        width={400}
                        height={400}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="h-auto max-h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                  {activeContent?.topics.map((topic, idx) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      key={topic}
                      className="group flex items-center gap-3"
                    >
                      <div className="bg-primary/10 group-hover:bg-primary flex h-6 w-6 items-center justify-center rounded-full transition-colors">
                        <CheckCircle2 className="text-primary h-3.5 w-3.5 transition-colors group-hover:text-white" />
                      </div>
                      <span className="group-hover:text-primary font-medium text-slate-600 transition-colors">
                        {topic}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto pt-12">
                  <a
                    href="https://www.phoneticedu.com/"
                    className="hover:bg-primary hover:shadow-primary/30 inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 font-bold text-white shadow-lg transition-all duration-300"
                  >
                    Learn More About This Step
                    <ChevronRight className="h-5 w-5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailedCurriculum;

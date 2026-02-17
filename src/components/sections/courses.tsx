"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  Variants,
} from "framer-motion";
import {
  ArrowUpRight,
  Code,
  Database,
  Laptop,
  Cpu,
  Brain,
  MessageSquare,
  Users,
  Briefcase,
  Shield,
  Sparkles,
  Zap,
  Layers,
  FileSpreadsheet,
  PieChart,
  LineChart,
  Cloud,
  Smartphone,
  Microchip,
  Calculator,
  Puzzle,
  Gamepad2,
  Heart,
  UserCheck,
  Terminal,
  GitBranch,
  Utensils,
  Building2,
} from "lucide-react";
import { cinematicFadeIn, staggerContainerSlow, cardReveal3D, wordReveal } from "@/lib/animations";

const technicalCourses = [
  {
    title: "C",
    icon: Code,
    description: "Master logic building and memory management fundamentals.",
    color: "from-slate-400 to-slate-600",
  },
  {
    title: "C++",
    icon: Code,
    description: "High-performance object-oriented programming.",
    color: "from-blue-400 to-indigo-500",
  },
  {
    title: "Python",
    icon: Terminal,
    description: "Versatile language for AI, data, and web dev.",
    color: "from-yellow-400 to-amber-500",
  },
  {
    title: "SQL",
    icon: Database,
    description: "Data manipulation and database mastery.",
    color: "from-emerald-400 to-teal-500",
  },
  {
    title: "Java",
    icon: Laptop,
    description: "Robust enterprise-grade application development.",
    color: "from-red-400 to-orange-500",
  },
  {
    title: "Java Full Stack",
    icon: Layers,
    description: "Frontend, backend, and database integration.",
    color: "from-orange-400 to-pink-500",
  },
  {
    title: "Advanced Excel",
    icon: FileSpreadsheet,
    description: "Data analysis with macros, VBA, and dashboards.",
    color: "from-green-400 to-emerald-600",
  },
  {
    title: "Power BI",
    icon: PieChart,
    description: "Business intelligence and interactive visualization.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Data Analytics",
    icon: LineChart,
    description: "Derive actionable insights from raw data.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Machine Learning",
    icon: Brain,
    description: "Build predictive models and intelligent systems.",
    color: "from-purple-500 to-indigo-600",
  },
  {
    title: "Deep Learning",
    icon: Brain,
    description: "Neural networks and advanced AI architectures.",
    color: "from-indigo-600 to-violet-600",
  },
  {
    title: "Cloud Computing",
    icon: Cloud,
    description: "Scalable infrastructure on AWS/Azure/GCP.",
    color: "from-sky-400 to-blue-500",
  },
  {
    title: "Ethical Hacking",
    icon: Shield,
    description: "Cybersecurity and vulnerability assessment.",
    color: "from-red-500 to-rose-600",
  },
  {
    title: "Mobile App Dev",
    icon: Smartphone,
    description: "Native and cross-platform mobile experiences.",
    color: "from-teal-400 to-green-500",
  },
  {
    title: "Embedded Systems",
    icon: Microchip,
    description: "Hardware programming and firmware design.",
    color: "from-gray-500 to-slate-600",
  },
  {
    title: "VLSI",
    icon: Cpu,
    description: "Integrated circuit design and verification.",
    color: "from-amber-500 to-yellow-600",
  },
  {
    title: "Electric Vehicle",
    icon: Zap,
    description: "Sustainable mobility and battery technology.",
    color: "from-lime-400 to-green-500",
  },
  {
    title: "DevOps",
    icon: GitBranch,
    description: "CI/CD pipelines, containerization, and automation.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Salesforce",
    icon: Cloud,
    description: "CRM customization, administration, and development.",
    color: "from-blue-400 to-indigo-500",
  },
];

const nonTechnicalCourses = [
  {
    title: "Aptitude",
    icon: Calculator,
    description: "Quantitative problem-solving and math skills.",
    color: "from-blue-400 to-cyan-500",
  },
  {
    title: "Reasoning",
    icon: Puzzle,
    description: "Logical thinking and pattern recognition.",
    color: "from-purple-400 to-pink-500",
  },
  {
    title: "Game Based Aptitude",
    icon: Gamepad2,
    description: "Interactive assessment learning strategies.",
    color: "from-red-400 to-orange-500",
  },
  {
    title: "Verbal",
    icon: MessageSquare,
    description: "Grammar, vocabulary, and comprehension.",
    color: "from-green-400 to-emerald-500",
  },
  {
    title: "Employability Skills",
    icon: Briefcase,
    description: "Professionalism, ethics, and workplace readiness.",
    color: "from-slate-500 to-gray-600",
  },
  {
    title: "Psychometric",
    icon: UserCheck,
    description: "Cognitive and compatibility assessments.",
    color: "from-indigo-400 to-blue-500",
  },
  {
    title: "Life Skills",
    icon: Heart,
    description: "Emotional intelligence and stress management.",
    color: "from-rose-400 to-pink-500",
  },
  {
    title: "NLP",
    icon: Sparkles,
    description: "Neuro-Linguistic Programming for success.",
    color: "from-amber-400 to-orange-500",
  },
  {
    title: "Hotel Management",
    icon: Utensils,
    description: "Hospitality, catering, and event management.",
    color: "from-rose-500 to-pink-600",
  },
  {
    title: "Corporate Trainings",
    icon: Building2,
    description: "Leadership, team building, and professional development.",
    color: "from-slate-600 to-gray-700",
  },
];

// Reusable 3D Tilt Card Component for Selections - World Class Version
const TiltCard = ({
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className,
  isActive,
  variants,
  glowColor = "#ffffff",
}: {
  children: React.ReactNode;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string; // We'll parse this to extract bg classes if needed, or just append
  isActive: boolean;
  variants?: Variants;
  glowColor?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  // Smooth spring physics for rotation
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const width = rect.width;
    const height = rect.height;

    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;

    x.set(xPct);
    y.set(yPct);
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    mouseX.set(0);
    mouseY.set(0);
    if (onMouseLeave) onMouseLeave();
  };
  
  const handleMouseEnter = () => {
      if (onMouseEnter) onMouseEnter();
  };

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      initial={{ scale: 0.95, opacity: 0, y: 50 }}
      animate={{
        scale: isActive ? 1 : 0.95,
        opacity: isActive ? 1 : 0.6,
        y: 0,
        filter: isActive ? "blur(0px)" : "blur(2px)",
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className="relative h-full w-full gpu-accelerated"
      variants={variants}
    >
      <motion.div
        className={`relative h-full w-full overflow-hidden ${className}`}
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Spotlight Effect Layer */}
        <motion.div
          className="pointer-events-none absolute -inset-px z-30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(255,255,255,0.15),
                transparent 80%
              )
            `,
          }}
        />

        {/* Dynamic Glow Border */}
        <motion.div
            className="absolute inset-0 z-0 opacity-50 transition-opacity duration-500 group-hover:opacity-100"
             style={{
                background: useMotionTemplate`
                    radial-gradient(
                        800px circle at ${mouseX}px ${mouseY}px,
                        ${glowColor}40, 
                        transparent 40%
                    )
                `,
            }}
        />

        {/* Inner Content Container */}
        <div className="preserve-3d pointer-events-none relative z-20 flex h-full w-full translate-z-20 flex-col items-center justify-center">
          {children}
        </div>

        {/* Glass Sheen */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-40 bg-linear-to-tr from-white/0 via-white/5 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
             mixBlendMode: 'overlay',
             transform: 'translateZ(50px)' 
          }}
        />
      </motion.div>

      {/* External Glow / Shadow for depth */}
      <motion.div
        className="pointer-events-none absolute inset-5 -z-10 rounded-[3rem] blur-3xl transition-all duration-500"
        style={{
             background: glowColor,
             opacity: useTransform(y, [-0.5, 0.5], [0.2, 0.5]),
             transform: 'translateZ(-50px)'
        }}
        animate={{
            scale: isActive ? [1, 1.05, 1] : 1
        }}
        transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'mirror'
        }}
      />
    </motion.div>
  );
};



const CoursesSection = () => {
  const [selectedSide, setSelectedSide] = useState<"technical" | "non-technical" | null>(null);
  const [hoveredSide, setHoveredSide] = useState<"technical" | "non-technical" | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const titleWords = ["Phonetic", "Offers"];

  return (
    <section
      ref={sectionRef}
      id="programs"
      className="perspective-3000 relative overflow-hidden bg-white py-32 md:py-40"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-50 via-white to-white opacity-60" />
      <div className="noise-overlay" />

      {/* Floating Background Blobs */}
      <motion.div
        className="absolute top-0 right-0 -mt-48 -mr-48 h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-[150px]"
        style={{ y: backgroundY }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 -mb-32 -ml-32 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px]"
        style={{ y: backgroundY }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        {/* Header Section */}
        <motion.div
          className="mb-20 flex flex-col items-center text-center md:mb-28"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="border-primary/10 text-primary mb-10 inline-flex items-center gap-2 rounded-full border bg-white/50 px-6 py-2 text-[10px] font-bold tracking-[0.2em] uppercase shadow-xl backdrop-blur-md"
            variants={cinematicFadeIn}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px -10px rgba(37, 99, 235, 0.2)",
            }}
          >
            <span className="bg-primary h-2 w-2 animate-pulse rounded-full" />
            Professional Programs
          </motion.div>

          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-display mb-8 text-5xl leading-[0.9] font-black tracking-tighter md:text-7xl lg:text-8xl">
              {titleWords.map((word, index) => (
                <motion.span
                  key={index}
                  className={`mr-4 inline-block ${index === 1 ? "text-primary" : "text-slate-900"}`}
                  variants={wordReveal}
                  style={{ transformStyle: "preserve-3d" }}
                  whileHover={{
                    scale: 1.1,
                    rotateX: -15,
                    color: index === 0 ? "#2563eb" : undefined,
                    transition: { duration: 0.3 },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
          </motion.div>

          <motion.p
            className="max-w-2xl text-lg leading-relaxed font-medium text-slate-500 md:text-xl"
            variants={cinematicFadeIn}
          >
            Unlock your potential with our meticulously crafted curriculum designed for modern
            success.
          </motion.p>
        </motion.div>

        {/* Dynamic Selection Area */}
        <AnimatePresence mode="wait">
          {!selectedSide ? (
            <motion.div
              key="selection"
              className="grid min-h-[500px] grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16"
              variants={staggerContainerSlow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            >
              {/* Technical Card */}
              <TiltCard
                className="group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[2.5rem] bg-linear-to-b from-[#00c6ff] to-[#0072ff] p-8 text-white shadow-2xl shadow-blue-500/30 transition-all duration-500 md:p-12"
                onClick={() => setSelectedSide("technical")}
                onMouseEnter={() => setHoveredSide("technical")}
                onMouseLeave={() => setHoveredSide(null)}
                isActive={hoveredSide === "technical" || hoveredSide === null}
                variants={cinematicFadeIn}
                glowColor="#00c6ff"
              >
                {/* Background Detail */}
                <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent opacity-30" />
                
                {/* Central Glass Panel */}
                <div className="relative flex flex-col items-center justify-center w-[85%] h-[80%] rounded-4xl bg-white/95 md:bg-white/10 md:backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-6">
                    
                    {/* Icon Box */}
                    <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="relative mb-6"
                    >
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-white/20 to-white/5 border border-white/30 shadow-lg backdrop-blur-sm">
                            <Code className="h-10 w-10 text-white drop-shadow-md" strokeWidth={2.5} />
                        </div>
                    </motion.div>

                    <h3 className="font-display text-center text-4xl md:text-5xl font-black italic tracking-wide text-white uppercase drop-shadow-lg mb-2 transform -skew-x-6">
                    Technical
                    </h3>

                    <p className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-white/90 uppercase mb-8 text-center leading-relaxed">
                    Programming • Data •<br/>Systems
                    </p>

                    <motion.div
                    className="flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold tracking-widest text-[#0072ff] uppercase shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.05 }}
                    >
                    Explore <ArrowUpRight className="h-4 w-4" strokeWidth={3} />
                    </motion.div>
                </div>
              </TiltCard>

              {/* Non-Technical Card */}
              <TiltCard
                className="group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[2.5rem] bg-linear-to-b from-[#ff512f] to-[#dd2476] p-8 text-white shadow-2xl shadow-rose-500/30 transition-all duration-500 md:p-12"
                onClick={() => setSelectedSide("non-technical")}
                onMouseEnter={() => setHoveredSide("non-technical")}
                onMouseLeave={() => setHoveredSide(null)}
                isActive={hoveredSide === "non-technical" || hoveredSide === null}
                variants={cinematicFadeIn}
                glowColor="#ff512f"
              >
                 {/* Background Detail */}
                 <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent opacity-30" />

                 {/* Central Glass Panel */}
                 <div className="relative flex flex-col items-center justify-center w-[85%] h-[80%] rounded-4xl bg-white/95 md:bg-white/10 md:backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-6">

                    <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.2
                    }}
                    className="relative mb-6"
                    >
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-white/20 to-white/5 border border-white/30 shadow-lg backdrop-blur-sm">
                            <Users className="h-10 w-10 text-white drop-shadow-md" strokeWidth={2.5} />
                        </div>
                    </motion.div>

                    <h3 className="font-display text-center text-4xl md:text-5xl font-black italic tracking-wide text-white uppercase drop-shadow-lg mb-2 transform -skew-x-6">
                    Non-
                    <br />
                    Technical
                    </h3>

                    <p className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-white/90 uppercase mb-8 text-center leading-relaxed">
                    Soft Skills • Resume •<br/>Growth
                    </p>

                    <motion.div
                    className="flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold tracking-widest text-[#dd2476] uppercase shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.05 }}
                    >
                    Explore <ArrowUpRight className="h-4 w-4" strokeWidth={3} />
                    </motion.div>
                </div>
              </TiltCard>
            </motion.div>
          ) : (
            <motion.div
              key="courses"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {/* Navigation Header */}
              <div className="mb-12 flex items-center justify-between">
                <motion.button
                  onClick={() => setSelectedSide(null)}
                  className="group hover:text-primary flex items-center gap-4 text-sm font-bold text-slate-600 transition-colors"
                  whileHover={{ x: -10 }}
                >
                  <div className="group-hover:border-primary/50 group-hover:text-primary flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-all">
                    <ArrowUpRight className="h-5 w-5 rotate-[-135deg]" />
                  </div>
                  <span className="tracking-widest uppercase">Back to Overview</span>
                </motion.button>

                <motion.div
                  className="text-right"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="font-display text-3xl font-black tracking-tighter text-slate-900 uppercase italic">
                    {selectedSide === "technical" ? "Technical Modules" : "Non-Technical Modules"}
                  </h3>
                </motion.div>
              </div>

              {/* Module Grid */}
              <motion.div
                className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-6"
                variants={staggerContainerSlow}
                initial="hidden"
                animate="visible"
              >
                {(selectedSide === "technical" ? technicalCourses : nonTechnicalCourses).map(
                  (course) => (
                    <motion.div
                      key={course.title}
                      variants={cardReveal3D}
                      className="group relative h-full overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 transition-all duration-500 hover:shadow-xl gpu-accelerated"
                      whileHover={{
                        y: -8,
                        scale: 1.05,
                        rotateX: 5,
                        rotateY: -5,
                        transition: { duration: 0.4, ease: "easeOut" },
                      }}
                      style={{ willChange: "transform" }}
                    >
                      {/* Hover Gradient Background */}
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${course.color} opacity-0 transition-opacity duration-500 group-hover:opacity-10`}
                      />

                      {/* Icon Bubble */}
                      <div className="relative mb-6 h-12 w-12">
                        <div
                          className={`absolute inset-0 rounded-2xl bg-linear-to-br ${course.color} opacity-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:opacity-25`}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <course.icon
                            className="h-6 w-6 text-slate-700 transition-colors group-hover:text-slate-900"
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>

                      <h4 className="group-hover:text-primary mb-2 text-lg leading-tight font-bold text-slate-800 transition-colors">
                        {course.title}
                      </h4>

                      <p className="mb-6 line-clamp-3 text-xs leading-relaxed font-medium text-slate-500">
                        {course.description}
                      </p>

                      <div className="absolute right-6 bottom-6 translate-x-10 translate-y-10 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                        <div
                          className={`h-8 w-8 rounded-full bg-linear-to-br ${course.color} flex items-center justify-center text-white shadow-md`}
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>
                    </motion.div>
                  )
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CoursesSection;

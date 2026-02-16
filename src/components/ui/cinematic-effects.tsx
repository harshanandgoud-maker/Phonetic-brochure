"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  MotionValue,
} from "framer-motion";
import { CINEMATIC_EASE, SHOPIFY_EASE } from "@/lib/animations";

const MotionImage = motion.create(Image);

interface MagneticCursorProps {
  children?: React.ReactNode;
}

export function MagneticCursor({ children }: MagneticCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    let rafId: number | null = null;

    // Optimize DOM lookups with RAF
    const handleMouseOver = (e: MouseEvent) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const target = e.target as HTMLElement;
        
        const clickable = target.closest(
          "a, button, [data-cursor-hover], input, textarea, select, [role='button']"
        );
        const textInput = target.closest(
          "input[type='text'], input:not([type]), input[type='email'], input[type='password'], input[type='number'], input[type='search'], input[type='tel'], input[type='url'], input[type='date'], input[type='datetime-local'], input[type='month'], input[type='time'], input[type='week'], textarea, [contenteditable='true']"
        );

        const isInteractive = !!clickable;
        const shouldHide = !!textInput;

        setIsHovering(isInteractive);
        setIsHidden(shouldHide);

        if (isInteractive && clickable) {
          const cursorTextAttr = clickable.getAttribute("data-cursor-text") || "";
          setCursorText(cursorTextAttr);
        } else {
          setCursorText("");
        }
        
        rafId = null;
      });
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    // Use capture phase to ensure we catch events
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    
    window.addEventListener("mouseleave", () => setIsHidden(true));
    window.addEventListener("mouseenter", () => setIsHidden(false));

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseleave", () => setIsHidden(true));
      window.removeEventListener("mouseenter", () => setIsHidden(false));
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {children}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-99999 hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border border-blue-500/30 bg-white shadow-2xl backdrop-blur-sm"
          animate={{
            width: isHovering && !isHidden ? 80 : 40,
            height: isHovering && !isHidden ? 80 : 40,
            opacity: isHidden ? 0 : 1,
            scale: isHidden ? 0.5 : 1,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 400 }}
        >
          {/* Logo Image */}
          <MotionImage
            src="/images/cursor-p.jpg"
            alt="P"
            fill
            className="object-cover"
            priority // Optimization for LCP if cursor is always visible
            animate={{
              scale: isHovering ? 1.2 : 1,
              rotate: isHovering ? 5 : 0,
            }}
          />

          <AnimatePresence>
            {cursorText && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 55 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="absolute rounded-md bg-black/80 px-3 py-1.5 text-[10px] font-bold tracking-widest whitespace-nowrap text-white uppercase shadow-lg backdrop-blur-md"
              >
                {cursorText}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}

export function GrainOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-99 opacity-[0.03]">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
    </div>
  );
}

export function LensFlare() {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ["-10%", "110%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.5, 0.5, 0]);

  return (
    <motion.div
      className="from-primary/20 pointer-events-none fixed top-0 left-0 z-1 h-[40vw] w-[40vw] rounded-full bg-linear-to-br via-blue-500/10 to-transparent blur-[60px]"
      style={{ x, opacity, y: "-20%" }}
    />
  );
}

export function PerspectiveCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const springConfig = { damping: 20, stiffness: 150 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={`perspective-1000 relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  strength = 0.2,
  imageHeight = "h-[140%]",
  imageTop = "-20%",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  strength?: number;
  imageHeight?: string;
  imageTop?: string | number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${strength * -100}%`, `${strength * 100}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <MotionImage
        src={src}
        alt={alt}
        fill
        className={`object-cover ${imgClassName}`}
        style={{ y, scale, top: imageTop }}
      />
    </div>
  );
}

export function CinematicSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: CINEMATIC_EASE }}
    >
      {children}
    </motion.section>
  );
}

export function ScrollScaleSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -50]);

  return (
    <motion.div ref={ref} className={className} style={{ scale, opacity, y }}>
      {children}
    </motion.div>
  );
}

export function ParallaxContainer({
  children,
  className = "",
  speed = 0.5,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -100}px`, `${speed * 100}px`]);

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

export function HorizontalScrollSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className={`relative h-[300vh] ${className}`}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div className="flex gap-8" style={{ x }}>
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const initialState = {
    up: { opacity: 0, y: 80 },
    down: { opacity: 0, y: -80 },
    left: { opacity: 0, x: -80 },
    right: { opacity: 0, x: 80 },
  };

  const animateState = {
    up: { opacity: 1, y: 0 },
    down: { opacity: 1, y: 0 },
    left: { opacity: 1, x: 0 },
    right: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initialState[direction]}
      animate={isInView ? animateState[direction] : initialState[direction]}
      transition={{
        duration: 0.8,
        delay,
        ease: SHOPIFY_EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

export function StickyScaleSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["0px", "40px"]);

  return (
    <motion.div
      ref={ref}
      className={`sticky top-0 ${className}`}
      style={{ scale, opacity, borderRadius, transformOrigin: "center top" }}
    >
      {children}
    </motion.div>
  );
}

export function TextRevealByWord({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const y = useTransform(progress, range, [20, 0]);

  return (
    <motion.span className="mr-2 inline-block" style={{ opacity, y }}>
      {children}
    </motion.span>
  );
}

export function FloatingParticles({
  count = 50,
  className = "",
  color = "rgba(37, 99, 235, 0.3)",
  minSize = 2,
  maxSize = 6,
}: {
  count?: number;
  className?: string;
  color?: string;
  minSize?: number;
  maxSize?: number;
}) {
  const [mounted, setMounted] = useState(false);

  const [particleCount, setParticleCount] = useState(0);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setParticleCount(isMobile ? Math.min(count, 15) : count);
    setMounted(true);
  }, [count]);

  const particles = useMemo(() => {
    if (!mounted || particleCount === 0) return [];
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: minSize + Math.random() * (maxSize - minSize),
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10,
      randomX: Math.random() * 50 - 25, // Stable random X-shift
    }));
  }, [particleCount, minSize, maxSize, mounted]);

  if (!mounted) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            willChange: "transform",
            transform: "translate3d(0,0,0)", 
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, particle.randomX, 0], // Use stable value
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function GlowingOrbs({ count = 5, className = "" }: { count?: number; className?: string }) {
  const [mounted, setMounted] = useState(false);

  const [orbCount, setOrbCount] = useState(0);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setOrbCount(isMobile ? Math.min(count, 2) : count);
    setMounted(true);
  }, [count]);

  const orbs = useMemo(() => {
    if (!mounted || orbCount === 0) return [];
    return Array.from({ length: orbCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 200 + Math.random() * 400,
      duration: 20 + Math.random() * 15,
      delay: Math.random() * 5,
      color: i % 2 === 0 ? "rgba(37, 99, 235, 0.15)" : "rgba(99, 102, 241, 0.1)",
    }));
  }, [orbCount, mounted]);

  if (!mounted) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute"
          initial={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size * 0.8,
            height: orb.size * 0.8,
            transform: "translate(-50%, -50%) translateZ(0)",
            willChange: "transform",
          }}
        >
          <motion.div
            className="h-full w-full rounded-full blur-2xl"
            style={{
              backgroundColor: orb.color,
              willChange: "transform",
            }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 50, 0],
              scale: [1, 1.2, 0.8, 1],
              opacity: [0.5, 0.8, 0.3, 0.5],
            }}
            transition={{
              duration: orb.duration,
              delay: orb.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export function ScrollProgress({
  className = "",
  color = "#2563eb",
}: {
  className?: string;
  color?: string;
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={`fixed top-0 right-0 left-0 z-9999 h-1 origin-left ${className}`}
      style={{ scaleX, backgroundColor: color }}
    />
  );
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.5,
  as: Component = "button",
  href,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: React.ElementType;
  href?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      x.set(deltaX);
      y.set(deltaY);
    },
    [strength, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const MotionComponent = useMemo(() => motion(Component), [Component]);

  return (
    <MotionComponent
      ref={ref}
      className={className}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
      {...(href && { href })}
      {...(onClick && { onClick })}
    >
      {children}
    </MotionComponent>
  );
}

export function ScrollLinkedRotate({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);

  return (
    <motion.div ref={ref} className={className} style={{ rotate, scale }}>
      {children}
    </motion.div>
  );
}

export function ScrollOpacityFade({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [10, 0, 0, 10]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        opacity,
      }}
    >
      {children}
    </motion.div>
  );
}

export function Parallax3DCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [25, 0, -25]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX,
        y,
        scale,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {children}
    </motion.div>
  );
}

export default MagneticCursor;

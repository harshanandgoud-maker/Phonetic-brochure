import { Variants } from "framer-motion";

export const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;
// export const SPRING_EASE = [0.34, 1.56, 0.64, 1] as const;
const DRAMATIC_EASE = [0.77, 0, 0.175, 1] as const;
// const SMOOTH_EASE = [0.43, 0.13, 0.23, 0.96] as const;
export const SHOPIFY_EASE = [0.25, 0.46, 0.45, 0.94] as const;
export const ELASTIC_EASE = [0.68, -0.55, 0.265, 1.55] as const;

export const cinematicFadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: CINEMATIC_EASE,
    },
  },
};

export const liquidReveal: Variants = {
  hidden: {
    opacity: 0,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    y: 60,
  },
  visible: {
    opacity: 1,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.76, 0, 0.24, 1] as const,
    },
  },
};

export const pixelReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: CINEMATIC_EASE,
    },
  },
};

export const shatterReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    rotateX: 30,
    rotateY: -30,
    z: -300,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    z: 0,
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const lensBlurReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.2,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.8,
      ease: CINEMATIC_EASE,
    },
  },
};

export const dramaticSlide: Variants = {
  hidden: {
    x: "-100%",
    skewX: 10,
    opacity: 0,
  },
  visible: {
    x: "0%",
    skewX: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: DRAMATIC_EASE,
    },
  },
};

export const perspectiveReveal3D: Variants = {
  hidden: {
    opacity: 0,
    rotateX: -60,
    transformOrigin: "top center",
    z: -500,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    z: 0,
    transition: {
      duration: 1.2,
      ease: CINEMATIC_EASE,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerCinematic: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const wordRevealCinematic: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
    rotateX: -60,
  },
  visible: {
    opacity: 1,
    y: "0%",
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: CINEMATIC_EASE,
    },
  },
};

export const imageRevealMask: Variants = {
  hidden: {
    clipPath: "inset(0 100% 0 0)",
    scale: 1.2,
  },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    scale: 1,
    transition: {
      duration: 1.5,
      ease: CINEMATIC_EASE,
    },
  },
};

export const heroReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
    rotateX: 20,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 1.4,
      ease: CINEMATIC_EASE,
    },
  },
};

export const cinematicSectionReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: CINEMATIC_EASE,
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const float: Variants = {
  animate: {
    y: [0, -15, 0],
    rotate: [0, 1.5, -1.5, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const glow: Variants = {
  animate: {
    opacity: [0.4, 0.8, 0.4],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const zoomInReveal: Variants = {
  hidden: { scale: 1.2, opacity: 0},
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: CINEMATIC_EASE },
  },
};

export const slideUpCinematic: Variants = {
  hidden: { y: 60, opacity: 0},
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: CINEMATIC_EASE },
  },
};

export const slideLeftCinematic: Variants = {
  hidden: { x: -60, opacity: 0},
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: CINEMATIC_EASE },
  },
};

export const slideRightCinematic: Variants = {
  hidden: { x: 60, opacity: 0},
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: CINEMATIC_EASE },
  },
};

export const maskRevealTop: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 1.2, ease: CINEMATIC_EASE },
  },
};

export const maskRevealBottom: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 1.2, ease: CINEMATIC_EASE },
  },
};

export const rotate3DReveal: Variants = {
  hidden: { rotateY: 60, opacity: 0, scale: 0.9 },
  visible: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: CINEMATIC_EASE },
  },
};

export const splitLineReveal: Variants = {
  hidden: {
    y: "100%",
    rotateX: -60,
    opacity: 0,
  },
  visible: {
    y: "0%",
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: CINEMATIC_EASE,
    },
  },
};

export const perspectiveCardReveal: Variants = {
  hidden: {
    opacity: 0,
    rotateX: -20,
    rotateY: 15,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    rotateY: 0,
    y: 0,
    scale: 1,
    transition: { duration: 1.2, ease: CINEMATIC_EASE },
  },
};

export const curtainRevealHorizontal: Variants = {
  hidden: { clipPath: "inset(0 50% 0 50%)", opacity: 0 },
  visible: {
    clipPath: "inset(0 0% 0 0%)",
    opacity: 1,
    transition: { duration: 1.2, ease: CINEMATIC_EASE },
  },
};

export const shopifyScrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: SHOPIFY_EASE,
    },
  },
};

export const shopifyStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const shopifyCardReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateX: 10,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: SHOPIFY_EASE,
    },
  },
};

export const shopifyTextReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: SHOPIFY_EASE,
    },
  },
};

export const shopifyImageReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: SHOPIFY_EASE,
    },
  },
};

export const horizontalScrollReveal: Variants = {
  hidden: {
    opacity: 0,
    x: 80,
    rotateY: -10,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      duration: 0.7,
      ease: SHOPIFY_EASE,
    },
  },
};

export const scaleOnScrollReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: 40,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: CINEMATIC_EASE,
    },
  },
};

export const parallaxReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 1.05,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: CINEMATIC_EASE,
    },
  },
};

export const springBounce: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
    },
  },
};

export const slideFromLeft = slideLeftCinematic;
export const slideFromRight = slideRightCinematic;
export const cardReveal3D = perspectiveCardReveal;
export const curtainReveal = curtainRevealHorizontal;
export const fadeInLeft = slideLeftCinematic;
export const fadeInRight = slideRightCinematic;
export const fadeInUp = slideUpCinematic;
export const smoothReveal = zoomInReveal;
export const staggerContainerSlow = staggerContainerCinematic;
export const wordReveal = wordRevealCinematic;
export const imageRevealCinematic = imageRevealMask;
export const lineReveal = splitLineReveal;
export const letterReveal3D = rotate3DReveal;

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: CINEMATIC_EASE,
    },
  },
};

export const flipReveal: Variants = {
  hidden: {
    opacity: 0,
    rotateY: 60,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: CINEMATIC_EASE,
    },
  },
};


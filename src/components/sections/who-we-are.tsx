"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  slideLeftCinematic,
  slideRightCinematic,
  staggerContainerCinematic,
} from "@/lib/animations";
import { PerspectiveCard, ParallaxImage } from "@/components/ui/cinematic-effects";

const WhoWeAreSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="who-we-are"
      className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden py-32 perspective-[2000px]"
    >
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.015]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="border-primary/5 absolute top-1/2 left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
          initial={{ scale: 0, opacity: 0, rotate: -90 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="border-primary/8 absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
          initial={{ scale: 0, opacity: 0, rotate: 90 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="border-primary/10 absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          variants={staggerContainerCinematic}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2"
        >
          <motion.div variants={slideLeftCinematic}>
            <PerspectiveCard className="group relative">
              <div className="bg-primary/20 absolute -inset-4 opacity-0 blur-3xl transition-opacity duration-1000 group-hover:opacity-100" />
              <ParallaxImage
                src="/images/santhosh_kumar_ananta.jpg"
                alt="Santhosh Kumar Ananta - Founder of Phonetic"
                className="aspect-4/5 rounded-2xl border border-white/10 bg-white grayscale transition-all duration-700 hover:grayscale-0"
                imgClassName="object-contain p-2"
                strength={0.05}
                imageHeight="h-full"
                imageTop={0}
              />
            </PerspectiveCard>
          </motion.div>

          <motion.div variants={slideRightCinematic} className="space-y-8">
            <motion.div
              className="border-primary/20 text-primary mb-4 inline-block rounded-full border bg-white/5 px-8 py-3 text-[11px] font-bold tracking-[0.3em] uppercase backdrop-blur-sm will-change-transform"
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
            >
              Who We Are
            </motion.div>

            <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
              The <span className="text-primary italic">Minds</span> Behind Phonetic
            </h2>

            <div className="text-muted-foreground space-y-6 text-lg leading-relaxed">
              <p>
                <span className="text-foreground font-bold">PHONETIC</span> is a corporate training
                institution which was established in 2018 by{" "}
                <span className="text-foreground font-bold">SANTHOSH KUMAR. ANANTA</span>.
              </p>

              <p>
                The main mission of <span className="text-foreground font-semibold">Phonetic</span>{" "}
                is to bring up the students up to the mark of the corporate level and help them to
                reach their dreamed goals.
              </p>

              <p>
                A well experienced faculty will lead you up to the mark.{" "}
                <span className="text-foreground font-semibold">Phonetic</span> has trained
                thousands of aspirants and moving ahead, creating new milestones in the corporate
                training sector.
              </p>

              <p className="text-foreground font-medium italic">
                In one word PHONETIC is a key for the aspirants to unlock their cherished dream.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8">
              <div className="space-y-2">
                <h4 className="text-primary text-3xl font-bold">2018</h4>
                <p className="text-muted-foreground text-sm tracking-widest uppercase">
                  Established
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-primary text-3xl font-bold">1000+</h4>
                <p className="text-muted-foreground text-sm tracking-widest uppercase">
                  Aspirants Trained
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;

"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  slideLeftCinematic,
  slideRightCinematic,
  staggerContainerCinematic,
} from "@/lib/animations";
import Intelligence3D from "@/components/ui/intelligence-3d";

export default function AboutSection() {
  return (
    <section id="about" className="bg-background relative overflow-hidden py-32">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainerCinematic}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2"
        >
          <motion.div variants={slideLeftCinematic} className="relative z-10 h-[600px] w-full">
            <Intelligence3D />
          </motion.div>

          <motion.div variants={slideRightCinematic} className="space-y-8">
            <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
              A New Era of <span className="text-primary italic">Intelligence</span>
            </h2>
            <p className="text-muted-foreground text-xl leading-relaxed">
              We believe that language is not just a tool for communication, but a landscape for
              creation. Our methodology blends traditional phonetics with cinematic storytelling
              techniques to help you master the nuances of tone, rhythm, and presence.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div className="space-y-2">
                <h4 className="text-primary text-3xl font-bold">15K+</h4>
                <p className="text-muted-foreground text-sm tracking-widest uppercase">
                  Students Trained
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-primary text-3xl font-bold">98%</h4>
                <p className="text-muted-foreground text-sm tracking-widest uppercase">
                  Success Rate
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:shadow-primary/25 mt-8 rounded-full px-8 py-4 font-bold text-white transition-all hover:shadow-lg"
            >
              Discover Our Story
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

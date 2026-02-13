"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  slideLeftCinematic,
  slideRightCinematic,
  staggerContainerCinematic,
} from "@/lib/animations";
import { PerspectiveCard, ParallaxImage } from "@/components/ui/cinematic-effects";

const WhoWeAreSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.3, 0.8], [0, 1, 1, 0.2]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.4, 0.5, 0.9], [0.2, 1, 1, 0.2]);
  const opacity3 = useTransform(scrollYProgress, [0.4, 0.6, 0.7, 1], [0.2, 1, 1, 0.2]);
  const opacity4 = useTransform(scrollYProgress, [0.6, 0.8, 0.9, 1], [0.2, 1, 1, 1]);

  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.05]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={containerRef} id="who-we-are" className="relative h-[250vh] bg-background">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="bg-noise absolute inset-0 opacity-[0.03]" />
        <motion.div 
            className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
            className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" 
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="container mx-auto px-6 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full items-center">
            
            {/* Left: Visual Story Anchor */}
            <div className="relative hidden lg:flex items-center justify-center h-full max-h-[80vh]">
               <motion.div style={{ scale, y }} className="relative w-full aspect-[4/5] max-w-md">
                   <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl md:rounded-[2rem] transform rotate-3 scale-105" />
                   <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem] border border-white/10 shadow-2xl bg-black">
                       <ParallaxImage
                         src="/images/santhosh_kumar_ananta.jpg"
                         alt="Santhosh Kumar Ananta"
                         className="h-full w-full"
                         imgClassName="object-cover"
                         strength={0.1}
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                       <div className="absolute bottom-8 left-8 text-white">
                           <h3 className="text-3xl font-display font-bold">Santhosh Kumar</h3>
                           <p className="text-primary tracking-widest text-sm font-bold uppercase mt-1">Founder & Visionary</p>
                       </div>
                   </div>
               </motion.div>
            </div>

            {/* Right: Scrolling Narrative */}
            <div className="flex flex-col justify-center h-full relative z-10">
                <div className="mb-12">
                    <motion.div
                       className="border-primary/20 text-primary mb-6 inline-block rounded-full border bg-white/5 px-6 py-2 text-[11px] font-bold tracking-[0.3em] uppercase backdrop-blur-sm"
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                    >
                      Our Story
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight">
                        The Minds <span className="text-primary italic">Behind</span> <br/> Phonetic
                    </h2>
                </div>

                <div className="space-y-24 relative">
                    {/* Progress Line */}
                    <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent lg:hidden" />
                    
                    <StoryParagraph opacity={opacity1} year="2018">
                        <span className="font-bold text-foreground text-xl">The Beginning.</span> <br/>
                        PHONETIC is a corporate training institution established in 2018 by <span className="text-primary font-bold">SANTHOSH KUMAR. ANANTA</span>. 
                        Born from a passion to bridge the gap between academia and industry.
                    </StoryParagraph>

                    <StoryParagraph opacity={opacity2}>
                        <span className="font-bold text-foreground text-xl">The Mission.</span> <br/>
                         To bring students up to the mark of the corporate level. We define success not just by placement, but by the transformations we ignite in every aspirant's career.
                    </StoryParagraph>

                    <StoryParagraph opacity={opacity3}>
                         <span className="font-bold text-foreground text-xl">The Expertise.</span> <br/>
                         Led by experienced faculty, Phonetic has trained <span className="text-primary font-bold">thousands of aspirants</span>. We are moving ahead, creating new milestones in the corporate training sector every single day.
                    </StoryParagraph>

                    <StoryParagraph opacity={opacity4}>
                        <span className="font-bold text-foreground text-xl">The Key.</span> <br/>
                        <span className="italic text-foreground">"In one word, PHONETIC is a key for the aspirants to unlock their cherished dream."</span>
                        <div className="flex gap-12 mt-8 pt-8 border-t border-border/50">
                            <div>
                                <h4 className="text-4xl font-bold text-primary">2018</h4>
                                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Est.</p>
                            </div>
                            <div>
                                <h4 className="text-4xl font-bold text-primary">1000+</h4>
                                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Alumni</p>
                            </div>
                        </div>
                    </StoryParagraph>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StoryParagraph = ({ children, opacity, year }: { children: React.ReactNode, opacity: any, year?: string }) => {
    return (
        <motion.div style={{ opacity }} className="relative pl-8 lg:pl-0">
            {year && (
                <span className="absolute -left-[4.5rem] top-1 text-xs font-bold text-primary/50 rotate-90 hidden lg:block">
                    {year}
                </span>
            )}
            <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground transition-colors duration-500">
                {children}
            </p>
        </motion.div>
    );
};

export default WhoWeAreSection;

"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashIntroProps {
  onComplete: () => void;
}

const SplashIntro: React.FC<SplashIntroProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleComplete = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  }, [onComplete]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Fallback timer
    const fallbackTimer = setTimeout(() => {
      handleComplete();
    }, 8000); // Extended to 8s

    // Attempt autoplay
    video.muted = true;
    setIsMuted(true);
    
    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Autoplay blocked/failed:", err);
        setIsPlaying(false);
      }
    };
    
    playVideo();

    const handleTimeUpdate = () => {
      if (video.duration) {
        const currentProgress = (video.currentTime / video.duration) * 100;
        setProgress(currentProgress);
      }
    };

    const handleEnded = () => {
      clearTimeout(fallbackTimer);
      handleComplete();
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("play", () => setIsPlaying(true));
    video.addEventListener("pause", () => setIsPlaying(false));

    return () => {
      clearTimeout(fallbackTimer);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [handleComplete]);

  const toggleCreate = () => {
      const video = videoRef.current;
      if (!video) return;
      
      if (video.paused) {
          video.play();
      } else {
          video.pause();
      }
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-5000 flex flex-col items-center justify-center overflow-hidden bg-white"
        >
          <div className="relative flex aspect-video h-full w-full max-w-5xl flex-col items-center justify-center px-4">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-contain cursor-pointer"
              onClick={toggleCreate}
            >
              <source src="/intro-video.mp4?v=3" type="video/mp4" />
            </video>

            {/* Play Button Overlay (Visible only when paused) */}
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute z-20 flex cursor-pointer items-center justify-center rounded-full bg-black/30 p-8 backdrop-blur-md transition-all hover:bg-black/50 hover:scale-110"
                onClick={() => videoRef.current?.play()}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            )}

            {/* Controls Container */}
            <div className="absolute inset-0 z-10 pointer-events-none">
               {/* Mute/Unmute Button */}
               <div className="absolute bottom-12 left-12 pointer-events-auto">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      const video = videoRef.current;
                      if (video) {
                        video.muted = !video.muted;
                        setIsMuted(video.muted);
                      }
                    }}
                    className="rounded-full border border-black/10 bg-white/80 p-3 text-black/80 backdrop-blur-md transition-colors hover:bg-black hover:text-white shadow-lg"
                  >
                    {isMuted ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></svg>
                    )}
                  </motion.button>
               </div>

               {/* Skip Button */}
               <div className="absolute right-12 bottom-12 pointer-events-auto">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleComplete();
                    }}
                    className="rounded-full border border-black/10 bg-white/80 px-6 py-2 text-sm font-bold text-black/80 backdrop-blur-md transition-colors hover:bg-black hover:text-white shadow-lg uppercase tracking-widest"
                  >
                    Skip Intro
                  </motion.button>
               </div>
            </div>
          </div>

          {/* Background Text Elements (Behind video? No, overlay if needed, but video covers screen now) */}
          {/* If object-cover, text behind is useless. Remove it or put on top with blend mode? 
              User wants video to play. Let's prioritize video visibility. 
              I'll remove the PHONETIC text for now as it might distract from video or cause z-index confusion. 
          */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashIntro;

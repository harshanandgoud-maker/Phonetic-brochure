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

  const handleComplete = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  }, [onComplete]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Fallback timer: if video doesn't end or load within 6s, proceed anyway
    const fallbackTimer = setTimeout(() => {
      handleComplete();
    }, 6000);

    // Must start muted to autoplay (browser policy)
    video.muted = true;
    setIsMuted(true);
    video.play().catch(() => {
      // Retry if needed
      video.play().catch(() => {});
    });

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

    return () => {
      clearTimeout(fallbackTimer);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [handleComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-white"
        >
          <div className="relative flex aspect-video h-full w-full max-w-5xl flex-col items-center justify-center px-4">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="h-full w-full object-contain"
            >
              <source src="/intro-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Mute/Unmute Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const video = videoRef.current;
                if (video) {
                  video.muted = !video.muted;
                  setIsMuted(video.muted);
                }
              }}
              className="absolute bottom-12 left-12 z-10 rounded-full border border-black/10 bg-white/50 p-3 text-black/60 backdrop-blur-sm transition-colors hover:bg-black hover:text-white"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              )}
            </motion.button>

            {/* Skip Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleComplete}
              className="absolute right-12 bottom-12 z-10 rounded-full border border-black/10 bg-white/50 px-6 py-2 text-sm font-medium text-black/60 backdrop-blur-sm transition-colors hover:bg-black hover:text-white"
            >
              Skip Intro
            </motion.button>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 w-full bg-black/5">
              <motion.div
                className="h-full bg-black"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.25 }}
              />
            </div>
          </div>

          {/* Background Text Elements for Aesthetic */}
          <div className="pointer-events-none absolute top-20 left-20 opacity-[0.02] select-none">
            <span className="text-[12vw] font-black tracking-tighter uppercase italic">
              PHONETIC
            </span>
          </div>
          <div className="pointer-events-none absolute right-20 bottom-20 text-right opacity-[0.02] select-none">
            <span className="text-[12vw] font-black tracking-tighter uppercase italic">EDU</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashIntro;

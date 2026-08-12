import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1100);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#000] text-[#F5F5F7] flex flex-col justify-between p-8 md:p-16 select-none"
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
    >
      <div className="flex justify-between items-center text-sm text-[#86868B]">
        <span>Jaipur, India</span>
        <span>Portfolio</span>
      </div>

      <div className="max-w-4xl">
        <h1 className="text-4xl md:text-7xl font-extrabold font-display tracking-tight text-[#F5F5F7] uppercase leading-none">
          KHUSH KAPOOR
        </h1>
        <p className="mt-4 text-sm md:text-base text-[#86868B] font-light">
          Photographer & Visual Storyteller
        </p>
      </div>

      <div className="flex justify-between items-end text-sm text-[#86868B]">
        <span>Portraits · Celebrity · Clubs · Street</span>
        <span className="text-[#258DFF]">Est. Jaipur</span>
      </div>
    </motion.div>
  );
}
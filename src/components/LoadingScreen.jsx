import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#050505] text-[#F1F0EC] flex flex-col justify-between p-8 md:p-16 select-none bg-noise"
      exit={{ opacity: 0, y: -40, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="flex justify-between items-center text-xs font-mono tracking-widest text-[#666666] uppercase">
        <span>JAIPUR, INDIA</span>
        <span>INITIALIZING VISUAL EXPERIENCE</span>
      </div>

      <div className="max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-mono text-[#00E5FF] tracking-widest uppercase mb-4"
        >
          PHOTOGRAPHY · VISUAL STORYTELLING
        </motion.div>
        
        <h1 className="text-4xl md:text-7xl font-extrabold font-display tracking-tight text-[#F1F0EC]">
          KHUSH KAPOOR
        </h1>

        <div className="w-full bg-[#1a1a1a] h-[2px] mt-8 overflow-hidden relative">
          <motion.div
            className="bg-[#00E5FF] h-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="flex justify-between items-end font-mono text-xs text-[#666666]">
        <div className="space-y-1">
          <p className="text-[#F1F0EC]">A24 × EDITORIAL × CINEMATIC</p>
          <p className="hidden md:block">PORTRAITS · FASHION · BRANDS · EVENTS</p>
        </div>
        <div className="text-3xl md:text-5xl font-mono font-bold text-[#F1F0EC]">
          {Math.min(progress, 100)}<span className="text-[#00E5FF] text-lg md:text-2xl">%</span>
        </div>
      </div>
    </motion.div>
  );
}

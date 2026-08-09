import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VisualStatement() {
  const [activePhrase, setActivePhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhrase((prev) => (prev === 0 ? 1 : 0));
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const phrases = [
    { main: "DON'T JUST SHOW SOMETHING.", accent: "SHOW THE SOUL BEHIND IT." },
    { main: "MAKE THEM FEEL IT.", accent: "CREATING IMAGES THAT ENDURE." }
  ];

  return (
    <section className="py-32 md:py-48 bg-[#000] border-t border-b border-white/5 relative overflow-hidden flex items-center justify-center min-h-[500px]">
      {/* Dark Ambient Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[500px] h-[500px] rounded-full bg-[#258DFF]/20 filter blur-[120px] animate-pulse-glow" />
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center z-10">
        <span className="kicker block mb-8">
          Visual manifesto
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={activePhrase}
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold font-display uppercase tracking-tight text-[#F5F5F7] leading-none">
              {phrases[activePhrase].main}
            </h2>
            <p className="text-sm md:text-xl text-[#86868B] pt-4">
              {phrases[activePhrase].accent}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

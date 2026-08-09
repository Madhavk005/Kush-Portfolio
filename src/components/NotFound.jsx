import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera } from 'lucide-react';

export default function NotFound({ onReturnHome }) {
  return (
    <div className="fixed inset-0 z-50 bg-[#000] text-[#F5F5F7] flex flex-col justify-between p-8 md:p-16 select-none bg-noise">
      <div className="flex justify-between items-center text-sm text-[#86868B]">
        <span>Khush Kapoor</span>
        <span>Error 404</span>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-20 h-20 rounded-full bg-[#258DFF]/15 text-[#258DFF] flex items-center justify-center mx-auto"
        >
          <Camera className="w-9 h-9" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-9xl font-extrabold font-display uppercase tracking-tight text-[#F5F5F7]"
        >
          WRONG FRAME.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-xl text-[#86868B]"
        >
          The page you're looking for doesn't exist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-6"
        >
          <button
            onClick={onReturnHome}
            className="inline-flex items-center gap-3 text-sm font-medium tracking-widest uppercase text-[#F5F5F7] border-b border-white/30 pb-1.5 mx-auto hover:text-[#258DFF] hover:border-[#258DFF] transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return home</span>
          </button>
        </motion.div>
      </div>

      <div className="flex justify-between items-end text-xs text-[#86868B]">
        <span>Jaipur, India</span>
        <span>© {new Date().getFullYear()} Khush Kapoor</span>
      </div>
    </div>
  );
}

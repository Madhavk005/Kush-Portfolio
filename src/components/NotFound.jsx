import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera } from 'lucide-react';

export default function NotFound({ onReturnHome }) {
  return (
    <div className="fixed inset-0 z-50 bg-[#050505] text-[#F1F0EC] flex flex-col justify-between p-8 md:p-16 select-none bg-noise">
      <div className="flex justify-between items-center text-xs font-mono tracking-widest text-[#00E5FF] uppercase">
        <span>KHUSH KAPOOR</span>
        <span>ERROR 404</span>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-20 h-20 rounded-full border border-[#00E5FF]/40 bg-[#00E5FF]/5 flex items-center justify-center mx-auto text-[#00E5FF]"
        >
          <Camera className="w-10 h-10" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-9xl font-extrabold font-display uppercase tracking-tight text-[#F1F0EC]"
        >
          WRONG FRAME.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm md:text-xl font-mono text-[#666666] tracking-widest uppercase"
        >
          THE PAGE YOU'RE LOOKING FOR DOESN'T EXIST.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-6"
        >
          <button
            onClick={onReturnHome}
            className="px-8 py-4 border border-[#00E5FF] bg-[#00E5FF] text-black font-mono font-bold text-xs tracking-widest uppercase hover:bg-transparent hover:text-[#00E5FF] transition-all flex items-center gap-3 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN HOME →</span>
          </button>
        </motion.div>
      </div>

      <div className="flex justify-between items-end font-mono text-[10px] text-[#666666]">
        <span>JAIPUR, INDIA</span>
        <span>© {new Date().getFullYear()} KHUSH KAPOOR</span>
      </div>
    </div>
  );
}

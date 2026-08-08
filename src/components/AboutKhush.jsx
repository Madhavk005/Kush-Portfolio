import React from 'react';
import { motion } from 'framer-motion';
import ProgressiveImage from './ProgressiveImage';

export default function AboutKhush({ onCursorEnter, onCursorLeave }) {
  return (
    <section id="about" className="py-24 md:py-36 bg-[#050505] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center space-x-3 text-xs font-mono tracking-widest text-[#258DFF] uppercase mb-8"
        >
          <span className="w-8 h-[1px] bg-[#258DFF]" />
          <span>— ABOUT THE ARTIST</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Photos Stack */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 border border-white/10 overflow-hidden group"
              onMouseEnter={() => onCursorEnter("KHUSH")}
              onMouseLeave={onCursorLeave}
            >
              <ProgressiveImage
                src="/assets/images/khush-behind-lens.jpg"
                alt="Khush Kapoor Behind The Lens"
                className="filter contrast-[1.1] grayscale group-hover:grayscale-0 transition-all duration-700"
                containerClassName="w-full h-[480px] md:h-[580px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none" />
              <div className="absolute bottom-6 left-6 text-xs font-mono text-[#F1F0EC] pointer-events-none">
                <p className="font-bold text-[#258DFF]">ON SET · JAIPUR</p>
                <p className="text-white/60">VISUAL DIRECTION & CAMERA</p>
              </div>
            </motion.div>

            {/* Overlapping secondary portrait */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:block absolute -bottom-8 -right-8 w-60 h-72 border-2 border-[#258DFF] overflow-hidden shadow-2xl z-20"
            >
              <ProgressiveImage
                src="/assets/images/khush-portrait.jpg"
                alt="Khush Kapoor Portrait"
                className="w-full h-full"
                containerClassName="w-full h-full"
              />
            </motion.div>
          </div>

          {/* Copy Column */}
          <div className="lg:col-span-6 space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-[#F1F0EC] uppercase leading-[0.95]"
            >
              BEHIND <br />
              <span className="text-[#258DFF]">THE LENS.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6 text-base md:text-lg text-[#F1F0EC]/80 font-light leading-relaxed"
            >
              <p>
                I'm Khush Kapoor, a photographer and visual storyteller based in Jaipur.
              </p>
              <p>
                I photograph people, places, brands and moments that have something worth saying.
              </p>
              <p>
                I'm interested in atmosphere, personality, movement and the little details that turn an ordinary frame into something people remember.
              </p>
              <p>
                I'm constantly experimenting, shooting and finding new ways to tell stories visually.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="pt-4 grid grid-cols-3 gap-6 border-t border-white/10 text-xs font-mono"
            >
              <div>
                <span className="text-[#258DFF] font-bold block text-xl md:text-2xl font-display">8+</span>
                <span className="text-[#666666]">CATEGORIES</span>
              </div>
              <div>
                <span className="text-[#258DFF] font-bold block text-xl md:text-2xl font-display">100%</span>
                <span className="text-[#666666]">INTENTIONAL</span>
              </div>
              <div>
                <span className="text-[#258DFF] font-bold block text-xl md:text-2xl font-display">JAIPUR</span>
                <span className="text-[#666666]">BASE LOCATION</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

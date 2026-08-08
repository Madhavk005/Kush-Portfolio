import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, MapPin } from 'lucide-react';
import ProgressiveImage from './ProgressiveImage';

export default function Hero({ onCursorEnter, onCursorLeave }) {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="hero" className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-between p-6 sm:p-10 md:p-16 lg:p-20 overflow-hidden bg-[#050505] border-b border-white/5 select-none">
      {/* Parallax Hero Cover Photograph */}
      <motion.div
        style={{ y: yParallax }}
        className="absolute inset-0 z-0 opacity-40 filter contrast-[1.1] brightness-75 gpu-accel"
      >
        <ProgressiveImage
          src="/assets/images/all/khush-1-DSC03753.jpg"
          alt="Khush Kapoor Photography Hero"
          priority={true}
          className="scale-105"
          containerClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
      </motion.div>

      {/* Top Metadata Header */}
      <motion.div
        style={{ opacity: opacityFade }}
        className="relative z-10 flex justify-between items-center text-xs font-mono text-[#258DFF] tracking-widest uppercase pt-16 md:pt-8"
      >
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#258DFF] animate-ping" />
          <span className="font-semibold text-white/90">AVAILABLE FOR GLOBAL ASSIGNMENTS</span>
        </div>

        <div className="hidden sm:flex items-center space-x-3 text-white/60">
          <MapPin className="w-3.5 h-3.5 text-[#258DFF]" />
          <span>JAIPUR, INDIA · 26.9124° N, 75.7873° E</span>
        </div>
      </motion.div>

      {/* Hero Central Statement - Fluid Typography */}
      <div className="relative z-10 my-auto py-12 space-y-6 max-w-[100rem]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-3 text-xs font-mono tracking-widest text-[#258DFF] uppercase"
        >
          <span className="w-8 h-[1px] bg-[#258DFF]" />
          <span>KHUSH KAPOOR · PHOTOGRAPHER & VISUAL STORYTELLER</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-fluid-hero font-extrabold font-display tracking-tight text-[#F1F0EC] uppercase leading-[0.88] max-w-[90vw]"
        >
          I MAKE IMAGES <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F1F0EC] via-white to-[#666666]">
            PEOPLE REMEMBER.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-fluid-body text-[#666666] font-mono tracking-wider max-w-2xl uppercase pt-2"
        >
          Cinematic portraits, high-fashion editorials, luxury product photography and raw visual storytelling based in Jaipur, India.
        </motion.p>
      </div>

      {/* Bottom Control Bar & Scroll CTA */}
      <motion.div
        style={{ opacity: opacityFade }}
        className="relative z-10 flex justify-between items-end pt-8 border-t border-white/10"
      >
        <div className="flex items-center space-x-6 text-xs font-mono text-white/60">
          <span className="text-[#258DFF] font-bold">01 // HOME</span>
          <span className="hidden md:inline">· SCROLL TO EXPLORE</span>
        </div>

        <a
          href="#work"
          onMouseEnter={() => onCursorEnter('EXPLORE')}
          onMouseLeave={onCursorLeave}
          className="flex items-center space-x-3 text-xs font-mono tracking-widest text-[#F1F0EC] hover:text-[#258DFF] transition-colors group"
        >
          <span className="hidden sm:inline uppercase">EXPLORE THE WORK</span>
          <div className="p-3 border border-white/10 group-hover:border-[#258DFF] transition-colors bg-[#0A0A0A]">
            <ArrowDown className="w-4 h-4 text-[#258DFF] group-hover:translate-y-1 transition-transform" />
          </div>
        </a>
      </motion.div>
    </section>
  );
}

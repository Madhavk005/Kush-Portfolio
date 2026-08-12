import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, MapPin } from 'lucide-react';
import ProgressiveImage from './ProgressiveImage';

export default function Hero({ onCursorEnter, onCursorLeave }) {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="hero" className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-between p-6 sm:p-10 md:p-16 lg:p-20 overflow-hidden bg-[#000] border-b border-white/5 select-none">
      {/* Parallax Hero Cover Photograph */}
      <motion.div
        style={{ y: yParallax }}
        className="absolute inset-0 z-0 opacity-40 filter contrast-[1.1] brightness-75 gpu-accel"
      >
        <ProgressiveImage
          src="/assets/images/web/street-20251212_120918.jpg"
          alt="Khush Kapoor Photography Hero"
          priority={true}
          className="scale-105"
          containerClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-[#000]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
      </motion.div>

      {/* Top Metadata Header */}
      <motion.div
        style={{ opacity: opacityFade }}
        className="relative z-10 flex justify-between items-center text-sm text-[#86868B] pt-16 md:pt-8"
      >
        <span>Available for global assignments</span>
        <div className="hidden sm:flex items-center space-x-3 text-sm text-[#86868B]">
          <MapPin className="w-3.5 h-3.5" />
          <span>Jaipur, India</span>
        </div>
      </motion.div>

      {/* Hero Central Statement - Fluid Typography */}
      <div className="relative z-10 my-auto py-12 space-y-6 max-w-[100rem]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-sm text-[#86868B]"
        >
          Khush Kapoor · Photographer & Visual Storyteller
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-fluid-hero font-extrabold font-display tracking-tight text-[#F5F5F7] uppercase leading-[0.88] max-w-[90vw]"
        >
          I MAKE IMAGES <br />
          <span className="text-[#86868B]">
            PEOPLE REMEMBER.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-fluid-body text-[#86868B] font-light max-w-2xl pt-2"
        >
          Cinematic portraits, high-fashion editorials, luxury product photography and raw visual storytelling — based in Jaipur, India.
        </motion.p>
      </div>

      {/* Bottom Control Bar & Scroll CTA */}
      <motion.div
        style={{ opacity: opacityFade }}
        className="relative z-10 flex justify-between items-end pt-8 border-t border-white/10"
      >
        <div className="flex items-center space-x-6 text-sm text-[#86868B]">
          <span className="text-[#F5F5F7] font-medium">01 · Home</span>
          <span className="hidden md:inline">Scroll to explore</span>
        </div>

        <a
          href="#work"
          onMouseEnter={() => onCursorEnter('EXPLORE')}
          onMouseLeave={onCursorLeave}
          className="group flex items-center gap-3 text-sm font-medium tracking-widest uppercase text-[#F5F5F7] border-b border-white/30 pb-1.5 hover:text-[#258DFF] hover:border-[#258DFF] transition-colors duration-300"
        >
          <span className="hidden sm:inline">Explore The Work</span>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
}

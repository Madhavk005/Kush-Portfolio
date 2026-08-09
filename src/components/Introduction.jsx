import React from 'react';
import { motion } from 'framer-motion';

export default function Introduction({ onCursorEnter, onCursorLeave }) {
  const categories = [
    "PORTRAITS", "FASHION", "BRANDS", "EVENTS",
    "PRODUCTS", "EDITORIALS", "LIFESTYLE", "CINEMATIC"
  ];

  return (
    <section id="about-intro" className="py-24 md:py-36 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center space-x-3 text-xs font-mono tracking-widest text-[#258DFF] uppercase mb-8"
        >
          <span className="w-8 h-[1px] bg-[#258DFF]" />
          <span>— 01 / THE PERSON BEHIND THE CAMERA</span>
        </motion.div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Bold Statement & Copy */}
          <div className="lg:col-span-7 space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-[#F1F0EC] uppercase leading-[0.95]"
            >
              I'M NOT HERE <br />
              <span className="text-[#258DFF]">TO JUST TAKE</span> PHOTOS.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-lg md:text-2xl text-[#F1F0EC]/90 font-light leading-relaxed border-l-2 border-[#258DFF] pl-6"
            >
              I'm Khush Kapoor — a photographer and visual storyteller obsessed with creating images that feel like moments, not content.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-4 text-sm md:text-base text-[#666666] leading-relaxed font-light"
            >
              <p>
                Based in Jaipur, India, I operate at the intersection of commercial precision and cinematic storytelling. Whether directing a high-fashion lookbook, capturing intimate portraits, or documenting live energy, my goal is singular: create frames that command attention.
              </p>
            </motion.div>

            {/* Scope Category Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="pt-4"
            >
              <span className="text-[10px] font-mono tracking-widest text-[#666666] uppercase block mb-4">
                CREATIVE SPECTRUM
              </span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 border border-white/10 text-xs font-mono text-[#F1F0EC]/80 hover:border-[#258DFF] hover:text-[#258DFF] transition-colors"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Strong Editorial Portrait of Khush */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative group"
            onMouseEnter={() => onCursorEnter("KHUSH")}
            onMouseLeave={onCursorLeave}
          >
            <div className="relative img-reveal-wrapper rounded-none overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/assets/images/web/khush-portrait.jpg"
                alt="Khush Kapoor Photographer"
                className="w-full h-[520px] md:h-[620px] object-cover object-center filter grayscale contrast-[1.15] group-hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Dark overlay & badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-xs font-mono">
                <div>
                  <p className="text-[#F1F0EC] font-bold">KHUSH KAPOOR</p>
                  <p className="text-[#666666]">FOUNDER & VISUAL DIRECTOR</p>
                </div>
                <span className="text-[#258DFF]">JAIPUR · 2026</span>
              </div>
            </div>

            {/* Subtle background accent box */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#258DFF]/20 pointer-events-none -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

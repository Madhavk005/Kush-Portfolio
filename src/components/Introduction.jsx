import React from 'react';
import { motion } from 'framer-motion';

export default function Introduction({ onCursorEnter, onCursorLeave }) {
  const categories = [
    "PORTRAITS", "FASHION", "BRANDS", "EVENTS",
    "PRODUCTS", "EDITORIALS", "LIFESTYLE", "CINEMATIC"
  ];

  return (
    <section id="about-intro" className="py-24 md:py-36 bg-[#000] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kicker mb-8"
        >
          The person behind the camera
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
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-[#F5F5F7] uppercase leading-[0.95]"
            >
              I'M NOT HERE <br />
              <span className="text-[#258DFF]">TO JUST TAKE</span> PHOTOS.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-lg md:text-2xl text-[#F5F5F7]/90 font-light leading-relaxed rounded-r-2xl bg-[#0D0D0E] p-6 md:p-8"
            >
              I'm Khush Kapoor — a photographer and visual storyteller obsessed with creating images that feel like moments, not content.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-4 text-sm md:text-base text-[#86868B] leading-relaxed font-light"
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
              <span className="block text-sm text-[#86868B] mb-4">Creative spectrum</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-[#0D0D0E] text-sm text-[#F5F5F7]/80"
                  >
                    {cat[0] + cat.slice(1).toLowerCase()}
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
            <div className="relative img-reveal-wrapper overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/assets/images/web/IMG_8689.jpg"
                alt="Khush Kapoor Photographer"
                className="w-full h-[520px] md:h-[620px] object-cover object-center filter grayscale contrast-[1.15] group-hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Dark overlay & caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <p className="text-[#F5F5F7] font-bold">Khush Kapoor</p>
                  <p className="text-[#86868B] text-sm">Founder & visual director</p>
                </div>
                <span className="text-sm text-[#86868B]">Jaipur · 2026</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { WHY_KHUSH_PILLARS } from '../data/portfolioData';

export default function WhyKhush() {
  return (
    <section className="py-24 md:py-36 bg-[#000] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kicker mb-8"
        >
          The creative edge
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-[#F5F5F7] uppercase leading-[0.95] max-w-5xl mb-16 md:mb-24"
        >
          PEOPLE DON'T <br />
          <span className="text-[#86868B]">REMEMBER CONTENT.</span> <br />
          <span className="text-[#258DFF]">THEY REMEMBER HOW IT MADE THEM FEEL.</span>
        </motion.h2>

        {/* 4 Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {WHY_KHUSH_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 md:p-10 bg-[#0D0D0E] hover:bg-[#101012] transition-all duration-300 relative group"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-sm text-[#86868B]">
                  {pillar.number}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold font-display uppercase text-[#F5F5F7] transition-colors mb-4">
                {pillar.title}
              </h3>

              <p className="text-sm md:text-base text-[#F5F5F7]/80 font-light leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { WHY_KHUSH_PILLARS } from '../data/portfolioData';

export default function WhyKhush() {
  return (
    <section className="py-24 md:py-36 bg-[#050505] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center space-x-3 text-xs font-mono tracking-widest text-[#00E5FF] uppercase mb-8"
        >
          <span className="w-8 h-[1px] bg-[#00E5FF]" />
          <span>— THE CREATIVE EDGE</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-[#F1F0EC] uppercase leading-[0.95] max-w-5xl mb-16 md:mb-24"
        >
          PEOPLE DON'T <br />
          <span className="text-[#666666]">REMEMBER CONTENT.</span> <br />
          <span className="text-[#00E5FF]">THEY REMEMBER HOW IT MADE THEM FEEL.</span>
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
              className="p-8 md:p-10 border border-white/10 bg-[#0B0B0B] hover:border-[#00E5FF]/50 transition-all duration-300 relative group"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs font-mono text-[#00E5FF] font-bold">
                  {pillar.number} / PHILOSOPHY
                </span>
                <div className="w-2 h-2 rounded-full bg-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold font-display uppercase text-[#F1F0EC] group-hover:text-[#00E5FF] transition-colors mb-4">
                {pillar.title}
              </h3>

              <p className="text-sm md:text-base text-[#F1F0EC]/80 font-light leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

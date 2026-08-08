import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, ArrowUpRight, Quote } from 'lucide-react';
import { CLIENT_COLLABORATIONS, TESTIMONIALS, INSTAGRAM_GRID } from '../data/portfolioData';
import ProgressiveImage from './ProgressiveImage';

export default function SocialSection({ onCursorEnter, onCursorLeave }) {
  return (
    <section className="py-24 md:py-36 bg-[#050505] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        {/* Client Brands & Testimonials */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-3 text-xs font-mono tracking-widest text-[#258DFF] uppercase"
          >
            <span className="w-8 h-[1px] bg-[#258DFF]" />
            <span>— TRUSTED / COLLABORATED / CREATED WITH</span>
          </motion.div>

          {/* Marquee Brands list */}
          <div className="border-y border-white/10 py-6 overflow-hidden">
            <div className="flex items-center space-x-12 min-w-max animate-marquee">
              {[...CLIENT_COLLABORATIONS, ...CLIENT_COLLABORATIONS].map((client, idx) => (
                <div key={idx} className="flex items-center space-x-12">
                  <span className="text-xl md:text-3xl font-extrabold font-display uppercase tracking-wider text-[#F1F0EC]/70 hover:text-[#258DFF] transition-colors">
                    {client}
                  </span>
                  <span className="text-[#258DFF] font-mono text-sm">/</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials Quotes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 border border-white/10 bg-[#0B0B0B] relative space-y-6"
              >
                <Quote className="w-8 h-8 text-[#258DFF]/40" />
                <p className="text-base md:text-lg text-[#F1F0EC]/90 font-light italic leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="flex justify-between items-center text-xs font-mono border-t border-white/10 pt-4">
                  <span className="text-[#F1F0EC] font-bold">{t.brand}</span>
                  <span className="text-[#258DFF]">{t.author}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Instagram Grid Section */}
        <div className="space-y-12 pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#258DFF] uppercase block mb-3">
                — INSTAGRAM ARCHIVE
              </span>
              <h2 className="text-4xl sm:text-6xl font-extrabold font-display text-[#F1F0EC] uppercase">
                MORE FRAMES <br />
                <span className="text-[#666666]">OFF THE GRID.</span>
              </h2>
            </div>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => onCursorEnter("OPEN")}
              onMouseLeave={onCursorLeave}
              className="px-6 py-3 border border-white/10 hover:border-[#258DFF] bg-[#0B0B0B] text-xs font-mono text-[#F1F0EC] hover:text-[#258DFF] transition-all flex items-center gap-3 self-start md:self-auto group"
            >
              <Instagram className="w-4 h-4 text-[#258DFF]" />
              <span>FOLLOW THE PROCESS →</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* 6 Grid items */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {INSTAGRAM_GRID.map((item) => (
              <a
                key={item.id}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => onCursorEnter("INSTA")}
                onMouseLeave={onCursorLeave}
                className="group relative h-48 md:h-64 overflow-hidden border border-white/10 bg-[#0B0B0B]"
              >
                <ProgressiveImage
                  src={item.image}
                  alt={item.caption}
                  className="filter contrast-[1.05] brightness-90 group-hover:brightness-100 group-hover:scale-110 transition-all duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center pointer-events-none">
                  <span className="text-[10px] font-mono text-[#258DFF] leading-tight">
                    {item.caption}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

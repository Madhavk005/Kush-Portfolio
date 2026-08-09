import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { INSTAGRAM_GRID } from '../data/portfolioData';
import ProgressiveImage from './ProgressiveImage';

const SHOOT_TYPES = [
  'PORTRAITS',
  'FASHION',
  'BRANDS',
  'EVENTS',
  'PRODUCTS',
  'EDITORIAL',
  'CINEMATIC',
  'STREET / LIFESTYLE',
];

export default function SocialSection({ onCursorEnter, onCursorLeave }) {
  return (
    <section className="py-24 md:py-36 bg-[#000] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        {/* Client Brands & Testimonials */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="kicker"
          >
            What I shoot
          </motion.div>

          {/* Marquee of shoot types */}
          <div className="border-y border-white/10 py-6 overflow-hidden" aria-hidden="true">
            <div className="flex items-center space-x-12 min-w-max animate-marquee">
              {[...SHOOT_TYPES, ...SHOOT_TYPES].map((type, idx) => (
                <div key={idx} className="flex items-center space-x-12">
                  <span className="text-xl md:text-3xl font-extrabold font-display uppercase tracking-wider text-[#F5F5F7]/70">
                    {type}
                  </span>
                  <span className="text-[#258DFF] font-mono text-sm">/</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Collaborator CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-t border-white/5 pt-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <p className="text-xl md:text-2xl font-display font-extrabold uppercase text-[#F5F5F7]">
                Your brand could be <span className="text-[#258DFF]">on this list.</span>
              </p>
              <p className="text-sm text-[#86868B] font-light">
                Portraits, lookbooks, campaigns, products and live events — booked from Jaipur, shot around the world.
              </p>
            </div>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={() => onCursorEnter("LET'S GO")}
              onMouseLeave={onCursorLeave}
              className="group/btn text-sm font-medium tracking-widest uppercase text-[#F5F5F7] border-b border-white/30 pb-1.5 w-fit hover:text-[#258DFF] hover:border-[#258DFF] transition-colors duration-300 flex items-center gap-2 self-start md:self-auto"
            >
              Start a project
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          </motion.div>
        </div>

        {/* Instagram Grid Section */}
        <div className="space-y-12 pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="block text-sm text-[#86868B] mb-3">
                Instagram archive
              </span>
              <h2 className="text-4xl sm:text-6xl font-extrabold font-display text-[#F5F5F7] uppercase">
                MORE FRAMES <br />
                <span className="text-[#86868B]">OFF THE GRID.</span>
              </h2>
            </div>

            <a
              href="https://www.instagram.com/keto.k0"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => onCursorEnter("OPEN")}
              onMouseLeave={onCursorLeave}
              className="group/btn text-sm font-medium tracking-widest uppercase text-[#F5F5F7] border-b border-white/30 pb-1.5 w-fit hover:text-[#258DFF] hover:border-[#258DFF] transition-colors duration-300 flex items-center gap-3 self-start md:self-auto"
            >
              <Instagram className="w-4 h-4 text-[#258DFF]" />
              <span>Follow the process</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          </div>

          {/* 6 Grid items */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {INSTAGRAM_GRID.map((item) => (
              <a
                key={item.id}
                href="https://www.instagram.com/keto.k0"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => onCursorEnter("INSTA")}
                onMouseLeave={onCursorLeave}
                className="group relative aspect-square overflow-hidden rounded-xl bg-[#0C0C0D]"
              >
                <ProgressiveImage
                  src={item.image}
                  alt={item.caption}
                  className="filter contrast-[1.05] brightness-90 group-hover:brightness-100 group-hover:scale-110 transition-all duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center pointer-events-none">
                  <span className="text-xs text-white/90 leading-tight">
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

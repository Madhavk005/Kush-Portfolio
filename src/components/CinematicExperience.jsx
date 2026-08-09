import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProgressiveImage from './ProgressiveImage';

export default function CinematicExperience({ onCursorEnter, onCursorLeave }) {
  const { scrollYProgress } = useScroll();

  const textXLeft = useTransform(scrollYProgress, [0.3, 0.7], [100, -300]);
  const textXRight = useTransform(scrollYProgress, [0.3, 0.7], [-300, 100]);

  const images = [
    { src: "/assets/images/web/cinematic-amber-fort.jpg", title: "AMER TWILIGHT" },
    { src: "/assets/images/web/d4ec5007-db05-4660-a299-569cebdd3590.jpg", title: "JAIPUR SHADOWS" },
    { src: "/assets/images/web/fashion-editorial-1.jpg", title: "ROYAL RUNWAY" },
    { src: "/assets/images/web/DSC04910.jpg", title: "SUFI NOCTURNE" },
    { src: "/assets/images/web/brand-product-shoot.jpg", title: "GOLD REFLECTIONS" },
  ];

  return (
    <section className="py-24 md:py-36 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Moving Kinetic Text Header */}
      <div className="space-y-4 mb-16 overflow-hidden select-none pointer-events-none">
        <motion.div style={{ x: textXLeft }} className="whitespace-nowrap flex space-x-8 text-6xl md:text-9xl font-extrabold font-display uppercase tracking-tight text-stroke opacity-30">
          <span>CINEMATIC VISUAL STORYTELLING</span>
          <span>·</span>
          <span>ATMOSPHERE & SHADOWS</span>
          <span>·</span>
        </motion.div>
        <motion.div style={{ x: textXRight }} className="whitespace-nowrap flex space-x-8 text-6xl md:text-9xl font-extrabold font-display uppercase tracking-tight text-[#258DFF]/25">
          <span>FRAMES THAT STOP SCROLLING</span>
          <span>·</span>
          <span>JAIPUR TO THE WORLD</span>
          <span>·</span>
        </motion.div>
      </div>

      {/* Horizontal Image Sequence Strip */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex space-x-6 overflow-x-auto no-scrollbar py-6 snap-x snap-mandatory">
          {images.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="flex-none w-[300px] sm:w-[400px] md:w-[500px] h-[350px] md:h-[450px] snap-center relative border border-white/10 overflow-hidden group cursor-pointer"
              onMouseEnter={() => onCursorEnter("EXPLORE")}
              onMouseLeave={onCursorLeave}
            >
              <ProgressiveImage
                src={img.src}
                alt={img.title}
                className="filter contrast-[1.1] brightness-90 group-hover:brightness-100 transition-all duration-700"
                containerClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-xs font-mono pointer-events-none">
                <div>
                  <span className="text-[#258DFF] block mb-1">0{i + 1} / CINEMATIC FRAME</span>
                  <h4 className="text-lg font-bold font-display text-[#F1F0EC] uppercase">{img.title}</h4>
                </div>
                <span className="text-white/60">35MM ASPECT</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

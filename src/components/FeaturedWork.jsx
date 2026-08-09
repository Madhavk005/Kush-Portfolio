import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Grid, Layers, Maximize2 } from 'lucide-react';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_PROJECTS, ARCHIVE_IMAGES } from '../data/portfolioData';
import ImageLightbox from './ImageLightbox';
import ProgressiveImage from './ProgressiveImage';

export default function FeaturedWork({ onSelectProject, onCursorEnter, onCursorLeave }) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [viewMode, setViewMode] = useState("projects"); // "projects" | "all_frames"
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredProjects = activeCategory === "ALL"
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => 
        p.category === activeCategory || p.subCategories.includes(activeCategory)
      );

  return (
    <section id="work" className="py-24 md:py-36 bg-[#050505] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header & View Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3 text-xs font-mono tracking-widest text-[#258DFF] uppercase mb-4"
            >
              <span className="w-8 h-[1px] bg-[#258DFF]" />
              <span>— 02 / SELECTED WORK & COMPLETE ARCHIVE</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-[#F1F0EC] uppercase leading-[0.95]"
            >
              THE WORK <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F1F0EC] to-[#666666]">
                SPEAKS FIRST.
              </span>
            </motion.h2>
          </div>

          <div className="flex flex-col md:items-end gap-4">
            <div className="flex items-center space-x-2 bg-[#0B0B0B] p-1 border border-white/10 text-xs font-mono">
              <button
                onClick={() => setViewMode("projects")}
                className={`px-4 py-2 flex items-center gap-2 transition-colors ${
                  viewMode === "projects" ? 'bg-[#258DFF] text-white font-bold' : 'text-[#666666] hover:text-[#F1F0EC]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>CURATED PROJECTS</span>
              </button>
              <button
                onClick={() => setViewMode("all_frames")}
                className={`px-4 py-2 flex items-center gap-2 transition-colors ${
                  viewMode === "all_frames" ? 'bg-[#258DFF] text-white font-bold' : 'text-[#666666] hover:text-[#F1F0EC]'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>ALL {ARCHIVE_IMAGES.length} FRAMES WALL</span>
              </button>
            </div>

            <p className="text-xs font-mono text-[#666666] uppercase tracking-widest">
              {viewMode === "projects" ? `${PORTFOLIO_PROJECTS.length} FEATURED CASE STUDIES` : `${ARCHIVE_IMAGES.length} PHOTOGRAPHS FROM KHUSH'S SHOOT ARCHIVES`}
            </p>
          </div>
        </div>

        {/* Category Filter Horizontal Scroll */}
        {viewMode === "projects" && (
          <div className="mb-12 overflow-x-auto no-scrollbar pb-2">
            <div className="flex items-center space-x-2 md:space-x-3 min-w-max">
              {PORTFOLIO_CATEGORIES.map((category) => {
                const isSelected = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    onMouseEnter={() => onCursorEnter('OPEN')}
                    onMouseLeave={onCursorLeave}
                    className={`px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#258DFF] text-white font-bold border border-[#258DFF]'
                        : 'bg-[#0A0A0A] text-[#F1F0EC]/70 border border-white/10 hover:border-[#258DFF]/50 hover:text-[#258DFF]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* View Mode 1: Curated Editorial Masonry Grid */}
        {viewMode === "projects" && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10"
          >
            <AnimatePresence>
              {filteredProjects.length === 0 && (
                <div className="md:col-span-12 border border-white/10 bg-[#0B0B0B] p-16 text-center">
                  <p className="font-mono text-xs text-[#666666] uppercase tracking-widest">
                    NO CASE STUDIES IN THIS CATEGORY YET — EXPLORE THE FULL FRAMES WALL.
                  </p>
                </div>
              )}
              {filteredProjects.map((project, idx) => {
                let colSpan = "md:col-span-6";
                let heightClass = "h-[450px] md:h-[550px]";
                
                if (project.aspectRatio === "wide") {
                  colSpan = "md:col-span-12";
                  heightClass = "h-[400px] md:h-[600px]";
                } else if (project.aspectRatio === "large") {
                  colSpan = "md:col-span-7";
                  heightClass = "h-[450px] md:h-[580px]";
                } else if (project.aspectRatio === "tall") {
                  colSpan = "md:col-span-5";
                  heightClass = "h-[500px] md:h-[650px]";
                }

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: idx * 0.04 }}
                    key={project.id}
                    className={`${colSpan} group cursor-pointer`}
                    onClick={() => onSelectProject(project)}
                    onMouseEnter={() => onCursorEnter('VIEW')}
                    onMouseLeave={onCursorLeave}
                  >
                    <div className={`relative ${heightClass} overflow-hidden border border-white/10 bg-[#0B0B0B] content-visibility-auto`}>
                      <ProgressiveImage
                        src={project.heroImage}
                        alt={project.title}
                        priority={idx < 2}
                        className="filter contrast-[1.05] brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
                        containerClassName="w-full h-full"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />

                      <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-xs font-mono tracking-widest text-[#258DFF] pointer-events-none">
                        <span>{project.number} / {project.category}</span>
                        <span className="text-white/60">{project.gallery.length} FRAMES</span>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-end pointer-events-none">
                        <p className="text-[10px] font-mono tracking-widest text-[#258DFF] uppercase mb-1">
                          {project.subCategories.join(" · ")}
                        </p>
                        
                        <div className="flex justify-between items-end">
                          <h3 className="text-2xl md:text-4xl font-extrabold font-display tracking-tight text-[#F1F0EC] group-hover:text-[#258DFF] transition-colors">
                            {project.title}
                          </h3>

                          <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-[#F1F0EC] group-hover:text-[#258DFF] transition-colors">
                            <span className="hidden sm:inline">VIEW STORY</span>
                            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* View Mode 2: Complete 192 Frames Infinite Archive Wall */}
        {viewMode === "all_frames" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {ARCHIVE_IMAGES.map((imgPath, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="group relative h-48 sm:h-56 md:h-64 overflow-hidden border border-white/10 bg-[#0B0B0B] cursor-pointer content-visibility-auto"
                onMouseEnter={() => onCursorEnter('EXPAND')}
                onMouseLeave={onCursorLeave}
              >
                <ProgressiveImage
                  src={imgPath}
                  alt={`Khush Kapoor Frame ${idx + 1}`}
                  className="filter contrast-[1.05] group-hover:scale-110 transition-transform duration-500"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 pointer-events-none">
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#258DFF]">
                    <span>FRAME #{idx + 1}</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9px] font-mono text-white/80 uppercase truncate">CLICK TO EXPAND</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Fullscreen Interactive Lightbox */}
      {lightboxIndex !== null && (
        <ImageLightbox
          images={ARCHIVE_IMAGES}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </section>
  );
}

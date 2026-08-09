import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_PROJECTS, ARCHIVE_IMAGES } from '../data/portfolioData';
import ImageLightbox from './ImageLightbox';
import ProgressiveImage from './ProgressiveImage';
import StoryCard from './StoryCard';

const EASE = [0.16, 1, 0.3, 1];

const CARD_LAYOUTS = [
  { col: 'md:col-span-8', aspect: 'aspect-[4/5]', mt: '' },
  { col: 'md:col-span-12', aspect: 'aspect-[16/10] md:aspect-[21/9]', mt: 'md:mt-16' },
  { col: 'md:col-span-5', aspect: 'aspect-[3/4]', mt: 'md:mt-36' },
  { col: 'md:col-span-7', aspect: 'aspect-[16/10]', mt: 'md:mt-8' },
  { col: 'md:col-span-7', aspect: 'aspect-[16/10]', mt: 'md:mt-16' },
  { col: 'md:col-span-5', aspect: 'aspect-[3/4]', mt: 'md:mt-40' },
  { col: 'md:col-span-12', aspect: 'aspect-[21/10]', mt: 'md:mt-16' },
];

function getCardLayout(index) {
  return CARD_LAYOUTS[Math.min(index, CARD_LAYOUTS.length - 1)];
}

function StoryPanel({ project, onSelectProject, onCursorEnter, onCursorLeave }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      className="md:col-span-4 flex flex-col justify-between md:py-4"
    >
      <div>
        <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight uppercase leading-[0.98] text-[#F5F5F7]">
          {project.title}
        </h2>

        <p className="mt-5 text-base text-[#86868B] leading-relaxed">
          {project.tagline}
        </p>

        <div className="mt-8 pt-6 border-t border-white/10">
          {[
            ['Client', project.client],
            ['Location', project.location],
            ['Year', project.year],
            ['Role', project.role],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between gap-6 py-2 text-sm border-b border-white/5">
              <span className="text-[#86868B]">{label}</span>
              <span className="text-[#F5F5F7]/90 text-right">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onSelectProject(project)}
        onMouseEnter={() => onCursorEnter('OPEN')}
        onMouseLeave={onCursorLeave}
        className="group/btn mt-10 md:mt-14 inline-flex items-center gap-3 text-sm font-medium tracking-widest uppercase text-[#F5F5F7] border-b border-white/40 pb-1.5 w-fit hover:text-[#258DFF] hover:border-[#258DFF] transition-colors duration-300"
      >
        Read The Full Story
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
      </button>
    </motion.div>
  );
}

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
    <section id="work" className="py-24 md:py-36 bg-[#000] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-[#F5F5F7] uppercase leading-[0.95]"
          >
            THE WORK <br />
            <span className="text-[#86868B]">SPEAKS FIRST.</span>
          </motion.h2>

          <div className="flex items-baseline gap-6 md:gap-10 text-sm">
            <button
              onClick={() => setViewMode("projects")}
              className={`pb-1 border-b transition-colors duration-300 ${
                viewMode === "projects"
                  ? 'border-[#F5F5F7] text-[#F5F5F7]'
                  : 'border-transparent text-[#86868B] hover:text-[#F5F5F7]'
              }`}
            >
              Selected Work
            </button>
            <button
              onClick={() => setViewMode("all_frames")}
              className={`pb-1 border-b transition-colors duration-300 ${
                viewMode === "all_frames"
                  ? 'border-[#F5F5F7] text-[#F5F5F7]'
                  : 'border-transparent text-[#86868B] hover:text-[#F5F5F7]'
              }`}
            >
              The Archive — {ARCHIVE_IMAGES.length} frames
            </button>
          </div>
        </div>

        {/* Category Filter */}
        {viewMode === "projects" && (
          <div className="mb-12 flex flex-wrap items-center gap-x-6 gap-y-3">
            {PORTFOLIO_CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`text-sm font-medium lowercase transition-colors duration-300 ${
                    isSelected
                      ? 'text-[#F5F5F7]'
                      : 'text-[#86868B] hover:text-[#F5F5F7]'
                  }`}
                >
                  {category === "STREET / LIFESTYLE" ? "street / lifestyle" : category.toLowerCase()}
                </button>
              );
            })}
          </div>
        )}

        {/* View Mode 1: Curated Editorial Story Grid */}
        {viewMode === "projects" && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-12 gap-x-6 md:gap-x-8 gap-y-10 md:gap-y-0"
          >
            <AnimatePresence>
              {filteredProjects.length === 0 && (
                <div className="md:col-span-12 p-16 text-center">
                  <p className="text-sm text-[#86868B]">
                    No case studies in this category yet — explore the full archive.
                  </p>
                </div>
              )}
              {filteredProjects.map((project, idx) => {
                const layout = getCardLayout(idx);
                return (
                  <React.Fragment key={project.id}>
                    <StoryCard
                      project={project}
                      index={idx}
                      layout={layout}
                      onSelect={onSelectProject}
                      onCursorEnter={onCursorEnter}
                      onCursorLeave={onCursorLeave}
                    />
                    {idx === 0 && (
                      <StoryPanel
                        project={project}
                        onSelectProject={onSelectProject}
                        onCursorEnter={onCursorEnter}
                        onCursorLeave={onCursorLeave}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Archive Bridge */}
        {viewMode === "projects" && filteredProjects.length > 0 && (
          <div className="mt-20 md:mt-32 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-white/5 pt-8">
            <p className="text-lg text-[#86868B]">
              {ARCHIVE_IMAGES.length} frames sit behind these stories — the contact sheets, outtakes and quiet in-betweens.
            </p>
            <button
              onClick={() => setViewMode("all_frames")}
              onMouseEnter={() => onCursorEnter('OPEN')}
              onMouseLeave={onCursorLeave}
              className="group inline-flex items-center gap-3 text-sm font-medium tracking-widest uppercase text-[#F5F5F7] border-b border-white/40 pb-1.5 w-fit hover:text-[#258DFF] hover:border-[#258DFF] transition-colors duration-300 shrink-0"
            >
              Open The Archive
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        )}

        {/* View Mode 2: The Archive */}
        {viewMode === "all_frames" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4"
          >
            {ARCHIVE_IMAGES.map((imgPath, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="group relative aspect-square overflow-hidden rounded-lg bg-[#0C0C0D] cursor-pointer content-visibility-auto"
                onMouseEnter={() => onCursorEnter('EXPAND')}
                onMouseLeave={onCursorLeave}
              >
                <ProgressiveImage
                  src={imgPath}
                  alt={`Khush Kapoor Frame ${idx + 1}`}
                  className="filter contrast-[1.05] group-hover:scale-110 transition-transform duration-500"
                  containerClassName="absolute inset-0"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 pointer-events-none">
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#F5F5F7]">
                    <span>#{idx + 1}</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9px] text-white/70 uppercase tracking-wider truncate">Expand</span>
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
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, MapPin, Calendar, User, Tag, Maximize2 } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import ImageLightbox from './ImageLightbox';
import ProgressiveImage from './ProgressiveImage';
import useFocusTrap from '../hooks/useFocusTrap';

export default function ProjectModal({ project, onClose, onSelectNextProject, onCursorEnter, onCursorLeave }) {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const modalRef = useRef(null);
  useFocusTrap(!!project && activeLightboxIndex === null, modalRef);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeLightboxIndex === null) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, activeLightboxIndex]);

  if (!project) return null;

  // Find next project
  const currentIndex = PORTFOLIO_PROJECTS.findIndex(p => p.id === project.id);
  const nextProject = PORTFOLIO_PROJECTS[(currentIndex + 1) % PORTFOLIO_PROJECTS.length];

  return (
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#050505] text-[#F1F0EC] overflow-y-auto"
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4 text-xs font-mono tracking-widest text-[#258DFF]">
            <span>PROJECT // {project.number}</span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden sm:inline text-white/80">{project.category}</span>
          </div>

          <button
            onClick={onClose}
            onMouseEnter={() => onCursorEnter('CLOSE')}
            onMouseLeave={onCursorLeave}
            className="px-4 py-2 border border-white/20 hover:border-[#258DFF] text-xs font-mono tracking-widest uppercase transition-colors flex items-center space-x-2 text-[#F1F0EC] hover:text-[#258DFF]"
          >
            <span>CLOSE [ESC]</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 space-y-16">
          {/* Title & Metadata Header */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3 text-xs font-mono text-[#258DFF] tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-[#258DFF]" />
              <span>{project.subCategories.join(" · ")}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold font-display tracking-tight text-[#F1F0EC] uppercase leading-[0.95]">
              {project.title}
            </h1>

            {/* Metadata Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10 text-xs font-mono">
              <div>
                <span className="text-[#666666] block mb-1">CLIENT</span>
                <span className="text-[#F1F0EC] font-semibold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#258DFF]" /> {project.client}
                </span>
              </div>
              <div>
                <span className="text-[#666666] block mb-1">LOCATION</span>
                <span className="text-[#F1F0EC] font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#258DFF]" /> {project.location}
                </span>
              </div>
              <div>
                <span className="text-[#666666] block mb-1">YEAR</span>
                <span className="text-[#F1F0EC] font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#258DFF]" /> {project.year}
                </span>
              </div>
              <div>
                <span className="text-[#666666] block mb-1">ROLE</span>
                <span className="text-[#F1F0EC] font-semibold flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#258DFF]" /> {project.role}
                </span>
              </div>
            </div>
          </div>

          {/* Hero Banner Image */}
          <div 
            onClick={() => setActiveLightboxIndex(0)}
            className="relative h-[60vh] md:h-[80vh] overflow-hidden border border-white/10 group cursor-pointer"
            onMouseEnter={() => onCursorEnter('EXPAND')}
            onMouseLeave={onCursorLeave}
          >
            <ProgressiveImage
              src={project.heroImage}
              alt={project.title}
              priority={true}
              className="filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
              containerClassName="w-full h-full"
            />
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 text-[10px] font-mono text-[#258DFF] flex items-center gap-1.5 pointer-events-none">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>EXPAND FRAME</span>
            </div>
          </div>

          {/* Narrative Concept Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 py-8 border-y border-white/10">
            <div className="md:col-span-4 space-y-4">
              <span className="text-xs font-mono tracking-widest text-[#258DFF] uppercase block">
                — STORY CONCEPT
              </span>
              <p className="text-xl md:text-2xl font-bold font-display text-[#F1F0EC] leading-snug">
                "{project.tagline}"
              </p>
            </div>

            <div className="md:col-span-8 space-y-6 text-sm md:text-base text-[#F1F0EC]/80 font-sans leading-relaxed">
              <p>{project.description}</p>

              {project.quote && (
                <div className="p-6 bg-[#0B0B0B] border-l-2 border-[#258DFF] font-mono text-xs text-[#258DFF] tracking-wide">
                  "{project.quote}"
                </div>
              )}
            </div>
          </div>

          {/* Image Gallery Stream */}
          <div className="space-y-8">
            <div className="flex justify-between items-center font-mono text-xs text-[#666666]">
              <span className="text-[#258DFF] uppercase">— GALLERY SEQUENCE ({project.gallery.length} FRAMES)</span>
              <span>CLICK ANY FRAME TO EXPAND</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {project.gallery.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveLightboxIndex(idx)}
                  className="relative group h-[400px] md:h-[550px] overflow-hidden border border-white/10 bg-[#0B0B0B] cursor-pointer"
                  onMouseEnter={() => onCursorEnter('EXPAND')}
                  onMouseLeave={onCursorLeave}
                >
                  <ProgressiveImage
                    src={img}
                    alt={`${project.title} frame ${idx + 1}`}
                    className="filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex justify-between p-6 items-end pointer-events-none">
                    <span className="text-xs font-mono text-[#258DFF]">FRAME #{idx + 1}</span>
                    <div className="flex items-center gap-2 text-xs font-mono text-white bg-black/60 px-3 py-1.5 border border-white/10">
                      <Maximize2 className="w-3.5 h-3.5 text-[#258DFF]" />
                      <span>FULLSCREEN</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Project Footer CTA */}
          <div className="pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <span className="text-xs font-mono text-[#666666] uppercase tracking-widest block mb-2">
                NEXT CASE STUDY
              </span>
              <h3 className="text-3xl md:text-5xl font-extrabold font-display uppercase text-[#F1F0EC]">
                {nextProject.title}
              </h3>
            </div>

            <button
              onClick={() => onSelectNextProject(nextProject)}
              onMouseEnter={() => onCursorEnter('NEXT')}
              onMouseLeave={onCursorLeave}
              className="px-8 py-4 border border-[#258DFF] bg-[#258DFF] text-white font-mono font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors flex items-center space-x-3"
            >
              <span>NEXT PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Lightbox for Project Gallery */}
      {activeLightboxIndex !== null && (
        <ImageLightbox
          images={project.gallery}
          currentIndex={activeLightboxIndex}
          onClose={() => setActiveLightboxIndex(null)}
          onNavigate={(newIdx) => setActiveLightboxIndex(newIdx)}
        />
      )}
    </AnimatePresence>
  );
}

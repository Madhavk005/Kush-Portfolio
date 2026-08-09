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
        className="fixed inset-0 z-50 bg-[#000] text-[#F5F5F7] overflow-y-auto"
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-40 bg-[#000]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4 text-sm text-[#86868B]">
            <span>Project {project.number}</span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="hidden sm:inline text-white/80">{project.category.toLowerCase()}</span>
          </div>

          <button
            onClick={onClose}
            onMouseEnter={() => onCursorEnter('CLOSE')}
            onMouseLeave={onCursorLeave}
            className="px-4 py-2 text-sm text-[#F5F5F7] border border-white/15 hover:border-white/40 rounded-full transition-colors inline-flex items-center gap-2"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 space-y-16">
          {/* Title & Metadata Header */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-sm text-[#86868B]">
              <span>{project.subCategories.join(' · ').toLowerCase()}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold font-display tracking-tight text-[#F5F5F7] uppercase leading-[0.95]">
              {project.title}
            </h1>

            {/* Metadata Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10 text-sm">
              <div>
                <span className="text-[#86868B] block mb-1">Client</span>
                <span className="text-[#F5F5F7] font-semibold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#258DFF]" /> {project.client}
                </span>
              </div>
              <div>
                <span className="text-[#86868B] block mb-1">Location</span>
                <span className="text-[#F5F5F7] font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#258DFF]" /> {project.location}
                </span>
              </div>
              <div>
                <span className="text-[#86868B] block mb-1">Year</span>
                <span className="text-[#F5F5F7] font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#258DFF]" /> {project.year}
                </span>
              </div>
              <div>
                <span className="text-[#86868B] block mb-1">Role</span>
                <span className="text-[#F5F5F7] font-semibold flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#258DFF]" /> {project.role}
                </span>
              </div>
            </div>
          </div>

          {/* Hero Banner Image */}
          <div 
            onClick={() => setActiveLightboxIndex(0)}
            className="relative h-[60vh] md:h-[80vh] overflow-hidden rounded-2xl bg-[#0C0C0D] group cursor-pointer"
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
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 text-xs text-[#F5F5F7] flex items-center gap-1.5 pointer-events-none">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Expand</span>
            </div>
          </div>

          {/* Narrative Concept Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 py-8 border-y border-white/10">
            <div className="md:col-span-4 space-y-4">
              <span className="block text-sm text-[#86868B]">
                Story concept
              </span>
              <p className="text-xl md:text-2xl font-bold font-display text-[#F5F5F7] leading-snug">
                "{project.tagline}"
              </p>
            </div>

            <div className="md:col-span-8 space-y-6 text-sm md:text-base text-[#F5F5F7]/80 font-sans leading-relaxed">
              <p>{project.description}</p>

              {project.quote && (
                <div className="p-6 bg-[#1D1D1F] border-l-2 border-[#258DFF] font-mono text-xs text-[#258DFF] tracking-wide">
                  "{project.quote}"
                </div>
              )}
            </div>
          </div>

          {/* Image Gallery Stream */}
          <div className="space-y-8">
            <div className="flex justify-between items-center text-sm text-[#86868B]">
              <span className="text-[#F5F5F7]">Gallery sequence — {project.gallery.length} frames</span>
              <span>Click any frame to expand</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {project.gallery.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveLightboxIndex(idx)}
                  className="relative group h-[400px] md:h-[550px] overflow-hidden rounded-2xl bg-[#0C0C0D] cursor-pointer"
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
                    <span className="text-sm text-[#F5F5F7]">Frame #{idx + 1}</span>
                    <div className="flex items-center gap-2 text-xs text-white bg-black/60 px-3 py-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-[#258DFF]" />
                      <span>Fullscreen</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Project Footer CTA */}
          <div className="pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <span className="text-sm text-[#86868B] block mb-2">
                Next case study
              </span>
              <h3 className="text-3xl md:text-5xl font-extrabold font-display uppercase text-[#F5F5F7]">
                {nextProject.title}
              </h3>
            </div>

            <button
              onClick={() => onSelectNextProject(nextProject)}
              onMouseEnter={() => onCursorEnter('NEXT')}
              onMouseLeave={onCursorLeave}
              className="group/btn inline-flex items-center gap-3 text-sm font-medium tracking-widest uppercase text-[#F5F5F7] border-b border-white/30 pb-1.5 hover:text-[#258DFF] hover:border-[#258DFF] transition-colors duration-300"
            >
              <span>Next Project</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
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

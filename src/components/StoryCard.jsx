import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ProgressiveImage from './ProgressiveImage';

const EASE = [0.16, 1, 0.3, 1];

function updateSpotlight(e, frameEl) {
  if (!frameEl) return;
  const rect = frameEl.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  frameEl.style.setProperty('--sx', `${((x / rect.width) * 100).toFixed(1)}%`);
  frameEl.style.setProperty('--sy', `${((y / rect.height) * 100).toFixed(1)}%`);
  frameEl.style.setProperty('--tx', `${((x / rect.width - 0.5) * 14).toFixed(2)}px`);
  frameEl.style.setProperty('--ty', `${((y / rect.height - 0.5) * 10).toFixed(2)}px`);
}

export default function StoryCard({
  project,
  index = 0,
  layout = {},
  onSelect,
  onCursorEnter,
  onCursorLeave,
}) {
  const frameRef = useRef(null);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -8% 0px' }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
      transition={{ duration: 0.8, ease: EASE, delay: (index % 3) * 0.07 }}
      className={`relative group cursor-pointer ${layout.col || ''} ${layout.mt || ''}`}
      onClick={() => onSelect(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
      onMouseEnter={() => onCursorEnter('OPEN')}
      onMouseLeave={onCursorLeave}
      aria-label={`Open case study: ${project.title}`}
    >
      <div
        ref={frameRef}
        onMouseMove={(e) => updateSpotlight(e, frameRef.current)}
        className={`story-frame relative w-full overflow-hidden rounded-2xl bg-[#101012] content-visibility-auto ${layout.aspect || 'aspect-[4/3]'}`}
      >
        <ProgressiveImage
          src={project.heroImage}
          alt={project.title}
          priority={index === 0}
          className="story-img filter contrast-[1.05]"
          containerClassName="absolute inset-0"
        />

        {/* Cinematic vignette */}
        <div className="pointer-events-none absolute inset-0 z-[15] bg-gradient-to-t from-[#000]/90 via-[#000]/20 to-transparent group-hover:via-[#000]/5 transition-all duration-700" />

        <div className="pointer-events-none absolute top-5 left-5 right-5 z-20 flex items-center justify-between gap-3">
          <span className="text-sm text-[#F5F5F7]/60 font-medium tracking-wide lowercase">
            {project.category.toLowerCase()}
          </span>
          <span className="text-[11px] text-[#F5F5F7]/40 font-mono">
            {project.year}
          </span>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-5 md:p-7">
          <p className="mb-2 text-[13px] text-[#F5F5F7]/50">
            {project.location} · {project.gallery.length} frames
          </p>
          <div className="flex items-end justify-between gap-4">
            <h3 className="text-xl md:text-2xl xl:text-3xl font-extrabold font-display tracking-tight uppercase leading-[1.02] text-[#F5F5F7]">
              {project.title}
            </h3>
            <div
              className="hidden sm:inline-flex shrink-0 items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
            >
              <span className="text-[11px] font-medium tracking-widest uppercase text-[#F5F5F7]/90 border-b border-white/40 pb-0.5">
                Open Story
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#258DFF]" />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
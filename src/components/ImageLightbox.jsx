import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Camera, MapPin, Grid } from 'lucide-react';
import ProgressiveImage from './ProgressiveImage';
import useFocusTrap from '../hooks/useFocusTrap';

export default function ImageLightbox({ images, currentIndex, onClose, onNavigate }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const modalRef = useRef(null);
  useFocusTrap(currentIndex !== null, modalRef);

  // Reset zoom when navigating to another image
  useEffect(() => {
    setIsZoomed(false);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
      if (e.key === ' ') {
        e.preventDefault();
        setIsZoomed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [currentIndex, images.length, onClose, onNavigate]);

  if (currentIndex === null || !images || images.length === 0) return null;

  const getImgSrc = (item) => {
    if (typeof item === 'string') return item;
    return item?.heroImage || item?.image || item?.src || images[0];
  };

  const currentImage = getImgSrc(images[currentIndex]);

  return (
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        tabIndex={-1}
        className="fixed inset-0 z-50 bg-[#000]/98 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-6 select-none"
        role="dialog"
        aria-label="Image Fullscreen Lightbox"
      >
        {/* Top Header */}
        <div className="flex justify-between items-center z-20 text-sm text-[#86868B] border-b border-white/10 pb-3">
          <div className="flex items-center space-x-3">
            <Camera className="w-4 h-4 text-[#258DFF]" />
            <span className="font-semibold">
              Frame {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2 border border-white/10 hover:border-[#258DFF] text-white/70 hover:text-[#258DFF] transition-colors flex items-center gap-1.5"
              title="Toggle Detail Zoom [Space]"
            >
              {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              <span className="text-xs hidden md:inline">
                {isZoomed ? 'Reset' : 'Zoom'}
              </span>
            </button>

            <button
              onClick={() => setShowThumbnails(!showThumbnails)}
              className={`p-2 border transition-colors flex items-center gap-1.5 ${
                showThumbnails
                  ? 'border-[#258DFF] text-[#258DFF] bg-[#258DFF]/10'
                  : 'border-white/10 text-white/70 hover:border-[#258DFF] hover:text-[#258DFF]'
              }`}
              title="Toggle Thumbnails Track"
            >
              <Grid className="w-4 h-4" />
              <span className="text-xs hidden md:inline">Strip</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 border border-white/10 hover:border-[#258DFF] text-white/70 hover:text-[#258DFF] transition-colors flex items-center gap-2"
            >
              <span className="text-xs hidden sm:inline">Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Central Display */}
        <div className="relative flex-1 flex items-center justify-center my-2 overflow-hidden">
          {/* Navigation Arrows */}
          <button
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            aria-label="Previous Frame"
            className="absolute left-2 sm:left-4 z-30 p-3 border border-white/10 bg-black/60 text-white/80 hover:text-[#258DFF] hover:border-[#258DFF] backdrop-blur-md transition-all group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            aria-label="Next Frame"
            className="absolute right-2 sm:right-4 z-30 p-3 border border-white/10 bg-black/60 text-white/80 hover:text-[#258DFF] hover:border-[#258DFF] backdrop-blur-md transition-all group"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Image Viewport */}
          <div className="w-full h-full flex items-center justify-center p-2 overflow-auto">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: isZoomed ? 1.45 : 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`relative max-w-6xl max-h-[76vh] flex items-center justify-center transition-all cursor-${
                isZoomed ? 'zoom-out' : 'zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <ProgressiveImage
                src={currentImage}
                alt={`Khush Kapoor Frame ${currentIndex + 1}`}
                priority={true}
                objectFit="object-contain"
                containerClassName="max-w-full max-h-[74vh] border border-white/10 shadow-2xl"
              />
            </motion.div>
          </div>
        </div>

        {/* Thumbnail Navigation Strip */}
        {showThumbnails && (
          <div className="relative z-20 overflow-x-auto no-scrollbar py-2 border-t border-white/10">
            <div className="flex items-center space-x-2 min-w-max px-2">
              {images.map((item, idx) => {
                const isActive = idx === currentIndex;
                const thumbSrc = getImgSrc(item);
                return (
                  <button
                    key={idx}
                    onClick={() => onNavigate(idx)}
                    className={`relative w-16 h-12 border transition-all overflow-hidden ${
                      isActive
                        ? 'border-[#258DFF] opacity-100 scale-105 shadow-lg shadow-[#258DFF]/20'
                        : 'border-white/10 opacity-40 hover:opacity-90 hover:border-white/30'
                    }`}
                  >
                    <ProgressiveImage
                      src={thumbSrc}
                      alt={`Thumbnail ${idx + 1}`}
                      objectFit="object-cover"
                      containerClassName="w-full h-full"
                    />
                    <span className="absolute bottom-0.5 right-1 font-mono text-[8px] bg-black/80 px-1 text-white/80">
                      {idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Metadata Info */}
        <div className="flex justify-between items-center font-mono text-[10px] sm:text-xs text-[#86868B] pt-2 border-t border-white/10 z-20">
          <div className="flex items-center space-x-2 text-[#F5F5F7]/80">
            <MapPin className="w-3.5 h-3.5 text-[#258DFF]" />
            <span>JAIPUR, INDIA · 35MM EDITORIAL STILL</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline text-white/40">SPACE = ZOOM · ARROWS = NAV</span>
            <span className="text-[#258DFF] font-semibold">FRAME #{currentIndex + 1}</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

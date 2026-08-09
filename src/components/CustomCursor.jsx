import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor({ cursorState }) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // Check if touch device or prefers-reduced-motion
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || isReducedMotion) {
      setIsDisabled(true);
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isDisabled || !isVisible) return null;

  const { text = '', active = false } = cursorState || {};

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-[#F5F5F7] mix-blend-difference"
        animate={{
          x: position.x - (active ? 0 : 4),
          y: position.y - (active ? 0 : 4),
          width: active ? 0 : 8,
          height: active ? 0 : 8,
          opacity: active ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />

      {/* Outer Magnetic Interactive Circle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full flex items-center justify-center border border-white/30 bg-white/10 backdrop-blur-[2px] text-[10px] font-medium tracking-[0.15em] text-[#F5F5F7] uppercase"
        animate={{
          x: position.x - (active ? 40 : 18),
          y: position.y - (active ? 40 : 18),
          width: active ? 80 : 36,
          height: active ? 80 : 36,
          scale: active ? 1 : 0.6,
          borderColor: active ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.25)",
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.2 }}
      >
        {active && text && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-center px-1"
          >
            {text}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}

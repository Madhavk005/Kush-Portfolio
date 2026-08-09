import React, { useState } from 'react';
import { Camera } from 'lucide-react';

export default function ProgressiveImage({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  onClick,
  onMouseEnter,
  onMouseLeave,
  priority = false,
  objectFit = 'object-cover',
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#101012] ${containerClassName}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Skeleton Loading State */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#1D1D1F] z-10 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent animate-pulse" />
        </div>
      )}

      {/* Error Fallback State */}
      {hasError ? (
        <div className="w-full h-full min-h-[160px] bg-[#0E0E0E] border border-white/5 flex flex-col items-center justify-center p-6 text-center text-[#86868B]">
          <Camera className="w-6 h-6 mb-2 opacity-40 text-[#258DFF]" />
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-60">
            KHUSH KAPOOR ARCHIVE
          </span>
          <span className="font-mono text-[9px] text-white/30 mt-1">
            {alt || 'IMAGE FRAME'}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`${objectFit} w-full h-full transition-all duration-700 ease-out gpu-accel ${
            isLoaded ? 'opacity-100 scale-100 filter contrast-[1.04]' : 'opacity-0 scale-[1.03]'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
}

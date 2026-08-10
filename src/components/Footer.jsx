import React from 'react';
import { ArrowUp } from 'lucide-react';
import { scrollToId, scrollToTop } from '../lib/scroll';

export default function Footer({ onCursorEnter, onCursorLeave, onOpenContactModal }) {

  return (
    <footer className="bg-[#000] border-t border-white/5 py-16 px-6 md:px-12 text-sm text-[#86868B]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="space-y-4">
          <button
            onClick={scrollToTop}
            className="text-[#F5F5F7] font-display font-extrabold text-2xl tracking-tight uppercase hover:text-[#258DFF] transition-colors text-left block"
          >
            KHUSH KAPOOR
          </button>
          <p className="text-xs text-[#86868B] max-w-sm leading-relaxed">
            Photographer & Visual Storyteller based in Jaipur, India. Crafting cinematic portraits, fashion editorials, luxury products and brand campaigns.
          </p>
        </div>

        <div className="flex flex-wrap gap-8 text-sm text-[#F5F5F7]/80">
          <button onClick={() => scrollToId('work')} className="hover:text-[#258DFF] transition-colors">
            Work
          </button>
          <button onClick={() => scrollToId('about')} className="hover:text-[#258DFF] transition-colors">
            About
          </button>
          <button onClick={() => scrollToId('services')} className="hover:text-[#258DFF] transition-colors">
            Services
          </button>
          <button onClick={onOpenContactModal} className="hover:text-[#258DFF] transition-colors">
            Inquire
          </button>
        </div>

        <div className="flex flex-col items-start md:items-end space-y-4">
          <button
            onClick={scrollToTop}
            onMouseEnter={() => onCursorEnter("TOP")}
            onMouseLeave={onCursorLeave}
            className="inline-flex items-center gap-2 text-sm text-[#F5F5F7] border-b border-white/30 pb-1 hover:text-[#258DFF] hover:border-[#258DFF] transition-colors group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>

          <div className="text-xs text-right space-y-1">
            <p>© {new Date().getFullYear()} Khush Kapoor. All rights reserved.</p>
            <p className="text-[#86868B]/70">Jaipur, India · 26.91° N, 75.79° E</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

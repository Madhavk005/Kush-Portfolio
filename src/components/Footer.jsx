import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer({ onCursorEnter, onCursorLeave, onOpenContactModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] border-t border-white/10 py-16 px-6 md:px-12 text-xs font-mono text-[#666666]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="space-y-4">
          <button
            onClick={scrollToTop}
            className="text-[#F1F0EC] font-display font-extrabold text-2xl tracking-tight uppercase hover:text-[#00E5FF] transition-colors text-left block"
          >
            KHUSH KAPOOR
          </button>
          <p className="text-xs text-[#666666] max-w-sm leading-relaxed">
            Photographer & Visual Storyteller based in Jaipur, India. Crafting cinematic portraits, fashion editorials, luxury products and brand campaigns.
          </p>
        </div>

        <div className="flex flex-wrap gap-8 text-[#F1F0EC]/80">
          <button onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#00E5FF] transition-colors">
            WORK
          </button>
          <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#00E5FF] transition-colors">
            ABOUT
          </button>
          <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#00E5FF] transition-colors">
            SERVICES
          </button>
          <button onClick={onOpenContactModal} className="hover:text-[#00E5FF] transition-colors">
            INQUIRE
          </button>
        </div>

        <div className="flex flex-col items-start md:items-end space-y-4">
          <button
            onClick={scrollToTop}
            onMouseEnter={() => onCursorEnter("TOP")}
            onMouseLeave={onCursorLeave}
            className="p-3 border border-white/10 hover:border-[#00E5FF] hover:text-[#00E5FF] text-[#F1F0EC] transition-colors flex items-center gap-2 group"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>

          <div className="text-[10px] text-right space-y-1">
            <p>© {new Date().getFullYear()} KHUSH KAPOOR. ALL RIGHTS RESERVED.</p>
            <p className="text-[#00E5FF]">JAIPUR, INDIA · 26°55'N 75°47'E</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

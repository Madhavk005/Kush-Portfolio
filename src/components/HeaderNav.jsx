import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function HeaderNav({ activeSection, onCursorEnter, onCursorLeave, onOpenContactModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'work', label: 'WORK' },
    { id: 'about', label: 'ABOUT' },
    { id: 'services', label: 'SERVICES' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (id === 'contact') {
      onOpenContactModal();
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'py-4 bg-[#050505]/85 backdrop-blur-md border-b border-white/5' : 'py-6 md:py-8 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex flex-col text-left focus:outline-none"
            onMouseEnter={() => onCursorEnter('HOME')}
            onMouseLeave={onCursorLeave}
          >
            <span className="text-lg md:text-xl font-bold font-display tracking-tight text-[#F1F0EC] group-hover:text-[#00E5FF] transition-colors">
              KHUSH KAPOOR
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#666666] group-hover:text-[#F1F0EC] transition-colors">
              JAIPUR · INDIA
            </span>
          </button>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => onCursorEnter(item.id === 'contact' ? "LET'S GO" : 'OPEN')}
                  onMouseLeave={onCursorLeave}
                  className="relative py-1 text-xs font-mono tracking-widest uppercase transition-colors text-[#F1F0EC]/80 hover:text-[#00E5FF]"
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00E5FF]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}

            {/* CTA Button */}
            <button
              onClick={onOpenContactModal}
              onMouseEnter={() => onCursorEnter("LET'S GO")}
              onMouseLeave={onCursorLeave}
              className="ml-4 px-5 py-2.5 rounded-none border border-[#00E5FF]/40 bg-[#00E5FF]/5 hover:bg-[#00E5FF] hover:text-black text-xs font-mono tracking-widest text-[#00E5FF] transition-all duration-300 flex items-center gap-2 group"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#F1F0EC] hover:text-[#00E5FF] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            <div className="flex flex-col space-y-6">
              <span className="text-xs font-mono tracking-widest text-[#00E5FF]">NAVIGATION</span>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-3xl font-display font-extrabold text-[#F1F0EC] hover:text-[#00E5FF] transition-colors py-2 flex items-center justify-between border-b border-white/5"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-6 h-6 text-[#666666]" />
                </button>
              ))}
            </div>

            <div className="space-y-4 pt-8">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContactModal();
                }}
                className="w-full py-4 bg-[#00E5FF] text-black font-mono font-bold text-xs tracking-widest text-center"
              >
                START A PROJECT →
              </button>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#666666]">
                <span>PHOTOGRAPHER · JAIPUR</span>
                <span>© 2026 KHUSH KAPOOR</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

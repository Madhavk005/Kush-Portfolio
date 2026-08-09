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
          scrolled ? 'py-3 bg-[#000]/80 backdrop-blur-2xl border-b border-white/5' : 'py-6 md:py-8 bg-transparent'
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
            <span className="text-lg md:text-xl font-bold font-display tracking-tight text-[#F5F5F7] group-hover:text-[#258DFF] transition-colors">
              KHUSH KAPOOR
            </span>
            <span className="text-[10px] text-[#86868B] group-hover:text-[#F5F5F7] transition-colors">
              Jaipur · India
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
                  className="relative py-1 text-[13px] font-medium tracking-wide uppercase transition-colors text-[#86868B] hover:text-[#F5F5F7]"
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-px bg-[#F5F5F7]"
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
              className="ml-5 text-sm font-medium tracking-widest uppercase text-[#F5F5F7] border-b border-[#258DFF]/60 pb-1 hover:text-[#258DFF] hover:border-[#258DFF] transition-colors duration-300 flex items-center gap-2 group"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#F5F5F7] hover:text-[#258DFF] focus:outline-none"
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
            className="fixed inset-0 z-30 bg-[#000]/95 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            <div className="flex flex-col space-y-6">
              <span className="text-sm text-[#86868B]">Navigation</span>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-3xl font-display font-extrabold text-[#F5F5F7] hover:text-[#258DFF] transition-colors py-2 flex items-center justify-between border-b border-white/5"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-6 h-6 text-[#86868B]" />
                </button>
              ))}
            </div>

            <div className="space-y-4 pt-8">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContactModal();
                }}
                className="w-full py-4 rounded-full bg-[#258DFF] text-[#000] font-mono font-semibold text-xs tracking-widest text-center"
              >
                START A PROJECT →
              </button>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#86868B]">
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

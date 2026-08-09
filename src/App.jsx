import React, { useState, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import Lenis from 'lenis';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import HeaderNav from './components/HeaderNav';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import FeaturedWork from './components/FeaturedWork';
import ProjectModal from './components/ProjectModal';
import CinematicExperience from './components/CinematicExperience';
import Services from './components/Services';
import WhyKhush from './components/WhyKhush';
import AboutKhush from './components/AboutKhush';
import VisualStatement from './components/VisualStatement';
import SocialSection from './components/SocialSection';
import ContactSection from './components/ContactSection';
import InquiryModal from './components/InquiryModal';
import NotFound from './components/NotFound';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [cursorState, setCursorState] = useState({ active: false, text: '' });
  const [is404, setIs404] = useState(false);

  // Initialize Ultra-Smooth Scroll (Lenis) with mobile touch support & reduced motion bypass
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1.0,
    });

    let animationFrameId;

    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  // Intersection Observer for Active Section Navigation Highlight
  useEffect(() => {
    const sections = ['hero', 'work', 'about', 'services', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCursorEnter = (text = 'VIEW') => {
    setCursorState({ active: true, text });
  };

  const handleCursorLeave = () => {
    setCursorState({ active: false, text: '' });
  };

  // Hash-based 404: unknown hash (dead link) -> NotFound screen
  useEffect(() => {
    const VALID_HASHES = new Set(['', '#hero', '#work', '#about', '#about-intro', '#services', '#contact', '#archive']);
    const onHashChange = () => {
      const h = window.location.hash;
      setIs404(h !== '' && !VALID_HASHES.has(h));
    };
    window.addEventListener('hashchange', onHashChange);
    onHashChange();
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (is404) {
    return <NotFound onReturnHome={() => setIs404(false)} />;
  }

  return (
    <MotionConfig reducedMotion="user">
    <div className="bg-[#050505] text-[#F1F0EC] min-h-screen relative font-sans selection:bg-[#258DFF] selection:text-black overflow-x-hidden gpu-accel">
      {/* Cinematic Loading Screen */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Custom Interactive Magnet Cursor */}
      <CustomCursor cursorState={cursorState} />

      {/* Sticky Header Navigation */}
      <HeaderNav
        activeSection={activeSection}
        onCursorEnter={handleCursorEnter}
        onCursorLeave={handleCursorLeave}
        onOpenContactModal={() => setIsInquiryOpen(true)}
      />

      {/* Main Page Sections */}
      <main className="relative z-10">
        <Hero
          onCursorEnter={handleCursorEnter}
          onCursorLeave={handleCursorLeave}
        />

        <Introduction
          onCursorEnter={handleCursorEnter}
          onCursorLeave={handleCursorLeave}
        />

        <FeaturedWork
          onSelectProject={(proj) => setSelectedProject(proj)}
          onCursorEnter={handleCursorEnter}
          onCursorLeave={handleCursorLeave}
        />

        <CinematicExperience
          onCursorEnter={handleCursorEnter}
          onCursorLeave={handleCursorLeave}
        />

        <Services
          onOpenContactModal={() => setIsInquiryOpen(true)}
          onCursorEnter={handleCursorEnter}
          onCursorLeave={handleCursorLeave}
        />

        <WhyKhush />

        <AboutKhush
          onCursorEnter={handleCursorEnter}
          onCursorLeave={handleCursorLeave}
        />

        <VisualStatement />

        <SocialSection
          onCursorEnter={handleCursorEnter}
          onCursorLeave={handleCursorLeave}
        />

        <ContactSection
          onOpenContactModal={() => setIsInquiryOpen(true)}
          onCursorEnter={handleCursorEnter}
          onCursorLeave={handleCursorLeave}
        />
      </main>

      {/* Footer */}
      <Footer
        onCursorEnter={handleCursorEnter}
        onCursorLeave={handleCursorLeave}
        onOpenContactModal={() => setIsInquiryOpen(true)}
      />

      {/* Project Case Study Fullscreen Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectNextProject={(nextProj) => setSelectedProject(nextProj)}
          onCursorEnter={handleCursorEnter}
          onCursorLeave={handleCursorLeave}
        />
      )}

      {/* Inquiry Form Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        onCursorEnter={handleCursorEnter}
        onCursorLeave={handleCursorLeave}
      />
    </div>
    </MotionConfig>
  );
}

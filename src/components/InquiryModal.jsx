import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Send, AlertCircle } from 'lucide-react';
import useFocusTrap from '../hooks/useFocusTrap';

export default function InquiryModal({ isOpen, onClose, onCursorEnter, onCursorLeave }) {
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brand: '',
    serviceType: 'Portrait Photography',
    description: '',
    budget: '$1,000 - $3,000'
  });
  const modalRef = useRef(null);
  useFocusTrap(isOpen, modalRef);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.description.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    // Compose the inquiry and deliver it via WhatsApp (opens WhatsApp with the prefilled message)
    const message = [
      `NEW PROJECT INQUIRY — khushkapoor.com`,
      ``,
      `NAME: ${formData.name}`,
      `EMAIL: ${formData.email}`,
      formData.brand ? `BRAND: ${formData.brand}` : null,
      `PROJECT TYPE: ${formData.serviceType}`,
      `BUDGET: ${formData.budget}`,
      ``,
      `PROJECT DETAILS:`,
      formData.description,
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappUrl = `https://wa.me/918000704738?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
  };

  const projectTypes = [
    "Portrait Photography",
    "Fashion & Editorial",
    "Brand Campaign",
    "Event Coverage",
    "Product Photography",
    "Social Media Content",
    "Cinematic Visuals",
    "Other"
  ];

  const budgetRanges = [
    "< $1,000",
    "$1,000 - $3,000",
    "$3,000 - $5,000",
    "$5,000+"
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#000]/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-y-auto"
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        <div ref={modalRef} className="relative w-full max-w-3xl bg-[#1D1D1F] border border-white/10 p-6 md:p-12 my-auto" tabIndex={-1}>
          {/* Header */}
          <div className="flex justify-between items-center pb-6 border-b border-white/10">
            <div>
              <span className="block text-sm text-[#86868B]">
                Project inquiry
              </span>
              <h3 id="modal-title" className="text-2xl md:text-4xl font-extrabold font-display uppercase text-[#F5F5F7]">
                LET'S CREATE
              </h3>
            </div>

            <button
              onClick={onClose}
              onMouseEnter={() => onCursorEnter("CLOSE")}
              onMouseLeave={onCursorLeave}
              aria-label="Close inquiry form"
              className="p-2 border border-white/10 hover:border-[#258DFF] text-white/60 hover:text-[#258DFF] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="py-6 space-y-6 text-sm">
              {errorMsg && (
                <div className="p-4 border border-red-500/50 bg-red-500/10 text-red-400 flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="inquiry-name" className="text-[#86868B] block text-xs">
                    Your name *
                  </label>
                  <input
                    id="inquiry-name"
                    type="text"
                    required
                    placeholder="e.g. Maya Lin"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1D1D1F] border border-white/10 rounded-xl px-4 py-3 text-[#F5F5F7] focus:border-[#258DFF] focus:outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="inquiry-email" className="text-[#86868B] block text-xs">
                    Email address *
                  </label>
                  <input
                    id="inquiry-email"
                    type="email"
                    required
                    placeholder="maya@brand.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#1D1D1F] border border-white/10 rounded-xl px-4 py-3 text-[#F5F5F7] focus:border-[#258DFF] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Brand/Company */}
              <div className="space-y-2">
                <label htmlFor="inquiry-brand" className="text-[#86868B] block text-xs">
                    Brand / company (optional)
                </label>
                <input
                  id="inquiry-brand"
                  type="text"
                  placeholder="e.g. Aura Couture / Independent"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full bg-[#1D1D1F] border border-white/10 rounded-xl px-4 py-3 text-[#F5F5F7] focus:border-[#258DFF] focus:outline-none transition-colors"
                />
              </div>

              {/* Project Type */}
              <div className="space-y-2">
                <label htmlFor="inquiry-service" className="text-[#86868B] block text-xs">
                    What are you looking for? *
                </label>
                <select
                  id="inquiry-service"
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full bg-[#1D1D1F] border border-white/10 rounded-xl px-4 py-3 text-[#F5F5F7] focus:border-[#258DFF] focus:outline-none transition-colors"
                >
                  {projectTypes.map((t) => (
                    <option key={t} value={t} className="bg-[#000] text-[#F5F5F7]">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="inquiry-desc" className="text-[#86868B] block text-xs">
                    Tell me about the project *
                </label>
                <textarea
                  id="inquiry-desc"
                  required
                  rows={4}
                  placeholder="Describe your vision, shoot dates, location, deliverables or story concept..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#1D1D1F] border border-white/10 rounded-xl px-4 py-3 text-[#F5F5F7] focus:border-[#258DFF] focus:outline-none transition-colors"
                />
              </div>

              {/* Budget Range */}
              <div className="space-y-2">
                <span className="text-[#86868B] block text-xs">Estimated budget range</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  {budgetRanges.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setFormData({ ...formData, budget: b })}
                      className={`py-2.5 px-3 text-center border text-[11px] transition-colors ${
                        formData.budget === b
                          ? 'border-[#258DFF] bg-[#258DFF] text-black font-bold'
                          : 'border-white/10 bg-[#1D1D1F] text-[#F5F5F7]/70 hover:border-[#258DFF]/50'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  onMouseEnter={() => onCursorEnter("SEND")}
                  onMouseLeave={onCursorLeave}
                  className="w-full py-4 rounded-full bg-[#258DFF] text-[#000] font-semibold text-xs tracking-widest uppercase hover:bg-[#F5F5F7] transition-colors flex items-center justify-center gap-3"
                >
                  <Send className="w-4 h-4" />
                  <span>SEND VIA WHATSAPP →</span>
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-[#258DFF]/20 text-[#258DFF] flex items-center justify-center mx-auto border border-[#258DFF]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="text-3xl md:text-4xl font-extrabold font-display uppercase text-[#F5F5F7]">
                MESSAGE RECEIVED.
              </h4>

              <p className="text-sm text-[#258DFF] max-w-md mx-auto">
                Let's create something worth remembering.
              </p>

              <p className="text-sm text-[#86868B] max-w-sm mx-auto leading-relaxed">
                Your inquiry just opened in WhatsApp with all the details prefilled. Didn't open? Email it directly to{' '}
                <a href="mailto:khush@khushkapoor.com" className="text-[#F5F5F7] underline hover:text-[#258DFF] transition-colors">khush@khushkapoor.com</a>
                {' '}and Khush will get back within 24 hours.
              </p>

              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-6 text-sm font-medium tracking-widest uppercase text-[#F5F5F7] border-b border-white/30 pb-1 hover:text-[#258DFF] hover:border-[#258DFF] transition-colors duration-300"
              >
                Return to website
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

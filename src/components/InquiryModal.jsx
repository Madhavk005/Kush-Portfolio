import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Send, AlertCircle, Loader2 } from 'lucide-react';

export default function InquiryModal({ isOpen, onClose, onCursorEnter, onCursorLeave }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brand: '',
    serviceType: 'Portrait Photography',
    description: '',
    budget: '$1,000 - $3,000'
  });

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

    setLoading(true);

    // Simulate reliable async delivery submit
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
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
        className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-y-auto"
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        <div className="relative w-full max-w-3xl bg-[#0B0B0B] border border-white/10 p-6 md:p-12 my-auto">
          {/* Header */}
          <div className="flex justify-between items-center pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest block">
                — PROJECT INQUIRY FORM
              </span>
              <h3 id="modal-title" className="text-2xl md:text-4xl font-extrabold font-display uppercase text-[#F1F0EC]">
                LET'S CREATE
              </h3>
            </div>

            <button
              onClick={onClose}
              onMouseEnter={() => onCursorEnter("CLOSE")}
              onMouseLeave={onCursorLeave}
              aria-label="Close inquiry form"
              className="p-2 border border-white/10 hover:border-[#00E5FF] text-white/60 hover:text-[#00E5FF] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="py-6 space-y-6 text-xs font-mono">
              {errorMsg && (
                <div className="p-4 border border-red-500/50 bg-red-500/10 text-red-400 flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="inquiry-name" className="text-[#666666] uppercase block">
                    YOUR NAME *
                  </label>
                  <input
                    id="inquiry-name"
                    type="text"
                    required
                    placeholder="e.g. Maya Lin"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-[#F1F0EC] focus:border-[#00E5FF] focus:outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="inquiry-email" className="text-[#666666] uppercase block">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    id="inquiry-email"
                    type="email"
                    required
                    placeholder="maya@brand.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-[#F1F0EC] focus:border-[#00E5FF] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Brand/Company */}
              <div className="space-y-2">
                <label htmlFor="inquiry-brand" className="text-[#666666] uppercase block">
                  BRAND / COMPANY (OPTIONAL)
                </label>
                <input
                  id="inquiry-brand"
                  type="text"
                  placeholder="e.g. Aura Couture / Independent"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-[#F1F0EC] focus:border-[#00E5FF] focus:outline-none transition-colors"
                />
              </div>

              {/* Project Type */}
              <div className="space-y-2">
                <label htmlFor="inquiry-service" className="text-[#666666] uppercase block">
                  WHAT ARE YOU LOOKING FOR? *
                </label>
                <select
                  id="inquiry-service"
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-[#F1F0EC] focus:border-[#00E5FF] focus:outline-none transition-colors"
                >
                  {projectTypes.map((t) => (
                    <option key={t} value={t} className="bg-[#050505] text-[#F1F0EC]">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="inquiry-desc" className="text-[#666666] uppercase block">
                  TELL ME ABOUT THE PROJECT *
                </label>
                <textarea
                  id="inquiry-desc"
                  required
                  rows={4}
                  placeholder="Describe your vision, shoot dates, location, deliverables or story concept..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-[#F1F0EC] focus:border-[#00E5FF] focus:outline-none transition-colors"
                />
              </div>

              {/* Budget Range */}
              <div className="space-y-2">
                <span className="text-[#666666] uppercase block">ESTIMATED BUDGET RANGE</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  {budgetRanges.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setFormData({ ...formData, budget: b })}
                      className={`py-2.5 px-3 text-center border text-[11px] transition-colors ${
                        formData.budget === b
                          ? 'border-[#00E5FF] bg-[#00E5FF] text-black font-bold'
                          : 'border-white/10 bg-[#121212] text-[#F1F0EC]/70 hover:border-[#00E5FF]/50'
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
                  disabled={loading}
                  onMouseEnter={() => onCursorEnter("SEND")}
                  onMouseLeave={onCursorLeave}
                  className="w-full py-4 bg-[#00E5FF] text-black font-bold text-xs tracking-widest uppercase hover:bg-white transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>SENDING INQUIRY...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>SEND THE IDEA →</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] flex items-center justify-center mx-auto border border-[#00E5FF]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="text-3xl md:text-4xl font-extrabold font-display uppercase text-[#F1F0EC]">
                MESSAGE RECEIVED.
              </h4>

              <p className="text-sm text-[#00E5FF] font-mono tracking-widest uppercase max-w-md mx-auto">
                LET'S CREATE SOMETHING WORTH REMEMBERING.
              </p>

              <p className="text-xs text-[#666666] font-mono max-w-sm mx-auto leading-relaxed">
                Khush will review your project details and get back to you at <span className="text-[#F1F0EC]">{formData.email}</span> within 24 hours.
              </p>

              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-6 px-6 py-3 border border-white/10 text-xs font-mono text-[#F1F0EC] hover:border-[#00E5FF] hover:text-[#00E5FF] transition-colors"
              >
                RETURN TO WEBSITE
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

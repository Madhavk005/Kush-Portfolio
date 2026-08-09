import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, MapPin, PhoneCall } from 'lucide-react';

export default function ContactSection({ onOpenContactModal, onCursorEnter, onCursorLeave }) {
  return (
    <section id="contact" className="py-24 md:py-36 bg-[#000] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kicker mb-8"
        >
          Let's make something
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Huge Typography & Call to Action */}
          <div className="lg:col-span-8 space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold font-display uppercase tracking-tight text-[#F5F5F7] leading-[0.9]"
            >
              HAVE A PROJECT <br />
              IN MIND? <br />
              <span className="text-[#258DFF]">LET'S TALK.</span>
            </motion.h2>

            <p className="text-lg md:text-xl text-[#F5F5F7]/80 font-light max-w-xl leading-relaxed">
              Available for commercial assignments, fashion editorials, portrait sessions and creative direction globally and across India.
            </p>

            <div className="pt-4">
              <button
                onClick={onOpenContactModal}
                onMouseEnter={() => onCursorEnter("LET'S GO")}
                onMouseLeave={onCursorLeave}
                className="px-8 py-4 rounded-full bg-[#258DFF] text-[#000] font-semibold text-sm hover:bg-[#F5F5F7] transition-all duration-300"
              >
                Start a project
              </button>
            </div>
          </div>

          {/* Direct Details Box */}
          <div className="lg:col-span-4 space-y-8">
            <span className="block text-sm text-[#86868B] border-b border-white/10 pb-4">
              Direct contact
            </span>

            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[#86868B] text-xs block">Email</span>
                <a
                  href="mailto:khush@khushkapoor.com"
                  className="text-[#F5F5F7] text-sm font-semibold hover:text-[#258DFF] transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-[#258DFF]" />
                  <span>khush@khushkapoor.com</span>
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-[#86868B] text-xs block">Location</span>
                <div className="text-[#F5F5F7] text-sm font-semibold flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#258DFF]" />
                  <span>Jaipur, Rajasthan, India</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[#86868B] text-xs block">Instagram</span>
                <a
                  href="https://www.instagram.com/keto.k0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F5F5F7] text-sm font-semibold hover:text-[#258DFF] transition-colors flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4 text-[#258DFF]" />
                  <span>@keto.k0</span>
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-[#86868B] text-xs block">WhatsApp / Phone</span>
                <a
                  href="https://wa.me/918000704738"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F5F5F7] text-sm font-semibold hover:text-[#258DFF] transition-colors flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-[#258DFF]" />
                  <span>+91 80007 04738</span>
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-[#86868B]">
              <span>Response within 24 hours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, MapPin, PhoneCall, ArrowUpRight } from 'lucide-react';

export default function ContactSection({ onOpenContactModal, onCursorEnter, onCursorLeave }) {
  return (
    <section id="contact" className="py-24 md:py-36 bg-[#050505] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center space-x-3 text-xs font-mono tracking-widest text-[#258DFF] uppercase mb-8"
        >
          <span className="w-8 h-[1px] bg-[#258DFF]" />
          <span>— LET'S MAKE SOMETHING</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Huge Typography & Call to Action */}
          <div className="lg:col-span-8 space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold font-display uppercase tracking-tight text-[#F1F0EC] leading-[0.9]"
            >
              HAVE A PROJECT <br />
              IN MIND? <br />
              <span className="text-[#258DFF]">LET'S TALK.</span>
            </motion.h2>

            <p className="text-lg md:text-xl text-[#F1F0EC]/80 font-light max-w-xl leading-relaxed">
              Available for commercial assignments, fashion editorials, portrait sessions and creative direction globally and across India.
            </p>

            <div className="pt-4">
              <button
                onClick={onOpenContactModal}
                onMouseEnter={() => onCursorEnter("LET'S GO")}
                onMouseLeave={onCursorLeave}
                className="px-8 py-5 border-2 border-[#258DFF] bg-[#258DFF] text-black font-mono font-bold text-xs md:text-sm tracking-widest uppercase hover:bg-transparent hover:text-[#258DFF] transition-all duration-300 flex items-center gap-4 group"
              >
                <span>START A PROJECT →</span>
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </div>

          {/* Direct Details Box */}
          <div className="lg:col-span-4 space-y-8 p-8 border border-white/10 bg-[#0B0B0B]">
            <span className="text-xs font-mono text-[#258DFF] uppercase tracking-widest block border-b border-white/10 pb-4">
              DIRECT INQUIRIES
            </span>

            <div className="space-y-6 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-[#666666] block">EMAIL</span>
                <a
                  href="mailto:khush@khushkapoor.com"
                  className="text-[#F1F0EC] text-sm font-semibold hover:text-[#258DFF] transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-[#258DFF]" />
                  <span>khush@khushkapoor.com</span>
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-[#666666] block">LOCATION</span>
                <div className="text-[#F1F0EC] text-sm font-semibold flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#258DFF]" />
                  <span>Jaipur, Rajasthan, India</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[#666666] block">INSTAGRAM</span>
                <a
                  href="https://www.instagram.com/keto.k0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F1F0EC] text-sm font-semibold hover:text-[#258DFF] transition-colors flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4 text-[#258DFF]" />
                  <span>@keto.k0</span>
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-[#666666] block">WHATSAPP / PHONE</span>
                <a
                  href="https://wa.me/918000704738"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F1F0EC] text-sm font-semibold hover:text-[#258DFF] transition-colors flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-[#258DFF]" />
                  <span>+91 80007 04738</span>
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-[10px] font-mono text-[#666666]">
              <span>RESPONSE TIME: WITHIN 24 HOURS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

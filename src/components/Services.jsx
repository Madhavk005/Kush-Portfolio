import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SERVICES_DATA } from '../data/portfolioData';

export default function Services({ onOpenContactModal, onCursorEnter, onCursorLeave }) {
  const [activeService, setActiveService] = useState(0);

  return (
    <section id="services" className="py-24 md:py-36 bg-[#050505] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3 text-xs font-mono tracking-widest text-[#00E5FF] uppercase mb-4"
            >
              <span className="w-8 h-[1px] bg-[#00E5FF]" />
              <span>— 03 / WHAT I DO</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-[#F1F0EC] uppercase leading-[0.95]"
            >
              YOUR IDEA. <br />
              <span className="text-[#00E5FF]">MY CAMERA.</span>
            </motion.h2>
          </div>

          <button
            onClick={onOpenContactModal}
            onMouseEnter={() => onCursorEnter("LET'S GO")}
            onMouseLeave={onCursorLeave}
            className="px-6 py-3 border border-[#00E5FF]/40 bg-[#00E5FF]/5 hover:bg-[#00E5FF] hover:text-black text-xs font-mono tracking-widest text-[#00E5FF] transition-all duration-300 self-start md:self-auto flex items-center gap-2 group"
          >
            <span>BOOK A SERVICES SHOOT</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Interactive Services List + Live Image Preview Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Services Rows */}
          <div className="lg:col-span-7 divide-y divide-white/10 border-y border-white/10">
            {SERVICES_DATA.map((service, idx) => {
              const isOpen = activeService === idx;

              return (
                <div
                  key={service.number}
                  className="group py-6 md:py-8 cursor-pointer transition-colors"
                  onClick={() => setActiveService(isOpen ? null : idx)}
                  onMouseEnter={() => {
                    setActiveService(idx);
                    onCursorEnter("VIEW");
                  }}
                  onMouseLeave={onCursorLeave}
                >
                  {/* Row Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <span className="text-xs font-mono text-[#00E5FF] font-semibold">{service.number}</span>
                      <h3 className={`text-xl md:text-3xl font-extrabold font-display uppercase transition-colors ${
                        isOpen ? 'text-[#00E5FF]' : 'text-[#F1F0EC] group-hover:text-[#00E5FF]'
                      }`}>
                        {service.title}
                      </h3>
                    </div>

                    <div className={`p-2 rounded-full border transition-all ${
                      isOpen ? 'border-[#00E5FF] bg-[#00E5FF] text-black' : 'border-white/10 text-white/60 group-hover:border-[#00E5FF]'
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Accordion Expand Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden pt-6 space-y-4"
                      >
                        <p className="text-sm md:text-base text-[#F1F0EC]/80 font-light leading-relaxed">
                          {service.description}
                        </p>

                        <div className="pt-2">
                          <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase block mb-3">
                            DELIVERABLES & SCOPE:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {service.deliverables.map((item, i) => (
                              <div key={i} className="flex items-center space-x-2 text-xs font-mono text-[#666666]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF]" />
                                <span className="text-[#F1F0EC]">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Sticky Right Preview Photograph */}
          <div className="lg:col-span-5 hidden lg:block sticky top-32">
            <div className="relative h-[550px] w-full border border-white/10 overflow-hidden bg-[#0B0B0B]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeService}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  src={SERVICES_DATA[activeService !== null ? activeService : 0].image}
                  alt={SERVICES_DATA[activeService !== null ? activeService : 0].title}
                  className="w-full h-full object-cover filter contrast-[1.1] brightness-90"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
              
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-xs font-mono">
                <div>
                  <span className="text-[#00E5FF]">SERVICE PREVIEW</span>
                  <p className="text-[#F1F0EC] font-bold text-sm">
                    {SERVICES_DATA[activeService !== null ? activeService : 0].title}
                  </p>
                </div>
                <span className="text-white/60">KHUSH KAPOOR STUDIO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

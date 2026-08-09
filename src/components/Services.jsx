import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SERVICES_DATA } from '../data/portfolioData';

export default function Services({ onOpenContactModal, onCursorEnter, onCursorLeave }) {
  const [activeService, setActiveService] = useState(0);

  return (
    <section id="services" className="py-24 md:py-36 bg-[#000] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="kicker mb-4"
            >
              What I do
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-[#F5F5F7] uppercase leading-[0.95]"
            >
              YOUR IDEA. <br />
              <span className="text-[#258DFF]">MY CAMERA.</span>
            </motion.h2>
          </div>

          <button
            onClick={onOpenContactModal}
            onMouseEnter={() => onCursorEnter("LET'S GO")}
            onMouseLeave={onCursorLeave}
            className="group/btn text-sm font-medium tracking-widest uppercase text-[#F5F5F7] border-b border-white/30 pb-1.5 self-start md:self-auto w-fit hover:text-[#258DFF] hover:border-[#258DFF] transition-colors duration-300 flex items-center gap-2"
          >
            <span>Book a shoot</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
        </div>

        {/* Interactive Services List + Live Image Preview Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Services Rows */}
          <div className="lg:col-span-7 divide-y divide-white/5">
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
                    <div className="flex items-center gap-6">
                      <span className="text-sm text-[#86868B]">{service.number}</span>
                      <h3 className={`text-xl md:text-3xl font-extrabold font-display uppercase transition-colors ${
                        isOpen ? 'text-[#258DFF]' : 'text-[#F5F5F7] group-hover:text-[#258DFF]'
                      }`}>
                        {service.title}
                      </h3>
                    </div>

                    <div className={`transition-all duration-300 ${
                      isOpen ? 'text-[#258DFF]' : 'text-white/40 group-hover:text-white/80'
                    }`}>
                      {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
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
                        <p className="text-sm md:text-base text-[#F5F5F7]/80 font-light leading-relaxed">
                          {service.description}
                        </p>

                        <div className="pt-2">
                          <span className="block text-sm text-[#86868B] mb-3">
                            Deliverables
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {service.deliverables.map((item, i) => (
                              <div key={i} className="flex items-center space-x-2 text-sm text-[#86868B]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#258DFF]" />
                                <span className="text-[#F5F5F7]">{item}</span>
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
            <div className="relative h-[550px] w-full rounded-2xl overflow-hidden bg-[#1D1D1F]">
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
              
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <span className="text-[#86868B] text-sm">Service preview</span>
                  <p className="text-[#F5F5F7] font-bold text-lg">
                    {SERVICES_DATA[activeService !== null ? activeService : 0].title}
                  </p>
                </div>
                <span className="text-white/60 text-sm">Khush Kapoor Studio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

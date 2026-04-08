import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { OTHER_PAGE_IMAGES } from '../../common/data';

export default function InsightsHero() {
  return (
    <section className="relative w-full py-16 md:py-24 flex items-center overflow-hidden bg-[#1a1a1a] min-h-[400px] md:min-h-[500px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={OTHER_PAGE_IMAGES.insightsHero}
          alt="Desk Background" 
          className="w-full h-full object-cover object-center md:object-right opacity-40 md:opacity-60"
        />
        {/* Responsive Overlay: Darkness increases on mobile to ensure readability since text is centered over the image */}
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#111] via-[#111]/90 md:via-[#111]/80 to-transparent md:to-[#111]/20"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 relative z-10">
        {/* Centered on mobile, left-aligned on desktop */}
        <div className="w-full max-w-2xl text-center md:text-left flex flex-col items-center md:items-start">
          <motion.h2 
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal text-white leading-[1.2] md:leading-[1.1] tracking-tight mb-2 font-inter"
          >
            Wysele Insights:<br />
            Fueling Innovation
          </motion.h2>

          {/* Yellow divider line */}
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
            className="h-[3px] bg-[#eab308] mt-3 mb-4"
          />

          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-gray-200 text-base md:text-lg font-light leading-relaxed max-w-xl mb-10"
          >
            Explore real-world strategies, expert perspectives, and digital breakthroughs designed to shape the future of your enterprise.
          </motion.p>

          <motion.button 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="group inline-flex items-center gap-2 bg-transparent hover:bg-[#C9184A] text-white px-5 py-2.5 border border-[#C9184A] rounded-[6px] text-sm font-normal transition-all duration-300"
          >
            Latest News
            <ArrowUpRight size={18} strokeWidth={1.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

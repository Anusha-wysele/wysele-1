import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { OTHER_PAGE_IMAGES } from '../../common/data';

export default function InsightsHero() {
  return (
    <section className="relative w-full py-20 flex items-center overflow-hidden bg-[#1a1a1a]">
      {/* Background Image - We use an object-cover image placed to the right or full width with an overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={OTHER_PAGE_IMAGES.insightsHero}
          alt="Desk Background" 
          className="w-full h-full object-cover object-right opacity-60"
        />
        {/* Gradient overlay to ensure text readability on the left side */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#111]/80 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 relative z-10 flex">
        {/* Left Content */}
        <div className="w-full max-w-2xl text-left">
          <motion.h2 
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-[54px] font-normal text-white leading-[1.1] tracking-tight mb-2 font-inter"
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
            className="text-gray-200 text-lg md:text-[17px] font-light leading-relaxed max-w-xl mb-10"
          >
            Explore real-world strategies, expert perspectives, and digital breakthroughs designed to shape the future of your enterprise.
          </motion.p>

          <motion.button 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="group inline-flex items-center gap-2 bg-transparent hover:bg-white/10 text-white px-5 py-2.5 border border-white/50 rounded-[6px] text-sm font-normal transition-all duration-300"
          >
            Latest News
            <ArrowUpRight size={18} strokeWidth={1.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

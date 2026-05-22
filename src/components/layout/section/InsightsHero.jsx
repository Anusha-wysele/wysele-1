import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { OTHER_PAGE_IMAGES } from '../../common/data';
import Cylinders from '../../common/Cylinders';
import Button from '../../common/Button';

export default function InsightsHero() {
  const navigate = useNavigate();
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
        <Cylinders />
      </div>

      <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto w-full px-6 lg:px-12 relative z-10">
        {/* Centered on mobile, left-aligned on desktop */}
        <div className="w-full max-w-2xl text-center md:text-left flex flex-col items-center md:items-start">
          {/* Top Tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-1 bg-[#FFD700]" />
            <span className="text-white text-[10px] font-bold tracking-[0.3em] uppercase">Enterprise Perspectives</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-[2.6rem] font-medium text-white leading-[1.1] tracking-tight mb-8 font-inter"
          >
            Wysele Insights:<br />
            Fueling Innovation
          </motion.h2>



          {/* Description with Accent Line */}
          <div className="flex gap-5 mb-10 text-left">
            <div className="w-[1px] bg-[#FFD700] shrink-0" />
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-gray-200 text-base md:text-lg font-light leading-relaxed max-w-xl"
            >
              Explore real-world strategies, expert perspectives, and digital breakthroughs designed to shape the future of your enterprise.
            </motion.p>
          </div>

          <Button 
            text="Latest News"
            onClick={() => navigate('/blogs')}
            icon={<ArrowUpRight size={16} />}
          />
        </div>
      </div>
    </section>
  );
}

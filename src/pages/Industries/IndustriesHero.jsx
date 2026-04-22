import React from "react";
import { motion } from "framer-motion";
import { Buildings } from "phosphor-react";
import { OTHER_PAGE_IMAGES } from "../../components/common/data";

const IndustriesHero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden m-0 p-0 bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={OTHER_PAGE_IMAGES.industriesHero}
          alt="Industries"
          className="w-full h-full object-fill block"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Standardized Content Container */}
      <div className="relative z-10 max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16 h-full flex flex-col items-center justify-center">
        {/* Floating Center Box */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-[#7B1B1B]/95 backdrop-blur-sm px-4 py-1.5 rounded-lg flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5"
          >
            <Buildings size={22} color="#ffffff" weight="light" />
            <span className="text-white text-[11px] font-bold tracking-[0.2em] uppercase">
              Industries
            </span>
          </motion.div>
        </div>

        {/* Bottom Content Overlay */}
        <div className="absolute bottom-24 left-0 right-0 flex flex-col items-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="max-w-4xl"
          >
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white mb-6 tracking-wide whitespace-nowrap">
              Transforming Industries with Wysele Solutions
            </h1>
            <p className="text-sm md:text-base text-gray-100 max-w-2xl mx-auto leading-relaxed font-medium">
              We drive industry transformation through digital innovation, delivering tailored solutions that enable operational excellence and sustained business growth.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesHero;

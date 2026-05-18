import React from "react";
import { SERVICES_PAGE_IMAGES } from "../../../components/common/data";

import { motion } from "framer-motion";
import { Star, Play, CheckCircle } from "lucide-react";
import Cylinders from "../../../components/common/Cylinders";

const SapIntegrationhero = () => {
  return (
    <section className="relative w-full min-h-[calc(100vh-68px)] lg:h-[calc(100vh-68px)] overflow-hidden m-0 p-0 font-inter pt-[68px] lg:pt-0 flex flex-col">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          src={SERVICES_PAGE_IMAGES.sapIntegrationHero}
          alt="SAP Integration Services"
          className="w-full h-full object-cover block"
        />
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent z-10" />

        {/* Decorative Cylinders */}
        <div className="absolute inset-0 z-15 [&>div]:!border-white/20">
          <Cylinders />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative lg:absolute inset-0 z-20 flex flex-col justify-end px-6 md:px-8 lg:px-16 pb-16 md:pb-24 flex-1">
        <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto w-full">
          <div className="max-w-3xl">
            {/* Capsule Tag */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-6 shadow-lg"
            >
              <Star size={14} className="text-[#C9184A] fill-[#C9184A]" />
              <span className="text-[#C9184A] text-[10px] md:text-xs font-bold tracking-tight uppercase">SAP Integration Excellence</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-4 leading-tight tracking-tight"
            >
              Seamless <span className="text-yellow-400">SAP Integration</span> for a <span className="text-yellow-400 font-medium">Connected Business</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/80 text-xs md:text-sm font-light leading-relaxed mb-8 max-w-xl"
            >
              In today’s interconnected business landscape, integrating your SAP systems with various applications, platforms, and services is essential for improving operational efficiency. At Wysele, we provide robust SAP Integration Services tailored to connect your SAP environment with your entire business ecosystem.
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-5 md:gap-8"
            >
              <div className="flex items-center gap-2 text-white/90 text-[10px] md:text-xs font-medium">
                <CheckCircle size={14} className="text-yellow-400" />
                <span>Cloud & On-Premise Integration</span>
              </div>

              <div className="flex items-center gap-2 text-white/90 text-[10px] md:text-xs font-medium">
                <CheckCircle size={14} className="text-yellow-400" />
                <span>Real-time Data Sync</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SapIntegrationhero;

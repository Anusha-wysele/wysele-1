import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowUpRight } from 'lucide-react';
import Cylinderr from '../../components/common/Cylinderr';

const bulletsData = [
  "Enterprise AI implementation expertise",
  "Scalable cloud infrastructure solutions",
  "Reliable AI deployment frameworks",
  "Secure integration environments",
  "Ongoing optimization and support",
  "Structured AI development processes"
];

export default function AiMlwhychoose() {
  return (
    <>
      <section className="bg-white pt-8 pb-20 lg:pt-12 lg:pb-28 font-sans overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Title & Paragraph Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
            className="w-full lg:w-1/2 flex flex-col pt-1"
          >
            {/* Title with Cylinderr accent */}
            <div className="flex items-center gap-3 mb-6">
              <Cylinderr className="w-4 h-10 rounded-sm" />
              <h2 className="text-3xl sm:text-4xl font-normal text-gray-900 tracking-tight leading-tight">
                Why Choose Wysele for <br />
                <span className="font-bold">AI Development Services</span>
              </h2>
            </div>

            {/* Accent divider line */}
            <div className="w-12 h-[1.5px] bg-[#FFB703] mb-6" />

            {/* Exact Text Paragraphs */}
            <div className="flex flex-col gap-6 text-gray-650 text-sm sm:text-[15px] leading-relaxed font-light">
              <p>
                Wysele focuses on delivering enterprise AI solutions that support real operational needs and long-term scalability. Our approach combines technical expertise, structured implementation, and ongoing optimization to help businesses achieve sustainable digital transformation.
              </p>
              <p>
                We help businesses build intelligent systems that improve efficiency, simplify operations, and support future growth without unnecessary complexity.
              </p>
            </div>
          </motion.div>

          {/* Right Side: Bullet Points list without box or header */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
            className="w-full lg:w-1/2 flex flex-col pt-4 lg:pt-20"
          >
            {/* Vertically stacked outline circle checkmarks list */}
            <div className="flex flex-col gap-5">
              {bulletsData.map((bullet, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                  className="flex items-start gap-4 group"
                >
                  {/* Screenshot-matched outline checkmark */}
                  <div className="w-5 h-5 rounded-full border border-rose-400 flex items-center justify-center text-rose-500 shrink-0 mt-0.5 transition-colors group-hover:bg-rose-50">
                    <Check className="w-3 h-3" strokeWidth={3.5} />
                  </div>
                  
                  <span className="text-sm sm:text-base font-semibold text-slate-700 leading-snug">
                    {bullet}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>

    {/* Call To Action Section */}
    <section className="w-full bg-white pt-10 pb-16 md:pb-24 flex flex-col items-center justify-center text-center px-6 border-t border-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-900 mb-4 tracking-wide leading-tight">
          Ready to Elevate Your <span className="font-bold">Digital Presence?</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-8 max-w-2xl font-light leading-relaxed">
          Partner with our experts today to launch a high-performing website tailored to your business goals.
        </p>
        
        <Link to="/contact">
          <button className="group relative inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#FB8500] uppercase pb-2.5 border-b-2 border-[#FB8500]/30 hover:border-[#FB8500] transition-colors duration-300 px-4">
            START YOUR PROJECT
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </Link>
      </motion.div>
    </section>
    </>
  );
}

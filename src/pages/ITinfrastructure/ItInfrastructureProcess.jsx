import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Layout,
  Settings,
  Activity,
  ArrowRight
} from 'lucide-react';

const ItInfrastructureProcess = () => {
  const steps = [
    {
      category: "ASSESSMENT",
      title: "Discovery Phase",
      desc: "We perform an in-depth audit of your IT landscape to identify performance gaps, security risks, and opportunities for optimization. Our analysis covers hardware lifecycles and cloud readiness.",
      icon: <Search className="w-5 h-5" />,
      borderColor: "#ffd700",
      delay: 0.1
    },
    {
      category: "PLANNING",
      title: "Strategic Design",
      desc: "Our architects design a bespoke, security-first infrastructure that aligns with your business goals. We create detailed roadmaps for migration and resource allocation to ensure a future-proof foundation.",
      icon: <Layout className="w-5 h-5" />,
      borderColor: "#ffd700",
      delay: 0.2
    },
    {
      category: "IMPLEMENTATION",
      title: "Agile Deployment",
      desc: "Execution phase where we deploy, migrate, and configure your systems with zero disruption. We handle complex integrations and multi-cloud setups using agile methodologies for faster delivery.",
      icon: <Settings className="w-5 h-5" />,
      borderColor: "#ffd700",
      delay: 0.3
    },
    {
      category: "OPTIMIZATION",
      title: "Continuous Care",
      desc: "Continuous 24/7 monitoring and iterative fine-tuning to ensure long-term performance and security. We proactively address bottlenecks and scale resources dynamically to meet evolving demands.",
      icon: <Activity className="w-5 h-5" />,
      borderColor: "#ffcc00",
      delay: 0.4
    }
  ];

  return (
    <section
      className="py-10 font-sans overflow-hidden relative bg-[#0f0f0f]"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/7653984/pexels-photo-7653984.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/70" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">

        {/* Header */}
        <div className="text-left mb-5 md:mb-10 flex gap-8">
          <div className="w-[7px] bg-[#ffd700] h-auto rounded-full" />
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-normal text-gray-50 leading-tight">
              From <span className="font-normal text-[white]">Idea</span> to Infrastructure
            </h2>
            <p className="text-sm md:text-base font-light text-white leading-relaxed max-w-2xl">
              Our process seamlessly transforms your business objectives<br /> into
              robust, scalable, and secure IT infrastructure solutions.
            </p>
          </div>
        </div>

        {/* Steps Container */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: step.delay, duration: 0.6 }}
                className="flex flex-col items-center group"
              >
                {/* Icon Circle - Using Style for Hex Colors */}
                <div 
                  className="w-10 h-10 flex items-center justify-center bg-white relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 border-2"
                  style={{ color: step.borderColor }}
                >
                  {step.icon}
                </div>

                {/* Vertical Connecting Line */}
                <div className="w-[2px] h-8 border-l-2 border-dashed border-gray-400" />

                {/* Content Card */}
                <div 
                  className="bg-[white] p-4 w-full text-center space-y-1 shadow-sm transition-all duration-500 hover:-translate-y-4"
                >
                  <p className="text-[10px] font-semibold tracking-widest text-gray-900 uppercase">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}. {step.category}
                  </p>
                  <div className="space-y-1">
                    <h4 className="text-lg font-normal text-[#800000]">
                      {step.title}
                    </h4>
                    <p className="text-xs text-gray-800 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ItInfrastructureProcess;

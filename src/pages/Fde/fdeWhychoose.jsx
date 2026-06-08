import React from 'react';
import { motion } from 'framer-motion';
import { Users, Cpu, ShieldCheck, Globe, Timer, Target } from 'lucide-react';

const FdeWhychoose = () => {
  const reasons = [
    {
      title: "Embedded Engineering Teams",
      description: "Our engineers become part of your organization, ensuring close collaboration and faster delivery throughout the engagement.",
      icon: <Users className="w-7 h-7 text-[#FFB703]" strokeWidth={1.5} />,
      number: "01"
    },
    {
      title: "Proprietary AI Accelerators",
      description: "Leverage proven Generative AI and Agentic AI frameworks, reusable components, and implementation methodologies to accelerate outcomes.",
      icon: <Cpu className="w-7 h-7 text-[#FFB703]" strokeWidth={1.5} />,
      number: "02"
    },
    {
      title: "Production-Ready Solutions",
      description: "Every solution is designed for scalability, security, maintainability, and long-term operational success.",
      icon: <ShieldCheck className="w-7 h-7 text-[#FFB703]" strokeWidth={1.5} />,
      number: "03"
    },
    {
      title: "Cross-Industry Experience",
      description: "We bring expertise across multiple sectors, helping organizations accelerate transformation while avoiding common implementation challenges.",
      icon: <Globe className="w-7 h-7 text-[#FFB703]" strokeWidth={1.5} />,
      number: "04"
    },
    {
      title: "Faster Time-to-Value",
      description: "Our structured delivery approach reduces project risk and shortens implementation timelines.",
      icon: <Timer className="w-7 h-7 text-[#FFB703]" strokeWidth={1.5} />,
      number: "05"
    },
    {
      title: "Outcome-Focused Delivery",
      description: "Every engagement is aligned with business objectives, performance indicators, and measurable success metrics.",
      icon: <Target className="w-7 h-7 text-[#FFB703]" strokeWidth={1.5} />,
      number: "06"
    }
  ];

  return (
    <section className="bg-white py-12 lg:py-16 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#800000]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FFB703]/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold text-gray-900 leading-tight mb-4">
            Why Choose Wysele <br className="hidden sm:block" />
            <span className="text-[#800000]">Forward-Deployed Engineering</span> Services?
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto font-light">
            AI Expertise Combined with Hands-On Execution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="relative group bg-[#800000] rounded-[20px] p-8 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(128,0,0,0.3)] transition-all duration-300 overflow-hidden"
            >
              {/* Large Background Number */}
              <div className="absolute -bottom-6 -right-4 text-[140px] font-black text-white/[0.04] group-hover:text-[#FFB703]/[0.08] transition-colors duration-500 pointer-events-none select-none leading-none">
                {reason.number}
              </div>

              {/* Icon & Content */}
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-[14px] bg-white/10 flex items-center justify-center mb-8 backdrop-blur-sm shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {reason.icon}
                </div>
                
                <h3 className="text-[20px] font-bold text-white mb-3 leading-snug">
                  {reason.title}
                </h3>
                
                <p className="text-gray-200 leading-relaxed font-light text-[15px]">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FdeWhychoose;

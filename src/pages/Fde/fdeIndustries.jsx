import React from 'react';
import { motion } from 'framer-motion';
import { Factory, HeartPulse, Landmark, ShoppingCart, Truck, Zap, Building2, Cpu, Briefcase } from 'lucide-react';

const FdeIndustries = () => {
  const industries = [
    {
      name: "Manufacturing",
      description: "Optimize production, predictive maintenance, and quality control with intelligent automation.",
      icon: <Factory className="w-7 h-7 text-[#FFB703]" strokeWidth={1.5} />
    },
    {
      name: "Healthcare & Life Sciences",
      description: "Enhance patient care, accelerate drug discovery, and streamline clinical operations.",
      icon: <HeartPulse className="w-7 h-7 text-[#FFB703]" strokeWidth={1.5} />
    },
    {
      name: "Financial Services",
      description: "Automate risk assessment, detect fraud, and deliver highly personalized banking.",
      icon: <Landmark className="w-7 h-7 text-[#FFB703]" strokeWidth={1.5} />
    },
    {
      name: "Retail & Consumer",
      description: "Improve demand forecasting and deliver hyper-personalized customer experiences.",
      icon: <ShoppingCart className="w-7 h-7 text-[#FFB703]" strokeWidth={1.5} />
    },
    {
      name: "Logistics & Supply",
      description: "Dynamic route optimization and end-to-end global supply chain visibility.",
      icon: <Truck className="w-7 h-7 text-[#FFB703]" strokeWidth={1.5} />
    },
    {
      name: "Energy & Utilities",
      description: "Smart grid optimization, predictive asset management, and energy forecasting.",
      icon: <Zap className="w-7 h-7 text-[#FFB703]" strokeWidth={1.5} />
    },
    {
      name: "Public Sector",
      description: "Enhance citizen services, automate documentation, and improve resource allocation.",
      icon: <Building2 className="w-7 h-7 text-[#FFB703]" strokeWidth={1.5} />
    },
    {
      name: "Technology & Software",
      description: "Accelerate product development, automate IT ops, and enhance cybersecurity.",
      icon: <Cpu className="w-7 h-7 text-[#FFB703]" strokeWidth={1.5} />
    },
    {
      name: "Professional Services",
      description: "Automate complex reporting, streamline compliance, and enhance client advisory.",
      icon: <Briefcase className="w-7 h-7 text-[#FFB703]" strokeWidth={1.5} />
    }
  ];

  return (
    <section className="bg-white pt-16 pb-8 lg:pt-24 lg:pb-12 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-4 mb-4">
                <div className="w-10 h-[2px] bg-[#FFB703]" />
                <h4 className="text-[#800000] text-sm font-bold tracking-[0.2em] uppercase">
                    Industries We Serve
                </h4>
                <div className="w-10 h-[2px] bg-[#FFB703]" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-gray-900 leading-tight">
                Delivering AI Solutions <br className="hidden sm:block" />
                Across <span className="text-[#800000]">Diverse Industries</span>
            </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-gray-50 rounded-[20px] p-6 border border-gray-100 hover:border-[#800000]/20 hover:shadow-xl hover:shadow-gray-200 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 border border-gray-100">
                {industry.icon}
              </div>
              <h3 className="text-[15px] font-bold text-gray-900 mb-3 leading-tight">
                {industry.name}
              </h3>
              <p className="text-[14px] sm:text-[15px] text-gray-700 leading-relaxed font-normal">
                {industry.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FdeIndustries;

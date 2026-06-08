import React from 'react';
import { motion } from 'framer-motion';
import { Target, Layers, Lightbulb, Rocket, Settings, LineChart, Check } from 'lucide-react';

const FdeServices = () => {
  const services = [
    {
      title: "Strategy & Discovery",
      description: "Identify high-impact business opportunities and define measurable success criteria.",
      icon: <Target className="w-6 h-6 text-[#FFB703]" strokeWidth={1.5} />,
      includes: [
        "Business process assessment",
        "AI readiness evaluation",
        "Opportunity prioritization",
        "AI use-case workshops",
        "ROI planning",
        "Transformation roadmaps"
      ]
    },
    {
      title: "Solution Design & Architecture",
      description: "Build a scalable foundation that supports enterprise-wide growth.",
      icon: <Layers className="w-6 h-6 text-[#FFB703]" strokeWidth={1.5} />,
      includes: [
        "Enterprise AI architecture",
        "Data strategy development",
        "Integration planning",
        "Security framework design",
        "Governance planning",
        "Scalability assessment"
      ]
    },
    {
      title: "Proof of Concept (POC)",
      description: "Validate ideas before large-scale investment.",
      icon: <Lightbulb className="w-6 h-6 text-[#FFB703]" strokeWidth={1.5} />,
      includes: [
        "Rapid prototyping",
        "AI model evaluation",
        "Feasibility analysis",
        "Outcome validation",
        "Stakeholder reviews"
      ]
    },
    {
      title: "Pilot Implementation",
      description: "Deploy and optimize solutions in controlled environments.",
      icon: <Settings className="w-6 h-6 text-[#FFB703]" strokeWidth={1.5} />,
      includes: [
        "Pilot deployment",
        "User testing",
        "Performance tuning",
        "Feedback integration",
        "Adoption measurement"
      ]
    },
    {
      title: "Production Deployment",
      description: "Move solutions into enterprise operations.",
      icon: <Rocket className="w-6 h-6 text-[#FFB703]" strokeWidth={1.5} />,
      includes: [
        "Enterprise integration",
        "Security implementation",
        "Infrastructure deployment",
        "Monitoring setup",
        "Change management"
      ]
    },
    {
      title: "Continuous Improvement",
      description: "Drive long-term performance and innovation.",
      icon: <LineChart className="w-6 h-6 text-[#FFB703]" strokeWidth={1.5} />,
      includes: [
        "Performance monitoring",
        "AI model optimization",
        "Cost management",
        "Feature enhancements",
        "Ongoing innovation support"
      ]
    }
  ];

  return (
    <section className="bg-gray-50 pt-10 pb-10 lg:pt-12 lg:pb-16 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#800000]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FFB703]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-900 leading-tight mb-4">
                Our Forward-Deployed <br className="hidden sm:block" />
                <span className="text-[#800000]">Engineering Approach</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">
                A Structured Framework for Successful AI Adoption
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="bg-white rounded-[24px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(128,0,0,0.12)] hover:-translate-y-2 transition-all duration-300 border border-gray-100 group flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-[12px] bg-[#800000] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-[22px] font-bold text-gray-900 mb-3 leading-snug">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-8 text-[15px] leading-relaxed font-light">
                {service.description}
              </p>
              
              <div className="space-y-4 mt-auto pt-6 border-t border-gray-100">
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">
                  Services Include:
                </h4>
                <div className="space-y-3">
                    {service.includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <div className="mt-[2px] min-w-[16px]">
                        <div className="w-4 h-4 rounded-full bg-[#FFB703]/20 flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-[#800000]" strokeWidth={4} />
                        </div>
                        </div>
                        <span className="text-gray-700 text-[14px] font-medium leading-tight">{item}</span>
                    </div>
                    ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FdeServices;

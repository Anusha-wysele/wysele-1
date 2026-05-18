import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Activity, 
  Globe, 
  Cloud, 
  Search,
} from 'lucide-react';

const services = [
  {
    title: "Malware Detection & Removal",
    desc: "Advanced scanning and elimination of sophisticated digital threats and malicious software to keep your systems clean.",
    icon: <ShieldAlert className="w-6 h-6 text-white" />,
  },
  {
    title: "Network Security Protection",
    desc: "Robust firewall management and perimeter defense to keep your infrastructure secure from unauthorized access.",
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
  },
  {
    title: "24/7 Security Monitoring",
    desc: "Real-time surveillance and incident response to detect and mitigate threats before they cause significant damage.",
    icon: <Activity className="w-6 h-6 text-white" />,
  },
  {
    title: "Web Application Security",
    desc: "Securing your online platforms against common vulnerabilities, injection attacks, and zero-day exploits.",
    icon: <Globe className="w-6 h-6 text-white" />,
  },
  {
    title: "Cloud Security",
    desc: "Protecting your cloud-based assets and ensuring data privacy across multi-cloud and hybrid environments.",
    icon: <Cloud className="w-6 h-6 text-white" />,
  },
  {
    title: "Vulnerability Assessment (VAPT)",
    desc: "Comprehensive security testing to identify and remediate potential entry points for attackers in your ecosystem.",
    icon: <Search className="w-6 h-6 text-white" />,
  },
  // {
  //   title: "Identity & Access Management",
  //   desc: "Implementing strict access controls and multi-factor authentication to secure user identities and data.",
  //   icon: <ShieldAlert className="w-6 h-6 text-white" />,
  // },
  // {
  //   title: "Incident Response & Recovery",
  //   desc: "Rapid response strategies to contain security breaches and restore normal operations with minimal downtime.",
  //   icon: <Activity className="w-6 h-6 text-white" />,
  // }
];

const CybersecurityServices = () => {
  return (
    <section className="py-10 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Heading */}
        <div className="text-center mb-10 max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl md:text-2xl lg:text-3xl font-normal text-[#800000] mb-3"
          >
           Cybersecurity Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-600 text-sm md:text-base leading-relaxed"
          >
Advanced cybersecurity solutions to protect your business from evolving threats          </motion.p>
        </div>

        {/* Services Grid - 4 columns per row on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              // whileHover={{ 
              //   y: -10,
              //   boxShadow: "0 20px 40px -10px rgba(201, 24, 74, 0.2)"
              // }}
              className="relative overflow-hidden bg-white/90 p-4 rounded-lg transition-all duration-500 flex flex-col items-start text-left group border border-[1px]"
            >
              {/* Animated Bottom Border */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#800000] transition-all duration-500 ease-out group-hover:w-full"></div>

              <div className="flex items-center gap-4 mb-4">
                {/* Circular Icon Container */}
                <div className="w-8 h-8 rounded-full p-2 flex-shrink-0 flex items-center justify-center transition-all duration-700 group-hover:rotate-[360deg] bg-[#ffcc00]/50">
                  {React.cloneElement(service.icon, { 
                    className: "w-6 h-6 text-[#C9184A] transition-colors duration-500 group-hover:text-[#C9184A]" 
                  })}
                </div>

                <h3 className="text-[15px] font-semibold text-[#0A0A0A] leading-snug transition-colors duration-500 group-hover:text-[#380816]">
                  {service.title}
                </h3>
              </div>

              <p className="text-gray-600 text-xs md:text-sm leading-relaxed transition-colors duration-500 group-hover:text-[#380816]">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CybersecurityServices;

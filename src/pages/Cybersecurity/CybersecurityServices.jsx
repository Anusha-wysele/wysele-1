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
    desc: "Malware attacks can damage systems, interrupt workflows, and expose business information. Wysele provides malware detection and removal services that help organizations identify harmful software and improve operational security. ",
    points: [
      "Malicious files",
      "Harmful software activity",
      "Suspicious processes",
      "Unauthorized applications",
      "Security threats affecting systems"
    ],
    icon: <ShieldAlert className="w-6 h-6 text-white" />,
  },
  {
    title: "Network Security Protection",
    desc: "Business networks connect employees, applications, devices, and operational systems across locations and departments. Weak network security can increase the risk of unauthorized access and operational disruptions.",
    points: [
      "Firewall management",
      "Network monitoring",
      "Access control support",
      "Security policy implementation",
      "Traffic monitoring"
    ],
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
  },
  {
    title: "24/7 Security Monitoring",
    desc: "Cyber threats can occur at any time and spread quickly across systems if left undetected. Continuous monitoring helps businesses identify suspicious activities early and respond before major disruptions occur.",
    points: [
      "Threat detection ",
      "Security event monitoring ",
      "Incident analysis",
      "Risk identification ",
      "Rapid response coordination"
    ],
    icon: <Activity className="w-6 h-6 text-white" />,
  },
  {
    title: "Web Application Security",
    desc: "Web applications are common targets for unauthorized access attempts and security attacks. Wysele helps businesses improve web application security through testing, monitoring, and protection measures designed to reduce vulnerabilities.",
    points: [
      "Application security testing ",
      "Vulnerability reviews",
      "Secure access management ",
      "Configuration analysis",
      "Threat monitoring"
    ],
    icon: <Globe className="w-6 h-6 text-white" />,
  },
  {
    title: "Cloud Security Services",
    desc: "Cloud platforms support business operations, application management, and data storage across organizations. Without proper security controls, cloud environments can become vulnerable to unauthorized access and data exposure. ",
    points: [
      " Cloud environment reviews ",
      "Access management support ",
      " Security policy implementation ",
      "Infrastructure monitoring ",
      "Data protection measures"
    ],
    icon: <Cloud className="w-6 h-6 text-white" />,
  },
  {
    title: "Vulnerability Assessment and Testing",
    desc: "Identifying security weaknesses before they are exploited helps organizations reduce risks and improve operational protection. Wysele provides vulnerability assessment and penetration testing services that help businesses identify risks across systems, applications, and infrastructure. ",
    points: [
      " Detect security gaps ",
      "Identify vulnerable access points ",
      "Improve system protection ",
      "Reduce operational risks ",
      "Strengthen security planning "
    ],
    icon: <Search className="w-6 h-6 text-white" />,
  },

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
              {service.points && (
                // <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-500 ease-in-out w-full">
                <div className="overflow-hidden">
                  <ul className="list-disc pl-4 mt-2 space-y-1 w-full">
                    {service.points.map((point, i) => (
                      <li key={i} className="text-gray-800 text-xs md:text-sm leading-relaxed transition-colors duration-500">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                // </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CybersecurityServices;


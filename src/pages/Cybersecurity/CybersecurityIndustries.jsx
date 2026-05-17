import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const industries = [
  {
    name: "Healthcare",
    desc: "Protecting patient records and ensuring HIPAA compliance with advanced threat detection. We secure connected medical devices and safeguard critical infrastructure from disruption.",
    image:
      "https://images.pexels.com/photos/7446988/pexels-photo-7446988.jpeg",
    points: [
      "Secure Patient Data",
      "HIPAA Compliance",
      "Medical Device Protection",
      "24/7 Threat Monitoring",
    ],
  },
  {
    name: "Finance",
    desc: "Securing financial transactions and sensitive data against sophisticated cyber attacks. Our robust solutions ensure regulatory compliance and proactive fraud prevention.",
    image:
      "https://images.pexels.com/photos/6964107/pexels-photo-6964107.jpeg",
    points: [
      "Fraud Prevention",
      "Secure Transactions",
      "Compliance Management",
      "Risk Monitoring",
    ],
  },
  {
    name: "E-commerce",
    desc: "Safeguarding customer payment information and preventing platform vulnerabilities. We provide continuous monitoring to ensure secure, uninterrupted shopping experiences.",
    image:
      "https://images.pexels.com/photos/7289725/pexels-photo-7289725.jpeg",
    points: [
      "Payment Security",
      "Customer Data Protection",
      "Platform Monitoring",
      "Threat Detection",
    ],
  },
];

const CybersecurityIndustries = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative py-10 bg-white overflow-hidden">
      
      {/* Background Glow */}
      {/* <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#ffcc00] blur-[120px] rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500 blur-[120px] rounded-full"></div>
      </div> */}

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT IMAGE */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-none overflow-hidden border border-white/10 ">
              
              <img
                src={industries[activeTab].image}
                alt={industries[activeTab].name}
                className="w-full h-[400px] object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              {/* Floating Card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white backdrop-blur-xl border border-white/10  p-3">
                <h3 className="text-[#800000] text-xl font-semibold mb-3">
                  {industries[activeTab].name} Security
                </h3>

                <p className="text-gray-800 text-sm leading-relaxed">
                  Advanced cybersecurity infrastructure designed to protect critical operations, sensitive data, and digital ecosystems.
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xl md:text-2xl font-normal leading-tight text-gray-900 mb-5"
            >
              Experts Helping You Strengthen Your{" "}
              <span className="text-[#800000]">
                Cyber Defenses
              </span>
            </motion.h2>

            {/* Tabs */}
            <div className="flex flex-wrap gap-5 border-b border-white/10 pb-2 mb-5">
              {industries.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`relative text-sm capitalize tracking-normal transition-all duration-300 ${
                    activeTab === index
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {item.name}

                  {activeTab === index && (
                    <div className="absolute -bottom-5 left-0 w-full h-[2px] bg-[#ffcc00]"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-normal text-[#800000] mb-3">
                {industries[activeTab].name} Cybersecurity
              </h3>

              <p className="text-gray-400 leading-relaxed mb-3 text-[15px]">
                {industries[activeTab].desc}
              </p>

              {/* Features */}
              <div className="space-y-3">
                {industries[activeTab].points.map((point, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#C9184A] flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>

                    <span className="text-gray-800 text-[15px]">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CybersecurityIndustries;
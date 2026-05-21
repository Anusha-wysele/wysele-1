import React from 'react';
import IotheroImg from '../../assets/IotHero.png';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function IotHero() {
  const listItems = [
    { name: "End-to-End IoT Development Services", targetId: "end-to-end" },
    { name: "Complete IoT Architecture for Modern Enterprises", targetId: "architecture" },
    { name: "Device Integration and Embedded IoT Solutions", targetId: "device-integration" },
    { name: "Secure IoT Connectivity and Communication", targetId: "connectivity" },
    { name: "IoT Cloud Integration and Data Management", targetId: "cloud-integration" },
    { name: "Industry-Specific IoT Applications", targetId: "industry-applications" }
  ];

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // Adjust offset to clear the fixed navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white font-sans overflow-hidden">
      
      {/* Top Dark Background Section */}
      <div className="relative w-full pt-[100px] md:pt-[140px] pb-[100px] md:pb-[140px] min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] flex flex-col justify-center items-center">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={IotheroImg} 
            alt="IoT Services Hero Background" 
            className="w-full h-full object-cover"
          />
        </div>
        

      </div>

      {/* Overlapping Cards Section */}
      <div className="relative z-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-[80px] sm:-mt-[100px] md:-mt-[120px] lg:-mt-[160px] pb-8 md:pb-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-4 items-stretch">
          
          {/* Left Card - List */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 bg-[#F1F2F4] rounded-2xl p-5 md:p-6 shadow-2xl"
          >
            <ul className="space-y-3">
              {listItems.map((item, index) => (
                <li 
                  key={index} 
                  onClick={() => handleScroll(item.targetId)}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <ArrowRight className="w-5 h-5 text-black group-hover:text-blue-600 transition-colors shrink-0" strokeWidth={2.5} />
                  <span className="text-black font-bold text-[15px] md:text-[16px] group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Card - Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1 bg-[#800000] rounded-2xl p-5 md:p-6 shadow-2xl flex flex-col justify-center"
          >
            <p className="text-white text-xs md:text-sm leading-snug md:leading-normal mb-2 font-medium">
              Modern businesses depend on connected systems, real-time monitoring, and operational visibility to manage processes efficiently across industries. Wysele provides IoT development services that help organizations connect devices, automate operations, and improve decision-making through secure and scalable IoT infrastructure.
            </p>
            <p className="text-white text-xs md:text-sm leading-snug md:leading-normal font-medium">
              Wysele supports businesses across manufacturing, transportation, logistics, healthcare, and smart infrastructure with reliable IoT solutions tailored to operational requirements and long-term scalability goals.
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

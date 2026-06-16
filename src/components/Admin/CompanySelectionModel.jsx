import React from 'react';
import { motion } from 'framer-motion';

// Import images from assets
import wyseleLogo from '../../assets/wysele.png';
import orbintixLogo from '../../assets/orbintix.png';

const companies = [
  {
    name: 'Wysele Technologies',
    logo: wyseleLogo,
    url: 'https://wysele.com/masterlogin',
  },
  {
    name: 'Orbintix Technologies',
    logo: orbintixLogo,
    url: 'https://orbintix.com/',
  },
];

const CompanySelectionModal = () => {
  const handleRedirect = (url) => {
    window.location.href = url;
  };

  // Framer motion variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: 'easeOut',
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.25, 0.1, 0.25, 1.0] 
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4  backdrop-blur-md overflow-y-auto">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={modalVariants}
        className="w-full max-w-4xl p-8 md:p-12 rounded-none shadow-2xl relative overflow-hidden text-center"
        style={{
          background:"white",
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Subtle background glow highlights to enhance premium feel */}
        {/* <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full filter blur-[100px] pointer-events-none" /> */}
        {/* <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full filter blur-[100px] pointer-events-none" /> */}

        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#090d16] tracking-tight">
            Select Your Company Portal
          </h2>
          <p className="text-slate-800 text-sm md:text-base mt-2 mb-10">
            Choose the company you want to access
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companies.map((company) => (
              <motion.div
                key={company.name}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(59, 130, 246, 0.35)",
                  borderColor: "rgba(59, 130, 246, 0.5)",
                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                }}
                transition={{ duration: 0.3 }}
                onClick={() => handleRedirect(company.url)}
                className="flex flex-col items-center justify-between p-6   rounded-lg cursor-pointer min-h-[260px] text-center transition-all duration-300 group"
              >
                {/* Logo Container */}
                <div className="h-28 flex items-center justify-center mb-6 w-full p-2">
                  <img
                    src={company.logo}
                    alt={`${company.name} Logo`}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Company Name */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 transition-colors duration-300 ">
                  {company.name}
                </h3>

                {/* Open Portal CTA */}
                <div className="text-xs font-semibold text-[#3b82f6] tracking-wider uppercase flex items-center gap-1.5 transition-colors duration-300  mt-2">
                  Open Portal 
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CompanySelectionModal;

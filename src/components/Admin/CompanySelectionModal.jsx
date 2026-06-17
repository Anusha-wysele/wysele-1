import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import images from assets
import wyseleLogo from '../../assets/wysele.png';
import orbintixLogo from '../../assets/orbintix.png';
import gracevirtueLogo from '../../assets/gracevirtue.png';

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
  {
    name: 'Grace Virtue Technologies',
    logo: gracevirtueLogo,
    url: 'https://gracevirtue.com/',
  },
];

const CompanySelectionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleRedirect = (company) => {
    if (company.name === 'Wysele Technologies') {
      onClose();
    } else {
      window.location.href = company.url;
    }
  };

  // Framer motion variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.16, 1, 0.3, 1], // premium ease-out
        when: "beforeChildren",
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
        className="fixed inset-0 z-50 flex items-center justify-center p-4  backdrop-blur-md overflow-y-auto font-sans"
      >
        <motion.div
          variants={modalVariants}
          className="w-full max-w-5xl bg-white border border-slate-100 p-8 md:p-12 relative overflow-hidden text-center rounded-none"
        >
          <div className="relative z-10">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-wider uppercase mb-2">
              Select Your Portal
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-medium mb-10 tracking-wide">
              Choose the company portal you wish to access
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {companies.map((company) => (
                <motion.div
                  key={company.name}
                  variants={cardVariants}
                  whileHover={{ 
                    y: -6,
                    boxShadow: "0 15px 35px -10px rgba(0, 0, 0, 0.08)",
                  }}
                  onClick={() => handleRedirect(company)}
                  className="flex flex-col items-center justify-between p-8 bg-slate-50/50 hover:bg-white border border-slate-100 rounded-none cursor-pointer min-h-[280px] text-center transition-all duration-300 group"
                >
                  {/* Logo Container */}
                  <div className="h-28 flex items-center justify-center mb-4 w-full p-2 bg-white rounded-none border border-slate-100/50 shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
                    <img
                      src={company.logo}
                      alt={`${company.name} Logo`}
                      className="max-h-full max-w-full object-contain filter transition-transform duration-300"
                    />
                  </div>

                  {/* Company Info */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-800 tracking-wide capitalize transition-colors duration-300 group-hover:text-slate-950">
                      {company.name}
                    </h3>

                    {/* Open Portal CTA */}
                    <div className="text-[12px] font-bold text-blue-900 tracking-widest uppercase flex items-center justify-center gap-1.5 transition-all duration-300 group-hover:translate-x-0.5">
                      Open Portal 
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompanySelectionModal;

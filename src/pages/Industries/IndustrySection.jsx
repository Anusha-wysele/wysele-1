import { AnimatePresence, motion } from "framer-motion";
import {
  Airplane,
  Bank,
  Car,
  Diamond,
  Factory,
  FirstAid,
  Leaf,
  Lightning,
  ShoppingBag,
  Truck,
  TShirt
} from "phosphor-react";
import { useState } from "react";

const iconMap = {
  "Manufacturing": Factory,
  "Utilities": Lightning,
  "Logistics": Truck,
  "Pharmaceutical": FirstAid,
  "Agribusiness": Leaf,
  "Aerospace & Defense": Airplane,
  "Automotive & Heavy Equipment": Car,
  "Banking & Financial": Bank,
  "Retail": ShoppingBag,
  "Textiles": TShirt,
  "Mining": Diamond
};

const imageMetaMap = {
  "Manufacturing": {
    alt: "Manufacturing industry ERP and automation solutions",
    title: "Manufacturing Industry Solutions | Wysele"
  },
  "Utilities": {
    alt: "Utilities industry smart infrastructure and SAP solutions",
    title: "Utilities Industry Solutions | Wysele"
  },
  "Logistics": {
    alt: "Logistics and supply chain digital transformation services",
    title: "Logistics Industry Solutions | Wysele"
  },
  "Pharmaceutical": {
    alt: "Pharmaceutical industry compliance and ERP solutions",
    title: "Pharmaceutical Industry Solutions | Wysele"
  },
  "Agribusiness": {
    alt: "Agribusiness technology and enterprise management solutions",
    title: "Agribusiness Industry Solutions | Wysele"
  },
  "Aerospace & Defense": {
    alt: "Aerospace and defense digital engineering solutions",
    title: "Aerospace & Defense Solutions | Wysele"
  },
  "Automotive & Heavy Equipment": {
    alt: "Automotive and heavy equipment enterprise solutions",
    title: "Automotive & Heavy Equipment Solutions | Wysele"
  },
  "Banking & Financial": {
    alt: "Banking and financial services digital transformation",
    title: "Banking & Financial Solutions | Wysele"
  },
  "Retail": {
    alt: "Retail industry omnichannel and ERP technology solutions",
    title: "Retail Industry Solutions | Wysele"
  },
  "Textiles": {
    alt: "Textile industry automation and supply chain solutions",
    title: "Textile Industry Solutions | Wysele"
  },
  "Mining": {
    alt: "Mining industry operational efficiency and digital solutions",
    title: "Mining Industry Solutions | Wysele"
  }
};

const IndustrySection = ({ title, description, image, tags, features, reversed }) => {
  const [activeFeature, setActiveFeature] = useState(-1);
  const Icon = iconMap[title] || Factory;
  const meta = imageMetaMap[title] || { alt: title, title: title };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemLeftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const itemRightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const imageVariantsLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const imageVariantsRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="py-12 overflow-hidden bg-white" id={title.toLowerCase().split(' ')[0]}>
      <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
        <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-start gap-12 lg:gap-20`}>
          
          {/* Text Content Column */}
          <motion.div 
            className="w-full md:w-1/2 space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={reversed ? itemRightVariants : itemLeftVariants}>
              <h2 className="text-xl md:text-3xl font-medium text-gray-900 tracking-tight mb-4">
                {title}
              </h2>
              <p className="text-base text-gray-500 leading-relaxed">
                {description}
              </p>
            </motion.div>

            {/* Interactive Features Accordion */}
            {features && features.length > 0 && (
              <div className="space-y-4">
                {features.map((feature, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={reversed ? itemRightVariants : itemLeftVariants}
                    className="border-b border-gray-100"
                  >
                    <button
                      onClick={() => setActiveFeature(activeFeature === idx ? -1 : idx)}
                      className="w-full py-1.5 flex items-center justify-between text-left group"
                    >
                      <span className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${activeFeature === idx ? 'text-[#C9184A]' : 'text-gray-500 group-hover:text-gray-900'}`}>
                        {feature.title}
                      </span>
                      <motion.span
                        animate={{ rotate: activeFeature === idx ? 180 : 0 }}
                        className="text-gray-400"
                      >
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {activeFeature === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="pb-2 text-[13px] text-gray-500 leading-relaxed font-medium">
                            {feature.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Image Column */}
          <div className="w-full md:w-1/2 md:mt-4">
            <div className="md:sticky md:top-40">
              <motion.div 
                className="relative group w-full aspect-[16/9] overflow-hidden shadow-2xl shadow-gray-100 cursor-crosshair"
                variants={reversed ? imageVariantsLeft : imageVariantsRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <img loading="lazy" src={image}
                  alt={meta.alt}
                  title={meta.title}
                  className="w-full h-full object-cover transition-all duration-700"
                />
                
                {/* Diagonal Overlay - Top Left (Gold) */}
                <div 
                    className="absolute top-0 left-0 w-0 h-0 bg-[#D4AF37]/10 transition-all duration-700 group-hover:w-full group-hover:h-full z-10"
                    style={{
                        clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                    }}
                ></div>

                {/* Diagonal Overlay - Bottom Right (Black) */}
                <div 
                    className="absolute bottom-0 right-0 w-0 h-0 bg-black/10 transition-all duration-700 group-hover:w-full group-hover:h-full z-10"
                    style={{
                        clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                    }}
                ></div>

                {/* Industry Floating Box on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-20 pointer-events-none">
                  <div className="bg-[#7B1B1B] px-4 py-1.5 rounded-lg flex items-center gap-3 shadow-2xl border border-white/10">
                    <Icon size={20} color="#ffffff" weight="light" />
                    <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase">
                      {title}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustrySection;

import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckCircle2,
  Code2,
  Database,
  Headphones,
  Rocket,
  Share2,
  Users
} from 'lucide-react';
import { useState } from 'react';

// Import Salesforce tabs local images
import ConsultingImg from '../../assets/wysele-salesforceconsulting.webp';
import ImplementationImg from '../../assets/wysele-salesfrceimplementation.webp';
import DevelopmentImg from '../../assets/wysele-salesforcedevelopment.webp';
import IntegrationImg from '../../assets/wysele-salesforceintegration.webp';
import SupportImg from '../../assets/wysele-salesforcesupport.webp';
import MigrationImg from '../../assets/wysele-salesforcemigration.webp';

const SalesforceTabs = () => {
  const [[activeTab, direction], setTab] = useState([0, 0]);

  const handleTabChange = (newTab) => {
    setTab([newTab, newTab > activeTab ? 1 : -1]);
  };

  const tabs = [
    {
      id: 0,
      menuTitle: " Consulting",
      icon: <Users className="w-5 h-5" />,
      title: "Salesforce Consulting",
      description: "Maximize your CRM investment with our expert advisory services. We help you map out a clear path to success by aligning technology with your business goals.",
      bullets: [
        "Business process mapping & optimization",
        "Comprehensive technical roadmap design",
        "ROI analysis and strategic growth planning",
        "Change management strategy",
        "System architecture review"
      ],
      image: ConsultingImg
    },
    {
      id: 1,
      menuTitle: " Implementation",
      icon: <Rocket className="w-5 h-5" />,
      title: "Salesforce Implementation",
      description: "Deploy Salesforce with confidence across your organization. Our team ensures a smooth setup that drives immediate value and long-term user adoption.",
      bullets: [
        "Custom setup and tailored configuration",
        "Effective user adoption & training programs",
        "Robust data security & governance architecture",
        "Third-party app configuration",
        "Go-live support & monitoring"
      ],
      image: ImplementationImg
    },
    {
      id: 2,
      menuTitle: " Development",
      icon: <Code2 className="w-5 h-5" />,
      title: "Salesforce Development",
      description: "Extend Salesforce functionality with custom-built solutions. We develop powerful tools that handle your most complex business requirements.",
      bullets: [
        "Apex and Lightning Web Components (LWC)",
        "Advanced custom object and field modeling",
        "Complex automated business logic & triggers",
        "Visualforce to LWC migration",
        "Custom AppExchange app creation"
      ],
      image: DevelopmentImg
    },
    {
      id: 3,
      menuTitle: " Integration",
      icon: <Share2 className="w-5 h-5" />,
      title: "Salesforce Integration",
      description: "Break down silos by connecting Salesforce with your entire tech stack. We ensure data flows seamlessly between your critical business systems.",
      bullets: [
        "ERP, Marketing, and Finance system sync",
        "Custom API development & management",
        "Real-time data synchronization & integrity",
        "MuleSoft and middleware setup",
        "Legacy system connection"
      ],
      image: IntegrationImg
    },
    {
      id: 4,
      menuTitle: " Support",
      icon: <Headphones className="w-5 h-5" />,
      title: "Salesforce Support",
      description: "Keep your Salesforce environment running at peak performance. Our dedicated support team is here to resolve issues and optimize your system daily.",
      bullets: [
        "Proactive 24/7 technical assistance",
        "Regular system audits and health checks",
        "Performance tuning and feature updates",
        "User role and permission management",
        "On-demand troubleshooting"
      ],
      image: SupportImg
    },
    {
      id: 5,
      menuTitle: " Migration",
      icon: <Database className="w-5 h-5" />,
      title: "Salesforce Migration",
      description: "Transition smoothly from legacy systems without losing critical data. We handle the heavy lifting of data cleanup and transformation for you.",
      bullets: [
        "Advanced legacy data cleanup and prep",
        "Complex data mapping & transformation",
        "End-to-end validation & integrity testing",
        "Downtime minimization strategy",
        "Post-migration data auditing"
      ],
      image: MigrationImg
    }
  ];

  return (
    <section className="py-10 bg-gray-50 opacity-1">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-3xl lg:text-3xl font-normal text-[#800000] mb-2"
          >
            Salesforce Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-[15px] md:text-[17px] max-w-3xl mx-auto font-light mb-3"
          >
            All-in-one Salesforce services to optimize processes, improve visibility, and accelerate growth.
          </motion.p>
          <div className="w-24 h-1 bg-[#ffcc00] mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch ">
          
          {/* Left Column: Vertical Menu */}
          <div className="lg:col-span-3 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-300 text-left group  ${
                  activeTab === tab.id 
                    ? 'bg-[#450505]/90 text-white  rounded-lg text-[15px] font-normal' 
                    : 'text-gray-900 hover:bg-gray-100 hover:text-black'
                }`}
              >
                <span className={`transition-colors duration-300 ${
                  activeTab === tab.id ? 'text-white' : 'text-[#800000]/80 group-hover:text-maroon-700 group-hover:rounded-lg'
                }`}>
                  {tab.icon}
                </span>
                <span className="font-normal text-[14px] md:text-[17px] leading-tight font-sans">
                  {tab.menuTitle}
                </span>
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="active-pill"
                    className="ml-auto w-1.5 h-6 bg-[#ffcc00] rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Center Column: Dynamic Image */}
          <div className="lg:col-span-5 h-[250px] lg:h-auto relative overflow-hidden rounded-lg">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.img
                key={activeTab}
                custom={direction}
                variants={{
                  enter: (direction) => ({
                    y: direction > 0 ? 100 : -100,
                    opacity: 0,
                    scale: 1.1
                  }),
                  center: {
                    y: 0,
                    opacity: 1,
                    scale: 1
                  },
                  exit: (direction) => ({
                    y: direction > 0 ? -100 : 100,
                    opacity: 0,
                    scale: 1
                  })
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                src={tabs[activeTab].image}
                alt={tabs[activeTab].title}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-4 flex flex-col">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={activeTab}
                custom={direction}
                variants={{
                  enter: (direction) => ({
                    y: direction > 0 ? 100 : -100,
                    opacity: 0
                  }),
                  center: {
                    y: 0,
                    opacity: 1
                  },
                  exit: (direction) => ({
                    y: direction > 0 ? -100 : 100,
                    opacity: 0
                  })
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="h-full flex flex-col justify-start space-y-6"
              >
                <div>
                  <h3 className="text-xl md:text-xl font-semibold text-gray-900 mb-3 pt-3 leading-tight font-sans">
                    {tabs[activeTab].title}
                  </h3>
                  <p className="text-gray-600 text-[base] md:text-sm leading-relaxed">
                    {tabs[activeTab].description}
                  </p>
                </div>

                <div className="space-y-3 overflow-hidden">
                  {tabs[activeTab].bullets.map((bullet, index) => (
                    <motion.div 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      key={index} 
                      className="flex items-center gap-3 group w-full"
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#C9184A]/10 flex items-center justify-center text-[#C9184A] group-hover:bg-[#C9184A] group-hover:text-white transition-all">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-gray-700 text-[13px] font-medium truncate" title={bullet}>{bullet}</span>
                    </motion.div>
                  ))}
                </div>

               
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SalesforceTabs;

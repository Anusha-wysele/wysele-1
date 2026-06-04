import { motion } from 'framer-motion';
import {
  Activity,
  CloudCog,
  Database,
  Share2,
  ShieldCheck,
  Terminal
} from 'lucide-react';

import itInfrastructureCloudIntegration from '../../assets/wysele-itinfrastructurecloudintegration.webp';
import itInfrastructureCybersecurity from '../../assets/wysele-itinfrastructurecybersecurity.webp';
import itInfrastructureDisaster from '../../assets/wysele-itinfrastructuredisaster.webp';
import itInfrastructureNetwork from '../../assets/wysele-itinfrastructurenetwork.webp';
import itInfrastructureServer from '../../assets/wysele-itinfrastructureserver.webp';
import itInfrastructureAutomation from '../../assets/wysele-itinfrastructureautomation.webp';

const ItInfrastructureServices = () => {
  const services = [
    {
      title: "Cloud Infrastructure",
      desc: "Scalable cloud environments on AWS, Azure, and hybrid platforms deliver secure, high-performance infrastructure. We optimize your cloud presence for maximum cost-efficiency and reliability.",
      icon: <CloudCog className="w-5 h-5" />,
      image: itInfrastructureCloudIntegration,
      delay: 0.1
    },
    {
      title: "Network Architecture",
      desc: "Secure, high-performance network design ensures optimized connectivity, reliability, and seamless data flow across your infrastructure. We implement advanced routing protocols.",
      icon: <Share2 className="w-5 h-5" />,
      image: itInfrastructureNetwork,
      delay: 0.2
    },
    {
      title: "Server & Storage Solutions",
      desc: "Reliable compute and storage systems deliver high availability, consistent performance, and resilient data access across your infrastructure. Our solutions are built to handle intensive enterprise workloads.",
      icon: <Database className="w-5 h-5" />,
      image: itInfrastructureServer,
      delay: 0.3
    },
    {
      title: "Infrastructure Automation",
      desc: "DevOps-driven automation streamlines deployments, monitoring, and scaling to ensure faster releases and improved reliability. We automate repetitive tasks to reduce manual overhead and human error.",
      icon: <Terminal className="w-5 h-5" />,
      image: itInfrastructureAutomation,
      delay: 0.4
    },
    {
      title: "Cybersecurity Integration",
      desc: "Protect your infrastructure with integrated security protocols, threat detection, and advanced encryption to safeguard critical assets. We ensure full compliance and proactive defense across all layers.",
      icon: <ShieldCheck className="w-5 h-5" />,
      image: itInfrastructureCybersecurity,
      delay: 0.5
    },
    {
      title: "Disaster Recovery",
      desc: "Ensure business continuity with automated backups, resilient recovery sites, and rapid data restoration for minimal downtime. Protect your data against any unforeseen failures with robust protocols.",
      icon: <Activity className="w-5 h-5" />,
      image: itInfrastructureDisaster,
      delay: 0.6
    }
  ];

  return (
    <section className="py-10 bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <div className="space-y-4 max-w-xl">
            <div className="inline-block px-4 py-1.5 bg-[#C9184A]/10 text-[#C9184A] text-[10px] font-bold uppercase tracking-widest rounded-sm">
              Our Expertise
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-normal text-gray-900 leading-tight">
              Enterprise <span className="font-normal text-[#800000]">Infrastructure</span> Services
            </h2>
          </div>
          <p className="text-gray-500 text-sm md:text-base font-light max-w-md lg:text-right border-r-2 border-[#ffc800] pr-6 lg:mb-1">
            We provide end-to-end IT infrastructure management to ensure your business remains agile, secure, and always-on.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-0">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: service.delay, duration: 0.8 }}
              className="group bg-white/90 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col"
            >
              {/* Content Area */}
              <div className="p-4 space-y-3 flex-grow">
                {/* Icon and Title Row */}
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#ffcc00] rounded-full shadow-sm text-black flex-shrink-0 group-hover:rotate-45 transition-transform duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-sm md:text-md lg:text-lg font-normal text-[#800000] transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>
                
                {/* Description - Fixed 4 line limit */}
                <p className="text-gray-700 text-[13px] leading-relaxed font-normal line-clamp-4">
                  {service.desc}
                </p>
              </div>

              {/* Image Area at Bottom */}
              <div className="w-full h-[160px] overflow-hidden relative mt-auto">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Learn More Overlay */}
                {/* <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  Read More <ArrowRight className="w-4 h-4" />
                </div> */}
              </div>

              {/* Decorative Corner Spread (Subtle) */}
              {/* <div className="absolute bottom-0 right-0 w-0 h-0 bg-[#C9184A]/10 rounded-full transition-all duration-700 ease-out group-hover:w-[150%] group-hover:h-[150%] -z-0" /> */}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ItInfrastructureServices;

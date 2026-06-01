import { motion } from 'framer-motion';
import {
  ClipboardCheck,
  FileText,
  GraduationCap,
  Headphones,
  Monitor,
  Search,
  Settings
} from 'lucide-react';

const steps = [
  {
    title: "Assessment",
    desc: "We analyze your systems, identify vulnerabilities, and assess risks to understand your security posture.",
    icon: <ClipboardCheck className="w-8 h-8" />
  },
  {
    title: "Planning",
    desc: "We create a customized security strategy tailored to your business needs and compliance requirements.",
    icon: <FileText className="w-8 h-8" />
  },
  {
    title: "Implementation",
    desc: "We deploy advanced security solutions, configure systems, and strengthen your infrastructure.",
    icon: <Settings className="w-8 h-8" />
  },
  {
    title: "Testing",
    desc: "We simulate real-world attacks, identify weaknesses, and fix gaps to ensure robust protection.",
    icon: <Search className="w-8 h-8" />
  },
  {
    title: "Monitoring",
    desc: "Our team monitors your systems 24/7 to detect threats and respond before they impact your business.",
    icon: <Monitor className="w-8 h-8" />
  },
  {
    title: "Response",
    desc: "We take immediate action during security incidents to contain threats and minimize damage.",
    icon: <Headphones className="w-8 h-8" />
  },
  {
    title: "Continuous Improvement",
    desc: "We continuously review, update, and enhance your security to stay ahead of evolving threats.",
    icon: <GraduationCap className="w-8 h-8" />
  }
];

const CybersecurityProcess = () => {
  return (
    <section className="py-10 bg-white overflow-hidden font-sans border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Heading */}
        <div className="text-center mb-8 lg:mb-12">
         
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#CC012D] mb-4">
            Our Cybersecurity Process
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            A structured approach to protect your digital assets, minimize risks, and ensure long-term security and compliance.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 lg:gap-0">
          
          {/* Horizontal dashed line (desktop only) */}
          <div className="hidden lg:block absolute top-[40px] left-[7%] right-[7%] h-[2px] border-t-2 border-dashed border-[#C9184A]/30 z-0"></div>

          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center w-full sm:w-2/3 lg:w-[13.5%] z-10 group"
            >
              
              {/* Icon Circle */}
              <div className="w-16 h-16 rounded-full border-2 border-[#C9184A] bg-white flex items-center justify-center text-[#C9184A] mb-4 transition-all duration-300 group-hover:bg-[#C9184A] group-hover:text-white shadow-lg">
                {step.icon}
              </div>

              {/* Vertical connecting line (desktop only) */}
              <div className="hidden lg:block w-[2px] h-8 bg-[#C9184A]/30 mb-4 transition-all duration-300 group-hover:bg-[#C9184A]"></div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-[#0A0A0A] mb-3 group-hover:text-[#C9184A] transition-colors duration-300 px-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed px-4 lg:px-2">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CybersecurityProcess;

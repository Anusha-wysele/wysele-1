import { motion } from 'framer-motion';
import { Award, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import itInfrastructureWhyChoose from '../../assets/wysele-itinfrastructurewhychoose.webp';

// ... (cards/points array and component code)

const ItInfrastructureWhyChooseUs = () => {
  const points = [
    {
      title: "Enterprise-Grade Expertise",
      desc: "With over a decade of experience, we architect and manage complex infrastructure for global enterprises, ensuring peak performance and rock-solid reliability at every layer of your stack.",
      icon: <Award className="w-5 h-5 text-[#800000]" />
    },
    {
      title: "99.9% Uptime Guarantee",
      desc: "Our high-availability designs leverage redundant systems and failover protocols to guarantee near-perfect uptime, keeping your critical business operations running smoothly without interruption.",
      icon: <Zap className="w-5 h-5 text-[#800000]" />
    },
    {
      title: "Security-First Approach",
      desc: "We embed defense-in-depth security into your infrastructure, utilizing advanced encryption, zero-trust protocols, and continuous compliance monitoring to protect your sensitive data.",
      icon: <ShieldCheck className="w-5 h-5 text-[#800000]" />
    },
    {
      title: "Future-Ready Scalability",
      desc: "Build a foundation that grows with you. Our modular architectures are engineered for effortless scaling, allowing you to expand resources dynamically as your business demands evolve.",
      icon: <CheckCircle2 className="w-5 h-5 text-[#800000]" />
    }
  ];


  return (
    <section className="py-10 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Column: Content & Bullet Points */}
          <div className="w-full lg:w-1/2 space-y-2">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-[2px] bg-[#ffcc00]" />
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-500">Why Choose Us</span>
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-normal leading-tight text-gray-900">
                Your Strategic Partner for <br />
                <span className="font-normal text-[#800000]">Infrastructure Excellence</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-0">
              {points.map((point, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-2 bg-white  rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden flex flex-col gap-4"
                >
                  {/* Card Header: Icon & Title Side by Side */}
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8  flex items-center justify-center transition-colors duration-300 group-hover:bg-[#800000]/10">
                      {point.icon}
                    </div>
                    <h4 className="text-xs font-semibold text-gray-900 leading-tight">
                      {point.title}
                    </h4>
                  </div>

                  {/* Card Body: Description */}
                  <div className="flex-grow">
                    <p className="text-gray-600 text-[11px] md:text-xs leading-relaxed font-normal">
                      {point.desc}
                    </p>
                  </div>

                  {/* Hover Accent Line: Middle to Sides Expansion */}
                  <div className="absolute bottom-0 left-1/2 w-0 h-[3px] bg-[#800000] -translate-x-1/2 transition-all duration-500 group-hover:w-full" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Image & Stats */}
          <div className="w-full lg:w-1/2 relative">
            {/* Main Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="relative p-2  ">
                <img loading="lazy" src={itInfrastructureWhyChoose} 
                  alt="IT Excellence Team" 
                  className="w-full h-[400px] object-cover transition-all duration-700"
                />
                
                {/* Floating Stats Card - Positioned at Bottom Left of Image */}
                <div className="absolute bottom-10 left-0 bg-[#800000]/90 p-3 text-white shadow-xl hidden md:block max-w-[320px]">
                  <h4 className="text-xl font-normal leading-tight mb-4 uppercase">Leading the Future of IT Infrastructure.</h4>
                  <div className="w-16 h-1 bg-[#ffcc00]" />
                </div>
              </div>
            </motion.div>

            {/* Decorative background element */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#800000]/5 rounded-full blur-3xl -z-0" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ItInfrastructureWhyChooseUs;

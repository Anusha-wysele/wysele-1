import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import itInfrastructureHero from '../../assets/wysele-itinfrastructurehero.webp';

const ItInfrastructureHero = () => {
  return (
    <section className="relative min-h-[560px] lg:h-[600px] w-full bg-[#fcfcfc] font-sans overflow-hidden flex items-center pt-[150px] md:pt-16">
      
      {/* Background Graphic (Subtle Grid) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#000 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} 
      />

      {/* Image Section (Right Side) - MAINTAINING SPLIT LAYOUT */}
      <div className="absolute right-0 top-0 w-full lg:w-[55%] h-full z-0">
        <motion.div 
          initial={{ opacity: 1, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full h-full relative"
        >
          <img fetchpriority="high" src={itInfrastructureHero} 
            alt="IT Infrastructure Team" 
            className="w-full h-full object-cover object-center"
          />
          {/* Soft Fade Overlay (Fades image into white background) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[black]/20 via-[black]/20 to-transparent w-full h-full z-10" />
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-24 h-full relative z-20">
        <div className="flex flex-col lg:flex-row items-center h-full">
          
          {/* Text Area (Left Side) */}
          <div className="w-full lg:w-[45%] space-y-10 py-12 lg:py-0">
            <motion.div
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Sub-header */}
              <div className="flex items-center gap-4">
                <span className="text-[#C9184A] font-bold text-xs uppercase tracking-[0.3em]">Welcome</span>
                <div className="w-8 h-[1px] bg-gray-300" />
                <span className="text-gray-500 font-medium text-[11px] tracking-wider">Powering Modern Enterprise Infrastructure</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-xl md:text-2xl lg:text-3xl font-normal text-gray-900 leading-[1.2] tracking-tight">
                Building Reliable {" "}
                <span className="text-[#800000] font-normal">Secure & Scalable</span> <br />
                <Link to="/services/itinfrastructure" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}>IT Infrastructure</Link>
              </h1>

              {/* Descriptive Points with Access Lines */}
              <div className="space-y-4 pt-2">
                <div className="flex gap-4 group">
                  <div className="w-[3px] h-auto bg-[#EAB308] flex-shrink-0 transition-transform duration-300 group-hover:scale-y-110" />
                  <p className="text-gray-600 text-sm md:text-md font-normal leading-relaxed max-w-md">
                    Build and manage robust IT infrastructure that is secure, scalable, and engineered for high-performance enterprise workloads.
                  </p>
                </div>

                <div className="flex gap-4 group">
                  <div className="w-[3px] h-auto bg-[#EAB308] flex-shrink-0 transition-transform duration-300 group-hover:scale-y-110" />
                  <p className="text-gray-600 text-sm md:text-md font-normal leading-relaxed max-w-md">
                    Ensure business continuity and operational excellence across modern hybrid and cloud environments with our expert solutions.
                  </p>
                </div>

                <div className="flex gap-4 group">
                  <div className="w-[3px] h-auto bg-[#EAB308] flex-shrink-0 transition-transform duration-300 group-hover:scale-y-110" />
                  <p className="text-gray-600 text-sm md:text-md font-normal leading-relaxed max-w-md">
                    From network optimization to proactive monitoring, we deliver the foundation your business needs to grow with confidence.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right side spacer to protect image layout */}
          <div className="hidden lg:block lg:w-[55%] h-full" />
        </div>
      </div>

    </section>
  );
};

export default ItInfrastructureHero;

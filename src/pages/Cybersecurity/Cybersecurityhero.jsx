import { motion } from 'framer-motion';
import cybersecurity from '../../assets/wysele-cybersecurityhero.webp';

const CybersecurityHero = () => {

  return (
    <section className="relative w-full min-h-[560px] lg:h-[600px] overflow-hidden font-sans pt-[140px] md:pt-0">
      {/* Background Image with Premium Overlay */}
      <div className="relative min-h-[650px] w-full flex items-start justify-start overflow-hidden">
        <motion.img fetchpriority="high"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={cybersecurity}
          alt="Cybersecurity Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Complex Gradient Overlays for Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 z-10" />


        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full pt-[180px] md:pt-32">
          <div className="w-full lg:w-1/2 lg:max-w-2xl pr-4 lg:pr-8 lg:ml-12">
            {/* <motion.div
              initial={{ opacity: 1, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
            >
              <ShieldAlert className="w-4 h-4 text-[#C9184A]" />
              <span className="text-white text-sm font-medium tracking-wider uppercase">Next-Gen CyberSecurity</span>
            </motion.div> */}

            <motion.h1
              initial={{ opacity: 1, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="text-2xl md:text-3xl lg:text-4xl font-normal text-white leading-[1.1] mb-5 drop-shadow-lg"
            >
              Protect Your Business{" "}
              <span className="text-white">
                from Evolving Cyber Threats
              </span>
            </motion.h1>

              <p className="text-gray-300 text-sm md:text-lg font-light leading-relaxed pl-4 border-l-2 border-[#C9184A]">
                Secure applications, infrastructure, and enterprise operations to support business continuity and operational stability.
              </p>

          </div>
        </div>



      </div>

    </section>
  );
};

export default CybersecurityHero;

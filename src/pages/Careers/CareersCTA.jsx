import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

const CareersCTA = () => {
  return (
    <section className="py-20 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative bg-gradient-to-br from-[#800000] via-[#C9184A] to-[#800000] rounded-3xl p-10 md:p-16 lg:p-20 overflow-hidden shadow-2xl"
        >
          {/* Abstract background shapes */}
          <motion.div 
            animate={{ 
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" 
          />
          <motion.div 
            animate={{ 
              y: [0, 40, 0],
              x: [0, -20, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-0 left-0 w-64 h-64 bg-[#ffcc00]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" 
          />

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.3
                }
              }
            }}
            className="relative z-10 text-center max-w-3xl mx-auto space-y-8"
          >
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-3xl md:text-4xl lg:text-5xl font-normal leading-tight text-white"
            >
              Ready to Build the <br />
              <span className="font-semibold italic">Future</span> With Us?
            </motion.h2>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-white/80 text-sm md:text-base font-light leading-relaxed"
            >
              We're constantly seeking passionate individuals who are ready to push the boundaries of enterprise technology. If you don't see a role that fits but believe you belong here, reach out.
            </motion.p>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <button className="w-full sm:w-auto px-10 py-4 bg-white text-[#800000] text-sm font-semibold rounded-full hover:bg-[#ffcc00] hover:text-[#800000] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group">
                Apply Now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="w-full sm:w-auto px-10 py-4 border border-white/30 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Contact Recruitment
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default CareersCTA;

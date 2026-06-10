
import { motion } from 'framer-motion';
import fdeBriefingImg from '../../assets/wysele-Fdebriefing.webp';

export default function FdeBriefing() {
  return (
    <section className="bg-white pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-12 lg:pb-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="w-full lg:w-[55%] text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
            >
              <div className="flex items-center justify-start gap-4 mb-6">
                <div className="w-10 h-[2px] bg-[#FFB703] shrink-0" />
                <h4 className="text-[#800000] text-sm font-bold tracking-[0.2em] uppercase">
                  Trusted AI Execution Partner
                </h4>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight mb-8">
                From AI Exploration to <br className="hidden md:block" />
                <span className="text-[#800000] font-semibold">Enterprise Deployment</span>
              </h2>
              
              <div className="space-y-6 text-base sm:text-lg text-gray-600 font-light leading-[1.8] text-justify">
                <p>
                  Many AI initiatives fail to reach production due to technical complexity, resource limitations, fragmented data environments, and adoption challenges.
                </p>
                <p>
                  Our <span className="text-[#800000] font-medium">Forward-Deployed Engineers</span> bridge the gap between business objectives and technical execution. By working directly with your teams, we transform ideas into production-ready solutions that align with operational goals, compliance requirements, and long-term growth strategies.
                </p>
                <p>
                  Whether you're launching your first AI initiative or scaling enterprise-wide adoption, our team provides the expertise needed to deliver results faster and with less risk.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Image Content */}
          <div className="w-full lg:w-[45%]">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
              className="relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] group h-[350px] sm:h-[450px] lg:h-[550px]"
            >
              <img 
                src={fdeBriefingImg} 
                alt="FDE Execution Partner" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

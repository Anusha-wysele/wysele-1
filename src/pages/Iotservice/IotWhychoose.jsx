import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function IotWhychoose() {
  const cards = [
    {
      title: "Alignment & Scalability",
      desc: "We develop customized IoT solutions that align with your operational workflows, scalability goals, and industry-specific requirements.",
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8 text-[#800000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      side: "right"
    },
    {
      title: "Connectivity & Integration",
      desc: "We support secure device communication, cloud integration, centralized monitoring, and cross-platform connectivity to help you maintain operational visibility.",
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8 text-[#800000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.003 9.003 0 01-8.716 6.747M12 3a9.003 9.003 0 018.716 6.747" />
        </svg>
      ),
      side: "left"
    },
    {
      title: "Reliability & Support",
      desc: "We provide continuous monitoring, performance optimization, and technical support to maintain long-term operational efficiency and system reliability.",
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8 text-[#800000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      side: "right"
    }
  ];

  return (
    <section className="pt-0 pb-4 md:pt-0 md:pb-6 bg-white relative overflow-hidden">
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 md:mb-10 text-center mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight tracking-tight"
          >
            Why Businesses Choose Wysele for IoT Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-xs md:text-sm leading-relaxed"
          >
            Businesses choose Wysele because we develop IoT solutions that align with operational workflows, scalability goals, and industry-specific requirements.
          </motion.p>
        </div>

        {/* Alternate Staggered Pills */}
        <div className="max-w-[700px] mx-auto px-6 md:px-8">
          {cards.map((card, index) => {
            const isRight = card.side === "right";
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isRight ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="relative mb-10 md:mb-12 last:mb-0"
              >
                {/* Main Pill Wrapper */}
                <div 
                  className={`bg-[#800000] p-4 md:p-5 flex flex-col justify-center min-h-[90px] md:min-h-[100px] shadow-lg relative
                    ${isRight 
                      ? 'rounded-l-lg rounded-r-[45px] md:rounded-r-[55px] pr-16 md:pr-24 pl-5 md:pl-8 text-left' 
                      : 'rounded-r-lg rounded-l-[45px] md:rounded-l-[55px] pl-16 md:pl-24 pr-5 md:pr-8 text-left'
                    }
                  `}
                >
                  <h3 className="text-white text-xs md:text-sm font-bold uppercase tracking-wider flex items-center gap-2 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0"></span>
                    {card.title}
                  </h3>
                  <p className="text-gray-200/90 text-[11px] md:text-xs leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* Overlapping Icon Container */}
                <div 
                  className={`absolute top-1/2 -translate-y-1/2 z-20
                    ${isRight 
                      ? 'right-0 translate-x-[35%] md:translate-x-[40%]' 
                      : 'left-0 -translate-x-[35%] md:-translate-x-[40%]'
                    }
                  `}
                >
                  <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
                    
                    {/* Dashed curved trace border */}
                    <div className="absolute inset-0 border border-dashed border-[#800000]/40 rounded-full scale-[1.22] pointer-events-none"></div>
                    
                    {/* White circle containing the icon */}
                    <div className="w-full h-full rounded-full bg-white border-2 md:border-4 border-[#800000] flex items-center justify-center shadow-md relative z-10">
                      {card.icon}
                    </div>
                    
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

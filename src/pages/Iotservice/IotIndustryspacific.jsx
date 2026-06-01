import { motion } from 'framer-motion';

export default function IotIndustryspacific() {
  const cards = [
    {
      title: "Vehicle Tracking and Fleet Management",
      desc: "Our vehicle tracking systems support GPS monitoring, geofencing, fuel tracking, route optimization, and fleet visibility through centralized IoT environments."
    },
    {
      title: "Smart Home Automation",
      desc: "We develop smart automation systems that connect lighting, HVAC, security devices, appliances, and operational controls through centralized platforms."
    },
    {
      title: "Industrial IoT Solutions",
      desc: "Our Industrial IoT services help businesses improve machine monitoring, predictive maintenance, equipment tracking, and manufacturing visibility across industrial operations."
    },
    {
      title: "Healthcare IoT Applications",
      desc: "Wysele supports healthcare organizations with connected patient monitoring systems, wearable devices, medical alerts, and operational healthcare monitoring environments."
    }
  ];

  return (
    <section id="industry-applications" className="pt-0 pb-4 md:pb-6 bg-white relative overflow-hidden scroll-mt-24">
      
      {/* Decorative Background blur shapes to match the Device Integration theme */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F4F5FB] rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 z-0"></div>
      
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6 md:mb-8 text-center md:text-left lg:pl-8 xl:pl-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight tracking-tight"
          >
            Industry-Specific IoT Applications
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-xs md:text-sm leading-relaxed"
          >
            Wysele provides customized IoT solutions aligned with operational requirements across multiple industries.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="max-w-[1150px] lg:pl-8 xl:pl-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm border border-[#141C4F] p-5 md:p-6 flex flex-col hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-[#141C4F] text-base md:text-lg font-bold mb-2 tracking-wide">
                  {card.title}
                </h3>
                
                {/* Thick Dark Blue Underline */}
                <div className="w-10 h-[3px] bg-[#141C4F] mb-4"></div>
                
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

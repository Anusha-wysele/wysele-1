import { motion } from 'framer-motion';

export default function IotDeviceintegration() {
  const cards = [
    {
      title: "GPS Tracking Systems",
      desc: "Our GPS-enabled IoT solutions help businesses monitor assets, vehicles, and operational movement in real time. Features include location tracking, route monitoring, geofencing, and operational visibility across connected fleets."
    },
    {
      title: "Sensor Integration",
      desc: "We integrate temperature, environmental, motion, and industrial sensors that support continuous monitoring and operational insights. These systems help organizations improve equipment visibility and operational awareness."
    },
    {
      title: "Smart Camera Systems",
      desc: "Wysele develops camera-enabled IoT solutions for surveillance, inspection, monitoring, and automated operational tracking across connected environments."
    },
    {
      title: "Actuator and Control Systems",
      desc: "We help businesses automate connected operations through actuator integration and intelligent control systems that improve efficiency and remote management capabilities."
    },
    {
      title: "Embedded Hardware Development",
      desc: "Our team develops embedded IoT solutions using microcontrollers, industrial hardware, Arduino, ESP32, and edge devices designed around operational requirements."
    }
  ];

  return (
    <section id="device-integration" className="pt-0 pb-6 md:pb-10 bg-white relative overflow-hidden scroll-mt-24">
      
      {/* Decorative Background Swoosh (Mimicking the screenshot) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F4F5FB] rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 z-0"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F4F5FB] rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 z-0"></div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6 md:mb-8 text-center md:text-left lg:pl-8 xl:pl-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl font-bold text-gray-900 mb-5 leading-tight tracking-tight"
          >
            Device Integration and Embedded IoT Solutions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-[15px] sm:text-base md:text-lg leading-relaxed"
          >
            Connected devices form the foundation of every IoT ecosystem. Wysele develops and integrates intelligent hardware systems that collect operational data and support automation across connected environments.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="max-w-[1150px] lg:pl-8 xl:pl-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
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
                
                {/* Thick Dark Blue Underline from Screenshot */}
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

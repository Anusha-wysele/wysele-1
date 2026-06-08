import { motion } from 'framer-motion';
import connectivityBg from '../../assets/wysele-iotconnectivity.webp';

export default function IotConnectivity() {
  const technologies = [
    "WiFi integration",
    "4G and 5G connectivity",
    "LoRaWAN communication",
    "Zigbee networks",
    "Bluetooth Low Energy",
    "MQTT protocol integration"
  ];

  return (
    <section id="connectivity" className="relative py-4 md:py-6 overflow-hidden bg-gray-900 scroll-mt-24">
      
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img loading="lazy" src={connectivityBg} 
          alt="Secure IoT Connectivity" 
          className="w-full h-full object-cover"
        />
        {/* Light overlay for readability */}
        <div className="absolute inset-0 bg-black/35"></div>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Side: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 text-center lg:text-left space-y-4 lg:pl-8 xl:pl-12"
          >
            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight tracking-tight">
              Secure IoT Connectivity and Communication
            </h2>
            
            <div className="w-12 h-1 bg-[#800000] mx-auto lg:mx-0"></div>
            
            <div className="space-y-3 text-gray-300 text-xs md:text-sm leading-relaxed">
              <p>
                Reliable communication is essential for maintaining stable IoT operations. Wysele implements secure connectivity frameworks that support smooth communication between devices, cloud systems, and operational applications.
              </p>
              <p>
                We select communication technologies based on deployment scale, connectivity range, power efficiency, and operational requirements to ensure reliable IoT performance.
              </p>
            </div>
          </motion.div>

          {/* Right Side: Bullet cards on the image */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 p-5 md:p-6 lg:pr-8 xl:pr-12"
          >
            <h3 className="text-white text-sm md:text-base font-semibold mb-4 tracking-wide">
              Our supported connectivity technologies include:
            </h3>
            
            <ul className="space-y-2">
              {technologies.map((tech, index) => (
                <li 
                  key={index}
                  className="flex items-center gap-2 text-white/90 text-xs md:text-sm bg-white/5 hover:bg-white/15 p-2 rounded-lg border border-white/5 transition-all duration-300"
                >
                  {/* Subtle maroon point indicator */}
                  <span className="w-1.5 h-1.5 rounded-full bg-[#800000] shrink-0"></span>
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

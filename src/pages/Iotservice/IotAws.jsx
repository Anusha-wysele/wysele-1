import { motion } from 'framer-motion';

export default function IotAws() {
  return (
    <section id="cloud-integration" className="pt-16 pb-16 md:pt-20 md:pb-24 bg-white relative overflow-hidden scroll-mt-24">
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6 md:mb-8 text-center md:text-left lg:pl-8 xl:pl-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight tracking-tight"
          >
            IoT Cloud <span className="text-[#4BDE7B]">Integration</span> & <span className="text-[#141C4F]">Data Management</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-[15px] sm:text-base leading-relaxed"
          >
            Scale your infrastructure with seamless cloud connectivity and intelligent edge processing. We design robust architectures that ensure your data is processed, analyzed, and stored securely.
          </motion.p>
        </div>

        {/* Connecting Nodes Grid */}
        <div className="max-w-[1150px] lg:pl-8 xl:pl-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
            
            {/* Left Column */}
            <div className="relative">
              {/* Vertical Dashed Line linking circles */}
              <div className="absolute left-7 top-7 bottom-7 w-[2px] border-l-2 border-dashed border-indigo-300 z-0"></div>
              
              <div className="space-y-12">
                {/* AWS IoT Integration (Blue circle) */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative flex gap-6 items-start"
                >
                  <div className="w-14 h-14 rounded-full border-2 border-blue-600 flex items-center justify-center bg-white shadow-sm relative z-10 shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[#141C4F] text-lg md:text-xl font-bold mb-2 tracking-wide">
                      AWS IoT Integration
                    </h3>
                    <p className="text-gray-600 text-[14px] md:text-[15px] leading-relaxed">
                      We help businesses build scalable IoT environments using AWS IoT services that support device communication, monitoring, and cloud-based operational management.
                    </p>
                  </div>
                </motion.div>

                {/* Edge Computing Services (Green circle) */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative flex gap-6 items-start"
                >
                  <div className="w-14 h-14 rounded-full border-2 border-[#4BDE7B] flex items-center justify-center bg-white shadow-md relative z-10 shrink-0">
                    <svg className="w-6 h-6 text-[#4BDE7B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[#141C4F] text-lg md:text-xl font-bold mb-2 tracking-wide">
                      Edge Computing Services
                    </h3>
                    <p className="text-gray-600 text-[14px] md:text-[15px] leading-relaxed">
                      Wysele develops edge computing environments that process operational data closer to connected devices, improving response times and reducing latency in critical systems.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column */}
            <div className="relative">
              {/* Vertical Dashed Line linking circles */}
              <div className="absolute left-7 top-7 bottom-7 w-[2px] border-l-2 border-dashed border-indigo-300 z-0"></div>
              
              <div className="space-y-12">
                {/* Azure IoT Solutions (Blue circle) */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative flex gap-6 items-start"
                >
                  <div className="w-14 h-14 rounded-full border-2 border-blue-600 flex items-center justify-center bg-white shadow-md relative z-10 shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.003 9.003 0 01-8.716 6.747M12 3a9.003 9.003 0 018.716 6.747" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[#141C4F] text-lg md:text-xl font-bold mb-2 tracking-wide">
                      Azure IoT Solutions
                    </h3>
                    <p className="text-gray-600 text-[14px] md:text-[15px] leading-relaxed">
                      Our Azure IoT services enable secure device connectivity, real-time operational insights, and efficient cloud-based management across enterprise environments.
                    </p>
                  </div>
                </motion.div>

                {/* Real-Time Analytics (Green circle) */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative flex gap-6 items-start"
                >
                  <div className="w-14 h-14 rounded-full border-2 border-[#4BDE7B] flex items-center justify-center bg-white shadow-md relative z-10 shrink-0">
                    <svg className="w-6 h-6 text-[#4BDE7B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[#141C4F] text-lg md:text-xl font-bold mb-2 tracking-wide">
                      Real-Time Analytics
                    </h3>
                    <p className="text-gray-600 text-[14px] md:text-[15px] leading-relaxed">
                      We help organizations transform connected device data into dashboards, alerts, reports, and operational insights that improve business visibility and decision-making.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

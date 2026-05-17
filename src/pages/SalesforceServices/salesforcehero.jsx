import React from 'react';
import { motion } from 'framer-motion';

const SalesforceHero = () => {
  const features = [
    {
      title: "Custom CRM",
      desc: "Tailored Salesforce solutions aligning perfectly with your unique business goals and workflows."
    },
    {
      title: "Automation",
      desc: "Streamlined operational workflows that eliminate manual tasks and boost team productivity."
    },
    {
      title: "Integrations",
      desc: "Connect all your tools seamlessly to create a unified, powerful enterprise ecosystem."
    },
    {
      title: "Analytics",
      desc: "Real-time business insights and reporting to drive informed, data-backed decisions."
    }
  ];

  return (
    <section className="relative min-h-[560px] lg:h-[600px] w-full overflow-hidden bg-black font-sans">
      {/* Background Image */}
      <motion.img 
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        src="https://images.pexels.com/photos/7709157/pexels-photo-7709157.jpeg"
        alt="Salesforce Solutions" 
        className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
      />
      {/* Left-to-right dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
      
      {/* Main Content Container */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col justify-between pt-32 pb-16">
        
        {/* Top Section: Text & Contact Box */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 flex-grow w-full">
          
          {/* Left Column: Headings & Description */}
          <div className="w-full lg:w-3/5 text-left space-y-8">
            
            {/* Pre-Heading */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-[2px] bg-[#ffcc00]" />
              <span className="text-[white] text-xs md:text-sm font-semibold tracking-[0.2em] uppercase">
                Next-Gen Salesforce CRM
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl lg:text-4xl font-normal text-white leading-tight uppercase tracking-wide"
            >
              Salesforce Solutions That {" "}
              <span className="text-[white] font-semibold">Drive Real Business Growth.</span>
            </motion.h1>
            
            {/* Description */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pl-6 border-l-[3px] border-[#ffcc00] max-w-2xl"
            >
              <p className="text-gray-300 text-sm md:text-md font-light leading-relaxed">
                Design, implement, and scale Salesforce tailored to your business. 
                Automate workflows, improve customer insights, and accelerate revenue
                Optimize operations with seamless integrations and real-time analytics for smarter decision-making.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section: Features Row (Replacing Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mt-12 w-full">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="space-y-3"
            >
              {/* Feature Title with Dot */}
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffcc00] flex-shrink-0" />
                <h4 className="text-white text-xs md:text-sm font-bold tracking-widest uppercase">
                  {feature.title}
                </h4>
              </div>
              
              {/* Feature Description */}
              <p className="text-gray-200 text-sm font-light leading-relaxed pl-[1.35rem]">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SalesforceHero;

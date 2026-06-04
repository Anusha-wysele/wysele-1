import React from "react";
import { motion } from "framer-motion";
import contactUsHeroImg from "../../assets/wysele-contactushero.webp";

const ContactHero = () => {
  return (
    <section className="relative w-full min-h-screen lg:h-screen overflow-hidden m-0 p-0">
      {/* Full-width Background Image Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={contactUsHeroImg}
          alt="Contact Wysele"
          className="w-full h-full object-cover block"
        />
        {/* Subtle Overlay and Text */}
        <div className="absolute inset-0 bg-black/10 flex items-end justify-center pb-24 md:pb-32">
          <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16 w-full flex justify-center">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              className="text-cyan-200 text-2xl md:text-4xl font-semibold uppercase tracking-[0.2em] select-none"
            >
              Contact our team
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;

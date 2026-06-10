import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import sapVimImg from "../../../assets/wysele-sapvimhero.webp";
import sapBrimImg from "../../../assets/wysele-sapbrimhero.webp";
export default function SapVimhero() {
  const VIM_BRIM_CONTENT = [
    {
      id: "vim",
      title: "Transform Your Financial Workflows with SAP VIM",
      desc1: "At Wysele, we provide specialized SAP Vendor Invoice Management (VIM) solutions to streamline and automate your invoice processing operations. Our services are designed to reduce manual effort, enhance accuracy, and accelerate approval cycles, ensuring efficient accounts payable management.",
      desc2: "By leveraging SAP VIM, we help organizations improve financial visibility, minimize errors, and maintain compliance with regulatory standards—enabling faster and more reliable financial operations.",
      image: sapVimImg,
      tag: "SAP VIM"
    },
    {
      id: "brim",
      title: "Optimize Billing and Revenue with SAP BRIM",
      desc1: "Wysele delivers advanced SAP Billing and Revenue Innovation Management (BRIM) solutions to simplify complex billing processes and drive revenue growth. Our expertise enables businesses to manage dynamic pricing models, automate billing cycles, and gain real-time insights into revenue streams.",
      desc2: "With SAP BRIM, we help organizations enhance billing efficiency, improve financial transparency, and adapt quickly to evolving business models—ensuring sustainable and scalable growth.",
      image: sapBrimImg,
      tag: "SAP BRIM"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % VIM_BRIM_CONTENT.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [VIM_BRIM_CONTENT.length]);

  return (
    <section className="relative w-full min-h-screen lg:h-screen bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row h-full w-full">

        {/* Left Side: Image Slider (50%) */}
        <div className="w-full lg:w-1/2 h-[45vh] lg:h-full relative overflow-hidden bg-gray-900">
          <AnimatePresence initial={false}>
            <motion.img fetchpriority="high"
              key={currentSlide}
              src={VIM_BRIM_CONTENT[currentSlide].image}
              alt={VIM_BRIM_CONTENT[currentSlide].tag}
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1.1 }}
              exit={{ opacity: 0, scale: 1.15 }}
              transition={{
                opacity: { duration: 2.5, ease: "easeInOut" },
                scale: { duration: 10, ease: "linear" }
              }}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-black/10 z-10" />
          </AnimatePresence>

          {/* Tag Overlay */}
          <div className="absolute top-12 left-12 z-20">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentSlide}
                initial={{ opacity: 1, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-[10px] font-black tracking-[0.4em] uppercase text-white/60"
              >
                {VIM_BRIM_CONTENT[currentSlide].tag}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Content Slider (50%) */}
        <div className="w-full lg:w-1/2 h-auto lg:h-full relative flex items-end pb-12 bg-white px-6 md:px-20 lg:px-32 pt-12 lg:pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 1, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md"
            >
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 leading-[1.2] mb-6 tracking-tight">
                {VIM_BRIM_CONTENT[currentSlide].title.split(' ').map((word, i, arr) => (
                  <span key={i} className={i >= arr.length - 2 ? "text-[#800000] font-normal" : ""}>
                    {word}{' '}
                  </span>
                ))}
              </h1>

              <div className="space-y-4">
                <p className="text-gray-700 text-xs md:text-sm font-normal leading-relaxed">
                  {VIM_BRIM_CONTENT[currentSlide].desc1}
                </p>
                <p className="text-gray-600 text-xs md:text-sm font-normal leading-relaxed">
                  {VIM_BRIM_CONTENT[currentSlide].desc2}
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="mt-16 flex items-center gap-4">
                <div className="w-24 h-[1px] bg-gray-100 relative overflow-hidden">
                  <motion.div
                    key={currentSlide}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 8, ease: "linear" }}
                    className="absolute inset-y-0 left-0 bg-[#800000]"
                  />
                </div>
                <span className="text-[10px] font-bold text-gray-300">
                  0{currentSlide + 1} / 02
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

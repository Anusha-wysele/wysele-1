import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import HeadingBracket from "../../common/HeadingBracket";

const faqItems = [
  {
    key: "faq1",
    question: "What does Wysele actually do?",
    answer: "Wysele partners with enterprises to engineer intelligent SAP ecosystems, cloud-native solutions, and AI-driven strategies. We deliver outcomes that create lasting competitive advantage across every market we serve.",
  },
  {
    key: "faq2",
    question: "Who is Wysele suitable for?",
    answer: "Wysele is suitable for ambitious enterprises and organizations looking to undergo digital transformation, modernize their infrastructure, or implement complex SAP solutions with agility and precision.",
  },
  {
    key: "faq3",
    question: "How does a project with you work?",
    answer: "We start with a comprehensive architectural discovery phase, followed by agile development sprints. Our team works closely with stakeholders to ensure seamless integration, rigorous testing, and continuous deployment.",
  },
  {
    key: "faq4",
    question: "What does it cost to work with Wysele?",
    answer: "Pricing depends on the scope, timeline, and technical complexity of your specific requirements. We offer flexible engagement models tailored to provide maximum ROI for your organization. Contact our team for a detailed proposal.",
  },
  {
    key: "faq5",
    question: "What tools do you use?",
    answer: "We leverage a modern, enterprise-grade technology stack including SAP, AWS, React, Node.js, and advanced AI frameworks, ensuring scalable, secure, and high-performance solutions.",
  },
  {
    key: "faq6",
    question: "Why Wysele and not another agency?",
    answer: "Unlike traditional agencies, we combine deep domain expertise with rapid digital execution. Our multi-disciplinary team brings a strategic, outcome-focused approach rather than just fulfilling technical requirements.",
  }
];

export default function Faq() {
  const [openKey, setOpenKey] = useState(null);

  const toggle = (key) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <section className="bg-white py-10 px-6 lg:px-12 w-full flex flex-col items-center font-inter">
      <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto w-full">

        {/* FAQ Badge */}
        <div className="mb-6 rounded-full bg-[#e2e8f0] px-4 py-1.5 border border-[#cbd5e1] shadow-sm">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#475569]">FAQ</span>
        </div>

        {/* Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "64px" }}>
          <HeadingBracket size={56} style={{ transform: "translate(40px, -20px)" }} />
          <h2 className="text-4xl md:text-5xl font-medium text-[#111827] tracking-tight text-center">
            Your questions, our answers
          </h2>
        </div>

        {/* Accordion - Two Column Layout */}
        <div className="w-full flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="flex-1">
            {faqItems.filter((_, index) => index % 2 === 0).map((item) => {
              const isOpen = openKey === item.key;

              return (
                <div key={item.key} className="border-b border-[#e2e8f0]">
                  <button
                    onClick={() => toggle(item.key)}
                    className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="text-[17px] md:text-lg font-normal text-[#111827] pr-8">
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex-shrink-0 text-[#111827]"
                    >
                      <Plus size={22} strokeWidth={1.5} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-[#4b5563] text-sm md:text-base leading-relaxed pr-8">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="flex-1">
            {faqItems.filter((_, index) => index % 2 === 1).map((item) => {
              const isOpen = openKey === item.key;

              return (
                <div key={item.key} className="border-b border-[#e2e8f0]">
                  <button
                    onClick={() => toggle(item.key)}
                    className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="text-[17px] md:text-lg font-normal text-[#111827] pr-8">
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex-shrink-0 text-[#111827]"
                    >
                      <Plus size={22} strokeWidth={1.5} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-[#4b5563] text-sm md:text-base leading-relaxed pr-8">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

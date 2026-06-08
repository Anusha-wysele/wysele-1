import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FdeFaq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is Forward-Deployed Engineering?",
      answer: "Forward-Deployed Engineering is a delivery model where experienced engineers work directly with client teams to design, implement, deploy, and optimize technology solutions."
    },
    {
      question: "How is FDE different from traditional consulting?",
      answer: "Traditional consulting often focuses on recommendations. FDE combines strategy with hands-on implementation and execution."
    },
    {
      question: "Can FDE support enterprise AI adoption?",
      answer: "Yes. Our teams help organizations identify opportunities, build solutions, deploy securely, and scale adoption across the enterprise."
    },
    {
      question: "Which industries benefit from FDE services?",
      answer: "Manufacturing, Healthcare, Financial Services, Retail, Logistics, Energy, Technology, Public Sector, and Professional Services organizations can benefit from FDE engagement models."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="bg-gray-50 pt-10 pb-10 lg:pt-16 lg:pb-16 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-10">
        <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-4 mb-4">
                <div className="w-10 h-[2px] bg-[#FFB703]" />
                <h4 className="text-[#800000] text-sm font-bold tracking-[0.2em] uppercase">
                    FAQ
                </h4>
                <div className="w-10 h-[2px] bg-[#FFB703]" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight">
                Frequently Asked <span className="text-[#800000]">Questions</span>
            </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
              >
                <span className="text-[17px] font-semibold text-gray-900 pr-8 leading-tight">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100"
                >
                  <ChevronDown className="w-5 h-5 text-[#800000]" strokeWidth={2.5} />
                </motion.div>
              </button>
              
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-gray-600 text-[15px] leading-relaxed font-normal">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FdeFaq;

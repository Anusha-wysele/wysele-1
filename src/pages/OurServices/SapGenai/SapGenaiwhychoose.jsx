import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const services = [
    { title: "1. Customized AI Solutions", description: "We develop tailored AI models specifically designed to address your business's unique challenges and objectives, ensuring that you get the most relevant and effective solutions." },
    { title: "2. Advanced Automation", description: "By implementing intelligent automation, we help streamline your operations, reduce manual intervention, and significantly enhance overall productivity, enabling your team to focus on more strategic tasks." },
    { title: "3. Data-Driven Decision Making", description: "Our services allow you to utilize sophisticated AI algorithms to analyze extensive datasets, leading to accurate insights and forecasts that inform critical business decisions." },
    { title: "4. Natural Language Processing (NLP)", description: "Enhance customer interactions and satisfaction with advanced AI-driven chatbots, voice assistants, and language models that can understand and respond to customer inquiries in real-time, providing a seamless experience." },
    { title: "5. Creative Content Generation", description: "Our AI tools are capable of efficiently producing high-quality written content, images, and videos tailored to your brand's identity and audience preferences, saving you time and resources while boosting your marketing efforts." },
];

export default function SapGenaiwhychoose() {
    const headingRef = useRef(null);
    const isHeadingInView = useInView(headingRef, { once: true, margin: "-80px" });
    const headingWords = "Why Choose Our Gen AI Services?".split(" ");

    return (
        <div className="bg-white py-16">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                    {/* Left side: sticky heading + description */}
                    <div className="w-full lg:w-1/2 lg:sticky lg:top-32">
                        <h2
                            className="text-3xl font-normal text-gray-900 mb-6 flex flex-wrap gap-x-2"
                            ref={headingRef}
                        >
                            {headingWords.map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: i * 0.07, ease: [0.33, 1, 0.68, 1] }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </h2>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Wysele's Gen AI Services are purpose-built to help enterprises unlock the transformative power of Generative AI. From intelligent automation to deep analytics and content generation, we craft AI-driven solutions tailored to your unique business goals — enabling smarter decisions, faster workflows, and sustainable growth.
                        </p>
                    </div>

                    {/* Right side: scrollable list of services */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                        <div className="space-y-4 pl-8">
                            {services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    className="relative flex items-center group"
                                    whileHover="hover"
                                    initial="initial"
                                >
                                    {/* + / Arrow indicator on the vertical line */}
                                    <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center z-10">
                                        <span className="absolute text-gray-400 text-lg font-light transition-all duration-300 group-hover:opacity-0 group-hover:scale-0">+</span>
                                        <ArrowRight className="absolute text-[#455982] opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" size={16} />
                                    </div>

                                    {/* Card */}
                                    <div className="relative border border-gray-200 rounded-lg p-3 transition-all duration-300 hover:-translate-y-1 overflow-hidden w-full">
                                        {/* Sliding background overlay */}
                                        <motion.div
                                            variants={{
                                                initial: { clipPath: "inset(0 100% 0 0)" },
                                                hover: { clipPath: "inset(0 0 0 0)" }
                                            }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                            className="absolute inset-0 bg-[#455982] rounded-lg"
                                        />
                                        <div className="relative z-10">
                                            <h3 className="text-xs font-bold text-gray-900 mb-1 group-hover:text-white transition-colors duration-300">{service.title}</h3>
                                            <p className="text-[11px] text-gray-600 leading-tight group-hover:text-white/90 transition-colors duration-300">{service.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

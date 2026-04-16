import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SERVICES_PAGE_IMAGES } from '../../../components/common/data';

const services = [
    { title: "SAP S/4HANA Migration and Upgrades", description: "Transitioning to SAP S/4HANA can be a game-changer, and our experts ensure that this migration is seamless. We guide you through every phase of the process, starting with comprehensive system analysis and planning, moving through the technical setup, and continuing with robust post-migration support to guarantee that your organization maximizes the benefits of the new system." },
    { title: "Custom Development and Integration", description: "Our team specializes in creating custom solutions, including ABAP programming tailored to your specifications, Fiori app development for user-friendly interfaces, and SAP Cloud Platform integrations that connect disparate systems. We work closely with you to ensure our developments align perfectly with your unique operational requirements." },
    { title: "SAP Infrastructure Management", description: "We design, deploy, and maintain high-performance SAP infrastructures that are secure, scalable, and optimized for efficiency. Our consultants leverage best practices and the latest technologies to ensure that your SAP systems perform at their best, adapting to the evolving landscape of your business." },
    { title: "Data Migration", description: "Transitioning data from legacy systems can be daunting. We execute data migration strategies that ensure a smooth transition without data loss or integrity issues, maintaining the reliability and accuracy of your crucial business information." },
    { title: "SAP Cloud Solutions", description: "As businesses increasingly adopt cloud technologies, we offer a range of cloud-based SAP solutions, including SAP Cloud Platform and SAP Business Technology Platform (BTP). Our solutions are designed to enhance flexibility and scalability, meeting the diverse demands of your growing organization." },
    { title: "Performance Optimization", description: "Our consultants conduct thorough evaluations to identify performance bottlenecks within your SAP systems. We implement optimization strategies to improve response times and efficiency, enabling faster decision-making and improved overall productivity." }
];

const TechnicalConsulting = () => {
    const sectionRef = useRef(null);

    const heroHeadingRef = useRef(null);
    const isHeroHeadingInView = useInView(heroHeadingRef, { once: true, margin: "-80px" });
    const heroWords = "Transform, Optimize, and Scale with SAP – The Wysele Way".split(" ");

    const servicesHeadingRef = useRef(null);
    const isServicesHeadingInView = useInView(servicesHeadingRef, { once: true, margin: "-80px" });
    const servicesWords = "Technical SAP Consulting Services".split(" ");

    return (
        <div className="bg-white" ref={sectionRef}>
            {/* Full Width Image with Overlay Text */}
            <div className="w-full relative">
                <img
                    src={SERVICES_PAGE_IMAGES.technicalConsulting}
                    alt="Technical SAP Consulting"
                    className="w-full h-[80vh] object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                {/* Bottom-left Cylinder - vertical */}
                <div className="absolute bottom-0 left-0 w-12 h-32 rounded-full border border-white/30 bg-white/10" />
                {/* Bottom-left Cylinder - horizontal */}
                <div className="absolute bottom-0 left-0 w-32 h-12 rounded-full border border-white/30 bg-white/10" />
                {/* Top-right Cylinder - horizontal */}
                <div className="absolute top-0 right-0 w-32 h-12 rounded-full border border-white/30 bg-white/10" />
                {/* Top-right Cylinder - vertical */}
                <div className="absolute top-0 right-0 w-12 h-32 rounded-full border border-white/30 bg-white/10" />
                <div className="absolute inset-0 flex items-center justify-center px-6 md:px-16">
                    <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                        <div className="w-full md:w-1/2 md:pl-32 lg:pl-48 xl:pl-64">
                            <h1 className="text-2xl md:text-3xl font-extralight text-white mb-4 flex flex-wrap gap-x-2" ref={heroHeadingRef}>
                                {heroWords.map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isHeroHeadingInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.4, delay: i * 0.07, ease: [0.33, 1, 0.68, 1] }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </h1>
                        </div>
                        <div className="w-full md:w-1/2 text-left md:border-l md:border-white/20 md:pl-8 py-4">
                            <div className="text-sm md:text-base text-white/90 leading-relaxed space-y-4">
                                <p>
                                    Whether you're implementing from the ground up, upgrading existing systems, or driving digital transformation,
                                </p>
                                <p>
                                    Wysele delivers flexible, expert-led SAP solutions designed to streamline operations,
                                </p>
                                <p>
                                    enhance performance, and create measurable business impact.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Angled Color Accent at the bottom */}
                <div
                    className="absolute bottom-0 right-0 w-full h-32 sm:h-48 md:h-64 lg:h-80 bg-[#6b0d2b]/80 backdrop-blur-sm"
                    style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}
                ></div>
            </div>

            <div className="py-16 px-6 md:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="flex gap-16 items-start">
                        {/* Left side heading and description */}
                        <div className="w-1/2 sticky top-32">
                            <h2 className="text-3xl font-normal text-gray-900 mb-6 flex flex-wrap gap-x-2" ref={servicesHeadingRef}>
                                {servicesWords.map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isServicesHeadingInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.4, delay: i * 0.07, ease: [0.33, 1, 0.68, 1] }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Wysele delivers comprehensive technical SAP consulting services designed to strengthen and future-proof your SAP landscape. From S/4HANA migrations and custom development to infrastructure management, data migration, and cloud solutions, our experts ensure seamless integration, optimal performance, and scalability across your systems. By combining deep technical expertise with industry best practices, Wysele helps streamline operations, enhance system efficiency, and empower your organization to adapt, innovate, and grow in an ever-evolving digital environment.
                            </p>
                        </div>

                        <div className="w-1/2 relative">
                            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                            <div className="space-y-4 pl-4">
                                {services.map((service, index) => (
                                    <div key={index} className="relative border border-gray-200 rounded-lg p-3 bg-white hover:shadow-lg hover:shadow-black/30 hover:border-gray-400 transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-black rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <h3 className="text-xs font-bold text-gray-900 mb-1">{service.title}</h3>
                                        <p className="text-[11px] text-gray-600 leading-tight">{service.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechnicalConsulting;

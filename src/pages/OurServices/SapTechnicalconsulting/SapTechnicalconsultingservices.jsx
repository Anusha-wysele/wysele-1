import React from 'react';
import { motion } from 'framer-motion';

const SERVICES = [
    {
        id: 1,
        title: "SAP S/4HANA Migration and Upgrades",
        description: "Transitioning to SAP S/4HANA can be a game-changer, and our experts ensure that this migration is seamless. We guide you through every phase of the process, starting with comprehensive system analysis and planning, moving through the technical setup, and continuing with robust post-migration support to guarantee that your organization maximizes the benefits of the new system."
    },
    {
        id: 2,
        title: "Custom Development and Integration",
        description: "Our team specializes in creating custom solutions, including ABAP programming tailored to your specifications, Fiori app development for user-friendly interfaces, and SAP Cloud Platform integrations that connect disparate systems. We work closely with you to ensure our developments align perfectly with your unique operational requirements."
    },
    {
        id: 3,
        title: "SAP Infrastructure Management",
        description: "We design, deploy, and maintain high-performance SAP infrastructures that are secure, scalable, and optimized for efficiency. Our consultants leverage best practices and the latest technologies to ensure that your SAP systems perform at their best, adapting to the evolving landscape of your business."
    },
    {
        id: 4,
        title: "Data Migration",
        description: "Transitioning data from legacy systems can be daunting. We execute data migration strategies that ensure a smooth transition without data loss or integrity issues, maintaining the reliability and accuracy of your crucial business information."
    },
    {
        id: 5,
        title: "SAP Cloud Solutions",
        description: "As businesses increasingly adopt cloud technologies, we offer a range of cloud-based SAP solutions, including SAP Cloud Platform and SAP Business Technology Platform (BTP). Our solutions are designed to enhance flexibility and scalability, meeting the diverse demands of your growing organization."
    },
    {
        id: 6,
        title: "Performance Optimization",
        description: "Our consultants conduct thorough evaluations to identify performance bottlenecks within your SAP systems. We implement optimization strategies to improve response times and efficiency, enabling faster decision-making and improved overall productivity."
    }
];

export default function SapTechnicalconsultingservices() {
    return (
        <section className="py-12 bg-white overflow-hidden">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-12 lg:px-20">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight">
                        Our SAP <span className="font-semibold text-[#800000]">Technical Services</span>
                    </h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SERVICES.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/80 backdrop-blur-sm border border-[#800000] p-5 md:p-6 flex flex-col hover:shadow-xl transition-shadow duration-300"
                        >
                            <h3 className="text-[#800000] text-base md:text-lg font-bold mb-2 tracking-wide min-h-[48px] flex items-center">
                                {service.title}
                            </h3>
                            
                            {/* Thick Maroon Underline */}
                            <div className="w-10 h-[3px] bg-[#800000] mb-4"></div>
                            
                            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}

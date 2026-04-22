import React from 'react';
import { motion } from 'framer-motion';
import Cylinderr from '../../../components/common/Cylinderr';

const services = [
    {
        title: "Process Management and Optimization",
        description: "Our experienced consultants will work closely with your team to facilitate the implementation and integration of SAP BTP within your existing infrastructure. We ensure that your systems communicate effectively across various applications and environments, which enables enhanced collaboration, smarter decision-making, and increased operational efficiency. This holistic approach not only streamlines your processes but also lays the groundwork for future technological advancements."
    },
    {
        title: "Process Mining",
        description: "In today’s data-driven landscape, effective data management is crucial. Our solutions focus on integrating diverse data sources—both internal and external—into a unified platform. We utilize real-time data flows, ensuring that critical information is always accessible, accurate, and actionable. By delivering deep insights through analytical tools, we empower your organization to make informed business decisions that drive growth and innovation."
    },
    {
        title: "Process Automation",
        description: "Leverage the capabilities of SAP Analytics Cloud to transform your data into meaningful insights. We provide tailored dashboards, visualizations, and reporting tools that allow for real-time analysis and performance tracking. Our goal is to enable your team to derive actionable intelligence from vast datasets, helping to uncover trends, identify opportunities, and improve strategic planning."
    },
    {
        title: "Collaboration and Governance",
        description: "Embrace the future of business with SAP’s AI and machine learning capabilities designed to automate processes and elevate customer experiences. We help you implement advanced AI solutions that analyze data patterns, predict trends, and deliver personalized insights. By leveraging these technologies, your organization can enhance operational efficiency, reduce costs, and achieve a competitive edge in the market."
    },
    {
        title: "Change Management and Continuous Improvement",
        description: "Our team specializes in creating bespoke applications that cater to your unique business requirements. Utilizing SAP’s low-code and no-code development platforms, we streamline the application development process, enabling rapid deployment and easy scalability. Our solutions are designed not only to address immediate needs but also to evolve alongside your business, facilitating agility in a fast-changing environment."
    },
    {
        title: "Integration with SAP S/4HANA",
        description: "We recognize the importance of a robust cloud infrastructure for your SAP BTP environment. Our team will optimize your cloud setup to ensure peak performance and scalability, aligning it with your business goals. We offer ongoing monitoring, maintenance, and optimization services to enhance system reliability and security, allowing your organization to focus on innovation rather than infrastructure."
    }
];

const SapSignavioServices = () => {
    return (
        <section className="pt-6 md:pt-8 pb-6 md:pb-8 bg-gray-50">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                <div className="text-center mb-8">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl md:text-3xl font-normal text-gray-900 mb-2 flex items-center justify-center gap-4"
                    >
                        <Cylinderr className="w-4 h-10 rounded-sm" />
                        Our SAP Signavio Services
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
                    >
                        A comprehensive approach to analyze, optimize, and transform your business processes for greater efficiency and agility
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="rounded-lg relative flex flex-col h-full overflow-hidden group shadow-md hover:shadow-xl cursor-pointer bg-[#1C1216]"
                        >
                            {/* Visual Layer - Colored Background (Animates to fill on hover) */}
                            <div className="absolute top-5 left-5 right-0 bottom-0 bg-[#8B3A5E] border border-[#8B3A5E] rounded-tl-lg lg:rounded-br-lg transition-all duration-300 ease-in-out group-hover:top-0 group-hover:left-0 group-hover:rounded-none z-10" />

                            {/* Content Layout - Static structural padding to enforce height rigidly without reflow */}
                            <div className="pt-5 pl-5 relative z-20 flex flex-col h-full">
                                
                                {/* Content Inner - Translates visually on hover instantly matching the plain background */}
                                <div className="p-4 lg:p-5 flex-1 flex flex-col transition-transform duration-300 ease-in-out group-hover:-translate-x-5 group-hover:-translate-y-5">
                                    <h3 className="text-[15px] font-semibold text-white mb-2 leading-tight transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <p className="text-white/80 text-[10.5px] leading-snug font-normal mb-4 flex-1">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SapSignavioServices;

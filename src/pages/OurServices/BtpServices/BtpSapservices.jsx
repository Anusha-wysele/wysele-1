import { motion } from 'framer-motion';
import { BarChart3, Cloud, Code2, Cpu, Database, Settings2 } from 'lucide-react';
import btpServiceHoverImg from "../../../assets/wysele-sapbtpservices1.webp";
import btpDataMgmtHoverImg from "../../../assets/wysele-sapbtpservices2.webp";
import btpAnalyticsHoverImg from "../../../assets/wysele-sapbtpservices3.webp";
import btpAiHoverImg from "../../../assets/wysele-sapbtpservices4.webp";
import btpAppDevHoverImg from "../../../assets/wysele-sapbtpservices5.webp";
import btpCloudHoverImg from "../../../assets/wysele-sapbtpservices6.webp";

const btpServicesList = [
    {
        title: "BTP Implementation & Integration",
        description: "Our consultants will work closely with your team to facilitate the implementation and integration of SAP BTP within your existing infrastructure, ensuring systems communicate effectively.",
        icon: Settings2
    },
    {
        title: "Data Management & Integration",
        description: "Integrate diverse data sources into a unified platform. We utilize real-time data flows, ensuring that critical information is always accessible, accurate, and actionable.",
        icon: Database
    },
    {
        title: "Analytics & Business Intelligence",
        description: "Leverage SAP Analytics Cloud to transform data into meaningful insights. We provide tailored dashboards and visualizations that allow for real-time analysis.",
        icon: BarChart3
    },
    {
        title: "AI & Machine Learning Solutions",
        description: "Embrace the future with SAP’s AI capabilities designed to automate processes. We help you implement advanced solutions that analyze data patterns and predict trends.",
        icon: Cpu
    },
    {
        title: "Application Development",
        description: "Specializing in bespoke applications that cater to your requirements. Utilizing low-code platforms, we streamline development for rapid deployment and easy scalability.",
        icon: Code2
    },
    {
        title: "Cloud Infrastructure & Optimization",
        description: "Optimize your cloud setup for peak performance and scalability. We offer ongoing monitoring and optimization services to enhance system reliability and security.",
        icon: Cloud
    }
];

const BtpSapservices = () => {
    return (
        <section className="pt-16 pb-4 bg-white overflow-hidden">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">

                {/* Intro Section - Offset to Right */}
                <div className="lg:pl-[30%] mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-4xl"
                    >
                        {/* Heading Section */}
                        <div className="relative mb-6">
                            <h2 className="text-xl md:text-2xl font-medium text-gray-900 flex items-baseline gap-2 flex-wrap">
                                Our SAP BTP <span className="text-[#800000]">Services</span>
                            </h2>
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "50px" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                                className="h-[1px] bg-[#800000] mt-1 rounded-full"
                            />
                        </div>

                        {/* Paragraph Section */}
                        <p className="text-[13px] text-gray-600 leading-relaxed">
                            By partnering with <strong className="text-[#800000] font-bold">Wysele</strong> for SAP BTP services, you’re not just adopting a platform; <br className="hidden md:block" />
                            you’re embarking on a journey to transform your business through data, insights, and modern technology solutions. <br className="hidden md:block" />
                            Let us help you unlock the true potential of your operations and drive your business forward.
                        </p>
                    </motion.div>
                </div>

                {/* Cards Grid - Full Width */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl lg:ml-[5%]">
                    {btpServicesList.map((service, i) => {
                        const hoverImage = 
                            i === 0 ? btpServiceHoverImg : 
                            i === 1 ? btpDataMgmtHoverImg : 
                            i === 2 ? btpAnalyticsHoverImg : 
                            i === 3 ? btpAiHoverImg : 
                            i === 4 ? btpAppDevHoverImg : 
                            i === 5 ? btpCloudHoverImg : null;

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="relative group p-5 border border-black/20 rounded-2xl overflow-hidden transition-all duration-500 bg-white hover:border-transparent"
                            >
                                {/* Hover Background Image */}
                                {hoverImage && (
                                    <>
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-0 group-hover:opacity-100"
                                            style={{ backgroundImage: `url(${hoverImage})` }}
                                        />
                                        {/* Overlay for legibility */}
                                        <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </>
                                )}

                                <div className="relative z-10 transition-colors duration-500 group-hover:text-white">
                                    {/* Icon */}
                                    <div className="mb-5 transition-all duration-500 text-[#800000] group-hover:text-white">
                                        <service.icon size={22} strokeWidth={1.2} />
                                    </div>

                                    <h3 className="text-base font-semibold mb-3 tracking-tight transition-colors duration-500 text-gray-900 group-hover:text-white">
                                        {service.title}
                                    </h3>

                                    <p className="text-[12px] leading-relaxed line-clamp-4 transition-colors duration-500 text-gray-600 group-hover:text-white/90">
                                        {service.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default BtpSapservices;

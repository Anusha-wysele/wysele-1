import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const monitoringServices = [
    {
        title: "Continuous SAP Monitoring",
        desc: "Continuous monitoring helps businesses identify performance issues before they impact operations. Our SAP support team actively monitors system performance, background jobs, integrations, databases, workflows, and infrastructure health to ensure smooth day-to-day operations.",
        checklist: [
            "System performance and background jobs",
            "Integrations, databases, and workflows",
            "Infrastructure health and system behavior",
            "Bottlenecks and failed processes",
            "Operational risks to protect continuity"
        ]
    },
    {
        title: "SAP Performance Optimization",
        desc: "Poor system performance affects productivity, reporting accuracy, and user experience. Wysele provides SAP performance optimization services that improve responsiveness, transaction speed, reporting efficiency, and workflow execution.",
        checklist: [
            "System resource utilization",
            "Workflow performance",
            "Database efficiency",
            "Application responsiveness",
            "Reporting delays",
            "Integration performance"
        ]
    },
    {
        title: "SAP Enhancement Services",
        desc: "As businesses evolve, operational requirements change. Existing SAP configurations may require enhancements to support new workflows, reporting requirements, compliance standards, or business processes.",
        checklist: [
            "Workflow enhancements",
            "SAP customization updates",
            "Functional improvements",
            "Reporting enhancements",
            "Automation capabilities",
            "Integration upgrades",
            "User interface improvements"
        ]
    },
    {
        title: "Scheduled SAP Health Checks",
        desc: "Regular SAP system health checks help identify hidden performance issues, security vulnerabilities, configuration gaps, and optimization opportunities. Our consultants perform detailed SAP assessments to evaluate:",
        checklist: [
            "System performance",
            "Security settings",
            "Database health",
            "Infrastructure stability",
            "Workflow efficiency",
            "Integration functionality",
            "Compliance readiness"
        ]
    }
];

const DataContinuousmonitering = () => {
    return (
        <section className="py-12 bg-white overflow-hidden">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                
                {/* Heading */}
                <div className="flex flex-col gap-3 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-1 md:w-1.5 h-8 md:h-10 bg-[#800000] rounded-full shrink-0" />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-tight">
                            Continuous Monitoring and SAP System Management
                        </h2>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base font-light max-w-3xl leading-relaxed pl-4 md:pl-5">
                        Ensure system stability, secure integrations, and optimized performance through proactive diagnostics and continuous functional enhancements.
                    </p>
                </div>

                {/* 2x2 Grid of Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {monitoringServices.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -4, boxShadow: "0 12px 30px -10px rgba(128, 0, 0, 0.2)" }}
                            className="bg-[#800000] border border-[#800000] rounded-xl p-5 md:p-6 flex flex-col justify-between transition-all duration-300 group"
                        >
                            <div>
                                <h3 className="text-base md:text-lg font-semibold text-white mb-2 tracking-tight transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-gray-100 text-xs md:text-sm leading-relaxed font-light mb-4">
                                    {service.desc}
                                </p>
                            </div>

                            {/* Checklist Block */}
                            <div className="border-t border-white/20 pt-4">
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                    {service.checklist.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-100 font-light leading-snug">
                                            <div className="shrink-0 w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center mt-0.5 transition-transform duration-300 group-hover:scale-110">
                                                <Check className="w-2 h-2 text-[#800000]" strokeWidth={4} />
                                            </div>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default DataContinuousmonitering;

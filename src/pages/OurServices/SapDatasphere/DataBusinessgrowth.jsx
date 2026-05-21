import React from 'react';
import { motion } from 'framer-motion';
import { 
    Cpu,
    ArrowsMerge,
    ChartBar,
    ShieldCheck,
    Lightbulb
} from '@phosphor-icons/react';

const growths = [
    {
        title: "Enterprise Process Automation",
        subtitle: "Improve Efficiency",
        description: "We help businesses automate repetitive workflows and operational tasks using SAP automation strategies that improve efficiency and reduce dependency on manual intervention.",
        bullets: [
            "Approval workflows",
            "Reporting automation",
            "Inventory updates",
            "Procurement processes",
            "Data synchronization",
            "Operational notifications"
        ],
        impact: "Improved automation helps businesses save time, reduce errors, and improve overall productivity.",
        icon: <Cpu size={22} weight="light" className="text-gray-700" />
    },
    {
        title: "ERP System Integration Services",
        subtitle: "Connect Environments",
        description: "Modern businesses use multiple enterprise applications across departments. Wysele provides SAP integration services that connect SAP environments with CRM systems.",
        bullets: [
            "Data visibility",
            "Workflow coordination",
            "Reporting consistency",
            "Operational transparency",
            "Cross-department collaboration"
        ],
        impact: "We ensure reliable data flow between systems while minimizing integration complexity.",
        icon: <ArrowsMerge size={22} weight="light" className="text-gray-700" />
    },
    {
        title: "Reporting and Analytics Optimization",
        subtitle: "Actionable Insights",
        description: "Businesses need accurate and accessible data for effective decision-making. We improve SAP reporting structures, analytics dashboards.",
        bullets: [
            "Improve reporting accuracy",
            "Access real-time operational data",
            "Monitor performance metrics",
            "Enhance business visibility",
            "Support strategic planning"
        ],
        impact: "We focus on creating a smoother user experience that helps teams work more efficiently across business processes.",
        icon: <ChartBar size={22} weight="light" className="text-gray-700" />
    },
    {
        title: "SAP Security and Compliance Support",
        subtitle: "Strengthen Governance",
        description: "Wysele provides SAP security support services that help businesses strengthen access management, reduce vulnerabilities, and improve governance practices.",
        bullets: [
            "Access control reviews",
            "User authorization management",
            "Security monitoring",
            "Compliance assessments",
            "Risk identification",
            "Governance improvements"
        ],
        impact: "These services help businesses protect operational data while supporting compliance requirements.",
        icon: <ShieldCheck size={22} weight="light" className="text-gray-700" />
    }
];

const DataBusinessgrowth = () => {
    return (
        <section className="relative z-10 w-full bg-[#f9f9fb] pt-16 pb-16">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                <div className="text-center mb-10">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl md:text-3xl font-normal text-gray-900 mb-4"
                    >
                        SAP Enhancement Services for <span className="font-semibold px-2">Business Growth</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-center">
                    {growths.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group flex flex-col h-full relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#800000] transition-colors duration-500"
                        >
                            <div className="p-4 lg:p-5 flex flex-col flex-grow">
                                {/* Icon Header */}
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-900 group-hover:bg-[#800000] group-hover:text-white transition-colors duration-500 shrink-0 mt-0.5">
                                        {React.cloneElement(item.icon, { weight: "regular", size: 16 })}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900 leading-snug">
                                            {item.title}
                                        </h3>
                                        <p className="text-[10px] font-semibold text-[#800000] tracking-wide uppercase mt-1">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                </div>

                                 <p className="text-xs text-gray-700 leading-relaxed mb-3 font-light">
                                    {item.description}
                                </p>

                                <div className="flex-grow">
                                    <ul className="space-y-1.5">
                                        {item.bullets.map((bullet, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-gray-800 font-light">
                                                <div className="mt-1.5 w-1 h-1 rounded-full bg-[#800000] shrink-0" />
                                                <span className="leading-tight">{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Impact Footer Segment */}
                            <div className="bg-gray-50 border-t border-gray-100 p-3 lg:p-4 flex items-start gap-2.5 group-hover:bg-[#FFF0F3] transition-colors duration-500">
                                <Lightbulb size={16} weight="duotone" className="text-[#800000] shrink-0 mt-0.5" />
                                <div>
                                    <span className="block text-[10px] font-bold text-gray-900 mb-0.5 uppercase tracking-wider">Business Impact</span>
                                    <span className="text-xs text-gray-800 leading-tight font-light">
                                        {item.impact}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DataBusinessgrowth;

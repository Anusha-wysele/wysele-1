import { motion } from 'framer-motion';
import Cylinderr from '../../../components/common/Cylinderr';

const services = [
    {
        title: "Business Process Management and Optimization",
        description: (
            <div className="flex flex-col gap-2">
                <p>
                    As organizations grow, business processes often become fragmented across departments and systems. This can create workflow delays, operational inconsistencies, and limited process visibility.
                </p>
                <div className="mt-1">
                    <p className="font-bold text-white mb-1">Key Benefits</p>
                    <ul className="list-disc pl-3.5 space-y-0 text-white/90">
                        <li>Improved process visibility</li>
                        <li>Faster workflow execution</li>
                        <li>Reduced operational inefficiencies</li>
                        <li>Better cross-team collaboration</li>
                        <li>Standardized operational processes</li>
                        <li>Improved process consistency</li>
                        <li>Increased operational transparency</li>
                    </ul>
                </div>
            </div>
        )
    },
    {
        title: "Process Mining and Operational Insights",
        description: (
            <div className="flex flex-col gap-2">
                <p>
                    Wysele provides SAP Signavio process mining services that help organizations analyze operational data, identify bottlenecks, and improve workflow performance.
                </p>
                <div className="mt-1">
                    <p className="font-bold text-white mb-1">Our Process Mining Capabilities</p>
                    <ul className="list-disc pl-3.5 space-y-0 text-white/90">
                        <li>Process performance analysis</li>
                        <li>Workflow monitoring and tracking</li>
                        <li>Bottleneck identification</li>
                        <li>KPI and operational reporting</li>
                        <li>Compliance visibility</li>
                        <li>Process efficiency analysis</li>
                        <li>Data-driven operational insights</li>
                        <li>Continuous workflow improvement</li>
                    </ul>
                </div>
            </div>
        )
    },
    {
        title: "Process Automation and Workflow Efficiency",
        description: (
            <div className="flex flex-col gap-2">
                <p>
                    Wysele helps organizations automate repetitive workflows using SAP Signavio automation capabilities designed to improve efficiency and operational performance.
                </p>
                <div className="mt-1">
                    <p className="font-bold text-white mb-1">We support automation for:</p>
                    <ul className="list-disc pl-3.5 space-y-0 text-white/90">
                        <li>Approval workflows</li>
                        <li>Process orchestration</li>
                        <li>Operational task management</li>
                        <li>Workflow standardization</li>
                        <li>Business notifications</li>
                        <li>Repetitive operational activities</li>
                    </ul>
                </div>
            </div>
        )
    },
    {
        title: "Collaboration and Process Governance",
        description: (
            <div className="flex flex-col gap-2">
                <p>
                    SAP Signavio helps businesses create transparent process environments that improve communication, accountability, and governance.
                </p>
                <p>
                    Wysele supports organizations in building scalable governance frameworks that improve process visibility and operational alignment across the enterprise.
                </p>
                <div className="mt-1">
                    <p className="font-bold text-white mb-1">We help businesses establish:</p>
                    <ul className="list-disc pl-3.5 space-y-0 text-white/90">
                        <li>Centralized process documentation</li>
                        <li>Workflow accountability structures</li>
                        <li>Governance and approval frameworks</li>
                        <li>Standard operating procedures</li>
                        <li>Cross-functional collaboration models</li>
                        <li>Process ownership visibility</li>
                    </ul>
                </div>
            </div>
        )
    },
    {
        title: "Change Management and Continuous Improvement",
        description: (
            <div className="flex flex-col gap-2">
                <p>
                    Digital transformation requires continuous adaptation as business requirements evolve. Wysele helps organizations implement structured change management and continuous process improvement strategies using SAP Signavio solutions.
                </p>
                <div className="mt-1">
                    <p className="font-bold text-white mb-1">We help organizations:</p>
                    <ul className="list-disc pl-3.5 space-y-0 text-white/90">
                        <li>Improve operational flexibility</li>
                        <li>Modernize legacy workflows</li>
                        <li>Increase business agility</li>
                        <li>Support process scalability</li>
                        <li>Improve workflow efficiency</li>
                        <li>Build continuous optimization strategies</li>
                    </ul>
                </div>
            </div>
        )
    },
    {
        title: "Integration with SAP S/4HANA",
        description: (
            <div className="flex flex-col gap-2">
                <p>
                    Wysele provides SAP Signavio consulting services that support SAP S/4HANA transformation through process discovery, workflow analysis, operational alignment, and process optimization.
                </p>
                <div className="mt-1">
                    <p className="font-bold text-white mb-1">SAP S/4HANA Support Areas</p>
                    <ul className="list-disc pl-3.5 space-y-0 text-white/90">
                        <li>Process discovery and mapping</li>
                        <li>Transformation planning support</li>
                        <li>Workflow optimization</li>
                        <li>Process standardization</li>
                        <li>Migration readiness analysis</li>
                        <li>Operational alignment strategies</li>
                        <li>Governance and compliance improvements</li>
                    </ul>
                </div>
            </div>
        )
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
                                    <div className="text-white/80 text-[11.5px] leading-snug font-normal mb-4 flex-1">
                                        {service.description}
                                    </div>
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

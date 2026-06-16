import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, GraduationCap, HeadphonesIcon, Search, Settings } from 'lucide-react';

const steps = [
    {
        icon: Search,
        number: "1",
        title: "Consultation & Assessment",
        points: [
            "Business objective review",
            "Detailed gap analysis",
            "Improvement identification",
        ]
    },
    {
        icon: FileText,
        number: "2",
        title: "Solution Design & Planning",
        points: [
            "Custom SAP solution design",
            "Actionable roadmap creation",
            "Implementation planning",
        ]
    },
    {
        icon: Settings,
        number: "3",
        title: "Implementation & Integration",
        points: [
            "Skilled team execution",
            "Seamless system integration",
            "Precise configuration",
        ]
    },
    {
        icon: GraduationCap,
        number: "4",
        title: "Training & Change Management",
        points: [
            "Extensive training programs",
            "Change management strategy",
            "Team empowerment",
        ]
    },
    {
        icon: HeadphonesIcon,
        number: "5",
        title: "Ongoing Support & Optimization",
        points: [
            "Continuous assistance",
            "Performance monitoring",
            "System optimization",
        ]
    }
];

export default function SapTechnicalConsultingprocess() {
    return (
        <section className="pt-4 pb-12 md:pb-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                        SAP Consulting Process
                    </h2>
                </motion.div>

                {/* Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-5 flex flex-col items-center text-center"
                            >
                                {/* Circular gradient icon */}
                                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                                    style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
                                >
                                    <Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
                                </div>

                                {/* Title */}
                                <h3 className="text-[13px] font-semibold text-orange-500 mb-3 leading-snug">
                                    {step.title}
                                </h3>

                                {/* Bullet points */}
                                <ul className="text-left w-full space-y-1.5">
                                    {step.points.map((point, j) => (
                                        <li key={j} className="flex items-start gap-2 text-[11px] text-gray-600">
                                            <span className="mt-0.5 w-2 h-2 rounded-full bg-yellow-400 shrink-0" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

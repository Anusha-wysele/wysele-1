import { Link } from 'react-router-dom';
import { ClipboardList, Layers, Settings, Sliders, TrendingUp } from 'lucide-react';
import sapConsultingWhyChooseImg from '../../../assets/wysele-sapconsultingwhychoose.webp';

const reasons = [
    {
        title: "SAP Ecosystem Expertise",
        description: "Our consultants bring experience across SAP S/4HANA, SAP Fiori, SAP Ariba, SAP Concur, SAP cloud solutions, and enterprise integration services.",
        icon: <Layers className="w-5 h-5 text-[#C9184A]" strokeWidth={2} />
    },
    {
        title: "Customized Consulting Approach",
        description: "We don't apply the same implementation strategy to every business. Our consulting model adapts to your industry, workflows, operational goals, and scalability requirements.",
        icon: <Sliders className="w-5 h-5 text-[#C9184A]" strokeWidth={2} />
    },
    {
        title: "End-to-End Support",
        description: "From planning and deployment to optimization and training, we provide complete SAP consulting support throughout the project lifecycle.",
        icon: <ClipboardList className="w-5 h-5 text-[#C9184A]" strokeWidth={2} />
    },
    {
        title: "Focus on Business Outcomes",
        description: "Our goal is not just implementation. We focus on improving efficiency, reducing operational friction, and helping businesses gain measurable value from SAP investments.",
        icon: <TrendingUp className="w-5 h-5 text-[#C9184A]" strokeWidth={2} />
    },
    {
        title: "Ongoing Support and Optimization",
        description: "SAP systems require continuous improvement. We provide ongoing support services that help businesses maintain system reliability and performance.",
        icon: <Settings className="w-5 h-5 text-[#C9184A]" strokeWidth={2} />
    }
];

const Card = ({ reason }) => (
    <div className="bg-[#FAF6EE] border border-neutral-200/50 rounded-none p-5 hover:shadow-lg transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
        {/* Sliding soft translucent black overlay from top to bottom */}
        <div className="absolute inset-0 bg-black/10 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col h-full">
            {/* Top Header: Icon & Title in a row */}
            <div className="flex items-center gap-3 mb-4 text-left">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-50/50 flex items-center justify-center">
                    {reason.icon}
                </div>
                <h3 className="text-xs sm:text-[13px] font-bold text-gray-900 leading-snug">
                    {reason.title}
                </h3>
            </div>
            
            {/* Description: Centered text */}
            <p className="text-[11px] sm:text-xs text-gray-700 leading-relaxed font-normal text-left sm:text-center mt-auto">
                {reason.description}
            </p>
        </div>
    </div>
);

const WhyChooseWysele = () => (
    <div
        className="min-h-[75vh] py-16 lg:h-auto relative flex items-center"
        style={{
            backgroundImage: `url(${sapConsultingWhyChooseImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
    >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16 w-full">
            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-12 text-white">
                Why Businesses Choose Wysele for <Link to="/services/sap-consulting" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}><Link to="/services/sap-consulting" className="hover:underline transition-colors decoration-gray-400 underline-offset-4 text-inherit">SAP Consulting</Link></Link>
            </h2>
            
            {/* 5-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {reasons.map((reason, index) => (
                    <Card key={index} reason={reason} />
                ))}
            </div>
        </div>
    </div>
);

export default WhyChooseWysele;

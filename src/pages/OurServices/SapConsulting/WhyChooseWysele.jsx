import { SERVICES_PAGE_IMAGES } from '../../../components/common/data';

const reasons = [
    {
        title: "Expertise Across SAP Ecosystem",
        description: "Our consultants bring deep expertise across a wide range of SAP solutions, including SAP S/4HANA, SuccessFactors, Ariba, Concur, and C/4HANA. Whether functional or technical, we provide the right specialists to meet your business needs."
    },
    {
        title: "Tailored Solutions",
        description: "We understand that every business is unique. That's why we design customized SAP solutions aligned with your industry requirements, business goals, and operational challenges, ensuring maximum effectiveness."
    },
    {
        title: "Proven Track Record",
        description: "Wysele has successfully delivered SAP projects across diverse industries, consistently driving process improvements and measurable results. Our experience reflects our ability to create real business impact."
    },
    {
        title: "End-to-End Services",
        description: "From initial consultation and planning to implementation, support, and optimization, we offer complete SAP services. We act as your trusted partner throughout your entire SAP journey."
    },
    {
        title: "Continuous Support and Training",
        description: "Our commitment doesn't end after implementation. We provide ongoing support, performance monitoring, and tailored training to help your team fully utilize SAP systems and continuously adapt to changing business needs."
    }
];

const Card = ({ reason, stretch }) => (
    <div
        className={`rounded-lg overflow-hidden transition-all duration-300 group flex flex-col ${stretch ? 'h-full w-full' : ''}`}
        style={{ backgroundColor: '#fff8e1' }}
    >
        <div className="h-1 w-full" style={{ backgroundColor: '#F59E0B' }} />
        <div className="p-5 relative flex-1">
            <h3 className="text-sm font-bold text-gray-900 mb-2">{reason.title}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{reason.description}</p>
            {/* Bottom fill bar */}
            <div className="bottom-fill absolute bottom-0 left-0 w-full h-[3px]" />
        </div>
    </div>
);

const WhyChooseWysele = () => (
    <div
        className="min-h-[80vh] py-16 lg:h-auto relative flex items-center"
        style={{
            backgroundImage: `url(${SERVICES_PAGE_IMAGES.whyChooseWysele})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
    >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16 w-full">
            <h2 className="text-xl font-light text-center mb-12 text-white">
                Why Choose Wysele for SAP Consulting Services?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reasons.map((reason, index) => (
                    <Card key={index} reason={reason} stretch={true} />
                ))}
            </div>
        </div>
    </div>
);

export default WhyChooseWysele;

import { motion } from 'framer-motion';
import s4ServicesImg1 from '../../../assets/wysele-s4services1.webp';
import s4ServicesImg2 from '../../../assets/wysele-s4services2.webp';
import s4ServicesImg3 from '../../../assets/wysele-s4services3.webp';
import s4ServicesImg4 from '../../../assets/wysele-s4services4.webp';

const services = [
    {
        title: "Assessment & Planning",
        description: "We perform a comprehensive assessment of your current SAP landscape. Based on this analysis, we develop a custom conversion strategy aligned with your business objectives and growth plans.",
        image: s4ServicesImg1
    },
    {
        title: "System Conversion",
        description: "Our experienced consultants oversee the conversion process from start to finish, including data migration and system configuration, ensuring a hassle-free transition.",
        image: s4ServicesImg2
    },
    {
        title: "Custom Code Optimization",
        description: "To ensure all your unique business processes are maintained, we optimize your existing custom code for compatibility with SAP S/4HANA, preserving functionality while enhancing performance.",
        image: s4ServicesImg3
    },
    {
        title: "Post-Conversion Support",
        description: "Following your migration, we remain dedicated to your success with ongoing support and optimization, ensuring your new SAP S/4HANA system operates at peak performance.",
        image: s4ServicesImg4
    }
];

export default function SapS4services() {
    return (
        <section className="py-6 lg:py-8 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-6">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-3">
                        Our SAP S/4HANA Conversion Services
                    </h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {services.map((service, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-none overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group"
                        >
                            <div className="h-36 overflow-hidden relative">
                                <img 
                                    src={service.image} 
                                    alt={service.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                            </div>
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                                    {service.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

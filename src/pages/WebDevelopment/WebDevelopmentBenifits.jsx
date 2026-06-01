import { motion } from 'framer-motion';
import {
  Edit,
  Headset,
  Lock,
  Palette,
  Rocket,
  Smartphone,
  TrendingUp,
  Zap
} from 'lucide-react';

const BENEFITS = [
    { text: "Bespoke Digital Identity: Custom-crafted designs that elevate your unique brand.", icon: Palette },
    { text: "Omnichannel Responsiveness: Flawless user experiences across all devices.", icon: Smartphone },
    { text: "High-Performance Architecture: Lightning-fast load times optimized for SEO.", icon: Zap },
    { text: "Enterprise-Grade Security: Robust frameworks ensuring total customer trust.", icon: Lock },
    { text: "Seamless Content Management: Intuitive CMS integration for effortless updates.", icon: Edit },
    { text: "Cost-Effective Scaling: Elastic solutions that grow efficiently with your business.", icon: TrendingUp },
    { text: "Accelerated Delivery: Agile workflows ensuring faster time to market.", icon: Rocket },
    { text: "24/7 Expert Support: Dedicated partnerships offering round-the-clock reliability.", icon: Headset },
];

const WebDevelopmentBenifits = () => {
    return (
        <section className="relative py-8 md:py-10 bg-[#1A222E] overflow-hidden">
            {/* Background Image */}
            <div 
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            
            {/* Red Diagonal Overlay matching screenshot */}
            <div 
                className="absolute inset-0 z-0 bg-[#B91C1C]/70"
                style={{ clipPath: 'polygon(0 0, 68% 0, 68% 100%, 25% 100%)' }}
            />
            


            <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-xl md:text-2xl font-semibold text-white mb-6 tracking-wide"
                >
                    Benefits of our websites
                </motion.h2>

                <div className="flex flex-col space-y-2 text-left max-w-3xl mx-auto">
                    {BENEFITS.map((benefit, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex items-center gap-6 group cursor-default"
                        >
                            {/* Icon inside a thin circle, matching screenshot */}
                            <div className="flex-shrink-0 w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-white/80 group-hover:border-[#4BDE7B] group-hover:text-[#4BDE7B] transition-all duration-300">
                                <benefit.icon strokeWidth={1.2} size={16} />
                            </div>
                            
                            {/* Benefit Text */}
                            <span className="text-white/90 text-sm md:text-base font-light tracking-wide group-hover:text-white transition-colors duration-300">
                                {benefit.text}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WebDevelopmentBenifits;

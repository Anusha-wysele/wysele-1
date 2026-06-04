import { motion } from 'framer-motion';
import { Heart, Trophy, Zap } from 'lucide-react';
import whyJoinImg1 from '../../assets/wysele-careerswhyjoin1.webp';
import whyJoinImg2 from '../../assets/wysele-careerswhyjoin2.webp';
import whyJoinImg3 from '../../assets/wysele-careerswhyjoin3.webp';


const features = [
  {
    id: 1,
    title: "Innovation Driven",
    desc: "Work with the latest technology stacks and solve complex challenges that shape the future of IT infrastructure and digital transformation.",
    icon: <Zap className="w-6 h-6 text-[#800000]" />,
    image: whyJoinImg1,
    alt: "Innovation and Digital Transformation Services",
    imageTitle: "Innovation Driven",
    delay: 0.1
  },
  {
    id: 2,
    title: "Growth & Mentorship",
    desc: "Accelerate your career with structured learning paths, mentorship programs, and opportunities to lead high-impact global projects.",
    icon: <Trophy className="w-6 h-6 text-[#800000]" />,
    image: whyJoinImg2,
    alt: "Career Growth and Employee Mentorship Program",
    imageTitle: "Growth & Mentorship",
    delay: 0.2
  },
  {
    id: 3,
    title: "Collaborative Culture",
    desc: "Join a vibrant community that values diversity, encourages open communication, and prioritizes your professional and personal well-being.",
    icon: <Heart className="w-6 h-6 text-[#800000]" />,
    image: whyJoinImg3,
    alt: "Collaborative Work Culture at Wysele Technologies",
    imageTitle: "Collaborative Culture",
    delay: 0.3
  }
];

const CareersWhyJoin = () => {
  return (
    <section className="py-10 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4 mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-[2px] bg-[#ffcc00]" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-500">Excellence</span>
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-normal text-gray-900">
            Why Join <span className="text-[#800000]">Our Team</span>
          </h2>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {features.map((item) => (
            <motion.div 
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="group bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col relative overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.alt} 
                  title={item.imageTitle} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5" />
              </div>

              {/* Icon Badge (Overlapping) */}
              <div className="absolute top-[130px] left-8 z-10 w-16 h-16 bg-white rounded-full shadow-lg border border-gray-50 flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-2">
                <div className="w-12 h-12   flex items-center justify-center transition-colors">
                  {item.icon}
                </div>
              </div>

              {/* Text Content */}
              <div className="p-4 pt-11 space-y-1">
                <h4 className="text-lg font-semibold text-gray-800 group-hover:text-[#800000] transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-normal min-h-[60px]">
                  {item.desc}
                </p>
               
              </div>

              {/* Hover Accent Line */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#ffcc00] transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default CareersWhyJoin;

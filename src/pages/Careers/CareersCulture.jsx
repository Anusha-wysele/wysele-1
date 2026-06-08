import { motion } from 'framer-motion';
import { BookOpen, MessageSquare, TrendingUp, Users } from 'lucide-react';
import cultureImg1 from '../../assets/wysele-careersculture1.webp';
import cultureImg2 from '../../assets/wysele-careerculture2.webp';


const CareersCulture = () => {
  const cultureValues = [
    {
      title: "Inclusivity",
      description: "Building a team that we celebrate unique perspectives and foster an inclusive environment where everyone truly belongs.",
      icon: <Users className="w-5 h-5" />,
      color: "#800000"
    },
    {
      title: "Continuous Learning",
      description: "Weekly knowledge shares and professional development paths. From technical workshops to leadership coaching, we invest in your growth.",
      icon: <BookOpen className="w-5 h-5" />,
      color: "#800000"
    },
    {
      title: "Agile Growth",
      description: "Adapting fast to stay at the forefront of technology. Our iterative approach allows us to pivot quickly and deliver cutting-edge solutions.",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "#800000"
    },
    {
      title: "Open Dialogue",
      description: "A flat hierarchy where every voice drives impact. We value transparency and encourage open feedback at all levels of the organization.",
      icon: <MessageSquare className="w-5 h-5" />,
      color: "#800000"
    }
  ];

  return (
    <section className="py-10 bg-gray-50/50 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Images Grid (Asymmetrical) */}
          <div className="w-full lg:w-1/2 relative h-[500px] md:h-[600px]">
            {/* Top Right Small Image */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute top-0 right-0 w-2/3 h-2/5 z-20  overflow-hidden border-4 border-white"
            >
              <img loading="lazy" src={cultureImg1} 
                alt="Technology Team Collaboration and IT Solutions" 
                title="Tech Collaboration"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Bottom Left Main Image */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute bottom-0 left-0 w-4/5 h-3/4 z-10  overflow-hidden"
            >
              <img loading="lazy" src={cultureImg2} 
                alt="Modern Workspace Environment at Wysele Technologies" 
                title="Workspace Environment"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#800000]/20 to-transparent" />
            </motion.div>

            {/* Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#ffcc00]/5 rounded-full blur-3xl -z-0" />
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-[2px] bg-[#ffcc00]" />
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-500">Our Culture</span>
              </div>

              <h2 className="text-xl md:text-2xl lg:text-3xl font-normal leading-tight text-gray-900">
                Where <span className="text-[#800000]">Collaboration</span>{" "}
                Meets Innovation
              </h2>

              <p className="text-gray-600 text-sm md:text-base font-light leading-relaxed">
                At Wysele, we believe that the best solutions are born from diverse perspectives and collaborative spirits. Our workspace is designed to inspire creativity, foster deep technical focus, and encourage the kind of "what if" thinking that shapes the future of IT infrastructure.
              </p>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15
                    }
                  }
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4"
              >
                {cultureValues.map((value, index) => (
                  <motion.div 
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                    whileHover={{ y: -8, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Decorative Top Accent */}
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#800000]/20 via-[#800000] to-[#800000]/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 shrink-0 rounded-full bg-[#800000]/90 flex items-center justify-center text-[#ffcc00] group-hover:bg-[#800000] group-hover:text-white transition-all duration-300">
                          {value.icon}
                        </div>
                        <h4 className="text-sm font-normal text-[#800000] group-hover:text-[#C9184A] transition-colors">{value.title}</h4>
                      </div>
                      
                      <p className="text-xs text-gray-500 font-normal leading-relaxed line-clamp-4">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CareersCulture;

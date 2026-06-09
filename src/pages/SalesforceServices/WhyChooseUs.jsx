import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import {
  Headphones,
  Layers3,
  Settings2,
  ShieldCheck
} from "lucide-react";
import WhyChooseBgImg from "../../assets/wysele-salesforcewhychoose.webp";

const WhyChooseUs = () => {

  const cards = [
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Certified Salesforce Experts",
      desc: "Experienced professionals delivering reliable Salesforce consulting solutions.",
      active: false
    },
    {
      icon: <Layers3 className="w-8 h-8" />,
      title: "Seamless Integration",
      desc: "Integrate Salesforce smoothly with your business systems and workflows.",
      active: false
    },
    {
      icon: <Settings2 className="w-8 h-8" />,
      title: "Scalable CRM Solutions",
      desc: "Flexible Salesforce solutions designed to scale with business growth.",
      active: false
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Ongoing Support",
      desc: "Continuous optimization and proactive Salesforce support services.",
      active: false
    }
  ];

  return (
    <section className="py-10 bg-white overflow-hidden relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${WhyChooseBgImg})`,
      }}
    >
      {/* Overlay */}
       <div className="absolute inset-0 bg-black/50 z-0" /> 
     <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >

          <span className="text-[15px] tracking-[0.2em] uppercase text-[white] font-bold">
            Why Choose Us
          </span>

          <h2 className="mt-2 text-xl md:text-2xl font-semibold text-[white]">
            <Link to="/services/salesforce" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}><Link to="/services/salesforce" className="hover:underline transition-colors decoration-gray-400 underline-offset-4 text-inherit">Salesforce</Link></Link> Expertise
            <span className="text-[white]"> That Delivers</span>
          </h2>

          <p className="mt-2 text-gray-200 leading-5 max-w-2xl mx-auto">
            We combine scalable <Link to="/services/salesforce" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}><Link to="/services/salesforce" className="hover:underline transition-colors decoration-gray-400 underline-offset-4 text-inherit">Salesforce</Link></Link> solutions, business-focused
            strategies, and enterprise-grade support to help organizations grow.
          </p>

        </motion.div>

        {/* Zig Zag Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">

          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15
              }}
              whileHover={{
                y: -8
              }}
              className={`
                relative  p-3 transition-all duration-500 shadow-lg border
                
                ${index % 2 !== 0 ? "lg:mt-24" : "lg:mt-0"}
                
                ${
                  card.active
                    ? "bg-[white]/90 text-black border-gray-100"
                    : "bg-white text-gray-900 border-gray-100"
                }
              `}
            >

              {/* Icon */}
              <div
                className={`w-8 h-8 rounded-2xl flex p-2 items-center justify-center mb-4
                
                ${
                  card.active
                    ? "bg-white/10 text-white"
                    : "bg-[#fff5d6] text-[#800000]"
                }
                `}
              >
                {card.icon}
              </div>

              {/* Title */}
              <h3
                className={`text-[15px] font-normal leading-snug
                
                ${
                  card.active
                    ? "text-white"
                    : "text-gray-900"
                }
                `}
              >
                {card.title}
              </h3>

              {/* Description */}
              <p
                className={`mt-3 leading-6 text-sm
                
                ${
                  card.active
                    ? "text-white/80"
                    : "text-gray-500"
                }
                `}
              >
                {card.desc}
              </p>

              {/* Bottom Accent */}
              <div
                className={`absolute bottom-0 left-0 w-full h-1 rounded-b-2xl
                
                ${
                  card.active
                    ? "bg-[#ffcc00]/90"
                    : "bg-[#ffcc00]"
                }
                `}
              />

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
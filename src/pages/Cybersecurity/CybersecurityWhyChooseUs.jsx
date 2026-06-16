import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Monitor, ShieldCheck, Zap } from 'lucide-react';
import cybersecurityWhyChoose from '../../assets/wysele-cybersecuritywhychoose.webp';

const cards = [
  {
    title: "Industry Expertise",
    desc: "Our consultants support businesses across healthcare, finance, enterprise operations, eCommerce, and technology environments. We help organizations improve cybersecurity while maintaining operational continuity.",
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    title: "Security-Focused Support",
    desc: "Wysele offers cybersecurity services that align with business needs, technology environments, and long-term operational security objectives The solutions are designed to strengthen data protection in a connected digital landscape",
    icon: <CheckCircle2 className="w-6 h-6" />
  },
  {
    title: "Continuous Monitoring and Support",
    desc: "Cybersecurity requires ongoing monitoring and regular system reviews. Wysele provides continuous support services that help organizations manage evolving security risks and maintain operational stability.",
    icon: <Monitor className="w-6 h-6" />
  },
  {
    title: "Fast Incident Response",
    desc: "Quick response during security incidents helps businesses reduce disruptions and maintain operational continuity. Our teams help organizations respond efficiently to security events and improve recovery processes.",
    icon: <Zap className="w-6 h-6" />
  }
];

const CybersecurityWhyChooseUs = () => {
  return (
    <section className="relative py-10 overflow-hidden font-sans">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img loading="lazy" src={cybersecurityWhyChoose}
          alt="Cybersecurity Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/70 backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-16 lg:gap-12">

          {/* Left Side: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 text-left"
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[white] leading-tight mb-5">
              Why Businesses Choose Wysele For Cybersecurity Services
            </h2>

            <div className="mb-3">
              <h3 className="text-xl font-semibold text-white mb-2">Vision :</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {/* <p className="text-gray-300 text-sm md:text-base leading-relaxed"> */}
                To become a trusted cybersecurity partner for businesses seeking reliable digital protection and secure technology environments
                To help organizations operate confidently with strong security strategies that protect systems, networks, and sensitive information. </p>


            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Mission :</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 text-gray-200 text-sm md:text-base leading-relaxed">
                  <span className="text-white font-normal">–</span>
                  Deliver customized cybersecurity solutions designed to match business operations, infrastructure, and security requirements.                </li>
                <li className="flex items-start gap-2 text-gray-200 text-sm md:text-base leading-relaxed">
                  <span className="text-white font-normal">–</span>
                  Enhance operStrengthen data protection through advanced security practices, continuous monitoring, and risk management strategies.ational efficiency and ensure robust data security.
                </li>

              </ul>
            </div>
          </motion.div>

          {/* Right Side: 2x2 Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/90 p-3 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-start"
                >
                  {/* <div className="w-12 h-12 rounded-xl bg-[#C9184A]/10 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-[#C9184A]">
                    {React.cloneElement(card.icon, {
                      className: "w-6 h-6 text-[#C9184A] transition-colors duration-300 group-hover:text-white"
                    })}
                  </div> */}
                  <h3 className="text-sm font-normal text-[#800000] mb-2 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>


  );
};

export default CybersecurityWhyChooseUs;


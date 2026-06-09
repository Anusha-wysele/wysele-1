import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Zap } from 'lucide-react';
import SalesforceOverviewImg from '../../assets/wysele-salesforceoverview.webp';

const SalesforceIntro = () => {
  const benefits = [
    {
      title: "Customer 360 View",
      description: "Gain a unified, holistic view of every customer interaction across sales, service, marketing, and commerce.",
      icon: <Users className="w-6 h-6 text-black" />
    },
    {
      title: "Workflow Automation",
      description: "Eliminate manual bottlenecks and accelerate productivity with intelligent automation.",
      icon: <Zap className="w-6 h-6 text-black" />
    }
  ];

  return (
    <section className="py-10 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Left Column: Content */}
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[#C9184A] font-bold text-sm tracking-wider uppercase">Overview</span>
                <div className="w-16 h-[2px] bg-[#ffcc00]" />
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl md:text-3xl font-normal text-gray-900 leading-tight"
              >
                Innovative <Link to="/services/salesforce" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}><Link to="/services/salesforce" className="hover:underline transition-colors decoration-gray-400 underline-offset-4 text-inherit">Salesforce</Link></Link> Solutions <br />
                <span className="text-gray-800">For Modern Enterprises</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-gray-500 text-base font-light leading-relaxed max-w-xl"
              >
                <Link to="/services/salesforce" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}><Link to="/services/salesforce" className="hover:underline transition-colors decoration-gray-400 underline-offset-4 text-inherit">Salesforce</Link></Link> is a leading cloud-based CRM platform that helps businesses manage sales, customer service, marketing, and operations in one unified system. It connects your teams, data, and processes—so you can deliver better customer experiences and scale faster.
              </motion.p>
            </div>

            {/* Featured Benefit Boxes - Icon & Title Top, Desc Below */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="p-3 bg-white rounded-2xl  border border-gray-100 group  hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-shrink-0 w-8 h-8 p-2 flex items-center justify-center bg-[#ffcc00] rounded-full  group-hover:scale-110 transition-transform duration-300">
                      {benefit.icon}
                    </div>
                    <h4 className="text-[17px] font-normal text-gray-900 tracking-tight">
                      {benefit.title}
                    </h4>
                  </div>
                  <p className="text-gray-700 text-[14px] leading-relaxed font-normal">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>


          </div>

        

        

          <div className="w-full lg:w-1/2 flex justify-end">
            <div className="relative w-full max-w-[650px] h-[520px]">

              {/* Maroon Background Box on Right */}
              <motion.div
                initial={{ opacity: 0, x: 40, y: 40 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="absolute right-0 top-0 w-[30%] h-[92%] bg-[#800000] rounded-lg"
              />

              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="absolute top-8 left-0 z-10 w-[84%] h-[82%] overflow-hidden shadow-2xl "
              >
                <img loading="lazy" src={SalesforceOverviewImg}
                  alt="Team Collaboration"
                  className="w-full h-full object-cover transition-all duration-700 rounded-lg bg-black/30"
                />
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalesforceIntro;

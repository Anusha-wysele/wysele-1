import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SalesforceProductImg from '../../assets/wysele-salesforceproduct.webp';

const SalesforceProducts = () => {
  const products = [
    {
      title: "Sales Cloud",
      desc: "Manage leads, opportunities, and pipelines to accelerate revenue growth with intelligent sales automation.",
      delay: 0.1
    },
    {
      title: "Service Cloud",
      desc: "Deliver fast, personalized customer support across all channels with AI-powered service tools.",
      delay: 0.2
    },
    {
      title: "Marketing Cloud",
      desc: "Automate cross-channel campaigns and create personalized customer journeys at scale.",
      delay: 0.3
    },
    {
      title: "Commerce Cloud",
      desc: "Create seamless, unified eCommerce experiences that scale with your business and customers.",
      delay: 0.4
    }
  ];

  return (
    <section className="py-10 bg-[white] font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

        <div className="flex flex-col lg:flex-row gap-12">

          {/* Left Column: Visual Intro Card */}
          <div className="w-full lg:w-[40%] relative">
            {/* Decorative Frame */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-[#ffcc00] rounded-lg -z-0" />

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-10 rounded-lg overflow-hidden h-[300px] shadow-2xl flex flex-col justify-end p-10 group"
            >
              {/* Background Image with Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${SalesforceProductImg})` }}
              />
              <div className="absolute inset-0 bg-black/50 text-center items-center justify-center" />
              {/* Content on Image */}
              <div className="relative z-20 space-y-3 ">
                <span className="text-white font-semibold text-sm tracking-widest uppercase">Our Products</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  What We Offer
                </h2>
                <p className="text-white font-sans text-[13px] ">Empower your business with Salesforce products designed to streamline operations, automate workflows, enhance customer experiences, and drive scalable growth across sales, service, marketing, and commerce</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Products Grid */}
          <div className="w-full lg:w-[60%] grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: product.delay }}
                className="relative overflow-hidden bg-white p-3 rounded-lg border border-[gray]/10 transition-all duration-500 group flex flex-col justify-center before:absolute before:inset-0 before:bg-[gray]/40 before:translate-y-[-100%] before:transition-transform before:duration-500 hover:before:translate-y-0"              >
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-[#800000]  transition-colors">
                    {product.title}
                  </h4>
                  <div className="w-10 h-[2px] bg-[#ffcc00]" />
                  <p className="text-gray-600 text-[13px] leading-relaxed">
                    {product.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default SalesforceProducts;

import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const SalesforceProcess = () => {

  const steps = [
    {
      id: "01",
      title: "Discovery",
      desc: "Understanding business needs, goals, and workflows to build the right Salesforce strategy."
    },
    {
      id: "02",
      title: "Planning",
      desc: "Building a scalable Salesforce roadmap aligned with your business objectives."
    },
    {
      id: "03",
      title: "Implementation",
      desc: "Configuring scalable Salesforce solutions to match your business workflows efficiently."
    },
    {
      id: "04",
      title: "Support",
      desc: "Providing continuous optimization, proactive support, and long-term performance improvements."
    }
  ];

  return (
    <section 
      className="relative py-16 overflow-hidden text-white font-sans bg-white bg-cover "
      // style={{ backgroundImage: `url('https://images.pexels.com/photos/8117521/pexels-photo-8117521.jpeg')` }}
    >
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/50 z-0" /> */}

      <div className="max-w-7xl relative z-10 mx-auto px-6 md:px-12 lg:px-24">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4"
          >
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#C9184A] font-bold">
              Our Process
            </span>

            <h2 className="mt-5 text-xl md:text-2xl leading-tight font-normal text-gray-900">
              Streamlined <br />
              <span className="text-[#800000]"><Link to="/services/salesforce" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}><Link to="/services/salesforce" className="hover:underline transition-colors decoration-gray-400 underline-offset-4 text-inherit">Salesforce</Link></Link></span> Implementation
            </h2>

            <p className="mt-4 text-gray-500 leading-5 text-sm md:text-[14px] max-w-md font-normal">
              We follow a clean and scalable process to deliver secure,
              efficient, and business-focused <Link to="/services/salesforce" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}><Link to="/services/salesforce" className="hover:underline transition-colors decoration-gray-400 underline-offset-4 text-inherit">Salesforce</Link></Link> solutions.
            </p>
          </motion.div>

          {/* Right Timeline */}
          <div className="lg:col-span-8 relative mt-15 lg:mt-0">

            {/* Horizontal Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="absolute top-5 left-0 w-full h-[2px] bg-[#800000] origin-left"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">

              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15
                  }}
                  className="relative group"
                >

                  {/* Circle */}
                  <motion.div
                   
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 rounded-full bg-[#ffcc00] text-black flex items-center justify-center text-sm font-normal relative z-10 shadow-lg"
                  >
                    {step.id}
                  </motion.div>

                  {/* Content */}
                  <div className="mt-8">

                    <h3 className="text-[17px] font-normal text-gray-900 font-sans transition-colors duration-300">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm text-gray-600 leading-relaxed font-normal  transition-colors duration-300">
                      {step.desc}
                    </p>

                  </div>

                </motion.div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SalesforceProcess;
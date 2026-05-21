import React from 'react';
import { motion } from 'framer-motion';
import {
  Bug,
  MailWarning,
  Database,
  Users,
  Zap,
} from 'lucide-react';

const threats = [
  {
    title: "Malware & Ransomware",
    desc: "Malicious software can damage systems, restrict operational access, and affect business continuity. Wysele helps organizations improve protection against malware and ransomware attacks through threat monitoring and system security measures.",
    icon: <Bug className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Phishing Attacks",
    desc: " Fraudulent emails and deceptive communication attempts are commonly used to gain unauthorized access to sensitive information. Wysele helps businesses strengthen email security and improve protection against phishing risks.",
    icon: <MailWarning className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Data Breaches",
    desc: "Unauthorized access to business information can affect operations, customer trust, and compliance requirements. We help organizations improve data protection through secure access management and operational security controls.",
    icon: <Database className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/5380655/pexels-photo-5380655.jpeg",
  },
  {
    title: "Insider Threats",
    desc: "Internal security risks can affect operational environments when sensitive information is misused or unauthorized activities occur within the organization. We help businesses monitor unusual behavior and improve internal security visibility.",
    icon: <Users className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "DDoS Attacks",
    desc: "Distributed denial-of-service attacks can disrupt operational availability and affect online platforms. We help businesses improve infrastructure stability and maintain operational continuity during high-volume traffic attacks. ",
    icon: <Zap className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/8720586/pexels-photo-8720586.jpeg",
  }
];

const CybersecurityThreats = () => {

  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === threats.length - 1 ? 0 : prev + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-10 bg-white overflow-hidden font-sans border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-5">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >

              <div className="flex items-center gap-3 mb-1">
                <div className="w-[4px] h-[15px] bg-[#ffcc00]"></div>

                <span className="text-[#C9184A] text-xs font-semibold uppercase tracking-[0.2em] p-0">
                  Threat Intelligence
                </span>
              </div>

              <h2 className="text-xl md:text-2xl lg:text-3xl font-normal text-gray-900 mb-3 leading-[1.1] tracking-normal">
                Threats We{" "}
                <span className="font-normal text-[#800000]">
                  Help
                </span>{" "}
                Businesses Reduce
              </h2>

              <div className="space-y-1">

                <div className="flex items-start space-y-2 gap-3">
                  <div className="w-[5px] h-10 bg-[#ffcc00] mt-1"></div>

                  <p className="text-gray-600 text-sm leading-[2] font-normal max-w-lg">
                    Modern businesses face evolving cyber risks that can disrupt operations, expose sensitive data, and impact customer confidence, making strong cybersecurity protection essential.                  </p>
                </div>

                <div className="flex items-start space-y-2 gap-3">
                  <div className="w-[5px] h-10 bg-[#ffcc00] mt-1"></div>

                  <p className="text-gray-600 text-sm leading-[2] font-normal max-w-lg">
                    From ransomware attacks to unauthorized system access, cyber threats continue to grow in complexity and can affect organizations of every size and industry.                  </p>
                </div>

                <div className="flex items-start space-y-2 gap-3">
                  <div className="w-[5px] h-10 bg-[#ffcc00] mt-1"></div>

                  <p className="text-gray-600 text-sm leading-[2] font-normal max-w-lg">
                    Protecting digital infrastructure, business applications, and confidential information is critical for maintaining secure and uninterrupted business operations.                  </p>
                </div>

              </div>

            </motion.div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-7 overflow-hidden relative">

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
              className="border border-gray-200 bg-white"
            >

              <div className="grid md:grid-cols-2 items-stretch">

                {/* IMAGE */}
                <div className="w-full h-full">
                  <img
                    src={threats[activeIndex].image}
                    alt={threats[activeIndex].title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-10 flex flex-col justify-center">

                  <div className="text-[#ffcc00] mb-5 w-8 h-8 bg-[#800000] rounded-full flex items-center justify-center">
                    {threats[activeIndex].icon}
                  </div>

                  <h3 className="text-xl font-black font-normal text-gray-900 mb-5 tracking-tight leading-tight">
                    {threats[activeIndex].title}
                  </h3>

                  <p className="text-gray-500 leading-[2] text-sm font-medium">
                    {threats[activeIndex].desc}
                  </p>

                </div>

              </div>

            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CybersecurityThreats;

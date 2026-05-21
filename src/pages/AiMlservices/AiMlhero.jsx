import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Brain, 
  Cpu, 
  MessageSquare, 
  Eye, 
  Zap, 
  TrendingUp, 
  Rocket, 
  Bot, 
  Cloud 
} from 'lucide-react';
import AimlheroImg from '../../assets/Aimlhero.jpg';
import Cylinders from '../../components/common/Cylinders';

const services = [
  {
    title: "AI Strategy & Consulting",
    icon: Brain,
  },
  {
    title: "Machine Learning Development",
    icon: Cpu,
  },
  {
    title: "NLP & Conversational AI",
    icon: MessageSquare,
  },
  {
    title: "Computer Vision Solutions",
    icon: Eye,
  },
  {
    title: "AI Automation Systems",
    icon: Zap,
  },
  {
    title: "Predictive Analytics & Forecasting",
    icon: TrendingUp,
  },
  {
    title: "MLOps & Model Deployment",
    icon: Rocket,
  },
  {
    title: "AI Assistants & Intelligent Tools",
    icon: Bot,
  },
  {
    title: "Cloud AI Infrastructure",
    icon: Cloud,
  }
];

export default function AiMlhero() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-white w-full">
      <section className="relative w-full min-h-screen lg:h-[calc(100vh-68px)] flex items-end overflow-hidden font-sans bg-black pt-[68px] lg:pt-0">
        {/* Full screen background image */}
        <img
          src={AimlheroImg}
          alt="AI & ML Services"
          className="absolute inset-0 w-full h-full object-cover object-[70%] lg:object-center z-0"
        />

        {/* Left to right gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent z-10" />

        {/* Decorative Cylinders */}
        <Cylinders />

        {/* Content Container */}
        <div className="relative z-20 w-full pb-10 sm:pb-12 lg:pb-14 pt-32 sm:pt-36 lg:pt-40">
          <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16 w-full flex flex-col justify-between h-full">
            
            {/* Content Column */}
            <div className="max-w-4xl w-full">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                className="text-2xl sm:text-3xl lg:text-[38px] font-semibold text-white leading-tight mb-4"
              >
                AI & Machine Learning <span className="text-white font-light">Development Services</span>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
                className="text-base sm:text-lg lg:text-xl font-bold text-white/95 leading-snug mb-6"
              >
                Build Scalable AI Solutions for Enterprise Growth
              </motion.h2>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="w-12 h-[1.5px] bg-[#FFB703]/60 my-4" 
              />

              <div className="flex flex-col gap-3 text-xs sm:text-sm text-gray-200 leading-relaxed font-normal">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
                >
                  Wysele delivers AI and machine learning development services that help businesses automate operations, improve decision-making, and build intelligent digital systems for long-term growth. Our solutions are designed for enterprises looking to modernize workflows, improve data visibility, and deploy scalable AI applications across business operations.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.45, ease: [0.33, 1, 0.68, 1] }}
                  className="hidden sm:block"
                >
                  As organizations continue adopting AI technologies, many face challenges related to fragmented infrastructure, disconnected systems, and unreliable deployment environments. Wysele helps businesses overcome these challenges with structured AI implementation services that combine cloud infrastructure, machine learning models, NLP technologies, analytics platforms, and enterprise integration frameworks.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
                >
                  From predictive analytics and AI assistants to computer vision and intelligent automation, we build AI-powered solutions that align with operational goals and support measurable business outcomes.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.75, ease: [0.33, 1, 0.68, 1] }}
                className="pt-5"
              >
                <button
                  onClick={() => navigate('/contact')}
                  className="px-7 py-3.5 bg-gradient-to-r from-[#FFB703] to-[#FB8500] hover:from-[#FB8500] hover:to-[#FFB703] text-black font-semibold rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_20px_rgba(255,183,3,0.3)] hover:shadow-[0_4px_25px_rgba(251,133,0,0.5)] w-fit group/btn hover:scale-[1.03] active:scale-95"
                >
                  Contact Us
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 text-black" strokeWidth={2.5} />
                </button>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* AI & ML Service Offerings Floating Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: [0.33, 1, 0.68, 1] }}
        className="relative z-30 max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16 w-full -mt-4 sm:-mt-6 lg:-mt-8"
      >
        <div className="bg-white rounded-2xl lg:rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-gray-100 p-5 md:p-6 lg:py-8 lg:px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-y-6 gap-x-2 lg:gap-x-0">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={index} 
                  className="flex flex-col items-center justify-between text-center px-1 lg:px-2 group/item min-h-[90px] lg:border-r border-gray-200/50 last:border-r-0"
                >
                  <div className="text-blue-600 mb-3 transition-transform duration-300 group-hover/item:scale-110">
                    <Icon className="w-7 h-7" strokeWidth={1.8} />
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-semibold text-slate-800 leading-tight max-w-[125px] mt-auto">
                    {service.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

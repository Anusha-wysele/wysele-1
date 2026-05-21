import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cloud, 
  MessageSquareCode, 
  Eye, 
  Layers, 
  Bot, 
  TrendingUp,
  Cpu,
  ArrowRight,
  Database,
  CheckCircle2
} from 'lucide-react';
import Cylinderr from '../../components/common/Cylinderr';

const servicesData = [
  {
    icon: Cloud,
    badge: "Cloud AI Infrastructure",
    title: "AI Platforms and Cloud Infrastructure Solutions",
    paragraphs: [
      "Wysele works with leading cloud and AI platforms to create scalable machine learning environments for enterprise operations. Our team helps businesses deploy AI applications using AWS, Microsoft Azure, Google Cloud Platform, IBM Watson, and modern enterprise AI ecosystems."
    ],
    bulletGroups: [
      {
        title: "Our cloud-based AI infrastructure solutions support:",
        icon: Cpu,
        items: [
          "Scalable machine learning deployments",
          "Real-time analytics processing",
          "AI model training and monitoring",
          "Enterprise-grade security controls",
          "Reliable infrastructure management",
          "Faster AI application delivery"
        ]
      }
    ]
  },
  {
    icon: MessageSquareCode,
    badge: "Natural Language Processing",
    title: "NLP and Conversational AI Services",
    paragraphs: [
      "Natural Language Processing plays a major role in modern enterprise automation and customer engagement. Wysele develops NLP solutions that help organizations improve communication workflows, automate repetitive tasks, and enhance digital experiences."
    ],
    bulletGroups: [
      {
        title: "Our NLP development services support:",
        icon: Cpu,
        items: [
          "AI chatbots and virtual assistants",
          "Intelligent search systems",
          "Text classification workflows",
          "Semantic data analysis",
          "Conversational AI applications",
          "Content automation solutions"
        ]
      }
    ]
  },
  {
    icon: Eye,
    badge: "Computer Vision",
    title: "Computer Vision and Intelligent Media Processing",
    paragraphs: [
      "Wysele develops computer vision applications that help businesses process and analyze visual data more effectively. These systems support industries that require automation, image analysis, document recognition, and operational monitoring."
    ],
    bulletGroups: [
      {
        title: "Our computer vision services include:",
        icon: Cpu,
        items: [
          "Image recognition systems",
          "OCR and document extraction",
          "Video intelligence workflows",
          "Facial and object detection",
          "AI-generated media processing",
          "Automated visual inspection systems"
        ]
      }
    ]
  },
  {
    icon: Layers,
    badge: "AI Lifecycle & MLOps",
    title: "MLOps and AI Infrastructure Management",
    paragraphs: [
      "Successful AI adoption depends on reliable deployment, monitoring, and lifecycle management. Wysele helps organizations establish structured MLOps environments that support scalable and production-ready AI operations."
    ],
    bulletGroups: [
      {
        title: "Our MLOps services help businesses:",
        icon: Cpu,
        items: [
          "Monitor model performance",
          "Track experiments and deployments",
          "Improve AI governance",
          "Manage model versioning",
          "Maintain operational consistency",
          "Scale AI environments efficiently"
        ]
      }
    ]
  },
  {
    icon: Bot,
    badge: "Intelligent Automation",
    title: "AI Assistants and Intelligent Automation",
    paragraphs: [
      "Businesses are increasingly using AI assistants to improve productivity and automate internal operations. Wysele develops AI-powered assistants that integrate with enterprise systems, customer support environments, and operational workflows."
    ],
    bulletGroups: [
      {
        title: "Our AI assistant solutions support:",
        icon: Cpu,
        items: [
          "Enterprise chatbots",
          "AI copilots",
          "Workflow automation",
          "Knowledge management systems",
          "Customer support automation",
          "Intelligent internal tools"
        ]
      }
    ]
  },
  {
    icon: TrendingUp,
    badge: "Data Intelligence",
    title: "Predictive Analytics and Forecasting Solutions",
    paragraphs: [
      "Predictive analytics helps organizations make smarter business decisions using real-time and historical data. Wysele develops forecasting and analytics systems that improve planning, operational visibility, and business intelligence."
    ],
    bulletGroups: [
      {
        title: "Our analytics services include:",
        icon: Cpu,
        items: [
          "Predictive forecasting models",
          "Recommendation engines",
          "Real-time analytics pipelines",
          "Automated reporting systems",
          "Behavioral analytics",
          "AI-powered dashboards"
        ]
      }
    ]
  }
];

export default function AiDevelopmentservices() {
  return (
    <div className="bg-white pt-10 pb-10 sm:pt-12 lg:pt-14 lg:pb-14 overflow-hidden font-sans">
      <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
        
        {/* Header Title Section */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Cylinderr className="w-4 h-10 rounded-sm" />
            <h2 className="text-3xl sm:text-4xl font-normal text-gray-900 tracking-tight leading-tight">
              AI & Machine Learning <span className="font-bold">Development Services</span>
            </h2>
          </div>
          <div className="w-12 h-[1.5px] bg-[#FFB703] mb-6" />
          <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed">
            Discover our comprehensive suite of advanced Artificial Intelligence capabilities, cloud platforms, and data infrastructure solutions designed to support your enterprise growth.
          </p>
        </div>

        {/* Services List */}
        <div className="flex flex-col gap-10 lg:gap-12">
          {servicesData.map((service, index) => {
            const IconComponent = service.icon;
            const isEven = index % 2 === 0;

            // Premium single unified maroon color theme for all service boxes
            const theme = {
              bg: "bg-[#800000] hover:bg-[#800000]/95 hover:shadow-2xl",
              border: "border-transparent",
              icon: "text-[#FFB703]",
              title: "text-white",
              borderLine: "border-white/20",
              bulletText: "text-white/90",
              bullet: "text-[#FFB703]"
            };

            return (
              <div 
                key={index}
                className={`flex flex-col lg:flex-row gap-6 lg:gap-8 items-start ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Text Content Column */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                  className="w-full lg:w-1/2 flex flex-col pt-2"
                >
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className={`p-2 rounded-xl shrink-0 ${theme.bg} ${theme.border} border`}>
                      <IconComponent className={`w-6 h-6 ${theme.icon}`} strokeWidth={1.8} />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400">
                        {service.badge}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <div className="w-12 h-[1.5px] bg-[#FFB703] mb-5" />

                  {/* Paragraphs */}
                  {service.paragraphs.map((p, pIndex) => (
                    <p key={pIndex} className="text-sm sm:text-[15px] text-gray-650 leading-relaxed font-light mb-4">
                      {p}
                    </p>
                  ))}

                  {/* Optional Paragraphs */}
                  {service.bottomParagraph && (
                    <p className="text-sm sm:text-[15px] text-gray-650 leading-relaxed font-light mb-2">
                      {service.bottomParagraph}
                    </p>
                  )}
                </motion.div>

                {/* Bullet Cards Grid Column */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
                  className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-5"
                >
                  {service.bulletGroups.map((group, groupIndex) => {
                    const GroupIcon = group.icon;
                    return (
                      <div 
                        key={groupIndex}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between hover:shadow-lg ${theme.bg} ${theme.border} ${
                          service.bulletGroups.length === 1 ? 'sm:col-span-2' : ''
                        }`}
                      >
                        <div>
                          <div className={`flex items-start gap-2.5 mb-3 pb-2 border-b ${theme.borderLine}`}>
                            <GroupIcon className={`w-4.5 h-4.5 shrink-0 mt-0.5 ${theme.icon}`} strokeWidth={2} />
                            <h5 className={`text-[12px] uppercase tracking-wider font-bold ${theme.title} leading-tight`}>
                              {group.title}
                            </h5>
                          </div>

                          <ul className="flex flex-col gap-2">
                            {group.items.map((bullet, bulletIndex) => (
                              <li 
                                key={bulletIndex}
                                className={`flex items-start gap-2 text-xs sm:text-[13px] ${theme.bulletText} leading-snug font-normal`}
                              >
                                <span className={`mt-1 shrink-0 font-bold ${theme.bullet}`}>•</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

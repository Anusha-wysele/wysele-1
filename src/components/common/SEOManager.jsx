import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Helper function to generate standardized Service Schema
const makeServiceSchema = (name, description, path) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": name,
  "provider": {
    "@type": "Organization",
    "name": "Wysele Technologies",
    "url": "https://www.wysele.com/",
    "logo": "https://www.wysele.com/og-image.png"
  },
  "description": description,
  "url": `https://www.wysele.com${path}`
});

const SEO_CONFIG_MAP = {
  "/": {
    title: "Wysele Technologies | Digital Transformation Solutions",
    description: "Wysele Technologies delivers SAP, Salesforce, cybersecurity, AI/ML, cloud, IoT, web, and enterprise IT solutions for digital transformation.",
    keywords: "digital transformation, enterprise IT solutions, SAP consulting, Salesforce integration, cybersecurity services, AI ML solutions, cloud migration, IoT consulting, web development, app development, Wysele Technologies",
    canonical: "https://www.wysele.com/",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://www.wysele.com/#organization",
          "name": "Wysele Technologies",
          "alternateName": "Wysele",
          "url": "https://www.wysele.com/",
          "logo": "https://www.wysele.com/og-image.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-9100042919",
            "contactType": "customer service",
            "email": "info@wysele.com",
            "areaServed": "IN",
            "availableLanguage": ["en", "tel", "hi"]
          },
          "sameAs": [
            "https://www.linkedin.com/company/wyseletechnologies"
          ]
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://www.wysele.com/#localbusiness",
          "name": "Wysele Technologies",
          "url": "https://www.wysele.com/",
          "telephone": "+91-9100042919",
          "email": "info@wysele.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Hyderabad",
            "addressRegion": "Telangana",
            "addressCountry": "IN",
            "postalCode": "500081"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 17.385,
            "longitude": 78.4867
          },
          "priceRange": "$$",
          "openingHours": "Mo-Fr 09:00-18:00"
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.wysele.com/#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What does Wysele actually do?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Wysele partners with enterprises to engineer intelligent SAP ecosystems, cloud-native solutions, and AI-driven strategies. We deliver outcomes that create lasting competitive advantage across every market we serve."
              }
            },
            {
              "@type": "Question",
              "name": "Who is Wysele suitable for?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Wysele is suitable for ambitious enterprises and organizations looking to undergo digital transformation, modernize their infrastructure, or implement complex SAP solutions with agility and precision."
              }
            },
            {
              "@type": "Question",
              "name": "How does a project with you work?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We start with a comprehensive architectural discovery phase, followed by agile development sprints. Our team works closely with stakeholders to ensure seamless integration, rigorous testing, and continuous deployment."
              }
            },
            {
              "@type": "Question",
              "name": "What does it cost to work with Wysele?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Pricing depends on the scope, timeline, and technical complexity of your specific requirements. We offer flexible engagement models tailored to provide maximum ROI for your organization. Contact our team for a detailed proposal."
              }
            },
            {
              "@type": "Question",
              "name": "What tools do you use?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We leverage a modern, enterprise-grade technology stack including SAP, AWS, React, Node.js, and advanced AI frameworks, ensuring scalable, secure, and high-performance solutions."
              }
            },
            {
              "@type": "Question",
              "name": "Why Wysele and not another agency?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Unlike traditional agencies, we combine deep domain expertise with rapid digital execution. Our multi-disciplinary team brings a strategic, outcome-focused approach rather than just fulfilling technical requirements."
              }
            }
          ]
        }
      ]
    }
  },
  "/about": {
    title: "About Wysele Technologies | Enterprise IT Solutions Company",
    description: "Learn about Wysele Technologies, a digital transformation company delivering SAP, Salesforce, cybersecurity, AI/ML, cloud, and enterprise IT solutions.",
    keywords: "about Wysele Technologies, enterprise IT company, digital transformation company, SAP consulting company, Salesforce solutions provider, cybersecurity services, AI ML solutions, cloud services",
    canonical: "https://www.wysele.com/about",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Wysele Technologies",
      "description": "Learn about Wysele Technologies, a digital transformation company delivering SAP, Salesforce, cybersecurity, AI/ML, cloud, and enterprise IT solutions.",
      "url": "https://www.wysele.com/about",
      "publisher": {
        "@type": "Organization",
        "name": "Wysele Technologies",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.wysele.com/og-image.png"
        }
      }
    }
  },
  "/industries": {
    title: "Industries | Wysele",
    description: "Explore the industries served by Wysele with innovative digital transformation, technology, and business solutions.",
    keywords: "industry solutions, manufacturing IT solutions, logistics technology services, banking digital transformation, retail technology solutions, enterprise industry solutions",
    canonical: "https://www.wysele.com/industries",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.wysele.com/industries#webpage",
          "url": "https://www.wysele.com/industries",
          "name": "Industries We Serve | Wysele Technologies",
          "description": "Explore Wysele Technologies industry solutions for manufacturing, logistics, banking, retail, utilities, pharmaceuticals, and digital transformation.",
          "isPartOf": {
            "@type": "WebSite",
            "@id": "https://www.wysele.com/#website",
            "url": "https://www.wysele.com/",
            "name": "Wysele Technologies"
          }
        },
        {
          "@type": "Organization",
          "@id": "https://www.wysele.com/#organization",
          "name": "Wysele Technologies",
          "url": "https://www.wysele.com/",
          "logo": "https://www.wysele.com/og-image.png"
        }
      ]
    }
  },
  "/careers": {
    title: "Wysele Technologies Careers | Join Our Digital Transformation Team",
    description: "Explore career opportunities at Wysele Technologies in SAP, Salesforce, Cybersecurity, Cloud, and IT Infrastructure.",
    keywords: "Wysele Careers, IT Jobs, Digital Transformation Careers, SAP Jobs, Salesforce Careers, Cybersecurity Jobs, Cloud Careers, IT Infrastructure Jobs, Technology Careers, Wysele Technologies",
    canonical: "https://www.wysele.com/careers",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Wysele Technologies LLP",
      "url": "https://www.wysele.com",
      "logo": "https://www.wysele.com/og-image.png"
    }
  },
  "/contact": {
    title: "Contact Wysele Technologies | Get in Touch",
    description: "Contact Wysele Technologies for SAP, Salesforce, cybersecurity, and digital transformation services.",
    keywords: "Contact Wysele Technologies, SAP Support, IT Services Contact",
    canonical: "https://www.wysele.com/contact",
    robots: "index, follow",
    ogImage: "https://www.wysele.com/og-image.png",
  },
  "/blogs": {
    title: "Insights & Industry Blogs | Wysele Technologies",
    description: "Stay updated with the latest trends in digital transformation, SAP services, AI/ML, cybersecurity, and cloud solutions on the Wysele blog.",
    keywords: "tech blogs, digital transformation insights, SAP trends, cybersecurity updates, AI ML articles, cloud migration tips",
    canonical: "https://www.wysele.com/blogs",
    ogImage: "https://www.wysele.com/og-image.png",
  },
  "/sitemap": {
    title: "Site Map | Wysele Technologies",
    description: "Complete HTML sitemap of Wysele Technologies — navigate all pages including SAP services, technology services, blogs, careers, and more.",
    keywords: "sitemap, Wysele sitemap, all pages, website map, page directory",
    canonical: "https://www.wysele.com/sitemap",
    robots: "index, follow",
    ogImage: "https://www.wysele.com/og-image.png",
  },
  "/sap-services": {
    title: "SAP Services Company | Wysele Technologies",
    description: "Wysele Technologies provides SAP services including implementation, migration, integration, and business process support for enterprises.",
    keywords: "SAP Services, SAP Consulting, SAP Solutions, SAP Migration, SAP Integration, SAP Support",
    canonical: "https://www.wysele.com/sap-services",
    robots: "index, follow",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: makeServiceSchema("SAP Services", "Wysele Technologies provides SAP services including implementation, migration, integration, and business process support for enterprises.", "/sap-services")
  },
  "/services/sap-consulting": {
    title: "SAP Consulting Services | Wysele Technologies",
    description: "Get SAP consulting services for implementation, system improvement, migration, and operational support from Wysele Technologies.",
    keywords: "SAP Consulting, SAP Services, SAP Experts, SAP Support, SAP Solutions",
    canonical: "https://www.wysele.com/services/sap-consulting",
    robots: "index, follow",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "SAP Consulting Services",
          "provider": {
            "@type": "Organization",
            "name": "Wysele Technologies",
            "url": "https://www.wysele.com/",
            "logo": "https://www.wysele.com/og-image.png"
          },
          "description": "Get SAP consulting services for implementation, system improvement, migration, and operational support from Wysele Technologies.",
          "url": "https://www.wysele.com/services/sap-consulting"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What are SAP consulting services?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "SAP consulting services help businesses implement, optimize, manage, and improve SAP systems to support operations, reporting, and business growth."
              }
            },
            {
              "@type": "Question",
              "name": "How long does SAP implementation take?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Implementation timelines depend on business size, project scope, integrations, and customization requirements. Most projects range from a few weeks to several months."
              }
            },
            {
              "@type": "Question",
              "name": "Do you provide SAP S/4HANA migration services?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. We support SAP ECC to SAP S/4HANA migration projects, including planning, testing, data migration, deployment, and optimization."
              }
            },
            {
              "@type": "Question",
              "name": "Can SAP integrate with existing business software?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. SAP systems can integrate with CRM tools, HR platforms, finance systems, inventory tools, and third-party applications."
              }
            },
            {
              "@type": "Question",
              "name": "Which industries benefit from SAP consulting?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Manufacturing, retail, healthcare, logistics, finance, professional services, and enterprise organizations commonly use SAP consulting services."
              }
            },
            {
              "@type": "Question",
              "name": "Do you offer post-implementation support?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. We provide ongoing SAP support, optimization, monitoring, troubleshooting, and user assistance after deployment."
              }
            }
          ]
        }
      ]
    }
  },
  "/services/sap-signavio": {
    title: "SAP Signavio Services | Wysele Technologies",
    description: "Improve business workflows and process visibility with SAP Signavio services offered by Wysele Technologies.",
    keywords: "SAP Signavio, Business Process Management, Workflow Solutions, SAP Services",
    canonical: "https://www.wysele.com/services/sap-signavio",
    robots: "index, follow",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "SAP Signavio Services",
          "provider": {
            "@type": "Organization",
            "name": "Wysele Technologies",
            "url": "https://www.wysele.com/",
            "logo": "https://www.wysele.com/og-image.png"
          },
          "description": "Improve business workflows and process visibility with SAP Signavio services offered by Wysele Technologies.",
          "url": "https://www.wysele.com/services/sap-signavio"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is SAP Signavio?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "SAP Signavio is a business process management and process intelligence platform that helps organizations analyze, optimize, automate, and improve operational workflows."
              }
            },
            {
              "@type": "Question",
              "name": "How does SAP Signavio improve business operations?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "SAP Signavio improves process visibility, workflow efficiency, collaboration, and operational performance through process modeling, process mining, automation, and analytics capabilities."
              }
            },
            {
              "@type": "Question",
              "name": "Can SAP Signavio support SAP S/4HANA transformation?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. SAP Signavio helps organizations prepare for SAP S/4HANA transformation by improving process visibility, workflow optimization, and operational readiness."
              }
            },
            {
              "@type": "Question",
              "name": "What is process mining in SAP Signavio?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Process mining analyzes operational workflows using system data to identify bottlenecks, inefficiencies, delays, and improvement opportunities."
              }
            },
            {
              "@type": "Question",
              "name": "Which industries benefit from SAP Signavio services?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Manufacturing, retail, healthcare, logistics, finance, technology, and professional services commonly benefit from SAP Signavio consulting and process optimization solutions."
              }
            },
            {
              "@type": "Question",
              "name": "Why is process governance important?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Process governance helps organizations maintain workflow consistency, improve accountability, support compliance requirements, and strengthen operational transparency."
              }
            }
          ]
        }
      ]
    }
  },
  "/services/sap-datasphere": {
    title: "SAP Datasphere Solutions | Wysele Technologies",
    description: "Manage and connect enterprise data with SAP Datasphere services from Wysele Technologies for reporting and analytics.",
    keywords: "SAP Datasphere, SAP Analytics, Data Integration, Business Intelligence",
    canonical: "https://www.wysele.com/services/sap-datasphere",
    robots: "index, follow",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: makeServiceSchema("SAP Datasphere Solutions", "Manage and connect enterprise data with SAP Datasphere services from Wysele Technologies for reporting and analytics.", "/services/sap-datasphere")
  },
  "/services/rise-with-sap": {
    title: "RISE with SAP Services | Wysele Technologies",
    description: "Support your cloud ERP journey with RISE with SAP services and migration support from Wysele Technologies.",
    keywords: "RISE with SAP, SAP Cloud ERP, SAP Migration, SAP Services",
    canonical: "https://www.wysele.com/services/rise-with-sap",
    robots: "index, follow",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: makeServiceSchema("RISE with SAP Services", "Support your cloud ERP journey with RISE with SAP services and migration support from Wysele Technologies.", "/services/rise-with-sap")
  },
  "/services/sap-btp": {
    title: "SAP BTP Services | Wysele Technologies",
    description: "Wysele Technologies offers SAP BTP services for integration, application support, automation, and cloud development.",
    keywords: "SAP BTP, SAP Platform, SAP Integration, SAP Cloud Services",
    canonical: "https://www.wysele.com/services/sap-btp",
    robots: "index, follow",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: makeServiceSchema("SAP BTP Services", "Wysele Technologies offers SAP BTP services for integration, application support, automation, and cloud development.", "/services/sap-btp")
  },
  "/services/sap-integration": {
    title: "SAP Integration Services | Wysele Technologies",
    description: "Integrate enterprise applications and business systems with SAP integration services from Wysele Technologies.",
    keywords: "SAP Integration, SAP CPI, Enterprise Integration, SAP APIs, System Integration",
    canonical: "https://www.wysele.com/services/sap-integration",
    robots: "index, follow",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: makeServiceSchema("SAP Integration Services", "Integrate enterprise applications and business systems with SAP integration services from Wysele Technologies.", "/services/sap-integration")
  },
  "/services/sap-vim-brim": {
    title: "SAP VIM & BRIM Solutions | Wysele Technologies",
    description: "Improve invoice and billing management with SAP VIM and BRIM services from Wysele Technologies.",
    keywords: "SAP VIM, SAP BRIM, Invoice Management, Billing Solutions, SAP Automation",
    canonical: "https://www.wysele.com/services/sap-vim-brim",
    robots: "index, follow",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: makeServiceSchema("SAP VIM & BRIM Solutions", "Improve invoice and billing management with SAP VIM and BRIM services from Wysele Technologies.", "/services/sap-vim-brim")
  },
  "/services/sap-migration": {
    title: "SAP Migration Services | Wysele Technologies",
    description: "Migrate enterprise systems securely with SAP cloud and SAP S/4HANA migration services from Wysele Technologies.",
    keywords: "SAP Migration, SAP Cloud Migration, SAP S4HANA Migration, Data Migration",
    canonical: "https://www.wysele.com/services/sap-migration",
    robots: "index, follow",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: makeServiceSchema("SAP Migration Services", "Migrate enterprise systems securely with SAP cloud and SAP S/4HANA migration services from Wysele Technologies.", "/services/sap-migration")
  },
  "/services/sap-s4hana": {
    title: "SAP S/4HANA Services | Wysele Technologies",
    description: "Modernize your business with SAP S/4HANA implementation, migration, and optimization services from Wysele Technologies.",
    keywords: "SAP S4HANA, Intelligent ERP, SAP ERP Solutions, SAP Implementation",
    canonical: "https://www.wysele.com/services/sap-s4hana",
    robots: "index, follow",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: makeServiceSchema("SAP S/4HANA Services", "Modernize your business with SAP S/4HANA implementation, migration, and optimization services from Wysele Technologies.", "/services/sap-s4hana")
  },
  "/services/sap-genai": {
    title: "SAP GenAI Solutions | Wysele Technologies",
    description: "Leverage SAP GenAI solutions for automation, analytics, and enterprise intelligence from Wysele Technologies.",
    keywords: "SAP GenAI, AI in SAP, SAP Artificial Intelligence, Enterprise AI Solutions",
    canonical: "https://www.wysele.com/services/sap-genai",
    robots: "index, follow",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: makeServiceSchema("SAP GenAI Solutions", "Leverage SAP GenAI solutions for automation, analytics, and enterprise intelligence from Wysele Technologies.", "/services/sap-genai")
  },
  "/services/sap-masterdata": {
    title: "SAP Master Data Services | Wysele Technologies",
    description: "Manage and maintain accurate enterprise data with SAP Master Data services from Wysele Technologies.",
    keywords: "SAP Master Data, Master Data Management, SAP Data Services, SAP MDM",
    canonical: "https://www.wysele.com/services/sap-masterdata",
    robots: "index, follow",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: makeServiceSchema("SAP Master Data Services", "Manage and maintain accurate enterprise data with SAP Master Data services from Wysele Technologies.", "/services/sap-masterdata")
  },
  "/services/sap-btp-api-management": {
    title: "SAP API Management Services | Wysele Technologies",
    description: "Manage APIs and enterprise integrations efficiently with SAP API management services from Wysele Technologies.",
    keywords: "SAP API Management, SAP APIs, API Integration, SAP BTP Services",
    canonical: "https://www.wysele.com/services/sap-btp-api-management",
    robots: "index, follow",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: makeServiceSchema("SAP API Management Services", "Manage APIs and enterprise integrations efficiently with SAP API management services from Wysele Technologies.", "/services/sap-btp-api-management")
  },
  "/services/sap-technical-consulting": {
    title: "SAP Technical Consulting | Wysele Technologies",
    description: "Get SAP technical consulting services for customization, integration, migration, and enterprise support.",
    keywords: "SAP Technical Consulting, SAP Technical Services, SAP Support, SAP Integration",
    canonical: "https://www.wysele.com/services/sap-technical-consulting",
    robots: "index, follow",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: makeServiceSchema("SAP Technical Consulting", "Get SAP technical consulting services for customization, integration, migration, and enterprise support.", "/services/sap-technical-consulting")
  },
  "/services/sap-opentext": {
    title: "SAP OpenText Services | Wysele Technologies",
    description: "Improve document and enterprise content management with SAP OpenText services from Wysele Technologies.",
    keywords: "SAP OpenText, Enterprise Content Management, SAP Document Management",
    canonical: "https://www.wysele.com/services/sap-opentext",
    robots: "index, follow",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: makeServiceSchema("SAP OpenText Services", "Improve document and enterprise content management with SAP OpenText services from Wysele Technologies.", "/services/sap-opentext")
  },
  "/services/salesforce": {
    title: "Salesforce Services | Wysele Technologies",
    description: "Wysele Technologies provides Salesforce consulting, CRM setup, customization, and support services for businesses.",
    keywords: "Salesforce Services, CRM Solutions, Salesforce Consulting, Salesforce Support",
    canonical: "https://www.wysele.com/services/salesforce",
    robots: "index, follow",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: makeServiceSchema("Salesforce Services", "Wysele Technologies provides Salesforce consulting, CRM setup, customization, and support services for businesses.", "/services/salesforce")
  },
  "/services/cybersecurityhome": {
    title: "Cybersecurity Services | Wysele Technologies",
    description: "Protect business systems and networks with cybersecurity services from Wysele Technologies.",
    keywords: "Cybersecurity Services, Network Security, Security Solutions, IT Security",
    canonical: "https://www.wysele.com/services/cybersecurityhome",
    robots: "index, follow",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: makeServiceSchema("Cybersecurity Services", "Protect business systems and networks with cybersecurity services from Wysele Technologies.", "/services/cybersecurityhome")
  },
  "/services/itinfrastructure": {
    title: "IT Infrastructure Services | Wysele Technologies",
    description: "Optimize business operations with IT infrastructure and cloud support services from Wysele Technologies.",
    keywords: "IT Infrastructure, Managed IT Services, Cloud Infrastructure, IT Solutions",
    canonical: "https://www.wysele.com/services/itinfrastructure",
    robots: "index, follow",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: makeServiceSchema("IT Infrastructure Services", "Optimize business operations with IT infrastructure and cloud support services from Wysele Technologies.", "/services/itinfrastructure")
  },
  "/services/web-development": {
    title: "Web Development Services | Wysele Technologies",
    description: "Build responsive business websites with web development services from Wysele Technologies.",
    keywords: "Web Development, Website Design, Business Websites, Web Solutions",
    canonical: "https://www.wysele.com/services/web-development",
    robots: "index, follow",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: makeServiceSchema("Web Development Services", "Build responsive business websites with web development services from Wysele Technologies.", "/services/web-development")
  },
  "/services/app-development": {
    title: "Mobile App Development | Wysele Technologies",
    description: "Develop Android and iOS applications with professional app development services from Wysele Technologies.",
    keywords: "App Development, Mobile Apps, Android App Development, iOS App Development",
    canonical: "https://www.wysele.com/services/app-development",
    robots: "index, follow",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: makeServiceSchema("Mobile App Development", "Develop Android and iOS applications with professional app development services from Wysele Technologies.", "/services/app-development")
  },
  "/services/iot-services": {
    title: "IoT Services & Solutions | Wysele Technologies",
    description: "Transform business operations with IoT solutions and connected systems from Wysele Technologies.",
    keywords: "IoT Services, Internet of Things, Smart Devices, Connected Systems",
    canonical: "https://www.wysele.com/services/iot-services",
    robots: "index, follow",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: makeServiceSchema("IoT Services & Solutions", "Transform business operations with IoT solutions and connected systems from Wysele Technologies.", "/services/iot-services")
  },
  "/services/aiml-services": {
    title: "AI & ML Services | Wysele Technologies",
    description: "Wysele Technologies provides AI and machine learning services for automation and analytics solutions.",
    keywords: "AI Services, Machine Learning, Artificial Intelligence, Automation Solutions",
    canonical: "https://www.wysele.com/services/aiml-services",
    robots: "index, follow",
    ogImage: "https://www.wysele.com/og-image.png",
    schema: makeServiceSchema("AI & ML Services", "Wysele Technologies provides AI and machine learning services for automation and analytics solutions.", "/services/aiml-services")
  }
};

const SEOManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Determine SEO Config
    let config = SEO_CONFIG_MAP[pathname];

    // Subroute wildcards
    if (!config) {
      if (pathname.startsWith("/admin") || pathname.startsWith("/superadmin") || pathname.startsWith("/masterlogin")) {
        config = {
          title: "Admin Dashboard | Wysele Technologies",
          description: "Admin panel dashboard for managing Wysele content, jobs, and consultations.",
          keywords: "admin, dashboard, HR, content management",
          robots: "noindex, nofollow",
          canonical: `https://www.wysele.com${pathname}`,
          ogImage: "https://www.wysele.com/og-image.png"
        };
      } else if (pathname.startsWith("/blogs/")) {
        // Blog detail pages get generic config;
        // BlogDetailPage.jsx injects the real per-post title/description dynamically
        config = {
          title: "Insights & Industry Blogs | Wysele Technologies",
          description: "Stay updated with the latest trends in digital transformation, SAP services, AI/ML, cybersecurity, and cloud solutions.",
          keywords: "tech blogs, digital transformation insights, SAP trends, cybersecurity updates, AI ML articles, cloud migration tips",
          robots: "index, follow",
          canonical: `https://www.wysele.com${pathname}`,
          ogImage: "https://www.wysele.com/og-image.png"
        };
      } else if (pathname.startsWith("/careers/apply/")) {
        config = {
          title: "Apply Now | Wysele Technologies Careers",
          description: "Submit your job application and join our digital transformation team at Wysele Technologies.",
          keywords: "job application, careers, apply, IT jobs",
          robots: "noindex, nofollow",
          canonical: `https://www.wysele.com${pathname}`,
          ogImage: "https://www.wysele.com/og-image.png"
        };
      } else {
        // Default to Homepage SEO if route is not matched
        config = SEO_CONFIG_MAP["/"];
      }
    }

    // 2. Save Original Head Tags for cleanup
    const prevTitle = document.title;

    // Helper functions
    const updateMeta = (name, value, isProperty = false) => {
      const selector = isProperty ? `meta[property='${name}']` : `meta[name='${name}']`;
      let meta = document.querySelector(selector);
      const originalValue = meta ? meta.getAttribute("content") : null;
      if (!meta) {
        meta = document.createElement("meta");
        if (isProperty) {
          meta.setAttribute("property", name);
        } else {
          meta.setAttribute("name", name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", value);
      return () => {
        if (originalValue !== null) {
          meta.setAttribute("content", originalValue);
        } else {
          meta.remove();
        }
      };
    };

    const updateLink = (rel, value) => {
      let link = document.querySelector(`link[rel='${rel}']`);
      const originalValue = link ? link.getAttribute("href") : null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", rel);
        document.head.appendChild(link);
      }
      link.setAttribute("href", value);
      return () => {
        if (originalValue !== null) {
          link.setAttribute("href", originalValue);
        } else {
          link.remove();
        }
      };
    };

    // Apply main headers
    document.title = config.title;

    const cleanups = [
      updateMeta("description", config.description),
      updateMeta("keywords", config.keywords || ""),
      updateMeta("robots", config.robots || "index, follow"),
      updateMeta("author", "Wysele Technologies LLP"),
      updateMeta("publisher", "Wysele Technologies LLP"),
      
      // Open Graph Tags
      updateMeta("og:title", config.title, true),
      updateMeta("og:description", config.description, true),
      updateMeta("og:url", config.canonical, true),
      updateMeta("og:image", config.ogImage || "https://www.wysele.com/og-image.png", true),
      updateMeta("og:type", "website", true),
      updateMeta("og:site_name", "Wysele Technologies", true),
      updateMeta("og:locale", "en_US", true),
      updateMeta("og:image:width", "1200", true),
      updateMeta("og:image:height", "630", true),
      updateMeta("og:image:type", "image/png", true),

      // Twitter Tags
      updateMeta("twitter:card", "summary_large_image"),
      updateMeta("twitter:site", "@WyseleIT"),
      updateMeta("twitter:creator", "@WyseleIT"),
      updateMeta("twitter:title", config.title),
      updateMeta("twitter:description", config.description),
      updateMeta("twitter:image", config.ogImage || "https://www.wysele.com/og-image.png"),

      // Links
      updateLink("canonical", config.canonical),
      updateLink("image_src", config.ogImage || "https://www.wysele.com/og-image.png")
    ];

    // Schema.org structured data script
    let scriptTag = null;
    
    // Build Dynamic Breadcrumbs
    const currentUrl = `https://www.wysele.com${pathname}`;
    const pathParts = pathname.split('/').filter(Boolean);
    const breadcrumbItems = pathParts.map((part, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
      "item": `https://www.wysele.com/${pathParts.slice(0, index + 1).join('/')}`
    }));

    const dynamicSchema = [
      {
        "@type": "WebPage",
        "@id": `${currentUrl}#webpage`,
        "url": currentUrl,
        "name": config.title,
        "isPartOf": { "@id": "https://www.wysele.com/#website" }
      }
    ];

    if (breadcrumbItems.length > 0) {
      dynamicSchema.push({
        "@type": "BreadcrumbList",
        "@id": `${currentUrl}#breadcrumb`,
        "itemListElement": breadcrumbItems
      });
    }

    const combinedSchemaGraph = config.schema && config.schema["@graph"] 
      ? [...config.schema["@graph"], ...dynamicSchema]
      : config.schema ? [config.schema, ...dynamicSchema] : dynamicSchema;

    const finalSchema = {
      "@context": "https://schema.org",
      "@graph": combinedSchemaGraph
    };

    scriptTag = document.createElement("script");
    scriptTag.type = "application/ld+json";
    scriptTag.id = "dynamic-page-structured-data";
    scriptTag.innerHTML = JSON.stringify(finalSchema);
    document.head.appendChild(scriptTag);

    // 3. Cleanup on Route Change
    return () => {
      document.title = prevTitle;
      cleanups.forEach(cleanupFn => cleanupFn());
      if (scriptTag) {
        scriptTag.remove();
      }
    };
  }, [pathname]);

  return null;
};

export default SEOManager;

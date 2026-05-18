import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import imgSapConsulting from '../../assets/Sapconsulting.jpg';
import imgSapSignavio from '../../assets/Sapsignavio.jpg';
import imgSapDatasphere from '../../assets/Sapdatasphere.jpg';
import imgRiseWithSap from '../../assets/Risewithsap.jpg';
import imgSapBtp from '../../assets/Sapbtp.jpg';
import imgSapIntegration from '../../assets/Sapintegration.jpg';
import imgSapVimBrim from '../../assets/Sapvim&brim.jpg';
import imgSapMigration from '../../assets/Sapmigration.jpg';
import imgSapS4 from '../../assets/Saps4.jpg';
import imgSapGenai from '../../assets/Sapgenai.jpg';
import imgSapMasterData from '../../assets/Sapmasterdata.jpg';
import imgSapBtpApi from '../../assets/Sapbtp&api.jpg';
import imgSapTechnicalConsulting from '../../assets/Saptechnicalconsulting.jpg';
import imgSapOpentext from '../../assets/Sapopentext.jpg';

const SAP_SERVICES = [
  {
    label: "SAP Consulting Services",
    desc: "Expert strategy and end-to-end SAP implementation tailored to your business needs.",
    path: "/services/sap-consulting",
    img: imgSapConsulting,
  },
  {
    label: "SAP Signavio Solutions",
    desc: "Process mining and business transformation with advanced analytics.",
    path: "/services",
    img: imgSapSignavio,
  },
  {
    label: "SAP Datasphere Support",
    desc: "Modern unified data experience across the entire enterprise.",
    path: "/services/sap-datasphere",
    img: imgSapDatasphere,
  },
  {
    label: "RISE with SAP",
    desc: "Simplified, accelerated path to intelligent cloud ERP.",
    path: "/services/rise-with-sap",
    img: imgRiseWithSap,
  },
  {
    label: "BTP Services",
    desc: "Integration and application platform services for modern enterprises.",
    path: "/services",
    img: imgSapBtp,
  },
  {
    label: "SAP Integration Services",
    desc: "Seamless cross-system connectivity and real-time data flow.",
    path: "/services",
    img: imgSapIntegration,
  },
  {
    label: "SAP VIM & BRIM Services",
    desc: "Digital billing and invoice management powered by automation.",
    path: "/services",
    img: imgSapVimBrim,
  },
  {
    label: "Migration Services",
    desc: "Secure, seamless data and system migrations for business continuity.",
    path: "/services",
    img: imgSapMigration,
  },
  {
    label: "S/4 HANA Conversion",
    desc: "Intelligent ERP upgrade to future-proof your digital landscape.",
    path: "/services",
    img: imgSapS4,
  },
  {
    label: "Gen AI Services",
    desc: "Next-generation AI capabilities embedded into your SAP ecosystem.",
    path: "/services",
    img: imgSapGenai,
  },
  {
    label: "Master Data Governance",
    desc: "A single source of truth for consistent, accurate enterprise data.",
    path: "/services",
    img: imgSapMasterData,
  },
  {
    label: "SAP BTP & API Management",
    desc: "Build, manage and scale enterprise APIs with SAP BTP.",
    path: "/services",
    img: imgSapBtpApi,
  },
  {
    label: "Technical Consulting",
    desc: "Deep technical SAP expertise to optimise your system landscape.",
    path: "/services",
    img: imgSapTechnicalConsulting,
  },
  {
    label: "OpenText Services",
    desc: "Content, archiving and enterprise information management.",
    path: "/services",
    img: imgSapOpentext,
  },
];

export default function SapServicesList() {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-16 overflow-hidden">
      <style>{`
        .product-card {
          width: 100%;
          max-width: 350px;
          height: 280px;
          position: relative;
          background: #fff;
          overflow: hidden;
          transition: all 400ms cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.06);
          border-radius: 0px;
          cursor: pointer;
        }

        .product-card:hover {
          box-shadow: 0px 15px 40px -5px rgba(0, 0, 0, 0.2);
          transform: translateY(-8px);
        }

        .image-container {
          width: 100%;
          height: 200px;
          position: relative;
          overflow: hidden;
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 500ms ease-out;
        }

        .product-card:hover .image-container img {
          transform: scale(1.08);
        }

        .view-details-btn {
          position: absolute;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 1.5px solid #fff;
          color: #fff;
          font-size: 13px;
          text-align: center;
          text-transform: uppercase;
          font-weight: 700;
          padding: 8px 20px;
          opacity: 0;
          transition: all 400ms cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 5;
          letter-spacing: 1px;
        }

        .product-card:hover .view-details-btn {
          opacity: 1;
          top: 50%;
        }

        .view-details-btn:hover {
          background: #fff;
          color: #C9184A;
        }

        .stats-container {
          background: #fff;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: auto;
          padding: 20px 24px;
          transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 4;
          transform: translateY(calc(100% - 80px));
        }

        .product-card:hover .stats-container {
          transform: translateY(0);
        }

        .product_name {
          font-size: 17px;
          font-weight: 700;
          color: #1a1c22;
          margin-bottom: 6px;
          line-height: 1.3;
        }

        .product_desc {
          font-size: 13.5px;
          color: #6b7280;
          line-height: 1.6;
          opacity: 0;
          transform: translateY(10px);
          transition: all 400ms cubic-bezier(0.22, 1, 0.36, 1) 100ms;
        }

        .product-card:hover .product_desc {
          opacity: 1;
          transform: translateY(0);
        }

        .accent-divider {
          width: 25px;
          height: 3px;
          background: #C9184A;
          margin-top: 12px;
        }
      `}</style>

      <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-[1.5px] bg-[#C9184A]" />
          <span className="text-[11px] font-bold tracking-[0.3em] text-[#C9184A] uppercase">
            Solutions
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-16">
          SAP Service Portfolio
        </h2>

        {/* 3-column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4 justify-items-center">
          {SAP_SERVICES.map((service, index) => (
            <motion.div
              key={service.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="product-card"
              onClick={() => { navigate(service.path); window.scrollTo(0, 0); }}
            >
              <div className="image-container">
                <img src={service.img} alt={service.label} />
                <div className="view-details-btn">View Details</div>
              </div>

              <div className="stats-container">
                <div className="product_name">{service.label}</div>
                <div className="product_desc">{service.desc}</div>
                <div className="accent-divider" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

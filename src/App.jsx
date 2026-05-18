import React, { useState, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import LoadingScreen from "./loading/LoadingScreen";
import Navbar from "./components/layout/navbar/Navbar";
import ScrollProgressBar from "./components/common/ScrollProgressBar";
import LeftSidebar from "./components/layout/navbar/LeftSidebar";

// Lazy load pages for better performance
const LandingPages = lazy(() => import("./components/layout/section/LandingPages"));
const AboutPage = lazy(() => import("./pages/AboutUs/AboutPage"));
const SapConsulting = lazy(() => import("./pages/OurServices/SapConsulting/SapHero"));
const SapSignavio = lazy(() => import("./pages/OurServices/SapSignavio/SapSignavioPage"));
const SapDatasphere = lazy(() => import("./pages/OurServices/SapDatasphere/SapDataspherePage"));
const RiseWithSap = lazy(() => import("./pages/OurServices/RiseWithsap/RiseWithSapPage"));
const SapServices = lazy(() => import("./pages/SapServices/SapServiceshero"));
const SapBtp = lazy(() => import("./pages/OurServices/BtpServices/SapBtp"));
const SapIntegration = lazy(() => import("./pages/OurServices/SapIntegration/SapIntegrationPage"));
const IndustriesPage = lazy(() => import("./pages/Industries/IndustriesPage"));
const ContactPage = lazy(() => import("./pages/ContactUs/ContactPage"));
const SapVimPage = lazy(() => import("./pages/OurServices/SapVimbrim/SapVimPage"));
const SapMigrationPage = lazy(() => import("./pages/OurServices/MigrationServices/SapMigrationPage"));
const WebDevelopment = lazy(() => import("./pages/WebDevelopment/WebDevelopmentpages"));
const AppDevelopment = lazy(() => import("./pages/AppDeveiopment/AppDevelopmentpsges"));
const SapS4hanaPage = lazy(() => import("./pages/OurServices/SapS4hana/SapS4pages"));
const SapGenaiPage = lazy(() => import("./pages/OurServices/SapGenai/SapGenaipages"));
const SapMasterPage = lazy(() => import("./pages/OurServices/SapMasterdata/SapMasterPage"));
const SapBtpApiPage = lazy(() => import("./pages/OurServices/SapBtpapimanagement/Sapbtpapipage"));
const SapTechnicalConsultingPage = lazy(() => import("./pages/OurServices/SapTechnicalconsulting/SapTechnicalconsultingpage"));
const SapOpentextPage = lazy(() => import("./pages/OurServices/SapOpentext/SapOpentextpage"));

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative min-h-screen" style={{ background: "#000" }}>
      <Navbar />
      <LeftSidebar />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<LandingPages />} />
          <Route path="/about/*" element={<AboutPage />} />
          <Route path="/services/sap-consulting" element={<SapConsulting />} />
          <Route path="/services/sap-signavio" element={<SapSignavio />} />
          <Route path="/services/sap-datasphere" element={<SapDatasphere />} />
          <Route path="/services/rise-with-sap" element={<RiseWithSap />} />
          <Route path="/services/sap-btp" element={<SapBtp />} />
          <Route path="/services/sap-integration" element={<SapIntegration />} />
          <Route path="/services/sap-vim-brim" element={<SapVimPage />} />
          <Route path="/services/sap-migration" element={<SapMigrationPage />} />
          <Route path="/services/web-development" element={<WebDevelopment />} />
          <Route path="/services/app-development" element={<AppDevelopment />} />
          <Route path="/services/sap-s4hana" element={<SapS4hanaPage />} />
          <Route path="/services/sap-genai" element={<SapGenaiPage />} />
          <Route path="/services/sap-masterdata" element={<SapMasterPage />} />
          <Route path="/services/sap-btp-api-management" element={<SapBtpApiPage />} />
          <Route path="/services/sap-technical-consulting" element={<SapTechnicalConsultingPage />} />
          <Route path="/services/sap-opentext" element={<SapOpentextPage />} />
          <Route path="/sap-services" element={<SapServices />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<h1 className="text-white">404 - Page Not Found</h1>} />
        </Routes>
      </Suspense>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <ScrollProgressBar />
    </div>
  );
}
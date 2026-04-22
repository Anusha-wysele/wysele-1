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
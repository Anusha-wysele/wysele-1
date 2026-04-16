import React, { useState, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import LoadingScreen from "./loading/LoadingScreen";
import Navbar from "./components/layout/navbar/Navbar";
import ScrollProgressBar from "./components/common/ScrollProgressBar";

// Lazy load pages for better performance
const LandingPages = lazy(() => import("./components/layout/section/LandingPages"));
const AboutPage = lazy(() => import("./pages/AboutUs/AboutPage"));
const SapConsulting = lazy(() => import("./pages/OurServices/SapConsulting/SapHero"));

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative min-h-screen" style={{ background: "#000" }}>
      <Navbar />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<LandingPages />} />
          <Route path="/about/*" element={<AboutPage />} />
          <Route path="/services/sap-consulting" element={<SapConsulting />} />
          <Route path="*" element={<h1 className="text-white">404 - Page Not Found</h1>} />
        </Routes>
      </Suspense>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <ScrollProgressBar />
    </div>
  );
}
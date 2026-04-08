import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import LoadingScreen from "./loading/LoadingScreen";
import LandingPages from "./components/layout/section/LandingPages";
import AboutPage from "./pages/AboutUs/AboutPage";
import Navbar from "./components/layout/navbar/Navbar";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative min-h-screen" style={{ background: "#000" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPages />} />
        <Route path="/about/*" element={<AboutPage />} />
        <Route path="*" element={<h1 className="text-white">404 - Page Not Found</h1>} />
      </Routes>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
    </div>
  );
}
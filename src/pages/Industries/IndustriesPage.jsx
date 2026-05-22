import React, { Suspense, lazy, useEffect } from "react";
import { useLocation } from "react-router-dom";
import IndustriesHero from "./IndustriesHero";
import IndustriesNav from "./IndustriesNav";
import Footer from "../../components/layout/section/Footer";

// Lazy load industry components
const Manufacturing = lazy(() => import("./IndustriesManufacturing"));
const Utilities = lazy(() => import("./Industriesutilities"));
const Logistics = lazy(() => import("./IndustriesLogistics"));
const Pharmaceutical = lazy(() => import("./IndustriesPharmaceutical"));
const Agribusiness = lazy(() => import("./IndustriesAgribusiness"));
const Aerospace = lazy(() => import("./IndustriesAerospace"));
const Automotive = lazy(() => import("./IndustriesAutomotive"));
const Banking = lazy(() => import("./IndustriesBanking"));
const Retail = lazy(() => import("./IndustriesRetail"));
const Textiles = lazy(() => import("./IndusstriesTextiles"));
const Mining = lazy(() => import("./IndustriesMining"));

const IndustriesPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const navbar = document.getElementById("main-navbar") || document.querySelector("nav.fixed");
          const offset = navbar ? navbar.getBoundingClientRect().bottom + 55 : 123;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <main className="bg-white">
      <IndustriesHero />
      <IndustriesNav />

      <div className="space-y-0">
        <Suspense fallback={<div className="h-20" />}>
          <div id="manufacturing"><Manufacturing /></div>
          <div id="utilities"><Utilities /></div>
          <div id="logistics"><Logistics /></div>
          <div id="pharmaceutical"><Pharmaceutical /></div>
          <div id="agribusiness"><Agribusiness /></div>
          <div id="aerospace"><Aerospace /></div>
          <div id="automotive"><Automotive /></div>
          <div id="banking"><Banking /></div>
          <div id="retail"><Retail /></div>
          <div id="textiles"><Textiles /></div>
          <div id="mining"><Mining /></div>
        </Suspense>
      </div>

      <Footer />
    </main>
  );
};

export default IndustriesPage;

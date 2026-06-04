import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Footer from "../../components/layout/section/Footer";
import IndustriesHero from "./IndustriesHero";
import IndustriesNav from "./IndustriesNav";
import Manufacturing from "./IndustriesManufacturing";
import Utilities from "./Industriesutilities";
import Logistics from "./IndustriesLogistics";
import Pharmaceutical from "./IndustriesPharmaceutical";
import Agribusiness from "./IndustriesAgribusiness";
import Aerospace from "./IndustriesAerospace";
import Automotive from "./IndustriesAutomotive";
import Banking from "./IndustriesBanking";
import Retail from "./IndustriesRetail";
import Textiles from "./IndusstriesTextiles";
import Mining from "./IndustriesMining";


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
      <Breadcrumbs />
      <IndustriesNav />

      <div className="space-y-0">
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
      </div>

      <Footer />
    </main>
  );
};

export default IndustriesPage;

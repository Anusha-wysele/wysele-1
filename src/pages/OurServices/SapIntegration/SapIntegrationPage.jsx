import React from "react";
import SapIntegrationhero from "./SapIntegrationhero";
import Sapintegrationservices from "./Sapintegrationservices";
import SapIntegrationbusiness from "./SapIntegrationbusiness";
import SapIntegrationhelp from "./SapIntegrationhelp";
import GetInTouch from "../../../components/layout/section/GetinTouch";
import Footer from "../../../components/layout/section/Footer";

const SapIntegrationPage = () => {
  return (
    <main className="bg-white min-h-screen">
      <SapIntegrationhero />
      <SapIntegrationbusiness />
      <Sapintegrationservices />
      <SapIntegrationhelp />
      <div id="contact">
        <GetInTouch />
      </div>
      <Footer />
    </main>
  );
};

export default SapIntegrationPage;

import React from "react";
import ContactHero from "./ContactHero";
import GetInTouch from "../../components/layout/section/GetinTouch";
import OurLocations from "../../components/layout/section/OurLocations";
import Footer from "../../components/layout/section/Footer";

const ContactPage = () => {
  return (
    <main className="bg-white min-h-screen">
      <ContactHero />
      <GetInTouch />
      <OurLocations />
      <Footer />
    </main>
  );
};

export default ContactPage;

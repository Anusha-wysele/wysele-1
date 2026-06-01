import Breadcrumbs from "../../components/common/Breadcrumbs";
import Footer from "../../components/layout/section/Footer";
import GetInTouch from "../../components/layout/section/GetinTouch";
import OurLocations from "../../components/layout/section/OurLocations";
import ContactHero from "./ContactHero";

const ContactPage = () => {
  return (
    <main className="bg-white min-h-screen">
      <ContactHero />
      <Breadcrumbs />
      <GetInTouch />
      <OurLocations />
      <Footer />
    </main>
  );
};

export default ContactPage;

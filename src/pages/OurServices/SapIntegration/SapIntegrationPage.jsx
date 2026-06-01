import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Footer from "../../../components/layout/section/Footer";
import SapIntegrationbusiness from "./SapIntegrationbusiness";
import SapIntegrationhelp from "./SapIntegrationhelp";
import SapIntegrationhero from "./SapIntegrationhero";
import Sapintegrationservices from "./Sapintegrationservices";

const SapIntegrationPage = () => {
  return (
    <main className="bg-white min-h-screen">
      <SapIntegrationhero />
      <Breadcrumbs />
      <SapIntegrationbusiness />
      <Sapintegrationservices />
      <SapIntegrationhelp />
      <Footer />
    </main>
  );
};

export default SapIntegrationPage;

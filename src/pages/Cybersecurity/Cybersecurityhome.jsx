import Breadcrumbs from '../../components/common/Breadcrumbs';
import Footer from '../../components/layout/section/Footer';
import CybersecurityHero from './Cybersecurityhero';
import CybersecurityIndustries from './CybersecurityIndustries';
import CybersecurityProcess from './CybersecurityProcess';
import CybersecurityServices from './CybersecurityServices';
import CybersecurityThreats from './CybersecurityThreats';
import CybersecurityWhyChooseUs from './CybersecurityWhyChooseUs';

const Cybersecurityhome = () => {
  return (
    <main className="bg-black min-h-screen">
      <div className="w-full">
        <CybersecurityHero />
      </div>
      <Breadcrumbs />
      <CybersecurityServices />
      <CybersecurityThreats />
      <CybersecurityWhyChooseUs />
      <CybersecurityProcess />
      <CybersecurityIndustries />
      <Footer />
    </main>
  );
};

export default Cybersecurityhome;

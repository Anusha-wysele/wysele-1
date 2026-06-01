import Footer from '../../components/layout/section/Footer';

import Breadcrumbs from '../../components/common/Breadcrumbs';
import ItInfrastructureHero from './ItInfrastructureHero';
import ItInfrastructureProcess from './ItInfrastructureProcess';
import ItInfrastructureServices from './ItInfrastructureServices';
import ItInfrastructureWhyChooseUs from './ItInfrastructureWhyChooseUs';

const ItInfrastrutureHome = () => {
  return (
    <main className="bg-white min-h-screen">
      <ItInfrastructureHero />
      <Breadcrumbs />
      <ItInfrastructureServices />
      <ItInfrastructureProcess />
      <ItInfrastructureWhyChooseUs />
      <Footer />
    </main>
  );
};

export default ItInfrastrutureHome;
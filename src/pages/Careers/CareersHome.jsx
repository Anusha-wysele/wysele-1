import { useEffect } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import CareersCulture from './CareersCulture';
import CareersHero from './CareersHero';
import CareersOpenings from './CareersOpenings';
import CareersWhyJoin from './CareersWhyJoin';

const CareersHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <CareersHero />
      <Breadcrumbs />
      <CareersWhyJoin />
      <CareersCulture />
      <div id="open-positions">
        <CareersOpenings />
      </div>
      {/* <CareersCTA /> */}
    </main>
  );
};

export default CareersHome;

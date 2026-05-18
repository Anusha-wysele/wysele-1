import React, { useEffect } from 'react';
import CareersHero from './CareersHero';
import CareersWhyJoin from './CareersWhyJoin';
import CareersCulture from './CareersCulture';
import CareersOpenings from './CareersOpenings';
import CareersCTA from './CareersCTA';

const CareersHome = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <CareersHero />
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

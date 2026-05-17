import React from 'react';
import Footer from '../../components/layout/section/Footer';
import CybersecurityHero from './Cybersecurityhero';
import CybersecurityServices from './CybersecurityServices';
import CybersecurityThreats from './CybersecurityThreats';
import CybersecurityIndustries from './CybersecurityIndustries';
import CybersecurityProcess from './CybersecurityProcess';
import CybersecurityWhyChooseUs from './CybersecurityWhyChooseUs';

const Cybersecurityhome = () => {
  return (
    <main className="bg-black min-h-screen">
      <div className="pt-[68px]">
        <CybersecurityHero />
      </div>
      <CybersecurityServices />
      <CybersecurityThreats />
       <CybersecurityWhyChooseUs />
      <CybersecurityIndustries />
     
      {/* <CybersecurityProcess /> */}
      <Footer/>
    </main>
  );
};

export default Cybersecurityhome;
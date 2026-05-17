import React from 'react';
import Footer from '../../components/layout/section/Footer';
import SalesforceHero from './salesforcehero';
import SalesforceIntro from './SalesforceIntro';
import SalesforceTabs from './SalesforceTabs';
import SalesforceProducts from './SalesforceProducts';
import WhyChooseUs from './WhyChooseUs';
import SalesforceProcess from './SalesforceProcess';

const Salesforcepages = () => {
  return (
    <main className='bg-[#050505] min-h-screen'>
        <SalesforceHero />
        <SalesforceIntro />
        <SalesforceTabs />
         <SalesforceProcess />
         
        <WhyChooseUs />
        <SalesforceProducts />
       
        
        <Footer/>
    </main>
  );
};

export default Salesforcepages;

import Breadcrumbs from '../../components/common/Breadcrumbs';
import Footer from '../../components/layout/section/Footer';
import SalesforceHero from './salesforcehero';
import SalesforceIntro from './SalesforceIntro';
import SalesforceProcess from './SalesforceProcess';
import SalesforceProducts from './SalesforceProducts';
import SalesforceTabs from './SalesforceTabs';
import WhyChooseUs from './WhyChooseUs';

const Salesforcepages = () => {
  return (
    <main className='bg-[#050505] min-h-screen'>
        <SalesforceHero />
        <Breadcrumbs />
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

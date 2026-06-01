import Breadcrumbs from '../../../components/common/Breadcrumbs';
import Footer from '../../../components/layout/section/Footer';
import HowRisework from './HowRisework';
import RiseBenifits from './RiseBenifits';
import RiseWithsaphero from './RiseWithsaphero';
import WhatRisewithsap from './WhatRisewithsap';
import WhyChooserise from './WhyChooserise';

const RiseWithSapPage = () => {
    return (
        <main className="bg-white">
            <RiseWithsaphero />
            <Breadcrumbs />
            <WhatRisewithsap />
            <WhyChooserise />
            <RiseBenifits />
            <HowRisework />
            <Footer />
        </main>
    );
};

export default RiseWithSapPage;

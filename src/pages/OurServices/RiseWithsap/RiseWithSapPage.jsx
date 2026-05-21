import React from 'react';
import RiseWithsaphero from './RiseWithsaphero';
import WhatRisewithsap from './WhatRisewithsap';
import HowRisework from './HowRisework';
import RiseBenifits from './RiseBenifits';
import WhyChooserise from './WhyChooserise';
import Footer from '../../../components/layout/section/Footer';

const RiseWithSapPage = () => {
    return (
        <main className="bg-white">
            <RiseWithsaphero />
            <WhatRisewithsap />
            <WhyChooserise />
            <RiseBenifits />
            <HowRisework />
            <Footer />
        </main>
    );
};

export default RiseWithSapPage;

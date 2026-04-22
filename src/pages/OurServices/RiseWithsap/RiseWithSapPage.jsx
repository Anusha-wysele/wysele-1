import React from 'react';
import RiseWithsaphero from './RiseWithsaphero';
import WhatRisewithsap from './WhatRisewithsap';
import HowRisework from './HowRisework';
import RiseBenifits from './RiseBenifits';
import WhyChooserise from './WhyChooserise';
import Footer from '../../../components/layout/section/Footer';

const RiseWithSapPage = () => {
    return (
        <div className="pt-[68px]">
            <RiseWithsaphero />
            <WhatRisewithsap />
            <WhyChooserise />
            <RiseBenifits />
            <HowRisework />
            <Footer />
        </div>
    );
};

export default RiseWithSapPage;

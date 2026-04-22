import React from 'react';
import BtpHero from './BtpHero';
import EmpoverSapbtp from './EmpoverSapbtp';
import BtpSapservices from './BtpSapservices';
import BtpWhychoose from './BtpWhychoose';
import Footer from '../../../components/layout/section/Footer';

const SapBtp = () => {
    return (
        <main className="bg-white">
            <BtpHero />
            <EmpoverSapbtp />
            <BtpSapservices />
            <BtpWhychoose />
            {/* Add other BTP sections here as we build them */}
            <Footer />
        </main>
    );
};

export default SapBtp;

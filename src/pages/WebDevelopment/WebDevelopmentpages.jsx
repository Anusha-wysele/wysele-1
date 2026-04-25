import React from 'react';
import WebDevelopmenthero from './WebDevelopmenthero';
import WebServicesweoffer from './WebServicesweoffer';
import WebDevBenefits from './WebDevBenefits';
import Footer from '../../components/layout/section/Footer';

const WebDevelopmentPage = () => {
    return (
        <main className="bg-white">
            <WebDevelopmenthero />
            <WebServicesweoffer />
            <WebDevBenefits />
            {/* Additional sections can be added here later */}
            <Footer />
        </main>
    );
};

export default WebDevelopmentPage;

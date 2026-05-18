import React from 'react';
import WebDevelopmenthero from './WebDevelopmenthero';
import WebServicesweoffer from './WebServicesweoffer';
import WebDevelopmentProcess from './WebDevelopmectprocess';
import WebDevelopmentShowcase from './WebDevelopmentShowcase';
import WebDevelopmentBenifits from './WebDevelopmentBenifits';
import WebDevelopmentwhychoose from './WebDevelopmentwhychoose';
import Footer from '../../components/layout/section/Footer';

const WebDevelopmentPage = () => {
    return (
        <main className="bg-white">
            <WebDevelopmenthero />
            <WebServicesweoffer />
            <WebDevelopmentProcess />
            <WebDevelopmentShowcase />
            <WebDevelopmentBenifits />
            <WebDevelopmentwhychoose />
            <Footer />
        </main>
    );
};

export default WebDevelopmentPage;

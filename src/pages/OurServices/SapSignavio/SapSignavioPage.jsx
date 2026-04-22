import React from 'react';
import SapSignavioHero from './SapSignavioHero';
import SapSignavioStrengths from './SapSignavioStrengths';
import SapSignavioServices from './SapSignavioServices';
import SapSignavioWhyChooseUs from './SapSignavioWhyChooseUs';
import Footer from '../../../components/layout/section/Footer';

const SapSignavioPage = () => {
    return (
        <main className="bg-white">
            <SapSignavioHero />
            <SapSignavioStrengths />
            <SapSignavioServices />
            <SapSignavioWhyChooseUs />
            <Footer />
        </main>
    );
};

export default SapSignavioPage;

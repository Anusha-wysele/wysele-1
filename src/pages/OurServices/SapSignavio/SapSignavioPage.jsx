import React from 'react';
import SapSignavioHero from './SapSignavioHero';
import SapSignavioStrengths from './SapSignavioStrengths';
import SapSignavioServices from './SapSignavioServices';
import Footer from '../../../components/layout/section/Footer';

const SapSignavioPage = () => {
    return (
        <main className="bg-white">
            <SapSignavioHero />
            <SapSignavioStrengths />
            <SapSignavioServices />
            <Footer />
        </main>
    );
};

export default SapSignavioPage;

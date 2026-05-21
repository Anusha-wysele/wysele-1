import React from 'react';
import SapSignavioHero from './SapSignavioHero';
import SapSignavioStrengths from './SapSignavioStrengths';
import SapSignavioServices from './SapSignavioServices';
import SapSignavioexperties from './SapSignavioexperties';
import SapSignavioWhyChooseUs from './SapSignavioWhyChooseUs';
import SignavioIndustrieswesupport from './SignavioIndustrieswesupport';
import SignavioFaq from './SignavioFaq';
import Footer from '../../../components/layout/section/Footer';


const SapSignavioPage = () => {
    return (
        <main className="bg-white">
            <SapSignavioHero />
            <SapSignavioStrengths />
            <SapSignavioexperties />
            <SapSignavioServices />
            <SignavioIndustrieswesupport />
            <SapSignavioWhyChooseUs />
            <SignavioFaq />
            <Footer />
        </main>
    );
};

export default SapSignavioPage;

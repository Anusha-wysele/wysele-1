import React from 'react';
import AppDevelopmenthero from './AppDevelopmenthero';
import AppDevelopmentBusinessgoals from './AppDevelopmentBusinessgoals';
import AppDevelopmentEssential from './AppDevelopmentEssential';
import Appdevelopmentprocess from './Appdevelopmentprocess';
import Footer from '../../components/layout/section/Footer';

const AppDevelopmentPages = () => {
    return (
        <main className="bg-white">
            <AppDevelopmenthero />
            <AppDevelopmentBusinessgoals />
            <AppDevelopmentEssential />
            <Appdevelopmentprocess />
            <Footer />
        </main>
    );
};

export default AppDevelopmentPages;

import React from 'react';
import SapDatahero from './SapDatahero';
import DataSupport from './DataSupport';
import DataWhychoose from './DataWhychoose';
import Footer from '../../../components/layout/section/Footer';

const SapDataspherePage = () => {
    return (
        <div>
            <SapDatahero />
            <DataSupport />
            <DataWhychoose />
            <Footer />
        </div>
    );
};

export default SapDataspherePage;

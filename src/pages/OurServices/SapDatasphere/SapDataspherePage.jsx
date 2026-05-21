import React from 'react';
import SapDatahero from './SapDatahero';
import DataSupport from './DataSupport';
import DataContinuousmonitering from './DataContinuousmonitering';
import DataStrategicPartnership from './DataStrategicPartnership';
import DataBusinessgrowth from './DataBusinessgrowth';
import DataWhychoose from './DataWhychoose';
import Footer from '../../../components/layout/section/Footer';

const SapDataspherePage = () => {
    return (
        <div>
            <SapDatahero />
            <DataSupport />
            <DataStrategicPartnership />
            <DataContinuousmonitering />
            <DataBusinessgrowth />
            <DataWhychoose />
            <Footer />
        </div>
    );
};

export default SapDataspherePage;

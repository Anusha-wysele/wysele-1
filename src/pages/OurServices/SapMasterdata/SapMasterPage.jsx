import React, { useEffect } from 'react';
import SapMasterhero from './SapMasterhero';
import SapMastergovernance from './SapMastergovernance';
import SapMasterservices from './SapMasterservices';
import SapMasterwhychoose from './SapMasterwhychoose';
import Footer from '../../../components/layout/section/Footer';

export default function SapMasterPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-white">
            <SapMasterhero />
            <SapMastergovernance />
            <SapMasterservices />
            <SapMasterwhychoose />
            <Footer />
        </main>
    );
}

import { useEffect } from 'react';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import Footer from '../../../components/layout/section/Footer';
import SapMastergovernance from './SapMastergovernance';
import SapMasterhero from './SapMasterhero';
import SapMasterservices from './SapMasterservices';
import SapMasterwhychoose from './SapMasterwhychoose';

export default function SapMasterPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-white">
            <SapMasterhero />
            <Breadcrumbs />
            <SapMastergovernance />
            <SapMasterservices />
            <SapMasterwhychoose />
            <Footer />
        </main>
    );
}

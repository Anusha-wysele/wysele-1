import React, { useEffect } from 'react';
import SapTechnicalconsultinghero from './SapTechnicalconsultinghero';
import SapTechnicalconsultingoverview from './SapTechnicalconsultingoverview';
import SapTechnicalConsultingprocess from './SapTechnicalConsultingprocess';
import SapTechnicalconsultingservices from './SapTechnicalconsultingservices';
import SapTechnicalconsultingwhychoose from './SapTechnicalconsultingwhychoose';
import Footer from '../../../components/layout/section/Footer';

export default function SapTechnicalconsultingpage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-white">
            <SapTechnicalconsultinghero />
            <SapTechnicalconsultingoverview />
            <SapTechnicalConsultingprocess />
            <SapTechnicalconsultingservices />
            <SapTechnicalconsultingwhychoose />
            <Footer />
        </main>
    );
}

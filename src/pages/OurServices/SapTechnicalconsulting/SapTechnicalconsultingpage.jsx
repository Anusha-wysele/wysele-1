import { useEffect } from 'react';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import Footer from '../../../components/layout/section/Footer';
import SapTechnicalconsultinghero from './SapTechnicalconsultinghero';
import SapTechnicalconsultingoverview from './SapTechnicalconsultingoverview';
import SapTechnicalConsultingprocess from './SapTechnicalConsultingprocess';
import SapTechnicalconsultingservices from './SapTechnicalconsultingservices';
import SapTechnicalconsultingwhychoose from './SapTechnicalconsultingwhychoose';

export default function SapTechnicalconsultingpage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-white">
            <SapTechnicalconsultinghero />
            <Breadcrumbs />
            <SapTechnicalconsultingoverview />
            <SapTechnicalConsultingprocess />
            <SapTechnicalconsultingservices />
            <SapTechnicalconsultingwhychoose />
            <Footer />
        </main>
    );
}

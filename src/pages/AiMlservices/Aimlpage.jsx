import { useEffect } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Footer from '../../components/layout/section/Footer';
import AiDevelopmentservices from './AiDevelopmentservices';
import AiMlhero from './AiMlhero';
import AiMlwhychoose from './AiMlwhychoose';

export default function Aimlpage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <AiMlhero />
            <Breadcrumbs />
            <AiDevelopmentservices />
            <AiMlwhychoose />
            <Footer />
        </div>
    );
}

import React, { useEffect } from 'react';
import AiMlhero from './AiMlhero';
import AiDevelopmentservices from './AiDevelopmentservices';
import AiMlwhychoose from './AiMlwhychoose';
import Footer from '../../components/layout/section/Footer';

export default function Aimlpage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <AiMlhero />
            <AiDevelopmentservices />
            <AiMlwhychoose />
            <Footer />
        </div>
    );
}

import React, { useEffect } from 'react';
import SapBtpapihero from './SapBtpapihero';
import SapApimanagement from './SapApimanagement';
import SapBtpapithirdparty from './SapBtpapithirdparty';
import SapBtpapiintegration from './SapBtpapiintegration';
import Footer from '../../../components/layout/section/Footer';

export default function Sapbtpapipage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-white">
            <SapBtpapihero />
            <SapApimanagement />
            <SapBtpapithirdparty />
            <SapBtpapiintegration />
            <Footer />
        </main>
    );
}

import { useEffect } from 'react';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import Footer from '../../../components/layout/section/Footer';
import SapApimanagement from './SapApimanagement';
import SapBtpapihero from './SapBtpapihero';
import SapBtpapiintegration from './SapBtpapiintegration';
import SapBtpapithirdparty from './SapBtpapithirdparty';

export default function Sapbtpapipage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-white">
            <SapBtpapihero />
            <Breadcrumbs />
            <SapApimanagement />
            <SapBtpapithirdparty />
            <SapBtpapiintegration />
            <Footer />
        </main>
    );
}

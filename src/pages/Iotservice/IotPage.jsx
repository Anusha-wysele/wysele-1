import { useEffect } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import IotAws from './IotAws';
import IotConnectivity from './IotConnectivity';
import IotDeviceintegration from './IotDeviceintegration';
import IotEndtoend from './IotEndtoend';
import IotHero from './IotHero';
import IotIndustryspacific from './IotIndustryspacific';
import IotWhychoose from './IotWhychoose';
import Iotkeyfeatures from './Iotkeyfeatures';

export default function IotPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <IotHero />
            <Breadcrumbs />
            <IotEndtoend />
            <IotDeviceintegration />
            <IotConnectivity />
            <IotAws />
            <IotIndustryspacific />
            <Iotkeyfeatures />
            <IotWhychoose />
        </div>
    );
}

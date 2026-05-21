import React, { useEffect } from 'react';
import IotHero from './IotHero';
import IotEndtoend from './IotEndtoend';
import IotDeviceintegration from './IotDeviceintegration';
import IotConnectivity from './IotConnectivity';
import IotAws from './IotAws';
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

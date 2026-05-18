import React, { useEffect } from 'react';
import SapGenhero from './SapGenhero';
import SapGenaitransform from './SapGenaitransform';
import SapGenaiOfferings from './SapGenaiOfferings';
import SapGenaiwhychoose from './SapGenaiwhychoose';

export default function SapGenaipages() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-white">
            <SapGenhero />
            <SapGenaitransform />
            <SapGenaiOfferings />
            <SapGenaiwhychoose />
        </main>
    );
}

import React, { useEffect } from 'react';
import SapOpentexthero from './SapOpentexthero';
import SapOpentextservices from './SapOpentextservices';
import SapOpentextsolutions from './SapOpentextsolutions';

export default function SapOpentextpage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full flex flex-col">
            <SapOpentexthero />
            <SapOpentextsolutions />
            <SapOpentextservices />
        </div>
    );
}

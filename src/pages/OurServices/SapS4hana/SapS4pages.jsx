import React, { useEffect } from 'react';
import SapS4hero from './SapS4hero';
import SapS4services from './SapS4services';
import SapS4whychoose from './SapS4whychoose';

export default function SapS4pages() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-white">
            <SapS4hero />
            <SapS4services />
            <SapS4whychoose />
        </main>
    );
}

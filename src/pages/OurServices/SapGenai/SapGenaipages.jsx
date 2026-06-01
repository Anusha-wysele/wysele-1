import { useEffect } from 'react';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import SapGenaiOfferings from './SapGenaiOfferings';
import SapGenaitransform from './SapGenaitransform';
import SapGenaiwhychoose from './SapGenaiwhychoose';
import SapGenhero from './SapGenhero';

export default function SapGenaipages() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-white">
            <SapGenhero />
            <Breadcrumbs />
            <SapGenaitransform />
            <SapGenaiOfferings />
            <SapGenaiwhychoose />
        </main>
    );
}

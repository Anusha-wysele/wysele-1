import { useEffect } from 'react';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
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
            <Breadcrumbs />
            <SapOpentextsolutions />
            <SapOpentextservices />
        </div>
    );
}

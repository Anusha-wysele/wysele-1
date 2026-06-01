import Breadcrumbs from '../../../components/common/Breadcrumbs';
import Footer from '../../../components/layout/section/Footer';
import BtpHero from './BtpHero';
import BtpSapservices from './BtpSapservices';
import BtpWhychoose from './BtpWhychoose';
import EmpoverSapbtp from './EmpoverSapbtp';

const SapBtp = () => {
    return (
        <main className="bg-white">
            <BtpHero />
            <Breadcrumbs />
            <EmpoverSapbtp />
            <BtpSapservices />
            <BtpWhychoose />
            {/* Add other BTP sections here as we build them */}
            <Footer />
        </main>
    );
};

export default SapBtp;

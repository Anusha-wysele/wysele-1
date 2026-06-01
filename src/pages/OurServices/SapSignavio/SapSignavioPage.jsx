import Breadcrumbs from '../../../components/common/Breadcrumbs';
import Footer from '../../../components/layout/section/Footer';
import SapSignavioexperties from './SapSignavioexperties';
import SapSignavioHero from './SapSignavioHero';
import SapSignavioServices from './SapSignavioServices';
import SapSignavioStrengths from './SapSignavioStrengths';
import SapSignavioWhyChooseUs from './SapSignavioWhyChooseUs';
import SignavioFaq from './SignavioFaq';
import SignavioIndustrieswesupport from './SignavioIndustrieswesupport';


const SapSignavioPage = () => {
    return (
        <main className="bg-white">
            <SapSignavioHero />
            <Breadcrumbs />
            <SapSignavioStrengths />
            <SapSignavioexperties />
            <SapSignavioServices />
            <SignavioIndustrieswesupport />
            <SapSignavioWhyChooseUs />
            <SignavioFaq />
            <Footer />
        </main>
    );
};

export default SapSignavioPage;

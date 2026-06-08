import Footer from '../../components/layout/section/Footer';
import FdeHero from './fdeHero';
import FdeBriefing from './fdeBriefing';
import FdeAgenticworkflow from './fdeAgenticworkflow';
import FdeServices from './FdeServices';
import FdeIndustries from './fdeIndustries';
import FdeWhychoose from './fdeWhychoose';
import FdeFaq from './fdeFaq';
import FdeCta from './fdeCta';

const FdePage = () => {
    return (
        <main className="bg-white min-h-screen">
            <FdeHero />
            <FdeBriefing />
            <FdeServices />
            <FdeAgenticworkflow />
            <FdeIndustries />
            <FdeWhychoose />
            <FdeFaq />
            <FdeCta />
            <Footer />
        </main>
    );
};

export default FdePage;

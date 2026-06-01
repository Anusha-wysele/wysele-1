import Breadcrumbs from '../../components/common/Breadcrumbs';
import Footer from '../../components/layout/section/Footer';
import AppDevelopmentBusinessgoals from './AppDevelopmentBusinessgoals';
import AppDevelopmentEssential from './AppDevelopmentEssential';
import AppDevelopmenthero from './AppDevelopmenthero';
import Appdevelopmentprocess from './Appdevelopmentprocess';

const AppDevelopmentPages = () => {
    return (
        <main className="bg-white">
            <AppDevelopmenthero />
            <Breadcrumbs />
            <AppDevelopmentBusinessgoals />
            <AppDevelopmentEssential />
            <Appdevelopmentprocess />
            <Footer />
        </main>
    );
};

export default AppDevelopmentPages;

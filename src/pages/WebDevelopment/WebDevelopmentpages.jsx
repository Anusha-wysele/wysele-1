import Breadcrumbs from '../../components/common/Breadcrumbs';
import Footer from '../../components/layout/section/Footer';
import WebDevelopmentProcess from './WebDevelopmectprocess';
import WebDevelopmentBenifits from './WebDevelopmentBenifits';
import WebDevelopmenthero from './WebDevelopmenthero';
import WebDevelopmentShowcase from './WebDevelopmentShowcase';
import WebDevelopmentwhychoose from './WebDevelopmentwhychoose';
import WebServicesweoffer from './WebServicesweoffer';

const WebDevelopmentPage = () => {
    return (
        <main className="bg-white">
            <WebDevelopmenthero />
            <Breadcrumbs />
            <WebServicesweoffer />
            <WebDevelopmentProcess />
            <WebDevelopmentShowcase />
            <WebDevelopmentBenifits />
            <WebDevelopmentwhychoose />
            <Footer />
        </main>
    );
};

export default WebDevelopmentPage;

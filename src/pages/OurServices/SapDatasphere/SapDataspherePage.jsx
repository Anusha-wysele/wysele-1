import Breadcrumbs from '../../../components/common/Breadcrumbs';
import Footer from '../../../components/layout/section/Footer';
import DataContinuousmonitering from './DataContinuousmonitering';
import DataStrategicPartnership from './DataStrategicPartnership';
import DataSupport from './DataSupport';
import DataWhychoose from './DataWhychoose';
import SapDatahero from './SapDatahero';

const SapDataspherePage = () => {
    return (
        <div>
            <SapDatahero />
            <Breadcrumbs />
            <DataSupport />
            <DataStrategicPartnership />
            <DataContinuousmonitering />
            <DataWhychoose />
            <Footer />
        </div>
    );
};

export default SapDataspherePage;

import Breadcrumbs from '../../../components/common/Breadcrumbs';
import SapMigrationhero from './SapMigrationhero';
import SapMigrationofferings from './SapMigrationofferings';
import SapMigrationWhy from './SapMigrationWhy';

export default function SapMigrationPage() {
    return (
        <main className="bg-white">
            <SapMigrationhero />
            <Breadcrumbs />
            <SapMigrationofferings />
            <SapMigrationWhy />
            {/* Additional sections can be added here */}
        </main>
    );
}

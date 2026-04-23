import SapMigrationhero from './SapMigrationhero';
import SapMigrationofferings from './SapMigrationofferings';
import SapMigrationWhy from './SapMigrationWhy';

export default function SapMigrationPage() {
    return (
        <main className="bg-white">
            <SapMigrationhero />
            <SapMigrationofferings />
            <SapMigrationWhy />
            {/* Additional sections can be added here */}
        </main>
    );
}

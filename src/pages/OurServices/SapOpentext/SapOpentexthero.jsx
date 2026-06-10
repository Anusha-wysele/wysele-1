import { Link } from 'react-router-dom';
import heroImage from '../../../assets/wysele-SapOpentexthero.webp';

export default function SapOpentexthero() {
    return (
        <div className="w-full">
            <h1 className="sr-only"><Link to="/services/sap-opentext" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}><Link to="/services/sap-opentext" className="hover:underline transition-colors decoration-gray-400 underline-offset-4 text-inherit">SAP OpenText</Link></Link> Services</h1>
            <section className="relative w-full overflow-hidden font-sans min-h-[calc(100vh-68px)] lg:h-[calc(100vh-68px)] pt-[140px] md:pt-0 py-12 lg:py-0">
                <img fetchpriority="high" src={heroImage} 
                    alt="SAP OpenText" 
                    className="absolute inset-0 w-full h-full object-cover object-center z-0"
                />
            </section>
        </div>
    );
}

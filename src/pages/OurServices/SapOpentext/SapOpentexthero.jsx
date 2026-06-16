import { Link } from 'react-router-dom';
import heroImage from '../../../assets/wysele-SapOpentexthero.webp';

export default function SapOpentexthero() {
    return (
        <div className="w-full">
            <h1 className="sr-only">SAP OpenText Services</h1>
            <section className="relative w-full overflow-hidden font-sans min-h-[calc(100vh-68px)] lg:h-[calc(100vh-68px)] pt-[140px] md:pt-0 py-12 lg:py-0">
                <img fetchpriority="high" src={heroImage} 
                    alt="SAP OpenText" 
                    className="absolute inset-0 w-full h-full object-cover object-center z-0"
                />
            </section>
        </div>
    );
}

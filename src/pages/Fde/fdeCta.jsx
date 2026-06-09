import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const FdeCta = () => {
    return (
        <section className="bg-[#FCF5F5] pt-12 pb-12 px-6 lg:px-12 w-full flex flex-col items-center border-t border-gray-100 relative overflow-hidden">
            {/* Subtle background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#800000]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
            
            <div className="relative z-10 max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 px-4 sm:px-8 lg:px-10">
                
                {/* Left Column: Heading and Paragraphs */}
                <div className="lg:max-w-[70%] text-left space-y-3">
                    <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-gray-900 leading-tight">
                        Ready to Turn AI Strategy into Business Results?
                    </h2>
                    <div className="space-y-2">
                        <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed font-normal">
                            Partner with Wysele Technologies to accelerate AI adoption, streamline implementation, and scale innovation with confidence.
                        </p>
                    </div>
                </div>

                {/* Right Column: Button */}
                <div className="w-full lg:w-auto flex justify-start lg:justify-end flex-shrink-0 pt-2 lg:pt-0">
                    <Link to="/contact">
                        <button className="group relative inline-flex items-center gap-2 text-sm font-bold tracking-[0.15em] text-[#800000] uppercase pb-2 border-b-2 border-[#800000]/30 hover:border-[#800000] transition-colors duration-300">
                            TALK TO OUR <Link to="/services/fde" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}>FDE</Link> TEAM
                            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </button>
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default FdeCta;

import React, { useState } from 'react';
import RealisticGlobe from '../../common/RealisticGlobe';

const OurLocations = () => {
    const [activeOffice, setActiveOffice] = useState('india');

    const offices = {
        india: {
            name: 'Wysele Technologies',
            location: 'Hyderabad, India',
            address: '#308 4th floor DSL Abacus IT Park, Survey Colony, Industrial Development Area, Uppal, Hyderabad, Telangana 500039',
            phone: '+91 63057 53919',
            mapUrl: 'https://maps.app.goo.gl/ZqFNB8twNkuA17iG9',
            lat: 17.406544,
            lng: 78.551033
        },
        usa: {
            name: 'Wysele Technologies',
            location: 'Austin, USA',
            address: '5900 Balcones Drive STE 100, Austin, TX 78731',
            phone: '+1 (Contact Number)',
            mapUrl: 'https://maps.google.com/?q=30.3515,-97.7559',
            lat: 30.3515,
            lng: -97.7559
        }
    };

    const currentOffice = offices[activeOffice];

    return (
        <section className="w-full relative overflow-hidden" style={{ height: '100vh' }}>
            {/* Map Background */}
            <div className="absolute inset-0 z-0">
                <RealisticGlobe />
            </div>

            {/* Content Overlay - All within map space */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 md:px-8">
                {/* Heading */}
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 text-center mb-2">
                    Reach Out to Our <span className="text-[#C9184A]">Global Team</span>
                </h2>

                {/* Subheading */}
                <p className="text-xs md:text-sm text-gray-700 text-center max-w-2xl mb-4">
                    Engage with our team across locations to build trusted partnerships and deliver sustainable, forward-thinking solutions.
                </p>

                {/* Our Offices Section */}
                <div className="w-full max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-1">
                        Our Offices
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 text-center mb-4">
                        Visit us at our locations around the world
                    </p>

                    {/* Office Tabs */}
                    <div className="flex justify-center mb-4">
                        <div className="inline-flex rounded-lg backdrop-blur-md bg-white/20 border border-white/30 p-0.5 shadow-lg">
                            <button
                                onClick={() => setActiveOffice('india')}
                                className={`px-4 py-1.5 font-semibold transition-all duration-300 text-xs rounded-lg ${
                                    activeOffice === 'india'
                                        ? 'bg-white/40 text-[#8B2635] shadow-md'
                                        : 'text-gray-700 hover:bg-white/20'
                                }`}
                            >
                                India Office
                            </button>
                            <button
                                onClick={() => setActiveOffice('usa')}
                                className={`px-4 py-1.5 font-semibold transition-all duration-300 text-xs rounded-lg ${
                                    activeOffice === 'usa'
                                        ? 'bg-white/40 text-[#8B2635] shadow-md'
                                        : 'text-gray-700 hover:bg-white/20'
                                }`}
                            >
                                USA Office
                            </button>
                        </div>
                    </div>

                    {/* Office Details and Map - Single Box */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
                        <div className="flex flex-col lg:flex-row" style={{ height: '240px' }}>
                            {/* Left Side - Office Details */}
                            <div className="lg:w-1/2 p-4 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-start gap-2 mb-3">
                                        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#8B2635"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                <circle cx="12" cy="10" r="3" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold text-gray-900 mb-0.5">
                                                {currentOffice.name}
                                            </h4>
                                            <p className="text-sm text-[#C9184A] font-semibold mb-2">
                                                {currentOffice.location}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <p className="text-gray-700 leading-snug mb-3 text-xs">
                                        {currentOffice.address}
                                    </p>
                                    
                                    <p className="text-gray-900 font-semibold mb-3 text-xs">
                                        {currentOffice.phone}
                                    </p>
                                </div>

                                {/* Get Directions Button */}
                                <a
                                    href={currentOffice.mapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group text-xs"
                                >
                                    Get Directions
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="group-hover:translate-x-1 transition-transform"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>

                            {/* Thin Divider Line */}
                            <div className="hidden lg:block w-px bg-gray-300"></div>

                            {/* Right Side - Google Maps */}
                            <div className="lg:w-1/2 h-full">
                                <iframe
                                    key={activeOffice}
                                    src={activeOffice === 'india' 
                                        ? `https://www.google.com/maps?q=DSL+Abacus+IT+Park+Uppal+Hyderabad&output=embed&z=16`
                                        : `https://www.google.com/maps?q=${currentOffice.lat},${currentOffice.lng}&hl=en&z=15&output=embed`
                                    }
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Office Location Map"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurLocations;

import React from 'react';
import { motion } from 'framer-motion';
import heroImage from '../../../assets/SapOpentexthero.jpg';

export default function SapOpentexthero() {
    return (
        <div className="w-full pt-[68px]">
            <section className="relative w-full overflow-hidden font-sans min-h-[calc(100vh-68px)] lg:h-[calc(100vh-68px)] py-12 lg:py-0">
                <img 
                    src={heroImage} 
                    alt="SAP OpenText" 
                    className="absolute inset-0 w-full h-full object-cover object-center z-0"
                />
            </section>
        </div>
    );
}

import React from 'react';
import Footer from '../../components/layout/section/Footer';
import { motion } from 'framer-motion';

import ItInfrastructureHero from './ItInfrastructureHero';
import ItInfrastructureServices from './ItInfrastructureServices';
import ItInfrastructureProcess from './ItInfrastructureProcess';
import ItInfrastructureWhyChooseUs from './ItInfrastructureWhyChooseUs';

const ItInfrastrutureHome = () => {
  return (
    <main className="bg-white min-h-screen">
      <ItInfrastructureHero />
      <ItInfrastructureServices />
      <ItInfrastructureProcess />
      <ItInfrastructureWhyChooseUs />
      <Footer />
    </main>
  );
};

export default ItInfrastrutureHome;
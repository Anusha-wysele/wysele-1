import { motion } from 'framer-motion';
import sapServicesImg from '../../assets/Sapservices.jpg';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Cylinders from '../../components/common/Cylinders';
import Footer from '../../components/layout/section/Footer';
import SapServicesIntro from './SapServicesIntro';
import SapServicesList from './SapServicesList';

export default function SapServices() {
  return (
    <div className="bg-white">
      <div className="w-full">
        {/* Full Width Hero Image with Content Overlay */}
        <div className="w-full relative overflow-hidden pt-[140px] md:pt-0" style={{ height: 'calc(100vh - 68px)' }}>
          <img 
            src={sapServicesImg} 
            alt="SAP Services Hero" 
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          
          {/* Dark Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
          
          {/* Target the rendered divs to override border intensity solely from the parent component */}
          <div className="[&>div]:!border-white/80">
            <Cylinders />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center z-20">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16 w-full">
              <div className="max-w-xl">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight tracking-tight"
              >
                Transform Your Business with Intelligent SAP Solutions
              </motion.h1>
              
              <div className="space-y-4">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="text-gray-100 text-sm font-light leading-relaxed"
                >
                  Simplify operations and take full control of your business with smart, integrated SAP solutions designed for efficiency and growth. Our platform helps you optimize workflows, eliminate complexities, and enhance overall productivity.
                </motion.p>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  className="text-gray-200 text-xs font-light leading-relaxed"
                >
                  Unlock the power of real-time data to make informed, strategic decisions. With advanced analytics and actionable insights, you can stay ahead of challenges and drive continuous improvement across your organization.
                </motion.p>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                  className="text-gray-200 text-xs font-light leading-relaxed"
                >
                  Built for scalability and flexibility, our cloud-enabled ERP solutions seamlessly integrate with your existing systems—delivering powerful capabilities and accessibility anytime, anywhere.
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Breadcrumbs />
        
        {/* Intro Content Section */}
        <SapServicesIntro />

        {/* All SAP Services Grid */}
        <SapServicesList />
      </div>
      <Footer />
    </div>
  );
}

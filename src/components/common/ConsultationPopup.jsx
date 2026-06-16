import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, MessageCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import jobService from '../../services/jobService';
import contactHeroImg from '../../assets/wysele-contactushero.webp';


const ConsultationPopup = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_number: '',
    company_name: '',
    message: ''
  });

  const isServicePage = location.pathname.startsWith('/services/');

  useEffect(() => {
    setFormData({ name: '', email: '', mobile_number: '', company_name: '', message: '' });
    setIsSubmitted(false);
    setIsSubmitting(false);
    setError('');

    if (isServicePage) {
      setIsOpen(false);
      setIsMinimized(false);
      const timer = setTimeout(() => setIsOpen(true), 45000);
      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
      setIsMinimized(false);
    }
  }, [location.pathname, isServicePage]);

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setIsSubmitting(true);
      const hostname = window.location.hostname.toLowerCase();
      const siteCompany = hostname.includes('orbintix') ? 'orbintix' : 
                          hostname.includes('gracevirtue') ? 'gracevirtue' : 'wysele';
      const payload = {
        ...formData,
        company: siteCompany
      };
      await jobService.submitConsultation(payload);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsMinimized(false);
      }, 4000);
    } catch (err) {
      console.error('❌ Submission Error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isServicePage) return null;

  return (
    <>
      <AnimatePresence>
        {isMinimized && !isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0, x: 20 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0, opacity: 0, x: 20 }}
            onClick={() => { setIsMinimized(false); setIsOpen(true); }}
            aria-label="Open Consultation Form"
            className="fixed right-6 bottom-6 z-[9999] w-14 h-14 bg-[#ffcc00] text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-[#e6b800] transition-all duration-300 group"
          >
            <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/70 backdrop-blur-[4px]"
            />

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="relative w-[95%] max-w-[600px] h-auto md:h-[400px] max-h-[90vh] bg-[#800000] overflow-y-auto md:overflow-hidden shadow-2xl flex flex-col md:flex-row rounded-none"
            >
              <button
                onClick={handleClose}
                aria-label="Close Consultation Form"
                className="absolute top-3 right-3 z-50 p-1.5 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              >
                <X size={16} />
              </button>

              {/* Left Side */}
              <div className="relative w-full min-h-[160px] md:min-h-0 md:h-auto md:w-[300px] bg-[#800000] p-6 flex flex-col justify-end overflow-hidden border-b md:border-b-0 md:border-r border-white/5 shrink-0">
                <div className="relative z-10">
                  <motion.h2
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-[#ffcc00] text-3xl md:text-4xl font-  tracking-normal leading-none"
                  >
                    Let's{" "}Talk!
                  </motion.h2>
                  <p className="text-white text-[8px] font-bold uppercase tracking-[3px] mt-4">
                    Technical Consulting
                  </p>
                </div>

                <motion.div
                  className="absolute inset-0 w-full h-full pointer-events-none "
                >
                  <img
                    src={contactHeroImg}
                    alt="Consultation"
                    loading="lazy"
                    width="300"
                    height="400"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#800000] via-transparent to-transparent" />
                </motion.div>
              </div>

              {/* Right Side */}
              <div className="flex-1 bg-white p-6 md:p-8 flex items-center h-auto md:h-full">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="w-full"
                    >
                      <h3 className="text-xl font- text-[#800000] leading-tight mb-1">
                        Know More
                      </h3>
                      <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-6">
                        Let's chat about our services.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="space-y-2">
                          <input
                            required name="name" value={formData.name} onChange={handleChange}
                            aria-label="Full Name"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-none text-xs focus:bg-white focus:border-[#800000] outline-none transition-all"
                            placeholder="Full Name"
                          />
                          <input
                            required type="email" name="email" value={formData.email} onChange={handleChange}
                            aria-label="Email Address"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-none text-xs focus:bg-white focus:border-[#800000] outline-none transition-all"
                            placeholder="Email Address"
                          />
                          <input
                            required type="tel" name="mobile_number" value={formData.mobile_number} onChange={handleChange}
                            aria-label="Mobile Number"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-none text-xs focus:bg-white focus:border-[#800000] outline-none transition-all"
                            placeholder="Mobile Number"
                          />
                          <input
                            required type="name" name="company_name" value={formData.company_name} onChange={handleChange}
                            aria-label="Company Name"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-none text-xs focus:bg-white focus:border-[#800000] outline-none transition-all"
                            placeholder="Company"
                          />
                          <textarea
                            required name="message" value={formData.message} onChange={handleChange}
                            aria-label="Message"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-none text-xs focus:bg-white focus:border-[#800000] outline-none h-16 resize-none"
                            placeholder="How can we help?"
                          />
                        </div>

                        {error && (
                          <p className="text-[11px] text-red-500 font-bold uppercase tracking-wider text-center pt-2">
                            {error}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3 bg-[#800000] text-[#ffcc00] font-black uppercase text-[10px] tracking-[3px] hover:bg-gray-900 transition-all flex items-center justify-center gap-2 mt-4 shadow-lg"
                        >
                          {isSubmitting ? 'Sending...' : (
                            <>
                              Submit
                              <ArrowRight size={14} />
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      className="w-full text-center"
                    >
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={32} />
                      </div>
                      <h3 className="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Success</h3>
                      <p className="text-[11px] text-gray-500 leading-relaxed px-4">
                        We've received your request. Our team will contact you shortly.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ConsultationPopup;

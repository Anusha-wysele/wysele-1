import { motion } from 'framer-motion';
import { Shield, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Footer from '../../components/layout/section/Footer';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Privacy Policy | Wysele Technologies';
  }, []);

  const sections = [
    {
      title: "1. Introduction",
      content: "At Wysele Technologies, we value your trust and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (www.wysele.com) or interact with our services, including our SAP and technology consulting operations. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site."
    },
    {
      title: "2. Information We Collect",
      content: "We may collect information about you in a variety of ways. This includes:\n\n• Personal Data: Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you contact us, register for consultations, or apply for jobs.\n• Derivative Data: Information our servers automatically collect when you access the site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the site."
    },
    {
      title: "3. Use of Your Information",
      content: "Having accurate information about you allows us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:\n\n• Administer consultations, promotions, and services.\n• Compile anonymous statistical data and analysis for use internally or with third parties.\n• Deliver targeted advertising, newsletters, and other information regarding promotions and the site to you.\n• Email you regarding your consultation request, job application, or other enquiries.\n• Prevent fraudulent transactions, monitor against theft, and protect against criminal activity."
    },
    {
      title: "4. Disclosure of Your Information",
      content: "We may share information we have collected about you in certain situations. Your information may be disclosed as follows:\n\n• By Law or to Protect Rights: If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law.\n• Third-Party Service Providers: We may share your information with third parties that perform services for us or on our behalf, including data analysis, email delivery, hosting services, customer service, and marketing assistance."
    },
    {
      title: "5. Security of Your Information",
      content: "We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse."
    },
    {
      title: "6. Contact Us",
      content: "If you have questions or comments about this Privacy Policy, please contact us at:\n\nWysele Technologies Private Limited\nEmail: info@wysele.com\nAddress: Hyderabad, India"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f9f9fb] font-sans">
      {/* Hero Header */}
      <section className="relative bg-[#1A1614] pt-32 pb-16 px-6 overflow-hidden">
        <Breadcrumbs />
        
        {/* Background text decoration */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <span className="text-[20vw] font-black text-white/[0.02] whitespace-nowrap">
            PRIVACY
          </span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={14} className="text-[#C9184A]" />
            <span className="text-[11px] font-bold tracking-[0.3em] text-white/40 uppercase">
              Legal
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-white/50 text-sm md:text-base max-w-xl leading-relaxed">
            Last Updated: June 4, 2026. Learn how we handle, store, and protect your personal information at Wysele.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,3fr] gap-12">
          {/* Quick links sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-28 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">On This Page</h3>
              <ul className="space-y-3">
                {sections.map((sec, idx) => (
                  <li key={idx}>
                    <a
                      href={`#sec-${idx}`}
                      className="text-xs font-semibold text-gray-500 hover:text-[#C9184A] transition-colors"
                    >
                      {sec.title.split('.')[1] || sec.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Legal Document Content */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-12 shadow-sm space-y-10">
            {sections.map((sec, idx) => (
              <motion.div
                key={idx}
                id={`sec-${idx}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="scroll-mt-28 space-y-4"
              >
                <h2 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-2">
                  {sec.title}
                </h2>
                <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {sec.content}
                </div>
              </motion.div>
            ))}

            <div className="pt-8 border-t border-gray-50 flex items-center gap-3">
              <CheckCircle2 size={16} className="text-green-500" />
              <p className="text-xs text-gray-400 font-semibold">
                Your data is hosted securely in accordance with local regulations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

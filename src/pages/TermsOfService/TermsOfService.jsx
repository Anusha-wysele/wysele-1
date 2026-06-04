import { motion } from 'framer-motion';
import { CheckCircle2, Scale } from 'lucide-react';
import { useEffect } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Footer from '../../components/layout/section/Footer';

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Terms of Service | Wysele Technologies';
  }, []);

  const sections = [
    {
      title: "1. Agreement to Terms",
      content: "These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity, and Wysele Technologies Private Limited ('we', 'us', or 'our'), concerning your access to and use of the www.wysele.com website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto. You agree that by accessing the site, you have read, understood, and agree to be bound by all of these Terms of Service."
    },
    {
      title: "2. Intellectual Property Rights",
      content: "Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the 'Content') and the trademarks, service marks, and logos contained therein (the 'Marks') are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws. The Content and the Marks are provided on the Site 'AS IS' for your information and personal use only."
    },
    {
      title: "3. User Representations",
      content: "By using the Site, you represent and warrant that:\n\n• All registration information you submit will be true, accurate, current, and complete.\n• You will maintain the accuracy of such information and promptly update such registration information as necessary.\n• You have the legal capacity and you agree to comply with these Terms of Service.\n• You are not a minor in the jurisdiction in which you reside.\n• You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.\n• Your use of the Site will not violate any applicable law or regulation."
    },
    {
      title: "4. Prohibited Activities",
      content: "You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. Prohibited activities include but are not limited to:\n\n• Systematically retrieving data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.\n• Tricking, defrauding, or misleading us and other users, especially in any attempt to learn sensitive account information such as user passwords.\n• Circumventing, disabling, or otherwise interfering with security-related features of the Site."
    },
    {
      title: "5. Limitation of Liability",
      content: "IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES."
    },
    {
      title: "6. Governing Law",
      content: "These Terms of Service and your use of the Site are governed by and construed in accordance with the laws of India, applicable to agreements made and to be entirely performed within India, without regard to its conflict of law principles."
    },
    {
      title: "7. Contact Us",
      content: "In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:\n\nWysele Technologies Private Limited\nEmail: info@wysele.com\nAddress: Hyderabad, India"
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
            TERMS
          </span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Scale size={14} className="text-[#C9184A]" />
            <span className="text-[11px] font-bold tracking-[0.3em] text-white/40 uppercase">
              Legal
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Terms of Service
          </h1>
          <p className="text-white/50 text-sm md:text-base max-w-xl leading-relaxed">
            Last Updated: June 4, 2026. Understand our policies, agreements, and intellectual property conditions.
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
                Use of this site constitutes acceptance of our global terms of service.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

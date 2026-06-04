import { motion } from 'framer-motion';
import { CheckCircle2, Info } from 'lucide-react';
import { useEffect } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Footer from '../../components/layout/section/Footer';

export default function CookiePolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Cookie Policy | Wysele Technologies';
  }, []);

  const sections = [
    {
      title: "1. What Are Cookies?",
      content: "Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site. Cookies allow websites to recognize a user's device and store some information about the user's preferences or past actions."
    },
    {
      title: "2. How We Use Cookies",
      content: "We use cookies to improve your browsing experience on our website. Specifically, cookies help us:\n\n• Understand how our website is being used (for example, which pages are most popular and how users navigate the site).\n• Remember your preferences and settings, so you don't have to re-enter them on subsequent visits.\n• Help with security checks and session management to ensure a secure connection."
    },
    {
      title: "3. Types of Cookies We Use",
      content: "We use the following types of cookies:\n\n• Essential Cookies: These cookies are strictly necessary to provide you with services available through our site and to use some of its features, such as access to secure areas.\n• Performance and Analytics Cookies: These cookies collect information that is used in aggregate form to help us understand how our site is being used, how effective our marketing campaigns are, or to help us customize our site for you."
    },
    {
      title: "4. How to Manage Cookies",
      content: "You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted. Since the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information."
    },
    {
      title: "5. Updates to this Policy",
      content: "We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies."
    },
    {
      title: "6. Contact Us",
      content: "If you have questions about our use of cookies or other technologies, please contact us at:\n\nWysele Technologies Private Limited\nEmail: info@wysele.com\nAddress: Hyderabad, India"
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
            COOKIES
          </span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Info size={14} className="text-[#C9184A]" />
            <span className="text-[11px] font-bold tracking-[0.3em] text-white/40 uppercase">
              Legal
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Cookie Policy
          </h1>
          <p className="text-white/50 text-sm md:text-base max-w-xl leading-relaxed">
            Last Updated: June 4, 2026. Learn how we use cookies, tracking pixels, and storage techniques on our web platform.
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
                You can configure cookie settings directly via your browser preferences.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

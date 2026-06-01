import { ArrowLeft, Home } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set noindex so search engines don't index this error page
    const metaRobots = document.querySelector("meta[name='robots']");
    const prev = metaRobots ? metaRobots.getAttribute('content') : null;
    if (metaRobots) metaRobots.setAttribute('content', 'noindex, follow');

    const prevTitle = document.title;
    document.title = '404 – Page Not Found | Wysele Technologies';

    return () => {
      document.title = prevTitle;
      if (metaRobots && prev) metaRobots.setAttribute('content', prev);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center font-sans">

      {/* Error Code */}
      <div className="text-[120px] sm:text-[160px] font-black leading-none text-gray-100 select-none" aria-hidden="true">
        404
      </div>

      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 -mt-6 mb-4">
        Page Not Found
      </h1>

      {/* Description */}
      <p className="text-gray-500 text-sm md:text-base max-w-md leading-relaxed mb-10">
        The page you're looking for doesn't exist or has been moved.
        Let's get you back on track.
      </p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 px-8 py-3 bg-[#800000] text-white text-sm font-bold hover:bg-[#C9184A] transition-all duration-300"
        >
          <Home size={16} />
          Back to Home
        </Link>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-8 py-3 border border-gray-200 text-gray-600 text-sm font-bold hover:border-[#800000] hover:text-[#800000] transition-all duration-300"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>
      </div>

      {/* Quick links */}
      <div className="mt-12 border-t border-gray-100 pt-8">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
          Popular Pages
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { label: 'SAP Services', path: '/sap-services' },
            { label: 'About Us', path: '/about' },
            { label: 'Industries', path: '/industries' },
            { label: 'Careers', path: '/careers' },
            { label: 'Blogs', path: '/blogs' },
            { label: 'Contact', path: '/contact' },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-100 hover:bg-[#800000] hover:text-white hover:border-[#800000] transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

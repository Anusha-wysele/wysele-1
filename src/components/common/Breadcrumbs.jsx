import { Link, useLocation } from 'react-router-dom';

const ROUTE_NAME_MAP = {
  "about": "About Us",
  "services": "Services",
  "sap-services": "SAP Services",
  "sap-consulting": "SAP Consulting",
  "sap-signavio": "SAP Signavio",
  "sap-datasphere": "SAP Datasphere",
  "rise-with-sap": "RISE with SAP",
  "sap-btp": "SAP BTP",
  "sap-integration": "SAP Integration",
  "sap-vim-brim": "SAP VIM & BRIM",
  "sap-migration": "SAP Migration",
  "sap-s4hana": "SAP S/4HANA",
  "sap-genai": "SAP GenAI",
  "sap-masterdata": "SAP Master Data",
  "sap-btp-api-management": "SAP BTP API Management",
  "sap-technical-consulting": "SAP Technical Consulting",
  "sap-opentext": "SAP OpenText",
  "salesforce": "Salesforce",
  "cybersecurityhome": "Cybersecurity",
  "itinfrastructure": "IT Infrastructure",
  "web-development": "Web Development",
  "app-development": "App Development",
  "iot-services": "IoT Services",
  "aiml-services": "AI & ML Services",
  "industries": "Industries",
  "contact": "Contact Us",
  "careers": "Careers",
  "apply": "Apply",
  "blogs": "Blogs"
};

const formatSegment = (segment) => {
  if (ROUTE_NAME_MAP[segment]) {
    return ROUTE_NAME_MAP[segment];
  }
  return segment
    .split("-")
    .map(word => {
      if (["SAP", "BTP", "VIM", "BRIM", "AI", "ML", "IOT"].includes(word.toUpperCase())) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

const getLinkPath = (pathnames, index) => {
  const segment = pathnames[index];
  if (segment === "services") {
    return "/sap-services";
  }
  return "/" + pathnames.slice(0, index + 1).join("/");
};

export default function Breadcrumbs() {
  const { pathname } = useLocation();

  // Don't render on home or admin paths
  if (pathname === '/' || pathname.startsWith('/admin')) {
    return null;
  }

  const pathnames = pathname.split('/').filter((x) => x);

  // Structured data schema
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.wysele.com"
      },
      ...pathnames.map((segment, index) => {
        const link = getLinkPath(pathnames, index);
        const name = formatSegment(segment);
        return {
          "@type": "ListItem",
          "position": index + 2,
          "name": name,
          "item": `https://www.wysele.com${link}`
        };
      })
    ]
  };

  // Pages without a hero image — standard breadcrumb bar (light bg, dark text)
  const hasNoHero =
    pathname.startsWith('/careers/apply/') ||
    pathname.match(/^\/blogs\/[^/]+$/);

  if (hasNoHero) {
    return (
      <div className="w-full bg-[#f9f9fb] border-b border-gray-100 py-3 select-none relative z-25">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <style>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
          <nav aria-label="breadcrumb">
            <ol
              className="flex flex-nowrap overflow-x-auto items-center gap-1 no-scrollbar pb-1"
              itemScope
              itemType="https://schema.org/BreadcrumbList"
            >
              <li
                className="flex items-center flex-shrink-0"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <Link
                  itemProp="item"
                  to="/"
                  className="text-[11px] sm:text-xs font-medium text-gray-600 hover:text-[#800000] transition-colors duration-200"
                >
                  <span itemProp="name">Home</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>

              {pathnames.map((segment, index) => {
                const isLast = index === pathnames.length - 1;
                const linkPath = getLinkPath(pathnames, index);
                const displayName = formatSegment(segment);
                const shouldLink = !isLast && segment !== "apply";
                const position = index + 2;

                return (
                  <li
                    key={index}
                    className="flex items-center flex-shrink-0"
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/ListItem"
                  >
                    <span className="text-gray-300 font-light mx-1.5 sm:mx-2 text-[11px] sm:text-xs">&gt;</span>
                    {shouldLink ? (
                      <Link
                        itemProp="item"
                        to={linkPath}
                        className="text-[11px] sm:text-xs font-medium text-gray-600 hover:text-[#800000] transition-colors duration-200"
                      >
                        <span itemProp="name">{displayName}</span>
                      </Link>
                    ) : (
                      <span
                        className="text-[11px] sm:text-xs font-bold text-gray-900"
                        itemProp="name"
                        aria-current={isLast ? "page" : undefined}
                      >
                        {displayName}
                      </span>
                    )}
                    <meta itemProp="position" content={position} />
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>
    );
  }

  // Hero pages — floating glassmorphic pill, absolute in the page flow
  // Scrolls away with the page (not fixed to viewport)
  // The root App div has position:relative, so absolute top is from page top
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <nav
        aria-label="breadcrumb"
        className="absolute left-4 z-50 bg-[rgba(0,0,0,0.55)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.22)] rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.35)] px-4 py-1.5 max-w-[calc(100vw-32px)] top-[110px] md:top-[118px]"
      >
        <style>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
        <ol
          style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', alignItems: 'center', gap: '4px', margin: 0, padding: '2px 0', listStyle: 'none' }}
          className="no-scrollbar"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {/* Home */}
          <li
            style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <Link
              itemProp="item"
              to="/"
              style={{
                color: '#ffffff',
                fontWeight: '600',
                fontSize: '12px',
                textShadow: '0 1px 4px rgba(0,0,0,0.7)',
                whiteSpace: 'nowrap',
                textDecoration: 'none',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#FFB703'}
              onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}
            >
              <span itemProp="name">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>

          {pathnames.map((segment, index) => {
            const isLast = index === pathnames.length - 1;
            const linkPath = getLinkPath(pathnames, index);
            const displayName = formatSegment(segment);
            const shouldLink = !isLast && segment !== "apply";
            const position = index + 2;

            return (
              <li
                key={index}
                style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <span
                  style={{
                    color: 'rgba(255,255,255,0.60)',
                    margin: '0 6px',
                    fontSize: '11px',
                    fontWeight: '300',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    userSelect: 'none',
                  }}
                >
                  &gt;
                </span>
                {shouldLink ? (
                  <Link
                    itemProp="item"
                    to={linkPath}
                    style={{
                      color: '#ffffff',
                      fontWeight: '600',
                      fontSize: '12px',
                      textShadow: '0 1px 4px rgba(0,0,0,0.7)',
                      whiteSpace: 'nowrap',
                      textDecoration: 'none',
                      letterSpacing: '0.01em',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FFB703'}
                    onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}
                  >
                    <span itemProp="name">{displayName}</span>
                  </Link>
                ) : (
                  <span
                    style={{
                      color: '#FFB703',
                      fontWeight: '700',
                      fontSize: '12px',
                      textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                      whiteSpace: 'nowrap',
                      letterSpacing: '0.01em',
                    }}
                    itemProp="name"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {displayName}
                  </span>
                )}
                <meta itemProp="position" content={position} />
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

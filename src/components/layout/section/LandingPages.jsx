import { Suspense, lazy, useEffect, useRef, useState } from "react";
import FadeUp from "../../common/FadeUp";
import ScrollNavigation from "../navbar/ScrollNavigation";
import Herosection from "./Herosection";
import Services from "./Services";

// Lazy load below-the-fold sections
const AboutUs = lazy(() => import("./AboutUs"));
const Industries = lazy(() => import("./Industries"));
const InsightsHero = lazy(() => import("./InsightsHero"));
const BlogsBanner = lazy(() => import("./BlogsBanner"));
const MeetOurPeople = lazy(() => import("./MeetOurPeople"));
const Faq = lazy(() => import("./Faq"));
const OurLocations = lazy(() => import("./OurLocations"));
const GetInTouch = lazy(() => import("./GetinTouch"));
const Footer = lazy(() => import("./Footer"));

const landingSections = [
    { id: "home", label: "Home", hideDot: true },
    { id: "services", label: "Services" },
    { id: "about", label: "About Us" },
    { id: "industries", label: "Industries" },
    { id: "insights", label: "Insights" },
    { id: "blogs", label: "Blogs" },
    { id: "team", label: "Our Team" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Get In Touch" },
    { id: "locations", label: "Our Locations" },
    { id: "footer", label: "Footer", hideDot: true }
];
function LazySection({ children, height = "300px", id }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" } // Load section 300px before it enters the viewport
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} id={id} style={{ minHeight: isVisible ? "auto" : height }}>
      {isVisible ? (
        <Suspense fallback={<div style={{ height }} />} >
          {children}
        </Suspense>
      ) : null}
    </div>
  );
}

const LandingPages = () => {
    return (
        <div style={{ background: "#fff" }}>
            <ScrollNavigation sections={landingSections} />
            <div id="home">
                <Herosection />
            </div>

            <div id="services">
                <Services />
            </div>

                <LazySection id="about" height="400px">
                    <AboutUs />
                </LazySection>

                <LazySection id="industries" height="400px">
                    <FadeUp id="industries" distance={10}>
                        <Industries />
                    </FadeUp>
                </LazySection>

                <LazySection id="insights" height="300px">
                    <FadeUp id="insights" distance={30}>
                        <InsightsHero />
                    </FadeUp>
                </LazySection>

                <LazySection id="blogs" height="400px">
                    <FadeUp id="blogs" distance={30}>
                        <BlogsBanner />
                    </FadeUp>
                </LazySection>

                <LazySection id="team" height="400px">
                    <FadeUp id="team">
                        <MeetOurPeople />
                    </FadeUp>
                </LazySection>

                <LazySection id="faq" height="300px">
                    <FadeUp id="faq" distance={10}>
                        <Faq />
                    </FadeUp>
                </LazySection>

                <LazySection id="contact" height="400px">
                    <div id="contact">
                        <GetInTouch />
                    </div>
                </LazySection>

                <LazySection id="locations" height="300px">
                    <FadeUp id="locations" distance={30}>
                        <OurLocations />
                    </FadeUp>
                </LazySection>

                <LazySection id="footer" height="200px">
                    <FadeUp id="footer" distance={30}>
                        <Footer />
                    </FadeUp>
                </LazySection>
        </div>
    )
}

export default LandingPages;
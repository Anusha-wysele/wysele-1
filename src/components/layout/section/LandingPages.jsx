import { Suspense, lazy } from "react";
import FadeUp from "../../common/FadeUp";
import ScrollNavigation from "../navbar/ScrollNavigation";
import Herosection from "./Herosection";

// Lazy load below-the-fold sections
const Services = lazy(() => import("./Services"));
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

const LandingPages = () => {
    return (
        <div style={{ background: "#fff" }}>
            <ScrollNavigation sections={landingSections} />
            <div id="home">
                <Herosection />
            </div>

            <Suspense fallback={<div className="h-[50vh]" />}>
                <div id="services" distance={-10}>
                    <Services />
                </div>

                <div id="about">
                    <AboutUs />
                </div>

                <FadeUp id="industries" distance={10}>
                    <Industries />
                </FadeUp>
                <FadeUp id="insights" distance={30}>
                    <InsightsHero />
                </FadeUp>

                <FadeUp id="blogs" distance={30}>
                    <BlogsBanner />
                </FadeUp>

                <FadeUp id="team">
                    <MeetOurPeople />
                </FadeUp>

                <FadeUp id="faq" distance={10}>
                    <Faq />
                </FadeUp>

                <div id="contact">
                    <GetInTouch />
                </div>

                <FadeUp id="locations" distance={30}>
                    <OurLocations />
                </FadeUp>

                <FadeUp id="footer" distance={30}>
                    <Footer />
                </FadeUp>
            </Suspense>
        </div>
    )
}

export default LandingPages;
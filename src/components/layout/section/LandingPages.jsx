import Faq from "./Faq";
import AboutUs from "./AboutUs";
import BlogsBanner from "./BlogsBanner";
import Footer from "./Footer";
import GetInTouch from "./GetinTouch";
import Herosection from "./Herosection";
import Industries from "./Industries";
import InsightsHero from "./InsightsHero";
import MeetOurPeople from "./MeetOurPeople";
import FadeUp from "../../common/FadeUp";
import ScrollNavigation from "../navbar/ScrollNavigation";
import LeftSidebar from "../navbar/LeftSidebar";
import Services from "./Services";

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
    { id: "footer", label: "Footer", hideDot: true }
];

const LandingPages = () => {
    return (
        <div style={{ background: "#fff" }}>
            <ScrollNavigation sections={landingSections} />
            <LeftSidebar />
            <div id="home">
                <Herosection />
            </div>

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

            <FadeUp id="contact" distance={30}>
                <GetInTouch />
            </FadeUp>

            <FadeUp id="footer" distance={30}>
                <Footer />
            </FadeUp>
        </div>
    )
}

export default LandingPages;
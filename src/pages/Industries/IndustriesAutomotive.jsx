import IndustrySection from "./IndustrySection";
import { AUTOMOTIVE_IMAGE } from "../../components/common/data";

const IndustriesAutomotive = () => {
    const features = [
        {
            title: "Production Lifecycle Management",
            content: "Oversee every stage of product development with enhanced efficiency and reduced time-to-market."
        },
        {
            title: "Demand Forecasting",
            content: "Make informed decisions with accurate demand predictions driven by historical data and trends."
        },
        {
            title: "Supply Chain Integration",
            content: "Improve collaboration across suppliers and partners with seamless data connectivity."
        },
        {
            title: "Aftermarket Services Optimization",
            content: "Enhance post-sales support and parts management with intelligent service tools."
        }
    ];

    return (
        <IndustrySection
            title="Automotive & Heavy Equipment"
            description="Wysele enables automotive businesses to optimize supply chains, improve production, and enhance customer experience."
            image={AUTOMOTIVE_IMAGE}
            features={features}
            reversed={false}
        />
    );
};

export default IndustriesAutomotive;

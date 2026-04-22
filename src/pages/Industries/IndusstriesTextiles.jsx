import IndustrySection from "./IndustrySection";
import { TEXTILES_IMAGE } from "../../components/common/data";

const IndustriesTextiles = () => {
    const features = [
        {
            title: "Inventory and Order Management",
            content: "Improve order accuracy and reduce lead times with streamlined inventory controls."
        },
        {
            title: "Sustainable Sourcing Solutions",
            content: "Support eco-friendly practices by tracking sustainability metrics across the supply chain."
        },
        {
            title: "Production Cost Optimization",
            content: "Minimize operational costs through data-driven efficiency improvements."
        },
        {
            title: "Supply Chain Transparency",
            content: "Enhance supplier collaboration and material traceability across global networks."
        }
    ];

    return (
        <IndustrySection
            title="Textiles"
            description="Revolutionizing the textile industry with smart solutions for supply chain efficiency, sustainable sourcing, and optimized production workflows."
            image={TEXTILES_IMAGE}
            features={features}
            reversed={true}
        />
    );
};

export default IndustriesTextiles;

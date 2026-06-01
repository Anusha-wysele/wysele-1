import UTILITIES_IMAGE from "../../assets/wysele-industriesutilities.webp";
import IndustrySection from "./IndustrySection";

const IndustriesUtilities = () => {
    const features = [
        {
            title: "Smart Grid Management",
            content: "Enable real-time monitoring and control of energy distribution networks for improved reliability."
        },
        {
            title: "Regulatory Compliance Tools",
            content: "Simplify adherence to industry regulations through automated compliance tracking systems."
        },
        {
            title: "Energy Efficiency Optimization",
            content: "Drive sustainability by optimizing energy usage patterns with predictive analytics."
        },
        {
            title: "Asset Lifecycle Management",
            content: "Maximize the performance and lifespan of critical infrastructure assets."
        }
    ];

    return (
        <IndustrySection
            title="Utilities"
            description="Wysele provides SAP solutions that help utilities enhance service delivery, regulatory compliance, and asset management."
            image={UTILITIES_IMAGE}
            features={features}
            reversed={true}
        />
    );
};

export default IndustriesUtilities;

import AEROSPACE_IMAGE from "../../assets/wysele-industriesaerospace.webp";
import IndustrySection from "./IndustrySection";

const IndustriesAerospace = () => {
    const features = [
        {
            title: "Compliance and Risk Management",
            content: "Navigate complex regulatory environments with robust risk assessment tools."
        },
        {
            title: "Integrated Project Workflows",
            content: "Enhance collaboration and streamline project execution with centralized data platforms."
        },
        {
            title: "Predictive Maintenance Solutions",
            content: "Reduce equipment downtime through proactive maintenance scheduling."
        },
        {
            title: "Secure Supply Chain Solutions",
            content: "Safeguard sensitive data and materials with advanced security protocols."
        }
    ];

    return (
        <IndustrySection
            title="Aerospace & Defense"
            description="Wysele helps aerospace and defense companies drive operational excellence, compliance, and innovation."
            image={AEROSPACE_IMAGE}
            features={features}
            reversed={true}
        />
    );
};

export default IndustriesAerospace;

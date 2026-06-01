import PHARMA_IMAGE from "../../assets/wysele-industriespharma.webp";
import IndustrySection from "./IndustrySection";

const IndustriesPharmaceutical = () => {
    const features = [
        {
            title: "Compliance with Industry Regulations",
            content: "Automate regulatory reporting and maintain audit readiness with minimal effort"
        },
        {
            title: "Efficient R&D Management",
            content: "Streamline clinical trials and drug development processes with integrated project management tools."
        },
        {
            title: "Supply Chain Traceability",
            content: "Ensure product integrity with end-to-end visibility from production to patient."
        },
        {
            title: "Pharmacovigilance Tools",
            content: "Enhance drug safety monitoring with advanced risk detection systems."
        }
    ];

    return (
        <IndustrySection
            title="Pharmaceutical"
            description="SAP solutions by Wysele enable pharma companies to meet regulatory requirements while optimizing supply chain operations."
            image={PHARMA_IMAGE}
            features={features}
            reversed={true}
        />
    );
};

export default IndustriesPharmaceutical;

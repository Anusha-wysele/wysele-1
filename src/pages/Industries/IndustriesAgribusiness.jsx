import IndustrySection from "./IndustrySection";
import { AGRIBUSINESS_IMAGE } from "../../components/common/data";

const IndustriesAgribusiness = () => {
    const features = [
        {
            title: "Smart Agriculture Solutions",
            content: "Utilize IoT and data analytics to optimize crop yield and soil health."
        },
        {
            title: "Resource Management Systems",
            content: "Efficiently manage water, energy, and other critical resources for sustainable operations."
        },
        {
            title: "Sustainability Tracking",
            content: "Monitor environmental impact and promote eco-friendly farming initiatives."
        },
        {
            title: "Precision Farming Technologies",
            content: "Enhance crop management with data-driven decision-making tools."
        }
    ];

    return (
        <IndustrySection
            title="Agribusiness"
            description="From farm to fork, Wysele’s SAP solutions help agribusinesses optimize processes, enhance sustainability, and maximize yields."
            image={AGRIBUSINESS_IMAGE}
            features={features}
            reversed={false}
        />
    );
};

export default IndustriesAgribusiness;

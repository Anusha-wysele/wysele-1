import MINING_IMAGE from "../../assets/wysele-industriesmining.webp";
import IndustrySection from "./IndustrySection";
import { Link } from 'react-router-dom';

const IndustriesMining = () => {
    const features = [
        {
            title: "Asset Performance Management",
            content: "Maximize equipment uptime with real-time monitoring and predictive maintenance."
        },
        {
            title: "Environmental Compliance Tracking",
            content: "Ensure adherence to environmental regulations with automated reporting tools."
        },
        {
            title: "Safety Monitoring Systems",
            content: "Enhance worker safety through real-time hazard detection and incident management solutions."
        },
        {
            title: "Operational Efficiency Analytics",
            content: "Optimize mining operations with data-driven performance insights."
        }
    ];

    return (
        <IndustrySection
            title="Mining"
            description={<>Enhance safety, sustainability, and efficiency in the mining industry with Wysele’s <Link to="/services/sap-consulting" className="hover:underline transition-colors decoration-[#C9184A] underline-offset-4 text-inherit font-medium">innovative solutions</Link>.</>}
            image={MINING_IMAGE}
            features={features}
            reversed={false}
        />
    );
};

export default IndustriesMining;

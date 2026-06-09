import RETAIL_IMAGE from "../../assets/wysele-industriesretail.webp";
import IndustrySection from "./IndustrySection";
import { Link } from 'react-router-dom';

const IndustriesRetail = () => {
    const features = [
        {
            title: "Omnichannel Retail Management",
            content: "Deliver consistent customer experiences across all sales channels with integrated platforms."
        },
        {
            title: "Dynamic Pricing Tools",
            content: "Adapt pricing strategies in real-time based on demand, competition, and inventory levels."
        },
        {
            title: "Customer Behavior Analytics",
            content: "Understand and anticipate consumer trends to drive targeted marketing campaigns."
        },
        {
            title: "Inventory Optimization Systems",
            content: "Reduce stockouts and overstock with predictive inventory management."
        }
    ];

    return (
        <IndustrySection
            title="Retail"
            description={<>Enable omnichannel experiences, optimize inventory, and enhance customer engagement with Wysele’s <Link to="/services/sap-consulting" className="hover:underline transition-colors decoration-[#C9184A] underline-offset-4 text-inherit font-medium">retail solutions</Link>.</>}
            image={RETAIL_IMAGE}
            features={features}
            reversed={false}
        />
    );
};

export default IndustriesRetail;

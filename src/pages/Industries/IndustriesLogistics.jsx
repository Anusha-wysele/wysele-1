import IndustrySection from "./IndustrySection";
import { LOGISTICS_IMAGE } from "../../components/common/data";

const IndustriesLogistics = () => {
    const features = [
        {
            title: "Real-Time Tracking Systems",
            content: "Enhance supply chain transparency with live tracking of goods and shipments."
        },
        {
            title: "Route Optimization",
            content: "Minimize delivery times and fuel costs through data-driven route planning algorithms."
        },
        {
            title: "Automated Inventory Management",
            content: "Improve stock accuracy and reduce manual errors with intelligent inventory automation."
        },
        {
            title: "Warehouse Automation Solutions",
            content: "Streamline warehouse operations with robotics and smart management tools."
        }
    ];

    return (
        <IndustrySection
            title="Logistics"
            description="Streamline operations, enhance route planning, and ensure seamless deliveries with Wysele’s logistics solutions."
            image={LOGISTICS_IMAGE}
            features={features}
            reversed={false}
        />
    );
};

export default IndustriesLogistics;

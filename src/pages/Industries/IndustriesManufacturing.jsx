import MANUFACTURING_IMAGE from "../../assets/wysele-industriesmanufacturing.webp";
import IndustrySection from "./IndustrySection";

const IndustriesManufacturing = () => {
  const features = [
    {
      title: "Enhanced Production Planning",
      content: "Optimize resource allocation and streamline workflows to meet dynamic market demands with precision."
    },
    {
      title: "Supply Chain Optimization",
      content: "Leverage real-time data to identify bottlenecks and enhance end-to-end supply chain visibility."
    },
    {
      title: "Real-Time Performance Analytics",
      content: "Gain actionable insights to improve decision-making and operational agility."
    },
    {
      title: "Quality Management Systems",
      content: "Ensure product excellence through automated quality control and compliance tracking."
    }
  ];

  return (
    <IndustrySection
      title="Manufacturing"
      description="Leverage SAP solutions to optimize production, reduce downtime, and drive digital transformation in the manufacturing sector."
      image={MANUFACTURING_IMAGE}
      features={features}
      reversed={false}
    />
  );
};

export default IndustriesManufacturing;

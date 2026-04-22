import IndustrySection from "./IndustrySection";
import { BANKING_IMAGE } from "../../components/common/data";

const IndustriesBanking = () => {
    const features = [
        {
            title: "Secure Financial Platforms",
            content: "Protect sensitive data and transactions with advanced cybersecurity protocols."
        },
        {
            title: "Fraud Detection Systems",
            content: "Identify and mitigate risks with real-time fraud monitoring and predictive analytics."
        },
        {
            title: "Customer Engagement Analytics",
            content: "Personalize banking services through deep insights into customer behavior and preferences."
        },
        {
            title: "Regulatory Reporting Automation",
            content: "Streamline compliance reporting to meet global financial regulations."
        }
    ];

    return (
        <IndustrySection
            title="Banking & Financial"
            description="Wysele helps financial institutions modernize core banking operations, enhance security, and drive digital transformation."
            image={BANKING_IMAGE}
            features={features}
            reversed={true}
        />
    );
};

export default IndustriesBanking;

import LogoBlackImg from "../../../assets/logo.png";

const LogoMobile = ({ white = false }) => {
    return (
        <div
            className="w-full flex items-center justify-center"
        >
            <div
                className="text-center relative overflow-hidden group"
                style={{
                    transition: "transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                }}
            >


                <img
                    src={LogoBlackImg}
                    alt="Wysele Company Logo"
                    title="Wysele Home"
                    width="80"
                    height="20"
                    className="w-20 bg-cover mx-auto"
                />

            </div>
        </div>
    );
};

export default LogoMobile;
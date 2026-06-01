import LogoWhiteImg from "../../../assets/LogoWhite.png";

const Logo = ({ white = false }) => {
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
                    src={LogoWhiteImg}
                    alt="Wysele Technologies Logo"
                    title="Wysele Technologies"
                    width="96"
                    height="24"
                    className="w-24 bg-cover mx-auto"
                />

            </div>
        </div>
    );
};

export default Logo;

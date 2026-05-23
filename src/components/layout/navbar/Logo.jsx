import React, { useState } from "react";
import { WYSELE_LOGOS } from "../../common/data";
import logoImg from "../../../assets/logo.png"
import LogoWhiteImg from "../../../assets/LogoWhite.png";

const Logo = ({ white = false }) => {
    const [hover, setHover] = useState(false);

    return (
        <div
            className="w-full flex items-center justify-center"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div
                className="text-center relative overflow-hidden group"
                style={{
                    transition: "transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                }}
            >


                <img
                    src={LogoWhiteImg}
                    alt="Logo"
                    className="w-24 bg-cover mx-auto"
                />

            </div>
        </div>
    );
};

export default Logo;

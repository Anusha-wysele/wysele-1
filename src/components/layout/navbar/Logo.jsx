import React, { useState } from "react";
import { WYSELE_LOGOS } from "../../common/data";

const Logo = () => {
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
                    transform: hover ? "scale(1.05)" : "scale(1)",
                }}
            >
                {/* Shine layer */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "50%",
                        height: "100%",
                        background: "linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)",
                        transform: "skewX(-25deg)",
                        transition: hover ? "left 0.7s ease" : "none",
                        left: hover ? "150%" : "-100%",
                        zIndex: 1,
                        pointerEvents: "none"
                    }}
                />

                <img
                    src={WYSELE_LOGOS.dark}
                    alt="Logo"
                    className="w-20 bg-cover mx-auto"
                />

            </div>
        </div>
    );
};

export default Logo;

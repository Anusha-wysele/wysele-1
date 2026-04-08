import { useRef } from "react";
import { gsap } from "gsap";

const MagneticButton = ({ text, icon, color = "#2d2d2d" }) => {
    const btnRef = useRef(null);
    const textRef = useRef(null);

    const handleMove = (e) => {
        const rect = btnRef.current.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        const moveX = (relX - rect.width / 2) * 0.25;
        const moveY = (relY - rect.height / 2) * 0.25;
        gsap.to(btnRef.current, { x: moveX, y: moveY, duration: 0.3, ease: "power3.out" });
        gsap.to(textRef.current, { x: moveX * 0.4, y: moveY * 0.4, duration: 0.3, ease: "power3.out" });
    };

    const handleLeave = () => {
        gsap.to([btnRef.current, textRef.current], { x: 0, y: 0, duration: 1, ease: "elastic.out(1.2, 0.4)" });
    };

    const handleEnter = () => {
        const letters = textRef.current.querySelectorAll("span");
        gsap.fromTo(
            letters,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.03, duration: 0.4, ease: "back.out(1.7)" }
        );
    };

    return (
        <button
            ref={btnRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            onMouseEnter={handleEnter}
            style={{ color: color, borderColor: color, transition: "color 0.3s, border-color 0.3s" }}
            className="relative px-6 py-2 rounded-full bg-transparent border overflow-hidden text-sm font-semibold tracking-widest uppercase"
        >
            <div className="flex items-center gap-2">
                <span ref={textRef} className="inline-block">
                    {(text || "").split("").map((char, i) => (
                        <span key={i} className="inline-block text-sm">
                            {char}
                        </span>
                    ))}
                </span>
                <div>{icon}</div>
            </div>
            <span className="absolute inset-0 rounded-full opacity-0 hover:opacity-30 transition duration-300"></span>
        </button>
    );
};

export default MagneticButton;
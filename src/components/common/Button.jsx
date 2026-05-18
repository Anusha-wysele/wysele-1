import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Button = ({
    text = "Get In Touch",
    onClick,
    className = "",
    icon = <ArrowRight size={16} />,
    variant = "primary",
    type = "button",
    disabled = false
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.button
            type={type}
            disabled={disabled}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            className={`group inline-flex items-center justify-center gap-3 px-6 py-2.5 md:px-7 md:py-3 
                       text-[10px] md:text-[10px] font-medium tracking-[0.1em] uppercase transition-all duration-300 rounded-full
                       ${variant === "primary" ? "bg-[#FFD700] text-black" : "bg-white text-black"} 
                       ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                       ${className}`}
        >
            <span className="relative z-10">{text}</span>
            {icon && (
                <motion.div
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 flex items-center"
                >
                    {icon}
                </motion.div>
            )}
        </motion.button>
    );
};

export default Button;
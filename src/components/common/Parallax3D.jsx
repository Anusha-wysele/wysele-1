import React, { useState, useRef, useCallback } from 'react';

// Custom hook for tracking mouse and returning damped 3D rotation coordinates
export const useMouseParallax = (multiplier = 4) => {
    const ref = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setTilt({
            x: -(y / rect.height) * multiplier,
            y: (x / rect.width) * multiplier
        });
    }, [multiplier]);

    const handleMouseLeave = useCallback(() => {
        setTilt({ x: 0, y: 0 });
    }, []);

    return { ref, tilt, handleMouseMove, handleMouseLeave };
};

// Reusable Tilt Card wrapper combining perspective wrapper and animated children
export const HoverTiltCard = React.forwardRef(({ 
    children, 
    style = {}, 
    className = "",
    tiltMultiplier = 8,
    glareOpacity = 0.1,
    onMouseEnter,
    onMouseLeave,
    ...props
}, ref) => {
    // Merge the forwarded ref and local cardRef using a callback or just use the local one and sync it
    const localRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [glare, setGlare] = useState({ x: 50, y: 50, o: 0 });

    const handleMouseMove = (e) => {
        const node = ref && typeof ref !== 'function' ? ref.current : localRef.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPct = (x / rect.width - 0.5) * 2;
        const yPct = (y / rect.height - 0.5) * 2;
        setTilt({ x: -yPct * tiltMultiplier, y: xPct * tiltMultiplier });
        setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, o: glareOpacity });
    };

    const handleMouseLeaveInternal = (e) => {
        setTilt({ x: 0, y: 0 });
        setGlare(p => ({ ...p, o: 0 }));
        if (onMouseLeave) onMouseLeave(e);
    };

    const handleMouseEnterInternal = (e) => {
        if (onMouseEnter) onMouseEnter(e);
    };

    return (
        <div
            ref={ref || localRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnterInternal}
            onMouseLeave={handleMouseLeaveInternal}
            className={className}
            style={{
                perspective: 1000,
                transformStyle: 'preserve-3d',
                ...style
            }}
            {...props}
        >
            <div
                style={{
                    width: '100%', height: '100%',
                    position: 'relative',
                    transition: 'transform 0.15s linear, box-shadow 0.3s ease',
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transformStyle: 'preserve-3d',
                    borderRadius: 'inherit'
                }}
            >
                {/* Dynamic Mouse Glare Layer */}
                <div style={{
                    position: 'absolute', inset: 0,
                    pointerEvents: 'none',
                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 60%)`,
                    opacity: glare.o,
                    transition: 'opacity 0.3s ease',
                    zIndex: 20,
                    borderRadius: 'inherit'
                }} />

                {/* Render the actual content inside the tilted plane */}
                {children}
            </div>
        </div>
    );
});

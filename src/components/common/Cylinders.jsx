
const Cylinders = () => {
    return (
        <>
            {/* Bottom-left Cylinder - vertical */}
            <div className="absolute bottom-0 left-0 w-12 h-32 rounded-full border border-white/30 bg-white/10 pointer-events-none z-0" />
            {/* Bottom-left Cylinder - horizontal */}
            <div className="absolute bottom-0 left-0 w-32 h-12 rounded-full border border-white/30 bg-white/10 pointer-events-none z-0" />
            {/* Top-right Cylinder - horizontal */}
            <div className="absolute top-0 right-0 w-32 h-12 rounded-full border border-white/30 bg-white/10 pointer-events-none z-0" />
            {/* Top-right Cylinder - vertical */}
            <div className="absolute top-0 right-0 w-12 h-32 rounded-full border border-white/30 bg-white/10 pointer-events-none z-0" />
        </>
    );
};

export default Cylinders;

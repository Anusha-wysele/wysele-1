import React from 'react';

export default function Button({ text = "Explore", onClick }) {
    return (
        <button
            onClick={onClick}
            className="relative group flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-md bg-slate-400/60 border border-gray-400/50 text-white text-xs tracking-widest uppercase font-bold hover:bg-red-800/70 transition-all duration-300 backdrop-blur-md"
            style={{ overflow: 'hidden' }}
        >
            {/* Default Text */}
            <span className="flex items-center gap-1.5 transition-all duration-500 group-hover:-translate-y-full group-hover:opacity-0 absolute">
                {text}
            </span>

            {/* Hover Text */}
            <span className="flex items-center gap-1.5 transition-all duration-500 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                {text}
                <span style={{ display: 'inline-block', transform: 'rotate(-45deg)' }}>
                    →
                </span>
            </span>
        </button>
    );
}
import React from 'react';

interface LogoProps {
    className?: string;
    iconOnly?: boolean;
}

export default function Logo({ className = "", iconOnly = false }: LogoProps) {
    return (
        <div className={`flex items-center gap-3 group ${className}`}>
            <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                {/* Background Shadow/Glow */}
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg group-hover:bg-primary/30 transition-all duration-500"></div>

                {/* Main Icon Container */}
                <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-primary/20 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 border border-white/10">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                        {/* Stylized "Nanobanana" Tech Icon */}
                        <path
                            d="M7 3C9.5 3 13 4.5 15 7C17 9.5 18 13.5 17 17C16 20.5 12 21 10 21C8 21 4 20.5 3 17C2 13.5 3 9.5 5 7C7 4.5 7 3 7 3Z"
                            fill="#FACC15"
                            className="group-hover:fill-yellow-300 transition-colors duration-500"
                        />
                        <path
                            d="M10 5C11.5 5 14 6 15.5 8C17 10 17.5 13 17 15"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            className="opacity-40"
                        />
                        <circle cx="12" cy="12" r="1.5" fill="white" className="animate-pulse" />
                        <circle cx="8" cy="15" r="1" fill="white" className="opacity-60" />
                        <circle cx="14" cy="9" r="1" fill="white" className="opacity-60" />
                    </svg>
                </div>
            </div>

            {!iconOnly && (
                <div className="flex flex-col leading-none">
                    <span className="font-black text-2xl tracking-tighter text-foreground group-hover:text-primary transition-colors">
                        SaaS<span className="text-primary italic">Compare</span>
                    </span>
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground/50 ml-0.5">
                        Pro Insights
                    </span>
                </div>
            )}
        </div>
    );
}

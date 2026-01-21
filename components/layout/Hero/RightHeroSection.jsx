import Image from "next/image";

const RightHeroSection = () => {
    return (
        /* Reduced max-width for md screens to fit side-by-side better */
        <div className="relative w-full max-w-[320px] md:max-w-sm lg:max-w-120 mx-auto">
            {/* Main Image Container */}
            <div className="relative rounded-4xl overflow-hidden shadow-2xl border border-light-secondary/10">
                <div className="absolute inset-0 z-20 pointer-events-none opacity-20 bg-[radial-gradient(#7c3aed_1px,transparent_1px)] bg-size-[15px_15px]" />
                
                <Image
                    src="/images/HeroRight.png"
                    /* Added descriptive alt text for industry standard accessibility */
                    alt="A woman smiling and using sign language while working on a laptop, demonstrating Siglyk translation"
                    width={500}
                    height={500}
                    priority
                    className="w-full h-auto object-cover"
                />
            </div>

            {/* Floating Translation Card */}
            <div className="absolute z-30 bottom-4 left-2 right-2 md:left-6 md:right-6 bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-xl border border-light-secondary/20 flex items-center gap-3">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-light-secondary flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-xl">sign_language</span>
                </div>

                <div className="flex-1">
                    <p className="text-[9px] font-bold text-light-secondary/70 uppercase tracking-widest">AI Translation</p>
                    {/* Updated to light-secondary color */}
                    <p className="text-xs md:text-sm font-bold text-light-secondary leading-tight">
                        "Breaking Barriers, One Sign at a Time"
                    </p>
                </div>

                <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-light-secondary/30 rounded-full animate-pulse" />
                    <span className="w-1.5 h-1.5 bg-light-secondary/30 rounded-full animate-pulse [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-light-secondary/30 rounded-full animate-pulse [animation-delay:0.4s]" />
                </div>
            </div>
        </div>
    );
};

export default RightHeroSection;
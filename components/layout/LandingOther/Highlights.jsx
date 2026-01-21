import React from 'react'
import highlights from '@/data/highlights'

const Highlights = () => {
    return (
        <section className="w-full bg-light-primary py-24" id="highlights">
            {/* Unified container for Siglyk alignment */}
            <div className="mx-auto max-w-7xl px-10 lg:w-[80vw] ">
                
                {/* Header Section */}
                <div className="flex flex-col gap-4 mb-16 text-center items-center">
                    <span className="text-light-secondary font-bold tracking-widest text-xs uppercase">
                        Platform Highlights
                    </span>
                    <h2 className="text-dark-primary text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.015em]">
                        Built for the Real World
                    </h2>
                    <p className="text-light-secondary/80 max-w-2xl text-lg">
                        Our cutting-edge technology ensures that communication is not just possible, but fluid and private.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {highlights.map((feature, index) => (
                        <div 
                            key={index} 
                            className="p-8 rounded-3xl bg-white border border-light-secondary/10 hover:border-light-secondary/30 hover:shadow-2xl hover:shadow-light-secondary/10 transition-all duration-300 flex flex-col gap-5 group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-light-secondary/10 flex items-center justify-center text-light-secondary group-hover:bg-light-secondary group-hover:text-white transition-all duration-300">
                                <span className="material-symbols-outlined text-3xl">
                                    {feature.icon}
                                </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-bold text-dark-primary">{feature.name}</h3>
                                <p className="text-sm text-light-secondary/80 leading-relaxed">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Highlights
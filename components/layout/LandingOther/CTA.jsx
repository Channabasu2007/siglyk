import React from 'react'
import SecondaryButton from '@/components/Buttons/SecondaryButton'

const CTA = () => {
    return (
        <section className="w-full bg-light-primary py-20 flex justify-center">
            {/* Matching Hero Width: 80vw */}
            <div className="w-full px-8 lg:w-[80vw] mx-auto">
                <div className="flex flex-col items-center justify-center gap-8 px-6 py-16 bg-light-secondary rounded-[2.5rem] shadow-2xl shadow-light-secondary/30 text-light-primary overflow-hidden relative">
                    {/* Visual Decor */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)]"></div>
                    
                    <div className="flex flex-col gap-4 text-center max-w-160 relative z-10">
                        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
                            Ready to experience seamless communication?
                        </h2>
                        <p className="text-light-primary/80 text-lg font-normal">
                            Join thousands of users who are already breaking communication barriers every day with Siglyk.
                        </p>
                    </div>

                    <div className="flex justify-center w-full relative z-10">
                        {/* Using a white version of your primary button logic */}
                        <SecondaryButton label="Start Free Trial" className='scale-170 shadow-2xl hover:scale-180 transition-transform duration-500 shadow-dark-primary'/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTA
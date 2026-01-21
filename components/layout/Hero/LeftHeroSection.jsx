import React from 'react'
import PrimaryButton from '@/components/Buttons/PrimaryButton'
import SecondaryButton from '@/components/Buttons/SecondaryButton'

const LeftHeroSection = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center mt-5 py-6 md:py-0">
            {/* Reduced heading sizes for md screens to prevent overflow */}
            <div className='flex flex-col leading-[1.1] tracking-tighter'>
                <h1 className='font-extrabold text-5xl md:text-5xl lg:text-6xl text-text-dark'>Breaking</h1>
                <h1 className='font-extrabold text-5xl md:text-5xl lg:text-6xl text-text-dark'>Barriers, One</h1>
                <h1 className='font-extrabold text-5xl md:text-5xl lg:text-6xl text-text-dark'>Sign at a</h1>
                <h1 className='font-extrabold text-5xl md:text-5xl lg:text-6xl text-text-dark'>Time.</h1>
            </div>

            {/* Paragraph now uses light-secondary color as requested */}
            <p className='text-light-secondary text-base md:text-md mt-6 max-w-100 leading-relaxed'>
                Empowering the deaf and hard of hearing community with real-time AI-powered sign language translation. Communicate effortlessly with anyone, anywhere, at any time.
            </p>

            {/* Adjusted spacing for smaller screens */}
            <div className='flex flex-col sm:flex-row mt-8 gap-4 items-start'>
                <div className='hover:scale-105 transition-transform duration-300 shadow-xl shadow-light-secondary/20 rounded-xl'>
                    <PrimaryButton label="Get Started For Free" />
                </div>
                <div className='hover:bg-light-secondary/5 rounded-xl transition-colors'>
                    <SecondaryButton label="Watch Demo" />
                </div>
            </div>
        </div>
    )
}

export default LeftHeroSection
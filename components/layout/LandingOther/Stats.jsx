import React from 'react'
import stats from '@/data/stats'

const Stats = () => {
    
  return (
   <section className="w-full bg-light-secondary/10 py-12">
            <div className="max-w-7xl mx-auto px-8 lg:w-[70vw] grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {/* 1. Use Object.entries to get [key, value] pairs */}
                {Object.entries(stats).map(([label, value], index) => (
                    <div key={index} className="flex flex-col gap-2">
                        {/* The Number (Value) */}
                        <h2 className="text-4xl md:text-5xl font-extrabold text-light-secondary">
                            {value}
                        </h2>
                        {/* The Description (Key) */}
                        <p className="text-light-secondary/80 font-medium text-sm md:text-base uppercase tracking-wider">
                            {label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
  )
}

export default Stats
"use client"
import React from 'react'
import Hero from '@/components/layout/Hero/Hero'
import Stats from '@/components/layout/LandingOther/Stats'
import Highlights from '@/components/layout/LandingOther/Highlights'
import Testimonials from '@/components/layout/LandingOther/Testimonials'
import CTA from '@/components/layout/LandingOther/CTA'


const Page = () => {
  return (
    <main>
      <Hero />
      <Stats />
      <Highlights />
      <Testimonials />
      <CTA />
    </main>
  )
}

export default Page;
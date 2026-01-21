"use client"
import React from 'react'
import Hero from '@/components/layout/Hero/Hero'
import Stats from '@/components/layout/LandingOther/Stats'
import Highlights from '@/components/layout/LandingOther/Highlights'
import Testimonials from '@/components/layout/LandingOther/Testimonials'
import CTA from '@/components/layout/LandingOther/CTA'

const page = () => {
  const handlebtn=()=>{
    alert("Button Clicked")
  }
  return (
    <main className=''>
      <Hero />
      <Stats />
      <Highlights />
      <Testimonials />
      <CTA />
    </main>
  )
}

export default page
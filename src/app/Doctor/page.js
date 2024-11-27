'use client'
import React from 'react'
import DoctorHero from '@/components/doctor/DoctorHero'
import { HeroContainer } from '@/components/shared/HeroContainer'

export default function page() {
  return (
    <>
      <HeroContainer bgGradientClassName='bottom-0 h-[calc(100%_+_320px)]'>
        <DoctorHero />
      </HeroContainer>
    </>
  )
}

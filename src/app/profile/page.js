'use client'
import React from 'react'
import MyProfile from '@/components/profile/MyProfile'
import { HeroContainer } from '@/components/shared/HeroContainer'

export default function page() {
  return (
    <>
      <HeroContainer bgGradientClassName='bottom-0 h-[calc(100%_+_320px)]'>
        <MyProfile />
      </HeroContainer>
    </>
  )
}

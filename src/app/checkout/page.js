'use client'
import React from 'react'
import Payment from '@/components/payment/Payment'
import { HeroContainer } from '@/components/shared/HeroContainer'

export default function Checkout() {
  return (
    <>
      <HeroContainer bgGradientClassName='bottom-0 h-[calc(100%_+_320px)]'>
        <Payment />
      </HeroContainer>
    </>
  )
}

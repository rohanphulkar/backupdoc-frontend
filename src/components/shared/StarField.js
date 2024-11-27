'use client'
import { Stars } from '@/lib/starfield'
import { useEffect, useRef } from 'react'

export const StarField = ({
  maxRadius = 3,
  minRadius = 1,
  density = 'low',
}) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const starfield = new Stars(
      canvasRef.current,
      maxRadius,
      minRadius,
      density
    )
    return () => {
      starfield.destroy()
    }
  }, [density, maxRadius, minRadius])

  return (
    <canvas
      ref={canvasRef}
      className='opacity-0 duration-1000 ease-in-out'
    ></canvas>
  )
}

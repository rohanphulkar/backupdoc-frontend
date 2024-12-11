'use client'

import Image from 'next/image'
import { Container } from '@/components/shared/Container'
import { Button } from '@/components/shared/Button'
import { ContentPill } from '@/components/shared/ContentPill'
import { useState, useRef, useCallback, useEffect } from 'react'
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react'
import { SparklesIcon, XMarkIcon } from '@heroicons/react/16/solid'
import { PlayCircleIcon } from '@heroicons/react/20/solid'
import { CLIENTS } from '@/config'
import data from '@/images/data.jpeg'
import data2 from '@/images/data2.jpeg'
import hero from '@/images/hero-optimized.png'

export const HomeHero = () => {
  let [isOpen, setIsOpen] = useState(false)
  const sliderRef = useRef(null)
  const imgWrapperRef = useRef(null)
  const handleRef = useRef(null)
  const [isSliderLocked, setIsSliderLocked] = useState(false)

  const handleMouseMove = useCallback(
    (event) => {
      if (isSliderLocked) return

      const slider = sliderRef.current
      const imgWrapper = imgWrapperRef.current
      const handle = handleRef.current

      const sliderLeftX = slider.offsetLeft
      const sliderWidth = slider.clientWidth
      let mouseX = (event.clientX || event.touches[0].clientX) - sliderLeftX
      mouseX = Math.max(0, Math.min(mouseX, sliderWidth))

      imgWrapper.style.width = `${(mouseX / sliderWidth) * 100}%`
      handle.style.left = `calc(${(mouseX / sliderWidth) * 100}% - ${
        handle.clientWidth / 2
      }px)`
    },
    [isSliderLocked]
  )

  const handleMouseDown = useCallback(
    (event) => {
      setIsSliderLocked(false)
      handleMouseMove(event)
    },
    [handleMouseMove]
  )

  const handleMouseUp = useCallback(() => {
    setIsSliderLocked(true)
  }, [])

  useEffect(() => {
    const slider = sliderRef.current
    slider.addEventListener('mousemove', handleMouseMove)
    slider.addEventListener('mousedown', handleMouseDown)
    slider.addEventListener('mouseup', handleMouseUp)
    slider.addEventListener('touchmove', handleMouseMove)
    slider.addEventListener('touchstart', handleMouseDown)
    slider.addEventListener('touchend', handleMouseUp)

    return () => {
      slider.removeEventListener('mousemove', handleMouseMove)
      slider.removeEventListener('mousedown', handleMouseDown)
      slider.removeEventListener('mouseup', handleMouseUp)
      slider.removeEventListener('touchmove', handleMouseMove)
      slider.removeEventListener('touchstart', handleMouseDown)
      slider.removeEventListener('touchend', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseDown, handleMouseUp])

  return (
    <Container className='gap-8 pb-12 pt-16 sm:gap-16 sm:pb-20 lg:pt-28'>
      {/* Text content */}
      <div>
        <div className='relative z-10 flex flex-col items-center'>
          <h1 className='mt-4 max-w-5xl px-4 text-center text-2xl font-bold leading-tight text-violet-100 sm:mt-5 sm:text-5xl sm:leading-[1.125] md:text-6xl lg:text-[64px]'>
            Elevate Patient Trust and Dental Revenue with{' '}
            <span className='relative inline-block'>
              <span className='relative z-10 bg-gradient-to-b from-violet-400 via-violet-400 to-violet-500 bg-clip-text text-transparent'>
                BackupDoc
              </span>
              <span className='absolute -top-px left-0 -z-10 text-violet-300'>
                BackupDoc
              </span>
            </span>
          </h1>
          <p className='mt-4 max-w-xl px-4 text-center text-base leading-7 text-zinc-200 sm:mt-5 sm:text-lg sm:leading-8'>
            Empowering dentists to provide trustworthy care, enhance patient
            understanding, and increase retention through AI-supported
            diagnostics.
          </p>
          <div className='mt-6 flex flex-col items-center justify-center space-y-3 sm:mt-8 sm:flex-row sm:space-x-5 sm:space-y-0'>
            <Button id='top-cta' href='/signup'>
              Get started
            </Button>
            <Button
              variant='tertiary'
              onClick={() => setIsOpen(true)}
              className='overflow-hidden'
            >
              <span className='flex h-7 w-7 items-center justify-center rounded-full bg-white/[.07] transition duration-200 ease-in-out group-hover:bg-white/10'>
                <PlayCircleIcon className='h-5 w-5 text-violet-50' />
              </span>
              <span>Watch video</span>
            </Button>
          </div>
        </div>

        {/* Video modal*/}
        <Dialog
          className='fixed inset-0 z-50 h-full w-full overflow-hidden px-4 transition duration-150 ease-linear'
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          {/* Modal overlay */}
          <DialogBackdrop
            transition
            className='fixed inset-0 bg-black/30 backdrop-blur-sm transition duration-300 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in'
          />

          <div className='mx-auto flex min-h-screen w-auto items-center justify-center'>
            <DialogPanel
              transition
              className='relative max-h-full w-full max-w-5xl rounded-2xl bg-white/[.02] p-2 shadow-inner-blur transition duration-300 ease-out after:absolute after:inset-0 after:rounded-2xl after:border after:border-violet-200/[.04] data-[closed]:translate-y-40 data-[closed]:scale-75 data-[closed]:opacity-0'
            >
              <Button
                variant='secondary'
                size='md'
                className='absolute -top-12 right-2 z-50 flex p-2 lg:-top-14 lg:p-2.5'
                onClick={() => setIsOpen(false)}
              >
                <XMarkIcon className='h-4.5 w-4.5' />
              </Button>
              <div className='relative z-50 aspect-[16/9] rounded-lg'>
                <iframe
                  className='absolute h-full w-full rounded-lg'
                  allow='autoplay'
                  title='Video'
                  src='https://www.youtube.com/embed/_rgUQS04ztg'
                ></iframe>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </div>

      {/* Slide Comparison */}
      <div className='container mx-auto flex flex-col items-center justify-center space-y-6 px-4 py-6 sm:py-10 lg:flex-row lg:space-x-6 lg:space-y-0'>
        {/* Left side static image */}
        <div className='relative h-64 w-full max-w-2xl overflow-hidden rounded-lg shadow-lg sm:h-96 lg:w-3/4'>
          <Image
            src={hero}
            alt='hero'
            className='h-full w-full object-contain'
          />
        </div>

        {/* Right side comparison slider */}
        <div
          ref={sliderRef}
          className='relative h-64 w-full max-w-2xl cursor-col-resize overflow-hidden rounded-lg border border-gray-500 shadow-lg sm:h-96 lg:w-1/2'
        >
          {/* Main image */}
          <div className='relative h-full w-full'>
            <Image
              src={data}
              alt='compare'
              className='h-full w-full object-cover'
            />
          </div>

          {/* Overlay image with adjustable width */}
          <div
            ref={imgWrapperRef}
            className='transition-width absolute left-0 top-0 h-full overflow-hidden border-r-2 border-white duration-200'
            style={{ width: '50%' }}
          >
            <div className='relative h-full w-full'>
              <Image
                src={data2}
                alt='Compared image'
                className='h-full w-full object-cover'
              />
            </div>
          </div>

          {/* Labels */}
          <span className='absolute left-2 top-2 z-10 rounded bg-black bg-opacity-50 px-2 py-1 text-sm text-white sm:left-4'>
            Before
          </span>
          <span className='absolute right-2 top-2 z-10 rounded bg-red-600 px-2 py-1 text-sm text-white sm:right-4'>
            After
          </span>

          {/* Handle */}
          <div
            ref={handleRef}
            className='absolute left-1/2 top-0 z-20 flex -translate-x-1/2 transform cursor-col-resize flex-col items-center'
          >
            <div className='h-full w-1 bg-white'></div>
            <div className='flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-800'>
              <i className='fas fa-chevron-left text-white'></i>
              <i className='fas fa-chevron-right text-white'></i>
            </div>
            <div className='h-full w-1 bg-white'></div>
          </div>
        </div>
      </div>

      {/* Social proof */}
      <div className='relative mx-auto mt-12 max-w-5xl overflow-hidden sm:mt-24 sm:px-10 lg:mt-28'>
        <p className='text-center text-xs font-bold uppercase tracking-wide text-violet-50/80 sm:text-sm sm:font-extrabold sm:tracking-wider'>
          TRUSTED BY DENTAL CLINICS WORLDWIDE
        </p>

        {/* Logos */}
        <div className='relative mt-6 overflow-hidden rounded-xl sm:mt-8'>
          <div className='flex w-max animate-infiniteScroll items-center py-6'>
            {[...Array(2)].map((_, index) => (
              <div
                key={`homehero-clients-col-${index}`}
                className='flex w-1/2 items-center'
              >
                {CLIENTS.map((client) => (
                  <client.logo
                    key={`homehero-${client.name}-${index}`}
                    className='mx-3 h-28 w-28 scale-90 brightness-200 contrast-200 sm:mx-8 sm:h-40 sm:w-40 sm:scale-100'
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

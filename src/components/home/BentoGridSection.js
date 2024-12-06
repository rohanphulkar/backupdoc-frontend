'use client'

import Image from 'next/image'
import { Stats } from '@/components/home/Stats'
import { Container } from '@/components/shared/Container'
import { Button } from '@/components/shared/Button'
import { StarField } from '@/components/shared/StarField'
import { useEffect } from 'react'

import {
  GlobeAmericasIcon,
  ChatBubbleLeftRightIcon,
  CircleStackIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
} from '@heroicons/react/16/solid'

import globe from '@/images/globe.svg?url'
import globeGlow from '@/images/globe-glow.svg?url'
import binaryCodeBg from '@/images/binary-code-bg.svg?url'
import Binarytooth from '@/images/image-198.png'
import encryptionIcon from '@/images/encryption-icon.svg?url'

import spaceSpotlight from '@/images/space-spotlight-3.png'
import encryptionGradient from '@/images/encryption-gradient.png'
import teamIntegrations from '@/images/team-integrations.png'
import porch from '@/images/porch.jpg'

export const BentoGridSection = () => {
  const handleCardMouseMove = (event) => {
    const card = event.currentTargetbinarytooth
    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cards = document.querySelectorAll('.card')
      cards.forEach((card) => {
        card.addEventListener('mousemove', handleCardMouseMove)
      })

      return () => {
        cards.forEach((card) => {
          card.removeEventListener('mousemove', handleCardMouseMove)
        })
      }
    }
  }, [])

  return (
    <section className='relative overflow-hidden'>
      <Container className='py-16 sm:py-24'>
        {/* Text content */}
        <div className='relative z-10 flex flex-col items-center px-4 sm:px-0'>
          <h1 className='max-w-5xl text-center text-3xl font-bold leading-tight text-violet-100 sm:text-4xl md:text-5xl md:leading-extratight'>
            Simplify Your Workflow{' '}
            <span className='relative inline-block'>
              <span className='relative z-10 bg-gradient-to-b from-violet-400 via-violet-400 to-violet-500 bg-clip-text text-transparent'>
                with an extra layer of diagnostic support
              </span>
              <span className='absolute -top-px left-0 -z-10 text-violet-300'>
                with an extra layer of diagnostic support
              </span>
            </span>
          </h1>
          <p className='mt-4 max-w-xl text-center text-base leading-7 text-zinc-200 sm:mt-5 sm:text-lg sm:leading-8'>
            Highlight details that may be overlooked while empowering patients
            through visual clarity.
          </p>
        </div>

        {/* Bento grid container */}
        <div className='relative mx-auto mt-10 max-w-2xl sm:mt-16 lg:mt-[70px] lg:max-w-none'>
          <div className='absolute -left-56 -right-56 -top-80 sm:-left-48 sm:-right-48 md:left-1/2 md:w-full md:max-w-6xl md:-translate-x-1/2 lg:-top-96'>
            <Image
              src={spaceSpotlight}
              alt=''
              className='h-full w-full object-contain'
              sizes='(max-width: 768px) 100vw, 1152px'
            />
          </div>

          {/* Stars */}
          <div
            className='absolute -top-48 left-1/2 -z-10 h-56 w-full max-w-3xl -translate-x-1/2'
            aria-hidden='true'
          >
            <StarField density='medium' maxRadius={2.5} minRadius={1.25} />
          </div>

          {/* Bento grid */}
          <div className='cards space-y-4 px-4 sm:px-0 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0'>
            {/* Card 1 - full-width */}
            <div className="card relative col-span-2 overflow-hidden rounded-xl bg-violet-200/5 p-[1.5px] before:absolute before:left-0 before:top-0 before:z-30 before:h-full before:w-full before:rounded-xl before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] after:absolute after:left-0 after:top-0 after:z-10 after:h-full after:w-full after:rounded-xl after:opacity-0 after:transition-opacity after:duration-500 after:content-[''] hover:before:opacity-100 hover:after:opacity-100">
              <div className='relative z-30 w-full overflow-hidden rounded-xl bg-white/[0.01] shadow-inner-blur-no-border backdrop-blur-lg backdrop-brightness-50'>
                <div className='absolute inset-0 -z-10 opacity-60'>
                  <Image src={globeGlow} alt='' className='h-full w-full' />
                </div>
                <div className='grid h-full w-full grid-cols-1 rounded-xl lg:grid-cols-12 lg:gap-12 xl:grid-cols-2 xl:gap-20'>
                  {/* Card content */}
                  <div className='col-span-1 px-6 py-8 sm:px-8 lg:col-span-7 lg:py-12 lg:pr-0 xl:col-span-1 xl:py-16 xl:pl-12'>
                    <div>
                      <p className='text-sm font-bold text-violet-400'>
                        <span className='relative inline-block'>
                          <span className='relative z-10 bg-gradient-to-b from-violet-400 via-violet-400 to-violet-500 bg-clip-text leading-none text-transparent'>
                            Global Edge
                          </span>
                          <span className='absolute left-0 top-[-0.5px] -z-10 text-violet-300'>
                            Global Edge
                          </span>
                        </span>
                      </p>
                      <h3 className='mt-3 text-2xl font-bold text-violet-100 sm:mt-4 sm:text-3xl'>
                        AI-Assisted X-Ray Analysis
                      </h3>
                      <p className='mt-2 text-sm text-zinc-300 sm:mt-3 sm:text-base'>
                        BackupDoc's AI highlights areas of concern on X-rays,
                        helping you identify overlooked details to provide
                        thorough, trustworthy diagnoses and improve patient
                        outcomes.
                      </p>

                      {/* Features */}
                      <div className='mt-6 grid gap-4 sm:mt-7'>
                        <div className='flex items-center space-x-2'>
                          <GlobeAmericasIcon className='h-4 w-4 flex-shrink-0 text-violet-300/85' />
                          <p className='text-sm font-medium text-violet-100'>
                            Enhance your clinic's efficiency and patient flow
                            effortlessly
                          </p>
                        </div>
                      </div>

                      <div className='relative z-50 mt-6 sm:mt-8'>
                        <Button
                          href='#'
                          variant='secondary'
                          size='md'
                          className='relative z-50 cursor-pointer'
                        >
                          <span>Learn more</span>
                          <ChevronRightIcon className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Globe */}
                  <div className='relative col-span-1 h-48 sm:h-64 lg:col-span-5 lg:h-auto xl:col-span-1'>
                    <div className='absolute -left-14 bottom-0 right-0 -z-10 sm:-top-20 sm:left-[unset] lg:-left-64 lg:top-[unset]'>
                      <Image
                        src={`/1.svg`}
                        alt=''
                        width={100}
                        height={100}
                        className='ml-auto w-[55%] object-contain mix-blend-overlay'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="card relative col-span-1 overflow-hidden rounded-xl bg-violet-200/5 p-[1.5px] before:absolute before:left-0 before:top-0 before:z-30 before:h-full before:w-full before:rounded-xl before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] after:absolute after:left-0 after:top-0 after:z-10 after:h-full after:w-full after:rounded-xl after:opacity-0 after:transition-opacity after:duration-500 after:content-[''] hover:before:opacity-100 hover:after:opacity-100">
              <div className='relative z-30 h-full w-full overflow-hidden rounded-xl bg-white/[0.01] shadow-inner-blur-no-border backdrop-blur-lg backdrop-brightness-50'>
                <div className='absolute inset-0 -z-10'>
                  <Image
                    src={encryptionGradient}
                    alt=''
                    className='h-full w-full opacity-80'
                    sizes='(max-width: 420px) 100vw'
                  />
                </div>

                <div className='flex h-full w-full flex-col rounded-xl'>
                  {/* Card content */}
                  <div className='px-6 py-8 sm:px-8 sm:py-10 xl:px-12 xl:pt-16'>
                    <div>
                      <p className='text-sm font-bold text-violet-400'>
                        <span className='relative inline-block'>
                          <span className='relative z-10 bg-gradient-to-b from-violet-400 via-violet-400 to-violet-500 bg-clip-text leading-none text-transparent'>
                            Color-coded x-rays
                          </span>
                          <span className='absolute left-0 top-[-0.5px] -z-10 text-violet-300'>
                            Color-coded x-rays
                          </span>
                        </span>
                      </p>
                      <h3 className='mt-3 text-2xl font-bold text-violet-100 sm:mt-4 sm:text-3xl'>
                        Patient-Centric Visualization Tools
                      </h3>
                      <p className='mt-2 text-sm text-zinc-300 sm:mt-3 sm:text-base'>
                        Simplify complex diagnoses, giving patients a clear view
                        of their dental health.
                      </p>
                      <p className='mt-2 text-sm text-zinc-300 sm:mt-3 sm:text-base'>
                        Improves patient understanding, satisfaction, and trust
                        in their treatment plans.
                      </p>

                      <div className='relative z-10 mt-6 sm:mt-8'>
                        <Button
                          href='#'
                          variant='secondary'
                          size='md'
                          className='relative z-10 cursor-pointer'
                        >
                          <span>Learn more</span>
                          <ChevronRightIcon className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Graphic */}
                  <div className='flex flex-wrap justify-center gap-4 px-4 pb-8'>
                    <div className='relative h-40 w-40 sm:h-60 sm:w-60'>
                      <Image
                        src={`/4.svg`}
                        alt='First Image'
                        className='object-contain mix-blend-multiply'
                        layout='fill'
                        quality={100}
                      />
                    </div>
                    <div className='relative h-40 w-40 sm:h-60 sm:w-60'>
                      <Image
                        src={`/5.svg`}
                        alt='Second Image'
                        className='object-contain mix-blend-multiply'
                        layout='fill'
                        quality={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="card relative col-span-1 overflow-hidden rounded-xl bg-violet-200/5 p-[1.5px] before:absolute before:left-0 before:top-0 before:z-30 before:h-full before:w-full before:rounded-xl before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] after:absolute after:left-0 after:top-0 after:z-10 after:h-full after:w-full after:rounded-xl after:opacity-0 after:transition-opacity after:duration-500 after:content-[''] hover:before:opacity-100 hover:after:opacity-100">
              <div className='relative z-30 w-full overflow-hidden rounded-xl bg-white/[0.01] shadow-inner-blur-no-border backdrop-blur-lg backdrop-brightness-50'>
                <div className='absolute inset-0 top-0 -z-10'>
                  <Image
                    src={`/showcase.svg`}
                    alt=''
                    width={100}
                    height={100}
                    className='h-auto w-full'
                    sizes='(max-width: 420px) 100vw'
                  />
                </div>

                <div className='flex w-full flex-col rounded-xl'>
                  {/* Graphic */}
                  <div className='h-40 sm:h-56'></div>

                  {/* Card content */}
                  <div className='px-6 py-8 sm:px-8 sm:py-10 xl:px-12'>
                    <div>
                      <p className='text-sm font-bold text-violet-400'>
                        <span className='relative inline-block'>
                          <span className='relative z-10 bg-gradient-to-b from-violet-400 via-violet-400 to-violet-500 bg-clip-text leading-none text-transparent'>
                            Better Patient Engagement
                          </span>
                          <span className='absolute left-0 top-[-0.5px] -z-10 text-violet-300'>
                            Better Patient Engagement
                          </span>
                        </span>
                      </p>
                      <h3 className='mt-3 text-2xl font-bold text-violet-100 sm:mt-4 sm:text-3xl'>
                        Bone Measurements and Structural Support Analysis
                      </h3>
                      <p className='mt-2 text-sm text-zinc-300 sm:mt-3 sm:text-base'>
                        BackupDoc's AI highlights areas of concern on X-rays,
                        helping you identify overlooked details to provide
                        thorough, trustworthy care.
                        <br /> <br /> 
                        Detailed bone support indicators help patients comprehend 
                        treatment needs, fostering long-term engagement
                      </p>

                      <div className='relative z-10 mt-6 sm:mt-8'>
                        <Button
                          href='#'
                          variant='secondary'
                          size='md'
                          className='relative z-10 cursor-pointer'
                        >
                          <span>Learn more</span>
                          <ChevronRightIcon className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Stats />
      </Container>
    </section>
  )
}

import Image from 'next/image'
import { StarField } from '@/components/shared/StarField'
import { ContentPill } from '@/components/shared/ContentPill'
import { BuildingOffice2Icon } from '@heroicons/react/16/solid'

import spaceSpotlight from '@/images/space-spotlight.png'

import founder from '@/images/Founders.png'
import cosmicButterfly from '@/images/cosmic-butterfly-2.svg?url'

import { QuoteDownIcon, QuoteUpIcon } from 'hugeicons-react'

export function StoryWithValues() {
  return (
    <section
      id='about-story'
      className='relative overflow-hidden bg-[linear-gradient(rgba(24,24,27,0.95),rgba(24,24,27,0.95)),linear-gradient(#2E1065,#2E1065)] py-20 sm:py-24 lg:py-28 xl:py-40'
    >
      <div className='absolute left-0 top-0 w-full max-w-7xl -translate-x-1/2 -translate-y-1/2'>
        <Image
          src={spaceSpotlight}
          alt=''
          className='h-full w-full object-contain'
          sizes='(max-width: 1024px) 100vw, 1280px'
        />
      </div>

      {/* Stars */}
      <div className='absolute left-0 top-0 z-0 h-72 w-72' aria-hidden='true'>
        <StarField density='high' maxRadius={2.5} minRadius={1.25} />
      </div>
      <div className='mx-auto max-w-lg px-5 sm:max-w-2xl sm:px-6 lg:grid lg:max-w-screen-xl lg:grid-cols-12 lg:gap-14 lg:px-8 xl:gap-16 2xl:gap-20'>
        <div className='flex items-center lg:col-span-7'>
          <div className='relative z-10 flex flex-col'>
            <ContentPill Icon={BuildingOffice2Icon} text='Who we are' />
            <h2 className='mt-5 text-4xl font-bold leading-extratight text-violet-100 lg:text-[2.75rem] xl:leading-extratight'>
              Founder's Vision
            </h2>

            {/* Text content */}
            <div className='mt-6'>
              <p className='text-lg leading-8 text-zinc-300 lg:text-[17px] xl:text-lg xl:leading-8'>
                BackupDoc AI was founded by Sanjeet Shanker, a seasoned dentist
                with a passion for innovation in healthcare. After witnessing
                the limitations of traditional diagnostic methods, Dr. Shanker
                embarked on a journey to bring AI-driven technology into the
                dental field. His deep understanding of the challenges faced by
                dental professionals has shaped BackupDoc into a tool designed
                to simplify diagnostics, improve patient outcomes, and increase
                the efficiency of dental practices worldwide.
              </p>
            </div>

            {/* Team photo */}
            <div className='relative mt-12 h-96 w-full -rotate-2 rounded-2xl bg-white/[.01] shadow-inner-blur sm:mt-14'>
              <div className='h-full w-full rounded-2xl border border-violet-200/[.08] p-2'>
                <div className='absolute -bottom-48 -left-48 -right-16 -top-36'>
                  <Image
                    src={cosmicButterfly}
                    alt=''
                    className='h-full w-full object-fill'
                  />
                </div>

                <Image
                  src={founder}
                  alt='Two men chatting and smiling in a casual workspace'
                  className='relative h-full w-full rounded-lg object-cover'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='mt-16 flex flex-col justify-center space-y-16 sm:mt-20 lg:col-span-5 lg:mt-0'>
          <h2 className='mt-5 text-4xl font-bold leading-extratight text-violet-100 lg:text-[2.75rem] xl:leading-extratight'>
            Our Journey
          </h2>
          <p className='text-lg leading-8 text-zinc-300'>
            What started as an innovative solution for dental diagnostics has
            evolved into a comprehensive platform that is defining the future of
            dental care. Our continuous growth and development are driven by a
            singular mission: to deliver state-of-the-art AI-powered solutions
            that empower dental professionals. From advanced diagnostics to
            streamlined patient management, BackupDoc stands as your trusted
            partner in elevating the standard of dental practice.
          </p>
          {/* New paragraph content */}
          <div className='mt-6 text-justify text-sm leading-relaxed text-white'>
            <blockquote className='relative border-l-4 border-violet-300 pl-4 italic'>
              <QuoteUpIcon size={20} className='text-white' />
              As a practicing dentist, I once received negative feedback from a
              patient regarding what I believed was a thorough diagnosis. Upon
              investigation, it became clear that conflicting opinions from
              another dentist had created uncertainty and distrust. This
              experience inspired me to develop an objective, transparent system
              that could enhance confidence in dental diagnostics. BackupDoc
              emerged from this vision, offering reliable AI-powered second
              opinions that build trust between dental professionals and their
              patients throughout the diagnostic process.
              <QuoteDownIcon size={20} className='text-white' />
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}

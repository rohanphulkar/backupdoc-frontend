import Image from 'next/image'
import { Container } from '@/components/shared/Container'
import { StarField } from '@/components/shared/StarField'
import {
  UsersIcon,
  CursorArrowRippleIcon,
  ShieldCheckIcon,
  PresentationChartLineIcon,
} from '@heroicons/react/24/solid'

import graphic from '@/images/features-graphic.png'
import cosmicButterfly from '@/images/cosmic-butterfly.png'
import spaceSpotlight from '@/images/space-spotlight.png'

const features = [
  {
    icon: UsersIcon,
    title: 'Boost Your Revenue, Increase Patient Follow-Ups',
    description:
      'Discover how BackupDoc can help convert consultations into long-term patient relationships.',
  },
  {
    icon: CursorArrowRippleIcon,
    title: 'See the Impact on Your Bottom Line',
    description:
      'Experience higher patient trust and appointment conversions with AI-driven diagnostics.',
  },
  {
    icon: PresentationChartLineIcon,
    title: 'Strengthen Patient Relationships',
    description:
      "BackupDoc's AI-backed insights help patients understand their care, leading to more follow-ups and greater loyalty.",
  },
  {
    icon: ShieldCheckIcon,
    title: 'Build Trust Through Visual Diagnostics',
    description:
      "With BackupDoc's visual tools, enhance patient understanding, trust, and commitment to treatment plans.",
  },
]

export function Features() {
  return (
    <section className='relative overflow-hidden'>
      <Container className='pb-12 pt-16 sm:pb-20 sm:pt-24 lg:pb-24'>
        {/* Text content */}
        <div className='relative flex flex-col items-center px-4 sm:px-0'>
          <h1 className='max-w-4xl text-center text-3xl font-bold leading-tight text-violet-100 sm:text-4xl md:text-5xl md:leading-extratight'>
            Increase revenue and appointment conversions with BackupDoc AI
            <span className='relative ml-2 inline-block'>
              <span className='relative z-10 bg-gradient-to-b from-violet-400 via-violet-400 to-violet-500 bg-clip-text text-transparent'>
                Effortlessly
              </span>
              <span className='absolute -top-px left-0 -z-10 text-violet-300'>
                Effortlessly
              </span>
            </span>
          </h1>
          <p className='mt-4 max-w-xl text-center text-base leading-7 text-zinc-200 sm:mt-5 sm:text-lg sm:leading-8'>
            Join the network of dentists seeing increased revenue and improved
            patient retention with BackupDoc.
          </p>
        </div>

        {/* Graphic */}
        <div className='relative mt-8 w-full rounded-xl border border-violet-200/[.08] bg-white/[.01] p-1 shadow-inner-blur sm:mt-16 sm:rounded-2xl sm:p-2 lg:mt-18'>
          <div className='absolute -left-56 -right-56 -top-80 -z-10 sm:-left-48 sm:-right-48 md:left-1/2 md:w-full md:max-w-6xl md:-translate-x-1/2 lg:-top-96'>
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
            <StarField density='medium' maxRadius={2.25} />
          </div>
          <div className='absolute -bottom-96 -left-96 -right-96 top-0 -z-10'>
            <Image
              src={cosmicButterfly}
              alt=''
              className='h-full w-full object-contain opacity-10'
              sizes='(max-width: 1024px) 100vw, 1024px'
            />
          </div>

          <Image
            src={graphic}
            alt='Collaboration interface with user profile images'
            className='relative h-auto w-full rounded-lg'
            sizes='(max-width: 1024px) 100vw'
          />
        </div>

        {/* Features */}
        <div className='relative mx-auto mt-8 grid max-w-lg gap-6 px-4 sm:mt-16 sm:max-w-2xl sm:grid-cols-2 sm:gap-8 sm:px-0 md:mt-18 lg:mx-0 lg:max-w-none'>
          {features.map((feature, index) => (
            <div
              key={`feature-${index}`}
              className='flex items-start space-x-3'
            >
              <feature.icon className='mt-1 h-5 w-5 shrink-0 text-violet-400 sm:h-[21px] sm:w-[21px]' />
              <div className='flex-1'>
                <h3 className='text-base font-semibold text-white sm:text-lg'>
                  {feature.title}
                </h3>
                <p className='mt-1 text-sm leading-6 text-zinc-300 sm:text-base sm:leading-7'>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

import Image from 'next/image'
import { Container } from '@/components/shared/Container'
import { StarField } from '@/components/shared/StarField'
import { ContentPill } from '@/components/shared/ContentPill'
import { cn } from '@/lib/utils'

import cosmicButterfly from '@/images/cosmic-butterfly.png'
import spaceSpotlight from '@/images/space-spotlight.png'
import photo01 from '@/images/step1.png'
import photo02 from '@/images/step2.png'
import photo03 from '@/images/step3.png'
import photo04 from '@/images/step4.png'
import photo05 from '@/images/step5.png'
// import photo06 from '@/images/employee-insta-photo-06.jpeg'
// import photo07 from '@/images/employee-insta-photo-07.jpeg'
// import photo08 from '@/images/employee-insta-photo-08.jpeg'

import globePin from '@/icons/nucleo/globe-pin-32-colored.svg'
import heartbeat from '@/icons/nucleo/heartbeat-32-colored.svg'
import bulb from '@/icons/nucleo/bulb-32-colored.svg'
import palmTree from '@/icons/nucleo/palm-tree-32-colored.svg'
import computerGear from '@/icons/nucleo/computer-gear-32-colored.svg'
import mountain from '@/icons/nucleo/mountain-32-colored.svg'
import babyStroller from '@/icons/nucleo/baby-stroller-32-colored.svg'

import usaFlag from '@/icons/nucleo/flags/usa.svg'
import portugalFlag from '@/icons/nucleo/flags/portugal.svg'
import turkeyFlag from '@/icons/nucleo/flags/turkey.svg'
import australiaFlag from '@/icons/nucleo/flags/australia.svg'
import greeceFlag from '@/icons/nucleo/flags/greece.svg'
import newZealandFlag from '@/icons/nucleo/flags/new-zealand.svg'

const careerBenefits = [
  {
    title: 'Sigup For an account',
    icon: globePin,
    description: [
      'Visit BackupDoc website and click on Sign Up',
      'Fill in your personal detail and clinic information to create your account',
      'Verify your email and complete the registration process',
    ],
    borderClassName:
      'after:inset-x-0 after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r after:from-violet-200/[0.025] md:after:from-transparent after:to-violet-200/[0.075] md:after:to-violet-200/[0.125]',
  },
  {
    title: 'Upload Your First Radiograph',
    icon: heartbeat,
    description: [
      'Once logged in, navigate to Creaate Patient List and Upload Radiographsection.',
      'Click on the upload button or drag and drop your dental radiograph into the system.',
      'Ensure the image is clear and high-resolution for the most accurate analysis.',
    ],
    borderClassName:
      'after:inset-x-0 after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r after:from-violet-200/[0.075] after:to-violet-200/[0.15] lg:after:to-violet-200/[0.25] md:after:via-violet-200/[0.25] md:after:to-violet-200/[0.125] lg:after:via-violet-200/[0.1875] before:content-[""] before:hidden sm:before:block before:absolute before:left-0 before:h-full before:w-px before:bg-gradient-to-b before:from-violet-200/[.01] before:to-violet-200/[0.075] md:before:to-violet-200/[0.125]',
  },
  {
    title: 'AI Analysis in Seconds',
    icon: bulb,
    description: [
      'After uploading, BackupDoc’s AI will instantly analyze the radiograph.',
      'Within seconds, you will receive a detailed diagnostic reporthighlighting potential issues such as caries, bone loss, or otherpathologies',
    ],
    borderClassName:
      'after:inset-x-0 after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r lg:after:from-violet-200/[0.25] lg:after:to-violet-200/[0.125] after:from-violet-200/[0.15] after:to-violet-200/[0.075] md:after:from-violet-200/[0.125] md:after:to-transparent before:md:block before:hidden before:content-[""] before:absolute before:left-0 before:h-full before:w-px before:bg-gradient-to-b before:from-violet-200/[.015] lg:before:to-violet-200/[0.25] before:to-violet-200/[0.125]',
  },
  {
    title: 'Review and Build Patient Trust',
    icon: palmTree,
    description: [
      'After uploading, BackupDoc’s AI will instantly analyze the radiograph.',
      'Within seconds, you will receive a detailed diagnostic reporthighlighting potential issues such as caries, bone loss, or otherpathologies',
    ],
    borderClassName:
      'md:hidden before:hidden before:sm:block lg:block after:inset-x-0 after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r after:from-violet-200/[0.075] after:to-violet-200/[0.025] lg:after:from-violet-200/[0.125] lg:after:to-transparent before:content-[""] before:absolute before:left-0 before:h-full before:w-px before:bg-gradient-to-b md:before:from-violet-200/[.01] md:before:to-violet-200/[0.125] before:from-violet-200/[0.075] before:to-violet-200/[0.025]',
  },
  {
    title: 'Gear Allowance',
    icon: computerGear,
    description: 'We’ll send you the latest technology wherever.',
    borderClassName:
      'after:hidden md:after:block after:content-[""] after:absolute after:w-1.5 after:h-1.5 after:bg-violet-200 after:top-[-3.5px] after:left-1/2 after:translate-x-[-2.5px] after:rounded-full before:content-[""] before:absolute before:sm:hidden before:inset-x-0 before:bottom-0 before:h-px before:w-full before:bg-gradient-to-r before:from-violet-200/[0.025] before:to-violet-200/[0.075]',
  },
]

const employeeInstaPhotos = [
  {
    image: photo01,
    alt: 'Two friends taking a selfie at a restaurant',
    username: '@sara_and_jane',
    caption: 'Besties night out! 🥂',
    flag: usaFlag,
    location: 'Step 1',
  },
  {
    image: photo02,
    alt: 'Dinner party with friends',
    username: '@VeronicaReardon',
    caption: 'Lisbon crew enjoying a nice dinner together!',
    flag: portugalFlag,
    location: 'Step 2',
  },
  {
    image: photo03,
    alt: 'Man working on laptop in a cafe',
    username: '@dev_daniel',
    caption: 'Remote work with a perfect cup of coffee ☕',
    flag: usaFlag,
    location: 'Step 3',
  },
  {
    image: photo04,
    alt: 'Three friends jumping with hot air balloons in the background',
    username: '@adventure_girls',
    caption: 'Ballooning adventures! 🎈',
    flag: turkeyFlag,
    location: 'Step 4',
  },
  {
    image: photo05,
    alt: 'Woman working at home with a dog by her side',
    username: '@urban_nature',
    caption: 'Work from home vibes 🌿',
    flag: usaFlag,
    location: 'Step 5',
  },
]

export function WorkCulture() {
  return (
    <section className='relative overflow-hidden pb-16 pt-20 sm:pb-20 sm:pt-24'>
      <Container>
        {/* Text content */}
        <div className='relative flex flex-col items-center'>
          <h1 className='max-w-4xl text-center text-4xl font-bold leading-extratight text-violet-100 sm:text-5xl sm:leading-extratight'>
            Getting Started with BackupDoc in &nbsp;
            <span className='relative inline-block text-nowrap'>
              <span className='relative z-10 bg-gradient-to-b from-violet-400 via-violet-400 to-violet-500 bg-clip-text text-transparent'>
                5 Easy Steps
              </span>
              <span className='absolute -top-px left-0 -z-10 text-violet-300'>
                5 Easy Steps
              </span>
            </span>
            {/* &nbsp;with Nebula */}
          </h1>
          {/* <p className='mt-5 max-w-xl text-center text-lg leading-8 text-zinc-200'>
            Embark on a professional journey with Nebula where remote working
            isn&apos;t just an option—it&apos;s our culture.
          </p> */}
        </div>

        {/* Benefits */}
        <div className='relative mt-12 sm:mt-18'>
          <div className='absolute -left-56 -right-56 -top-80 sm:-left-64 sm:-right-64 lg:top-[-500px]'>
            <Image
              src={spaceSpotlight}
              alt=''
              className='-z-10 h-full w-full object-cover opacity-45'
              sizes='(max-width: 768px) 100vw, 1152px'
            />
          </div>
          <div className='relative mt-8 flex flex-wrap items-stretch justify-center'>
            {careerBenefits.map((benefit, index) => (
              <div
                key={`benefit-${index}`}
                className={cn(
                  "group relative w-full bg-gradient-to-b after:absolute after:content-[''] sm:w-1/2 md:w-1/3 lg:w-1/4",
                  benefit.borderClassName
                )}
              >
                <div className='relative h-full w-full overflow-hidden'>
                  <div className='relative z-10 flex h-full w-full flex-1 flex-col justify-center px-4 py-5 sm:px-5 sm:py-6 lg:py-7 xl:p-8'>
                    <h4 className='mt-5 text-base font-bold text-violet-50 xl:mt-6 xl:text-lg'>
                      {index + 1}. {benefit.title}
                    </h4>
                    <ul className='mt-1 list-disc pl-5'>
                      {(Array.isArray(benefit.description)
                        ? benefit.description
                        : benefit.description.split('. ')
                      ).map((point, i) => (
                        <li
                          key={i}
                          className='text-base text-zinc-300 xl:text-lg'
                        >
                          {point.trim()}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Images */}
      <div className='mx-2.5 mt-14 flex sm:mt-16 lg:mt-20'>
        <div className='mx-2.5 flex w-full animate-infiniteScroll items-center justify-center [--_infinite-scroll-duration:80s]'>
          {[...Array(2)].map((_, i) => (
            <div
              key={`employee-photos-${i}`}
              className='flex w-full justify-around' // Ensure full width for better responsiveness
            >
              {employeeInstaPhotos.map((photo, j) => (
                <div
                  key={`employee-photos-${i}-${j}`}
                  className='relative h-80 w-60 flex-shrink-0 rounded-2xl border border-violet-200/[.08] bg-white/[.01] p-2 shadow-inner-blur sm:w-64 md:w-72 lg:w-80 xl:w-96' // Set a fixed height
                >
                  <div className='absolute inset-0 overflow-hidden rounded-2xl'>
                    {' '}
                    {/* Added overflow-hidden to prevent overflow */}
                    <Image
                      src={cosmicButterfly}
                      alt=''
                      className='h-full w-full -rotate-6 object-cover opacity-25'
                    />
                  </div>

                  <Image
                    src={photo.image}
                    alt=''
                    className='relative h-full w-full rounded-lg object-cover' // Ensure the image covers the container
                  />

                  <ContentPill
                    className='absolute right-4 top-4 bg-zinc-950/70'
                    innerClassName='px-3.5'
                    iconClassName='h-3 w-3'
                    textClassName='text-xs leading-none'
                    // Icon={photo.flag}
                    text={photo.location}
                  />

                  {/* <div className='absolute inset-x-2 bottom-2 rounded-b-lg bg-gradient-to-b from-violet-950/10 via-violet-950/40 to-violet-950/55'>
                    <div className='px-4 py-8 md:px-5 lg:px-6 xl:px-8'>
                      <p className='text-lg font-bold text-white md:text-xl lg:text-2xl'>
                        {photo.username}
                      </p>
                      <p className='mt-1.5 text-base text-zinc-100 md:text-[17px] lg:text-lg'>
                        {photo.caption}
                      </p>
                    </div>
                  </div> */}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

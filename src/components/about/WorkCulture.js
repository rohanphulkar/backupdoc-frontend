'use client'

import Image from 'next/image'
import { Container } from '@/components/shared/Container'
import { cn } from '@/lib/utils'

import spaceSpotlight from '@/images/space-spotlight.png'

import globePin from '@/icons/nucleo/globe-pin-32-colored.svg'
import heartbeat from '@/icons/nucleo/heartbeat-32-colored.svg?url'
import bulb from '@/icons/nucleo/bulb-32-colored.svg?url'
import palmTree from '@/icons/nucleo/palm-tree-32-colored.svg?url'
import computerGear from '@/icons/nucleo/computer-gear-32-colored.svg?url'
import {
  AnalysisTextLinkIcon,
  ChartBubble01Icon,
  ChartBubble02Icon,
  CustomerService01Icon,
  Image01Icon,
  UserAdd01Icon,
} from 'hugeicons-react'

const stepsToUse = [
  {
    title: 'Create Your Account',
    icon: <UserAdd01Icon className='h-8 w-8 text-white' />,
    description: [
      'Navigate to BackupDoc.com and click the "Sign Up" button in the top right',
      'Enter your professional credentials and dental practice information',
      'Complete email verification and set up two-factor authentication for enhanced security',
      'Customize your profile with your specialties and practice details',
    ],
    borderClassName:
      'after:inset-x-0 after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r after:from-violet-200/[0.025] md:after:from-transparent after:to-violet-200/[0.075] md:after:to-violet-200/[0.125]',
  },
  {
    title: 'Patient Records & Imaging',
    icon: <Image01Icon className='h-8 w-8 text-white' />,
    description: [
      'Access the intuitive dashboard and select "New Patient Record"',
      'Input patient information or import existing records securely',
      'Use our advanced image uploader to add high-resolution dental radiographs',
      'Supported formats include DICOM, JPG, PNG with automatic image enhancement',
    ],
    borderClassName:
      'after:inset-x-0 after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r after:from-violet-200/[0.075] after:to-violet-200/[0.15] lg:after:to-violet-200/[0.25] md:after:via-violet-200/[0.25] md:after:to-violet-200/[0.125] lg:after:via-violet-200/[0.1875] before:content-[""] before:hidden sm:before:block before:absolute before:left-0 before:h-full before:w-px before:bg-gradient-to-b before:from-violet-200/[.01] before:to-violet-200/[0.075] md:before:to-violet-200/[0.125]',
  },
  {
    title: 'Advanced AI Analysis',
    icon: <AnalysisTextLinkIcon className='h-8 w-8 text-white' />,
    description: [
      'Our state-of-the-art AI processes images in under 30 seconds',
      'Receive comprehensive reports highlighting dental conditions with 98% accuracy',
      'AI detection covers caries, periapical lesions, bone loss, and more',
      'View detailed annotations and measurements on interactive overlays',
    ],
    borderClassName:
      'after:inset-x-0 after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r lg:after:from-violet-200/[0.25] lg:after:to-violet-200/[0.125] after:from-violet-200/[0.15] after:to-violet-200/[0.075] md:after:from-violet-200/[0.125] md:after:to-transparent before:md:block before:hidden before:content-[""] before:absolute before:left-0 before:h-full before:w-px before:bg-gradient-to-b before:from-violet-200/[.015] lg:before:to-violet-200/[0.25] before:to-violet-200/[0.125]',
  },
  {
    title: 'Patient Communication',
    icon: <ChartBubble02Icon className='h-8 w-8 text-white' />,
    description: [
      'Generate patient-friendly reports with visual explanations',
      'Use our interactive 3D models to explain findings clearly',
      'Share secure digital reports via email or patient portal',
      'Track treatment progress with comparative analysis tools',
    ],
    borderClassName:
      'md:hidden before:hidden before:sm:block lg:block after:inset-x-0 after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r after:from-violet-200/[0.075] after:to-violet-200/[0.025] lg:after:from-violet-200/[0.125] lg:after:to-transparent before:content-[""] before:absolute before:left-0 before:h-full before:w-px before:bg-gradient-to-b md:before:from-violet-200/[.01] md:before:to-violet-200/[0.125] before:from-violet-200/[0.075] before:to-violet-200/[0.025]',
  },
  {
    title: 'Premium Support',
    icon: <CustomerService01Icon className='h-8 w-8 text-white' />,
    description: [
      'Access 24/7 technical support via chat, email, or phone',
      'Regular software updates with new AI capabilities',
      'Personalized training sessions for your entire dental team',
      'Priority hardware support and replacement services',
    ],
    borderClassName:
      'after:hidden md:after:block after:content-[""] after:absolute after:w-1.5 after:h-1.5 after:bg-violet-200 after:top-[-3.5px] after:left-1/2 after:translate-x-[-2.5px] after:rounded-full before:content-[""] before:absolute before:sm:hidden before:inset-x-0 before:bottom-0 before:h-px before:w-full before:bg-gradient-to-r before:from-violet-200/[0.025] before:to-violet-200/[0.075]',
  },
]

export function WorkCulture() {
  return (
    <section className='relative overflow-hidden pb-16 pt-20 sm:pb-20 sm:pt-24'>
      <Container>
        <div className='relative flex flex-col items-center'>
          <h1 className='max-w-4xl text-center text-4xl font-bold leading-extratight text-violet-100 sm:text-5xl sm:leading-extratight'>
            Getting Started with BackupDoc in{' '}
            <span className='relative inline-block text-nowrap'>
              <span className='relative z-10 bg-gradient-to-b from-violet-400 via-violet-400 to-violet-500 bg-clip-text text-transparent'>
                5 Easy Steps
              </span>
              <span className='absolute -top-px left-0 -z-10 text-violet-300'>
                5 Easy Steps
              </span>
            </span>
          </h1>
        </div>

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
            {stepsToUse.map((step, index) => (
              <div
                key={`step-${index}`}
                className={cn(
                  "group relative w-full bg-gradient-to-b after:absolute after:content-[''] sm:w-1/2 md:w-1/3 lg:w-1/4",
                  step.borderClassName
                )}
              >
                <div className='relative h-full w-full overflow-hidden p-6 transition-all duration-300 hover:bg-violet-900/10'>
                  <div className='relative z-10 flex h-full w-full flex-1 flex-col justify-center'>
                    <div className='mb-4 flex items-center'>
                      {step.icon}
                      <span className='ml-3 text-violet-400'>
                        Step {index + 1}
                      </span>
                    </div>

                    <h4 className='mb-4 text-xl font-bold text-violet-50'>
                      {step.title}
                    </h4>

                    <ul className='space-y-2'>
                      {step.description.map((point, i) => (
                        <li
                          key={i}
                          className='flex items-start text-base text-zinc-300'
                        >
                          <span className='mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-400' />
                          {point}
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
    </section>
  )
}

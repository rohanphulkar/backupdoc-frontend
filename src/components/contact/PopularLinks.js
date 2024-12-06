import Image from 'next/image'
import { StarField } from '@/components/shared/StarField'
import { Container } from '@/components/shared/Container'
import { ContentPill } from '@/components/shared/ContentPill'
import { cn } from '@/lib/utils'

import spaceSpotlight from '@/images/space-spotlight.png'
import cosmicButterfly from '@/images/cosmic-butterfly.png'

import YoutubeIcon from '@/icons/nucleo/youtube-48.svg'
import LinkedinIcon from '@/icons/nucleo/linkedin.svg'
import LinkIcon from '@/icons/nucleo/link-16.svg'
import ArrowTopRightIcon from '@/icons/nucleo/arrow-top-right-16.svg'

const links = [
  {
    title: 'Watch AI in Action',
    description:
      'See how BackupDoc AI analyzes dental X-rays in real-time. Watch case studies, tutorials and success stories from dental professionals.',
    descriptionMobile: 'Watch AI dental X-ray analysis demos and tutorials.',
    url: 'https://www.youtube.com/@BackupDoc-AI',
    icon: YoutubeIcon,
    label: 'Watch demos',
    borderClassName:
      'sm:after:block after:content-[""] sm:after:w-1.5 sm:after:h-1.5 sm:after:bg-violet-200 sm:after:top-[-3.5px] sm:after:left-1/2 sm:after:translate-x-[-2.5px] sm:after:rounded-full after:inset-x-0 after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r after:from-violet-200/[0.075] after:to-violet-200/[0.025]',
  },
  {
    title: 'Connect with Dental Professionals',
    description:
      'Join our community of dentists and radiologists. Stay updated on AI advances in dental diagnostics and connect with industry experts.',
    descriptionMobile: 'Join our dental professional network.',
    url: 'https://www.linkedin.com/company/backupdoc-ai/',
    icon: LinkedinIcon,
    label: 'Join our network',
    borderClassName:
      'sm:before:content-[""] sm:before:absolute sm:before:left-0 sm:before:h-full sm:before:w-px sm:before:bg-gradient-to-b sm:before:from-violet-200/[.25] sm:before:to-violet-200/[0.01] after:content-[""] after:hidden sm:after:block after:absolute after:w-1.5 after:h-1.5 after:bg-violet-200 after:top-[-3.5px] after:left-1/2 after:translate-x-[-2.5px] after:rounded-full',
  },
]

export function PopularLinks() {
  return (
    <section className='relative overflow-x-clip'>
      <div className='absolute -left-56 -right-56 -top-80 sm:-left-48 sm:-right-48 md:left-1/2 md:w-full md:max-w-6xl md:-translate-x-1/2 lg:-top-32'>
        <Image
          src={spaceSpotlight}
          alt=''
          className='h-full w-full object-contain opacity-25'
          sizes='(max-width: 768px) 100vw, 1152px'
        />
      </div>

      <Container className='relative max-w-lg gap-16 pb-16 pt-20 sm:max-w-screen-xl sm:pb-20 sm:pt-24 lg:pb-24'>
        <div className='absolute -left-96 -right-96 -top-48 bottom-0 -z-10'>
          <Image
            src={cosmicButterfly}
            alt=''
            className='h-[calc(100%_+_336px)] w-[calc(100%_+_768px)] opacity-10'
            sizes='(max-width: 1024px) 100vw, 1024px'
          />
        </div>

        {/* Text content */}
        <div className='flex flex-col items-center'>
          <ContentPill
            Icon={LinkIcon}
            text='Resources & Community'
            iconClassName='h-3.5 w-3.5'
          />

          <h1 className='mt-5 max-w-5xl text-center text-4xl font-bold leading-extratight text-violet-100 sm:mt-6 sm:text-5xl sm:leading-extratight'>
            Learn More About AI-Powered Dental Diagnostics
          </h1>
          <p className='mt-5 max-w-2xl text-center text-[17px] leading-8 text-zinc-200 sm:text-lg sm:leading-8'>
            Discover how BackupDoc AI is revolutionizing dental X-ray analysis. Join our community of dental professionals and explore resources to enhance your practice with AI technology.
          </p>
        </div>

        {/* Popular links */}
        <div className='relative mt-8 flex flex-wrap items-stretch justify-center'>
          {links.map((link) => (
            <div
              key={`popular-links-${link.title}`}
              className={cn(
                "group relative w-full bg-gradient-to-b after:absolute after:content-[''] sm:w-1/3",
                link.borderClassName
              )}
            >
              <div className='relative h-full w-full overflow-hidden'>
                <div
                  className='absolute bottom-1/3 left-1/3 right-0 top-0 opacity-0 duration-300 ease-in-out group-hover:opacity-100'
                  aria-hidden='true'
                >
                  <StarField density='high' maxRadius={1.75} minRadius={1} />
                </div>
                <div className='absolute inset-0 -z-10 bg-gradient-to-b from-[#575EFF]/10 to-[#E478FF]/10 opacity-0 blur-4xl duration-300 ease-in-out group-hover:opacity-100' />
                <div className='relative z-10 flex h-full w-full flex-1 flex-col justify-between px-4 py-5 sm:px-5 sm:py-6 lg:py-7 xl:p-8'>
                  <div className='flex-1'>
                    <link.icon className='h-6 w-6 text-violet-50 sm:h-7 sm:w-7 xl:h-8 xl:w-8' />

                    <h4 className='mt-5 text-base font-semibold text-violet-50 xl:mt-6 xl:text-lg'>
                      {link.title}
                    </h4>
                    <p className='mt-2.5 line-clamp-3 text-base text-zinc-300 xl:text-lg'>
                      <span className='sm:hidden'>
                        {link.descriptionMobile}
                      </span>
                      <span className='hidden sm:inline'>
                        {link.description}
                      </span>
                    </p>
                  </div>
                  <div className='mt-4 xl:mt-5'>
                    <a
                      href={link.url}
                      className='flex items-center text-sm font-medium text-violet-300/70 duration-200 ease-in-out group-hover:text-violet-300 xl:text-base'
                    >
                      <span className='absolute inset-0' />
                      {link.label}
                      <ArrowTopRightIcon className='ml-2.5 h-2.5 w-2.5 xl:h-3 xl:w-3' />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

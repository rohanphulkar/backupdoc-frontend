import Image from 'next/image'
import clsx from 'clsx'
import { Container } from '@/components/shared/Container'

import avatar1 from '@/images/avatars/avatar-1.png'
import avatar2 from '@/images/avatars/avatar-2.png'
import avatar3 from '@/images/avatars/avatar-3.png'
import avatar4 from '@/images/avatars/avatar-4.png'
import avatar5 from '@/images/avatars/avatar-5.png'
import avatar6 from '@/images/avatars/avatar-6.png'
import avatar7 from '@/images/avatars/avatar-7.png'
import avatar8 from '@/images/avatars/avatar-8.png'
import avatar9 from '@/images/avatars/avatar-9.png'
import avatar10 from '@/images/avatars/avatar-10.png'
import avatar11 from '@/images/avatars/avatar-11.png'
import avatar12 from '@/images/avatars/avatar-12.png'
import spaceSpotlight from '@/images/space-spotlight.png'

const testimonials = [
  [
    {
      avatar: avatar1,
      name: 'Instant Second Opinions',
      title: 'Marketer at Trendsetters',
      quote:
        'Get real-time, AI-based second opinions on complex cases, improving confidence in your decisions.',
    },
    {
      avatar: avatar2,
      name: 'Patient Education Gap',
      title: 'Co-founder of Infinituma',
      quote:
        'Patients struggle to understand dental issues and struggle to trust traditional radiographs.',
    },
    {
      avatar: avatar3,
      name: 'Efficiency & Revenue',
      title: 'Engineer at DevTech',
      quote:
        'BackupDoc integrates effortlessly with your existing X-ray systems, automating diagnostics and boosting efficiency.',
    },
    {
      avatar: avatar4,
      name: 'AI-Powered Diagnostics',
      title: 'Developer at Tinker',
      quote:
        'BackupDoc.ai analyzes dental radiographs, highlighting areas needing attention..',
    },
  ],

  [
    {
      avatar: avatar5,
      name: 'Visual Education Tool',
      title: 'UI Designer at Creatify',
      quote:
        'Converts technical radiograph data into OBJECTIVE & easy-to-understand visuals for patients.',
    },
    {
      avatar: avatar6,
      name: 'Seamless Integration',
      title: 'Creative Director at VisualVibe',
      quote:
        'Enables dentists to identify and communicate potential issues more effectively, leading to better patient care and increased treatment acceptance!',
    },
    {
      avatar: avatar7,
      name: 'Isabella Martinez',
      title: 'Founder of ClientConnect',
      quote:
        "Moving to Nebula has been a breeze. Our clients love the platform. It's been a huge win for customer satisfaction.",
    },
    {
      avatar: avatar8,
      name: 'Jackson Patel',
      title: 'Co-founder of Infinituma',
      quote:
        'This solution has been a game-changer for our project timelines and delivery. Couldn’t be more satisfied.',
    },
  ],

  [
    {
      avatar: avatar9,
      name: 'Mia Zhang',
      title: 'Data Analyst at InfoInsight',
      quote:
        "Analyzing data is now easier than ever. I'm impressed with the customizability and all of the integrations!",
    },
    {
      avatar: avatar10,
      name: 'Rachel Green',
      title: 'Marketing Director at FreshLook',
      quote:
        'Our marketing campaigns have become significantly more effective and easier to manage than ever.',
    },
    {
      avatar: avatar11,
      name: 'Liam Smith',
      title: 'Operations Lead at EfficientOps',
      quote:
        "It's transformed our daily operations with its brilliant automation features. Wish I had been using them earlier.",
    },
    {
      avatar: avatar12,
      name: 'Emily Parker',
      title: 'CEO at GreenTech',
      quote:
        'Our operational efficiency has soared beyond expectations with this transformative tool.',
    },
  ],
]

export function Testimonials() {
  return (
    <section className='relative overflow-hidden py-20 sm:py-24'>
      <Container>
        {/* Text content */}
        <div className='relative flex flex-col items-center'>
          <h1 className='max-w-5xl text-center text-4xl font-bold leading-extratight text-violet-100 sm:text-5xl sm:leading-extratight'>
            <span className='relative inline-block text-nowrap'>
              <span className='relative z-10 bg-gradient-to-b from-violet-400 via-violet-400 to-violet-500 bg-clip-text text-transparent'>
                Sucessfully
              </span>
              <span className='absolute -top-px left-0 -z-10 text-violet-300'>
                Sucessfully
              </span>
            </span>
            &nbsp; provided second opinions to 2000+ clients
          </h1>
          <p className='mt-5 max-w-xl text-center text-lg leading-8 text-zinc-200'>
            Don't leave your dental health to chance. BackupDoc.ai uses advanced
            AI technology to review your X-rays and provide a second opinion.
            Ensure you get the best care possible without any doubts.
          </p>
        </div>
      </Container>

      {/* Testimonials */}
      <div className='relative mt-14 space-y-7 sm:mt-16'>
        <div className='absolute -left-96 -right-96 -top-80 -z-10 sm:-left-96 sm:-right-96 md:left-1/2 md:w-full md:max-w-7xl md:-translate-x-1/2 lg:-top-96'>
          <Image
            src={spaceSpotlight}
            alt=''
            className='h-full w-full object-contain opacity-70'
            sizes='(max-width: 768px) 100vw, 1152px'
          />
        </div>

        <div className='absolute -left-96 -right-96 -z-10 translate-y-1/2 sm:-left-96 sm:-right-96 md:left-full md:w-full md:max-w-7xl md:-translate-x-3/4 lg:bottom-0'>
          <Image
            src={spaceSpotlight}
            alt=''
            className='h-full w-full object-contain opacity-60'
            sizes='(max-width: 768px) 100vw, 1152px'
          />
        </div>
        {testimonials.map((row, rowIndex) => (
          <div
            key={`testimonial-row-${rowIndex}`}
            className={clsx(
              'mx-3.5 flex w-max animate-infiniteScroll items-center justify-center',
              rowIndex % 2 != 0 && '[animation-direction:reverse]'
            )}
          >
            {[...Array(2)].map((_, i) => (
              <div
                key={`testimonials-${rowIndex}-${i}`}
                className='flex w-1/2 justify-around'
              >
                {row.map((testimonial, j) => (
                  <div
                    key={`testimonial-${rowIndex}-${i}-${j}`}
                    className='mx-3.5 w-96 rounded-2xl bg-zinc-950/[.01] shadow-inner-blur'
                  >
                    <div className='flex h-full w-full flex-col rounded-2xl border border-violet-200/[.06] p-6'>
                      <div className='flex items-center'>
                        <div className='flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(to_top_right,rgba(113,113,122,0.3),rgba(24,24,27,1)),linear-gradient(rgba(9,9,11,0.5),rgba(9,9,11,0.5))]'>
                          <Image
                            className='h-[42px] w-[42px] rounded-full object-cover'
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                        </div>
                        <div className='ml-2.5 flex flex-col justify-center'>
                          <span className='text-sm font-semibold text-white'>
                            {testimonial.name}
                          </span>
                          <span className='text-sm font-medium text-zinc-400'>
                            {testimonial.title}
                          </span>
                        </div>
                      </div>
                      <p className='mt-4 text-lg text-zinc-100'>
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

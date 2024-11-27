import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { FooterCTA } from '@/components/shared/FooterCTA'
import { StarField } from '@/components/shared/StarField'
import { ContentPill } from '@/components/shared/ContentPill'
import { SOCIALS } from '@/config'

import logo from '@/images/logo.jpeg'
import logoIcon from '@/images/logo-icon.png'

import browser from '@/icons/nucleo/browser-18.svg'
import company from '@/icons/nucleo/company-18.svg'
import integrations from '@/icons/nucleo/integrations-18.svg'
import resources from '@/icons/nucleo/resources-18.svg'
import scale from '@/icons/nucleo/scale-18.svg'
import { Menu } from '@headlessui/react'
const navigation = [
  {
    icon: browser,
    label: 'Product',
    links: [
      { name: 'Overview', href: '#' },
      { name: 'Integrations', href: '#' },
      { name: 'Solutions', href: '#' },
      { name: 'Tutorials', href: '#' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Releases', href: '#' },
    ],
  },
  {
    icon: company,
    label: 'Company',
    links: [
      { name: 'About us', href: '/about' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'News', href: '#' },
      { name: 'Media kit', href: '#' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    icon: integrations,
    label: 'Integrations',
    links: [
      { name: 'Slack', href: '#' },
      { name: 'Trello', href: '#' },
      { name: 'Quickbooks', href: '#', new: true },
      { name: 'Dropbox', href: '#' },
      { name: 'Gmail', href: '#' },
      { name: 'Salesforce', href: '#' },
    ],
  },
  {
    icon: resources,
    label: 'Resources',
    links: [
      { name: 'Blog', href: '#' },
      { name: 'Newsletter', href: '#' },
      { name: 'Events', href: '#' },
      { name: 'Help center', href: '#' },
      { name: 'Tutorials', href: '#' },
      { name: 'Support', href: '#' },
    ],
  },
  {
    icon: scale,
    label: 'Legal',
    links: [
      { name: 'Terms', href: '#' },
      { name: 'Privacy', href: '#' },
      { name: 'Cookies', href: '#' },
      { name: 'Licenses', href: '#' },
      { name: 'Security', href: '#' },
      { name: 'Settings', href: '#' },
    ],
  },
]

export function Footer({ cta = true }) {
  return (
    <section className={clsx({ 'overflow-hidden': cta })}>
      <div className='relative'>
        {cta && <FooterCTA />}

        {/* Stars */}
        <div
          className='absolute -bottom-4 left-1/2 -z-10 h-48 w-full max-w-3xl -translate-x-1/2 md:-bottom-8 md:h-64 lg:-bottom-12'
          aria-hidden='true'
        >
          <StarField density='medium' maxRadius={2.5} />
        </div>
      </div>
      <div className='relative left-1/2 top-2 w-[350%] -translate-x-1/2 rounded-t-[100%] bg-gradient-to-r from-transparent via-violet-100/15 to-transparent p-[0.5px] sm:w-[250%] md:top-4 md:w-[200%] lg:top-10 lg:w-[150%] xl:w-[125%]'>
        <div className='h-full w-full rounded-t-[100%] bg-[linear-gradient(rgba(24,24,27,0.9),rgba(24,24,27,0.9)),linear-gradient(#2E1065,#2E1065)] pb-16 pt-24 sm:pt-28 md:pt-32 lg:pt-40'>
          <div className='mx-auto w-screen'>
            <div className='container mx-auto flex items-center justify-between p-4'>
              <div className='mb-2 flex flex-wrap'>
                {/* Left Column */}
                <div className='mb-6 w-full lg:mb-0 lg:w-1/2 lg:pr-4'>
                  <div className='mb-4'>
                    <h2 className='text-3xl font-extrabold text-white'>Menu</h2>
                  </div>
                  <div className='mb-2 items-center justify-between space-x-2'>
                    <div className='grid grid-cols-2 gap-1 text-white md:grid-cols-6'>
                      <a href='#' className='text-light'>
                        Home
                      </a>
                      <div>
                        <div className='dropdown'>
                          <button
                            className='text-light font-medium'
                            data-bs-toggle='dropdown'
                          >
                            Products
                          </button>
                          <ul className='dropdown-menu mt-1'>
                            <li>
                              <a
                                href='/bud-apps/specialist'
                                className='dropdown-item'
                              >
                                Doctor
                              </a>
                            </li>
                            <li>
                              <a
                                href='/bud-apps/insurance'
                                className='dropdown-item'
                              >
                                Insurance
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <a href='/bud-apps/pricing' className='text-light'>
                        Pricing
                      </a>
                      <a href='/bud-apps/about' className='text-light'>
                        About
                      </a>
                      <a href='#' className='text-light'>
                        Contact Us
                      </a>
                      <a
                        href='/refundsandcancellation'
                        className='text-light whitespace-nowrap'
                      >
                        Refund Policy
                      </a>
                    </div>
                  </div>
                  <div className='mb-4'>
                    <h2 className='text-2xl text-white'>BackupDoc AI</h2>
                  </div>
                  <div className='w-50 mb-2'>
                    <p className='text-white'>
                      Contact Support@epikdoc.com <br />
                      Epikdoc AI Technologies PVT LTD <br />
                      AF 16 Aditya Gold Center <br />
                      Indirapuram, Ghaziabad <br />
                      India 201012
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className='w-full lg:w-1/2 lg:pl-4'>
                  <div className='mb-4'>
                    <h2 className='text-3xl font-extrabold text-white'>
                      Be in the know
                    </h2>
                  </div>
                  <div className='mb-4'>
                    <p className='text-white'>
                      Founded in 2024, BackupDoc, under the EpikDoc platform,
                      pioneers digital dental diagnostics, making accurate care
                      accessible and transparent for thousands. Join us in
                      reshaping dental care, one radiograph at a time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='mx-auto max-w-lg px-5 sm:max-w-xl sm:px-6 md:max-w-3xl lg:max-w-screen-xl lg:px-8'>
              <div className='mt-5 block w-full rounded-2xl bg-zinc-950/[.01] shadow-inner-blur sm:mt-24'>
                <div className='flex w-full items-center justify-between space-x-5 rounded-2xl border border-violet-200/[.06] px-6 py-4 sm:space-x-8 sm:px-8 sm:py-6'>
                  {/* Logo */}
                  <div className='flex shrink-0 items-center'>
                    <Link
                      href='/'
                      aria-label='Home'
                      className='flex flex-shrink-0 items-center'
                    >
                      <Image
                        src={logo}
                        alt=''
                        className='h-6 w-auto sm:inline sm:h-7 xl:h-8'
                      />

                      <Image
                        src={logoIcon}
                        alt=''
                        className='hidden h-8 w-auto'
                      />
                    </Link>
                  </div>
                  <div className='flex items-center space-x-5 sm:space-x-7 lg:space-x-6 xl:space-x-12'>
                    {SOCIALS.map((social) => (
                      <a
                        key={`footer-social-${social.name}`}
                        href={social.href}
                        aria-label={social.ariaLabel}
                        className='group flex items-center space-x-2 text-sm font-semibold text-violet-50/90 drop-shadow-[-2px_-4px_6px_rgba(237,233,254,0.2)]'
                      >
                        <social.icon className='h-4 w-4 duration-200 ease-in-out group-hover:text-violet-300/85' />
                        <span className='hidden duration-200 ease-in-out group-hover:text-violet-400/95 lg:inline'>
                          {social.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <p className='mt-10 text-center text-[15px] text-zinc-400/90 sm:mt-12'>
                © {new Date().getFullYear()} Backupdoc. All rights reserved.
                <a href='/termsandconditions' className='text-blue underline'>
                  Privacy and terms
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'
import Link from 'next/link'
import Image from 'next/image'
import { NavbarPill } from '@/components/header/NavbarPill'
import { Container } from '@/components/shared/Container'
import { Button } from '@/components/shared/Button'
import { Menu } from '@headlessui/react'
import logo from '@/images/logo.jpeg'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import userprofile from '@/images/profile-user.png'
import { useDispatch, useSelector } from 'react-redux'
import { UserCircle02Icon } from 'hugeicons-react'
import { logout } from '@/redux/AuthSlice'

export const Header = () => {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  return (
    <header className='relative h-20'>
      <Container className='flex h-full items-center'>
        <nav className='relative z-50 flex w-full items-center justify-between'>
          {/* Logo */}
          <div className='relative z-10 hidden shrink-0 items-center md:flex'>
            <Link href='/' aria-label='Home' className='flex items-center'>
              <Image
                src={`/logo.svg`}
                width={200}
                height={200}
                alt='Company logo'
                className='h-12 w-auto lg:h-14'
              />
            </Link>
          </div>

          {/* Navbar Pills */}
          <NavbarPill />

          {/* Right Side Buttons and Dropdown */}
          <div className='hidden items-center md:flex lg:space-x-3 xl:space-x-4'>
            {token ? (
              <>
                {/* Dashboard Dropdown Menu */}
                <Menu as='div' className='relative inline-block text-left'>
                  <Menu.Button className='flex items-center justify-center rounded-full bg-violet-500/30 p-2 backdrop-blur-sm transition-colors hover:bg-violet-500/40'>
                    <UserCircle02Icon className='h-7 w-7 text-violet-100 dark:text-violet-200' />
                  </Menu.Button>
                  <Menu.Items className='absolute right-2 mt-2 w-48 origin-top-right rounded-md bg-violet-500/10 shadow-lg ring-1 ring-violet-400/20 backdrop-blur-md focus:outline-none'>
                    <div className='py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href='/profile'
                            className={`block px-4 py-2 text-sm ${
                              active
                                ? 'bg-violet-500/30 text-violet-100'
                                : 'text-violet-200'
                            }`}
                          >
                            My Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href='/dashboard'
                            className={`block px-4 py-2 text-sm ${
                              active
                                ? 'bg-violet-500/30 text-violet-100'
                                : 'text-violet-200'
                            }`}
                          >
                            Dashboard
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`block w-full px-4 py-2 text-left text-sm ${
                              active
                                ? 'bg-violet-500/30 text-violet-100'
                                : 'text-violet-200'
                            }`}
                            onClick={() => dispatch(logout())}
                          >
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  href='/signin'
                  variant='tertiary'
                  size='sm'
                  className='overflow-hidden'
                >
                  Sign in
                </Button>
                <Button href='/signup' size='sm'>
                  Sign up
                </Button>
              </>
            )}
          </div>
        </nav>
        <hr className='absolute inset-x-0 bottom-0 h-px border-0 bg-gradient-to-r from-transparent via-violet-200/15 to-transparent' />
      </Container>
    </header>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import logo from '@/images/logo.jpeg'
// import logo from '@/images/logo-icon.png'
import GoogleButton from './GoogleButton'

export function FormHeader({ title, description, socialButtons = true }) {
  return (
    <div className='flex flex-col items-center px-6 pt-10 sm:px-10'>
      <Link href='/' className='flex flex-shrink-0' aria-label='Home'>
        <Image
          src={logo}
          className='h-auto w-12 mix-blend-exclusion'
          alt='Logo'
        />
      </Link>
      <h1 className='mt-4 text-center text-3xl font-bold text-violet-100'>
        {title}
      </h1>
      <p className='mt-1.5 text-center text-base leading-relaxed text-zinc-300'>
        {description}
      </p>

      {socialButtons && (
        <div className='mt-8 flex w-full justify-center px-4 sm:px-6'>
          <GoogleButton />
        </div>
      )}
    </div>
  )
}

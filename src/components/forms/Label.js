import Link from 'next/link'

export function Label({ name, link, children }) {
  return (
    <div className='flex items-end justify-between text-sm leading-none'>
      <label htmlFor={name} className='block text-violet-100/75'>
        {children}
      </label>

      {link && (
        <Link
          href={link.href}
          className='text-violet-300/80 underline duration-200 ease-in-out hover:text-violet-300'
        >
          {link.text}
        </Link>
      )}
    </div>
  )
}

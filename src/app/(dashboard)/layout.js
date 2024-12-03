import clsx from 'clsx'

import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import '@/styles/globals.css'
import Sidebar from '@/components/dashboard/Sidebar'

export default function Layout({ children }) {
  return (
    <html
      lang='en'
      className={clsx('scroll-smooth', GeistSans.variable, GeistMono.variable)}
    >
      <head>
        <link rel='icon' href='./favicon.ico' />
      </head>
      <body className='bg-zinc-900'>
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  )
}

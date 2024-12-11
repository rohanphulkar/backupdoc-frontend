import clsx from 'clsx'

import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import '@/styles/globals.css'
import Sidebar from '@/components/dashboard/Sidebar'
import { Toaster } from 'sonner'
import { Comment01Icon } from 'hugeicons-react'

export default function Layout({ children }) {
  return (
    <html
      lang='en'
      className={clsx('scroll-smooth', GeistSans.variable, GeistMono.variable)}
    >
      <head>
        <link rel='icon' href='./favicon.ico' />
      </head>
      <body className='relative bg-zinc-900'>
        <Toaster closeButton richColors={true} />
        <Sidebar>{children}</Sidebar>
        <Feedback />
      </body>
    </html>
  )
}
function Feedback() {
  return (
    <div className='fixed bottom-4 right-4 z-[1000] flex items-center justify-center rounded-full bg-violet-500 p-4 shadow-lg transition-colors duration-300 hover:bg-violet-700'>
      <Comment01Icon fill='#fff' />
    </div>
  )
}

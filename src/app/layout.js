import clsx from 'clsx'

import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import '@/styles/globals.css'
import { Toaster } from 'sonner'
import { ReduxProvider } from '@/redux/Provider'
import Script from 'next/script'

export const metadata = {
  title: {
    template: '%s - BackupDoc',
    default: 'BackupDoc',
  },
  description:
    'Empowering dentists to provide trustworthy care, enhance patient understanding, and increase retention through AI-supported diagnostics.',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      className={clsx('scroll-smooth', GeistSans.variable, GeistMono.variable)}
    >
      <body className='bg-zinc-900'>
        <Toaster />
        <ReduxProvider>{children}</ReduxProvider>
        <Script
          src='https://checkout.razorpay.com/v1/checkout.js'
          strategy='lazyOnload'
        />
      </body>
    </html>
  )
}

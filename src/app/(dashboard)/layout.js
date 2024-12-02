import clsx from 'clsx'

import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import '@/styles/globals.css'
import { Toaster } from 'sonner'
import { ReduxProvider } from '@/redux/Provider'
import Script from 'next/script'
import CheckTokenValidity from '@/components/auth/CheckTokenValidity'
import Sidebar from '@/components/dashboard/Sidebar'
import ProtectedRoutes from '@/components/routes/ProtectedRoutes'

export default function Layout({ children }) {
  return (
    <html
      lang='en'
      className={clsx('scroll-smooth', GeistSans.variable, GeistMono.variable)}
    >
      {/* add favicon */}
      <link rel='icon' href='./favicon.ico' />
      <body className='bg-zinc-900'>
        <Toaster />
        <ReduxProvider>
          <CheckTokenValidity />
          <ProtectedRoutes />
          <Sidebar>{children}</Sidebar>
        </ReduxProvider>
        <Script
          src='https://checkout.razorpay.com/v1/checkout.js'
          strategy='lazyOnload'
        />
      </body>
    </html>
  )
}

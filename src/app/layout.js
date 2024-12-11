import clsx from 'clsx'

import '@/styles/globals.css'
import { Toaster } from 'sonner'
import { ReduxProvider } from '@/redux/Provider'
import Script from 'next/script'
import { GoogleOAuthProvider } from '@react-oauth/google'
import CheckTokenValidity from '@/components/auth/CheckTokenValidity'
import ProtectedRoutes from '@/components/routes/ProtectedRoutes'

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
    <html lang='en' className={clsx('scroll-smooth')}>
      <body className='bg-zinc-900'>
        <Toaster closeButton richColors={true} />
        <ReduxProvider>
          <CheckTokenValidity />
          <ProtectedRoutes />
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          >
            {children}
          </GoogleOAuthProvider>
        </ReduxProvider>
        <Script
          src='https://checkout.razorpay.com/v1/checkout.js'
          strategy='lazyOnload'
        />
      </body>
    </html>
  )
}

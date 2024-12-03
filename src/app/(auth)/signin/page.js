'use client'

import Link from 'next/link'
import { FormHeader } from '@/components/auth/FormHeader'
import { Container } from '@/components/shared/Container'
import { ContainerOutline } from '@/components/shared/ContainerOutline'
import { Button } from '@/components/shared/Button'
import { TextField } from '@/components/forms/TextField'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { api } from '@/api/api'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { signin } from '@/redux/AuthSlice'
import { Loading02Icon } from 'hugeicons-react'

export default function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await api.post('/user/login', {
        email,
        password,
      })
      const result = await response.data
      const status = await response.status
      if (status === 200) {
        toast.success(result.message)
        dispatch(signin({ token: result.access_token }))
        router.push('/dashboard')
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error)
      } else {
        toast.error('Something went wrong')
      }
    } finally {
      setLoading(false)
      setPassword('')
    }
  }

  return (
    <Container className='max-w-lg py-5'>
      <div className='relative z-10 flex flex-col shadow-inner-blur'>
        <ContainerOutline />
        <FormHeader
          title='Welcome back'
          description='Fill in the details below to sign in.'
        />

        <div className='mt-8 flex w-full items-center px-10'>
          <div className='h-px flex-1 bg-gradient-to-r from-violet-200/5 to-violet-200/10'></div>
          <h4 className='flex-shrink-0 px-4 text-xs text-violet-100/75'>
            or sign in with
          </h4>
          <div className='h-px flex-1 bg-gradient-to-r from-violet-200/10 to-violet-200/5'></div>
        </div>
        <form onSubmit={handleSubmit} className='mt-9 px-6 pb-10 sm:px-10'>
          <div className='space-y-8'>
            <TextField
              label='Email'
              name='email'
              type='email'
              autoComplete='email'
              placeholder='Email Address'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              name='password'
              type='password'
              label='Password'
              link={{ href: '/forgot-password', text: 'Forgot password?' }}
              autoComplete='current-password'
              placeholder='Password (min. 6 characters)'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='mt-10 flex items-center justify-between space-x-4 sm:mt-12'>
            <p className='text-sm text-violet-100/75'>
              Don’t have an account?{' '}
              <Link
                className='text-violet-300/80 underline duration-200 ease-in-out hover:text-violet-300'
                href='/signup'
              >
                Sign up
              </Link>
            </p>
            <Button type='submit' className='sm:px-5' disabled={loading}>
              {loading ? (
                <>
                  <Loading02Icon className='h-5 w-5 animate-spin' fill='#fff' />
                </>
              ) : (
                <>
                  <span>Sign in</span>
                  <ChevronRightIcon className='h-4 w-4' />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  )
}

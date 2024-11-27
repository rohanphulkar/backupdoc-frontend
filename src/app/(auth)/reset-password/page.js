'use client'

import Link from 'next/link'
import { FormHeader } from '@/components/auth/FormHeader'
import { Container } from '@/components/shared/Container'
import { ContainerOutline } from '@/components/shared/ContainerOutline'
import { Button } from '@/components/shared/Button'
import { TextField } from '@/components/forms/TextField'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import { useRouter, useSearchParams } from 'next/navigation'
import { api } from '@/api/api'
import { useState } from 'react'
import { toast } from 'sonner'
import { Loading02Icon } from 'hugeicons-react'

export default function PasswordReset() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { token } = Object.fromEntries(searchParams.entries())

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await api.post(`/user/reset-password?token=${token}`, {
        password,
        confirm_password: confirmPassword,
      })
      const result = await response.data
      const status = await response.status
      if (status === 200) {
        toast.success(result.message)
        router.push('/signin')
      } else {
        toast.error(result.message)
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
      setConfirmPassword('')
    }
  }

  return (
    <Container className='max-w-lg py-5 sm:max-w-xl'>
      <div className='relative z-10 flex flex-col shadow-inner-blur'>
        <ContainerOutline />
        <FormHeader
          title='Reset your password'
          description='Enter your new password below.'
          socialButtons={false}
        />

        <form
          onSubmit={handleSubmit}
          method='POST'
          className='mt-8 px-6 pb-10 sm:px-10'
        >
          <div className='space-y-5'>
            <TextField
              label='New Password'
              name='password'
              type='password'
              autoComplete='new-password'
              placeholder='New Password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label='Confirm Password'
              name='confirm-password'
              type='password'
              placeholder='Confirm Password'
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className='mt-10 flex items-center justify-between space-x-4'>
            <p className='text-sm text-violet-100/75'>
              Know your password?{' '}
              <Link
                className='text-violet-300/80 underline duration-200 ease-in-out hover:text-violet-300'
                href='/signin'
              >
                Sign in
              </Link>
            </p>
            <Button type='submit' className='sm:px-5' disabled={loading}>
              {loading ? (
                <>
                  <Loading02Icon className='h-5 w-5 animate-spin' fill='#fff' />
                </>
              ) : (
                <>
                  <span>Reset password</span>
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

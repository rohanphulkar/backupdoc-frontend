'use client'
import Link from 'next/link'
// import { TestimonialSlider } from '@/components/auth/TestimonialSlider'
import { Testimonal } from '@/components/auth/Testimonal'
import { FormHeader } from '@/components/auth/FormHeader'
import { Container } from '@/components/shared/Container'
import { ContainerOutline } from '@/components/shared/ContainerOutline'
import { Button } from '@/components/shared/Button'
import { TextField } from '@/components/forms/TextField'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'
import { api } from '@/api/api'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Loading02Icon } from 'hugeicons-react'
import { useDispatch } from 'react-redux'
import { signin } from '@/redux/AuthSlice'

export default function Signup() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await api.post('/user/register', {
        name,
        phone,
        email,
        password,
      })
      const result = await response.data
      const status = await response.status
      console.log(result)
      if (status === 201) {
        toast.success(result.message)
        setEmail('')
        setPassword('')
        setName('')
        setPhone('')
        dispatch(signin({ token: result.access_token }))
        router.push('/dashboard')
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(error.response.data.error)
        } else {
          toast.error('Something went wrong')
        }
      }
    } finally {
      setLoading(false)
      setPassword('')
    }
  }

  return (
    <Container className='max-w-lg py-5 sm:max-w-xl lg:max-w-6xl'>
      <div className='lg:grid lg:grid-cols-2 lg:gap-x-8 xl:gap-x-36'>
        <div className='relative z-10 flex flex-col shadow-inner-blur'>
          <ContainerOutline />

          <FormHeader
            title='Sign Up for your Backupdoc account'
            description='Always free! No credit card required.'
          />

          <div className='mt-8 flex w-full items-center px-10'>
            <div className='h-px flex-1 bg-gradient-to-r from-violet-200/5 to-violet-200/10'></div>
            <h4 className='flex-shrink-0 px-4 text-xs text-violet-100/75'>
              or sign up with
            </h4>
            <div className='h-px flex-1 bg-gradient-to-r from-violet-200/10 to-violet-200/5'></div>
          </div>
          <form
            method='POST'
            className='mt-9 px-6 pb-10 sm:px-10'
            onSubmit={handleSubmit}
          >
            <div className='space-y-8'>
              <div className='space-y-8 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0'>
                <TextField
                  label='Name'
                  name='name'
                  autoComplete='name'
                  placeholder='Name'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  label='Phone Number'
                  name='phone'
                  autoComplete='phone'
                  placeholder='Phone Number'
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <TextField
                label='Email Address'
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
                autoComplete='current-password'
                placeholder='Password (min. 6 characters)'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className='mt-10 flex items-center justify-between space-x-4'>
              <p className='text-sm text-violet-100/75'>
                Already have an account?{' '}
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
                    <Loading02Icon
                      className='h-5 w-5 animate-spin'
                      fill='#fff'
                    />
                  </>
                ) : (
                  <>
                    <span>Sign Up</span>
                    <ChevronRightIcon className='h-4 w-4' />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
        <Testimonal />
      </div>
    </Container>
  )
}

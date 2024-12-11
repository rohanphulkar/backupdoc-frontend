'use client'
import React, { useEffect, useState } from 'react'
import { TextField } from '@/components/forms/TextField'
import { Button } from '@/components/shared/Button'
import { Container } from '@/components/shared/Container'
import { ContainerOutline } from '@/components/shared/ContainerOutline'
import { HeroContainer } from '@/components/shared/HeroContainer'
import { Footer } from '@/components/shared/Footer'
import Image from 'next/image'
import imageProfile from '@/images/836.jpg'
import {
  Camera02Icon,
  CloudUploadIcon,
  Loading02Icon,
  PencilEdit02Icon,
} from 'hugeicons-react'
import { api } from '@/api/api'
import { toast } from 'sonner'
import { FormHeader } from '../auth/FormHeader'
import { useSelector } from 'react-redux'

export default function MyProfile() {
  const user = useSelector((state) => state.auth.token)
  const [profilePicture, setProfilePicture] = useState(null)
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    account_type: '',
    credits: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cancellingSubscription, setCancellingSubscription] = useState(false)

  const fetchProfile = async () => {
    try {
      const response = await api.get('/user/profile', {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      })
      const result = await response.data
      const status = await response.status
      if (status === 200) {
        setProfile(result?.user)
        setProfilePicture(result?.profile)
      } else {
        toast.error('Something went wrong!')
      }
    } catch (error) {
      console.log(error)
      if (error.response) {
        toast.error(error.response.data.error)
      } else {
        toast.error('Something went wrong!')
      }
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleProfilePictureUpload = async (image) => {
    const formData = new FormData()
    formData.append('file', image)
    try {
      const response = await api.post(
        '/user/upload-profile-picture',
        formData,
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      )
      const result = await response.data
      const status = await response.status
      if (status === 200) {
        setProfilePicture(image)
        toast.success(result.message)
      } else {
        toast.error('Something went wrong!')
      }
    } catch (error) {
      console.log(error)
      if (error.response) {
        toast.error(error.response.data.error)
      } else {
        toast.error('Something went wrong!')
      }
    }
  }

  const handleProfleUpdate = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const response = await api.patch('/user/update-profile', profile, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      })
      const result = await response.data
      const status = await response.status
      if (status === 200) {
        toast.success(result.message)
      } else {
        toast.error('Something went wrong!')
      }
    } catch (error) {
      console.log(error)
      if (error.response) {
        toast.error(error.response.data.error)
      } else {
        toast.error('Something went wrong!')
      }
    } finally {
      setIsLoading(false)
    }
  }
  console.log(profile)
  const handleCancelSubscription = async (subscription_id) => {
    try {
      setCancellingSubscription(true)
      const { data: result, status } = await api.get(
        `/cancel-subscription?subscription_id=${subscription_id}`,
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      )
      if (status === 200) {
        toast.success(result.message)
        fetchProfile()
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || 'Failed to cancel subscription'
      )
    } finally {
      setCancellingSubscription(false)
    }
  }

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const handlePasswordReset = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await api.post(
        '/user/change-password',
        {
          old_password: currentPassword,
          new_password: newPassword,
          confirm_new_password: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      )
      const result = await response.data
      const status = await response.status
      if (status === 200) {
        toast.success(result.message)
      } else {
        toast.error('Something went wrong!')
      }
    } catch (error) {
      console.log(error)
      if (error.response) {
        toast.error(error.response.data.error)
      } else {
        toast.error('Something went wrong!')
      }
    } finally {
      setLoading(false)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }
  }

  return (
    <Container className='max-w-4xl py-10 sm:max-w-6xl lg:max-w-7xl'>
      {/* Account Status Card */}
      <div className='mx-auto max-w-4xl overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 shadow-xl ring-1 ring-white/10 backdrop-blur-sm'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  profile.account_type === 'premium'
                    ? 'bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/30'
                    : profile.account_type === 'doctor'
                      ? 'bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/30'
                      : 'bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/30'
                }`}
              >
                {profile.account_type === 'premium'
                  ? 'Premium'
                  : profile.account_type === 'doctor'
                    ? 'Doctor'
                    : 'Free'}
              </span>
              <h3 className='text-lg font-semibold text-white'>Account</h3>
            </div>
            <div className='flex w-fit items-center gap-2 rounded-lg bg-indigo-500/10 px-3 py-1.5 ring-1 ring-indigo-500/20'>
              <p className='text-sm font-medium text-emerald-400'>
                {profile.credits} Credits Available
              </p>
            </div>
          </div>
          <div className='flex flex-col gap-3 sm:flex-row'>
            {(profile.account_type === 'free' ||
              profile.account_type === 'doctor') && (
              <button
                onClick={() => {
                  window.location.href = '/pricing'
                }}
                className='group relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]'
              >
                <span className='absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100'></span>
                <span className='relative flex items-center justify-center gap-2'>
                  <span>Upgrade Now</span>
                  <svg
                    className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 7l5 5m0 0l-5 5m5-5H6'
                    />
                  </svg>
                </span>
              </button>
            )}
            {(profile.account_type === 'doctor' ||
              profile.account_type === 'premium') && (
              <button
                onClick={() => {
                  profile?.subscription_id &&
                    handleCancelSubscription(profile?.subscription_id)
                }}
                disabled={cancellingSubscription}
                className='group relative overflow-hidden rounded-lg bg-gradient-to-r from-rose-500 to-red-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100'
              >
                <span className='absolute inset-0 bg-gradient-to-r from-rose-600 to-red-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100'></span>
                <span className='relative flex items-center justify-center gap-2'>
                  {cancellingSubscription ? (
                    <>
                      <span>Cancelling</span>
                      <svg
                        className='h-4 w-4 animate-spin'
                        viewBox='0 0 24 24'
                        fill='none'
                      >
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                        />
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Cancel Subscription</span>
                      <svg
                        className='h-4 w-4 transition-transform duration-300 group-hover:rotate-90'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M6 18L18 6M6 6l12 12'
                        />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className='mx-auto flex w-full flex-col items-center justify-center gap-8 lg:flex-row lg:items-start lg:gap-x-16 xl:gap-x-24'>
        <div className='w-full max-w-md space-y-8'>
          <div className='flex flex-col items-center justify-center space-y-6'>
            <div className='relative mb-3 pt-4 text-center'>
              <div className='relative inline-block'>
                <img
                  src={
                    profilePicture ||
                    `https://ui-avatars.com/api/?name=${profile?.name || 'User'}&background=1e1b4b&color=fff`
                  }
                  width={130}
                  height={130}
                  loading='lazy'
                  alt='Profile Picture'
                  className='border-3 max-h-[130px] min-h-[130px] min-w-[130px] max-w-[130px] rounded-full border-violet-500 object-cover shadow-lg transition-all duration-300 hover:shadow-xl'
                />
                <label
                  htmlFor='profile-pic-upload'
                  className='absolute bottom-1 right-1 cursor-pointer transition-transform duration-200 hover:scale-110'
                >
                  <PencilEdit02Icon
                    className='rounded-full bg-violet-600 p-1.5 text-white shadow-md'
                    size={35}
                  />
                </label>
              </div>
              <input
                type='file'
                id='profile-pic-upload'
                className='hidden'
                accept='image/*'
                onChange={(e) => handleProfilePictureUpload(e.target.files[0])}
              />
            </div>
          </div>

          <form
            method='POST'
            className='mt-6 rounded-xl p-6 shadow-md sm:p-8'
            onSubmit={handleProfleUpdate}
          >
            <div className='space-y-6'>
              <div className='space-y-6'>
                <TextField
                  label='Name'
                  name='name'
                  autoComplete='name'
                  placeholder='Enter your name'
                  required
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
              </div>
              <TextField
                label='Email'
                name='email'
                type='email'
                autoComplete='email'
                placeholder='Enter your email'
                required
                disabled={true}
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
              <TextField
                label='Your Bio'
                name='bio'
                autoComplete='off'
                placeholder='Enter your bio'
                required
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
              />
              <div className='pt-2'>
                <Button
                  type='submit'
                  size='md'
                  className='w-full overflow-hidden'
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loading02Icon
                      className='h-5 w-5 animate-spin'
                      fill='#fff'
                    />
                  ) : (
                    'Update Profile'
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className='w-full max-w-md'>
          <form
            method='POST'
            className='rounded-xl p-6 shadow-md sm:p-8'
            onSubmit={handlePasswordReset}
          >
            <FormHeader
              title='Change Password'
              description='Update your password below.'
              socialButtons={false}
            />
            <div className='mt-6 space-y-6'>
              <TextField
                label='Current Password'
                name='current-password'
                type='password'
                autoComplete='password'
                placeholder='Current Password'
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <TextField
                label='New Password'
                name='new-password'
                type='password'
                autoComplete='new-password'
                placeholder='New Password'
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                label='Confirm Password'
                name='confirm-password'
                type='password'
                autoComplete='new-password'
                placeholder='Confirm Password'
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className='pt-2'>
                <Button
                  size='md'
                  type='submit'
                  className='w-full overflow-hidden'
                  disabled={loading}
                >
                  {loading ? (
                    <Loading02Icon
                      className='h-5 w-5 animate-spin'
                      fill='#fff'
                    />
                  ) : (
                    'Change Password'
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </Container>
  )
}

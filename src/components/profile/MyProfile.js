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
  })
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(false)

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

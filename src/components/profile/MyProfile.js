'use client'
import React, { useEffect, useState } from 'react'
import { TextField } from '@/components/forms/TextField'
import { Button } from '@/components/shared/Button'
import { Container } from '@/components/shared/Container'
import { ContainerOutline } from '@/components/shared/ContainerOutline'
import { HeroContainer } from '@/components/shared/HeroContainer'
import { Footer } from '@/components/shared/Footer'
import Image from 'next/image'
import imageProfile from '@/images/836.jpg' // Use the actual import here
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
        setProfilePicture(image) // Update to use the URL from the response
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
      <div className='lg:grid lg:grid-cols-2 lg:gap-x-8 xl:gap-x-36'>
        {/* Left Column (Name, Email, and Bio Fields) */}
        <div className='space-y-8'>
          {/* Right Column (Profile Photo and File Upload) */}
          <div className='flex flex-col items-center space-y-6'>
            <div className='col-lg-6 relative mb-3 pt-4 text-center'>
              <div className='relative'>
                <img
                  src={profilePicture || imageProfile}
                  width={110}
                  height={110}
                  alt='Profile Picture'
                  className='max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px] rounded-full border-2 border-violet-500 object-cover shadow-inner-blur'
                />
                <label
                  htmlFor='profile-pic-upload'
                  className='absolute bottom-0 right-0 cursor-pointer'
                >
                  <PencilEdit02Icon
                    className='rounded-full bg-violet-600 p-1 text-white'
                    size={30}
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
            className='mt-9 px-6 pb-10 sm:px-10'
            onSubmit={handleProfleUpdate}
          >
            <div className='space-y-8'>
              {/* First Name and Last Name Fields */}
              <div className='space-y-8 sm:grid sm:grid-cols-1 sm:gap-x-6 sm:space-y-0'>
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

              {/* Email Field */}
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

              {/* Tour Bio Field */}
              <TextField
                label='Tour Bio'
                name='bio'
                autoComplete='off'
                placeholder='Enter your bio'
                required
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
              />

              {/* Submit Button */}
              <div className='mt-6'>
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
                    'Submit'
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
        {/* Password Reset Container (Below Main Form) */}
        <div className='relative z-10 flex flex-col'>
          <ContainerOutline />
          <form
            method='POST'
            className='mt-9 px-6 pb-10 sm:px-10'
            onSubmit={handlePasswordReset}
          >
            <FormHeader
              title='Change Password'
              description='Update your password below.'
              socialButtons={false}
            />
            <div className='space-y-8'>
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
            </div>

            {/* Submit Button */}
            <div className='mt-6'>
              <Button
                size='md'
                type='submit'
                className='w-full overflow-hidden'
                disabled={loading}
              >
                {loading ? (
                  <Loading02Icon className='h-5 w-5 animate-spin' fill='#fff' />
                ) : (
                  'Change Password'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </Container>
  )
}

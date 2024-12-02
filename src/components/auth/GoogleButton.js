'use client'

import { useGoogleLogin } from '@react-oauth/google'
import { api } from '@/api/api'
import { toast } from 'sonner'
import GoogleIcon from '@/icons/nucleo/google.svg'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { signin } from '@/redux/AuthSlice'

function GoogleButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const login = useGoogleLogin({
    onSuccess: handleLogin,
    onError: () => toast.error('Google login failed'),
  })

  async function handleLogin(tokenResponse) {
    if (loading) return

    setLoading(true)
    try {
      const response = await api.post('/user/google-login', {
        token: tokenResponse.access_token,
      })

      const { data: result, status } = response

      if (status === 200) {
        toast.success('Successfully logged in!')
        dispatch(signin({ token: result.access_token }))
        router.push('/dashboard')
      } else {
        toast.error('Authentication failed')
      }
    } catch (error) {
      console.error('Google login error:', error)
      toast.error(error.response?.data?.message || 'Failed to authenticate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={() => login()}
      disabled={loading}
      className={`flex w-full transform items-center justify-center gap-3 rounded-lg bg-white px-6 py-2 text-gray-800 shadow-md transition-all duration-200 ease-in-out hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70 ${
        loading ? 'cursor-wait' : 'hover:scale-[1.01]'
      }`}
    >
      <GoogleIcon className='h-5 w-5' />
      <span className='font-medium'>
        {loading ? 'Signing in...' : 'Continue with Google'}
      </span>
    </button>
  )
}

export default GoogleButton

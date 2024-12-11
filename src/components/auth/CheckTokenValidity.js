'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '@/api/api'
import { logout } from '@/redux/AuthSlice'

export default function CheckTokenValidity() {
  const user = useSelector((state) => state.auth.token)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    window.location.href = '/signin'
  }

  const checkTokenValidity = async () => {
    // Return early if no token exists
    if (!user) {
      return
    }

    try {
      const response = await api.get('/user/check-token-validity', {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      })

      const { status } = response
      if (status !== 200) {
        handleLogout()
      }
    } catch (error) {
      console.error('Token validation error:', error)
      handleLogout()
    }
  }

  useEffect(() => {
    const validateToken = async () => {
      await checkTokenValidity()
    }
    validateToken()
  }, [user])

  return null
}

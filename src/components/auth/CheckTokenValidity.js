'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '@/api/api'
import { logout } from '@/redux/AuthSlice'

export default function CheckTokenValidity() {
  const user = useSelector((state) => state.auth.token)
  const dispatch = useDispatch()

  const checkTokenValidity = async () => {
    if (!user || user === '' || user === null || user === undefined) {
      return
    }

    try {
      const response = await api.get('/user/check-token-validity', {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      })

      if (response.status !== 200) {
        dispatch(logout())
        window.location.href = '/signin'
      }
    } catch (error) {
      console.error(error)
      dispatch(logout())
      window.location.href = '/signin'
    }
  }

  useEffect(() => {
    checkTokenValidity()
  }, [user])

  return null
}

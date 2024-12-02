'use client'

import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const ProtectedRoutes = () => {
  const token = useSelector((state) => state.auth.token)
  const privateRoutes = ['/dashboard', '/dashboard/*', '/analysis-dashboard', '/analysis-dashboard/*', '/profile']
  const authRoutes = ['/signin', '/signup', '/forgot-password', '/reset-password/*']
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const isTokenValid = token && token !== "" && token !== undefined && token !== null
    
    const isPrivateRoute = privateRoutes.some(route => {
      const baseRoute = route.replace('/*', '')
      return pathname.startsWith(baseRoute)
    })

    const isAuthRoute = authRoutes.some(route => {
      const baseRoute = route.replace('/*', '')
      return pathname.startsWith(baseRoute)
    })

    if (isTokenValid) {
      // User is logged in
      if (isAuthRoute) {
        // Prevent authenticated users from accessing auth routes
        router.replace('/')
      }
    } else {
      // User is not logged in
      if (isPrivateRoute) {
        // Prevent unauthenticated users from accessing private routes
        router.replace('/signin')
      }
    }
  }, [token, pathname, router])

  return null
}

export default ProtectedRoutes

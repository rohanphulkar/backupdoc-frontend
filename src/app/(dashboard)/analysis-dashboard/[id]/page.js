'use client'
import React from 'react'

import { useParams } from 'next/navigation'
import AnalysisDashboard from '@/components/dashboard/AnalysisDashboard'

const AnalysisDashboardPage = () => {
  const { id } = useParams()
  return (
    <div className='flex min-h-screen w-full flex-col bg-gray-900/95 backdrop-blur-xl'>
     
      <div className=''>
        <AnalysisDashboard id={id} />
      </div>
    </div>
  )
}

export default AnalysisDashboardPage

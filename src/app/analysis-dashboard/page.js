'use client'
import React from 'react'
import { DashboardHero } from '@/components/dashboard/DashboardHero'
import ImageDashbaord from '@/components/dashboard/ImageDashboard'
import AnalysisDashboard from '@/components/dashboard/AnalysisDashboard'
const AnalysisDashboardPage = () => {
  return (
    <div>
      <DashboardHero>
        {/* <AnalysisDashboard /> */}
        <ImageDashbaord />
      </DashboardHero>
    </div>
  )
}

export default AnalysisDashboardPage

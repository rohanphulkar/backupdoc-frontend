'use client'
import { DashboardHero } from '@/components/dashboard/DashboardHero'
import ImageDashboard from '@/components/dashboard/ImageDashboard'

export default function Dashboard() {
  return (
    <>
      <DashboardHero>
        <ImageDashboard />
      </DashboardHero>
    </>
  )
}

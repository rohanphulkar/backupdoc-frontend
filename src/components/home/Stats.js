'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

const Odometer = dynamic(() => import('react-odometerjs'), { ssr: false })

export const Stats = () => {
  const [stats, setStats] = useState({
    activeUsers: 3122,
    companiesManaged: 110,
    projectsCreated: 20,
  })

  const statsRef = useRef(stats)
  statsRef.current = stats

  const statsSectionRef = useRef(null)

  useEffect(() => {
    const fetchMockStats = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            activeUsers:
              statsRef.current.activeUsers + Math.floor(Math.random() * 200),
            companiesManaged:
              statsRef.current.companiesManaged + Math.floor(Math.random() * 5),
            projectsCreated:
              statsRef.current.projectsCreated + Math.floor(Math.random() * 15),
          })
        }, 500)
      })
    }

    const updateStats = () => {
      fetchMockStats().then((data) => {
        setStats(data)
      })
    }

    let interval

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateStats()
            interval = setInterval(updateStats, 7000)

            observer.unobserve(entry.target)
          }
        })
      },
      {
        root: null,
        threshold: 0.5,
      }
    )

    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current)
    }

    return () => clearInterval(interval)
  }, [])

  return (
    <dl
      ref={statsSectionRef}
      className='mt-8 grid grid-cols-1 gap-6 px-4 sm:mt-16 sm:grid-cols-3 sm:gap-8 lg:mt-20 xl:mt-24'
    >
      <div className='flex flex-col items-center justify-center p-4'>
        <dt className='text-center text-xs font-extrabold uppercase tracking-widest text-violet-50/80 break-words max-w-[200px]'>
          Second Opinions Completed
        </dt>
        <dd className='odometer mt-3 !font-mono text-2xl sm:text-3xl font-bold text-white'>
          <Odometer value={stats.activeUsers} />
        </dd>
      </div>

      <div className='flex flex-col items-center justify-center p-4'>
        <dt className='text-center text-xs font-extrabold uppercase tracking-widest text-violet-50/80 break-words max-w-[200px]'>
          Companies Managed
        </dt>
        <dd className='odometer mt-3 text-center !font-mono text-2xl sm:text-3xl font-bold text-white'>
          <Odometer value={stats.companiesManaged} />
        </dd>
      </div>

      <div className='flex flex-col items-center justify-center p-4'>
        <dt className='text-center text-xs font-extrabold uppercase tracking-widest text-violet-50/80 break-words max-w-[200px]'>
          Projects Created
        </dt>
        <dd className='odometer mt-3 text-center !font-mono text-2xl sm:text-3xl font-bold text-white'>
          <Odometer value={stats.projectsCreated} />
        </dd>
      </div>
    </dl>
  )
}

'use client'

import Image from 'next/image'
import { PricingCard } from './PricingCard'
import { Container } from '@/components/shared/Container'
import { ContentPill } from '@/components/shared/ContentPill'
import { StarField } from '@/components/shared/StarField'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import cosmicButterfly from '@/images/cosmic-butterfly.png'
import TagsStackIcon from '@/icons/nucleo/tags-stack-16.svg'
import { useSelector } from 'react-redux'
import { api } from '@/api/api'
import { toast } from 'sonner'

const pricingPlans = [
  {
    title: 'Starter',
    link: '/checkout?plan=starter',
    price: {
      monthly: '999',
      half_yearly: '3999',
      yearly: '5999',
    },
    originalPrice: {
      half_yearly: '5994',
      yearly: '11988',
    },
    description:
      'Ideal for individual professionals and small teams just beginning their journey looking for a streamlined solution.',
    popular: false,
    accountType: 'starter',
    opgSupport: false,
    credits: 50
  },
  {
    title: 'Pro',
    link: '/checkout?plan=pro',
    price: {
      monthly: '1999',
      half_yearly: '8999',
      yearly: '13999',
    },
    originalPrice: {
      half_yearly: '11994',
      yearly: '23988',
    },
    description:
      'Designed for growing teams and businesses seeking to enhance their productivity.',
    popular: true,
    accountType: 'pro',
    opgSupport: true,
    credits: 300
  },
  {
    title: 'Max',
    link: '/checkout?plan=max',
    price: {
      monthly: '2999',
      half_yearly: '14999',
      yearly: '19999',
    },
    originalPrice: {
      half_yearly: '17994',
      yearly: '35988',
    },
    description:
      'Designed for growing teams and businesses seeking to enhance their productivity.',
    popular: false,
    accountType: 'max',
    opgSupport: true,
    credits: 600
  },
  {
    title: 'Enterprise',
    link: '/contact',
    price: {
      monthly: 'Custom',
      half_yearly: 'Custom',
      yearly: 'Custom',
    },
    description:
      'Tailored for large organizations requiring a comprehensive solution that evolves with your enterprise.',
    popular: false,
    accountType: 'enterprise',
    opgSupport: true,
    credits: 'Custom'
  },
]

export function PricingHero() {
  const [billingType, setBillingType] = useState('monthly')
  const router = useRouter()
  const user = useSelector((state) => state.auth.token)
  const [profile, setProfile] = useState(null)
  const [accountType, setAccountType] = useState(null)

  const fetchProfile = async () => {
    try {
      const { data: result, status } = await api.get('/user/profile', {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      })
      if (status === 200) {
        setProfile(result?.user)
        setAccountType(result?.user?.account_type)
      } else {
        toast.error('Something went wrong!')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error || 'Something went wrong!')
    }
  }

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const handlePlanClick = (link) => {
    if (!user || profile === null) {
      router.push('/signup')
      return
    }
    router.push(link)
  }

  const isUpgradable = (planAccountType) => {
    const accountTypes = ['free', 'starter', 'pro', 'max', 'enterprise']
    const currentIndex = accountTypes.indexOf(accountType)
    const planIndex = accountTypes.indexOf(planAccountType)
    return planIndex > currentIndex
  }

  return (
    <div className='pb-12 pt-20 md:pb-20 lg:py-28'>
      <div className='relative'>
        <div className='absolute inset-0 -z-10' aria-hidden='true'>
          <StarField />
        </div>

        <Container className='max-w-4xl gap-16 lg:max-w-screen-xl'>
          <div className='relative z-10 flex flex-col items-center'>
            <ContentPill
              Icon={TagsStackIcon}
              iconClassName='h-3.5 w-3.5'
              text='BackupDoc pricing'
            />

            <h1 className='mt-5 max-w-4xl text-center text-[2.75rem] font-bold leading-[1.125] text-violet-100 sm:text-5xl sm:leading-[1.125] md:text-6xl md:leading-[1.125] lg:text-[64px]'>
              Flexible plans tailored to your needs
            </h1>
            <p className='mt-5 max-w-xl text-center text-[17px] leading-8 text-zinc-200 sm:text-lg sm:leading-8'>
              Discover the perfect plan that aligns with your ambitions and
              scale, and experience the freedom to grow on your terms.
            </p>
          </div>

          <div className='mx-auto mt-12 flex max-w-lg flex-col items-center sm:mt-16 sm:max-w-xl lg:mx-0 lg:mt-20 lg:max-w-none'>
            <div className='flex items-center rounded-full bg-zinc-950/[.01] shadow-inner-blur'>
              <div className='flex h-full w-full items-center space-x-2 rounded-full border border-violet-200/[.06] px-1 py-1'>
                <button
                  onClick={() => setBillingType('monthly')}
                  className={cn(
                    'group relative inline-flex items-center overflow-hidden rounded-full px-4 py-2 text-sm font-semibold leading-4 antialiased',
                    billingType === 'monthly'
                      ? 'bg-btn-primary text-violet-50 shadow-btn-primary'
                      : 'text-violet-50 hover:text-white'
                  )}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingType('half_yearly')}
                  className={cn(
                    'group relative inline-flex items-center overflow-hidden rounded-full px-4 py-2 text-sm font-semibold leading-4 antialiased',
                    billingType === 'half_yearly'
                      ? 'bg-btn-primary text-violet-50 shadow-btn-primary'
                      : 'text-violet-50 hover:text-white'
                  )}
                >
                  6 Months
                </button>
                <button
                  onClick={() => setBillingType('yearly')}
                  className={cn(
                    'group relative inline-flex items-center overflow-hidden rounded-full px-4 py-2 text-sm font-semibold leading-4 antialiased',
                    billingType === 'yearly'
                      ? 'bg-btn-primary text-violet-50 shadow-btn-primary'
                      : 'text-violet-50 hover:text-white'
                  )}
                >
                  Yearly
                </button>
              </div>
            </div>

            <div className='relative'>
              <div className='absolute -bottom-64 -left-96 -right-96 top-0 -z-10'>
                <Image
                  src={cosmicButterfly}
                  alt=''
                  className='h-full w-full object-fill opacity-10'
                  sizes='(max-width: 1024px) 100vw, 1024px'
                />
              </div>
              <div className='mt-10 flex w-full flex-wrap space-y-10 lg:grid lg:grid-cols-4 lg:gap-5 lg:space-y-0 xl:gap-12'>
                {pricingPlans.map((plan) => (
                  <div
                    key={`pricing-plans-mobile-${plan.title}`}
                    className='flex flex-1 flex-col space-y-8 lg:space-y-0'
                  >
                    <PricingCard
                      plan={plan}
                      price={plan.price[billingType]}
                      billingType={billingType}
                      onPlanClick={() =>
                        handlePlanClick(`${plan.link}&billing=${billingType}`)
                      }
                      disabled={!isUpgradable(plan.accountType)}
                      message={
                        accountType === plan.accountType
                          ? 'Current Plan'
                          : !isUpgradable(plan.accountType)
                            ? 'Not Available'
                            : ''
                      }
                      credits={plan.credits}
                      opgSupport={plan.opgSupport}
                      originalPrice={plan.originalPrice?.[billingType]}
                      isAuthenticated={!!user}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

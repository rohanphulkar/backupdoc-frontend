'use client'

import Image from 'next/image'
import { Button } from '@/components/shared/Button'
import { ContentPill } from '@/components/shared/ContentPill'
import { StarField } from '@/components/shared/StarField'
import spaceSpotlight from '@/images/space-spotlight.png'

export function PricingCard({
  plan,
  price,
  billingType,
  onPlanClick,
  disabled,
  message,
  credits,
  opgSupport,
  originalPrice,
  isAuthenticated,
}) {

  return (
    <div className='flex-1 rounded-2xl bg-zinc-950/[.01] shadow-inner-blur'>
      <div className='relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-violet-200/[.06] px-5 py-7 xl:px-7 xl:py-8'>
        {plan.popular && (
          <div>
            <div className='absolute -bottom-32 -left-32 -right-48 -top-64'>
              <Image
                src={spaceSpotlight}
                alt=''
                className='h-full w-full object-contain opacity-60 lg:opacity-70'
                sizes='(max-width: 420px) 100vw, 768px'
              />
            </div>

            {/* Stars */}
            <div
              className='absolute bottom-[60%] left-[40%] right-0 top-0 -z-10'
              aria-hidden='true'
            >
              <StarField density='high' maxRadius={2} />
            </div>

            {/* Popular badge */}
            <ContentPill
              text='Most popular'
              className='absolute right-4 top-4'
              textClassName='text-xs leading-4'
            />
          </div>
        )}

        <div className='flex-1'>
          <p className='text-base font-semibold text-white'>{plan.title}</p>
          <div className='mt-2.5 flex flex-col'>
            {price !== 'Free' && price !== 'Custom' && (billingType === 'half_yearly' || billingType === 'yearly') && originalPrice && (
              <span className='mb-1 text-2xl font-medium text-zinc-400 line-through'>
                ₹{originalPrice}
              </span>
            )}
            <div className='flex items-start space-x-3'>
              <span className='relative inline-block text-nowrap text-5xl font-semibold leading-[1.125]'>
                {price !== 'Free' && price !== 'Custom' && (
                  <span className='absolute -left-4 top-1 text-lg text-white'>
                    ₹
                  </span>
                )}
                <span className='relative z-10 bg-gradient-to-b from-violet-400 via-violet-400 to-violet-500 bg-clip-text text-transparent'>
                  {price}
                </span>
                <span className='absolute -top-px left-0 -z-10 text-violet-300'>
                  {price}
                </span>
              </span>
            </div>
          </div>
          <p className='mt-4 text-[17px] leading-7 text-zinc-300'>
            {plan.description}
          </p>

          {/* Features */}
          <ul className='mt-6 space-y-3 text-sm text-zinc-300'>
            <li className='flex items-center'>
              <svg
                className='mr-3 h-5 w-5 text-violet-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
              Image Analysis Credits: {credits}
            </li>
            <li className='flex items-center'>
              <svg
                className='mr-3 h-5 w-5 text-violet-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
              OPG Support: {opgSupport ? 'Yes' : 'No'}
            </li>
          </ul>
        </div>

        {message ? (
          <Button
            variant={plan.popular ? 'primary' : 'secondary'}
            className='mt-8 w-full cursor-not-allowed py-4 text-base leading-none opacity-50 sm:py-4'
            disabled
          >
            {message}
          </Button>
        ) : (
          <div className='mt-8 flex flex-col space-y-3'>
            {!isAuthenticated && price !== 'Custom' ? (
              <>
                <Button
                  variant={plan.popular ? 'primary' : 'secondary'}
                  className='w-full py-4 text-base leading-none sm:py-4'
                  disabled={disabled}
                  onClick={onPlanClick}
                >
                  Buy Now
                </Button>
                <Button
                  variant='secondary'
                  className='w-full py-4 text-base leading-none sm:py-4'
                  onClick={() => window.location.href = '/signup'}
                >
                  Free Trial
                </Button>
              </>
            ) : (
              <Button
                variant={plan.popular ? 'primary' : 'secondary'}
                className='w-full py-4 text-base leading-none sm:py-4'
                disabled={disabled}
                onClick={onPlanClick}
              >
                Buy this plan
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

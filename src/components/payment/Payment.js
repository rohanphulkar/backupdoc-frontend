'use client'

import React, { useEffect, useState } from 'react'
import { TextField } from '@/components/forms/TextField'
import { Button } from '@/components/shared/Button'
import { Container } from '@/components/shared/Container'
import { api } from '@/api/api'
import { toast } from 'sonner'
import { useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'

export default function Payment() {
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false)
  const [subtotal, setSubtotal] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [total, setTotal] = useState(0)
  const [couponCode, setCouponCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const planName = searchParams.get('plan')
  const billing = searchParams.get('billing')
  const user = useSelector((state) => state.auth.token)

  const fetchPlanDetails = async () => {
    try {
      const response = await api.get(
        `/fetch-plan-details?plan_name=${planName}`
      )
      const result = await response.data
      const status = await response.status
      if (status === 200) {
        setSubtotal(result.amount / 100)
        setTotal(result.amount / 100)
      } else {
        toast.error('Something went wrong!')
      }
    } catch (error) {
      console.log(error)
      if (error.response) {
        toast.error(error.response.data.error)
      } else {
        toast.error('Something went wrong!')
      }
    }
  }

  useEffect(() => {
    fetchPlanDetails()
  }, [searchParams])

  const handleApplyCoupon = async () => {
    setIsLoading(true)
    try {
      const response = await api.get(
        `/apply-coupon?plan_name=${planName}&coupon_code=${couponCode}`
      )
      const result = await response.data
      const status = await response.status
      if (status === 200) {
        setSubtotal(result.original_amount)
        setDiscount(result.discount_amount)
        setTotal(result.final_amount)
      } else {
        toast.error('Something went wrong!')
      }
    } catch (error) {
      console.log(error)
      if (error.response) {
        toast.error(error.response.data.error)
      } else {
        toast.error('Something went wrong!')
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function handlePaymentSuccess(response) {
    try {
      // {
      //     "razorpay_payment_id": "pay_PQDxW6hjx0fSdl",
      //     "razorpay_subscription_id": "sub_PQDwN6OBYGbLU3",
      //     "razorpay_signature": "1d17638b53af015569f88aaf47f01567ce1416e27824b25a97cddee06777f662"
      // }
      const res = await api.post(`/payment/verify`, response)
      const result = await res.data
      const status = await res.status
      if (status === 200) {
        setIsPaymentSuccessful(true)
      } else {
        toast.error('Something went wrong!')
      }
    } catch (error) {
      console.log(error)
      if (error.response) {
        toast.error(error.response.data.error)
      } else {
        toast.error('Something went wrong!')
      }
    }
  }

  const showRazorpay = async () => {
    setIsLoading(true)
    try {
      const formData = {}
      formData['plan'] = planName
      formData['coupon'] = couponCode

      formData['plan_type'] = billing
      const response = await api.post(`/payment/create`, formData, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      })
      const result = await response.data
      const razorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: result.subscription_id,
        name: 'Backupdoc',
        description: 'Subscription Payment',
        handler: async (response) => {
          await handlePaymentSuccess(response)
        },
        theme: {
          color: '#000000',
        },
      }

      const rzp1 = new window.Razorpay(razorpayOptions)
      rzp1.open()
    } catch (error) {
      console.log(error)
      if (error.response) {
        toast.error(error.response.data.error)
      } else {
        toast.error('Something went wrong!')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container className='max-w-4xl py-10 sm:max-w-6xl lg:max-w-7xl'>
      <div className='mx-auto max-w-lg'>
        {/* Left Column (Form Fields) */}
        {/* <form className='space-y-8'>
          <TextField
            label='Full Name'
            name='first-name'
            autoComplete='given-name'
            placeholder='Johnny'
            required
          />
          <TextField
            label='Email Address'
            name='email'
            autoComplete='email'
            placeholder='www@email.com'
            required
          />
          <TextField
            label='Phone Number'
            name='Phone'
            type='number'
            autoComplete='Phone'
            placeholder='johnnybravo@gmail.com'
            required
          />
          <div className='space-y-8 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0'>
            <TextField
              label='Country'
              name='Country'
              autoComplete='off'
              placeholder='Country'
              required
            />
            <TextField
              label='ZipCode'
              name='Country'
              autoComplete='off'
              placeholder='Country'
              required
            />
          </div>
          <div className='space-y-8 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0'>
            <TextField
              label='Status'
              name='Country'
              autoComplete='off'
              placeholder='Country'
              required
            />
            <TextField
              label='Additional Field'
              name='Country'
              autoComplete='off'
              placeholder='Country'
              required
            />
          </div>
        </form> */}

        {/* Right Column: Cart Review Section */}
        {isPaymentSuccessful ? (
          <div className='mt-6 rounded-lg p-6 text-center text-white shadow-md'>
            <h2 className='text-2xl font-bold'>Payment Successful!</h2>
            <p className='mt-4 text-lg'>Thank you for your purchase.</p>
            <div className='mt-6 rounded-lg border bg-slate-900 p-4'>
              <h3 className='text-lg font-semibold'>Order Summary</h3>

              <div className='mt-6 space-y-3 rounded-lg border border-violet-200/[.06] bg-zinc-950/[.01] p-4 font-semibold shadow-inner-blur'>
                <div className='flex w-full items-center justify-between text-gray-400'>
                  <p>Subtotal</p>
                  <p>&#8377;{subtotal}</p>
                </div>
                <div className='flex w-full items-center justify-between text-gray-400'>
                  <p>Discount</p>
                  <p className='text-green-500'>&#8377;{discount}</p>
                </div>
                <div className='mt-2 flex w-full items-center justify-between border-t border-violet-200/[.06] pt-3 text-lg text-white'>
                  <p>Total</p>
                  <p>&#8377;{total}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='space-y-4 rounded-lg p-4 text-white shadow-sm'>
            <h2 className='mb-3 text-xl font-bold'>Have a coupon?</h2>

            <div className='mt-3'>
              <TextField
                label='Coupon Code'
                name='couponCode'
                placeholder='Enter coupon code'
                labelClassName='text-gray-700' // Label color change
                className='rounded-md p-2'
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button
                type='button'
                onClick={handleApplyCoupon}
                className='mt-4 rounded-md py-2 text-white'
                disabled={isLoading}
              >
                {isLoading ? 'Applying...' : 'Apply Coupon'}
              </Button>
            </div>
            <div className='mt-8'>
              <div className='mt-6 space-y-3 rounded-lg border border-violet-200/[.06] bg-zinc-950/[.01] p-4 font-semibold shadow-inner-blur'>
                <div className='flex w-full items-center justify-between text-gray-400'>
                  <p>Subtotal</p>
                  <p>&#8377;{subtotal}</p>
                </div>
                <div className='flex w-full items-center justify-between text-gray-400'>
                  <p>Discount</p>
                  <p className='text-green-500'>&#8377;{discount}</p>
                </div>
                <div className='mt-2 flex w-full items-center justify-between border-t border-violet-200/[.06] pt-3 text-lg text-white'>
                  <p>Total</p>
                  <p>&#8377;{total}</p>
                </div>
              </div>
              <div className='mt-6 flex justify-end'>
                <Button
                  type='button'
                  className='w-full rounded-md px-6 py-2 text-white'
                  disabled={isLoading}
                  onClick={showRazorpay}
                >
                  {isLoading ? 'Proceeding...' : 'Proceed to Payment'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

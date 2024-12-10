'use client'

import React, { useEffect, useState } from 'react'
import { TextField } from '@/components/forms/TextField'
import { Button } from '@/components/shared/Button'
import { Container } from '@/components/shared/Container'
import { api } from '@/api/api'
import { toast } from 'sonner'
import { useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { Loading02Icon } from 'hugeicons-react'

export default function Payment() {
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false)
  const [subtotal, setSubtotal] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [total, setTotal] = useState(0)
  const [couponCode, setCouponCode] = useState('')
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const searchParams = useSearchParams()
  const planName = searchParams.get('plan')
  const billing = searchParams.get('billing')
  const user = useSelector((state) => state.auth.token)

  const fetchPlanDetails = async () => {
    try {
      const response = await api.get(
        `/fetch-plan-details?plan_name=${planName}`
      )
      if (response.status === 200) {
        setSubtotal(response.data.amount / 100)
        setTotal(response.data.amount / 100)
      } else {
        toast.error('Something went wrong!')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.error || 'Something went wrong!')
    }
  }

  useEffect(() => {
    if (planName) {
      fetchPlanDetails()
    }
  }, [planName])

  const handleApplyCoupon = async () => {
    if (!couponCode) {
      toast.error('Please enter a coupon code')
      return
    }

    setIsApplyingCoupon(true)
    try {
      const response = await api.get(
        `/apply-coupon?plan_name=${planName}&coupon_code=${couponCode}`
      )
      if (response.status === 200) {
        setSubtotal(response.data.original_amount)
        setDiscount(response.data.discount_amount)
        setTotal(response.data.final_amount)
      } else {
        toast.error('Something went wrong!')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.error || 'Something went wrong!')
    } finally {
      setIsApplyingCoupon(false)
    }
  }

  async function handlePaymentSuccess(response) {
    try {
      const res = await api.post(`/payment/verify`, response)
      if (res.status === 200) {
        setIsPaymentSuccessful(true)
      } else {
        toast.error('Something went wrong!')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.error || 'Something went wrong!')
    }
  }

  const showRazorpay = async () => {
    if (!user) {
      toast.error('Please login to continue')
      return
    }

    setIsProcessingPayment(true)
    try {
      const formData = {
        plan: planName,
        coupon: couponCode,
        plan_type: billing,
      }

      const response = await api.post(`/payment/create`, formData, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      })

      const razorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: response.data.subscription_id,
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
      console.error(error)
      toast.error(error.response?.data?.error || 'Something went wrong!')
    } finally {
      setIsProcessingPayment(false)
    }
  }

  return (
    <Container className='max-w-4xl py-10 sm:max-w-6xl lg:max-w-7xl'>
      <div className='mx-auto max-w-lg'>
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
            <div className='flex items-center justify-center gap-2 rounded-lg border-2 border-violet-400 bg-gradient-to-r from-violet-400/20 to-transparent p-4 text-center'>
              <p className='text-lg font-bold text-violet-400'>
                Special Offer! 🎉
              </p>
              <p className='text-white'>
                Use code{' '}
                <span className='font-mono font-bold text-violet-400'>
                  FIRST20
                </span>{' '}
                to get 20% off!
              </p>
            </div>

            <h2 className='mb-3 text-xl font-bold'>Have a coupon?</h2>

            <div className='mt-3'>
              <TextField
                label='Coupon Code'
                name='couponCode'
                placeholder='Enter coupon code'
                labelClassName='text-gray-700'
                className='rounded-md p-2'
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button
                type='button'
                onClick={handleApplyCoupon}
                className='mt-4 rounded-md py-2 text-white'
                disabled={isApplyingCoupon}
              >
                {isApplyingCoupon ? (
                  <Loading02Icon className='h-5 w-5 animate-spin' fill='#fff' />
                ) : (
                  'Apply Coupon'
                )}
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
                  disabled={isProcessingPayment}
                  onClick={showRazorpay}
                >
                  {isProcessingPayment ? (
                    <Loading02Icon
                      className='h-5 w-5 animate-spin'
                      fill='#fff'
                    />
                  ) : (
                    'Proceed to Payment'
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

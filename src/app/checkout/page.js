// 'use client'

// import React, { useState } from 'react'
// import { ContainerOutline } from '@/components/shared/ContainerOutline'
// import { Divider } from '@/components/shared/Divider'
// import { Button } from '@/components/shared/Button'
// import { TextField } from '@/components/forms/TextField'

// import {
//   colors,
//   sharedInputStyles,
//   sharedButtonStyles,
// } from '@/components/shared/SharedStyle'

// function Checkout() {
//   const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false)

//   const cartItems = [
//     { name: 'DuoComfort Sofa Premium', price: 20 },
//     { name: 'IronOne Desk', price: 25 },
//   ]

//   const totalAmount = cartItems.reduce((total, item) => total + item.price, 0)

//   const handlePayment = () => {
//     setIsPaymentSuccessful(true)
//   }

//   return (
//     <div
//       className={`container mx-auto px-4 py-6 ${colors.sectionBg} max-w-5xl`}
//     >
//       <h1 className={`mb-4 text-2xl font-bold ${colors.primary}`}>Checkout</h1>

//       {!isPaymentSuccessful ? (
//         <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
//           {/* Shipping Information */}
//           <div
//             className={`rounded-lg border p-4 shadow-sm ${colors.sectionBg}`}
//           >
//             <h2 className={`mb-3 text-xl font-bold ${colors.primary}`}>
//               Payment Information
//             </h2>
//             <form className='space-y-2'>
//               <TextField
//                 label='Full Name'
//                 name='fullName'
//                 placeholder='John Doe'
//                 required
//                 labelClassName='text-gray-700' // Label color change
//                 className={`${sharedInputStyles} ${colors.inputBorder} ${colors.inputBg} ${colors.inputText} p-2`}
//               />
//               <TextField
//                 label='Email Address'
//                 name='email'
//                 placeholder='john@example.com'
//                 required
//                 labelClassName='text-blue-900' // Label color change
//                 className={`${sharedInputStyles} ${colors.inputBorder} ${colors.inputBg} ${colors.inputText} p-2`}
//               />
//               <TextField
//                 label='Phone Number'
//                 name='phone'
//                 placeholder='+1 234 567 890'
//                 required
//                 labelClassName='text-gray-700' // Label color change
//                 className={`${sharedInputStyles} ${colors.inputBorder} ${colors.inputBg} ${colors.inputText} p-2`}
//               />
//               <TextField
//                 label='Country'
//                 name='country'
//                 placeholder='United States'
//                 required
//                 labelClassName='text-gray-700' // Label color change
//                 className={`${sharedInputStyles} ${colors.inputBorder} ${colors.inputBg} ${colors.inputText} p-2`}
//               />
//               <TextField
//                 label='City'
//                 name='city'
//                 placeholder='New York'
//                 required
//                 labelClassName='text-gray-700' // Label color change
//                 className={`${sharedInputStyles} ${colors.inputBorder} ${colors.inputBg} ${colors.inputText} p-2`}
//               />
//               <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
//                 <TextField
//                   label='Status'
//                   name='status'
//                   placeholder='In-Progress'
//                   labelClassName='text-gray-700' // Label color change
//                   className={`${sharedInputStyles} ${colors.inputBorder} ${colors.inputBg} ${colors.inputText} p-2`}
//                 />
//                 <TextField
//                   label='Zip Code'
//                   name='zipCode'
//                   placeholder='12345'
//                   required
//                   labelClassName='text-gray-700' // Label color change
//                   className={`${sharedInputStyles} ${colors.inputBorder} ${colors.inputBg} ${colors.inputText} p-2`}
//                 />
//                 <TextField
//                   label='Additional Field'
//                   name='additionalField'
//                   placeholder='Any details'
//                   labelClassName='text-blue-700' // Label color change
//                   className={`${sharedInputStyles} ${colors.inputBorder} ${colors.inputBg} ${colors.inputText} p-2`}
//                 />
//               </div>
//             </form>
//           </div>

//           {/* Cart Review Section */}
//           <div
//             className={`rounded-lg border p-4 shadow-sm ${colors.sectionBg}`}
//           >
//             <h2 className={`mb-3 text-xl font-bold ${colors.primary}`}>
//               Review Your Cart
//             </h2>
//             <ul className='space-y-1'>
//               {cartItems.map((item) => (
//                 <li
//                   key={item.name}
//                   className='flex justify-between text-gray-800'
//                 >
//                   <p>{item.name}</p>
//                   <p>${item.price}</p>
//                 </li>
//               ))}
//             </ul>

//             <div className='mt-3 flex justify-between border-t pt-3 font-semibold text-gray-800'>
//               <p>Total</p>
//               <p>${totalAmount}</p>
//             </div>

//             <div className='mt-3'>
//               <TextField
//                 label='Coupon Code'
//                 name='couponCode'
//                 placeholder='Enter coupon code'
//                 labelClassName='text-gray-700' // Label color change
//                 className={`${sharedInputStyles} ${colors.inputBorder} ${colors.inputBg} ${colors.inputText} p-2`}
//               />
//               <Button
//                 className={`${sharedButtonStyles} ${colors.buttonBg} ${colors.buttonText} mt-2 w-full`}
//               >
//                 Apply Coupon
//               </Button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className='mt-6 rounded-lg bg-green-50 p-6 text-center shadow-md'>
//           <h2 className={`text-2xl font-bold ${colors.primary}`}>
//             Payment Successful!
//           </h2>
//           <p className='mt-4 text-lg text-gray-700'>
//             Thank you for your purchase.
//           </p>
//           <div className={`mt-6 rounded-lg border p-4 ${colors.sectionBg}`}>
//             <h3 className='text-lg font-semibold text-gray-800'>
//               Order Summary
//             </h3>
//             <ul className='mt-3'>
//               {cartItems.map((item) => (
//                 <li
//                   key={item.name}
//                   className='mb-2 flex justify-between text-gray-700'
//                 >
//                   <span>{item.name}</span>
//                   <span>${item.price}</span>
//                 </li>
//               ))}
//             </ul>
//             <div className='mt-3 flex justify-between border-t pt-3 font-semibold text-gray-800'>
//               <span>Total Amount</span>
//               <span>${totalAmount}</span>
//             </div>
//           </div>
//         </div>
//       )}

//       {!isPaymentSuccessful && (
//         <div className='mt-6 flex justify-end'>
//           <Button
//             onClick={handlePayment}
//             className={`${sharedButtonStyles} ${colors.buttonBg} ${colors.buttonText}`}
//           >
//             Proceed to Payment
//           </Button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Checkout

'use client'
import React from 'react'
import Payment from '@/components/payment/Payment'
import { HeroContainer } from '@/components/shared/HeroContainer'

export default function Checkout() {
  return (
    <>
      <HeroContainer bgGradientClassName='bottom-0 h-[calc(100%_+_320px)]'>
        <Payment />
      </HeroContainer>
    </>
  )
}

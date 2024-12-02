import React from 'react'
import { Button } from '../shared/Button'

export default function HeaderDashboard({
  selectedPatientDetails,
  userCredits,
  toggleModal,
}) {
  return (
    <div className='flex justify-between bg-pink-50 p-4'>
      <div>
        {selectedPatientDetails ? (
          <div className='p-4'>
            <h3 className='mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500'>
              Patient Details
            </h3>
            <p className='text-2xl font-bold text-gray-800'>
              {selectedPatientDetails.name}
            </p>
            <div className='flex items-center justify-start space-x-4 text-gray-600'>
              <p className='py-1 text-sm capitalize'>
                <span className='font-medium text-pink-700'>Age:</span>{' '}
                {selectedPatientDetails.age} years
              </p>
              <p className='py-1 text-sm capitalize'>
                <span className='font-medium text-pink-700'>Gender:</span>{' '}
                {selectedPatientDetails.gender}
              </p>
            </div>
          </div>
        ) : (
          <div className='p-4'>
            <h3 className='mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500'>
              Patient Details
            </h3>
            <p className='mb-2 text-2xl font-bold text-gray-800'>
              No Patient Selected
            </p>
            <div className='flex items-center gap-2 text-gray-600'>
              <span className='rounded-full border border-gray-200 px-3 py-1 text-sm'>
                Please select a patient to view details
              </span>
            </div>
          </div>
        )}
      </div>

      <div className='flex flex-col gap-3'>
        <div className='flex items-center gap-3'>
          <div className='rounded-lg bg-white px-4 py-2 shadow-sm'>
            <span className='font-medium text-gray-700'>Credits: </span>
            <span className='text-pink-600'>{userCredits}</span>
          </div>
          <Button className='rounded-lg px-4 py-2 font-medium text-white shadow-sm transition-all'>
            Upgrade
          </Button>
        </div>

        <button
          className='flex items-center justify-center gap-2 rounded-lg bg-pink-600 px-4 py-2 text-center font-medium text-white shadow-sm transition-all hover:bg-pink-700'
          onClick={toggleModal}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
            <polyline points='17 8 12 3 7 8' />
            <line x1='12' y1='3' x2='12' y2='15' />
          </svg>
          Upload Image
        </button>
      </div>
    </div>
  )
}

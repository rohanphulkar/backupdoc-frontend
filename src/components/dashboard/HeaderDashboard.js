import React from 'react'

export default function HeaderDashboard({
  selectedPatientName,
  userCredits,
  toggleModal,
}) {
  return (
    <div className='mx-2 mt-2 flex w-full justify-between border-2 bg-pink-100 shadow-lg'>
      <div className='flex-1'>
        <h2 className='items-center text-2xl font-bold text-gray-800'>
          {/* Removed the heading "Patient Information" */}
          {selectedPatientName ? (
            <div className='mt-4 rounded-lg bg-white p-4'>
              <h3 className='text-lg font-semibold text-gray-800'>Patient:</h3>
              <p className='text-gray-600'>{selectedPatientName}</p>
            </div>
          ) : (
            <p className='ml-6 mt-8 items-center text-start text-black'>
              Sample Patient
            </p>
          )}
        </h2>
      </div>
      <div className='mb-1 mr-3 mt-1 flex flex-col gap-2'>
        <div className='mb-2 flex items-center justify-between'>
          {' '}
          {/* Added mb-2 for margin-bottom */}
          <div className='flex items-center rounded-lg border-2 border-black bg-white px-4 py-2 text-black'>
            Credits: {userCredits}
          </div>
          <button className='ml-2 rounded-lg bg-blue-950 px-4 py-2 text-white hover:bg-blue-700'>
            Upgrade
          </button>
        </div>

        <div className='flex items-center'>
          <div className='flex-1'>
            <button
              className='rounded-lg border-2 border-black bg-white px-4 py-2 text-black transition duration-200 hover:bg-gray-200' // Consistent padding and border
              onClick={toggleModal}
            >
              + Upload Image
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

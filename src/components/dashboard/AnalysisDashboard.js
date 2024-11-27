import React, { useState } from 'react'
import AccuracyChecking from './AccuracyChecking' // Import AccuracyChecking component
import { Switch } from '@headlessui/react'

const AnalysisDashboard = ({
  image, // Selected image for analysis
  onClose, // Function to close the analysis view
  previousImages = [], // Array of previous images passed from ImageDashboard
  userCredits, // User's credits (from ImageDashboard)
  selectedPatientName, // Selected patient's name (from ImageDashboard)
}) => {
  const [accuracyLevel, setAccuracyLevel] = useState(50) // Default accuracy level
  const [enabledOne, setEnabledOne] = useState(false) // First switch state
  const [enabledTwo, setEnabledTwo] = useState(false) // Second switch state

  // Update accuracy level on mouse move
  const handleAccuracyChange = (e) => {
    const accuracy = Math.min(
      Math.max(0, (e.clientX / window.innerWidth) * 100),
      100
    ) // Calculate the percentage based on mouse position
    setAccuracyLevel(accuracy)
  }

  // Legend Data: Room names with percentage and colors
  const legends = [
    { name: 'Living Room', percentage: 50, color: 'bg-green-500' },
    { name: 'Kitchen', percentage: 70, color: 'bg-blue-500' },
    { name: 'Attic', percentage: 40, color: 'bg-yellow-500' },
    { name: 'Garage', percentage: 30, color: 'bg-red-500' },
    { name: 'Basement', percentage: 60, color: 'bg-purple-500' },
  ]

  return (
    <div className='relative flex flex-col bg-gray-100 dark:bg-gray-800'>
      <div className='p-6'>
        <div className='flex items-start justify-between space-x-6'>
          {/* Left Side: Selected Image and Previous Images Grid */}
          <div className='flex w-3/4 flex-col items-center'>
            {/* Display the selected image for analysis */}
            {image && (
              <div className='relative mb-4 flex flex-col items-center'>
                <img
                  src={URL.createObjectURL(image)}
                  alt='Selected for Analysis'
                  className='h-[400px] w-[500px] rounded-lg object-cover shadow-xl'
                />
              </div>
            )}

            {/* Grid of previous images */}
            {previousImages.length > 0 && (
              <div className='mb-4 grid grid-cols-8 gap-4 bg-white shadow-xl'>
                {previousImages.map((img, index) => (
                  <div key={index} className='relative p-2'>
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`Previous Upload ${index}`}
                      className='h-16 w-16 cursor-pointer object-cover'
                      onClick={() => console.log('Previous Image clicked')}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Accuracy Checking and Legends */}
          <div className='flex w-1/4 flex-col space-y-4'>
            {/* Accuracy Checking Section */}
            <div className='relative mb-4'>
              <AccuracyChecking
                accuracyLevel={accuracyLevel}
                onAccuracyChange={handleAccuracyChange}
              />
            </div>

            {/* Legends Section */}
            <div className='rounded-lg bg-white p-4 shadow-xl'>
              {legends.map((legend, index) => (
                <div key={index}>
                  <div className='flex items-center space-x-3'>
                    <div className={`h-4 w-4 ${legend.color}`}></div>
                    <span className='flex-1 font-semibold text-gray-700 dark:text-gray-300'>
                      {legend.name}
                    </span>
                    <span className='text-sm text-gray-500'>
                      {legend.percentage}%
                    </span>
                    <input
                      type='checkbox'
                      className='h-4 w-4 accent-blue-500' // Tailwind styling for the checkbox
                    />
                  </div>
                  <div className='mt-1 h-px w-full bg-gray-300' />
                </div>
              ))}
            </div>

            {/* Switches Section Below Legends */}
            <div className='mt-6 flex space-x-4'>
              {' '}
              {/* Changed space-y-3 to space-x-4 for horizontal spacing */}
              {/* First Switch */}
              <div className='flex h-24 w-32 flex-col items-center rounded-lg bg-white p-1 shadow-lg'>
                {' '}
                {/* Set fixed height and width */}
                <div className='flex items-center space-x-2'>
                  <span className='text-sm text-gray-700'>OFF</span>
                  <Switch
                    checked={enabledOne}
                    onChange={setEnabledOne}
                    className='group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-white/10'
                  >
                    <span
                      aria-hidden='true'
                      className='pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-7'
                    />
                  </Switch>
                </div>
                <span className='mt-10 text-xl font-semibold text-gray-700'>
                  {' '}
                  {/* Adjusted margin-top for better spacing */}
                  Pathology
                </span>
              </div>
              {/* Second Switch */}
              <div className='w-34 flex h-24 flex-col items-center rounded-lg bg-pink-700 p-1 shadow-lg'>
                {' '}
                {/* Set fixed height and width */}
                <div className='flex items-center space-x-2'>
                  <span className='text-sm text-gray-700'>ON</span>
                  <Switch
                    checked={enabledTwo}
                    onChange={setEnabledTwo}
                    className='group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-white/10'
                  >
                    <span
                      aria-hidden='true'
                      className='pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-7'
                    />
                  </Switch>
                </div>
                <span className='mt-10 text-xl font-semibold text-white'>
                  {' '}
                  {/* Adjusted margin-top for better spacing */}
                  Measurements
                </span>
              </div>
            </div>
            <div className='mr-2 mt-6 flex items-center gap-4'>
              <button className='ml-2 rounded-lg bg-blue-950 px-4 py-2 text-white hover:bg-blue-700'>
                Mail
              </button>
              <button className='ml-2 rounded-lg bg-blue-950 px-4 py-2 text-white hover:bg-blue-700'>
                Print
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Close Button */}
    </div>
  )
}

export default AnalysisDashboard

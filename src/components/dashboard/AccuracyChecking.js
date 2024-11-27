import React from 'react'

const AccuracyChecking = ({ accuracyLevel, onAccuracyChange }) => {
  return (
    <div className='mb-4 flex flex-col items-center space-y-2'>
      {/* Labels for Less Accuracy and More Accuracy */}
      <div className='flex w-full justify-between text-sm text-black'>
        <span className='flex-1 text-left'>Less Accuracy</span>{' '}
        {/* Align to the left */}
        <span className='flex-1 text-right'>More Accuracy</span>{' '}
        {/* Align to the right */}
      </div>

      <div
        className='relative h-1 w-full cursor-pointer overflow-hidden bg-gray-200'
        onMouseMove={onAccuracyChange}
      >
        <div
          className='absolute top-0 h-full bg-pink-400 duration-300'
          style={{ width: `${accuracyLevel}%` }} // Width based on accuracy level
        />
      </div>
    </div>
  )
}

export default AccuracyChecking

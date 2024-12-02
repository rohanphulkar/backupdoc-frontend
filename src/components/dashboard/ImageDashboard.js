'use client'

import React, { useState, useEffect } from 'react'
import HeaderDashboard from './HeaderDashboard'
import { ImageUpload } from './ImageUpload'
import AnalysisDashboard from './AnalysisDashboard'
import { api } from '@/api/api'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const ImageDashboard = ({ profile, selectedPatientDetails, id }) => {
  const [images, setImages] = useState([]) // Store image objects
  const [selectedImages, setSelectedImages] = useState(null) // Store selected images for analysis
  const [isModalOpen, setIsModalOpen] = useState(false) // Modal state
  const [darkMode, setDarkMode] = useState(false) // Dark mode toggle
  const [analyzedImages, setAnalyzedImages] = useState([]) // Track analyzed images
  const userCredits = profile?.credits || 0
  const router = useRouter()

  // Handle paste event (for pasting images directly)
  useEffect(() => {
    getXrays()
    const handlePaste = async (event) => {
      const items = event.clipboardData.items
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.type.startsWith('image')) {
          const file = item.getAsFile()
          await handleImageUpload(file)
        }
      }
    }
    window.addEventListener('paste', handlePaste)
    return () => window.removeEventListener('paste', handlePaste)
  }, [])

  const toggleModal = () => setIsModalOpen((prev) => !prev)

  const [isLoading, setIsLoading] = useState(false)
  const token = useSelector((state) => state.auth.token)

  async function getXrays() {
    try {
      const response = await api.get(`/patient/xray/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const result = await response.data
      const status = await response.status
      if (status === 200) {
        setImages(result.xrays) // Store the image objects directly
      } else {
        toast.error('Something went wrong!')
      }
    } catch (error) {
      console.log(error)
      if (error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Something went wrong!')
      }
    }
  }

  const handleImageUpload = async (image) => {
    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('file', image)
      const response = await api.post(`/patient/upload-xray/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const result = await response.data
      const status = await response.status
      if (status === 200) {
        getXrays() // Refresh images after upload
        setIsModalOpen(false)
        toast.success(result.message)
      } else {
        toast.error('Something went wrong!')
      }
    } catch (error) {
      console.log(error)
      if (error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Something went wrong!')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark')
    setDarkMode((prev) => !prev)
  }

  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeImage = async (id) => {
    setIsAnalyzing(true)
    try {
      const response = await api.post(
        `/predict/create-prediction/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const result = await response.data
      const status = await response.status
      if (status === 200) {
        router.push(`/analysis-dashboard/${result.prediction_id}`)
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
      setIsAnalyzing(false)
    }
  }

  const handleAnalyze = () => {
    if (!selectedImages) {
      alert('Please select an image for analysis!')
    } else {
      analyzeImage(selectedImages.id)
    }
  }

  const handleImageClick = (image) => {
    setSelectedImages((prev) => (prev === image ? null : image))
  }

  const handleDoubleClick = (image) => {
    if (image.annotated_image) {
      router.push(`/analysis-dashboard/${image.prediction_id}`)
    }
  }

  return (
    <div className='flex flex-col dark:bg-gray-800'>
      <HeaderDashboard
        userCredits={userCredits}
        selectedPatientDetails={selectedPatientDetails}
        toggleModal={toggleModal}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <div className='mx-auto w-full max-w-7xl px-4 py-6'>
        {/* Image Gallery Grid */}
        {images.length > 0 ? (
          <div className='grid grid-cols-2 gap-4 md:grid-cols-5'>
            {images.map((image, index) => (
              <div key={image.id} className='group'>
                <div
                  onClick={() =>
                    !image.annotated_image && handleImageClick(image)
                  }
                  className={`relative rounded-lg transition-all duration-200 ${
                    selectedImages === image
                      ? 'ring-4 ring-pink-500 ring-opacity-50'
                      : 'hover:ring-2 hover:ring-pink-300'
                  }`}
                >
                  {!image.annotated_image && (
                    <input
                      type='checkbox'
                      className='absolute left-2 top-2 z-10 h-5 w-5 cursor-pointer rounded-full border-2 border-pink-500 checked:bg-pink-500'
                      checked={selectedImages === image}
                      readOnly
                    />
                  )}
                  <img
                    src={image.annotated_image || image.original_image}
                    alt={`Upload ${index}`}
                    className='aspect-square max-h-64 w-full max-w-64 cursor-pointer rounded-lg object-cover shadow-lg transition-transform hover:scale-[1.02]'
                    onDoubleClick={() =>
                      image.annotated_image && handleDoubleClick(image)
                    }
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex h-48 items-center justify-center rounded-lg'>
            <p className='text-gray-500'>No images uploaded yet</p>
          </div>
        )}

        {/* Analyze Button */}
        <div className='fixed bottom-6 right-6'>
          <button
            onClick={handleAnalyze}
            disabled={!selectedImages}
            className='flex items-center gap-2 rounded-lg bg-pink-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-500 hover:bg-pink-700 hover:shadow-xl disabled:bg-gray-400 disabled:text-gray-600'
          >
            <svg
              className='h-5 w-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
              />
            </svg>
            Analyze
          </button>
        </div>
      </div>

      {/* Image Upload Modal */}
      {isModalOpen && (
        <ImageUpload
          isOpen={isModalOpen}
          onClose={toggleModal}
          onImageUpload={handleImageUpload}
          isLoading={isLoading}
        />
      )}

      {/* Analysis Loading Screen */}
      {isAnalyzing && analyzeLoader()}
    </div>
  )
}

export default ImageDashboard

function analyzeLoader() {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'>
      <div className='relative mx-auto h-[90dvh] w-[90%] max-w-2xl rounded-xl bg-white p-4 text-center shadow-2xl'>
        <div className='flex h-full flex-col overflow-hidden'>
          {/* Loader Animation */}
          <div className='relative mx-auto h-16 w-16 flex-shrink-0'>
            <div className='border-gradient-to-r absolute inset-0 animate-spin rounded-full border-b-4 border-t-4 from-pink-500 to-violet-500'></div>
            <div className='absolute inset-3'>
              <svg
                className='h-full w-full text-pink-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                />
              </svg>
            </div>
          </div>

          {/* Main Title */}
          <h2 className='mt-3 text-xl font-bold text-gray-800'>Analyzing...</h2>

          {/* Content Container with Auto Height */}
          <div className='flex-1 space-y-3 overflow-y-auto px-2 py-3 text-left'>
            {/* Processing Message */}
            <div className='rounded-lg bg-blue-50 p-3'>
              <h3 className='font-semibold text-blue-800'>Read Me!</h3>
              <p className='mt-1 text-sm text-blue-700'>
                We're currently processing your uploaded image using our
                state-of-the-art AI algorithm. This ensures that you receive the
                most accurate diagnostic predictions possible.
              </p>
              <p className='mt-1 text-sm text-blue-700'>
                This process usually takes between 8 to 30 seconds. We
                appreciate your patience.
              </p>
            </div>

            {/* Did You Know Section */}
            <div className='rounded-lg bg-purple-50 p-3'>
              <h3 className='font-semibold text-purple-800'>Did you know?</h3>
              <p className='mt-1 text-sm text-purple-700'>
                Our AI-powered diagnostic system is trained on over 100,000
                radiological images to provide you with reliable and precise
                results.
              </p>
            </div>

            {/* Disclaimer */}
            <div className='rounded-lg bg-amber-50 p-3'>
              <h3 className='font-semibold text-amber-800'>DISCLAIMER</h3>
              <p className='mt-1 text-sm text-amber-700'>
                The results provided by our AI-powered diagnostic system are
                intended to be a supplementary tool for informational purposes
                only.
              </p>
              <p className='mt-1 text-sm text-amber-700'>
                While we strive for accuracy, these results should not be relied
                upon for medical or dental decision-making.
              </p>
              <p className='mt-1 text-sm font-medium text-amber-800'>
                Always consult with a qualified medical or dental professional
                for a comprehensive diagnosis and treatment. Remember, only a
                doctor knows best when it comes to your health.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

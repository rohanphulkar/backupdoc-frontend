'use client'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { useParams } from 'next/navigation'
import { api } from '@/api/api'
import { toast } from 'sonner'
import { Loading02Icon } from 'hugeicons-react'
import { useRouter } from 'next/navigation'

const UploadModal = ({ isOpen, onClose, id, user, fetchXrays }) => {
  const [uploadPreview, setUploadPreview] = useState(null)
  const [image, setImage] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
    onDrop: ([file]) => {
      if (file) {
        setUploadPreview(URL.createObjectURL(file))
        setImage(file)
      }
    },
  })

  const handleUploadSubmit = async () => {
    if (!image) return

    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append('file', image)
      const { status } = await api.post(
        `/patient/upload-xray/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${user}` },
        }
      )

      if (status === 200) {
        toast.success('X-Ray uploaded successfully')
        fetchXrays()
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.error || 'Error uploading xray')
    } finally {
      setIsUploading(false)
      setUploadPreview(null)
      setImage(null)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 backdrop-blur-sm sm:p-4'>
      <div className='w-full max-w-[95%] rounded-lg border border-gray-800 bg-gray-900/90 p-4 shadow-xl backdrop-blur-xl sm:max-w-md sm:p-6'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-base font-semibold text-gray-100 sm:text-lg'>
            Upload X-Ray
          </h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-200'
          >
            <svg
              className='h-4 w-4 sm:h-5 sm:w-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        <div
          {...getRootProps()}
          className='cursor-pointer rounded-lg border-2 border-dashed border-gray-700 bg-gray-800/50 p-4 text-center hover:border-pink-500 sm:p-6'
        >
          <input {...getInputProps()} />
          {uploadPreview ? (
            <Image
              src={uploadPreview}
              alt='Preview'
              width={300}
              height={300}
              className='mx-auto max-h-[50vh] w-auto rounded-lg object-contain'
            />
          ) : (
            <div className='space-y-2'>
              <svg
                className='mx-auto h-6 w-6 text-gray-500 sm:h-8 sm:w-8'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                />
              </svg>
              <p className='text-xs text-gray-400 sm:text-sm'>
                Click or drag file to upload
              </p>
            </div>
          )}
        </div>

        <div className='mt-4 flex justify-end gap-2'>
          <button
            onClick={onClose}
            className='rounded-lg px-3 py-1.5 text-xs text-gray-400 hover:bg-gray-800/50 sm:px-4 sm:py-2 sm:text-sm'
            disabled={isUploading}
          >
            Cancel
          </button>
          <button
            onClick={handleUploadSubmit}
            disabled={!uploadPreview || isUploading}
            className={`rounded-lg px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm ${
              uploadPreview && !isUploading
                ? 'bg-pink-600/90 text-white hover:bg-pink-700/90'
                : 'cursor-not-allowed bg-gray-800/50 text-gray-500'
            }`}
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  )
}

function PatientHeader({ patient, doctor, id, user, fetchXrays }) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  return (
    <div className='mx-auto w-full max-w-7xl p-2'>
      <div className='rounded-lg border border-gray-800 bg-gray-800/90 p-3 shadow-sm backdrop-blur-xl sm:p-4'>
        <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
          <div className='flex items-center gap-4'>
            <div>
              <h1 className='text-lg font-bold text-gray-100 sm:text-xl'>
                {patient.first_name} {patient.last_name}
              </h1>
              <p className='mt-1 text-xs text-gray-400 sm:text-sm'>
                {patient.age} years • {patient.gender} • {patient.phone}
              </p>
            </div>
          </div>

          <div className='flex w-full items-center justify-between gap-3 sm:w-auto sm:gap-4'>
            <div className='rounded-lg bg-gray-600/50 px-3 py-1.5 shadow-sm backdrop-blur-sm sm:px-4 sm:py-2'>
              <p className='text-2xs text-gray-400 sm:text-xs'>Credits</p>
              <p className='text-base font-bold text-gray-100 sm:text-lg'>
                {doctor?.credits ?? 0}
              </p>
            </div>

            <button
              onClick={() => setIsUploadModalOpen(true)}
              className='rounded-lg bg-gray-600/50 px-3 py-1.5 text-xs font-medium text-gray-100 backdrop-blur-sm transition-all hover:bg-gray-700/50 active:scale-95 sm:px-4 sm:py-2 sm:text-sm'
            >
              Upload X-Ray
            </button>

            <button className='rounded-lg bg-gradient-to-r from-pink-600/90 to-purple-600/90 px-3 py-1.5 text-xs font-medium text-gray-100 shadow-lg backdrop-blur-sm transition-all hover:from-pink-700/90 hover:to-purple-700/90 hover:shadow-xl active:scale-95 sm:px-4 sm:py-2 sm:text-sm'>
              Upgrade Pro
            </button>
          </div>
        </div>
      </div>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        id={id}
        user={user}
        fetchXrays={fetchXrays}
      />
    </div>
  )
}

const PatientPage = () => {
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const user = useSelector((state) => state.auth.token)
  const [patient, setPatient] = useState({
    id: null,
    name: null,
    phone: null,
    gender: null,
    age: null,
    dateOfBirth: null,
  })
  const [doctor, setDoctor] = useState(null)
  const [xrays, setXrays] = useState([])
  const router = useRouter()

  const fetchPatient = async () => {
    try {
      const { data: result, status } = await api.get(`/patient/details/${id}`, {
        headers: { Authorization: `Bearer ${user}` },
      })
      if (status === 200) {
        setPatient(result.patient)
        setDoctor(result.doctor)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.error || 'Error fetching patient')
    }
  }

  const fetchXrays = async () => {
    try {
      const { data: result, status } = await api.get(`/patient/xray/${id}`, {
        headers: { Authorization: `Bearer ${user}` },
      })
      if (status === 200) {
        setXrays(result.xrays)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.error || 'Error fetching xrays')
    }
  }

  useEffect(() => {
    if (id && user) {
      fetchPatient()
      fetchXrays()
    }
  }, [id, user])

  const handleImageClick = (index) => {
    setSelectedImage(selectedImage === index ? null : index)
  }

  const handleAnalyze = async () => {
    try {
      setIsAnalyzing(true)
      const { data: result, status } = await api.get(
        `/predict/create-prediction/${selectedImage}`,
        {
          headers: { Authorization: `Bearer ${user}` },
        }
      )
      if (status === 200) {
        router.push(`/analysis-dashboard/${result.prediction_id}`)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.error || 'Error creating prediction')
    } finally {
      setSelectedImage(null)
      setIsAnalyzing(false)
    }
  }

  return (
    <div className='flex min-h-screen flex-col bg-gray-900'>
      <PatientHeader
        patient={patient}
        doctor={doctor}
        id={id}
        user={user}
        fetchXrays={fetchXrays}
      />

      <div className='mx-auto flex w-full max-w-7xl flex-1 p-2'>
        <div className='flex h-full w-full flex-col rounded-lg border border-gray-800 bg-gray-900/90 p-4 shadow-sm backdrop-blur-xl sm:p-6'>
          {doctor && doctor.credits <= 0 && (
            <div className='mb-4 rounded-lg border border-yellow-600/20 bg-yellow-500/10 p-4'>
              <div className='flex items-start'>
                <div className='flex-shrink-0'>
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className='ml-3'>
                  <h3 className='text-sm font-medium text-yellow-500'>No Credits Available</h3>
                  <div className='mt-2 text-sm text-yellow-400'>
                    <p>
                      You've used all your available credits. Please upgrade to our Pro plan to continue analyzing X-rays.
                    </p>
                  </div>
                  <div className='mt-4'>
                    <button className='inline-flex items-center rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400'>
                      Upgrade to Pro
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className='flex-1 overflow-y-auto'>
            <div className='xs:auto-rows-[theme(spacing.40)] xs:grid-cols-2 grid auto-rows-[theme(spacing.36)] grid-cols-1 gap-3 p-1 sm:auto-rows-[theme(spacing.44)] sm:grid-cols-3 md:auto-rows-[theme(spacing.48)] lg:grid-cols-4 xl:grid-cols-5'>
              {xrays?.map((image) => (
                <div
                  key={image.id}
                  onClick={() =>
                    !image.annotated_image && handleImageClick(image.id)
                  }
                  onDoubleClick={() =>
                    image.annotated_image &&
                    router.push(`/analysis-dashboard/${image.prediction_id}`)
                  }
                  className={`relative h-full ${image.annotated_image ? 'cursor-pointer' : 'cursor-pointer'} overflow-hidden rounded-lg ${
                    selectedImage === image.id ? 'ring-4 ring-pink-600' : ''
                  }`}
                >
                  <div className='relative h-full'>
                    <img
                      src={image.annotated_image || image.original_image}
                      alt={`X-Ray ${image.id}`}
                      className='absolute inset-0 h-full w-full object-cover'
                    />
                    {!image.annotated_image && (
                      <input
                        type='checkbox'
                        checked={selectedImage === image.id}
                        readOnly
                        className={`absolute left-2 top-2 h-3 w-3 rounded border-2 checked:border-pink-600 checked:bg-pink-600 sm:h-4 sm:w-4 ${
                          selectedImage === image.id
                            ? 'border-pink-600 bg-pink-600'
                            : 'border-gray-600 bg-gray-800/50'
                        }`}
                      />
                    )}
                    <div
                      className={`absolute inset-0 transition-colors ${
                        selectedImage === image.id
                          ? 'bg-pink-600/20'
                          : 'hover:bg-gray-800/50'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='mt-4 flex justify-end'>
            <button
              onClick={handleAnalyze}
              disabled={
                selectedImage === null || (doctor && doctor.credits <= 0)
              }
              className={`rounded-lg px-6 py-2 text-sm font-medium transition-all sm:px-8 sm:py-3 sm:text-base ${
                selectedImage !== null && doctor && doctor.credits > 0
                  ? 'bg-pink-600/90 text-gray-100 shadow-md backdrop-blur-sm hover:bg-pink-700/90 hover:shadow-lg'
                  : 'cursor-not-allowed bg-gray-800/50 text-gray-500'
              }`}
            >
              {isAnalyzing ? (
                <Loading02Icon className='h-5 w-5 animate-spin' fill='#fff' />
              ) : (
                'Analyze'
              )}
            </button>
          </div>
        </div>
      </div>

      {isAnalyzing && analyzeLoader()}
    </div>
  )
}

export default PatientPage

function analyzeLoader() {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-2 backdrop-blur-sm'>
      <div className='relative mx-auto h-[90vh] w-[95%] max-w-2xl rounded-xl border border-gray-800 bg-gray-900/90 p-3 text-center shadow-2xl backdrop-blur-xl sm:p-4'>
        <div className='flex h-full flex-col overflow-hidden'>
          <div className='relative mx-auto h-12 w-12 flex-shrink-0 sm:h-16 sm:w-16'>
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

          <h2 className='mt-3 text-lg font-bold text-gray-100 sm:text-xl'>
            Analyzing...
          </h2>

          <div className='flex-1 space-y-3 overflow-y-auto px-2 py-3 text-left'>
            <div className='rounded-lg border border-gray-700 bg-gray-800/50 p-3 backdrop-blur-sm'>
              <h3 className='text-sm font-semibold text-gray-100 sm:text-base'>
                Read Me!
              </h3>
              <p className='mt-1 text-xs text-gray-300 sm:text-sm'>
                We're currently processing your uploaded image using our
                state-of-the-art AI algorithm. This ensures that you receive the
                most accurate diagnostic predictions possible.
              </p>
              <p className='mt-1 text-xs text-gray-300 sm:text-sm'>
                This process usually takes between 8 to 30 seconds. We
                appreciate your patience.
              </p>
            </div>

            <div className='rounded-lg border border-gray-700 bg-gray-800/50 p-3 backdrop-blur-sm'>
              <h3 className='text-sm font-semibold text-gray-100 sm:text-base'>
                Did you know?
              </h3>
              <p className='mt-1 text-xs text-gray-300 sm:text-sm'>
                Our AI-powered diagnostic system is trained on over 100,000
                radiological images to provide you with reliable and precise
                results.
              </p>
            </div>

            <div className='rounded-lg border border-gray-700 bg-gray-800/50 p-3 backdrop-blur-sm'>
              <h3 className='text-sm font-semibold text-gray-100 sm:text-base'>
                DISCLAIMER
              </h3>
              <p className='mt-1 text-xs text-gray-300 sm:text-sm'>
                The results provided by our AI-powered diagnostic system are
                intended to be a supplementary tool for informational purposes
                only.
              </p>
              <p className='mt-1 text-xs text-gray-300 sm:text-sm'>
                While we strive for accuracy, these results should not be relied
                upon for medical or dental decision-making.
              </p>
              <p className='mt-1 text-xs font-medium text-gray-200 sm:text-sm'>
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

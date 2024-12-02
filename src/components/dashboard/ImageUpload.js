import { Loading02Icon } from 'hugeicons-react'
import { useState } from 'react'
import Dropzone from 'react-dropzone'

export const ImageUpload = ({ onImageUpload, onClose, isOpen, isLoading }) => {
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isClosing, setIsClosing] = useState(false)

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image (JPEG, PNG)')
      return false
    }
    return true
  }

  const handleUpload = (acceptedFiles) => {
    const file = acceptedFiles[0]
    console.log('File selected:', file)
    if (validateFile(file)) {
      setImageFile(file)

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    if (imageFile) {
      onImageUpload(imageFile)
    }
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 300)
  }

  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm transition-all duration-300 ease-in-out ${isClosing ? 'bg-opacity-0' : 'bg-opacity-50'} `}
          onClick={handleClose}
          style={{
            animation: isClosing
              ? 'fadeOut 0.3s ease-in-out'
              : 'fadeIn 0.3s ease-in-out',
          }}
        >
          <div
            className={`transform transition-all duration-300 ${
              isClosing
                ? 'translate-y-4 opacity-0'
                : 'translate-y-0 opacity-100'
            }`}
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: isClosing
                ? 'slideOut 0.3s ease-out'
                : 'slideIn 0.3s ease-out',
            }}
          >
            <div className='w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl'>
              <div className='flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-pink-50 to-pink-100 px-6 py-4'>
                <h1 className='text-xl font-semibold text-gray-800'>
                  X-Ray Image Upload
                </h1>
                <button
                  onClick={handleClose}
                  className='rounded-full p-2 text-gray-500 transition-all duration-200 hover:rotate-90 hover:bg-pink-200 hover:text-gray-700'
                >
                  <svg
                    className='h-6 w-6'
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

              <div className='p-6'>
                <div className='flex gap-6'>
                  <div className='flex-1'>
                    <Dropzone
                      onDrop={(acceptedFiles) => handleUpload(acceptedFiles)}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div
                          {...getRootProps()}
                          className='group relative cursor-pointer rounded-xl border-2 border-dashed border-gray-300 p-8 transition-all hover:border-pink-400'
                        >
                          <input {...getInputProps()} />
                          <div className='flex flex-col items-center justify-center space-y-4'>
                            <div className='rounded-full bg-pink-50 p-4 text-pink-500 transition-transform duration-300 group-hover:scale-110 group-hover:bg-pink-100'>
                              <svg
                                className='h-10 w-10'
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
                            </div>
                            <div className='text-center'>
                              <p className='text-lg font-medium text-gray-700'>
                                Drop your X-Ray image here
                              </p>
                              <p className='text-sm text-gray-500'>
                                or click to browse files
                              </p>
                            </div>
                            <span className='text-sm text-gray-400'>
                              Supported formats: JPEG, PNG
                            </span>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                  </div>

                  {preview && (
                    <div className='w-1/3'>
                      <div className='overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-2 transition-all duration-300'>
                        <p className='mb-2 text-sm font-medium text-gray-600'>
                          Preview:
                        </p>
                        <img
                          src={preview}
                          alt='Upload Preview'
                          className='h-48 w-full rounded-lg object-cover shadow-sm transition-transform duration-300 hover:scale-105'
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className='flex justify-end space-x-4 bg-gray-50 px-6 py-4'>
                <button
                  onClick={handleClose}
                  className='rounded-lg bg-gray-200 px-6 py-2 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-300 hover:shadow-md'
                >
                  Cancel
                </button>
                {preview && (
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className='rounded-lg bg-pink-600 px-6 py-2 font-medium text-white transition-all duration-200 hover:bg-pink-700 hover:shadow-md disabled:opacity-50'
                  >
                    {isLoading ? (
                      <Loading02Icon
                        className='h-5 w-5 animate-spin'
                        fill='#fff'
                      />
                    ) : (
                      'Upload'
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            @keyframes fadeOut {
              from {
                opacity: 1;
              }
              to {
                opacity: 0;
              }
            }
            @keyframes slideIn {
              from {
                transform: translateY(-20px);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
            @keyframes slideOut {
              from {
                transform: translateY(0);
                opacity: 1;
              }
              to {
                transform: translateY(20px);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      )}
    </>
  )
}

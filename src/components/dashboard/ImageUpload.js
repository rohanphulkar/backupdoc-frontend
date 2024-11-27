import { useState } from 'react'
import Dropzone from 'react-dropzone'

export const ImageUpload = ({ onImageUpload, onClose, isOpen }) => {
  const [imageFile, setImageFile] = useState(null) // Store image file
  const [preview, setPreview] = useState(null) // Preview image

  // Validate file type
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
    console.log('File uploaded:', file) // Debugging the uploaded file
    if (validateFile(file)) {
      setImageFile(file)

      // Create preview using FileReader
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result) // Set the preview result
        onImageUpload(file) // Upload the image to parent
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      {isOpen && (
        <div
          className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
          onClick={onClose} // Close modal if clicked outside
        >
          <div
            className='modal-dialog'
            onClick={(e) => e.stopPropagation()} // Prevent closing on inside clicks
          >
            <div className='modal-content w-full max-w-6xl bg-white'>
              <div className='modal-header border-b p-4'>
                <h1 className='modal-title fs-5'>X-Ray Uploader</h1>
                <button
                  type='button'
                  className='btn-close'
                  onClick={onClose}
                  aria-label='Close'
                />
              </div>
              <div className='modal-body p-6'>
                {/* Drag & Drop Upload */}
                <div className='upload-area mb-3 cursor-pointer border-2 border-dashed border-gray-300 p-6 text-center'>
                  <Dropzone
                    onDrop={(acceptedFiles) => handleUpload(acceptedFiles)}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} className='relative flex-col'>
                        <input {...getInputProps()} className='w-full' />
                        <div className='flex h-56 w-full items-center justify-center rounded-lg'>
                          <div>
                            <p className='mt-1.5 text-center font-medium'>
                              Drag & Drop to upload image
                            </p>
                            <p className='mt-1.5 text-center'>OR</p>
                            <div className='flex justify-center'>
                              <button
                                type='button'
                                className='mt-1.5 rounded-lg border border-blue-400 px-4 py-2'
                              >
                                Browse Files
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </div>

                {/* Image Preview */}
                {preview && (
                  <div className='preview-area row mt-3'>
                    <div className='col-12'>
                      <img
                        src={preview}
                        alt='Uploaded Preview'
                        className='max-w-full rounded-lg'
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className='modal-footer justify-between p-6'>
                <button
                  className='rounded bg-red-500 px-6 py-2 text-white'
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

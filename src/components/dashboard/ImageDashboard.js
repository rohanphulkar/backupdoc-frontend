import React, { useState, useEffect } from 'react'
import HeaderDashboard from './HeaderDashboard'
import { ImageUpload } from './ImageUpload'
import AnalysisDashboard from './AnalysisDashboard'

const ImageDashboard = ({ userCredits = 0, selectedPatientName = '' }) => {
  const [images, setImages] = useState([]) // Store images
  const [newImages, setNewImages] = useState([]) // Track newly uploaded images
  const [selectedImages, setSelectedImages] = useState([]) // Store selected images for analysis
  const [isModalOpen, setIsModalOpen] = useState(false) // Modal state
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false) // Analysis state
  const [selectedImage, setSelectedImage] = useState(null) // Image selected for analysis
  const [darkMode, setDarkMode] = useState(false) // Dark mode toggle
  const [analyzedImages, setAnalyzedImages] = useState([]) // Track analyzed images

  // Handle paste event (for pasting images directly)
  useEffect(() => {
    const handlePaste = (event) => {
      const items = event.clipboardData.items
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.type.startsWith('image')) {
          const file = item.getAsFile()
          setImages((prev) => [...prev, file])
          setNewImages((prev) => [...prev, file]) // Mark as newly uploaded
        }
      }
    }
    window.addEventListener('paste', handlePaste)
    return () => window.removeEventListener('paste', handlePaste)
  }, [])

  const toggleModal = () => setIsModalOpen((prev) => !prev)

  const handleImageUpload = (image) => {
    console.log('Image uploaded:', image)
    setImages((prev) => [...prev, image])
    setNewImages((prev) => [...prev, image]) // Track new images
    setIsModalOpen(false) // Close modal after upload
  }

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark')
    setDarkMode((prev) => !prev)
  }

  const handleAnalyze = () => {
    if (selectedImages.length === 0) {
      alert('Please select an image for analysis!')
    } else {
      setSelectedImage(selectedImages[0])
      setIsAnalysisOpen(true)
      setAnalyzedImages((prev) => [...prev, selectedImages[0]]) // Mark as analyzed
    }
  }

  const handleDoubleClick = (image) => {
    setSelectedImage(image)
    setIsAnalysisOpen(true)
    setAnalyzedImages((prev) => [...prev, image]) // Mark as analyzed
  }

  const closeAnalysis = () => {
    setSelectedImage(null)
    setIsAnalysisOpen(false)
  }

  return (
    <div className='relative flex flex-col bg-gray-100 dark:bg-gray-800'>
      <HeaderDashboard
        userCredits={userCredits}
        selectedPatientName={selectedPatientName}
        toggleModal={toggleModal}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      {!isAnalysisOpen ? (
        <div className='p-4'>
          {/* Latest Image Preview (Increased size for main image) */}
          {images.length > 0 && (
            <div className='flex justify-center py-4'>
              <div className='relative'>
                {/* Render checkbox only for newly uploaded images */}
                {newImages.includes(images[images.length - 1]) && (
                  <input
                    type='checkbox'
                    className='absolute left-2 top-2'
                    checked={selectedImages.includes(images[images.length - 1])}
                    onChange={() =>
                      setSelectedImages((prev) =>
                        prev.includes(images[images.length - 1])
                          ? prev.filter(
                              (img) => img !== images[images.length - 1]
                            )
                          : [...prev, images[images.length - 1]]
                      )
                    }
                  />
                )}
                {/* Main Image with Increased Size */}
                <img
                  src={URL.createObjectURL(images[images.length - 1])}
                  alt='Latest Upload'
                  className='rounded-lgobject-contain h-[400px] w-[450px] cursor-pointer shadow-xl'
                  onDoubleClick={() =>
                    handleDoubleClick(images[images.length - 1])
                  }
                />
              </div>
            </div>
          )}

          {/* Older Images Grid (with reduced size for the grid images) */}
          {images.length > 0 && (
            <div className='mt-4 grid grid-cols-6 gap-4 bg-white shadow-md'>
              {images.map((image, index) => (
                <div key={index} className='relative'>
                  {/* Only show checkbox for newly uploaded images */}
                  {newImages.includes(image) &&
                    !analyzedImages.includes(image) && (
                      <input
                        type='checkbox'
                        className='absolute left-2 top-2'
                        checked={selectedImages.includes(image)}
                        onChange={() =>
                          setSelectedImages((prev) =>
                            prev.includes(image)
                              ? prev.filter((img) => img !== image)
                              : [...prev, image]
                          )
                        }
                      />
                    )}
                  <div className='relative rounded-lg p-1'>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Upload ${index}`}
                      className='rounded-lg-cover h-16 w-16 cursor-pointer transition-all duration-200'
                      onDoubleClick={() => handleDoubleClick(image)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Analyze Button */}
          <div className='fixed bottom-4 right-4'>
            <button
              onClick={handleAnalyze}
              className='rounded bg-blue-600 px-6 py-2 text-white'
            >
              Analyze
            </button>
          </div>
        </div>
      ) : (
        <AnalysisDashboard
          image={selectedImage} // Correctly pass the selected image for analysis
          onClose={closeAnalysis} // Pass close function to close analysis
          previousImages={images} // Pass the images array (previous images)
          userCredits={userCredits} // Pass user's credits
          selectedPatientName={selectedPatientName} // Pass selected patient's name
        />
      )}

      {/* Image Upload Modal */}
      {isModalOpen && (
        <ImageUpload
          isOpen={isModalOpen}
          onClose={toggleModal}
          onImageUpload={handleImageUpload}
        />
      )}
    </div>
  )
}

export default ImageDashboard

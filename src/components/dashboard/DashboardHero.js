import React, { useState } from 'react'
import Image from 'next/image'
import logo from '@/images/logo.jpeg'
import Modal from '@/components/shared/Modal'
import PatientList from '@/components/dashboard/PatientList'
import ImageDashboard from '@/components/dashboard/ImageDashboard'
import AnalysisDashboard from '@/components/dashboard/AnalysisDashboard'

export const DashboardHero = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [patients, setPatients] = useState([{ id: 1, name: 'Sample Patient' }])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null) // For image analysis
  const [copiedImage, setCopiedImage] = useState(null) // For pasted image

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const addPatient = (patient) => {
    // Combine first and last name into one 'name' field
    const fullName = `${patient.first_name} ${patient.last_name}`
    const newPatient = { ...patient, name: fullName }

    setPatients([...patients, newPatient])
    setIsModalOpen(false)
  }

  const selectPatient = (patient) => {
    setSelectedPatient(patient)
    setSelectedImage(null) // Reset image selection when a new patient is selected
    setCopiedImage(null) // Reset pasted image selection
  }

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handlePaste = (e) => {
    const items = e.clipboardData.items
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile()
        setCopiedImage(URL.createObjectURL(blob)) // Save the pasted image as a URL
      }
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type.indexOf('image') !== -1) {
      setCopiedImage(URL.createObjectURL(file)) // Set the uploaded image as URL
    }
  }

  const dashboardProps = {
    searchTerm,
    setSearchTerm,
    isModalOpen,
    toggleModal,
    patients,
    setPatients,
    selectedPatient,
    selectPatient,
    filteredPatients,
    handleSearchChange,
    handlePaste,
    handleFileUpload,
    selectedImage,
    copiedImage,
    addPatient,
    openModal,
    closeModal,
  }

  return (
    <main
      className='h-screen w-full overflow-hidden bg-rose-950'
      onPaste={handlePaste}
    >
      <div className='mb-1 flex items-center justify-start bg-black'>
        <Image
          src={logo}
          alt='Company logo'
          className='h-12 w-auto rounded-full border-4 border-white'
        />
        <h1 className='ml-4 text-3xl font-bold text-white'>BackupDoc.AI</h1>
      </div>

      <div className='flex h-full w-full overflow-hidden'>
        {/* Left Section */}
        <div className='flex h-full w-1/4 flex-col bg-white'>
          {/* Patient List with Search Input */}
          <div className='search flex items-center border bg-pink-900 p-4 shadow-sm'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-search mr-2 text-white'
              viewBox='0 0 16 16'
            >
              <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0' />
            </svg>
            <input
              type='search'
              id='search-input'
              className='w-full bg-gray-100 p-2 text-black placeholder-black outline-none'
              placeholder='Search'
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* List of Patients */}
          <ul className='mt-4 space-y-3'>
            {filteredPatients.map((patient) => (
              <li
                key={patient.id}
                className='cursor-pointer p-2 text-black transition hover:bg-pink-900'
                onClick={() => selectPatient(patient)}
              >
                {patient.name} {/* Display full name here */}
              </li>
            ))}
          </ul>

          {/* Image Upload Section moved to the bottom */}
          <div
            className='mx-auto mb-16 mt-auto flex h-auto w-80 flex-col justify-between rounded-lg bg-white p-4 text-center text-white shadow-rounded-custom transition duration-300'
            onPaste={handlePaste}
          >
            <div className='flex-grow'>
              <div className='w-full rounded-t-lg bg-pink-200 p-2'>
                <h2 className='font-bold text-black'>Quick Access</h2>
              </div>
              <h2 className='font-bold text-black'>Upload Image</h2>
              <p className='mb-2 mt-2 break-words text-sm text-black'>
                Drop files here or copy-paste here
              </p>
            </div>

            <div className='mt-6'>
              <button
                className='rounded-lg border-2 bg-white px-6 py-2 text-black'
                onClick={() => document.getElementById('file-input').click()} // Trigger file input click
              >
                + Upload an Image
              </button>
              {/* Hidden file input */}
              <input
                type='file'
                id='file-input'
                accept='image/*'
                onChange={handleFileUpload}
                className='hidden'
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className='flex flex-grow flex-col bg-gray-100'>
          {/* Main content area */}
          {!selectedPatient ? (
            <div className='flex h-full items-center justify-center'>
              <button
                className='flex items-center justify-between p-6 text-xl text-black transition-all'
                onClick={openModal}
              >
                Create Patient List
              </button>
            </div>
          ) : (
            <div className='flex h-full w-full flex-col rounded-lg bg-white shadow-md'>
              {/* Your custom components */}
              {children && React.cloneElement(children, dashboardProps)}
            </div>
          )}
        </div>
      </div>

      {/* Patient List Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <PatientList onAddPatient={addPatient} />
        </Modal>
      )}
    </main>
  )
}

export default DashboardHero

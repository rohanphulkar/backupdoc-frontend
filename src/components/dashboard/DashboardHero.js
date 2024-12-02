'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import logo from '@/images/logo.jpeg'
import Modal from '@/components/shared/Modal'
import PatientList from '@/components/dashboard/PatientList'
import { api } from '@/api/api'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { useParams, useRouter, usePathname } from 'next/navigation'

export const DashboardHero = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [patients, setPatients] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [copiedImage, setCopiedImage] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedPatientDetails, setSelectedPatientDetails] = useState(null)
  const [profile, setProfile] = useState(null)
  const user = useSelector((state) => state.auth.token)
  const router = useRouter()
  const { id } = useParams()
  const pathname = usePathname()
  const isAnalysisDashboard = pathname?.includes('analysis-dashboard')

  useEffect(() => {
    if (id && patients.length > 0) {
      const patient = patients.find((patient) => patient.id === id)
      if (patient) {
        setSelectedPatient(patient)
        const patientDetails = patients.filter(
          (patient) => patient.id === id
        )[0]
        setSelectedPatientDetails({
          name: `${patientDetails?.first_name} ${patientDetails?.last_name}`,
          age: patientDetails?.age,
          gender: patientDetails?.gender,
        })
      }
    }
  }, [id, patients])

  const fetchProfile = async () => {
    try {
      const response = await api.get('/user/profile', {
        headers: { Authorization: `Bearer ${user}` },
      })
      const result = await response.data
      const status = await response.status
      if (status === 200) {
        setProfile(result?.user)
      } else {
        toast.error('Something went wrong.')
      }
    } catch (error) {
      console.error(error)
      if (error.response) {
        toast.error(error.response.data.error)
      } else {
        toast.error('Something went wrong.')
      }
    }
  }

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

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
    setPatients([...patients, patient])
    setIsModalOpen(false)
  }

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient)
    setSelectedImage(null)
    setCopiedImage(null)
    const patientDetails = patients.filter((patient) => patient.id === id)[0]
    setSelectedPatientDetails({
      name: `${patientDetails?.first_name} ${patientDetails?.last_name}`,
      age: patientDetails?.age,
      gender: patientDetails?.gender,
    })
  }

  const filteredPatients = patients.filter(
    (patient) =>
      `${patient.first_name} ${patient.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)
  )

  const handlePaste = (e) => {
    const items = e.clipboardData.items
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile()
        const imageUrl = URL.createObjectURL(blob)
        setCopiedImage(imageUrl)
        toast.success('Image pasted successfully!')
      }
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(files[0])
      setCopiedImage(imageUrl)
      toast.success('Image dropped successfully!')
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type.indexOf('image') !== -1) {
      const imageUrl = URL.createObjectURL(file)
      setCopiedImage(imageUrl)
      toast.success('Image uploaded successfully!')
    }
  }

  useEffect(() => {
    const handleGlobalPaste = (e) => {
      handlePaste(e)
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('paste', handleGlobalPaste)
      return () => window.removeEventListener('paste', handleGlobalPaste)
    }
  }, [])

  const dashboardProps = {
    searchTerm,
    setSearchTerm,
    isModalOpen,
    toggleModal,
    patients,
    setPatients,
    selectedPatient,
    handleSelectPatient,
    selectedPatientDetails,
    filteredPatients,
    handleSearchChange,
    handlePaste,
    handleFileUpload,
    selectedImage,
    copiedImage,
    addPatient,
    openModal,
    closeModal,
    id,
    profile,
  }

  const fetchPatients = async () => {
    try {
      const response = await api.get('/patient/doctor', {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      })
      if (response.status === 200) {
        setPatients(response.data.patients || [])
      } else {
        toast.error('Failed to fetch patients')
      }
    } catch (error) {
      console.error('Error fetching patients:', error)
      toast.error(error.response?.data?.error || 'Failed to fetch patients')
    }
  }

  useEffect(() => {
    if (user) {
      fetchPatients()
    }
  }, [user])

  return (
    <div className='h-screen w-full overflow-hidden bg-rose-950'>
      <div className='mb-1 flex items-center justify-start bg-black'>
        <div className='relative h-12 w-12'>
          <Image
            src={logo}
            alt='Company logo'
            className='rounded-full border-4 border-white object-cover'
            fill
            priority
          />
        </div>
        <h1 className='ml-4 text-3xl font-bold text-white'>BackupDoc.AI</h1>
      </div>

      <div className='flex h-full w-full overflow-hidden'>
        {/* Left Section */}
        <div className='flex h-full w-1/4 flex-col bg-white'>
          {/* Search Section */}
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
              placeholder='Search by name or phone'
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Patient List */}
          <div className='flex-1 overflow-y-auto'>
            {filteredPatients.length > 0 ? (
              <ul className='divide-y divide-gray-200'>
                {filteredPatients.map((patient) => (
                  <li
                    key={patient.id}
                    className={`cursor-pointer p-4 transition hover:bg-pink-100 ${
                      selectedPatient?.id === patient.id ? 'bg-pink-200' : ''
                    }`}
                    onClick={() => {
                      handleSelectPatient(patient)
                      router.push(`/dashboard/${patient.id}`)
                    }}
                  >
                    <div className='flex flex-col'>
                      <span className='font-semibold text-gray-800'>
                        {patient.first_name} {patient.last_name}
                      </span>
                      <div className='mt-1 flex gap-4 text-xs text-gray-500'>
                        <span>Age: {patient.age}</span>
                        <span>Gender: {patient.gender}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className='p-4 text-center text-gray-500'>
                No patients found
              </div>
            )}
          </div>

          {/* Quick Access Section */}
          <div
            className={`m-4 mb-16 rounded-lg bg-white p-4 shadow-lg transition-all ${
              isDragging
                ? 'border-2 border-dashed border-pink-500'
                : 'border border-gray-200'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className='rounded-t-lg bg-pink-100 p-2'>
              <h2 className='font-bold text-gray-800'>Quick Access</h2>
            </div>

            {copiedImage ? (
              <div className='mt-3 text-center'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={copiedImage}
                  alt='Uploaded/Pasted'
                  className='mx-auto max-h-32 rounded-lg object-cover'
                />
                <button
                  className='mt-2 rounded-lg bg-red-500 px-4 py-1 text-sm text-white hover:bg-red-600'
                  onClick={() => setCopiedImage(null)}
                >
                  Clear Image
                </button>
              </div>
            ) : (
              <div className='mt-3 text-center'>
                <p className='text-sm text-gray-600'>
                  Drop images here, paste from clipboard,
                  <br />
                  or click to upload
                </p>
                <button
                  className='mt-2 rounded-lg bg-pink-600 px-6 py-2 text-white transition hover:bg-pink-700'
                  onClick={() => document.getElementById('file-input').click()}
                >
                  Upload Image
                </button>
                <input
                  type='file'
                  id='file-input'
                  accept='image/*'
                  onChange={handleFileUpload}
                  className='hidden'
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className='flex flex-grow flex-col bg-gray-100'>
          {(!selectedPatient ||
            selectedPatient.id === null ||
            id === undefined) &&
          !isAnalysisDashboard ? (
            <div className='flex h-full items-center justify-center'>
              <button
                className='rounded-lg bg-pink-600 px-8 py-4 text-xl text-white transition-all hover:bg-pink-700'
                onClick={openModal}
              >
                Add New Patient
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

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          showCloseButton={false}
          className='mx-auto w-full max-w-lg'
        >
          <PatientList onAddPatient={addPatient} onClose={closeModal} />
        </Modal>
      )}
    </div>
  )
}

export default DashboardHero

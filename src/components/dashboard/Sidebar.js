'use client'

import { useRouter } from 'next/navigation'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/images/logo.jpeg'
import { Loading02Icon, Menu02Icon } from 'hugeicons-react'
import { api } from '@/api/api'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

export default function Sidebar({ children }) {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const sidebarRef = useRef(null)
  const user = useSelector((state) => state.auth.token)
  const [patients, setPatients] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const fetchPatients = async () => {
    try {
      const response = await api.get('/patient/doctor', {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      })
      const { data: result, status } = response
      if (status === 200) {
        setPatients(result.patients)
      } else {
        toast.error('Error fetching patients')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || 'Error fetching patients')
    }
  }

  useEffect(() => {
    if (user) {
      fetchPatients()
    }
  }, [user])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsModalOpen(false)
      setIsClosing(false)
    }, 300)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !isModalOpen &&
        window.innerWidth < 768
      ) {
        setIsSidebarOpen(false)
      }
    }

    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isModalOpen])

  const addNewPatient = useCallback((patient) => {
    if (patient) {
      setPatients((prevPatients) => [patient, ...prevPatients])
    }
  }, [])

  const searchPatient = useCallback(
    async (searchTerm = '') => {
      if (!user) return

      try {
        const response = await api.get(`/patient/search?query=${searchTerm}`, {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        })
        const { data: result, status } = response
        if (status === 200) {
          setPatients(result.patients)
        } else {
          toast.error('Error searching patient')
        }
      } catch (error) {
        console.error(error)
        toast.error(error.response?.data?.error || 'Error searching patient')
      }
    },
    [user]
  )

  useEffect(() => {
    setIsSearching(true)
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        searchPatient(searchTerm).finally(() => setIsSearching(false))
      } else {
        fetchPatients().finally(() => setIsSearching(false))
      }
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, searchPatient])

  const deletePatient = async (patientId) => {
    try {
      const response = await api.delete(`/patient/delete/${patientId}`, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      })
      const { data: result, status } = response
      if (status === 200) {
        toast.success(result.message)
        setPatients((prevPatients) =>
          prevPatients.filter((patient) => patient.id !== patientId)
        )
      } else {
        toast.error('Error deleting patient')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.error || 'Error deleting patient')
    }
  }

  return (
    <div className='flex min-h-screen flex-col bg-gray-900 lg:flex-row'>
      <div className='sticky inset-x-0 top-0 z-20 border-y border-gray-800 bg-gray-900/95 px-4 backdrop-blur-xl sm:px-6 lg:hidden lg:px-8'>
        <div className='flex items-center py-2'>
          <button
            type='button'
            onClick={toggleSidebar}
            className='flex size-8 items-center justify-center gap-x-2 rounded-lg border border-gray-700 text-gray-400 hover:bg-gray-800/50 focus:outline-none'
            aria-label='Toggle navigation'
          >
            <span className='sr-only'>Toggle Navigation</span>
            <Menu02Icon className='size-5' />
          </button>
        </div>
      </div>

      <div
        ref={sidebarRef}
        className={`flex h-screen flex-col overflow-hidden transition-transform duration-300 ease-in-out md:w-72 md:border-e lg:block lg:translate-x-0 lg:border-gray-800 lg:bg-gray-900/95 ${
          isSidebarOpen
            ? 'fixed inset-y-0 start-0 z-[60] w-72 translate-x-0 border-e border-gray-800 bg-gray-900/95 shadow-lg backdrop-blur-xl'
            : 'fixed -translate-x-full'
        }`}
      >
        <div className='flex h-full flex-col'>
          <button
            onClick={toggleSidebar}
            className='absolute right-4 top-4 rounded-lg p-1 text-gray-400 hover:bg-pink-900/50 lg:hidden'
          >
            <svg
              className='size-6'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>

          <div className='flex items-center gap-2 border-b border-gray-800 px-6 py-4'>
            <Image
              src={logo}
              alt='Company Logo'
              width={40}
              height={40}
              className='rounded-full shadow-sm ring-2 ring-gray-500'
            />
            <span className='text-xl font-bold text-gray-100'>BackupDoc</span>
          </div>

          <div className='p-4'>
            <div className='relative mb-3'>
              <input
                type='text'
                placeholder='Search patients...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2 text-sm text-gray-300 placeholder-gray-500 backdrop-blur-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500'
              />
              {isSearching ? (
                <Loading02Icon className='absolute right-3 top-2.5 size-4 animate-spin text-gray-500' />
              ) : (
                <svg
                  className='absolute right-3 top-2.5 size-4 text-gray-500'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              )}
            </div>
            <button
              onClick={openModal}
              className='group flex w-full transform items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-pink-600 to-pink-400 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-pink-700 hover:to-pink-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 active:scale-95'
            >
              <svg
                className='size-5 transform transition-transform duration-200 group-hover:rotate-180'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 4v16m8-8H4'
                />
              </svg>
              Add Patient
            </button>
          </div>

          <div className='flex-1 overflow-hidden px-4'>
            <h3 className='mb-2 text-sm font-semibold text-gray-400'>
              Patients
            </h3>
            <div className='flex max-h-[calc(100vh-250px)] flex-col gap-2 overflow-y-auto pr-2 [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-thumb]:bg-pink-600 hover:[&::-webkit-scrollbar-thumb]:bg-pink-500 [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar]:w-2'>
              {patients.map((patient) => (
                <div key={patient.id} className='group relative'>
                  <Link
                    href={`/dashboard/${patient.id}`}
                    className='block cursor-pointer rounded-lg bg-gray-800/50 p-3 backdrop-blur-sm transition-all hover:bg-pink-900/30 hover:shadow-sm'
                  >
                    <div className='text-sm font-medium text-gray-200'>
                      {patient.first_name} {patient.last_name}
                    </div>
                    <div className='mt-1 flex items-center gap-2 text-xs text-gray-400'>
                      <span>{patient.age} years</span>
                      <span>•</span>
                      <span>{patient.gender}</span>
                    </div>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      if (
                        window.confirm(
                          'Are you sure you want to delete this patient?'
                        )
                      ) {
                        deletePatient(patient.id)
                      }
                    }}
                    className='absolute right-2 top-2 hidden rounded-full p-1 text-gray-400 hover:bg-pink-600/20 hover:text-pink-500 group-hover:block'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='size-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='flex-1 overflow-auto lg:ml-72'>
        <div className='container mx-auto bg-gray-900/95 p-4 backdrop-blur-xl'>
          {React.cloneElement(children, { setIsModalOpen })}
        </div>
      </div>

      <AddPatientModal
        isOpen={isModalOpen}
        onClose={closeModal}
        isClosing={isClosing}
        user={user}
        onPatientAdded={addNewPatient}
      />
    </div>
  )
}

function AddPatientModal({ isOpen, onClose, isClosing, user, onPatientAdded }) {
  const modalRef = useRef(null)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    age: '',
    date_of_birth: '',
    gender: 'male',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      phone: '',
      age: '',
      date_of_birth: '',
      gender: 'male',
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (Object.values(formData).some((value) => value === '')) {
      toast.error('Please fill in all fields')
      return
    }

    setIsLoading(true)
    try {
      const response = await api.post('/patient/create', formData, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      })
      const { data: result, status } = response
      if (status === 201) {
        toast.success(result.message)
        onPatientAdded?.(result.patient)
        resetForm()
        onClose()
      } else {
        toast.error('Something went wrong')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.error || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-md transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        animation: isClosing
          ? 'fadeOut 300ms ease-in-out forwards'
          : 'fadeIn 300ms ease-in-out forwards',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      }}
    >
      <div
        ref={modalRef}
        className='mx-4 w-full max-w-md transform rounded-lg bg-gray-900/90 p-4 shadow-2xl backdrop-blur-lg sm:mx-0 sm:p-6'
        style={{
          animation: isClosing
            ? 'slideOut 300ms ease-in-out forwards'
            : 'slideIn 300ms ease-in-out forwards',
        }}
      >
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='bg-gradient-to-r from-pink-400 to-pink-300 bg-clip-text text-xl font-bold text-transparent sm:text-2xl'>
            Add New Patient
          </h2>
          <button
            onClick={onClose}
            className='transform rounded-full p-1 text-gray-400 transition-all duration-200 hover:bg-pink-900/50 hover:text-pink-300 active:scale-90'
          >
            <svg
              className='size-5 sm:size-6'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
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
        <form onSubmit={handleSubmit} className='space-y-3 sm:space-y-4'>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4'>
            <div>
              <label className='mb-1 block text-sm font-medium text-gray-300'>
                First Name
              </label>
              <input
                type='text'
                name='first_name'
                value={formData.first_name}
                onChange={handleInputChange}
                className='w-full transform rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-gray-200 transition-all duration-200 hover:border-pink-500 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400'
                required
              />
            </div>
            <div>
              <label className='mb-1 block text-sm font-medium text-gray-300'>
                Last Name
              </label>
              <input
                type='text'
                name='last_name'
                value={formData.last_name}
                onChange={handleInputChange}
                className='w-full transform rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-gray-200 transition-all duration-200 hover:border-pink-500 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400'
                required
              />
            </div>
          </div>
          <div>
            <label className='mb-1 block text-sm font-medium text-gray-300'>
              Phone
            </label>
            <input
              type='tel'
              name='phone'
              value={formData.phone}
              onChange={handleInputChange}
              className='w-full transform rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-gray-200 transition-all duration-200 hover:border-pink-500 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400'
              required
            />
          </div>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4'>
            <div>
              <label className='mb-1 block text-sm font-medium text-gray-300'>
                Age
              </label>
              <input
                type='number'
                name='age'
                value={formData.age}
                onChange={handleInputChange}
                className='w-full transform rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-gray-200 transition-all duration-200 hover:border-pink-500 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400'
                required
              />
            </div>
            <div>
              <label className='mb-1 block text-sm font-medium text-gray-300'>
                Date of Birth
              </label>
              <input
                type='date'
                name='date_of_birth'
                value={formData.date_of_birth}
                onChange={handleInputChange}
                className='w-full transform rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-gray-200 transition-all duration-200 hover:border-pink-500 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400'
                required
              />
            </div>
          </div>
          <div>
            <label className='mb-1 block text-sm font-medium text-gray-300'>
              Gender
            </label>
            <select
              name='gender'
              value={formData.gender}
              onChange={handleInputChange}
              className='w-full transform rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-gray-200 transition-all duration-200 hover:border-pink-500 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400'
              required
            >
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
            </select>
          </div>
          <div className='flex flex-col gap-2 pt-4 sm:flex-row sm:justify-end'>
            <button
              type='button'
              onClick={onClose}
              className='w-full transform rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-gray-700/50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 active:scale-95 sm:w-auto sm:px-6'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isLoading}
              className='w-full transform rounded-lg bg-gradient-to-r from-pink-600 to-pink-400 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-pink-700 hover:to-pink-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 active:scale-95 sm:w-auto sm:px-6'
            >
              {isLoading ? (
                <Loading02Icon className='h-5 w-5 animate-spin' fill='#fff' />
              ) : (
                'Add Patient'
              )}
            </button>
          </div>
        </form>
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
            opacity: 0;
            transform: scale(0.95) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes slideOut {
          from {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to {
            opacity: 0;
            transform: scale(0.95) translateY(-20px);
          }
        }
      `}</style>
    </div>
  )
}

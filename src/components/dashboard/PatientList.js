import { useState } from 'react'
import Swal from 'sweetalert2'

export default function PatientList({ onAddPatient, onClose }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    mobile: '',
    age: '',
    date_of_birth: '',
    gender: 'Male', // Default value
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const patientData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      mobile: formData.mobile,
      age: Number(formData.age),
      date_of_birth: new Date(formData.date_of_birth)
        .toISOString()
        .split('T')[0],
      gender: formData.gender,
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/patient/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          `Error: ${errorData.detail || 'Network response was not ok'}`
        )
      }

      const data = await response.json()
      console.log('Patient created successfully:', data)

      // Show success SweetAlert
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Patient created successfully!',
        showConfirmButton: false,
        timer: 1500,
      })

      // Call the onAddPatient function to add the patient to the list in the parent
      onAddPatient(data)

      // Close the modal if creation is successful
      if (typeof onClose === 'function') {
        onClose()
      }
    } catch (error) {
      console.error('Error creating patient:', error)

      // Show error SweetAlert
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong!',
        text: error.message || 'Please try again.',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  return (
    <div className='w-full max-w-md rounded-lg bg-gradient-to-r from-violet-200/5 to-violet-200/10 p-6 shadow-lg'>
      {/* Close button in the top-right corner */}
      <button
        onClick={onClose}
        className='absolute text-violet-100/75 hover:text-gray-900'
      >
        ✕ /{' '}
      </button>

      <h2 className='mb-4 text-center text-xl font-semibold'>
        Patient Details
      </h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='block text-sm font-medium text-gray-700'>
            First Name:
          </label>
          <input
            type='text'
            name='first_name'
            value={formData.first_name}
            onChange={handleChange}
            className='mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>
        <div className='mb-3'>
          <label className='block text-sm font-medium text-gray-700'>
            Last Name:
          </label>
          <input
            type='text'
            name='last_name'
            value={formData.last_name}
            onChange={handleChange}
            className='mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>
        <div className='mb-3'>
          <label className='block text-sm font-medium text-gray-700'>
            Mobile No:
          </label>
          <input
            type='text'
            name='mobile'
            value={formData.mobile}
            onChange={handleChange}
            className='mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>
        <div className='mb-3'>
          <label className='block text-sm font-medium text-gray-700'>
            Age:
          </label>
          <input
            type='number'
            name='age'
            value={formData.age}
            onChange={handleChange}
            className='mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>
        <div className='mb-3'>
          <label className='block text-sm font-medium text-gray-700'>
            Date of Birth:
          </label>
          <input
            type='date'
            name='date_of_birth'
            value={formData.date_of_birth}
            onChange={handleChange}
            className='mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Gender:
          </label>
          <select
            name='gender'
            value={formData.gender}
            onChange={handleChange}
            className='mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
        </div>

        <div className='mt-4 flex justify-between'>
          <button
            type='button'
            onClick={onClose}
            className='rounded-lg bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
          >
            Create Patient
          </button>
        </div>
      </form>
    </div>
  )
}

import { api } from '@/api/api'
import { Loading02Icon } from 'hugeicons-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

export default function PatientList({ onClose }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '', 
    phone: '',
    age: '',
    date_of_birth: '',
    gender: 'male'
  })

  const token = useSelector((state) => state.auth.token)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await api.post('/patient/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 201) {
        toast.success(response.data.message)
        onClose()
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Something went wrong'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full p-6'>
      <h2 className='mb-4 text-center text-xl font-semibold'>
        Add New Patient
      </h2>

      <form onSubmit={handleSubmit}>
        <div className='space-y-3'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              First Name
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

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Last Name
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

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Phone Number
            </label>
            <input
              type='tel'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              className='mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Age
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

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Date of Birth
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

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Gender
            </label>
            <select
              name='gender'
              value={formData.gender}
              onChange={handleChange}
              className='mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
            </select>
          </div>
        </div>

        <div className='mt-6 flex justify-end gap-3'>
          <button
            type='button'
            onClick={onClose}
            className='rounded-lg bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={loading}
            className='rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50'
          >
            {loading ? (
              <Loading02Icon className='h-5 w-5 animate-spin' />
            ) : (
              'Add Patient'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import { Button } from '@/components/shared/Button'
import { TextField } from '@/components/forms/TextField'
import { SelectField } from '@/components/forms/SelectField'
import { api } from '@/api/api'
import { toast } from 'sonner'
import { Loading02Icon } from 'hugeicons-react'

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)

  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    topic: 'General',
    company_name: '',
    company_size: '1-10',
    query: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isFormComplete = Object.values(data).every((field) => field.trim() !== '')
    
    if (!isFormComplete) {
      toast.error('Please fill in all fields before submitting.')
      return
    }

    setIsLoading(true)
    try {
      const { status } = await api.post('/contact', data)
      if (status === 201) {
        toast.success('Your query has been submitted successfully')
      } else {
        toast.error('Something went wrong!')
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  return (
    <form method='POST' onSubmit={handleSubmit}>
      <div className='space-y-8 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 sm:space-y-0'>
        <TextField
          label='First name'
          name='first_name'
          autoComplete='given-name'
          placeholder='Johnny'
          required
          onChange={handleChange}
          value={data.first_name}
        />

        <TextField
          label='Last name'
          name='last_name'
          autoComplete='family-name'
          placeholder='Bravo'
          required
          onChange={handleChange}
          value={data.last_name}
        />

        <SelectField
          label='Choose a topic'
          name='topic'
          defaultValue='General'
          onChange={handleChange}
          value={data.topic}
        >
          <option value='General'>General</option>
          <option value='Request a demo'>Request a demo</option>
          <option value='Talk to sales'>Talk to sales</option>
          <option value='Support'>Support</option>
          <option value='Feedback'>Feedback</option>
          <option value='Found a bug'>Found a bug</option>
        </SelectField>
        <TextField
          label='Email'
          name='email'
          type='email'
          autoComplete='email'
          placeholder='johnnybravo@gmail.com'
          required
          onChange={handleChange}
          value={data.email}
        />

        <TextField
          label='Company name'
          name='company_name'
          placeholder='Johnny Bravo Enterprises'
          required
          onChange={handleChange}
          value={data.company_name}
        />

        <SelectField
          label='Company size'
          name='company_size'
          defaultValue='1-10'
          onChange={handleChange}
          value={data.company_size}
        >
          <option value='1-10'>1-10</option>
          <option value='10-20'>10-20</option>
          <option value='20-50'>20-50</option>
          <option value='50-100'>50-100</option>
          <option value='100-1000'>100-1000</option>
          <option value='1000+'>1000+</option>
        </SelectField>
      </div>
      <TextField
        className='mt-8'
        label='How can we help you?'
        name='query'
        rows={6}
        elementType='textarea'
        aria-describedby='message-description'
        placeholder='Enter your questions, feedback or suggestions...'
        required
        onChange={handleChange}
        value={data.query}
      />

      <div className='mt-8 flex items-center justify-between space-x-4'>
        <Button
          type='submit'
          className='disabled:opacity-50 sm:px-5'
          disabled={isLoading}
        >
          {isLoading ? (
            <Loading02Icon className='h-5 w-5 animate-spin' fill='#fff' />
          ) : (
            'Send message'
          )}
        </Button>
      </div>
    </form>
  )
}

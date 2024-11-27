// components/shared/Modal.js
'use client'
import React from 'react'
import { Button } from '@/components/shared/Button'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative w-full max-w-4xl rounded-lg bg-white p-8 shadow-lg'>
        <Button onClick={onClose} className='absolute right-2 top-2'>
          Close
        </Button>
        {children}
      </div>
    </div>
  )
}

export default Modal

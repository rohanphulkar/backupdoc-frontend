import React from 'react'

const VedioTestimonial = () => {
  return (
    <section className='container mx-auto mb-24'>
      <div className='mb-5 text-center text-white'>
        <h1 className='text-warning text-4xl'>What Users Say</h1>
      </div>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
        {/* First Testimonial */}
        <div>
          <div className='mb-4'>
            <iframe
              className='w-full'
              height='350'
              src='https://www.youtube.com/embed/VVmVD2rJRGM'
              title='Revolutionizing Dental Diagnostics with BackupDoc: AI-Powered Precision @DoctorShankerMDS'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
            ></iframe>
          </div>
          <div className='mb-3 rounded-3xl bg-gray-800 bg-opacity-40 p-4 text-white'>
            <h5 className='text-warning'>
              Patient Made an Informed Decision Through Backupdoc
            </h5>
          </div>
        </div>

        {/* Second Testimonial */}
        <div>
          <div className='mb-4'>
            <iframe
              className='w-full'
              height='350'
              src='https://www.youtube.com/embed/_rgUQS04ztg'
              title='Oral Maxillofacial Surgeon Shares His Experience with BackupDoc - Revolutionizing Dental Diagnostics'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
            ></iframe>
          </div>
          <div className='mb-3 rounded-3xl bg-gray-800 bg-opacity-40 p-4 text-white'>
            <h5 className='text-warning'>
              Surgeon and His Backupdoc Helped Him Increase His Revenue
            </h5>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VedioTestimonial

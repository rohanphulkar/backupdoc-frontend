import Image from 'next/image'
import Rectangle2109 from '@/images/Rectangle2109.jpg'
import Group from '@/images/Group.jpg'
import { Container } from '@/components/shared/Container'
import ico1 from '@/images/ICO1.jpg'
import imaged1 from '@/images/image-d-1.jpg'
import imagecllp from '@/images/image-cllp.jpg'
import group880 from '@/images/Group880.jpg'
import Rectangle2139 from '@/images/Rectangle2139.jpg'
import ImageNew from '@/images/image-new.jpg'
import ImageLop from '@/images/image-lop.jpg'
import Group852 from '@/images/Group852.jpg'
import Group834 from '@/images/Group834.jpg'
import { PricingHero } from '@/components/pricing/PricingHero'
import VedioTestimonial from '@/components/doctor/VedioTestimonial'
import { Footer } from '@/components/shared/Footer'

const DoctorHero = () => {
  return (
    <div className='min-h-screen text-white'>
      <Container className='gap-16 pb-16 pt-24 sm:pb-20 lg:pt-32'>
        {/* Main Content Section */}
        <main className='container mx-auto px-4 py-8'>
          {/* Header Section */}
          <div className='mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2'>
            <div className='space-y-6'>
              <h1 className='text-5xl font-extrabold text-white'>
                Transform Your Dental Practice with BackupDoc.ai
              </h1>
              <h4 className='text-2xl text-gray-300'>
                AI-driven Color-Coded X-rays to Improve Diagnostics and Patient
                Understanding.
              </h4>
              <p className='text-lg text-gray-400'>
                Leverage cutting-edge technology to detect pathologies with
                precision and ensure patient trust.
              </p>
            </div>

            {/* Image & Feature Section */}
            <div className='flex transform items-center justify-center rounded-lg bg-slate-800 shadow-lg transition duration-300 hover:scale-105'>
              <Image
                src={Rectangle2109}
                alt='Dental Diagnostic Tools'
                width={320}
                height={380}
                className='rounded-lg object-cover'
              />
            </div>
          </div>

          {/* Benefits Section */}
          <div className='mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {/* Card 1 */}
            <div className='flex flex-col items-start rounded-lg bg-slate-800 p-6 shadow-xl transition-transform hover:scale-105 hover:shadow-2xl'>
              <Image
                src={ico1}
                alt='Icon'
                className='mb-4 h-16 w-16 rounded-full bg-blue-500 p-2 transition duration-300 hover:bg-blue-700'
              />
              <h5 className='text-xl font-semibold text-white'>
                Trust and Satisfaction
              </h5>
              <p className='text-gray-300'>
                Color-coded diagnostics improve patient confidence and help
                explain care plans more clearly.
              </p>
            </div>

            {/* Card 2 */}
            <div className='flex flex-col items-start rounded-lg bg-slate-800 p-6 shadow-xl transition-transform hover:scale-105 hover:shadow-2xl'>
              <Image
                src={group880}
                alt='Icon'
                className='mb-4 h-16 w-16 rounded-full bg-blue-500 p-2 transition duration-300 hover:bg-blue-700'
              />
              <h5 className='text-xl font-semibold text-white'>
                Effective Communication Tool
              </h5>
              <p className='text-gray-300'>
                Visual aids make it easier for dentists to explain diagnoses and
                treatment plans to patients.
              </p>
            </div>

            {/* Card 3 */}
            <div className='flex flex-col items-start rounded-lg bg-slate-800 p-6 shadow-xl transition-transform hover:scale-105 hover:shadow-2xl'>
              <Image
                src={imagecllp}
                alt='Icon'
                className='mb-4 h-16 w-16 rounded-full bg-blue-500 p-2 transition duration-300 hover:bg-blue-700'
              />
              <h5 className='text-xl font-semibold text-white'>
                Enhanced Diagnostic Accuracy
              </h5>
              <p className='text-gray-300'>
                Detects small pathologies that could be missed by the naked eye,
                ensuring comprehensive diagnostics.
              </p>
            </div>
          </div>

          {/* Additional Section - Engaging Card Grid */}
          <div className='mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {/* Card 1 */}
            <div className='overflow-hidden rounded-lg bg-slate-800 shadow-lg transition-shadow hover:shadow-2xl'>
              <Image
                src={Rectangle2139}
                alt='Increased Patient Engagement'
                className='w-full transform rounded-t-lg object-cover transition-transform hover:scale-105'
                width={400}
                height={250}
              />
              <div className='bg-slate-900 p-6'>
                <h5 className='text-2xl font-semibold text-white'>
                  Increased Patient Engagement
                </h5>
                <p className='text-gray-400'>
                  Visual aids help dentists explain diagnoses and treatment
                  plans more effectively.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className='overflow-hidden rounded-lg bg-slate-800 shadow-lg transition-shadow hover:shadow-2xl'>
              <Image
                src={ImageNew}
                alt='Objective Third Party View'
                className='w-full transform rounded-t-lg object-cover transition-transform hover:scale-105'
                width={400}
                height={250}
              />
              <div className='bg-slate-900 p-6'>
                <h5 className='text-2xl font-semibold text-white'>
                  Third Party Objective <br /> View
                </h5>
                <p className='text-gray-400'>
                  Objective analysis from BackupDoc.ai builds patient trust in
                  your diagnosis.{' '}
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className='overflow-hidden rounded-lg bg-slate-800 shadow-lg transition-shadow hover:shadow-2xl'>
              <Image
                src={ImageLop}
                alt='2,000+ Clients Served'
                className='w-full transform rounded-t-lg object-cover transition-transform hover:scale-105'
                width={400}
                height={250}
              />
              <div className='bg-slate-900 p-6'>
                <h3 className='text-2xl font-semibold text-white'>
                  2,000+ Clients <br /> Served
                </h3>
                <p className='text-gray-400'>
                  We've successfully provided second opinions to over 2,000
                  satisfied clients.
                </p>
              </div>
            </div>
          </div>

          {/* Countdown & Discount Section */}
          <section className='mt-14 rounded-lg bg-gradient-to-r from-teal-700 to-blue-800 p-8'>
            <div className='container mx-auto flex items-center justify-between'>
              <div className='flex flex-col items-center justify-between lg:flex-row'>
                {/* Image */}
                <div className='mb-4 lg:mb-0'>
                  <Image
                    src={Group834}
                    alt='Discount'
                    width={150}
                    height={100}
                    layout='intrinsic'
                    className='rounded-md'
                  />
                </div>

                {/* Countdown Timer */}
                <div className='text-center text-white'>
                  <h2 className='mb-2 text-xl font-semibold'>Expires in</h2>
                  <div className='flex justify-center gap-6'>
                    {['Days', 'Hours', 'Minutes', 'Seconds'].map(
                      (label, index) => (
                        <div key={label} className='flex flex-col items-center'>
                          <div className='rounded-lg bg-slate-800 p-4 text-teal-400'>
                            <span className='text-3xl font-semibold'>
                              {index === 0 ? '000' : index === 1 ? '24' : '00'}
                            </span>
                          </div>
                          <span className='text-sm text-gray-400'>{label}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <div className='mt-4 lg:mt-0'>
                  <a
                    href='/pricing'
                    className='rounded-full bg-yellow-600 px-6 py-3 text-lg font-bold text-gray-900 shadow-lg transition duration-300 hover:bg-yellow-500'
                  >
                    20% Off Now
                    <br />
                    <span className='text-indigo-400'>Coupon: FIRST20</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Discover Plans Section */}
          <PricingHero />
          <VedioTestimonial />
        </main>
      </Container>

      <Footer />
    </div>
  )
}

export default DoctorHero

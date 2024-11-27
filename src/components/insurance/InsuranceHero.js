import Image from 'next/image'
import { Footer } from '@/components/shared/Footer'
import Ractangle2112 from '@/images/Rectangle2112.jpg'
import ImiImage from '@/images/imi-image.jpg'
import FullAnnaImage from '@/images/full-ana-image.jpg'
import specificity from '@/images/specificity.jpg'
import Group846 from '@/images/Group846.jpg'
import Group from '@/images/Group.jpg'

const InsuranceHero = () => {
  return (
    <div className='min-h-screen text-white'>
      {/* Benefits Heading */}
      <div className='container mx-auto py-8 text-center'>
        <span className='whitespace-nowrap text-4xl font-bold text-gray-200'>
          Benefits for Insurers
        </span>
      </div>

      {/* Hero Section */}
      <div className='container mx-auto flex flex-col items-center space-y-8 px-8 py-16 text-center lg:flex-row lg:space-y-0 lg:py-24'>
        <div className='w-full text-center lg:w-1/2 lg:text-left'>
          <h1 className='bg-gradient-to-r from-teal-300 to-blue-500 bg-clip-text text-5xl font-extrabold text-transparent'>
            Experience the Savings Firsthand
          </h1>
          <p className='mx-auto mt-4 max-w-2xl text-lg text-gray-300 md:text-xl lg:mx-0'>
            Ready to see how BackupDoc.ai can transform your claims verification
            process and save you millions? Schedule a personalized demo today to
            experience the power of AI-driven solutions.
          </p>
          <div className='mt-6'>
            <a
              href='https://calendly.com/epikdoc-support/30min'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block transform rounded-full bg-gradient-to-r from-blue-500 from-teal-500 to-blue-500 to-teal-500 px-8 py-3 text-lg font-semibold text-white shadow-xl transition-all hover:scale-105 hover:bg-gradient-to-l hover:shadow-2xl'
            >
              Book a Demo
            </a>
          </div>
        </div>
        <div className='relative mx-auto w-full max-w-sm lg:ml-12 lg:w-1/2'>
          <Image
            src={Ractangle2112}
            alt='Primary Image'
            className='mx-auto transform rounded-lg shadow-2xl transition-all hover:scale-105'
          />
        </div>
      </div>

      {/* Benefits Section */}
      <div className='container mx-auto px-8 py-20'>
        <div className='mb-12 text-center'>
          <span className='inline-block transform rounded-lg bg-gradient-to-r from-teal-400 to-blue-500 px-8 py-4 text-xl font-bold shadow-lg transition-all hover:scale-110'>
            Benefits
          </span>
        </div>

        {/* Benefits Rows */}
        <div className='mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2'>
          {/* Row 1 */}
          <div className='flex flex-col items-center lg:flex-row'>
            <ul className='mb-6 list-disc space-y-4 pl-5 text-lg text-gray-300 lg:pr-8'>
              <li className='text-xl'>
                AI-driven analysis of dental radiographs.
              </li>
              <li className='text-xl'>
                Visual representation of dental issues for patient education.
              </li>
              <li className='text-xl'>
                Regulatory compliance and better relationships.
              </li>
            </ul>
            <div className='mt-8 flex justify-center lg:mt-0'>
              <Image
                src={ImiImage}
                alt='Benefits Image'
                className='h-auto max-w-xs transform rounded-lg shadow-xl transition-all hover:scale-105'
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className='flex flex-col items-center lg:flex-row'>
            <ul className='mb-6 list-disc space-y-4 pl-5 text-lg text-gray-300 lg:pr-8'>
              <li className='text-xl'>
                Enhance claims verification precision, reducing human error.
              </li>
              <li className='text-xl'>
                Minimize financial losses from fraudulent claims.
              </li>
              <li className='text-xl'>
                Improve collaboration with transparent claim assessments.
              </li>
            </ul>
            <div className='mt-8 flex justify-center lg:mt-0'>
              <Image
                src={FullAnnaImage}
                alt='Full Analysis Image'
                className='h-auto max-w-xs transform rounded-lg shadow-xl transition-all hover:scale-105'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Benefits Section with CTA */}
      <section className='container px-4 py-8'>
        <div className='flex flex-wrap lg:flex-nowrap'>
          {/* Left Column */}
          <div className='mb-8 lg:mb-0 lg:w-1/2 lg:pr-8'>
            <div className='mb-3'>
              <h2 className='text-4xl font-semibold text-gray-300'>
                Experience the Savings Firsthand
              </h2>
            </div>
            <p className='mb-4 text-3xl text-gray-300 lg:pr-20'>
              Ready to see how BackupDoc.ai can transform your claims
              verification process and save you millions? Schedule a
              personalized demo today to experience the power of AI-driven
              solutions.
            </p>
            <div className='mt-4 flex justify-end lg:mr-16'>
              <a
                href='https://calendly.com/epikdoc-support/30min'
                target='_blank'
                rel='noopener noreferrer'
                className='btn btn-lg rounded-full bg-white px-10 py-3 font-medium text-blue-900'
              >
                Book a Demo
              </a>
            </div>
          </div>

          {/* Right Column with Image */}
          <div className='relative text-center lg:w-1/2'>
            <Image
              src={Ractangle2112}
              alt='Primary Image'
              className='mx-auto h-auto w-4/5'
            />
          </div>
        </div>
      </section>

      {/* Benefits Cards Section */}
      <div className='container mx-auto px-8 py-20'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {/* Card 1 */}
          <div className='transform rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 p-6 text-center shadow-xl transition-all hover:scale-105 hover:shadow-2xl'>
            <div className='mb-4 flex justify-center'>
              <Image
                src={specificity}
                alt='Improved Accuracy'
                className='h-20 w-20'
              />
            </div>
            <h3 className='mb-2 text-xl font-semibold text-white'>
              Improved Accuracy
            </h3>
            <p className='text-sm text-gray-200'>
              Enhance the precision of claims verification, reducing human
              error.
            </p>
          </div>

          {/* Card 2 */}
          <div className='transform rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 p-6 text-center shadow-xl transition-all hover:scale-105 hover:shadow-2xl'>
            <div className='mb-4 flex justify-center'>
              <Image
                src={Group846}
                alt='Cost Reduction'
                className='h-20 w-20'
              />
            </div>
            <h3 className='mb-2 text-xl font-semibold text-white'>
              Cost Reduction
            </h3>
            <p className='text-sm text-gray-200'>
              Minimize financial losses from fraudulent claims.
            </p>
          </div>

          {/* Card 3 */}
          <div className='transform rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 p-6 text-center shadow-xl transition-all hover:scale-105 hover:shadow-2xl'>
            <div className='mb-4 flex justify-center'>
              <Image src={Group} alt='Efficiency Gains' className='h-20 w-20' />
            </div>
            <h3 className='mb-2 text-xl font-semibold text-white'>
              Efficiency Gains
            </h3>
            <p className='text-sm text-gray-200'>
              Streamline claims processing with AI-driven insights.
            </p>
          </div>

          {/* Card 4 */}
          <div className='transform rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 p-6 text-center shadow-xl transition-all hover:scale-105 hover:shadow-2xl'>
            <div className='mb-4 flex justify-center'>
              <Image src={Group} alt='Enhanced Trust' className='h-20 w-20' />
            </div>
            <h3 className='mb-2 text-xl font-semibold text-white'>
              Enhanced Trust
            </h3>
            <p className='text-sm text-gray-200'>
              Foster better relationships with dental providers.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default InsuranceHero

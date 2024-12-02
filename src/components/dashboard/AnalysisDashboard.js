import React, { useEffect, useState, useMemo, useRef } from 'react'
import AccuracyChecking from './AccuracyChecking'
import { Switch } from '@headlessui/react'
import { api } from '@/api/api'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { EnvelopeIcon, PrinterIcon } from '@heroicons/react/24/outline'
import { Loading02Icon } from 'hugeicons-react'

const AnalysisDashboard = ({ id }) => {
  const [accuracyLevel, setAccuracyLevel] = useState(0)
  const [enabledOne, setEnabledOne] = useState(false)
  const [enabledTwo, setEnabledTwo] = useState(false)
  const [prediction, setPrediction] = useState(null)
  const [legends, setLegends] = useState([])
  const [loading, setLoading] = useState(false)
  const [imageScale, setImageScale] = useState(1)
  const token = useSelector((state) => state.auth.token)

  const getColorsByPercentage = (percentage) => {
    if (percentage >= 0 && percentage < 1) {
      return {
        bg: 'bg-red-500/20',
        hover: 'hover:bg-red-500/30',
        dot: 'bg-red-500',
        text: 'text-red-400',
      }
    }
    if (percentage >= 1 && percentage < 15) {
      return {
        bg: 'bg-orange-500/20',
        hover: 'hover:bg-orange-500/30',
        dot: 'bg-orange-500',
        text: 'text-orange-400',
      }
    }
    if (percentage >= 15 && percentage < 60) {
      return {
        bg: 'bg-blue-500/20',
        hover: 'hover:bg-blue-500/30',
        dot: 'bg-blue-500',
        text: 'text-blue-400',
      }
    }
    if (percentage >= 60) {
      return {
        bg: 'bg-green-500/20',
        hover: 'hover:bg-green-500/30',
        dot: 'bg-green-500',
        text: 'text-green-400',
      }
    }
    // Default case
    return {
      bg: 'bg-gray-500/20',
      hover: 'hover:bg-gray-500/30',
      dot: 'bg-gray-500',
      text: 'text-gray-400',
    }
  }

  const filteredLegends = useMemo(() => {
    return legends
      .filter((legend) => legend.percentage >= accuracyLevel)
      .sort((a, b) => b.percentage - a.percentage)
  }, [legends, accuracyLevel])

  const fetchPrediction = async () => {
    try {
      setLoading(true)
      const { data: result, status } = await api.get(
        `/predict/get-prediction/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (status === 200) {
        setPrediction(result.prediction)
        setLegends(result.labels)
      } else {
        toast.error('Something went wrong!')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.error || 'Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id && token) {
      fetchPrediction()
    }
  }, [id, token])

  const handleAccuracyChange = (value) => {
    const thresholds = [0, 1, 15, 60]
    const nearestThreshold = thresholds.reduce((prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    )
    setAccuracyLevel(nearestThreshold)
  }

  const handleZoomIn = () => setImageScale((prev) => Math.min(prev + 0.1, 2))
  const handleZoomOut = () => setImageScale((prev) => Math.max(prev - 0.1, 0.5))

  const windowRef = useRef(null)

  const handlePrint = () => {
    const printContent = windowRef.current
    const originalContents = document.body.innerHTML

    if (printContent) {
      document.body.innerHTML = printContent.innerHTML
      window.print()
      document.body.innerHTML = originalContents
      window.location.reload() // Reload to restore React functionality
    }
  }
  const [sendingEmail, setSendingEmail] = useState(false)

  const handleReportEmail = async (prediction_id) => {
    try {
      setSendingEmail(true)
      const { status } = await api.get(
        `/predict/make-report/${prediction_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (status === 200) {
        toast.success('Report has been sent to your email.')
      } else {
        toast.error('Something went wrong!')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.error || 'Something went wrong!')
    } finally {
      setSendingEmail(false)
    }
  }

  return (
    <div
      ref={windowRef}
      className='relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 p-6 backdrop-blur-xl'
    >
      <div className='mx-auto max-w-7xl'>
        <div className='flex flex-col gap-6 lg:flex-row'>
          {/* Left Column - Image Display */}
          <div className='lg:w-3/4'>
            {prediction ? (
              <div className='relative rounded-2xl bg-gray-800/50 p-4 shadow-xl backdrop-blur-lg'>
                <div className='absolute right-6 top-6 z-10 flex gap-2'>
                  <button
                    onClick={handleZoomIn}
                    className='rounded-lg bg-gray-700/50 p-1.5 text-base font-bold text-white hover:bg-gray-600/50'
                  >
                    +
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className='rounded-lg bg-gray-700/50 p-1.5 text-base font-bold text-white hover:bg-gray-600/50'
                  >
                    -
                  </button>
                </div>
                <div className='max-h-[85vh] overflow-auto'>
                  <img
                    src={prediction.predicted_image}
                    alt='Analyzed Image'
                    style={{ transform: `scale(${imageScale})` }}
                    className='h-auto w-full rounded-lg object-contain shadow-lg transition-transform duration-200'
                  />
                </div>
              </div>
            ) : (
              <div className='flex h-96 items-center justify-center rounded-2xl bg-gray-800/50 p-4 backdrop-blur-lg'>
                <div className='animate-pulse text-base text-gray-400'>
                  Loading analysis...
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Controls & Info */}
          <div className='space-y-4 lg:w-1/4'>
            {/* Accuracy Slider */}
            <div className='rounded-2xl bg-gray-800/50 p-4 shadow-xl backdrop-blur-lg'>
              <h3 className='mb-3 text-base font-semibold text-white'>
                Accuracy Threshold
              </h3>
              <div className='flex items-center gap-3'>
                <input
                  type='range'
                  min='0'
                  max='60'
                  step='1'
                  value={accuracyLevel}
                  onChange={(e) => handleAccuracyChange(Number(e.target.value))}
                  className='h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700/50 accent-pink-500'
                />
                <input
                  type='number'
                  min='0'
                  max='60'
                  value={accuracyLevel}
                  onChange={(e) => handleAccuracyChange(Number(e.target.value))}
                  className='w-16 rounded border border-gray-600/50 bg-gray-700/50 px-2 py-1 text-center text-sm text-white backdrop-blur-sm'
                />
              </div>
            </div>

            {/* Detection Results */}
            <div className='rounded-2xl bg-gray-800/50 p-4 shadow-xl backdrop-blur-lg'>
              <h3 className='mb-3 text-base font-semibold text-white'>
                Detection Results
              </h3>
              <div className='space-y-2 pr-2'>
                {filteredLegends.length > 0 ? (
                  filteredLegends.map((legend, index) => {
                    const colors = getColorsByPercentage(legend.percentage)
                    return (
                      <div
                        key={index}
                        className={`text-2xs group rounded-lg p-2 transition-all ${colors.bg} ${colors.hover}`}
                      >
                        <div className='flex items-center space-x-2'>
                          <div
                            className={`h-3 w-3 rounded-full ${colors.dot}`}
                          ></div>
                          <span className='flex-1 text-sm font-medium text-gray-200'>
                            {legend.name}
                          </span>
                          <span
                            className={`text-sm font-semibold ${colors.text}`}
                          >
                            {legend.percentage}%
                          </span>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className='text-center text-xs text-gray-400'>
                    No detections above the accuracy threshold
                  </div>
                )}
              </div>
            </div>

            {/* Toggle Controls */}
            <div className='flex gap-3'>
              <div className='flex-1 rounded-2xl bg-gray-800/50 p-3 shadow-xl backdrop-blur-lg transition-all hover:shadow-2xl'>
                <Switch
                  checked={enabledOne}
                  onChange={setEnabledOne}
                  className={`${
                    enabledOne ? 'bg-pink-500' : 'bg-gray-600/50'
                  } relative inline-flex h-6 w-10 items-center rounded-full transition-colors focus:outline-none`}
                >
                  <span
                    className={`${
                      enabledOne ? 'translate-x-5' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
                <p className='mt-1.5 text-sm font-medium text-gray-300'>
                  Pathology
                </p>
              </div>

              <div className='flex-1 rounded-2xl bg-gradient-to-br from-pink-500/80 to-pink-600/80 p-3 shadow-xl backdrop-blur-lg transition-all hover:shadow-2xl'>
                <Switch
                  checked={enabledTwo}
                  onChange={setEnabledTwo}
                  className={`${
                    enabledTwo ? 'bg-white' : 'bg-gray-600/50'
                  } relative inline-flex h-6 w-10 items-center rounded-full transition-colors focus:outline-none`}
                >
                  <span
                    className={`${
                      enabledTwo ? 'translate-x-5' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-pink-500 transition-transform`}
                  />
                </Switch>
                <p className='mt-1.5 text-sm font-medium text-white'>
                  Measurements
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-3'>
              <button
                onClick={() => {
                  handleReportEmail(id)
                }}
                className='flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-pink-600/80 to-pink-700/80 px-3 py-2.5 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition-all hover:translate-y-[-1px] hover:shadow-xl active:translate-y-0'
              >
                {sendingEmail ? (
                  <Loading02Icon className='h-5 w-5 animate-spin' fill='#fff' />
                ) : (
                  <div className='flex items-center space-x-1.5'>
                    <EnvelopeIcon className='h-5 w-5' />
                    <span>Email</span>
                  </div>
                )}
              </button>
              <button
                onClick={handlePrint}
                className='flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-pink-600/80 to-pink-700/80 px-3 py-2.5 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition-all hover:translate-y-[-1px] hover:shadow-xl active:translate-y-0'
              >
                <PrinterIcon className='h-5 w-5' />
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalysisDashboard

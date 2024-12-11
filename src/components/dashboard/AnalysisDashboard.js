import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { Switch } from '@headlessui/react'
import { api } from '@/api/api'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import {
  EnvelopeIcon,
  PrinterIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import {
  ArrowTurnDownIcon,
  ArrowTurnUpIcon,
  Loading02Icon,
  MultiplicationSignIcon,
  ReloadIcon,
} from 'hugeicons-react'
import { format } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function PatientHeader({ patient, doctor }) {
  const router = useRouter()
  return (
    <div className='mx-auto w-full max-w-7xl p-2'>
      <div className='rounded-lg border border-gray-800 bg-gray-800/90 p-3 shadow-sm backdrop-blur-xl sm:p-4'>
        <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
          <div className='flex items-center gap-4'>
            <div>
              <h1 className='text-lg font-bold text-gray-100 sm:text-xl'>
                {patient?.first_name ?? 'N/A'} {patient?.last_name ?? 'N/A'}
              </h1>
              <p className='mt-1 text-xs text-gray-400 sm:text-sm'>
                {patient?.age ?? 'N/A'} years • {patient?.gender ?? 'N/A'} •{' '}
                {patient?.phone ?? 'N/A'}
              </p>
            </div>
          </div>
          <div className='flex w-full items-center justify-between gap-3 sm:w-auto sm:gap-4'>
            <div className='rounded-lg bg-gray-600/50 px-3 py-1.5 shadow-sm backdrop-blur-sm sm:px-4 sm:py-2'>
              <p className='text-2xs text-gray-400 sm:text-xs'>Credits</p>
              <p className='text-base font-bold text-gray-100 sm:text-lg'>
                {doctor?.credits ?? 0}
              </p>
            </div>
            <button
              onClick={() => router.push('/pricing')}
              className='rounded-lg bg-gradient-to-r from-pink-600/90 to-purple-600/90 px-3 py-1.5 text-xs font-medium text-gray-100 shadow-lg backdrop-blur-sm transition-all hover:from-pink-700/90 hover:to-purple-700/90 hover:shadow-xl active:scale-95 sm:px-4 sm:py-2 sm:text-sm'
            >
              Upgrade Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const AnalysisDashboard = ({ id }) => {
  const [accuracyLevel, setAccuracyLevel] = useState(0)
  const [enabledTwo, setEnabledTwo] = useState(false)
  const [prediction, setPrediction] = useState(null)
  const [legends, setLegends] = useState([])
  const [loading, setLoading] = useState(false)
  const [imageScale, setImageScale] = useState(1)
  const token = useSelector((state) => state.auth.token)
  const [showAnalyzed, setShowAnalyzed] = useState(true)
  const [sendingEmail, setSendingEmail] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [patient, setPatient] = useState(null)
  const [doctor, setDoctor] = useState(null)
  const [previousAnalyses, setPreviousAnalyses] = useState([])
  const [rotated, setRotated] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const [deletingLabel, setDeletingLabel] = useState(false)
  const [changingDetection, setChangingDetection] = useState(false)

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

  const fetchPrediction = useCallback(async () => {
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
        setPreviousAnalyses(result.previous_predictions)
        if (result.prediction.patient) {
          fetchPatient(result.prediction.patient)
        }
        fetchDoctorDetails()
      } else {
        toast.error('Something went wrong!')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.error || 'Something went wrong!')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (id && token) {
      fetchPrediction()
    }
  }, [id, token, fetchPrediction])

  const handleAccuracyChange = (value) => {
    const thresholds = [0, 1, 15, 60]
    const nearestThreshold = thresholds.reduce((prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    )
    setAccuracyLevel(nearestThreshold)
  }

  const handleZoomIn = () => setImageScale((prev) => Math.min(prev + 0.1, 2.5))
  const handleZoomOut = () => setImageScale((prev) => Math.max(prev - 0.1, 1))

  const windowRef = useRef(null)

  const handlePrint = () => {
    const printContent = windowRef.current
    const originalContents = document.body.innerHTML

    if (printContent) {
      const predictedImage = printContent.querySelector('.predicted-image')
      const patientDetails = printContent.querySelector('.patient-details')
      patientDetails.style.display = 'block'
      document.body.style = `
      background-color: #0f172a;
      color: white
      `
      document.body.innerHTML =
        predictedImage.outerHTML + patientDetails.outerHTML

      window.print()

      document.body.innerHTML = originalContents

      window.location.reload()
    }
  }

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
        toast.success(
          'Report generation started. You will receive an email when ready.'
        )
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

  const fetchPatient = useCallback(
    async (patientId) => {
      try {
        const { data: result, status } = await api.get(
          `/patient/details/${patientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        if (status === 200) {
          setPatient(result.patient)
        } else {
          toast.error('Something went wrong!')
        }
      } catch (error) {
        console.error(error)
        toast.error(error.response?.data?.error || 'Something went wrong!')
      }
    },
    [token]
  )

  const fetchDoctorDetails = useCallback(async () => {
    try {
      const { data: result, status } = await api.get('/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (status === 200) {
        setDoctor(result.user)
      } else {
        toast.error('Something went wrong!')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.error || 'Something went wrong!')
    }
  }, [token])

  const deleteLegend = async (id) => {
    try {
      setDeletingLabel(true)
      setChangingDetection(true)
      const { data: result, status } = await api.delete(
        `/predict/delete-label/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      if (status === 200) {
        setPrediction({
          ...prediction,
          predicted_image: result.annotated_image,
        })
        setLegends(
          legends.map((legend) =>
            legend.id === id ? { ...legend, include: false } : legend
          )
        )

        toast.success('Detection removed.')
      } else {
        toast.error('Something went wrong!')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.error || 'Something went wrong!')
    } finally {
      setDeletingLabel(false)
      setChangingDetection(false)
    }
  }

  const includeLabel = async (id) => {
    try {
      setChangingDetection(true)
      const { data: result, status } = await api.get(
        `/predict/include-label/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      if (status === 200) {
        setPrediction({
          ...prediction,
          predicted_image: result.annotated_image,
        })
        setLegends(
          legends.map((legend) =>
            legend.id === id ? { ...legend, include: true } : legend
          )
        )
        toast.success('Detection included.')
      } else {
        toast.error('Something went wrong!')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.error || 'Something went wrong!')
    } finally {
      setChangingDetection(false)
    }
  }

  const rotateClockwise = () => {
    setRotated((prev) => (prev + 90) % 360)
  }

  const rotateAntiClockwise = () => {
    setRotated((prev) => (prev - 90 + 360) % 360)
  }

  const handleMouseDown = (e) => {
    if (imageScale > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - imagePosition.x,
        y: e.clientY - imagePosition.y,
      })
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div className='relative min-h-screen bg-gradient-to-br from-gray-900/95 to-gray-800/95 p-4 backdrop-blur-xl md:p-6'>
      <PatientHeader patient={patient} doctor={doctor} />
      <div className='mx-auto max-w-7xl'>
        <div className='flex flex-col gap-4 md:gap-6'>
          <div className='flex flex-col gap-4 md:gap-6 lg:flex-row'>
            {/* Left Column - Controls */}
            <div className='w-full space-y-3 lg:w-1/4'>
              <div className='rounded-2xl bg-gray-800/50 p-4 shadow-xl backdrop-blur-lg transition-all duration-300 hover:bg-gray-800/60'>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-xs font-medium text-gray-300 md:text-sm'>
                      Show Analyzed
                    </span>
                    <Switch
                      checked={showAnalyzed}
                      onChange={setShowAnalyzed}
                      className={`${
                        showAnalyzed ? 'bg-pink-500' : 'bg-gray-600/50'
                      } relative inline-flex h-6 w-10 items-center rounded-full transition-colors focus:outline-none`}
                    >
                      <span
                        className={`${
                          showAnalyzed ? 'translate-x-5' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </Switch>
                  </div>

                  <div className='flex items-center justify-between'>
                    <span className='text-xs font-medium text-gray-300 md:text-sm'>
                      Measurements
                    </span>
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
                  </div>
                </div>

                <div className='mt-6 flex items-center justify-center gap-3'>
                  <button
                    onClick={handleZoomOut}
                    disabled={imageScale <= 1}
                    title={imageScale <= 1 ? 'Min zoom reached' : 'Zoom out'}
                    className='rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-md transition-colors duration-300 hover:bg-gray-100 disabled:bg-gray-400 disabled:text-gray-500'
                  >
                    -
                  </button>
                  <span className='text-sm font-medium text-gray-300'>
                    {Math.round(imageScale * 100)}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    disabled={imageScale >= 2.5}
                    title={imageScale >= 2.5 ? 'Max zoom reached' : 'Zoom in'}
                    className='rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-md transition-colors duration-300 hover:bg-gray-100 disabled:bg-gray-400 disabled:text-gray-500'
                  >
                    +
                  </button>
                </div>
                <div className='mt-6 flex items-center justify-center gap-3'>
                  <button
                    onClick={rotateAntiClockwise}
                    className='rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-md transition-colors duration-300 hover:bg-gray-100'
                  >
                    ↺
                  </button>
                  <span className='text-sm font-medium text-gray-300'>
                    {rotated}°
                  </span>
                  <button
                    onClick={rotateClockwise}
                    className='rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-md transition-colors duration-300 hover:bg-gray-100'
                  >
                    ↻
                  </button>
                </div>
              </div>

              <div className='space-y-3'>
                <button
                  onClick={() => handleReportEmail(id)}
                  className='flex w-full items-center justify-center gap-2 rounded-xl bg-pink-600 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:bg-pink-700'
                >
                  {sendingEmail ? (
                    <Loading02Icon
                      className='h-5 w-5 animate-spin'
                      fill='#fff'
                    />
                  ) : (
                    <>
                      <EnvelopeIcon className='h-5 w-5' />
                      <span>Email Report</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handlePrint}
                  className='flex w-full items-center justify-center gap-2 rounded-xl bg-pink-600 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:bg-pink-700'
                >
                  <PrinterIcon className='h-5 w-5' />
                  <span>Print Report</span>
                </button>
              </div>
            </div>

            {/* Center Column - Image Display */}
            <div className='flex-1'>
              {prediction && !changingDetection ? (
                <div
                  className='relative rounded-2xl bg-gray-800/50 p-4 shadow-xl backdrop-blur-lg transition-all duration-300 hover:bg-gray-800/60'
                  ref={windowRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <div
                    className='patient-details space-y-2 rounded-lg bg-slate-900 p-4 text-left shadow-md'
                    style={{
                      display: 'none',
                    }}
                  >
                    <h3 className='text-lg font-bold text-black'>
                      {patient?.first_name} {patient?.last_name}
                    </h3>
                    <div className='space-y-1 text-sm text-black'>
                      <p>Gender: {patient?.gender}</p>
                      <p>Age: {patient?.age} years old</p>
                      <p>
                        Date of Birth:{' '}
                        {patient?.date_of_birth &&
                          format(
                            new Date(patient?.date_of_birth),
                            'MMM dd, yyyy'
                          )}
                      </p>
                      <p>Phone: {patient?.phone}</p>
                    </div>
                  </div>
                  <div className='max-h-[85vh] overflow-auto'>
                    <div className='relative'>
                      <img
                        src={prediction.original_image}
                        alt='Original Image'
                        style={{
                          transform: `scale(${imageScale}) rotate(${rotated}deg) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                        }}
                        className={`h-auto w-full rounded-lg object-contain shadow-lg transition-all duration-500 ease-in-out ${showAnalyzed ? 'opacity-0' : 'opacity-100'} absolute left-0 top-0`}
                      />
                      <img
                        src={prediction.predicted_image}
                        alt='Analyzed Image'
                        style={{
                          transform: `scale(${imageScale}) rotate(${rotated}deg) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                        }}
                        className={`predicted-image h-auto w-full rounded-lg object-contain shadow-lg transition-all duration-500 ease-in-out ${showAnalyzed ? 'opacity-100' : 'opacity-0'}`}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className='flex h-96 items-center justify-center rounded-2xl bg-gray-800/50 p-4 backdrop-blur-lg'>
                  <div className='animate-pulse text-sm text-gray-400 md:text-base'>
                    Loading analysis...
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sliders & Results */}
            <div className='w-full space-y-3 lg:w-1/4'>
              <div className='rounded-2xl bg-gray-800/50 p-4 shadow-xl backdrop-blur-lg transition-all duration-300 hover:bg-gray-800/60'>
                <h3 className='mb-3 text-sm font-semibold text-white md:text-base'>
                  Accuracy Threshold
                </h3>
                <div className='flex items-center gap-3'>
                  <input
                    type='range'
                    min='0'
                    max='60'
                    step='1'
                    value={accuracyLevel}
                    onChange={(e) =>
                      handleAccuracyChange(Number(e.target.value))
                    }
                    className='h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-gray-700/50 accent-pink-500'
                  />
                  <input
                    type='number'
                    min='0'
                    max='60'
                    value={accuracyLevel}
                    onChange={(e) =>
                      handleAccuracyChange(Number(e.target.value))
                    }
                    className='w-16 rounded border border-gray-600/50 bg-gray-700/50 px-2 py-1 text-center text-sm text-white'
                  />
                </div>
              </div>

              <div className='flex-1 rounded-2xl bg-gray-800/50 p-4 shadow-xl backdrop-blur-lg transition-all duration-300 hover:bg-gray-800/60'>
                <h3 className='mb-3 text-sm font-semibold text-white md:text-base'>
                  Detection Results
                </h3>
                <div className='bud-scrollbar max-h-[50vh] space-y-2 overflow-y-auto'>
                  {filteredLegends.length > 0 ? (
                    <>
                      {/* Show included legends first */}
                      {filteredLegends
                        .sort(
                          (a, b) => (b.include === true) - (a.include === true)
                        )
                        .map((legend, index) => {
                          const colors = getColorsByPercentage(
                            legend.percentage
                          )
                          return (
                            <div
                              key={index}
                              className={`group relative rounded-lg px-3 py-2 transition-all duration-300 ease-in-out ${
                                deletingLabel
                                  ? 'pointer-events-none opacity-50'
                                  : legend.include === false
                                    ? 'opacity-50'
                                    : ''
                              } ${colors.bg} ${colors.hover}`}
                            >
                              <div className='flex items-center gap-3'>
                                <div
                                  className={`h-2.5 w-2.5 rounded-full ${colors.dot} animate-pulse`}
                                ></div>
                                <span className='flex-1 text-[13px] font-medium text-gray-200'>
                                  {legend.name}
                                </span>
                                <span
                                  className={`text-[13px] font-semibold ${colors.text}`}
                                >
                                  {legend.percentage}%
                                </span>
                              </div>
                              <button
                                onClick={() => {
                                  if (legend.include === false) {
                                    includeLabel(legend.id)
                                  } else {
                                    deleteLegend(legend.id)
                                  }
                                }}
                                disabled={deletingLabel}
                                className={`absolute left-0 top-0 z-10 hidden h-full w-full items-center justify-center rounded-lg transition-all duration-300 ease-in-out group-hover:flex group-hover:py-2 ${
                                  legend.include === true
                                    ? 'bg-red-500/90'
                                    : 'bg-green-500/90'
                                }`}
                              >
                                {deletingLabel ? (
                                  <Loading02Icon className='animate-spin text-gray-50' />
                                ) : legend.include === false ? (
                                  <ArrowTurnUpIcon className='-rotate-90 text-gray-50' />
                                ) : (
                                  <MultiplicationSignIcon
                                    className='text-gray-50'
                                    fill='#ffffff'
                                  />
                                )}
                              </button>
                            </div>
                          )
                        })}
                    </>
                  ) : (
                    <div className='text-center text-sm text-gray-400'>
                      No detections above threshold
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Previous Images Slider */}
          <div className='rounded-2xl bg-gray-800/50 p-4 shadow-xl backdrop-blur-lg transition-all duration-300 hover:bg-gray-800/60'>
            <div className='mb-4 flex items-center justify-between'>
              <h3 className='text-sm font-semibold text-white md:text-base'>
                Previous Analyses
              </h3>
              <div className='flex gap-2'>
                <button
                  onClick={() =>
                    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
                  }
                  className='rounded-lg bg-gray-700/50 p-1.5 transition-colors duration-300 hover:bg-gray-600/50'
                >
                  <ChevronLeftIcon className='h-5 w-5 text-white' />
                </button>
                <button
                  onClick={() =>
                    setCurrentIndex((prevIndex) =>
                      Math.min(prevIndex + 1, previousAnalyses.length - 4)
                    )
                  }
                  className='rounded-lg bg-gray-700/50 p-1.5 transition-colors duration-300 hover:bg-gray-600/50'
                >
                  <ChevronRightIcon className='h-5 w-5 text-white' />
                </button>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
              {previousAnalyses
                .slice(
                  currentIndex,
                  currentIndex + (window.innerWidth < 768 ? 2 : 4)
                )
                .map((analysis, index) => (
                  <Link
                    key={index}
                    href={`/analysis-dashboard/${analysis.id}/`}
                    className='group cursor-pointer transition-transform duration-300 hover:scale-105'
                  >
                    <img
                      src={analysis.predicted_image || analysis.original_image}
                      alt={`${analysis.patient.first_name} ${analysis.patient.last_name}`}
                      className='h-32 w-full rounded-lg object-cover transition-colors duration-300 group-hover:bg-gray-600/50'
                    />
                    <p className='mt-2 text-center text-sm text-gray-400 group-hover:text-gray-300'>
                      {analysis.patient.first_name}{' '}
                      {format(new Date(analysis.created_at), 'MMM dd, yyyy')}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalysisDashboard

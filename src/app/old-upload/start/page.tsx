'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import PrintUploadForm from '@/components/PrintUploadForm'
import ProgressSteps from '@/components/ProgressSteps'

const UPLOAD_STEPS = [
  {
    title: 'Print Details',
    description: 'What would you like to print?'
  },
  {
    title: 'Delivery',
    description: 'Where should we deliver?'
  },
  {
    title: 'Your Info',
    description: 'Tell us about you'
  },
  {
    title: 'Payment',
    description: 'Review and pay'
  }
]

export default function UploadStart() {
  const router = useRouter()

  const handleSubmit = (data: {
    printType: string
    size: string
    quantity: string
    file?: File
    notes?: string
  }) => {
    // Store the form data in localStorage for now
    // In a real app, you'd probably use a proper state management solution
    localStorage.setItem('printRequest', JSON.stringify({
      ...data,
      file: data.file?.name // We can't store the actual file in localStorage
    }))

    // Navigate to the next step (delivery details)
    router.push('/upload/delivery')
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-[#F5F5FF]">
      {/* Logo */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-gray-50 rounded-[75px] px-4 sm:px-6 py-4 shadow-sm border border-gray-100">
          <Image src="/Assets/logo.svg" alt="Printmote logo" width={200} height={73} priority className="w-[180px] sm:w-[250px] h-auto" />
          <span className="text-xs bg-indigo-900 text-white px-2 py-0.5 rounded">BETA</span>
        </div>
      </div>

      <ProgressSteps currentStep={0} steps={UPLOAD_STEPS} />
      <PrintUploadForm onSubmit={handleSubmit} />
    </div>
  )
} 
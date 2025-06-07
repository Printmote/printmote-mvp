'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import DeliveryForm from '@/components/DeliveryForm'
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

export default function DeliveryPage() {
  const router = useRouter()

  const handleSubmit = (data: {
    deliveryType: string
    deliveryDate?: string
    deliveryLocation: string
  }) => {
    // Store the delivery data in localStorage
    const printRequest = JSON.parse(localStorage.getItem('printRequest') || '{}')
    localStorage.setItem('printRequest', JSON.stringify({
      ...printRequest,
      delivery: data
    }))

    // Navigate to the next step (user info)
    router.push('/upload/user-info')
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

      <ProgressSteps currentStep={1} steps={UPLOAD_STEPS} />
      <DeliveryForm onSubmit={handleSubmit} />
    </div>
  )
} 
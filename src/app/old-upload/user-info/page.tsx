'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import UserInfoForm from '@/components/UserInfoForm'
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

export default function UserInfoPage() {
  const router = useRouter()

  const handleSubmit = (data: {
    fullName: string
    email: string
    phone: string
    organization?: string
  }) => {
    // Store the user data in localStorage
    const printRequest = JSON.parse(localStorage.getItem('printRequest') || '{}')
    localStorage.setItem('printRequest', JSON.stringify({
      ...printRequest,
      userInfo: data
    }))

    // Navigate to the next step (payment)
    router.push('/upload/payment')
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

      <ProgressSteps currentStep={2} steps={UPLOAD_STEPS} />
      <UserInfoForm onSubmit={handleSubmit} />
    </div>
  )
} 
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import PaymentForm from '@/components/PaymentForm'
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

interface PrintRequest {
  printType: string
  size: string
  quantity: string
  file?: string
  notes?: string
  delivery: {
    deliveryType: string
    deliveryDate?: string
    deliveryLocation: string
  }
  userInfo: {
    fullName: string
    email: string
    phone: string
    organization?: string
  }
}

export default function PaymentPage() {
  const [printRequest, setPrintRequest] = useState<PrintRequest | null>(null)

  useEffect(() => {
    // Load the print request data from localStorage
    const data = localStorage.getItem('printRequest')
    if (data) {
      setPrintRequest(JSON.parse(data))
    }
  }, [])

  const handlePayment = async (paymentMethod: string) => {
    // Here you would typically:
    // 1. Send the print request to your backend
    // 2. Create a payment intent with your payment provider
    // 3. Handle the payment flow
    // 4. Show success/error message
    // 5. Clear the localStorage
    console.log('Processing payment with:', paymentMethod)
    console.log('Print request:', printRequest)
  }

  if (!printRequest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5FF]">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-900">Loading...</h2>
          <p className="mt-2 text-gray-500">Please wait while we load your print request details.</p>
        </div>
      </div>
    )
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

      <ProgressSteps currentStep={3} steps={UPLOAD_STEPS} />
      {/* <PaymentForm printRequest={printRequest} onSubmit={handlePayment} /> */}
    </div>
  )
} 
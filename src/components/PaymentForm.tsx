'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

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

interface PaymentFormProps {
  onSubmit: (data: {
    paymentMethod: string
  }) => void
}

const FilePreview = ({ fileName }: { fileName: string }) => {
  const fileExtension = fileName.split('.').pop()?.toLowerCase() || ''
  const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)
  
  if (isImage) {
    return (
      <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={`/uploads/${fileName}`}
          alt={fileName}
          fill
          className="object-contain"
        />
      </div>
    )
  }

  // Icon mapping for different file types
  const getFileIcon = () => {
    switch (fileExtension) {
      case 'pdf':
        return (
          <svg className="w-12 h-12 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <text x="8" y="18" fontSize="6" fill="currentColor">PDF</text>
          </svg>
        )
      case 'doc':
      case 'docx':
        return (
          <svg className="w-12 h-12 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <text x="8" y="18" fontSize="6" fill="currentColor">DOC</text>
          </svg>
        )
      case 'ai':
        return (
          <svg className="w-12 h-12 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <text x="9" y="18" fontSize="6" fill="currentColor">AI</text>
          </svg>
        )
      case 'psd':
        return (
          <svg className="w-12 h-12 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <text x="7" y="18" fontSize="6" fill="currentColor">PSD</text>
          </svg>
        )
      default:
        return (
          <svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        )
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
      {getFileIcon()}
      <p className="mt-2 text-sm text-gray-600 truncate max-w-full">{fileName}</p>
    </div>
  )
}

export default function PaymentForm({ onSubmit }: PaymentFormProps) {
  const [orderSummary, setOrderSummary] = useState<any>(null)

  // Load saved data when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('printRequest')
    if (savedData) {
      const data = JSON.parse(savedData)
      setOrderSummary(data)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Temporarily skip payment and proceed to success
    onSubmit({ paymentMethod: 'pending' })
  }

  // Calculate total price
  const calculateTotal = () => {
    let total = 0
    if (orderSummary) {
      // Add delivery price based on type
      if (orderSummary.deliveryType === 'Within 24 hours') {
        total += 35.00
      } else if (orderSummary.deliveryType === 'Scheduled (Two or more days ahead)') {
        total += 30.00
      }
      
      // Add print job cost (this would typically come from an API)
      // For now, we'll use a placeholder amount
      total += 50.00
    }
    return total.toFixed(2)
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
      >
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/upload/user-info"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#6150FF]/10 text-[#6150FF] hover:bg-[#6150FF]/20 transition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-medium text-[#05054E]">
            Review your order
          </h1>
        </div>

        {/* Order Summary */}
        {orderSummary && (
          <div className="mb-8 bg-gray-50 rounded-xl p-6">
            <h2 className="text-lg font-medium text-[#05054E] mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{orderSummary.printType}</p>
                  <p className="text-sm text-gray-500">Size: {orderSummary.size}</p>
                  <p className="text-sm text-gray-500">Quantity: {orderSummary.quantity}</p>
                </div>
                <p className="font-medium text-gray-900">GHS 50.00</p>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">Delivery</p>
                  <p className="text-sm text-gray-500">{orderSummary.deliveryType}</p>
                  <p className="text-sm text-gray-500">{orderSummary.deliveryLocation}</p>
                </div>
                <p className="font-medium text-gray-900">
                  GHS {orderSummary.deliveryType === 'Within 24 hours' ? '35.00' : '30.00'}
                </p>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-900">Total</p>
                  <p className="font-medium text-gray-900">GHS {calculateTotal()}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment section commented out for now */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Select Payment Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('mobile-money')}
                className={`p-4 border-2 rounded-xl flex items-center gap-3 hover:border-[#6150FF] transition ${
                  paymentMethod === 'mobile-money' ? 'border-[#6150FF] bg-[#6150FF]/5' : 'border-gray-200'
                }`}
              >
                <Image src="/Assets/mobile-money.svg" alt="Mobile Money" width={32} height={32} />
                <span className="font-medium">Mobile Money</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 border-2 rounded-xl flex items-center gap-3 hover:border-[#6150FF] transition ${
                  paymentMethod === 'card' ? 'border-[#6150FF] bg-[#6150FF]/5' : 'border-gray-200'
                }`}
              >
                <Image src="/Assets/card-payment.svg" alt="Card Payment" width={32} height={32} />
                <span className="font-medium">Card Payment</span>
              </button>
            </div>
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#6150FF] text-white py-4 rounded-xl text-lg font-medium shadow-lg hover:bg-[#6150FF]/90 transition"
          >
            Place Order
          </button>
        </form>
      </motion.div>

      {/* Footer */}
      <footer className="mt-8 mb-6 text-center text-sm text-gray-400">
        © 2025 Printmote Tech (CS101203948)
      </footer>
    </div>
  )
} 
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
// import LocationAutocomplete from './LocationAutocomplete' // Will be used later for Google Maps integration

const DELIVERY_TYPES = [
  {
    type: 'Within 24 hours',
    price: 35.00,
    requiresDate: false
  },
  {
    type: 'Scheduled (Two or more days ahead)',
    price: 30.00,
    requiresDate: true
  },
  {
    type: 'Sameday Express',
    price: null,
    requiresDate: false,
    comingSoon: true
  }
]

interface DeliveryFormProps {
  onSubmit: (data: {
    deliveryType: string
    deliveryDate?: string
    deliveryLocation: string
  }) => void
}

export default function DeliveryForm({ onSubmit }: DeliveryFormProps) {
  const [deliveryType, setDeliveryType] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [deliveryLocation, setDeliveryLocation] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Load saved data when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('printRequest')
    if (savedData) {
      const data = JSON.parse(savedData)
      setDeliveryType(data.deliveryType || '')
      setDeliveryDate(data.deliveryDate || '')
      setDeliveryLocation(data.deliveryLocation || '')
    }
  }, [])

  // Save data whenever it changes
  useEffect(() => {
    if (deliveryType || deliveryDate || deliveryLocation) {
      const currentData = JSON.parse(localStorage.getItem('printRequest') || '{}')
      localStorage.setItem('printRequest', JSON.stringify({
        ...currentData,
        deliveryType,
        deliveryDate,
        deliveryLocation
      }))
    }
  }, [deliveryType, deliveryDate, deliveryLocation])

  const selectedDeliveryOption = DELIVERY_TYPES.find(option => option.type === deliveryType)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!deliveryType || !deliveryLocation) return
    if (selectedDeliveryOption?.requiresDate && !deliveryDate) return

    onSubmit({
      deliveryType,
      ...(selectedDeliveryOption?.requiresDate && { deliveryDate }),
      deliveryLocation
    })
  }

  // Calculate minimum date (2 days from now for scheduled delivery)
  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 2)
  const minDateString = minDate.toISOString().split('T')[0]

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
            href="/upload/start"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#6150FF]/10 text-[#6150FF] hover:bg-[#6150FF]/20 transition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-medium text-[#05054E]">
            Where should we deliver to?
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Delivery Type */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery type
            </label>
            <div className="relative">
              <button
                type="button"
                className="w-full px-4 py-3 text-left bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6150FF] focus:border-transparent text-gray-500 focus:text-[#05054E]"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {deliveryType ? (
                  <div className="flex justify-between items-center">
                    <span className="text-[#05054E]">{deliveryType}</span>
                    <span className="text-gray-500">
                      {selectedDeliveryOption?.price ? `GHS ${selectedDeliveryOption.price.toFixed(2)}` : ''}
                    </span>
                  </div>
                ) : (
                  'Select delivery type'
                )}
                <span className="absolute right-4 top-1/2 -translate-y-1/2">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  {DELIVERY_TYPES.map((option) => (
                    <button
                      key={option.type}
                      type="button"
                      disabled={option.comingSoon}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 ${
                        option.comingSoon ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                      onClick={() => {
                        if (!option.comingSoon) {
                          setDeliveryType(option.type)
                          setIsDropdownOpen(false)
                        }
                      }}
                    >
                      <div className="flex justify-between items-center text-[#05054E]">
                        <span className="flex items-center gap-2">
                          {option.type}
                          {option.comingSoon && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                              COMING SOON
                            </span>
                          )}
                        </span>
                        {option.price && <span>GHS {option.price.toFixed(2)}</span>}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Delivery Date (only show if scheduled delivery is selected) */}
          {selectedDeliveryOption?.requiresDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select delivery date<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  min={minDateString}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6150FF] focus:border-transparent text-gray-500 focus:text-[#05054E]"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </span>
              </div>
            </div>
          )}

          {/* Delivery Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery destination<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                placeholder="Search for a location"
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6150FF] focus:border-transparent text-gray-500 focus:text-[#05054E] pr-10"
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </span>
            </div>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            disabled={!deliveryType || !deliveryLocation || (selectedDeliveryOption?.requiresDate && !deliveryDate)}
            className="w-full bg-[#6150FF] text-white py-4 rounded-xl text-lg font-medium shadow-lg hover:bg-[#6150FF]/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
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
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface UserInfoFormProps {
  onSubmit: (data: {
    fullName: string
    email: string
    phone: string
    organization?: string
  }) => void
}

export default function UserInfoForm({ onSubmit }: UserInfoFormProps) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [organization, setOrganization] = useState('')

  // Load saved data when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('printRequest')
    if (savedData) {
      const data = JSON.parse(savedData)
      setFullName(data.fullName || '')
      setEmail(data.email || '')
      setPhone(data.phone || '')
      setOrganization(data.organization || '')
    }
  }, [])

  // Save data whenever it changes
  useEffect(() => {
    if (fullName || email || phone || organization) {
      const currentData = JSON.parse(localStorage.getItem('printRequest') || '{}')
      localStorage.setItem('printRequest', JSON.stringify({
        ...currentData,
        fullName,
        email,
        phone,
        organization
      }))
    }
  }, [fullName, email, phone, organization])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName || !email || !phone) return

    onSubmit({
      fullName,
      email,
      phone,
      ...(organization && { organization })
    })
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
            href="/upload/delivery"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#6150FF]/10 text-[#6150FF] hover:bg-[#6150FF]/20 transition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-medium text-[#05054E]">
            Tell us about yourself
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full text-gray-900 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6150FF] focus:border-transparent"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full text-gray-900 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6150FF] focus:border-transparent"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full text-gray-900 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6150FF] focus:border-transparent"
              required
            />
          </div>

          {/* Organization (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organization <span className="text-gray-400">(Optional)</span>
            </label>
            <input
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="Enter your organization name"
              className="w-full text-gray-900 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6150FF] focus:border-transparent"
            />
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            disabled={!fullName || !email || !phone}
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
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const PRINT_TYPES = [
  'Business Cards',
  'Flyers',
  'Banners',
  'Brochures',
  'Posters',
  'Stickers',
  'Custom Packaging',
  'Brand Merchandise',
  'Other'
]

const SIZES = [
  'Standard',
  'Custom Size',
  'Multiple Sizes'
]

interface PrintUploadFormProps {
  onSubmit: (data: {
    printType: string
    size: string
    quantity: string
    file?: File
    notes?: string
  }) => void
}

export default function PrintUploadForm({ onSubmit }: PrintUploadFormProps) {
  const [printType, setPrintType] = useState('')
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [notes, setNotes] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load saved data when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('printRequest')
    if (savedData) {
      const data = JSON.parse(savedData)
      setPrintType(data.printType || '')
      setSize(data.size || '')
      setQuantity(data.quantity || '')
      setNotes(data.notes || '')
    }
  }, [])

  // Save data whenever it changes
  useEffect(() => {
    if (printType || size || quantity || notes) {
      const currentData = JSON.parse(localStorage.getItem('printRequest') || '{}')
      localStorage.setItem('printRequest', JSON.stringify({
        ...currentData,
        printType,
        size,
        quantity,
        notes
      }))
    }
  }, [printType, size, quantity, notes])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!printType || !size || !quantity) return

    onSubmit({
      printType,
      size,
      quantity,
      ...(file && { file }),
      ...(notes && { notes })
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)

    // Save file name to localStorage
    const currentData = JSON.parse(localStorage.getItem('printRequest') || '{}')
    localStorage.setItem('printRequest', JSON.stringify({
      ...currentData,
      file: selectedFile.name
    }))

    // Simulate upload progress
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 100)
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
      >
        <h1 className="text-2xl sm:text-3xl font-medium text-[#05054E] mb-8">
          What would you like to print?
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Print Type */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type of printing<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                className="w-full px-4 py-3 text-left bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6150FF] focus:border-transparent text-gray-500 focus:text-[#05054E]"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {printType || 'Select print type'}
                <span className="absolute right-4 top-1/2 -translate-y-1/2">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  {PRINT_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                      onClick={() => {
                        setPrintType(type)
                        setIsDropdownOpen(false)
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Size */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                className="w-full px-4 py-3 text-left bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6150FF] focus:border-transparent text-gray-500 focus:text-[#05054E]"
                onClick={() => setIsSizeDropdownOpen(!isSizeDropdownOpen)}
              >
                {size || 'Select size'}
                <span className="absolute right-4 top-1/2 -translate-y-1/2">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
              </button>
              {isSizeDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  {SIZES.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                      onClick={() => {
                        setSize(option)
                        setIsSizeDropdownOpen(false)
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6150FF] focus:border-transparent"
              required
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload your file
            </label>
            <div 
              className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-[#6150FF] transition"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.ai,.psd,.jpg,.jpeg,.png"
              />
              {file ? (
                <div>
                  <p className="text-[#05054E] font-medium">{file.name}</p>
                  {uploadProgress < 100 ? (
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                      <div 
                        className="h-full bg-[#6150FF] rounded-full transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  ) : (
                    <p className="text-green-600 text-sm mt-1">Upload complete!</p>
                  )}
                </div>
              ) : (
                <div>
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, AI, PSD, JPG, PNG up to 10MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional notes <span className="text-gray-400">(Optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special instructions or requirements?"
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6150FF] focus:border-transparent"
            />
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            disabled={!printType || !size || !quantity}
            className="w-full bg-[#6150FF] text-white py-4 rounded-xl text-lg font-medium shadow-lg hover:bg-[#6150FF]/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Delivery
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
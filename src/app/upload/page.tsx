'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function UploadIntro() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the main upload flow after 6 seconds (doubled from 3)
    const timer = setTimeout(() => {
      router.push('/upload/start')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-[#F5F5FF]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="flex flex-col items-center"
        initial={{ scale: 0.8, opacity: 0, y: -30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="inline-flex items-center space-x-2 bg-gray-50 rounded-[75px] px-4 sm:px-6 py-4 shadow-sm border border-gray-100 mb-24">
          <Image src="/Assets/logo.svg" alt="Printmote logo" width={200} height={73} priority className="w-[180px] sm:w-[250px] h-auto" />
          <span className="text-xs bg-indigo-900 text-white px-2 py-0.5 rounded">BETA</span>
        </div>
        
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl font-medium text-[#05054E] max-w-4xl leading-[1.2] -mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          Hey, let's get <br/>
          you <span className="text-[#6150FF]">printing</span>⚡️in <br/>
          a few steps...
        </motion.h1>
      </motion.div>
    </motion.div>
  )
} 
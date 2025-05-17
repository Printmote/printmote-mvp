'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import CallbackModal from '@/components/CallbackModal'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCallbackRequest = (phoneNumber: string) => {
    // Here you would typically send this to your backend
    console.log('Callback requested for:', phoneNumber);
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-white relative overflow-hidden">
      {/* Emojis - Floating/animated */}
      <motion.div
        className="absolute top-32 md:top-52 left-8 md:left-24 lg:left-52 w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 cursor-pointer"
        animate={{ 
          y: [0, -10, 0],
          rotate: [-5, 5, -5]
        }}
        whileTap={{ 
          scale: 0.8,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <Image src="/Assets/emoji-bag.png" alt="Bag" width={96} height={96} priority className="w-full h-full" />
      </motion.div>
      <motion.div
        className="absolute top-32 md:top-52 right-8 md:right-24 lg:right-52 w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 cursor-pointer"
        animate={{ 
          y: [0, -10, 0],
          rotate: [5, -5, 5]
        }}
        whileTap={{ 
          scale: 0.8,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <Image src="/Assets/emoji-shirt.png" alt="Shirt" width={96} height={96} priority className="w-full h-full" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 md:bottom-52 left-8 md:left-24 lg:left-52 w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 cursor-pointer"
        animate={{ 
          y: [0, -10, 0],
          rotate: [-5, 5, -5]
        }}
        whileTap={{ 
          scale: 0.8,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <Image src="/Assets/emoji-document.png" alt="Doc" width={96} height={96} priority className="w-full h-full" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 md:bottom-52 right-8 md:right-24 lg:right-52 w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 cursor-pointer"
        animate={{ 
          y: [0, -10, 0],
          rotate: [5, -5, 5]
        }}
        whileTap={{ 
          scale: 0.8,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <Image src="/Assets/emoji-gift.png" alt="Gift" width={96} height={96} priority className="w-full h-full" />
      </motion.div>

      {/* Logo */}
      <div className="mt-6 mb-4">
        <div className="inline-flex items-center space-x-2 bg-gray-50 rounded-[75px] px-4 sm:px-6 py-4 shadow-sm border border-gray-100">
          <Image src="/Assets/logo.svg" alt="Printmote logo" width={200} height={73} priority className="w-[180px] sm:w-[250px] h-auto" />
          <span className="text-xs bg-indigo-900 text-white px-2 py-0.5 rounded">BETA</span>
        </div>
      </div>

      {/* Hero Text */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] text-[#05054E] mt-8 mb-6 px-4">
        Print in Accra without <br className="hidden sm:block" /> leaving your Desk.
      </h1>

      <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-700 max-w-2xl px-4 font-medium">
        Business cards, banners, packaging, brand merch and more printed remotely and delivered across Accra.
      </p>

      {/* CTA Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-5 px-4">
        <Link
          href="/upload"
          className="w-full sm:w-auto bg-[#6150FF] text-white px-6 sm:px-10 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-medium shadow-lg hover:bg-[#6150FF]/90 transition inline-flex items-center justify-center gap-3"
        >
          <Image src="/Assets/upload-icon.svg" alt="" width={24} height={24} className="w-6 sm:w-7 h-6 sm:h-7" />
          Upload Request
        </Link>
        <Link
          href="https://wa.me/233XXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto border-2 border-[#6150FF] text-[#6150FF] px-6 sm:px-10 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-medium hover:bg-[#6150FF]/5 transition inline-flex items-center justify-center gap-3"
        >
          <Image src="/Assets/whatsapp-icon.svg" alt="" width={24} height={24} className="w-6 sm:w-7 h-6 sm:h-7" />
          WhatsApp Request
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-20 text-sm text-gray-400">
        © 2025 Printmote Tech (CS101203948)
      </footer>

      {/* Callback Modal */}
      <CallbackModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCallbackRequest}
      />
    </main>
  )
}

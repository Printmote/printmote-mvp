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
    <>
      {/* Banner */}
      <div className="w-full bg-[#050038] text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <span className="text-base sm:text-lg text-center">Printmote is more than just a business,<br className="block sm:hidden" /> we are on a mission...</span>
          <Link
            href="/about"
            className="whitespace-nowrap inline-block bg-white text-[#050038] text-sm sm:text-base font-medium px-6 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Learn why we launched Printmote
          </Link>
        </div>
      </div>

      <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-[#F5F5FF] relative overflow-hidden">
        {/* Commented out Emojis
        <motion.div
          className="absolute top-32 md:top-52 left-8 md:left-24 lg:left-52 w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 cursor-pointer"
          animate={{ 
            y: [0, -10, 0],
            rotate: [-5, 5, -5]
          }}
          style={{ zIndex: 0 }}
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
          style={{ zIndex: 0 }}
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
          style={{ zIndex: 0 }}
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
          style={{ zIndex: 0 }}
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
        */}

        

        {/* Floating Call Me Back Button */}
        <motion.button
          className="fixed bottom-8 right-8 z-50 bg-[#6150FF] text-white px-6 py-4 rounded-full shadow-lg hover:bg-[#6150FF]/90 transition flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          Request a Call Me Back
        </motion.button>

        {/* Main content wrapper with higher z-index */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="mt-12 mb-16">
            <div className="inline-flex items-center space-x-2 bg-gray-50 rounded-[75px] px-4 sm:px-6 py-4 shadow-sm border border-gray-100">
              <Image src="/Assets/logo.svg" alt="Printmote logo" width={200} height={73} priority className="w-[180px] sm:w-[250px] h-auto" />
              <span className="text-xs bg-indigo-900 text-white px-2 py-0.5 rounded">BETA</span>
            </div>
          </div>

          {/* Hero Text */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1] text-[#05054E] mt-8 mb-6 px-4">
            Print in Accra without <br className="hidden sm:block" /> leaving your Desk.
          </h1>

          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-700 max-w-2xl px-4 font-medium mx-auto">
            Business cards, banners, packaging, brand merch and more printed remotely and delivered across Accra.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5 px-4 w-full">
            <Link
              href="/upload"
              className="w-full sm:w-auto bg-[#6150FF] text-white px-6 sm:px-10 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-medium shadow-lg hover:bg-[#6150FF]/90 transition inline-flex items-center justify-center gap-3"
            >
              <Image src="/Assets/upload-icon.svg" alt="" width={24} height={24} className="w-6 sm:w-7 h-6 sm:h-7" />
              Upload Your Print Job
            </Link>
            <Link
              href="https://wa.me/233543982124"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border-2 border-[#6150FF] text-[#6150FF] px-6 sm:px-10 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-medium hover:bg-[#6150FF]/5 transition inline-flex items-center justify-center gap-3"
            >
              <Image src="/Assets/whatsapp-icon.svg" alt="" width={24} height={24} className="w-6 sm:w-7 h-6 sm:h-7" />
              Start on WhatsApp
            </Link>
          </div>
          

          {/* Illustration Section */}
          <div className="mt-16 mb-20 w-full max-w-4xl mx-auto px-4">
            <Image
              src="/Assets/printmote-illustration.png"
              alt="Printmote Service Illustration"
              width={1200}
              height={800}
              className="w-full h-auto rounded-2xl shadow-lg"
              priority
            />
          </div>

          {/* Footer */}
          <footer className="mt-20 mb-12 text-sm text-gray-400">
            © 2025 Printmote Tech (Duly Registered Ghanaian Company)
          </footer>
        </div>

        {/* Callback Modal */}
        <CallbackModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCallbackRequest}
        />
      </main>
    </>
  )
}

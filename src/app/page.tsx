'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import CallbackModal from '@/components/CallbackModal'
import NavbarComponent from '@/components/ui/Navbar'
import LandingHeroSection from '@/components/ui/sections/landingHero'



export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCallbackRequest = (phoneNumber: string) => {
    // Here you would typically send this to your backend
    console.log('Callback requested for:', phoneNumber);
    setIsModalOpen(false);
  };

  
  return (
    <>
      
      <main className="h-screen flex flex-col items-center justify-center px-4 text-center bg-[#F5F5FF] relative overflow-hidden">
        <NavbarComponent />
        <LandingHeroSection/>
      </main>
    </>
  )
}

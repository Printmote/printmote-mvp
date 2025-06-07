"use client"

// create success page for upload
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'


const SuccessPage = () => { 
    const router = useRouter()
    
    useEffect(() => {
        // Clear localStorage on success page load
        localStorage.removeItem('printRequest')
        // Optionally, redirect to home or another page after a delay
        const timer = setTimeout(() => {
        router.push('/')
        }, 5000)
    
        return () => clearTimeout(timer)
    }, [router])
    
    return (
        <motion.div
        className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        >
        <h1 className="text-4xl font-bold mb-4">Upload Successful!</h1>
        <p className="text-lg mb-6">Thank you for your submission. We will process your request shortly.</p>
        <Link href="/" className="text-blue-500 hover:underline">
            Go back to home
        </Link>
        </motion.div>
    )
    }
export default SuccessPage;
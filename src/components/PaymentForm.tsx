'use client'

import { useState, useEffect, use } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { sendEmail } from '@/utils/emailService';
import { useRouter } from 'next/navigation'

interface PaymentFormProps {
  onSubmit: (data: { paymentMethod: string }) => void
}

export default function PaymentForm({ onSubmit }: PaymentFormProps) {
  const [orderSummary, setOrderSummary] = useState<any>(null)
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Retrieve all data from localStorage
    const savedData = localStorage.getItem('printRequest')
    if (savedData) {
      const data = JSON.parse(savedData)
      setOrderSummary(data)
    }
  }, [])

  const calculateTotal = () => {
    let total = 0
    if (orderSummary) {
      if (orderSummary.deliveryType === 'Within 24 hours') total += 35.0
      else if (orderSummary.deliveryType === 'Scheduled (Two or more days ahead)') total += 30.0
      total += 50.0 // static print cost
    }
    return total.toFixed(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderSummary) return;

    setLoading(true);

    // Combine all data into a single payload
    const payload = {
      size: orderSummary.size,
      quantity: orderSummary.quantity,
      file: orderSummary.file,
      notes: orderSummary.notes,
      deliveryType: orderSummary.deliveryType,
      deliveryDate: orderSummary.deliveryDate,
      deliveryLocation: orderSummary.deliveryLocation,
      fullName: orderSummary.fullName,
      customer_name: orderSummary.fullName,
      email: orderSummary.email,
      phone: orderSummary.phone,
      organization: orderSummary.organization,
      total: parseFloat(calculateTotal()),
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    // Save to Supabase
    const { error } = await supabase.from('print_requests').insert([payload]);

    setLoading(false);

    if (error) {
      console.error('Error saving order:', error);
      alert('Failed to place order. Please try again.' + error.message);
      return;
    }

    // Send emails
    try {
      // Email to the user
      const userEmailResult = await sendEmail({
        to: orderSummary.email,
        subject: 'Order Confirmation',
        html: `<p>Hi ${orderSummary.fullName},</p><p>Your order has been successfully placed!</p><p>Order Details:</p><ul><li>Size: ${orderSummary.size}</li><li>Quantity: ${orderSummary.quantity}</li><li>Total: GHS ${calculateTotal()}</li></ul>`,
      });

      if (!userEmailResult.success) {
        console.error('Failed to send email to user:', userEmailResult.error);
      }

      // Email to the business
      const businessEmailResult = await sendEmail({
        to: 'printmoteit@gmail.com',
        subject: 'New Order Received',
        html: `<p>A new order has been placed by ${orderSummary.fullName}.</p><p>Order Details:</p><ul><li>Size: ${orderSummary.size}</li><li>Quantity: ${orderSummary.quantity}</li><li>Total: GHS ${calculateTotal()}</li></ul>`,
      });

      if (!businessEmailResult.success) {
        console.error('Failed to send email to business:', businessEmailResult.error);
      }

      console.log('Emails sent successfully');
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
    }

    // Clear localStorage and notify parent component
    localStorage.removeItem('printRequest');
    onSubmit({ paymentMethod: 'pending' });

    // Redirect to the success page
    router.push('/upload/success');
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
        <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Additional Inputs */}
          <div className="space-y-4">
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                defaultValue={orderSummary?.notes || ''}
              />
            </div>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                defaultValue={orderSummary?.fullName || ''}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                defaultValue={orderSummary?.email || ''}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                defaultValue={orderSummary?.phone || ''}
              />
            </div>
            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                Organization
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                defaultValue={orderSummary?.organization || ''}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6150FF] text-white py-4 rounded-xl text-lg font-medium shadow-lg hover:bg-[#6150FF]/90 transition disabled:opacity-50"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </motion.div>
      
      <footer className="mt-8 mb-6 text-center text-sm text-gray-400">
        © 2025 Printmote Tech (CS101203948)
      </footer>
    </div>
  )
}

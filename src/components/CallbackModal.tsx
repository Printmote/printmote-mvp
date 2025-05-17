import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (phoneNumber: string) => void;
}

export default function CallbackModal({ isOpen, onClose, onSubmit }: CallbackModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const value = inputValue.replace(/\D/g, ''); // Only allow digits
    
    // Only show error if non-numeric characters were entered
    if (inputValue !== value) {
      setError('Incorrect input, please type your 10 digit phone number');
      // Clear error after 2 seconds
      setTimeout(() => setError(''), 2000);
    }

    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      onSubmit(phoneNumber);
      setPhoneNumber('');
      setError('');
      toast.success(
        <div className="flex flex-col gap-1">
          <span className="font-semibold">Message sent!</span>
          <span className="text-sm opacity-90">We will call you back in less than 15 mins</span>
        </div>
      );
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#050038] text-white p-8 rounded-2xl max-w-md w-full mx-4 relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-4">Request a Call me back</h2>
        
        <div className="h-px bg-white/20 -mx-8"></div>
        
        <p className="text-lg mt-6 mb-6">
          Hello there, nice to have you here. We print business cards, banners, packaging, brand merch and more and deliver it at your door.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="tel"
              inputMode="numeric"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="Type number to request a Call"
              pattern="[0-9]{10}"
              maxLength={10}
              className="w-full px-4 py-3 bg-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#6150FF]"
              required
            />
            <button
              type="submit"
              disabled={phoneNumber.length !== 10}
              className={`absolute right-2 top-[50%] -translate-y-[50%] flex items-center justify-center p-2 rounded-full transition-all duration-200 ${
                phoneNumber.length === 10
                  ? 'bg-[#6150FF] hover:bg-[#6150FF]/90 cursor-pointer' 
                  : 'bg-white/10 cursor-not-allowed'
              }`}
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className={phoneNumber.length === 10 ? 'text-white' : 'text-white/40'}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-sm mt-2"
              >
                {error}
              </motion.p>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
} 
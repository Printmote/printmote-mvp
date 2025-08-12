'use client'

import { motion } from 'framer-motion'

interface ProgressStepsProps {
  currentStep: number
  steps: {
    title: string
    description: string
  }[]
}

export default function ProgressSteps({ currentStep, steps }: ProgressStepsProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      {/* Progress bar */}
      <div className="relative">
        <div className="absolute top-5 w-full h-1 bg-gray-200 rounded-full" />
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep
            const isCurrent = index === currentStep
            
            return (
              <div key={step.title} className="relative flex flex-col items-center">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: isCompleted || isCurrent ? '#6150FF' : '#fff',
                    borderColor: isCompleted || isCurrent ? '#6150FF' : '#E5E7EB',
                    scale: isCurrent ? 1.1 : 1
                  }}
                  className="w-10 h-10 rounded-full border-2 bg-white flex items-center justify-center relative z-10"
                >
                  {isCompleted ? (
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className={`text-sm font-medium ${isCurrent ? 'text-white' : 'text-gray-500'}`}>
                      {index + 1}
                    </span>
                  )}
                </motion.div>
                <div className="mt-3 flex flex-col items-center">
                  <span className={`text-sm font-medium ${isCurrent ? 'text-[#05054E]' : 'text-gray-500'}`}>
                    {step.title}
                  </span>
                  <span className="text-xs text-gray-400 text-center mt-1 max-w-[120px]">
                    {step.description}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 
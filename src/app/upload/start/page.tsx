"use client";

import { useState, useEffect } from "react";
import StepFormRenderer from "../form/multiStepForm";
import ProgressIndicatorPill from "@/components/ui/ProgressIndicatorPill";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const saved = localStorage.getItem("uploadForm");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("uploadForm", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (change: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { target: { name: string; value: any } }) => {
    const { name, value } = 'target' in change ? change.target : change;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const steps = [
    { id: "print-details", label: "Print Details" },
    { id: "delivery-details", label: "Delivery" },
    { id: "user-info", label: "Your Info" },
    { id: "review", label: "Review" }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row h-screen">
      <aside className="lg:w-[10%] lg:h-full h-fit py-6 flex flex-row lg:flex-col items-start justify-center lg:space-x-0 space-x-2 lg:overflow-hidden">
        {steps.map((step, index) => (
          <ProgressIndicatorPill
            key={step.id}
            label={step.label}
            description={step.label}
            step={index + 1}
            isActive={index === currentStep}
            isCompleted={index < currentStep}
            isLast={index === steps.length - 1}
          />
        ))}
      </aside>
    <div className="flex flex-col w-full px-8">
            <div className="flex w-full justify-between items-center mt-8">
                {steps.map((step, index)=> (
                    <h1 key={index}>{step.label}</h1>
                ))}
                <div className=" gap-4 actions hidden lg:flex">
            <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-6 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
            >
            Back
            </button>
        
            {currentStep < steps.length - 1 ? (
            <button
                onClick={nextStep}
                className="px-6 py-2 bg-[#6150FF] text-white rounded-lg hover:bg-[#5040E6]"
            >
                Next
            </button>
            ) : null}
        </div>
            </div>

      <StepFormRenderer
        currentStep={currentStep}
        steps={steps}
        formData={formData}
        handleChange={handleChange}
        />
        <div className=" gap-4 actions lg:hidden flex w-screen fixed bg-[#f5f5ff] bottom-0 left-0 px-4 py-4">
            <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-6 py-2 border border-gray-300 rounded-lg disabled:opacity-50 w-full"
            >
            Back
            </button>
        
            {currentStep < steps.length - 1 ? (
            <button
                onClick={nextStep}
                className="px-6 py-2 bg-[#6150FF] text-white rounded-lg hover:bg-[#5040E6] w-full"
            >
                Next
            </button>
            ) : null}
        </div>
        </div>
    </div>
  );
};

export default MultiStepForm;
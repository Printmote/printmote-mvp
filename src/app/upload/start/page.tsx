"use client";

import { useState, useEffect } from "react";
import StepFormRenderer from "../form/multiStepForm";
import ProgressIndicatorPill from "@/components/ui/ProgressIndicatorPill";
import Image from "next/image";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Load formData from localStorage on client only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("uploadForm");
      if (saved) setFormData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("uploadForm", JSON.stringify(formData));
    }
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

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="w-full flex flex-col lg:flex-row h-screen">

      <div className="flex flex-col w-full px-8 py-10">
            <div className="w-full flex flex-col items-center justify-center">
            <Image src={'/Assets/logo.svg'} width={200} height={200} alt="image-logo"/>
            </div>
       <div className="w-full flex items-center justify-center">
       <div className="w-[500px] h-2 bg-gray-200 rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-[#6150FF] transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          >
          </div>
       </div>
        </div>
        {/* <div className="absolute bottom-4 left-0 flex w-full justify-between items-center mt-8">
          <div className="gap-4 actions hidden lg:flex">
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
        </div> */}

        <StepFormRenderer
          currentStep={currentStep}
          steps={steps}
          formData={formData}
          handleChange={handleChange}
        />
        <div className="gap-4 actions flex items-center justify-center w-full bg-[#f5f5ff] bottom-0 px-4 py-4 pb-20">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-6 py-4 border rounded-full border-gray-300 disabled:opacity-50 w-full font-semibold lg:max-w-[30vw] ${currentStep === 0 ? "hidden" : ""}`}
          >
            Back
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={nextStep}
              className="px-6 py-4 rounded-full bg-[#6150FF] text-white hover:bg-[#5040E6] w-full lg:max-w-[30vw] font-semibold"
            >
              Continue
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
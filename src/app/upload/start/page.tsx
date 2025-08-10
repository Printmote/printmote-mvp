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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-[#F5F5FF]">
      <h1 className="text-4xl font-bold text-[#05054E]">Upload Flow Coming Soon</h1>
    </div>
  )
} 
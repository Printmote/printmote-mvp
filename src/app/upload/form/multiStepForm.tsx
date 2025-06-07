"use client";

import React from "react";
import PrintDetailsStep from "./StepPrintDetails";
import DeliveryDetailsStep from "./StepDeliveryDetails";
import UserInfoStep from "./StepUserInfo";
import ReviewSubmitStep from "./StepReviewDetails";

type Step = {
  id: string;
  label: string;
  description?: string;
};

interface Props {
  currentStep: number;
  steps: Step[];
  formData: Record<string, any>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { target: { name: string; value: any } }) => void;
}

const StepFormRenderer: React.FC<Props> = ({ currentStep, steps, formData, handleChange }) => {
  const stepId = steps[currentStep]?.id;

  // Create a unified change handler that works with both event objects and direct values
  const unifiedHandleChange = (change: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { target: { name: string; value: any } }) => {
    handleChange(change);
  };

  switch (stepId) {
    case "print-details":
      return <PrintDetailsStep formData={formData} handleChange={unifiedHandleChange} />;

    case "delivery-details":
      return <DeliveryDetailsStep formData={formData} handleChange={unifiedHandleChange} />;

    case "user-info":
      return <UserInfoStep formData={formData} handleChange={unifiedHandleChange} />;

    case "review":
      return <ReviewSubmitStep formData={formData} />;

    default:
      return null;
  }
};

export default StepFormRenderer;
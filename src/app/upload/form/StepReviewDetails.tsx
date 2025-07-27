"use client";

import { useState } from "react";
import { HiCheck, HiExclamationCircle } from "react-icons/hi";

interface ReviewSubmitProps {
  formData: Record<string, any>;
}

const ReviewSubmitStep: React.FC<ReviewSubmitProps> = ({ formData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  console.log (formData as Object);
  
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.fullName?.trim()) errors.fullName = "Full name is required";
    if (!formData.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.phoneNumber?.trim()) errors.phoneNumber = "Phone number is required";
    if (!formData.printType) errors.printType = "Print type is required";
    if (!formData.deliveryType) errors.deliveryType = "Delivery method is required";
    if (!formData.deliveryDestination?.trim()) errors.deliveryDestination = "Address is required";
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
};

 const handleSubmit = async () => {
  setIsSubmitting(true);
  setSubmitError(null);

  try {
    const response = await fetch('/api/submit-to-notion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formData: {
          ...formData,
          totalCost: calculateEstimatedCost()
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Submission failed');
    }

    setSubmitSuccess(true);
    localStorage.removeItem("uploadForm");

    // Optional: Show Notion URL
    console.log('Notion page created:', data.notionUrl);

  } catch (error) {
    console.error('Submission error:', error);
    setSubmitError(
      error instanceof Error ? 
        error.message : 
        'Failed to submit order. Please try again.'
    );
  } finally {
    setIsSubmitting(false);
  }
};

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateEstimatedCost = () => {
    let baseCost = 0;
    const quantity = parseInt(formData.quantity) || 1;
    
    if (formData.printType === "Posters") baseCost = quantity * 5.0;
    else if (formData.printType === "Business Cards") baseCost = quantity * 0.2;
    else baseCost = quantity * 2.0;
    
    if (formData.deliveryType?.includes("Express")) baseCost += 10;
    else if (formData.deliveryType?.includes("Same Day")) baseCost += 20;
    else if (formData.deliveryType?.includes("Standard")) baseCost += 5;
    
    return baseCost.toFixed(2);
  };

  const handleEditStep = (step: string) => {
    // Logic to navigate to the specific step
    console.log(`Navigating to step: ${step}`);
  };

  if (submitSuccess) {
    return (
      <div className="mx-auto p-6 w-full ">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HiCheck className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-[#151515] mb-2">
            Order Submitted Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We'll contact you shortly.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#6150FF] text-white px-6 py-3 rounded-lg hover:bg-[#5040E6] transition-colors"
          >
            Start New Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#151515] mb-2">
          Review Your Order
        </h2>
        <p className="text-gray-600">
          Please review all details before submitting
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-[#151515]">Personal Information</h3>
            <button
              onClick={() => handleEditStep("Personal Information")}
              className="text-xs bg-[#6150FF] text-white px-3 py-1 rounded-full hover:bg-[#5040E6] transition-colors"
            >
              Edit
            </button>
          </div>
          <ul className="space-y-4">
            <li>
              <p className="text-sm text-gray-600">Full Name</p>
              <p className="font-medium text-[#151515]">{formData.fullName || "Not provided"}</p>
              {validationErrors.fullName && (
                <p className="text-red-500 text-sm">{validationErrors.fullName}</p>
              )}
            </li>
            <li>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-[#151515]">{formData.email || "Not provided"}</p>
              {validationErrors.email && (
                <p className="text-red-500 text-sm">{validationErrors.email}</p>
              )}
            </li>
            <li>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium text-[#151515]">{formData.phoneNumber || "Not provided"}</p>
              {validationErrors.phoneNumber && (
                <p className="text-red-500 text-sm">{validationErrors.phoneNumber}</p>
              )}
            </li>
          </ul>
        </div>

        {/* Print Details Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-[#151515]">Print Details</h3>
            <button
              onClick={() => handleEditStep("Print Details")}
              className="text-xs bg-[#6150FF] text-white px-3 py-1 rounded-full hover:bg-[#5040E6] transition-colors"
            >
              Edit
            </button>
          </div>
          <ul className="space-y-4">
            <li>
              <p className="text-sm text-gray-600">Print Type</p>
              <p className="font-medium text-[#151515]">{formData.printType || "Not specified"}</p>
              {validationErrors.printType && (
                <p className="text-red-500 text-sm">{validationErrors.printType}</p>
              )}
            </li>
            <li>
              <p className="text-sm text-gray-600">Quantity</p>
              <p className="font-medium text-[#151515]">{formData.quantity || "Not specified"}</p>
            </li>
            {formData.designFile && (
              <li>
                <p className="text-sm text-gray-600">Design File</p>
                <p className="font-medium text-[#151515]">{formData.designFile.name}</p>
              </li>
            )}
          </ul>
        </div>

        {/* Delivery Information Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-[#151515]">Delivery Information</h3>
            <button
              onClick={() => handleEditStep("Delivery Information")}
              className="text-xs bg-[#6150FF] text-white px-3 py-1 rounded-full hover:bg-[#5040E6] transition-colors"
            >
              Edit
            </button>
          </div>
          <ul className="space-y-4">
            <li>
              <p className="text-sm text-gray-600">Delivery Method</p>
              <p className="font-medium text-[#151515]">{formData.deliveryType || "Not specified"}</p>
              {validationErrors.deliveryType && (
                <p className="text-red-500 text-sm">{validationErrors.deliveryType}</p>
              )}
            </li>
            <li>
              <p className="text-sm text-gray-600">Delivery Date</p>
              <p className="font-medium text-[#151515]">{formatDate(formData.deliveryDate)}</p>
            </li>
            <li>
              <p className="text-sm text-gray-600">Delivery Address</p>
              <p className="font-medium text-[#151515]">{formData.deliveryDestination || "Not specified"}</p>
              {validationErrors.deliveryDestination && (
                <p className="text-red-500 text-sm">{validationErrors.deliveryDestination}</p>
              )}
            </li>
          </ul>
        </div>

        {/* Pricing Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-start items-center mb-4">
            <h3 className="text-lg font-medium text-[#151515]">Pricing</h3>
          </div>
          <ul className="space-y-4">
            <li>
              <p className="text-sm text-gray-600">Price</p>
              <p className="font-medium text-[#151515]">The price will be invoiced to you.</p>
            </li>
          </ul>
        </div>
      </div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <HiExclamationCircle className="w-5 h-5 text-red-600" />
          <p className="text-red-800">{submitError}</p>
        </div>
      )}

      <div className="flex justify-center pt-4">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-[#6150FF] text-white px-8 py-4 rounded-lg hover:bg-[#5040E6] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-lg font-medium"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <HiCheck className="w-5 h-5" />
              Submit Order
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReviewSubmitStep;
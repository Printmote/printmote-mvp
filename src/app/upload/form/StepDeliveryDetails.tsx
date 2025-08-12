"use client";

import TextInput from "@/components/ui/InputComponent";
import { HiOutlineChevronDown, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface DeliveryDetailsProps {
  formData: Record<string, any>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const deliveryTypes = [
  { name: "Schedule", comingSoon: false },
  { name: "Within 24 hours", comingSoon: false },
  { name: "Same Day Delivery", comingSoon: true },
];

const DeliveryDetailsStep: React.FC<DeliveryDetailsProps> = ({ formData, handleChange }) => {
  const [isDeliveryTypeOpen, setIsDeliveryTypeOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    formData.deliveryDate ? new Date(formData.deliveryDate) : null
  );

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isDeliveryTypeOpen && !target.closest('.delivery-dropdown-container')) {
        setIsDeliveryTypeOpen(false);
      }
    };

    if (isDeliveryTypeOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDeliveryTypeOpen]);

  useEffect(() => {
    if (formData.deliveryType !== "Schedule") {
      setSelectedDate(null);
    }
  }, [formData.deliveryType]);

  const handleDeliveryTypeSelect = (deliveryType: string, comingSoon: boolean) => {
    if (comingSoon) return; // Disable selection for "Coming Soon" option

    handleChange({
      target: {
        name: "deliveryType",
        value: deliveryType
      }
    } as React.ChangeEvent<HTMLInputElement>);
    setIsDeliveryTypeOpen(false);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    handleChange({
      target: {
        name: "deliveryDate",
        value: date.toISOString().split('T')[0]
      }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isPast = isPastDate(date);
      const isBeyondLimit = (date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) > 5;

      days.push(
        <button
          key={day}
          onClick={() => !isPast && !isBeyondLimit && handleDateSelect(date)}
          disabled={isPast || isBeyondLimit}
          className={clsx(
            "p-2 text-sm rounded-lg transition-colors",
            "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#6150FF]",
            (isPast || isBeyondLimit) && "text-gray-300 cursor-not-allowed hover:bg-transparent",
            isToday(date) && !isSelected(date) && "bg-blue-50 text-blue-600 font-medium",
            isSelected(date) && "bg-[#6150FF] text-white font-medium",
            !isPast && !isToday(date) && !isSelected(date) && "text-[#151515]"
          )}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full p-6 h-full lg:px-[200px]">
      <h1 className="text-[48px] text-left py-8 text-[#05054E] font-bold leading-[1]">Where will you like it to delivered to??</h1>
      <div className="flex flex-col lg:flex-row gap-4 w-full h-full">
        {/* Calendar Section */}
        {formData.deliveryType === "Schedule" && (
          <div className="w-full bg-white rounded-lg border border-gray-200 p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[#151515] mb-4">Select Delivery Date</h3>

              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <HiChevronLeft className="w-5 h-5 text-gray-600" />
                </button>

                <h4 className="text-lg font-medium text-[#151515]">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h4>

                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <HiChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {renderCalendar()}
              </div>
            </div>

            {selectedDate && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Selected Date:</p>
                <p className="font-medium text-[#151515]">
                  {selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Form Section */}
        <div className="w-full space-y-4">
          <div className="w-full relative delivery-dropdown-container">

            <button
              type="button"
              className="w-full px-4 py-3 bg-gray-50 text-[#151515] rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6150FF] focus:border-transparent flex items-center justify-between"
              onClick={() => setIsDeliveryTypeOpen(!isDeliveryTypeOpen)}
            >
            <div className="flex flex-col justify-start items-start">
            <label className="block mb-1 font-medium text-sm text-[#868686]">
              Delivery Type
            </label>
              <span className="text-[30px]">{formData.deliveryType || "Select delivery type"}</span>
            </div>
              <HiOutlineChevronDown className="text-lg" />
            </button>

            {isDeliveryTypeOpen && !isMobile && (
              <div className="absolute mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-2 w-full z-50">
                {deliveryTypes.map(({ name, comingSoon }) => (
                  <button
                    key={name}
                    className={clsx(
                      "w-full text-left px-3 py-3 rounded-lg transition",
                      formData.deliveryType === name && "bg-gray-100 text-[#6150FF] font-medium",
                      comingSoon && "text-gray-400 cursor-not-allowed hover:bg-transparent"
                    )}
                    onClick={() => handleDeliveryTypeSelect(name, comingSoon)}
                    disabled={comingSoon}
                  >
                    {name}
                    {comingSoon && (
                      <span className="text-xs text-gray-500 ml-2">(Coming Soon)</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {isDeliveryTypeOpen && isMobile && (
              <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center" onClick={() => setIsDeliveryTypeOpen(false)}>
                <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4 m-4" onClick={(e) => e.stopPropagation()}>
                  <div className="text-lg font-semibold">Select Delivery Type</div>
                  <div className="space-y-2">
                    {deliveryTypes.map(({ name, comingSoon }) => (
                      <button
                        key={name}
                        className={clsx(
                          "w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-100",
                          formData.deliveryType === name && "bg-gray-100 border-[#6150FF]"
                        )}
                        onClick={() => handleDeliveryTypeSelect(name, comingSoon)}
                        disabled={comingSoon}
                      >
                        {name}
                        {comingSoon && <span className="text-xs text-gray-500 ml-2">(Coming Soon)</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <TextInput
            label="Delivery Destination"
            name="deliveryDestination"
            value={formData.deliveryDestination || ""}
            onChange={handleChange}
            placeholder="Enter your full delivery address"
            textarea
          />

          <TextInput
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber || ""}
            onChange={handleChange}
            placeholder="e.g. +233 XX XXX XXXX"
          />

          {formData.deliveryType !== "Schedule" && selectedDate && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Selected Date:</p>
              <p className="font-medium text-[#151515]">
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetailsStep;
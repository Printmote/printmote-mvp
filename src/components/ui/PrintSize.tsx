"use client";

import { useEffect, useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import clsx from "clsx";

const sizeOptionsMap: Record<string, string[]> = {
  Posters: ["A2", "A3", "A4"],
  Banners: ["2ft x 6ft", "3ft x 8ft", "4ft x 12ft"],
  Flyers: ["A5", "A6", "DL"],
  Brochures: ["Tri-fold", "Bi-fold", "Z-fold"],
  "Business Cards": ["Standard", "Square", "Mini"],
  Stickers: ["Round", "Square", "Die-cut"],
  "Custom Packaging": ["Box - Small", "Box - Medium", "Box - Large"],
  "Brand Merchandise": ["T-shirt", "Mug", "Cap"],
};

interface SizeDropdownProps {
  value: string;
  onChange: (value: string) => void;
  printType: string; // The selected print type to determine available sizes
}

const SizeDropdown: React.FC<SizeDropdownProps> = ({ value, onChange, printType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isOpen && !target.closest('.dropdown-container')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Reset selected size when print type changes
  useEffect(() => {
    if (printType && value) {
      const availableSizes = sizeOptionsMap[printType] || [];
      if (!availableSizes.includes(value)) {
        onChange('');
      }
    }
  }, [printType, value, onChange]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  const availableSizes = sizeOptionsMap[printType] || [];

  if (!printType || availableSizes.length === 0) {
    return (
      <div className="w-full">
        <label className="block mb-1 font-medium text-sm text-[#151515]">Size</label>
        <div className="w-full px-4 py-3 bg-gray-100 text-gray-400 rounded-xl border border-gray-200 flex items-center justify-between">
          <span>Select print type first</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative dropdown-container">
      <label className="block mb-1 font-medium text-sm text-[#151515]">Size</label>

      <button
        type="button"
        className="w-full px-4 py-3 bg-gray-50 text-[#151515] rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6150FF] focus:border-transparent flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || "Select a size"}</span>
        <HiOutlineChevronDown className="text-lg" />
      </button>

      {isOpen && !isMobile && (
        <div className="absolute mt-2 grid grid-cols-2 gap-2 bg-white border border-gray-200 rounded-xl shadow-lg p-4 w-full z-50">
          {availableSizes.map((size) => (
            <button
              key={size}
              className={clsx(
                "flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-gray-100 transition w-full text-center",
                value === size && "bg-gray-100 border border-[#6150FF]"
              )}
              onClick={() => handleSelect(size)}
            >
              <span className="text-sm font-medium">{size}</span>
            </button>
          ))}
        </div>
      )}

      {/* Mobile Modal */}
      {isOpen && isMobile && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center" onClick={() => setIsOpen(false)}>
          <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4 m-4" onClick={(e) => e.stopPropagation()}>
            <div className="text-lg font-semibold">Select Size</div>
            <div className="grid grid-cols-1 gap-3">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  className={clsx(
                    "flex items-center gap-3 p-3 py-4 rounded-lg border border-gray-200 hover:bg-gray-100 w-full",
                    value === size && "bg-gray-100 border-[#6150FF]"
                  )}
                  onClick={() => handleSelect(size)}
                >
                  <span>{size}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SizeDropdown;
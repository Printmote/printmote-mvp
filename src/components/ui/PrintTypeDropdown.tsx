"use client";

import { useEffect, useState } from "react";
import { PiTag, PiTShirt, PiNotePencil, PiPackage, PiCards, PiSticker, PiImage, PiNewspaper } from "react-icons/pi";
import { HiOutlineChevronDown } from "react-icons/hi";
import clsx from "clsx";

interface PrintOption {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const printOptions: PrintOption[] = [
  { label: "Posters", value: "Posters", icon: <PiImage size={24} /> },
  { label: "Banners", value: "Banners", icon: <PiTag size={24} /> },
  { label: "Flyers", value: "Flyers", icon: <PiNotePencil size={24} /> },
  { label: "Brochures", value: "Brochures", icon: <PiNewspaper size={24} /> },
  { label: "Business Cards", value: "Business Cards", icon: <PiCards size={24} /> },
  { label: "Stickers", value: "Stickers", icon: <PiSticker size={24} /> },
  { label: "Custom Packaging", value: "Custom Packaging", icon: <PiPackage size={24} /> },
  { label: "Brand Merchandise", value: "Brand Merchandise", icon: <PiTShirt size={24} /> },
];

interface PrintTypeDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const PrintTypeDropdown: React.FC<PrintTypeDropdownProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className="w-full relative">

      <button
        type="button"
        className="w-full px-4 pt-2 pb-4 bg-gray-50 text-[#151515] rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6150FF] focus:border-transparent flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
      <div className="flex flex-col justify-start items-start">
      <label className="block mb-1 text-sm text-[#868686]">Type of Printing</label>
      <span className="text-[30px] text-[#05054E]">{value || "Select a type"}</span>
      </div>
        <HiOutlineChevronDown className="text-lg" />
      </button>

      {isOpen && !isMobile && (
        <div className="absolute mt-2 grid grid-cols-4 gap-2 bg-white border border-gray-200 rounded-xl shadow-lg p-4 w-full z-50">
          {printOptions.map((option) => (
            <button
              key={option.value}
              className={clsx(
                "flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 transition w-full",
                value === option.value && "bg-gray-100 border border-[#6150FF]"
              )}
              onClick={() => handleSelect(option.value)}
            >
              {option.icon}
              <span className="text-sm">{option.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Mobile Modal */}
      {isOpen && isMobile && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center" onClick={() => setIsOpen(false)}>
          <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4 m-4">
            <div className="text-lg font-semibold">Select Type of Printing</div>
            <div className="grid grid-cols-1 gap-3">
              {printOptions.map((option) => (
                <button
                  key={option.value}
                  className={clsx(
                    "flex items-center gap-1 p-1 py-4 rounded-lg border border-gray-200 hover:bg-gray-100 w-full",
                    value === option.value && "bg-gray-100 border-[#6150FF]"
                  )}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
            {/* <button
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full text-center text-sm text-[#6150FF] underline"
            >
              Cancel
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintTypeDropdown;

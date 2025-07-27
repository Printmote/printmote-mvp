"use client";

import FileUpload from "@/components/ui/FileUpload";
import TextInput from "@/components/ui/InputComponent";
import SizeDropdown from "@/components/ui/PrintSize";
import PrintTypeDropdown from "@/components/ui/PrintTypeDropdown";

interface PrintDetailsProps {
  formData: Record<string, any>;
  handleChange: (change: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { target: { name: string; value: any } }) => void;
}

const printingOptions = [
  "Posters", "Banners", "Flyers", "Brochures",
  "Business Cards", "Stickers", "Custom Packaging", "Brand Merchandise"
];

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

const PrintDetailsStep: React.FC<PrintDetailsProps> = ({ formData, handleChange }) => {
  const handleFileChange = (file: File) => {
    handleChange({ target: { name: "designFile", value: file } });
  };

  const handlePrintTypeChange = (val: string) => {
    handleChange({ target: { name: "printType", value: val } });
  };

  const handleSizeChange = (val: string) => {
    handleChange({ target: { name: "size", value: val } });
  };

  const selectedType = formData.printType || printingOptions[0];
  const sizeOptions = sizeOptionsMap[selectedType] || [];

  return (
    <div className="mx-auto w-full p-6 h-fit">
      <div className="flex flex-col lg:gap-4 lg:px-[200px]">
          <h1 className="text-[48px] text-left py-8 text-[#05054E] font-bold leading-[1]">What will you like to print today?</h1>
        <div className="grid grid-cols-2 gap-4 w-full">
          <PrintTypeDropdown
            value={formData.printType}
            onChange={handlePrintTypeChange}
          />

          <SizeDropdown
            value={formData.size || ""}
            onChange={handleSizeChange}
            printType={formData.printType || ""}
          />
        </div>
        
        <TextInput
            label="Quantity"
            name="quantity"
            type="number"
            value={formData.quantity || ""}
            onChange={handleChange}
            placeholder="Enter quantity"
          />

<div className="w-full">
          <FileUpload
            label="Upload Design"
            name="designFile"
            file={formData.designFile}
            onChange={handleFileChange}
          />
        </div>

          <TextInput
            label="Additional Notes"
            name="notes"
            value={formData.notes || ""}
            onChange={handleChange}
            placeholder="e.g. Any design instructions or preferences"
            textarea
          />
      </div>
    </div>
  );
};

export default PrintDetailsStep;
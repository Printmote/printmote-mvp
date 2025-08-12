"use client";

import { useEffect, useRef, useState } from "react";
import { PiImage } from "react-icons/pi";

interface FileUploadProps {
  label: string;
  name: string;
  onChange: (file: File) => void;
  file?: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  onChange,
  file,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onChange(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      onChange(droppedFile);
    }
  };

  useEffect(() => {
    // Clear preview if no file
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    // Check if file has type property and is an image
    if (file && typeof file.type === 'string' && file.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl); // Clean up memory
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  return (
    <div className="w-full h-full h-[300px]">
      {/* <label className="block mb-1 font-medium text-[#151515]">{label}</label> */}
      <label
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        htmlFor={name}
        className="flex flex-col h-full w-full items-center justify-center px-4 py-3 bg-gray-50 text-[#151515] rounded-xl border border-gray-400 border-dashed cursor-pointer hover:border-[#6150FF] focus-within:ring-2 focus-within:ring-[#6150FF] overflow-hidden"
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Uploaded Preview"
            className="object-contain h-full w-auto"
          />
        ) : (
          <div className="flex flex-col gap-2 items-center justify-center text-gray-500 text-[#c3c3c3]">
            <PiImage size={60} />
            <p className="text-[20px]">Click to upload or drag and drop...</p>
          </div>
        )}

        <input
          ref={fileInputRef}
          id={name}
          name={name}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileUpload;
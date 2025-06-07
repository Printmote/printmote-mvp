"use client";

import TextInput from "@/components/ui/InputComponent";

interface UserInfoProps {
  formData: Record<string, any>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const UserInfoStep: React.FC<UserInfoProps> = ({ formData, handleChange }) => {
  return (
    <div className="mx-auto p-6 w-full lg:w-[50%]">
      <div className="space-y-4">
        {/* Full Name */}
        <TextInput
          label="Full Name"
          name="fullName"
          type="text"
          value={formData.fullName || ""}
          onChange={handleChange}
          placeholder="e.g. John Doe"
        />

        {/* Email */}
        <TextInput
          label="Email Address"
          name="email"
          type="email"
          value={formData.email || ""}
          onChange={handleChange}
          placeholder="e.g. john.doe@example.com"
        />

        {/* Organization */}
        <TextInput
          label="Organization"
          name="organization"
          type="text"
          value={formData.organization || ""}
          onChange={handleChange}
          placeholder="e.g. ABC Company, University of Ghana (Optional)"
        />

        {/* Form Summary */}
        {(formData.fullName || formData.email || formData.organization) && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Information Summary:</h3>
            <div className="space-y-1 text-sm text-gray-600">
              {formData.fullName && (
                <p><span className="font-medium">Name:</span> {formData.fullName}</p>
              )}
              {formData.email && (
                <p><span className="font-medium">Email:</span> {formData.email}</p>
              )}
              {formData.organization && (
                <p><span className="font-medium">Organization:</span> {formData.organization}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfoStep;
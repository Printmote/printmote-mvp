interface TextInputProps {
  label: string;
  name: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  textarea = false,
}) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-[#151515]">{label}</label>
    {textarea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-50 text-[#151515] rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6150FF] focus:border-transparent"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-50 text-[#151515] rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6150FF] focus:border-transparent"
      />
    )}
  </div>
);

export default TextInput;

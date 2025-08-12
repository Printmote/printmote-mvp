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
  <div className="relative w-full">
    <label
      className="absolute top-3 left-4 text-sm text-gray-500 transition-all pointer-events-none"
      htmlFor={name}
    >
      {label}
    </label>
    {textarea ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-8 bg-white text-gray-900 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6150FF] focus:border-transparent placeholder-gray-400 text-[30px] text-[#05054E]"
      />
    ) : (
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 pt-6 pb-4 bg-white text-gray-900 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6150FF] focus:border-transparent placeholder-gray-400 text-[30px] text-[#05054E]"
      />
    )}
  </div>
);

export default TextInput;

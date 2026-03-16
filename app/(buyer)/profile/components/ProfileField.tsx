interface ProfileFieldProps {
  label: string;
  value: string;
  type?: string;
  isSelect?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export const ProfileField = ({
  label,
  value,
  type = "text",
  isSelect = false,
  disabled = false,
  onChange,
}: ProfileFieldProps) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-semibold text-gray-700 ml-1">
        {label}
      </label>

      {isSelect ? (
        <select
          value={value}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-xl text-sm"
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      ) : (
        <input
          type={type}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-xl text-sm"
        />
      )}
    </div>
  );
};

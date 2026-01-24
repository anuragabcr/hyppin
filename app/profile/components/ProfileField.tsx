interface ProfileFieldProps {
  label: string;
  value: string;
  type?: string;
  isSelect?: boolean;
  onChangeAction?: () => void;
}

export const ProfileField = ({
  label,
  value,
  type = "text",
  isSelect = false,
  onChangeAction,
}: ProfileFieldProps) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-semibold text-gray-700 ml-1">
        {label}
      </label>
      <div className="relative flex items-center">
        {isSelect ? (
          <select
            className="w-full p-3 border border-gray-200 rounded-xl bg-white text-sm appearance-none focus:outline-blue-500"
            defaultValue={value}
          >
            <option value={value}>{value}</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
        ) : (
          <input
            type={type}
            defaultValue={value}
            className="w-full p-3 border border-gray-200 rounded-xl bg-white text-sm focus:outline-blue-500"
          />
        )}

        {onChangeAction && (
          <button
            type="button"
            onClick={onChangeAction}
            className="absolute right-4 text-blue-600 font-bold text-xs hover:underline"
          >
            Change
          </button>
        )}

        {isSelect && (
          <div className="absolute right-4 pointer-events-none">
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              className="text-gray-500"
            >
              <path
                d="M1 1L6 6L11 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

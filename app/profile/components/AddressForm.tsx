export const AddressForm = ({ onCancel }: { onCancel: () => void }) => (
  <div className="border border-gray-100 rounded-2xl p-8 bg-white shadow-sm">
    <form className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <InputField label="First Name" placeholder="Jane" />
        <InputField label="Last Name" placeholder="Doe" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <InputField
          label="Email ID"
          placeholder="janedoe20230@gmail.com"
          action="Change"
        />
        <InputField
          label="Mobile Number"
          placeholder="9191922000"
          action="Change"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <InputField label="Address" placeholder="House 26, Blue Sky Building" />
        <InputField label="Locality" placeholder="Kothanur" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <InputField label="City" placeholder="Bangalore" />
        <InputField label="Pincode" placeholder="5699900" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <SelectField label="State" value="Karnataka" />
        <SelectField label="Address Type" value="Home" />
      </div>

      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="checkbox"
          className="w-4 h-4 rounded accent-gray-900"
          defaultChecked
        />
        <span className="text-xs font-bold text-gray-900">
          Make this as default address
        </span>
      </label>

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-4 border border-gray-100 rounded-xl font-bold text-sm text-red-500 hover:bg-gray-50 transition-colors"
        >
          Remove
        </button>
        <button
          type="submit"
          className="flex-1 py-4 bg-linear-to-r from-yellow-400 to-yellow-500 rounded-xl font-bold text-sm text-gray-900 shadow-md hover:brightness-105 transition-all"
        >
          Save Address
        </button>
      </div>
    </form>
  </div>
);

// Helper UI Components for the Form
const InputField = ({
  label,
  placeholder,
  action,
}: {
  label: string;
  placeholder: string;
  action?: string;
}) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-gray-700 ml-1">{label}</label>
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full border border-gray-100 rounded-xl p-3.5 text-sm placeholder:text-gray-300 focus:outline-gray-400"
      />
      {action && (
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 font-bold text-xs"
        >
          {action}
        </button>
      )}
    </div>
  </div>
);

const SelectField = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-gray-700 ml-1">{label}</label>
    <div className="relative">
      <select className="w-full border border-gray-100 rounded-xl p-3.5 text-sm appearance-none bg-white font-medium">
        <option>{value}</option>
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        ▼
      </div>
    </div>
  </div>
);

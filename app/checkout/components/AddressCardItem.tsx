interface Address {
  id: string;
  name: string;
  details: string;
}

export default function AddressCardItem({
  address,
  isSelected,
  onSelect,
}: {
  address: Address;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      onClick={() => onSelect(address.id)}
      className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
        isSelected ? "border-gray-800 ring-1 ring-gray-800" : "border-gray-200"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Custom Radio Button */}
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            isSelected ? "border-gray-800" : "border-gray-300"
          }`}
        >
          {isSelected && (
            <div className="w-2.5 h-2.5 bg-gray-800 rounded-full" />
          )}
        </div>

        <div>
          <h4 className="font-bold text-sm text-gray-900">{address.name}</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            {address.details}
          </p>
        </div>
      </div>

      <button className="text-blue-600 text-xs font-bold underline px-2">
        edit
      </button>
    </div>
  );
}

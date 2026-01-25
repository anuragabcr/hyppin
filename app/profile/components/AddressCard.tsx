interface AddressCardProps {
  name: string;
  address: string;
  isSelected?: boolean;
  onEdit: () => void;
  onSelect: () => void;
}

export const AddressCard = ({
  name,
  address,
  isSelected,
  onEdit,
  onSelect,
}: AddressCardProps) => (
  <div
    onClick={onSelect}
    className={`relative flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer mb-4 ${
      isSelected
        ? "border-gray-800 bg-white shadow-sm"
        : "border-gray-100 bg-white"
    }`}
  >
    <div
      className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
        isSelected ? "border-gray-800" : "border-gray-300"
      }`}
    >
      {isSelected && <div className="w-2.5 h-2.5 bg-gray-800 rounded-full" />}
    </div>

    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="font-bold text-sm text-gray-900">{name}</span>
        {isSelected && (
          <span className="bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-md font-bold uppercase">
            Selected
          </span>
        )}
      </div>
      <p className="text-xs text-gray-400 mt-1 font-medium leading-relaxed">
        {address}
      </p>
    </div>

    <button
      onClick={(e) => {
        e.stopPropagation();
        onEdit();
      }}
      className="text-blue-600 text-sm font-bold hover:underline underline-offset-4"
    >
      edit
    </button>
  </div>
);

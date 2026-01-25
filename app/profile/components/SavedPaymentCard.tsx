import { Trash2 } from "lucide-react";

interface SavedPaymentCardProps {
  type: "Card" | "UPI";
  lastFour?: string;
  upiId?: string;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export const SavedPaymentCard = ({
  type,
  lastFour,
  upiId,
  isSelected,
  onSelect,
  onDelete,
}: SavedPaymentCardProps) => (
  <div
    onClick={onSelect}
    className={`relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer mb-3 ${
      isSelected
        ? "border-blue-600 bg-blue-50/30"
        : "border-gray-100 bg-white hover:border-gray-200"
    }`}
  >
    <div
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
        isSelected ? "border-blue-600" : "border-gray-300"
      }`}
    >
      {isSelected && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
    </div>

    <div className="flex-1">
      <p className="text-sm font-bold text-gray-900">
        {type === "Card" ? `•••• •••• •••• ${lastFour}` : upiId}
      </p>
      <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-0.5">
        {type === "Card" ? "Saved Credit Card" : "Primary UPI ID"}
      </p>
    </div>

    <button
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
      className="text-gray-300 hover:text-red-500 transition-colors"
    >
      <Trash2 size={18} />
    </button>
  </div>
);

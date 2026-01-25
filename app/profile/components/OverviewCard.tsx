import { LucideIcon } from "lucide-react";

interface OverviewCardProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}

export const OverviewCard = ({
  label,
  icon: Icon,
  onClick,
}: OverviewCardProps) => (
  <button
    onClick={onClick}
    className="aspect-square flex flex-col items-center justify-center gap-4 border border-gray-100 rounded-xl bg-white hover:shadow-md transition-shadow group cursor-pointer"
  >
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors">
      <Icon size={24} className="text-gray-800 group-hover:text-blue-600" />
    </div>
    <span className="text-sm font-bold text-gray-800">{label}</span>
  </button>
);

import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

interface VerifySubmitProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any; // Replace with your structured OnboardingData type
  onEdit: (stepId: number) => void;
  onSubmit: () => void;
}

const VerifySubmit: React.FC<VerifySubmitProps> = ({
  data,
  onEdit,
  onSubmit,
}) => {
  return (
    <div className="max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Header Section */}
      <header className="mb-8 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-3xl font-bold text-[#1E293B]">Verify & Submit</h2>
        <p className="text-gray-500 mt-1">
          Confirm all details before submission
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Business Details Section (Span full width) */}
        <section className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative">
          <SectionHeader title="Business Details" onEdit={() => onEdit(1)} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 mt-4 text-sm">
            <DataRow label="GSTIN" value={data.gstin || "CN40K123454727"} />
            <DataRow
              label="Entity Type"
              value={data.entityType || "Sole proprietorship"}
            />
            <DataRow
              label="Store Name"
              value={data.storeName || "Store Name Store"}
            />
            <DataRow
              label="Inventory model"
              value={data.inventoryModel || "Hyppin inventory model"}
            />
            <DataRow
              label="Store Address"
              value={data.address || "123, Main Street, Bangalore..."}
              isFullWidth
            />
            <DataRow
              label="Store Contact Number"
              value={`+91 ${data.contactNumber || "9255536507"}`}
            />
            <DataRow
              label="Working Hours"
              value="Mon – Sat | 09:00 AM – 05:00 PM"
            />
          </div>
        </section>

        {/* Left Column: Seller & Bank */}
        <div className="space-y-6">
          {/* 2. Seller Details */}
          <section className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <SectionHeader title="Seller Details" onEdit={() => onEdit(2)} />
            <div className="space-y-3 mt-4 text-sm">
              <DataRow label="Full Name" value={data.fullName || "John Doe"} />
              <DataRow
                label="Phone Number"
                value={`+91 ${data.phone || "9876543210"}`}
              />
              <DataRow
                label="Email ID"
                value={data.email || "seller@gmail.com"}
              />
            </div>
          </section>

          {/* 3. Bank Details */}
          <section className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <SectionHeader title="Bank Details" onEdit={() => onEdit(3)} />
            <div className="space-y-3 mt-4 text-sm">
              <DataRow
                label="Account Number"
                value={`•••• •••• ${data.accountLastFour || "1234"}`}
              />
              <DataRow label="IFSC Code" value={data.ifsc || "HSBC0000452"} />
              <DataRow
                label="Bank Type"
                value="HSBC Bank, Branch: Kempegowda Rd, Bangalore"
              />
            </div>
          </section>
        </div>

        {/* Right Column: Digital Signature & Submit */}
        <div className="space-y-6 flex flex-col">
          {/* 4. DSC Section */}
          <section className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex-1">
            <SectionHeader
              title="DSC (Digital Signature)"
              onEdit={() => onEdit(4)}
            />
            <div className="mt-4 relative bg-gray-50/50 rounded-2xl border border-gray-100 p-4 min-h-40 flex items-center justify-center">
              {data.signatureUrl ? (
                <Image
                  src={data.signatureUrl}
                  fill
                  alt="Signature Preview"
                  className="max-h-32 object-contain"
                />
              ) : (
                <div className="text-gray-300 italic">Signature Preview</div>
              )}

              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-100">
                <CheckCircle2 className="text-sm" /> Verified
              </div>
            </div>
          </section>

          {/* Final Action Button */}
          <button
            onClick={onSubmit}
            className="w-full py-4 bg-[#FFD644] hover:bg-[#F2C938] text-gray-900 font-bold rounded-2xl shadow-lg shadow-amber-200/50 transition-all active:scale-[0.98]"
          >
            Submit for verification
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components for Clean Code ---

const SectionHeader = ({
  title,
  onEdit,
}: {
  title: string;
  onEdit: () => void;
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <CheckCircle2 className="text-green-500 text-xl" />
      <h3 className="font-bold text-[#334155]">{title}</h3>
    </div>
    <button
      onClick={onEdit}
      className="text-blue-600 font-semibold text-sm hover:underline"
    >
      Edit
    </button>
  </div>
);

const DataRow = ({
  label,
  value,
  isFullWidth = false,
}: {
  label: string;
  value: string;
  isFullWidth?: boolean;
}) => (
  <div className={isFullWidth ? "md:col-span-2" : ""}>
    <span className="text-gray-400 font-medium mr-2">{label}:</span>
    <span className="text-gray-700 font-semibold">{value}</span>
  </div>
);

export default VerifySubmit;

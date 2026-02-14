import React, { useState } from "react";

const BusinessDetails: React.FC = () => {
  const [gstin, setGstin] = useState("");
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const [selectedDays, setSelectedDays] = useState(["M", "T", "W", "T", "F"]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  return (
    <div className="max-w-2xl p-6 bg-white rounded-xl">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-[#1E293B]">Business Details</h2>
        <p className="text-gray-500 text-sm mt-1">
          Details fetched from your GSTIN will be verified automatically.
        </p>
      </header>

      <form className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">GSTIN</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
              placeholder="Enter your GSTIN"
              className="flex-1 p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 ring-blue-100 transition-all"
            />
            <button className="px-6 py-2 bg-[#FFD644] hover:bg-[#F2C938] font-bold rounded-lg transition-colors">
              Check
            </button>
          </div>
          {gstin.length > 0 && gstin.length !== 15 && (
            <p className="flex items-center gap-2 text-xs text-red-500 font-medium">
              <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px]">
                !
              </span>
              GST number should be 15 characters long
            </p>
          )}
        </div>

        <div className="relative pl-8 space-y-8">
          <div className="absolute left-3 top-2 bottom-6 w-0.5 bg-[#FFD644]"></div>

          {/* Store Name */}
          <div className="relative">
            <div className="absolute -left-[25px] top-1 w-4 h-4 bg-[#FFD644] rounded-full border-4 border-white ring-1 ring-[#FFD644]"></div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Store Name
            </label>
            <input
              type="text"
              placeholder="Enter Store Name"
              className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50/50"
            />
          </div>

          {/* Store Full Address */}
          <div className="relative">
            <div className="absolute -left-[25px] top-1 w-4 h-4 bg-[#FFD644] rounded-full border-4 border-white ring-1 ring-[#FFD644]"></div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Store Full Address
            </label>
            <input
              type="text"
              placeholder="Enter Store Full Address"
              className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50/50"
            />
          </div>

          {/* Entity Type Dropdown */}
          <div className="relative">
            <div className="absolute -left-[25px] top-1 w-4 h-4 bg-[#FFD644] rounded-full border-4 border-white ring-1 ring-[#FFD644]"></div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Entity Type
            </label>
            <select className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50/50 appearance-none">
              <option>Sole proprietorship</option>
              <option>Partnership</option>
              <option>Private Limited</option>
            </select>
          </div>

          {/* Contact Number */}
          <div className="relative">
            <div className="absolute -left-[25px] top-1 w-4 h-4 bg-[#FFD644] rounded-full border-4 border-white ring-1 ring-[#FFD644]"></div>
            <div className="flex gap-2">
              <div className="w-24 p-3 border border-gray-200 rounded-lg bg-gray-50/50 flex justify-between items-center text-sm">
                + 91 <span className="text-[10px]">▼</span>
              </div>
              <input
                type="tel"
                placeholder="Enter Store Contact Number"
                className="flex-1 p-3 border border-gray-200 rounded-lg bg-gray-50/50"
              />
            </div>
          </div>

          {/* Inventory Model Dropdown */}
          <div className="relative">
            <div className="absolute -left-[25px] top-1 w-4 h-4 bg-[#FFD644] rounded-full border-4 border-white ring-1 ring-[#FFD644]"></div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Inventory Model
            </label>
            <select className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50/50 appearance-none">
              <option>Hyppin inventory system</option>
              <option>Manual Entry</option>
            </select>
          </div>

          {/* Working Hours Selection */}
          <div className="relative">
            <div className="absolute -left-[25px] top-1 w-4 h-4 bg-[#FFD644] rounded-full border-4 border-white ring-1 ring-[#FFD644]"></div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Working Hours
            </label>

            <div className="flex flex-wrap items-center gap-4">
              {/* Day Selection Row */}
              <div className="flex bg-gray-100 p-1 rounded-lg">
                {days.map((day, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`w-8 h-8 rounded text-sm font-bold transition-all ${
                      selectedDays.includes(day)
                        ? "bg-blue-600 text-white"
                        : "text-gray-400 hover:bg-gray-200"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              {/* Time Inputs */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  defaultValue="09:00 AM"
                  className="p-2 border border-gray-200 rounded-lg text-sm w-28 text-center"
                />
                <div className="w-4 h-[2px] bg-blue-300"></div>
                <input
                  type="text"
                  defaultValue="10:00 PM"
                  className="p-2 border border-gray-200 rounded-lg text-sm w-28 text-center"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="text-sm text-gray-500">Open all days</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BusinessDetails;

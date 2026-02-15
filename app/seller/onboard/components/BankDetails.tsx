"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, HelpCircle } from "lucide-react";
import { BankData } from "../types";

interface BankDetailsProps {
  initial: BankData;
  onChange: (data: Partial<BankData>) => void;
  onValidChange: (valid: boolean) => void;
}

export default function BankDetails({
  initial,
  onChange,
  onValidChange,
}: BankDetailsProps) {
  const [account, setAccount] = useState(initial.accountNumber || "");
  const [reAccount, setReAccount] = useState("");
  const [ifsc, setIfsc] = useState(initial.ifsc || "");
  const [bankType, setBankType] = useState(initial.bankType || "");

  const doNumbersMatch = account === reAccount && account !== "";

  // VALIDATION + SYNC
  useEffect(() => {
    const isAccountValid = account.length >= 6 && doNumbersMatch;
    const isIfscValid = /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);
    const isBankTypeValid = bankType !== "";

    const isValid = isAccountValid && isIfscValid && isBankTypeValid;

    onValidChange(isValid);

    onChange({
      accountNumber: account,
      ifsc,
      bankType,
    });
  }, [
    account,
    reAccount,
    ifsc,
    bankType,
    onChange,
    onValidChange,
    doNumbersMatch,
  ]);

  return (
    <div className="max-w-2xl bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-[#1E293B]">Bank Details</h2>
        <p className="text-gray-500 mt-1">
          Payments will be sent to this account
        </p>
      </header>

      {/* Account */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">Account Number</label>
        <input
          value={account}
          onChange={(e) => setAccount(e.target.value.replace(/\D/g, ""))}
          className="w-full p-4 border rounded-xl outline-none"
        />
      </div>

      {/* Re Account */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">Re-enter Account Number</label>
        <input
          value={reAccount}
          onChange={(e) => setReAccount(e.target.value.replace(/\D/g, ""))}
          className={`w-full p-4 border rounded-xl outline-none ${
            reAccount && !doNumbersMatch ? "border-red-400" : ""
          }`}
        />

        {reAccount && !doNumbersMatch && (
          <p className="text-xs text-red-500 flex gap-1 items-center">
            <HelpCircle size={14} />
            Account numbers do not match
          </p>
        )}
      </div>

      {/* IFSC */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">IFSC Code</label>

        <div className="relative">
          <input
            value={ifsc}
            onChange={(e) => setIfsc(e.target.value.toUpperCase())}
            className="w-full p-4 border rounded-xl outline-none pr-10"
          />

          {/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc) && (
            <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
          )}
        </div>
      </div>

      {/* Bank Type */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">Bank Type</label>
        <select
          value={bankType}
          onChange={(e) => setBankType(e.target.value)}
          className="w-full p-4 border rounded-xl outline-none"
        >
          <option value="">Select account type</option>
          <option value="savings">Savings Account</option>
          <option value="current">Current Account</option>
        </select>
      </div>
    </div>
  );
}

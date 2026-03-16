"use client";

import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { SignatureData } from "../types";

interface DigitalSignatureProps {
  initial: SignatureData;
  onChange: (data: Partial<SignatureData>) => void;
  onValidChange: (valid: boolean) => void;
}

export default function DigitalSignature({
  initial,
  onChange,
  onValidChange,
}: DigitalSignatureProps) {
  const sigCanvas = useRef<SignatureCanvas>(null);

  const [activeTab, setActiveTab] = useState<"draw" | "upload">(
    initial.type || "draw",
  );
  const [image, setImage] = useState<string | null>(initial.image || null);
  const [isAgreed, setIsAgreed] = useState(initial.isAgreed || false);

  // Convert drawing to base64
  const handleSaveDraw = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const dataUrl = sigCanvas.current.toDataURL("image/png");
      setImage(dataUrl);
    }
  };

  const clearSignature = () => {
    sigCanvas.current?.clear();
    setImage(null);
  };

  // VALIDATION + SYNC
  useEffect(() => {
    const hasSignature = activeTab === "draw" ? image !== null : image !== null; // same for upload

    const isValid = hasSignature && isAgreed;

    onValidChange(isValid);

    onChange({
      type: activeTab,
      image,
      isAgreed,
    });
  }, [activeTab, image, isAgreed, onChange, onValidChange]);

  return (
    <div className="max-w-2xl bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-[#1E293B]">Digital Signature</h2>
        <p className="text-gray-500 mt-1">Draw your e-signature for invoices</p>
      </header>

      {/* Tabs */}
      <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("draw")}
          className={`px-6 py-2 rounded-lg text-sm font-bold ${
            activeTab === "draw"
              ? "bg-white text-gray-800 shadow-sm"
              : "text-gray-400"
          }`}
        >
          Draw
        </button>

        <button
          onClick={() => setActiveTab("upload")}
          className={`px-6 py-2 rounded-lg text-sm font-bold ${
            activeTab === "upload"
              ? "bg-white text-gray-800 shadow-sm"
              : "text-gray-400"
          }`}
        >
          Upload
        </button>
      </div>

      {/* Draw Mode */}
      {activeTab === "draw" ? (
        <div className="space-y-4">
          <div className="border rounded-2xl overflow-hidden bg-gray-50">
            <SignatureCanvas
              ref={sigCanvas}
              penColor="#1E293B"
              canvasProps={{
                className: "w-full h-64 cursor-crosshair",
              }}
              onEnd={handleSaveDraw}
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={clearSignature}
              className="px-6 py-2 border rounded-xl text-sm"
            >
              Clear
            </button>
          </div>
        </div>
      ) : (
        <div className="h-64 border-2 border-dashed rounded-2xl flex items-center justify-center text-gray-400">
          Upload mode (implement file input here)
        </div>
      )}

      {/* Agreement */}
      <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
        <input
          type="checkbox"
          checked={isAgreed}
          onChange={(e) => setIsAgreed(e.target.checked)}
        />
        I agree that this e-signature is legally valid.
      </label>
    </div>
  );
}

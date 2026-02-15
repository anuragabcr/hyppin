const SellerPage = () => {
  return (
    <div
      className="flex h-screen w-full flex-col bg-[#F8FAFF] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/seller_onboard_bg.svg')",
      }}
    >
      {/* Footer Support */}
      <div className="mt-12 border-t border-gray-100 pt-6 text-xs text-gray-400 flex items-center gap-2">
        <span className="text-base">🔒</span>
        Have any questions? Reach out to{" "}
        <span className="font-semibold text-blue-600">support@hyppin.com</span>
      </div>
    </div>
  );
};

export default SellerPage;

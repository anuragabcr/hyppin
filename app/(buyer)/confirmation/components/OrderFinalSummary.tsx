export const OrderFinalSummary = ({
  shipping,
  taxes,
  total,
}: {
  shipping: number;
  taxes: number;
  total: number;
}) => (
  <div className="w-full max-w-5xl mx-auto mt-12 px-6 pb-20 space-y-4">
    <div className="flex justify-between items-center py-3 border-b border-gray-100 text-sm font-bold">
      <span className="text-gray-900">Shipping</span>
      <span>₹ {shipping}</span>
    </div>
    <div className="flex justify-between items-center py-3 border-b border-gray-100 text-sm font-bold">
      <span className="text-gray-900">Taxes</span>
      <span>₹ {taxes}</span>
    </div>
    <div className="flex justify-between items-center py-4 text-lg font-bold">
      <span className="text-gray-900">Total</span>
      <span>₹ {total}</span>
    </div>
  </div>
);
